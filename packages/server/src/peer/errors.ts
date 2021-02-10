enum Errors {
  INVALID_KEY = "Invalid key provided",
  INVALID_TOKEN = "Invalid token provided",
  INVALID_WS_PARAMETERS = "No id, token, or key supplied to websocket server",
  CONNECTION_LIMIT_EXCEED = "Server has reached its concurrent user limit",
}

// const Errors = {
//   INVALID_KEY: "Invalid key provided",
//   INVALID_TOKEN: "Invalid token provided",
//   INVALID_WS_PARAMETERS: "No id, token, or key supplied to websocket server",
//   CONNECTION_LIMIT_EXCEED: "Server has reached its concurrent user limit",
// };

export default Errors;
