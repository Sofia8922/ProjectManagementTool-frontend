export interface LoginDTO {
    email:string,
    password:string
}

export interface AccountCreationDTO {
    name:string,
    email:string,
    role:RoleEnums,
    password:string    
}

export type RoleEnums = 'OWNER' | 'DEVELOPER' | 'CUSTOMER'