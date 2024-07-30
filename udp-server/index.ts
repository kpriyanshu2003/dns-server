import { connectMongo } from "./src/config/mongoose";
import { startUdpServer } from "./src/config/dgram";

connectMongo();
startUdpServer();
