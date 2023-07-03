import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>
    ) { }

    async getPatients(): Promise<any> {
        const patients = this.patientRepository.createQueryBuilder('patient').getMany();

        const fhirPatients = (await patients).map(patient => {
            return {
                resourceType: 'Patient',
                id: `patient-${patient.hn}`,
                meta: {
                    profile: [
                        'https://fhir-ig.sil-th.org/mophpc1/StructureDefinition/mophpc-patient-base',
                    ],
                },
                text: {
                    status: '',
                    div: '',
                },
                identifier: [
                    {
                        use: 'official',
                        type: {
                            coding: [
                                {
                                    system:
                                        'https://terms.sil-th.org/CodeSystem/cs-th-identifier-type',
                                    code: 'cid',
                                    display: 'เลขประจำตัวประชาชนไทย',
                                },
                            ],
                        },
                        system: '',
                        value: patient.cid,
                        period: {
                            start: '',
                            end: '',
                        },
                    },
                    {
                        use: '',
                        type: {
                            coding: [
                                {
                                    system:
                                        '',
                                    code: '',
                                    display: '',
                                },
                            ],
                        },
                        system: '',
                        value: '',
                        period: {
                            start: '',
                        },
                    },
                    {
                        use: '',
                        type: {
                            coding: [
                                {
                                    system:
                                        '',
                                    code: '',
                                    display: '',
                                },
                            ],
                        },
                        system: '',
                        value: '',
                    },
                ],
                active: true,
                name: [
                    {
                        extension: [
                            {
                                url: 'http://hl7.org/fhir/StructureDefinition/language',
                                valueCode: 'th',
                            },
                        ],
                        text: `${patient.pname} ${patient.lname} ${patient.fname}`,
                        family: patient.lname,
                        given: [patient.fname],
                        prefix: [patient.pname],
                    },
                ],
                telecom: [
                    {
                        system: '',
                        value: '',
                        use: '',
                    },
                    {
                        system: '',
                        value: '',
                    },
                ],
                gender: patient.sex,
                birthDate: patient.birthday,
                address: [
                    {
                        extension: [
                            {
                                url:
                                    '',
                                valueCodeableConcept: {
                                    coding: [
                                        {
                                            system:
                                                '',
                                            code: '',
                                            display: '',
                                        },
                                    ],
                                },
                            },
                            {
                                extension: [
                                    {
                                        url: '',
                                        valueDecimal: 0,
                                    },
                                    {
                                        url: '',
                                        valueDecimal: 0,
                                    },
                                ],
                                url: '',
                            },
                            {
                                extension: [
                                    {
                                        url: '',
                                        valueString: '',
                                    },
                                    {
                                        url: '',
                                        valueString: '',
                                    },
                                    {
                                        url: '',
                                        valueString: '',
                                    },
                                ],
                                url:
                                    '',
                            },
                        ],
                        use: '',
                        text:
                            '',
                        line: [''],
                        city: '',
                        district: '',
                        state: '',
                        postalCode: '',
                    },
                ],
                maritalStatus: {
                    coding: [
                        {
                            system: '',
                            code: '',
                            display: '',
                        },
                        {
                            system: '',
                            code: '',
                            display: '',
                        },
                    ],
                },
            };
        });
        return fhirPatients;
    }
}
