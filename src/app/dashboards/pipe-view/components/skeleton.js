import { KanbanBoardSkeleton } from "./board";
import { KanbanColumnSkeleton } from "./column";
import { DealKanbanCardSkeleton } from "./deal-kanban-card";

export const PageSkeleton = () => {
    const columnCount = 6;
    const itemCount = 4;

    return (
        <KanbanBoardSkeleton>
            {Array.from({ length: columnCount }).map((_, index) => {
                return (
                    <KanbanColumnSkeleton key={index} type="deal">
                        {Array.from({ length: itemCount }).map((_, index) => {
                            return <DealKanbanCardSkeleton key={index} />;
                        })}
                    </KanbanColumnSkeleton>
                );
            })}
        </KanbanBoardSkeleton>
    );
};
