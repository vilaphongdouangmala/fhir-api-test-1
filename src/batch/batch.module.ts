import { Module } from '@nestjs/common';
import { BatchController } from './batch.controller';
import { BatchService } from './batch.service';
import { PatientsService } from 'src/patients/patients.service';
import { AllergyIntoleranceService } from 'src/allergy-intolerance/allergy-intolerance.service';
import { ObservationVitalService } from 'src/observation-vital/observation-vital.service';
import { Seriousness_id } from 'src/allergy-intolerance/seriousness-id.entity';
import { VitalSign } from 'src/observation-vital/vital-sign.entity';
import { VitalSignData } from 'src/observation-vital/vital-sign-data.entity';
import { AllergyIntolerance } from 'src/allergy-intolerance/allergy-intolerance.entity';
import { Patient } from 'src/patients/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Patient,
      AllergyIntolerance,
      VitalSignData,
      VitalSign,
      Seriousness_id,
    ]),
  ],
  controllers: [BatchController],
  providers: [
    BatchService,
    PatientsService,
    AllergyIntoleranceService,
    ObservationVitalService,
  ]
})
export class BatchModule { }
