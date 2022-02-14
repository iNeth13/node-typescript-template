import { EntityRepository, Repository } from "typeorm";
import Client from "../entities/Client";

@EntityRepository(Client)
export default class UserRepository extends Repository<Client> {}
