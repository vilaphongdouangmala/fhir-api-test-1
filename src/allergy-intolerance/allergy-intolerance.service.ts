import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllergyIntolerance } from './allergy-intolerance.entity';
import { Seriousness_id } from './seriousness-id.entity';
import { generateAllergyTolerance } from 'src/common.models';

@Injectable()
export class AllergyIntoleranceService {
    constructor(
        @InjectRepository(AllergyIntolerance)
        private readonly allergyIntoleranceRepository: Repository<AllergyIntolerance>,
        @InjectRepository(Seriousness_id)
        private readonly seriousnessRepository: Repository<Seriousness_id>
    ) { }

    async getAllergyIntolerances(): Promise<any> {
        const allergyIntolerances = this.allergyIntoleranceRepository
                                        .createQueryBuilder('allergy-intolerance')
                                        .innerJoinAndSelect('allergy-intolerance.patient', 'patient')
                                        .innerJoinAndSelect('allergy-intolerance.seriousness', 'seriousness_id')
                                        .getMany()

        const fhirAllergyIntolerances = (await allergyIntolerances).map(allergyIntolerance => {
            return generateAllergyTolerance(allergyIntolerance)
        });

        return fhirAllergyIntolerances;
    }

    async getgetAllergyIntoleranceById(id: string): Promise<any> {
        const allergyIntolerance = await this.allergyIntoleranceRepository
                                            .createQueryBuilder('allergy-intolerance')
                                            .innerJoinAndSelect('allergy-intolerance.patient', 'patient')
                                            .innerJoinAndSelect('allergy-intolerance.seriousness', 'seriousness_id')
                                            .where('allergy-intolerance.id = :id', { id })
                                            .getOne();

        return generateAllergyTolerance(allergyIntolerance);
    }
}
