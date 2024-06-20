import {DraggableLocation} from "react-beautiful-dnd";

export type SortType = "all" | "active" | "completed"
export type Todo = {
    id: string,
    name: string | undefined,
    status: "active" | "completed" | "all"
}
export type TodoPostData = {
 name: string | undefined;
 status: string
}
export type DragEndResult = {
    draggableId: string,
    type: string,
    reason: string,
    source: {
        droppableId: string,
        index: number
    },
    destination: DraggableLocation | null | undefined
}