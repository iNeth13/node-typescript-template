import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export default abstract class Person {
  @Column("varchar")
  @IsNotEmpty()
  public name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
    length: 10,
    nullable: true,
  })
  card_number: string;

  public createInfo(info: any) {
    const { email, name } = info;
    this.email = email;
    this.name = name;
  }

  data() {
    return this;
  }

  responseSuccess() {
    let data = this.data();
    for (const prop in data) {
      console.log(prop);
    }
    return {
      data: this.data(),
      statusCode: 200,
    };
  }
}
