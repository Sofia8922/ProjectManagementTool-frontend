import type { CommentShortDTO } from "./Comment";
import type { ProjectShortDTO } from "./Project";
import type { TaskShortDTO } from "./Task";

export interface AccountCreateDTO {
    email: string;
    name: string;
    password: string;
    role: string
}

export interface AccountDTO {
    id: number;
    email: string;
    name: string;
    role: string;
    madeComments: CommentShortDTO[];
    madeTasks: TaskShortDTO[];
    madeProjects: ProjectShortDTO[];
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
  role: string;
}