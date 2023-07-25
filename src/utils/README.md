# Utilities

This directory contains utility files used throughout the MQTT data handling system.

## Files

### 1. `logger.js`

This utility file provides logging functionality to log various events and messages in the application.

- **Functionality**:
  - `info(message)`: Logs an informational message.
  - `error(message)`: Logs an error message.

## Usage

The `logger.js` utility file can be used to log various events and messages during the execution of the MQTT data handling system. It provides functions to log informational messages (`info`) and error messages (`error`) to the console.

## Important Notes

- Logging is essential for debugging and monitoring the application. However, ensure that sensitive information is not logged to prevent security risks.

- For production deployments, consider using a more robust logging mechanism, such as a logging library, to handle logs efficiently and securely.

