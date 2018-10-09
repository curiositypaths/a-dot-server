import { createServer } from "http";
import app from "./app";

const port = 4000
const server = createServer(app);
let currentApp = app;

server.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`);
});

if (module.hot) {
  module.hot.accept(["./app"], () => {
    server.removeListener("request", currentApp);
    server.on("request", app);
    currentApp = app;
  });
}

