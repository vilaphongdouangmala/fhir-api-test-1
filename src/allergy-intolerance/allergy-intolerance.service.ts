import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllergyIntolerance } from './allergy-intolerance.entity';
import { Seriousness_id } from './seriousness-id.entity';
import { generateAllergyTolerance } from 'src/common.models';
import { SearchFilterDto } from 'src/dtos/search-filter.dto';

@Injectable()
export class AllergyIntoleranceService {
    constructor(
        @InjectRepository(AllergyIntolerance)
        private readonly allergyIntoleranceRepository: Repository<AllergyIntolerance>,
        @InjectRepository(Seriousness_id)
        private readonly seriousnessRepository: Repository<Seriousness_id>
    ) { }

    // async getAllergyIntolerances(): Promise<any> {
    //     const allergyIntolerances = this.allergyIntoleranceRepository
    //                                     .createQueryBuilder('allergy-intolerance')
    //                                     .innerJoinAndSelect('allergy-intolerance.patient', 'patient')
    //                                     .innerJoinAndSelect('allergy-intolerance.seriousness', 'seriousness_id')
    //                                     .getMany()

    //     const fhirAllergyIntolerances = (await allergyIntolerances).map(allergyIntolerance => {
    //         return generateAllergyTolerance(allergyIntolerance)
    //     });

    //     return fhirAllergyIntolerances;
    // }

    async getAllergyIntolerances(searchFilterDto: SearchFilterDto): Promise<any> {
        const { _lastUpdated, _cid, _count, _sort } = searchFilterDto;

        const query = this.allergyIntoleranceRepository
                                        .createQueryBuilder('allergy-intolerance')
                                        .innerJoinAndSelect('allergy-intolerance.patient', 'patient')
                                        .innerJoinAndSelect('allergy-intolerance.seriousness', 'seriousness_id');
        
        //_lastUpdated
        if (_lastUpdated) {
            query.andWhere('(allergy-intolerance.updatedAt >= :_lastUpdated)', { _lastUpdated });
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
                query.addOrderBy(`allergy-intolerance.${fieldName}`, order);
            })
        }

        const allergyIntolerances = await query.getMany();

        const fhirAllergyIntolerances = allergyIntolerances.map(allergyIntolerance => {
            return generateAllergyTolerance(allergyIntolerance)
        });

        return fhirAllergyIntolerances;
    }

    async getAllergyIntoleranceById(id: string): Promise<any> {
        const allergyIntolerance = await this.allergyIntoleranceRepository
                                            .createQueryBuilder('allergy-intolerance')
                                            .innerJoinAndSelect('allergy-intolerance.patient', 'patient')
                                            .innerJoinAndSelect('allergy-intolerance.seriousness', 'seriousness_id')
                                            .where('allergy-intolerance.id = :id', { id })
                                            .getOne();

        return generateAllergyTolerance(allergyIntolerance);
    }

    async getAllergyIntolerancesByPatientId(id: string): Promise<any> {
        const allergyIntolerances = await this.allergyIntoleranceRepository
                                            .createQueryBuilder('allergy-intolerance')
                                            .innerJoinAndSelect('allergy-intolerance.patient', 'patient')
                                            .innerJoinAndSelect('allergy-intolerance.seriousness', 'seriousness_id')
                                            .where('patient.hn = :id', { id })
                                            .getMany();

        const fhirAllergyIntolerances = allergyIntolerances.map(allergyIntolerance => {
            return generateAllergyTolerance(allergyIntolerance)
        });

        return fhirAllergyIntolerances;
    }
}
