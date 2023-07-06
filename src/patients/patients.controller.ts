import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Query, Req } from '@nestjs/common';
import { Patient } from './patient.entity';
import { PatientsService } from './patients.service';
import { SearchFilterDto } from 'src/dtos/search-filter.dto';
import { ObservationVitalService } from 'src/observation-vital/observation-vital.service';
import { AllergyIntoleranceService } from 'src/allergy-intolerance/allergy-intolerance.service';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly observationVitalService: ObservationVitalService,
    private readonly allergyIntoleranceService: AllergyIntoleranceService,
  ) { }

  @Get()
  async getPatients(
    @Query() searchFilterDto: SearchFilterDto
  ): Promise<any> {
    return this.patientsService.getPatients(searchFilterDto);
  }

  @Get('/:id')
  async getPatientById(
    @Param('id') id: string
  ): Promise<any> {
    return this.patientsService.getPatientById(id);
  }

  @Get('/:id/*')
  async getPatientEverything(
    @Param('id') id: string,
    @Req() request: any,
  ): Promise<any> {
    const operation = request.params[0];
    if (operation === '$everything') {
      return this.patientsService.getPatientEverything(id);
  } else {
        throw new NotFoundException()
    }
  }
}
