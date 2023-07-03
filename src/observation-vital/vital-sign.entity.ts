import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { VitalSignData } from "./vital-sign-data.entity";

@Entity()
export class VitalSign {
    @PrimaryColumn({ name: 'vital_sign_id' })
    vitalSignId: string;

    @Column({ name: 'vital_sign_name' })
    vitalSignName: string;

    @Column({ name: 'vital_sign_unit', nullable: true, default: 'N/A' })
    vitalSignUnit: string;

    @OneToMany(() => VitalSignData, vitalSignData => vitalSignData.vitalSigns)
    vitalSignData: VitalSignData[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}