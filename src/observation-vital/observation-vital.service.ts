import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VitalSign } from './vital-sign.entity';
import { Repository } from 'typeorm';
import { VitalSignData } from './vital-sign-data.entity';
import { Patient } from 'src/patients/patient.entity';
import { generateObservationVitalJson, generateSearchSetBundleJson } from 'src/common.models';
import { SearchFilterDto } from 'src/dtos/search-filter.dto';

@Injectable()
export class ObservationVitalService {
    constructor(
        @InjectRepository(VitalSign)
        private readonly vitalSignRepository: Repository<VitalSign>,
        @InjectRepository(VitalSignData)
        private readonly vitalSignDataRepository: Repository<VitalSignData>,
    ) { }

    async getVitalSigns(searchFilterDto: SearchFilterDto): Promise<any> {
        const { _lastUpdated, _cid, _count, _sort } = searchFilterDto;

        const query = this.vitalSignDataRepository
                            .createQueryBuilder('vital-sign-data')
                            .innerJoinAndSelect('vital-sign-data.vitalSign', 'vital-sign')
                            .innerJoinAndSelect('vital-sign-data.patient', 'patient')
        
        //_lastUpdated
        if (_lastUpdated) {
            query.andWhere('(vital-sign-data.updatedAt >= :_lastUpdated)', { _lastUpdated });
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
                query.addOrderBy(`vital-sign-data.${fieldName}`, order);
            })
        }

        const vitalSignData = await query.getMany();
        
        //convert to FHIR JSON bundle format 
        const fhirJson = generateSearchSetBundleJson(
            vitalSignData.map(vitalSignData => ({ 
                "fullUrl": `https://example.com/api/observation-vital/${vitalSignData.vitalSignDataId}`,
                "resource":  generateObservationVitalJson(vitalSignData)
            })),
        );

        //return
        return fhirJson;
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

        if (vitalSignData) {
            return generateObservationVitalJson(vitalSignData);
        }
        
        throw new NotFoundException(`Observation: Vital with 'id: ${id}' is not found`);
    }

    async getVitalSignDataByPatientId(
        id: string
    ): Promise<any> {
        const vitalSignData = await this.vitalSignDataRepository
                                    .createQueryBuilder('vital-sign-data')
                                    .innerJoinAndSelect('vital-sign-data.vitalSign', 'vital-sign')
                                    .innerJoinAndSelect('vital-sign-data.patient', 'patient')
                                    .where('patient.hn = :id', { id })
                                    .getMany();

        const fhirVitalSigns = vitalSignData.map(vitalSignData => ({
            "fullUrl": `https://example.com/api/observation-vital/${vitalSignData.vitalSignDataId}`,
            "resource": generateObservationVitalJson(vitalSignData)
        }));

        return fhirVitalSigns;
    }
}
