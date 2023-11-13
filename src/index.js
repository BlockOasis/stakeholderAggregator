const mqttClient = require("./mqtt/mqttClient");
const dataHandler = require("./data/dataHandler");
const config = require("../config");

async function main() {
  try {
    // Connect to MQTT broker
    await mqttClient.connect(config.mqtt);

    // Handle incoming MQTT messages
    mqttClient.onMessage(dataHandler.handleIncomingMessage);

    // Gracefully close the connection on SIGINT (Ctrl+C)
    process.on("SIGINT", async () => {
      console.log("Closing the MQTT connection...");
      await mqttClient.disconnect();
      process.exit();
    });
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Call the main function to start the MQTT client
main();

// Export the main function so that it can be called from other modules if needed
module.exports = main;
