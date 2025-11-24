import type { AccountShortDTO } from "./Account";
import type { TagDTO } from "./Tag";
import type { TaskShortDTO } from "./Task";

export interface ProjectCreateDTO {
  name: string;
  description: string;
  creatorId: number;
}

export interface ProjectDTO {
  id: number;
  name: string;
  description: string;
  tags: TagDTO[];
  tasks: TaskShortDTO[];
  scrappedStatus: boolean;
  projectCreator: AccountShortDTO;
  projectDevelopers: AccountShortDTO[];
  projectCustomers: AccountShortDTO[];
}

export interface ProjectEditDTO {
  name: string;
  description: string;
  scrappedStatus: boolean;
  projectDevelopers: AccountShortDTO[];
  projectCustomers: AccountShortDTO[];
}

export interface ProjectShortDTO {
  id: number;
  name: string;
  description: string;
  scrappedStatus: boolean;
}