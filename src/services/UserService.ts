import {
  getCustomRepository,
  getRepository,
  ObjectLiteral,
  SelectQueryBuilder,
} from "typeorm";
import Client from "../entities/Client";
import UserRepository from "../repositories/UserRepository";

export interface IUserService {
  save(info:any): Promise<Client>;
  getClients(): Promise<Client[]>;
}

export class UserService implements IUserService {
  protected repository: UserRepository;
  constructor() {
    this.init();
  }

  private init() {
    this.repository = getCustomRepository(UserRepository);
  }

  public async save(info: any): Promise<Client> {
    const current = Client.create(info);
    await this.repository.save(current);
    return Promise.resolve(current);
  }

  public async getClients(): Promise<Client[]> {
    const query = this.repository.createQueryBuilder("Client").getMany();

    return query;
  }
}
