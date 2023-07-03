import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VitalSign } from './vital-sign.entity';
import { Repository } from 'typeorm';
import { VitalSignData } from './vital-sign-data.entity';
import { Patient } from 'src/patients/patient.entity';
import { generateObservationVitalJson } from 'src/common.models';
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
