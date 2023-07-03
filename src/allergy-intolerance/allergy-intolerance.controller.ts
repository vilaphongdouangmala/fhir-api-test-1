import { Controller, Get } from '@nestjs/common';
import { AllergyIntolerance } from './allergy-intolerance.entity';
import { AllergyIntoleranceService } from './allergy-intolerance.service';

@Controller('allergy-intolerance')
export class AllergyIntoleranceController {
    constructor(
        private readonly allergyIntoleranceService: AllergyIntoleranceService
    ) { }

    @Get()
    async getPatients(): Promise<any> {
        return this.allergyIntoleranceService.getAllergyIntolerances();
    }
}
