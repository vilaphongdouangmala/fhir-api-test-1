import { RequestMethod } from "@nestjs/common";
import { ValidateNested } from "class-validator";

export class BatchRequest {
    // resourceType: string;
    // id: string;
    // type: string;
    @ValidateNested({ each: true })
    entry: BatchIndividualRequest[];
}

export class BatchIndividualRequest {
  request: {
    method: RequestMethod;
    url: string
  }
}