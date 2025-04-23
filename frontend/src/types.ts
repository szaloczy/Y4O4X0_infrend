export interface LocationDTO {
    id: number;
    code: string;
    name: string;
    address: string;
    active: boolean;
}

export interface ClientDTO {
    id: number;
    fullname: string;
    birthplace: string;
    date_of_birth: Date;
    citizenship: string;
    address: string;
    taj_number: string;
    gender: GenderType;
}

export interface DonationDTO {
    date: Date;
    eligible: boolean;
    reason?: string;
    doctor: string;
    controlled: boolean;
    patient_fullname?: string;
    patient_taj?: string;
    client: number;
    location: number;
}

export enum GenderType {
    MALE = 'male',
    FEMALE = 'female'
}