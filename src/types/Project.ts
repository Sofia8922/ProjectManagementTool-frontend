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
  finishedStatus: boolean;
  scrappedStatus: boolean;
  projectCreator: AccountShortDTO;
  developers: AccountShortDTO;
  customers: AccountShortDTO;
}

export interface ProjectEditDTO {
  name: string;
  description: string;
  scrappedStatus: boolean;
}

export interface ProjectShortDTO {
  id: number;
  name: string;
  description: string;
  finishedStatus: boolean;
  scrappedStatus: boolean;
}