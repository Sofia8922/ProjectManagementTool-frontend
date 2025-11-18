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
  status: string;
  project: ProjectShortDTO;
  comments: CommentShortDTO[];
  creator: AccountShortDTO;
  tags: TagDTO[];
  assignedDevelopers: AccountShortDTO[];
}

export interface TaskEditDTO {
  name: string;
  content: string;
  status: string;
}

export interface TaskShortDTO {
    id: number;
    name: string;
    content: string;
    status: string;
}