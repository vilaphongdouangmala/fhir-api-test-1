import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VitalSign } from './vital-sign.entity';
import { Repository } from 'typeorm';
import { VitalSignData } from './vital-sign-data.entity';
import { Patient } from 'src/patients/patient.entity';
import { generateObservationVitalJson } from 'src/common.models';

@Injectable()
export class ObservationVitalService {
    constructor(
        @InjectRepository(VitalSign)
        private readonly vitalSignRepository: Repository<VitalSign>,
        @InjectRepository(VitalSignData)
        private readonly vitalSignDataRepository: Repository<VitalSignData>,
    ) { }

    async getVitalSigns(): Promise<any> {
        const vitalSignData = await this.vitalSignDataRepository
                                    .createQueryBuilder('vital-sign-data')
                                    .innerJoinAndSelect('vital-sign-data.vitalSign', 'vital-sign')
                                    .innerJoinAndSelect('vital-sign-data.patient', 'patient')
                                    .getMany();
        
        const fhirVitalSigns = vitalSignData.map(vitalSignData => {
            return generateObservationVitalJson(vitalSignData);
        })

        console.log(fhirVitalSigns);

        return fhirVitalSigns;
    }

    async getVitalSignDataById(
      id: string
    ): Promise<any> {
        const vitalSignData = await this.vitalSignDataRepository
                                    .createQueryBuilder('vital-sign-data')
                                    .innerJoinAndSelect('vital-sign-data.vitalSign', 'vital-sign')
                                    .innerJoinAndSelect('vital-sign-data.patient', 'patient')
                                    .where('vital-sign-data.id = :id', { id })
                                    .getOne();

        return generateObservationVitalJson(vitalSignData);
    }
}
