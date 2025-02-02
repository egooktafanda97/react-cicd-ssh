export type role =
    {
        id: number;
        name: string;
        reference_code: string;
        description: string;
    }
export type userAuthDto =
    {
        id: string;
        reference_code: string;
        displayname: string;
        username: string;
        email: string;
        avatar: string;
        cover: string;
        role: role[];
        company_id: string;
        user_istype: string;
        company: any
    }