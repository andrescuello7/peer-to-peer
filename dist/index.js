"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./server/app");
const initProcess_1 = require("./utils/initProcess");
class Main {
    constructor() {
        (0, initProcess_1.InitProcess)();
        new app_1.ServerState();
        process.stdin.on("data", (buffer) => {
            // user.messages(buffer.toString());
            console.log(buffer.toString());
        });
    }
}
new Main();
//# sourceMappingURL=index.js.map