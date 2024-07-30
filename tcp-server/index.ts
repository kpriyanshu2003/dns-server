import { connectMongo } from "./src/config/mongoose";
import { startExpressServer } from "./src/config/app";

connectMongo();
startExpressServer();
