import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../App";
import type { TaskShortDTO } from "../types/Task";
import { useUser } from "../stores/userStore";

interface ProgressCalculatorProps {
    id: number
}

const ProgressCalculator = ({ id }: ProgressCalculatorProps) => {

    const user = useUser();

    const {
        data: project,
        isLoading,
        error
    } = useQuery({
        queryKey: ["project", id],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/${user.id}/projects/${id}`);
            if (!response.ok) {
                throw new Error("projects error")
            }
            return response.json();
        },
    })

    if (isLoading) {
        return <p>loading</p>
    }
    if (error) {
        return <p>error</p>
    }

    const progress = () => {
        let completed = 0;
        let notCompleted = 0;

        project.tasks.forEach((task: TaskShortDTO) => {
            if (task.status === "COMPLETED") {
                completed += 1;
            } else {
                notCompleted += 1;
            }
        })
        console.log("FINALSCORE: completed: " + completed + " not completed: " + notCompleted)
        console.log("ID_PROP: " + id + " ID_RESPONSE " + project.id)

        if (completed == 0 && notCompleted == 0) {
            return (<>no tasks yet</>)
        }

        return (
            <>
                <>progress: </>
                <>{completed} / {completed + notCompleted} </>
                <>{completed / (completed + notCompleted) * 100}%</>
            </>
        )
    }

    return (
        <>
            <>{progress()}</>
        </>
    )
}

export default ProgressCalculator;