export interface AccountCreateDTO {
    email: string;
    name: string;
    password: string;
    UserRole: string
}

export interface AccountDTO {
    id: number;
    email: string;
    name: string;
    UserRole: string;
    madeComments: CommentShortDTO[];
    madeTasks: TaskShortDTO[];
    madeProjects: ProjectShort[];
}

export interface AccountEditDTO{
    email: string;
    name: string;
    password: string;
}

export interface AccountLoginReturnDTO {
    id: number;
    name: string;
}

export interface AccountPasswordDTO {
  password: string;
}

export interface  AccountShortDTO {
  id: number;
  email: string;
  name: string;
  UserRole: string;
}