import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { Patient } from './patient.entity';
import { PatientsService } from './patients.service';
import { SearchFilterDto } from 'src/dtos/search-filter.dto';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService
  ) {}

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
    return this.patientsService.getPatientByID(id);
  }
}
