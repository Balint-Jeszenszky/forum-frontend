interface Role {
    id: number;
    name: "ROLE_USER" | "ROLE_ADMIN";
}

export interface User {
    id?: number;
    username: string;
    email: string;
    password?: string;
    roles?: Role[];
}

export interface EditUser {
    id: number;
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface Login {
    token?: String;
    id?:  number;
    roles?: ("ROLE_USER" | "ROLE_ADMIN")[];
}
