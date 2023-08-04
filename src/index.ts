import { ServerState } from "./server/app";
import { InitProcess } from "./utils/initProcess";

class Main {
  constructor() {
    InitProcess();
    new ServerState();

    process.stdin.on("data", (buffer) => {
      // user.messages(buffer.toString());
      console.log(buffer.toString());
    });
  }
}
new Main();
