import { Socket } from "net";
import { messageEnum } from "../enum/messageEnum";
import { typePeer } from "./typePeer";

export type typeMessage ={
  message?: string;
  socket: Socket;
  list?: typePeer[];
  type: messageEnum
}
