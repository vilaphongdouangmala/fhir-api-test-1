import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { AllergyIntoleranceService } from 'src/allergy-intolerance/allergy-intolerance.service';
import { ObservationVitalService } from 'src/observation-vital/observation-vital.service';
import { AllergyIntolerance } from 'src/allergy-intolerance/allergy-intolerance.entity';
import { VitalSignData } from 'src/observation-vital/vital-sign-data.entity';
import { VitalSign } from 'src/observation-vital/vital-sign.entity';
import { Seriousness_id } from 'src/allergy-intolerance/seriousness-id.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Patient,
      AllergyIntolerance,
      VitalSignData,
      VitalSign,
      Seriousness_id,
    ])
  ],
  controllers: [PatientsController],
  providers: [
    PatientsService,
    AllergyIntoleranceService,
    ObservationVitalService,
  ]
})
export class PatientsModule {}
