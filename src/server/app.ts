import { createServer, createConnection, Socket } from "net";
import { initFactory } from "../factory/initFactory";
import { typePeer } from "../types/typePeer";
import { typeMessage } from "../types/typeMessage";
import { messageEnum } from "../enum/messageEnum";

export class ServerState {
  server: any | null = null;

  InitFactory: initFactory = initFactory.Initial();
  listUsers = this.InitFactory.getInit();

  constructor() {
    this.CreateSocket();
    this.CreateServer();

    if (this.listUsers[1] !== undefined) {
      this.CreateConnection();
    }
  }

  CreateSocket() {
    this.server = createServer((socket) => {
      socket.on("data", (buffer) => {
        const message: typeMessage = JSON.parse(buffer.toString());
        console.log("Entro");
        this.ReadMessages(message, socket);
      });
    });
  }

  CreateServer() {
    const { port }: typePeer = this.listUsers[0];
    this.server.listen({ port }, () => {
      console.log("server listening on port " + port);
    });
  }

  CreateConnection() {
    let { host, port } = this.listUsers[1];
    let socket = createConnection({ port, host }, () => {
      let peer: typeMessage = { socket, type: messageEnum.init };
      try {
        socket.write(JSON.stringify(peer));
      } catch (error) {}
    });
  }

  ReadMessages(message: typeMessage, socket: Socket) {
    if (message.type === messageEnum.init) {
      this.InitFactory.setInit(
        {
          host: socket.remoteAddress!.replace("::ffff:", ""),
          port: socket.remotePort!,
          socket: message.socket,
        },
        socket
      );
      this.AddConnections();
    }
  }

  AddConnections() {
    let listPeers = this.InitFactory.getSockets();
    for (const peer of listPeers) {
      //TODO i18n: validation null correction
      try {
        // let newsConnections: typeMessage = {
        //   socket: peer.socket!,
        //   type: messageEnum.newlist,
        //   message: "Hola mundo",
        //   list: this.InitFactory.getInit(),
        // };
        // peer.socket!.write(JSON.stringify(newsConnections));
        peer.write("Hola mundo");
      } catch (error) {
        console.log("Error");
      }
    }
  }
}
