import { RequestHandler, response, Router } from "express";
import { UserService } from "../services/UserService";

export default class UsersController {
  public router: Router;
  private userService: UserService;
  constructor() {
    this.router = Router();
    this.userService = new UserService();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post("/create", this.createUser);
    this.router.get("/get-users", this.getUsers);
  }

  private createUser: RequestHandler = (req, res, next) => {
    this.userService
      .save(req.body.info)
      .then((response) => {
        console.log(response);
        return res.json(response.responseSuccess());
      })
      .catch((err) => console.log("err", err));
  };

  private getUsers: RequestHandler = (req, res, next) => {
    this.userService
      .getClients()
      .then((response) => res.json(response))
      .catch((err) => console.log("err", err));
  };
}
