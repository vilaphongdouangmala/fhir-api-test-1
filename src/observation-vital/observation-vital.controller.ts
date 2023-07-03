import { Controller, Get } from '@nestjs/common';
import { ObservationVitalService } from './observation-vital.service';

@Controller('observation-vital')
export class ObservationVitalController {
    constructor(
        private readonly observationVitalService: ObservationVitalService
    ) { }

    @Get()
    async getVitalSigns(): Promise<any> {
        return this.observationVitalService.getVitalSigns();
    }
}