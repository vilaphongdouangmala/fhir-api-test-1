import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { generatePatientJson } from 'src/common.models';
import { SearchFilterDto } from 'src/dtos/search-filter.dto';
import { count } from 'console';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>
    ) { }

    // async getPatients(): Promise<any> {
    //     const patients = this.patientRepository.createQueryBuilder('patient').getMany();

    //     const fhirPatients = (await patients).map(patient => {
    //         return generatePatientJson(patient);
    //     });
    //     return fhirPatients;
    // }

    async getPatientById(hn: string): Promise<any> {

        const patient = await this.patientRepository
                                .createQueryBuilder('patient')
                                .where('patient.hn = :hn', { hn })
                                .getOne();

        return generatePatientJson(patient);
    }

    async getPatients(searchFilterDto: SearchFilterDto): Promise<any> {
        const { _lastUpdated, _cid, _count, _sort } = searchFilterDto;

        const query = this.patientRepository
                            .createQueryBuilder('patient'); 

        //_lastUpdated
        if (_lastUpdated) {
            query.andWhere('(patient.updatedAt >= :_lastUpdated)', { _lastUpdated });
        }
        
        //_cid
        if (_cid) {
            query.andWhere('(patient.cid = :_cid)', {_cid});
        }

        //_count
        if (_count) {
            query.take(_count);
        }

        //_sort
        if(_sort) {
            const sortParams = _sort.split(',');
            sortParams.forEach(param => {
                const order = param.startsWith('-') ? 'DESC' : 'ASC';
                const fieldName = param.startsWith('-') ? param.substring(1) : param;
                query.addOrderBy(`patient.${fieldName}`, order);
            })
        }
        
        //make query
        const patients = await query.getMany();

        //convert to FHIR JSON format 
        //Bundle but not finished
        const fhirPatients = { 
            "resourceType": "Bundle",
            "entry": [
                patients.map(patient => ({ "resource":  generatePatientJson(patient)})),
            ]
        }
        return fhirPatients;
    }
}
