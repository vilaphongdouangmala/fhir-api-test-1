import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { generatePatientJson } from 'src/common.models';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>
    ) { }

    async getPatients(): Promise<any> {
        const patients = this.patientRepository.createQueryBuilder('patient').getMany();

        const fhirPatients = (await patients).map(patient => {
            return generatePatientJson(patient);
        });
        return fhirPatients;
    }


    async getPatientByID(hn: string): Promise<any> {

        const patient = await this.patientRepository
                                .createQueryBuilder('patient')
                                .where('patient.hn = :hn', { hn })
                                .getOne();

        return generatePatientJson(patient);
    }
}
