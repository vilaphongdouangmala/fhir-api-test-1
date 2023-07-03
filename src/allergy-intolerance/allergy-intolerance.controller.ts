import { Controller, Get, Param } from '@nestjs/common';
import { AllergyIntolerance } from './allergy-intolerance.entity';
import { AllergyIntoleranceService } from './allergy-intolerance.service';

@Controller('allergy-intolerance')
export class AllergyIntoleranceController {
    constructor(
        private readonly allergyIntoleranceService: AllergyIntoleranceService
    ) { }

    @Get()
    async getAllergyIntolerances(): Promise<any> {
      return this.allergyIntoleranceService.getAllergyIntolerances();
    }

    @Get('/:id')
    async getAllergyIntoleranceById(
      @Param('id') id: string
    ): Promise<any> {
      return this.allergyIntoleranceService.getgetAllergyIntoleranceById(id);
    }
}
