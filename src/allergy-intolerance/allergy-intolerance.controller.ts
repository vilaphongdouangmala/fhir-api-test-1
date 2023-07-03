import { Controller, Get, Param, Query } from '@nestjs/common';
import { AllergyIntolerance } from './allergy-intolerance.entity';
import { AllergyIntoleranceService } from './allergy-intolerance.service';
import { SearchFilterDto } from 'src/dtos/search-filter.dto';

@Controller('allergy-intolerance')
export class AllergyIntoleranceController {
    constructor(
        private readonly allergyIntoleranceService: AllergyIntoleranceService
    ) { }

    @Get()
    async getAllergyIntolerances(
      @Query() searchFilterDto: SearchFilterDto
    ): Promise<any> {
      return this.allergyIntoleranceService.getAllergyIntolerances(searchFilterDto);
    }

    @Get('/:id')
    async getAllergyIntoleranceById(
      @Param('id') id: string
    ): Promise<any> {
      return this.allergyIntoleranceService.getAllergyIntoleranceById(id);
    }
}
