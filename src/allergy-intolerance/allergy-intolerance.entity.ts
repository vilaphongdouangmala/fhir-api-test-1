import { Patient } from "src/patients/patient.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Seriousness_id } from "./seriousness-id.entity";

@Entity()
export class AllergyIntolerance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    agent: string;

    @Column({ name: 'report_date', type: 'date' })
    reportDate: Date;

    @Column()
    symptom: string;

    @ManyToOne(() => Seriousness_id, seriousness => seriousness.allergyIntolerances)
    @JoinColumn({ name: 'seriousness_id' })
    seriousness: Seriousness_id;

    @ManyToOne(() => Patient, patient => patient.allergyIntolerances)
    @JoinColumn({ name: 'hn' })
    patient: Patient;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}