import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import Person from "./Person";
import Transaction from "./Transaction";

@Entity()
export default class Client extends Person {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("bool")
  @IsNotEmpty()
  public is_delete: boolean;

  @Column("numeric", { default: 0 })
  public balance: number;

  @Column("simple-array")
  public family_members: string[];

  @Column("bool")
  @IsNotEmpty()
  public is_active: boolean;

  @OneToMany((type) => Transaction, (transaction) => transaction.client)
  public transactions: Transaction[];

  createInfo(info: any) {
    super.createInfo(info);
    this.balance = info.balance;
    this.family_members = [];
    this.is_active = true;
    this.is_delete = true;
  }

  public static create(info: any) {
    const client = new Client();
    client.createInfo(info);

    return client;
  }
}
