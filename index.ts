import express, { Application } from "express";
import { createConnection } from "typeorm";
import * as dotenv from "dotenv";
import morgan from "morgan";
import UsersController from "./src/controllers/usersController";
import Client from "./src/entities/Client";
import Banker from "./src/entities/Banker";
import Transaction from "./src/entities/Transaction";

class App {
  private app: Application;
  constructor() {
    this.app = express();
  }
  public start() {
    dotenv.config();
    const port = process.env.PORT;
    try {
      this.app.listen(port || 5000, () => {
        console.log(`Listening on port ${port}`);
      });
      createConnection({
        type: "mysql",
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5000),
        synchronize: true,
        entities: [Client, Banker, Transaction],
        database: process.env.DB_NAME,
      })
        .then((result) => {
          this.configureMiddleware();
          this.enableRoutes();
          console.log(`Succesffuly connected to ${process.env.DB_NAME}`);
        })
        .catch((err) => console.log("createConnection err :", err));
    } catch (error) {
      console.log("start error", error);
    }
  }
  private configureMiddleware() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(morgan("tiny"));
  }
  private enableRoutes() {
    this.app.use("/api", new UsersController().router);
  }
}

const server = new App();
server.start();
