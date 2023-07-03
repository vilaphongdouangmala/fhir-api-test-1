import { Controller, Get } from '@nestjs/common';
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
}
