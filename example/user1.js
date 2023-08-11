const { createServer, createConnection } = require("net");

class Server {
  connections = [];
  constructor() {
    this.server();
  }

  server() {
    this.server = createServer((socket) => {
      socket.on("data", (buffer) => {
        let response = JSON.parse(buffer.toString());
        if (response.connect === 0) {
          let bandera = this.connections.find((item) => item.port === response.port)
          if (!bandera) {
            this.connections.push(response);
            this.connectionLists(); 
            console.log(this.connections);
          }
        }
        console.log(response);
      });
    });

    this.server.listen({ port: 2000 }, () => {
      console.log("server listening on port " + 2000);
    });
  }

  connectionLists() {
    for (const user of this.connections) {
      let socket = createConnection(
        { port: user.port, host: user.host },
        () => {
          console.log("OK");
        }
      );
      socket.write(
        JSON.stringify({
          connect: 1,
          post: this.port,
          host: "127.0.0.1",
          list: JSON.stringify(this.connections),
        })
      );
    }
  }
}
new Server();
