import { AllergyIntolerance } from "src/allergy-intolerance/allergy-intolerance.entity";
import { VitalSignData } from "src/observation-vital/vital-sign-data.entity";
import { VitalSign } from "src/observation-vital/vital-sign.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Patient {
  @PrimaryColumn()
  hn: string;

  @Column()
  cid: string;

  @Column()
  pname: string;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column()
  sex: string;

  @Column()
  birthday: string;

  @Column()
  last_visit: Date;

  @OneToMany(() => AllergyIntolerance, allergyIntolerance => allergyIntolerance.patient)
  allergyIntolerances: AllergyIntolerance[]

  @OneToMany(() => VitalSignData, vitalSignData => vitalSignData.patient)
  vitalSignData: VitalSignData[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}