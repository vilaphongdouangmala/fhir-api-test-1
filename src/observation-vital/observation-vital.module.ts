import { Module } from '@nestjs/common';
import { ObservationVitalController } from './observation-vital.controller';
import { ObservationVitalService } from './observation-vital.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VitalSign } from './vital-sign.entity';
import { VitalSignData } from './vital-sign-data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VitalSign, VitalSignData])
  ],
  controllers: [ObservationVitalController],
  providers: [ObservationVitalService]
})
export class ObservationVitalModule {}
