import { Controller, Get, Param } from '@nestjs/common';
import { Patient } from './patient.entity';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService
  ) {}

  @Get()
  async getPatients(): Promise<any> {
    return this.patientsService.getPatients();
  }

  @Get('/:id')
  async getPatientById(
    @Param('id') id: string
  ): Promise<any> {
    return this.patientsService.getPatientByID(id);
  }
}
