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

export enum GenderType {
    MALE = 'male',
    FEMALE = 'female'
}