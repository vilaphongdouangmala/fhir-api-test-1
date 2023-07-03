import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VitalSign } from './vital-sign.entity';
import { Repository } from 'typeorm';
import { VitalSignData } from './vital-sign-data.entity';
import { Patient } from 'src/patients/patient.entity';

@Injectable()
export class ObservationVitalService {
    constructor(
        @InjectRepository(VitalSign)
        private readonly vitalSignRepository: Repository<VitalSign>,
        @InjectRepository(VitalSignData)
        private readonly vitalSignDataRepository: Repository<VitalSignData>,
    ) { }

    async getVitalSigns(): Promise<any> {
        const vitalSigns = await this.vitalSignRepository
                                .createQueryBuilder('vital-sign')
                                .innerJoinAndSelect('vital-sign.vitalSignData', 'vital-sign-data')
                                .innerJoinAndSelect('vital-sign-data.patient', 'patient')
                                .getMany();

        const fhirVitalSigns = vitalSigns.map(vitalSign => {
            return {
                "resourceType": "Observation",
                "id": `observation-vital-${vitalSign.vitalSignId}`,
                "meta": {
                    "profile": [
                        "https://fhir-ig.sil-th.org/mophpc1/StructureDefinition/mophpc-observation-vital-base"
                    ]
                },
                "text": {
                    "status": "",
                    "div": "",
                },
                "status": "",
                "category": [
                    {
                        "coding": [
                            {
                                "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                                "code": "vital-signs",
                                "display": "Vital Signs"
                            }
                        ],
                        "text": "Vital Signs"
                    }
                ],
                "code": {
                    "coding": [
                        {
                            "system": "",
                            "code": "",
                            "display": `${vitalSign.vitalSignName}`
                        }
                    ],
                    "text": `${vitalSign.vitalSignName}`
                },
                "subject": {
                    "reference": `Patient/patient-${vitalSign.vitalSignData[0].patient.hn}`,
                    "display": `${vitalSign.vitalSignData[0].patient.pname} ${vitalSign.vitalSignData[0].patient.fname} ${vitalSign.vitalSignData[0].patient.lname}`
                },
                "effectiveDateTime": `${vitalSign.vitalSignData[0].vitalSignDatetime}`,
                "valueQuantity": {
                    "value": `${vitalSign.vitalSignData[0].vitalSignValue}`,
                    "unit": `${vitalSign.vitalSignUnit === null ? "null" : vitalSign.vitalSignUnit}`,
                    "system": "",
                    "code": `${vitalSign.vitalSignUnit === null ? "null" : vitalSign.vitalSignUnit}`
                }
            };
        });

        console.log(fhirVitalSigns);

        return fhirVitalSigns;
    }
}
