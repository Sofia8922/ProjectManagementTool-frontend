export interface LoginDTO {
    email:string,
    password:string
}
<<<<<<< HEAD

=======
 
>>>>>>> 9011c3f4e5a6e7629634b6dfe0824695c51fb043
export interface AccountCreationDTO {
    name:string,
    email:string,
    role:RoleEnums,
    password:string    
}
<<<<<<< HEAD

=======
 
>>>>>>> 9011c3f4e5a6e7629634b6dfe0824695c51fb043
export type RoleEnums = 'OWNER' | 'DEVELOPER' | 'CUSTOMER'