export interface User {
    id?: number;
    username: string;
    email: string;
    password?: string;
    role?: string;
}

export interface Login {
    token?: String;
    id?:  number;
    roles?: ("ROLE_USER" | "ROLE_ADMIN")[];
}
