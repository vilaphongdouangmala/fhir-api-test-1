import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AllergyIntolerance } from 'src/allergy-intolerance/allergy-intolerance.entity';
import { VitalSignData } from 'src/observation-vital/vital-sign-data.entity';
import { VitalSign } from 'src/observation-vital/vital-sign.entity';
import { Patient } from 'src/patients/patient.entity';
import { Repository } from 'typeorm';
import { BatchRequest } from './dtos/batch-request.dtos';
import { PatientsService } from 'src/patients/patients.service';
import { ObservationVitalService } from 'src/observation-vital/observation-vital.service';
import { AllergyIntoleranceService } from 'src/allergy-intolerance/allergy-intolerance.service';
import { SearchFilterDto } from 'src/dtos/search-filter.dto';

@Injectable()
export class BatchService {
  constructor(
    // @InjectRepository(Patient)
    // private readonly patientRepository: Repository<Patient>,
    // @InjectRepository(AllergyIntolerance)
    // private readonly allergyIntoleranceRepository: Repository<AllergyIntolerance>,
    // @InjectRepository(VitalSignData)
    // private readonly vitalSignDataRepository: Repository<VitalSignData>,
    private readonly patientService: PatientsService,
    private readonly observationVitalService: ObservationVitalService,
    private readonly allergyIntoleranceService: AllergyIntoleranceService,
  ) {}

  async processBatchRequest(batchRequest: BatchRequest): Promise<any> {
    const results = [];

    for (const indvidualRequest of batchRequest.entry) {
      const { method, url } = indvidualRequest.request;
      switch (method.toString()) {
        case 'GET':
          results.push(await this.handleGetRequest(url));
          break;
          // Add cases for other HTTP methods (POST, PUT, DELETE) if needed
        default:
          throw new InternalServerErrorException("Invalid request HTTP method.");
      }
    }

    return {
        "resourceType" : "Bundle",
        "id" : "bundle-response-simplesummary",
        "type" : "batch-response",
        "entry": results,
    };
  }

  async handleGetRequest(url: string): Promise<any> {
    
    /** patients **/

    //with filter
    if (url.startsWith('/patients/?')) {
      //verify in case there is params
      const queryParams = new URLSearchParams(url.substring(url.indexOf('?')));
      const searchParams: Record<string, string | string[]> = {};
      
      queryParams.forEach((value, key) => {
        searchParams[key] = value;
      });

      const searchFilterDto: SearchFilterDto = { ...searchParams };

      return await this.patientService.getPatients(searchFilterDto);
    }

    //get by everything
    if (url.startsWith('/patients/') && url.endsWith('/$everything')) {
      console.log("thisone", url);
      const patientId = url.split('/')[2];
      return this.patientService.getPatientEverything(patientId);
    }

    //get by ID
    if (url.startsWith('/patients/')) {
      console.log("thisone", url);
      const patientId = url.split('/').pop();
      return this.patientService.getPatientById(patientId);
    }

    //get all records
    if (url.startsWith('/patients')) {
      return this.patientService.getPatients({});
    }



    /** Observation: Vital **/
    if (url.startsWith('/observation-vital')) {
        //verify in case there is params
        const queryParams = new URLSearchParams(url.substring(url.indexOf('?')));
        const searchParams: Record<string, string | string[]> = {};
        
        queryParams.forEach((value, key) => {
            searchParams[key] = value;
        });

        const searchFilterDto: SearchFilterDto = { ...searchParams };

        return await this.observationVitalService.getVitalSigns(searchFilterDto);
    }

    //get by ID
    if (url.startsWith('/observation-vital/')) {
      const id = url.split('/').pop();
      return this.observationVitalService.getVitalSignDataById(id);
    }

    //get all records
    if (url.startsWith('/observation-vital')) {
      return this.observationVitalService.getVitalSigns({});
    }



    /** AllergyIntolerance **/
    if (url.startsWith('/allergy-intolerance')) {
        //verify in case there is params
        const queryParams = new URLSearchParams(url.substring(url.indexOf('?')));
        const searchParams: Record<string, string | string[]> = {};
        
        queryParams.forEach((value, key) => {
            searchParams[key] = value;
        });

        const searchFilterDto: SearchFilterDto = { ...searchParams };

        return await this.allergyIntoleranceService.getAllergyIntolerances(searchFilterDto);
    }

    //get by ID
    if (url.startsWith('/observation-vital/')) {
      const id = url.split('/').pop();
      return this.allergyIntoleranceService.getAllergyIntoleranceById(id);
    }

    //get all records
    if (url.startsWith('/observation-vital')) {
      return this.allergyIntoleranceService.getAllergyIntolerances({});
    }


    //throw error if api is not found
    throw new NotFoundException('Unsupported request');
  }
}
