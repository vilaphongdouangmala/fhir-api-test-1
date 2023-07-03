import { Patient } from "src/patients/patient.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VitalSign } from "./vital-sign.entity";

@Entity()
export class VitalSignData {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Patient, patient => patient.vitalSignData)
    @JoinColumn({ name: 'hn' })
    patient: Patient;

    @Column()
    vn: string;

    @Column({ name: 'vital_sign_datetime' })
    vitalSignDatetime: Date;

    @Column({ name: 'vital_sign_data_id' })
    vitalSignDataId: string;

    @Column({ name: 'vital_sign_value' })
    vitalSignValue: string;

    @ManyToOne(() => VitalSign, vitalSign => vitalSign.vitalSignData)
    @JoinColumn({ name: 'vital_sign_id' })
    vitalSign: VitalSign;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}