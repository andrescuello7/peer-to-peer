"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerState = void 0;
const net_1 = require("net");
const initFactory_1 = require("../factory/initFactory");
const messageEnum_1 = require("../enum/messageEnum");
class ServerState {
    constructor() {
        this.server = null;
        this.InitFactory = initFactory_1.initFactory.Initial();
        this.listUsers = this.InitFactory.getInit();
        this.CreateSocket();
        this.CreateServer();
        if (this.listUsers[1] !== undefined) {
            this.CreateConnection();
        }
    }
    CreateSocket() {
        this.server = (0, net_1.createServer)((socket) => {
            socket.on("data", (buffer) => {
                const message = JSON.parse(buffer.toString());
                this.ReadMessages(message, socket);
            });
        });
    }
    CreateServer() {
        const { port } = this.listUsers[0];
        this.server.listen({ port }, () => {
            console.log("server listening on port " + port);
        });
    }
    CreateConnection() {
        let { host, port } = this.listUsers[1];
        let socket = (0, net_1.createConnection)({ port, host }, () => {
            let peer = { socket, type: messageEnum_1.messageEnum.init };
            try {
                socket.write(JSON.stringify(peer));
            }
            catch (error) { }
        });
    }
    ReadMessages(message, socket) {
        if (message.type === messageEnum_1.messageEnum.init) {
            this.InitFactory.setInit({
                host: socket.remoteAddress.replace("::ffff:", ""),
                port: socket.remotePort,
                socket: message.socket,
            });
            this.AddConnections();
        }
        else {
            console.log("Entro");
        }
    }
    AddConnections() {
        let listPeers = this.InitFactory.getInit();
        for (const peer of listPeers) {
            //TODO i18n: validation null correction
            if (peer.socket !== undefined) {
                try {
                    console.log(peer.socket);
                    // let newsConnections: typeMessage = {
                    //   socket: peer.socket!,
                    //   type: messageEnum.newlist,
                    //   message: "Hola mundo",
                    //   list: this.InitFactory.getInit(),
                    // };
                    // peer.socket!.write(JSON.stringify(newsConnections));
                }
                catch (error) {
                    console.log("Error");
                }
            }
        }
    }
}
exports.ServerState = ServerState;
//# sourceMappingURL=app.js.map