import { Controller, Get, Param, Query } from '@nestjs/common';
import { ObservationVitalService } from './observation-vital.service';
import { SearchFilterDto } from 'src/dtos/search-filter.dto';

@Controller('observation-vital')
export class ObservationVitalController {
    constructor(
        private readonly observationVitalService: ObservationVitalService
    ) { }

    @Get()
    async getVitalSigns(
      @Query() searchFilterDto: SearchFilterDto
    ): Promise<any> {
        return this.observationVitalService.getVitalSigns(searchFilterDto);
    }

    @Get("/:id")
    async getVitalSignDataById(
        @Param('id') id: string
    ): Promise<any> {
        return this.observationVitalService.getVitalSignDataById(id);
    }
}