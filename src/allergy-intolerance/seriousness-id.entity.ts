import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { AllergyIntolerance } from "./allergy-intolerance.entity";

@Entity()
export class Seriousness_id {
  @PrimaryColumn({ name: "seriousness_id" })
  seriousnessId: string

  @Column()
  name: string

  @OneToMany(() => AllergyIntolerance, allergyIntolerance => allergyIntolerance.seriousness)
  allergyIntolerances: AllergyIntolerance[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}