import { Socket } from "net";

export interface typePeer{
  host: string;
  port: number;
  socket?: Socket;
}
