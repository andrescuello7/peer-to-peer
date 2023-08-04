"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFactory = void 0;
let instance = null;
class initFactory {
    constructor() {
        this.connections = [];
    }
    static Initial() {
        if (!instance) {
            instance = new initFactory();
        }
        return instance;
    }
    setInit(_connections) {
        this.connections.push(_connections);
    }
    getInit() {
        return this.connections;
    }
    rmInit() {
        this.connections = [];
    }
}
exports.initFactory = initFactory;
//# sourceMappingURL=initFactory.js.map