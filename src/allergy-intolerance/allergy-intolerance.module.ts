import { Module } from '@nestjs/common';
import { AllergyIntoleranceService } from './allergy-intolerance.service';
import { AllergyIntoleranceController } from './allergy-intolerance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllergyIntolerance } from './allergy-intolerance.entity';
import { Seriousness_id } from './seriousness-id.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AllergyIntolerance, Seriousness_id])
  ],
  providers: [AllergyIntoleranceService],
  controllers: [AllergyIntoleranceController]
})
export class AllergyIntoleranceModule {}
