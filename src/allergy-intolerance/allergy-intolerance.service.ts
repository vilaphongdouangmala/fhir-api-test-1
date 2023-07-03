import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllergyIntolerance } from './allergy-intolerance.entity';
import { Seriousness_id } from './seriousness-id.entity';

@Injectable()
export class AllergyIntoleranceService {
    constructor(
        @InjectRepository(AllergyIntolerance)
        private readonly allergyIntoleranceRepository: Repository<AllergyIntolerance>,
        @InjectRepository(Seriousness_id)
        private readonly seriousnessRepository: Repository<Seriousness_id>
    ) { }

    async getAllergyIntolerances(): Promise<any> {
        const allergyIntolerances = this.allergyIntoleranceRepository
            .createQueryBuilder('allergy-intolerance')
            .innerJoinAndSelect('allergy-intolerance.patient', 'patient')
            .innerJoinAndSelect('allergy-intolerance.seriousness', 'seriousness_id')
            .getMany()

        const fhirAllergyIntolerances = (await allergyIntolerances).map(allergyIntolerance => {
            return {
                "resourceType": "AllergyIntolerance",
                "id": `allergyintolerance-${allergyIntolerance.patient.hn}`,
                "meta": {
                    "profile": [
                        "https://fhir-ig.sil-th.org/mophpc1/StructureDefinition/mophpc-allergyintolerance-base"
                    ]
                },
                "text": {
                    "status": "",
                    "div": ""
                },
                "extension": [
                    {
                        "url": "",
                        "valueCodeableConcept": {
                            "coding": [
                                {
                                    "system": "",
                                    "code": "",
                                    "display": ""
                                }
                            ]
                        }
                    },
                    {
                        "url": "https://fhir-ig.sil-th.org/mophpc1/StructureDefinition/ex-allergyintolerance-allergy-severity",
                        "valueCodeableConcept": {
                            "coding": [
                                {
                                    "system": "https://terms.sil-th.org/CodeSystem/cs-thcc-allergy-severity",
                                    "code": `${allergyIntolerance.seriousness.seriousnessId}`,
                                    "display": `${allergyIntolerance.seriousness.name}`
                                }
                            ]
                        }
                    },
                    {
                        "url": "",
                        "valueCodeableConcept": {
                            "coding": [
                                {
                                    "system": "",
                                    "code": "",
                                    "display": ""
                                }
                            ]
                        }
                    },
                    {
                        "url": "",
                        "valueReference": {
                            "reference": ""
                        }
                    }
                ],
                "clinicalStatus": {
                    "coding": [
                        {
                            "system": "",
                            "code": "",
                            "display": ""
                        }
                    ]
                },
                "verificationStatus": {
                    "coding": [
                        {
                            "system": "",
                            "code": "",
                            "display": ""
                        }
                    ]
                },
                "category": [
                    ""
                ],
                "code": {
                    "coding": [
                        {
                            "system": "",
                            "code": "",
                            "display": ""
                        },
                        {
                            "system": "",
                            "code": "",
                            "display": ""
                        }
                    ],
                    "text": `${allergyIntolerance.agent}`
                },
                "patient": {
                    "reference": `Patient/patient-${allergyIntolerance.patient.hn}`
                },
                "recordedDate": `${allergyIntolerance.reportDate}`,
                "recorder": {
                    "reference": ""
                },
                "reaction": [
                    {
                        "manifestation": [
                            {
                                "coding": [
                                    {
                                        "system": "",
                                        "code": "",
                                        "display": ""
                                    },
                                    {
                                        "system": "",
                                        "code": "",
                                        "display": ""
                                    }
                                ],
                                "text": `${allergyIntolerance.symptom}`
                            }
                        ]
                    }
                ]
            };
        });

        return fhirAllergyIntolerances;
    }
}
