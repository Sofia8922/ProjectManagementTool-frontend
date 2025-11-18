import type { AccountShortDTO } from "./Account";
import type { TaskShortDTO } from "./Task";

export interface CommentCreateDTO {
  content: string;
  authorId: number;
  taskId: number;
}
  
export interface CommentDTO {
  id: number;
  content: string;
  author: AccountShortDTO;
  task: TaskShortDTO;
}

export interface CommentEditDTO {
  content: string;
}

export interface CommentShortDTO {
  id: number;
  content: string;
}