import type { AccountShortDTO } from "./Account";
import type { CommentShortDTO } from "./Comment";
import type { ProjectShortDTO } from "./Project";
import type { TagDTO } from "./Tag";
 
export interface TaskCreateDTO {
  name: string;
  content: string;
  creatorId: number;
  projectId: number;
}
 
export interface TaskDTO {
  id: number;
  name: string;
  content: string;
  status: status;
  project: ProjectShortDTO;
  comments: CommentShortDTO[];
  creator: AccountShortDTO;
  tags: TagDTO[];
  assignedDevelopers: AccountShortDTO[];
}

export interface TaskEditDTO {
  name: string;
  content: string;
  status: status;
}

export interface TaskShortDTO {
    id: number;
    name: string;
    content: string;
    status: status;
}

export enum status {
PENDING,
INPROGRESS,
ONHOLD,
UNDERREVIEW,
COMPLETED,
SCRAPPED
}