import { typePeer } from "../types/typePeer";

let instance: any | null = null;

export class initFactory {
  private connections: typePeer[] = [];
  private sockets: any[] = [];

  constructor() {}

  static Initial() {
    if (!instance) {
      instance = new initFactory();
    }
    return instance;
  }

  setInit(_connections: typePeer, _sockets?: any) {
    this.connections.push(_connections);
    this.sockets.push(_sockets);
  }

  getInit(): typePeer[] {
    return this.connections;
  }

  getSockets(): any[] {
    return this.sockets;
  }

  rmInit() {
    this.connections = [];
  }
}
