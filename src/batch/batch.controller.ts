import { Body, Controller, Post } from '@nestjs/common';
import { BatchService } from './batch.service';
import { BatchRequest } from './dtos/batch-request.dtos';
import { AllergyIntoleranceService } from 'src/allergy-intolerance/allergy-intolerance.service';

@Controller('batch')
export class BatchController {
  constructor(
    private readonly batchService: BatchService,
    ) {}

  @Post()
  async processBatchRequest(
    @Body() batchRequest: BatchRequest
    // @Body() test: string
  ): Promise<any> {
    console.log("batchRequest", batchRequest);
    return this.batchService.processBatchRequest(batchRequest);
  }
}
