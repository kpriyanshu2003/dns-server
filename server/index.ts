import { connectMongo } from "./src/config/mongoose";
import { startUdpServer } from "./src/config/server";
import { startExpressServer } from "./src/config/app";

startUdpServer();
startExpressServer();
connectMongo();
