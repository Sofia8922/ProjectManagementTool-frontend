import { createStore } from "@odemian/react-store";

export const [useProjectId, updateProjectId] = createStore<number>(NaN);