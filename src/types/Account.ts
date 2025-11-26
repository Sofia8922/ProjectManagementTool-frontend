import type { CommentShortDTO } from "./Comment";
import type { ProjectShortDTO } from "./Project";
import type { TaskShortDTO } from "./Task";

export interface AccountCreateDTO {
  name: string;
  email: string;
    password: string;
    role: string
}

export interface AccountDTO {
    id: number;
    name: string;
    email: string;
    role: string;
    madeComments: CommentShortDTO[];
    madeTasks: TaskShortDTO[];
    madeProjects: ProjectShortDTO[];
}

export interface AccountEditDTO{
  name: string;
  email: string;
    password: string;
}

export interface AccountLoginReturnDTO {
    id: number;
    name: string;
}

export interface AccountPasswordDTO {
  password: string;
}

export interface AccountShortDTO {
  id: number;
  name: string;
  email: string;
  role: string;
}
export interface AccountNameDTO {
  id:number;
  name:string;
}