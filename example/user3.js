const { createServer, createConnection } = require("net");

class Server {
  port = 4000;
  connections = [];

  constructor() {
    this.server();
    this.connect();
  }

  server() {
    this.server = createServer((socket) => {
      socket.on("data", (buffer) => {
        let response = JSON.parse(buffer.toString());
        if (response.connect === 1) {
          for (const user of JSON.parse(response.list)) {
            this.connections.push(user);
            console.log(this.connections);
            // this.connectionLists();
          }
        }
      });
    });
    this.server.listen({ port: this.port }, () => {
      console.log("server listening on port " + this.port);
    });
  }

  connect() {
    let socket = createConnection({ port: 2000, host: "127.0.0.1" }, () => {
      console.log("OK");
    });
    socket.write(
      JSON.stringify({
        connect: 0,
        port: this.port,
        host: "127.0.0.1",
      })
    );
  }
}
new Server();
