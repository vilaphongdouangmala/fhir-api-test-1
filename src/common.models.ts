import { AllergyIntolerance } from "./allergy-intolerance/allergy-intolerance.entity";
import { VitalSignData } from "./observation-vital/vital-sign-data.entity";
import { Patient } from "./patients/patient.entity";

export function generateObservationVitalJson(vitalSignData: VitalSignData): any {
    return {
        "resourceType": "Observation",
        "id": `observation-vital-${vitalSignData.id}`,
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
                    "display": `${vitalSignData.vitalSign.vitalSignName}`
                }
            ],
            "text": `${vitalSignData.vitalSign.vitalSignName}`
        },
        "subject": {
            "reference": `Patient/patient-${vitalSignData.patient.hn}`,
            "display": `${vitalSignData.patient.pname} ${vitalSignData.patient.fname} ${vitalSignData.patient.lname}`
        },
        "effectiveDateTime": `${vitalSignData.vitalSignDatetime}`,
        "valueQuantity": {
            "value": `${vitalSignData.vitalSignValue}`,
            "unit": `${vitalSignData.vitalSign.vitalSignUnit === null ? "null" : vitalSignData.vitalSign.vitalSignUnit}`,
            "system": "",
            "code": `${vitalSignData.vitalSign.vitalSignUnit === null ? "null" : vitalSignData.vitalSign.vitalSignUnit}`
        }
    };
}

export function generatePatientJson(patient: Patient) {
    return {
        "resourceType": 'Patient',
        "id": `patient-${patient.hn}`,
        "meta": {
            "profile": [
                'https://fhir-ig.sil-th.org/mophpc1/StructureDefinition/mophpc-patient-base',
            ],
        },
        "text": {
            "status": '',
            "div": '',
        },
        "identifier": [
            {
                "use": 'official',
                "type": {
                    "coding": [
                        {
                            "system":
                                'https://terms.sil-th.org/CodeSystem/cs-th-identifier-type',
                            "code": 'cid',
                            "display": 'เลขประจำตัวประชาชนไทย',
                        },
                    ],
                },
                "system": '',
                "value": patient.cid,
                "period": {
                    "start": '',
                    "end": '',
                },
            },
            {
                "use": '',
                "type": {
                    "coding": [
                        {
                            "system":
                                '',
                            "code": '',
                            "display": '',
                        },
                    ],
                },
                "system": '',
                "value": '',
                "period": {
                    "start": '',
                },
            },
            {
                "use": '',
                "type": {
                    "coding": [
                        {
                            "system":
                                '',
                            "code": '',
                            "display": '',
                        },
                    ],
                },
                "system": '',
                "value": '',
            },
        ],
        "active": true,
        "name": [
            {
                "extension": [
                    {
                        "url": 'http://hl7.org/fhir/StructureDefinition/language',
                        "valueCode": 'th',
                    },
                ],
                "text": `${patient.pname} ${patient.lname} ${patient.fname}`,
                "family": patient.lname,
                "given": [patient.fname],
                "prefix": [patient.pname],
            },
        ],
        "telecom": [
            {
                "system": '',
                "value": '',
                "use": '',
            },
            {
                "system": '',
                "value": '',
            },
        ],
        "gender": patient.sex,
        "birthDate": patient.birthday,
        "address": [
            {
                "extension": [
                    {
                        "url":
                            '',
                        "valueCodeableConcept": {
                            "coding": [
                                {
                                    "system":
                                        '',
                                    "code": '',
                                    "display": '',
                                },
                            ],
                        },
                    },
                    {
                        "extension": [
                            {
                                "url": '',
                                "valueDecimal": 0,
                            },
                            {
                                "url": '',
                                "valueDecimal": 0,
                            },
                        ],
                        "url": '',
                    },
                    {
                        "extension": [
                            {
                                "url": '',
                                "valueString": '',
                            },
                        ],
                        "url": '',
                    },
                ],
                "use": '',
                "text":
                    '',
                "line": [''],
                "city": '',
                "district": '',
                "state": '',
                "postalCode": '',
            },
        ],
        "maritalStatus": {
            "coding": [
                {
                    "system": '',
                    "code": '',
                    "display": '',
                },
            ],
        },
    };
}

export function generateAllergyTolerance(allergyIntolerance: AllergyIntolerance) {
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
}

export function generateSearchSetBundleJson(entries: any) {
    const fhirJson = { 
        resourceType: "Bundle",
        type: "searchset",
        total: entries.length,
        link: [],
        entry: entries
    }

    // Generate links for paging (only for example purpose)

    // !!! these pagining variables are examples only !!!
    const currentPage = 2;
    const pageSize = 10;
    const totalMatched = entries.length;
    // !!!

    // 1. Get total number of pages
    const totalPages = Math.ceil(totalMatched / pageSize);

    // 2. Calculate the previous page number
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    // 3. Calculate the next page number
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    //4. Apply the link
    // Current
    fhirJson.link = [
        {
            relation: "self",
            url: `https://example.com/api/resource?_page=${currentPage}`
        }
    ];

    // Next link
    if (nextPage) {
        fhirJson.link.push({
            relation: "next",
            url: `https://example.com/api/resource?_page=${nextPage}`
        });
    }

    // Previous link
    if (prevPage) {
        fhirJson.link.push({
            relation: "prev",
            url: `https://example.com/api/resource?_page=${prevPage}`
        });
    }

    return fhirJson;
}