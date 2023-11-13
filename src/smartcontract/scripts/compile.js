const fs = require("fs");
const path = require("path");
const solc = require("solc");

// Function to read and return the content of a file.
function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

// Function to find and read OpenZeppelin contracts.
function findOpenZeppelinContract(importPath) {
  // Construct the path to the OpenZeppelin contracts within node_modules.
  const fullPath = path.resolve(
    __dirname,
    "../../../node_modules/@openzeppelin/contracts",
    importPath
  );
  return readFile(fullPath);
}

// Import callback function for the Solidity compiler to handle imports.
function findImports(importPath) {
  if (importPath.startsWith("@openzeppelin/contracts/")) {
    // Adjusting the slice index to align with the start of the actual path.
    return { contents: findOpenZeppelinContract(importPath.slice(24)) };
  } else {
    return { error: "File not found" };
  }
}

// Read the Solidity contract code.
const contractPath = path.resolve(
  __dirname,
  "../contracts/BlockOasisAggregator.sol"
);
const contractCode = readFile(contractPath);

// Set the compiler input, specifying language and source files.
const compilerInput = {
  language: "Solidity",
  sources: {
    "BlockOasisAggregator.sol": {
      content: contractCode,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

// Compile the contract and parse the output.
let compiledContract = JSON.parse(
  solc.compile(JSON.stringify(compilerInput), { import: findImports })
);

// Extract bytecode and ABI from the compiled contract.
const contractName = "StakeholderAggregator"; // Ensure this matches the contract's name in the Solidity file.
const compiledData = {
  contractName: contractName,
  bytecode:
    compiledContract.contracts["BlockOasisAggregator.sol"][contractName].evm
      .bytecode.object,
  abi: compiledContract.contracts["BlockOasisAggregator.sol"][contractName].abi,
};

// Write the compiled data to a JSON file.
const outputPath = path.resolve(__dirname, "../builds/compiledContract.json");
fs.writeFileSync(outputPath, JSON.stringify(compiledData, null, 2));

console.log("Contract compiled and output saved in compiledContract.json");
