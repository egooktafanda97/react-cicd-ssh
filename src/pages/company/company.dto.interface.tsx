import SpkButton from "@/@spk/uielements/spk-button";
import { _ } from "gridjs-react";
import { extend } from "leaflet";



export interface companyCreateDto {
    username: string;
    email: string;
    password: string;
    name: string;
    address1?: string | null;
    address2?: string | null;
    address3?: string | null;
    zipcode?: string | null;
    telephone1?: string | null;
    telephone2?: string | null;
    fax?: string | null;
    website?: string | null;
    avatar: any;
    cover: any;
}

export interface companyUpdateDto {
    name: string;
    address1?: string | null;
    address2?: string | null;
    address3?: string | null;
    zipcode?: string | null;
    telephone1?: string | null;
    telephone2?: string | null;
    fax?: string | null;
    website?: string | null;
    avatar: any;
    cover: any;
}

export interface companyDto extends companyCreateDto {
    id: number;
    users: {
        id: number;
        username: string;
        email: string;
        avatar: string;
    }
}


