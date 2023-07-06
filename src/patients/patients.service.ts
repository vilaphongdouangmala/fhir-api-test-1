import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { generatePatientJson, generateSearchSetBundleJson } from 'src/common.models';
import { SearchFilterDto } from 'src/dtos/search-filter.dto';
import { count } from 'console';
import { ObservationVitalService } from 'src/observation-vital/observation-vital.service';
import { AllergyIntoleranceService } from 'src/allergy-intolerance/allergy-intolerance.service';

@Injectable()
export class PatientsService {
    constructor(
        //repositories
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,

        //services
        private readonly observationVitalService: ObservationVitalService,
        private readonly allergyIntoleranceService: AllergyIntoleranceService,
    ) { }

    async getPatientById(hn: string): Promise<any> {

        const patient = await this.patientRepository
                                .createQueryBuilder('patient')
                                .where('patient.hn = :hn', { hn })
                                .getOne();
        
        if (patient) {
            return generatePatientJson(patient);
        }

        throw new NotFoundException(`Patient with 'hn: ${hn}' is not found`);

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
        const fhirJson = generateSearchSetBundleJson(
            patients.map(patient => ({ 
                "fullUrl": `https://example.com/api/patients/${patient.hn}`,
                "resource":  generatePatientJson(patient)
            })),
        );

        return fhirJson;
    }

    async getPatientEverything(
        id: string,
    ): Promise<any> {
        const patient = await this.getPatientById(id);
        const observations = await this.observationVitalService.getVitalSignDataByPatientId(id);
        const allergyIntolerances = await this.allergyIntoleranceService.getAllergyIntolerancesByPatientId(id);
        
        const entries = [
            {
                fullUrl: `https://example.com/api/patients/${patient.hn}`,
                resource: patient 
            },
            ...observations,
            ...allergyIntolerances,
        ]

        //return in bundle format
        return {
            "resourceType": 'Bundle',
            "type": "searchset",
            "total": entries.length,
            "link": [
                {
                    "relation": "self",
                    "url": `https://fhir-server.com/Patient/${id}/$everything`
                }
            ],
            "entry": entries,
        };
    }

}
