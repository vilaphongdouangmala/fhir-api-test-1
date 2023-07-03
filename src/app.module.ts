import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { dataSourceOptions } from './db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AllergyIntoleranceModule } from './allergy-intolerance/allergy-intolerance.module';
import { ObservationVitalModule } from './observation-vital/observation-vital.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    PatientsModule,
    AllergyIntoleranceModule,
    ObservationVitalModule,
  ],
  
})
export class AppModule {}
