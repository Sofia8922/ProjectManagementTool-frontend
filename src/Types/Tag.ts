export interface TagCreateDTO {
  name: string;
  colour: string;
  projectId: number;
}

export interface TagDTO {
  id: number;
  name: string;
  colour: string;
}

export interface TagEditDTO {
  name: string;
  colour: string | null;
}