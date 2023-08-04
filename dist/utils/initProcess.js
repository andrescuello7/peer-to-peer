"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitProcess = void 0;
const initFactory_1 = require("../factory/initFactory");
const InitProcess = () => {
    var _a, _b, _c;
    const init = initFactory_1.initFactory.Initial();
    const client = (_b = (_a = process.argv.slice(2)[0]) === null || _a === void 0 ? void 0 : _a.split(":")) !== null && _b !== void 0 ? _b : null;
    init.setInit({
        host: "127.0.0.1",
        port: Number(process.env.PORT),
    });
    if (client !== null) {
        init.setInit({
            host: (_c = client[0]) === null || _c === void 0 ? void 0 : _c.toString(),
            port: Number(client[1]),
        });
    }
};
exports.InitProcess = InitProcess;
//# sourceMappingURL=initProcess.js.map