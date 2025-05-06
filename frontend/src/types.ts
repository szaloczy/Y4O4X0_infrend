export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AccessTokenDTO {
    accessToken: string;
}

export interface LocationDTO {
    id: number;
    code: string;
    name: string;
    address: string;
    active: boolean;
}

export interface UserDTO {
    id: number;
    username: string;
    email: string;
    role: string;
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
    id: number;
    date: Date;
    eligible: boolean;
    reason: string | null;
    doctor: string;
    controlled: boolean;
    patient_fullname: string | null;
    patient_taj: number | null;
    client: ClientDTO;
    location: LocationDTO;
}

export enum GenderType {
    MALE = 'male',
    FEMALE = 'female'
}