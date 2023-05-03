import { createStyles, Text, rem } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  customerId: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },
}));

// interface DndListProps {
//   data: {
//     position: number;
//     mass: number;
//     symbol: string;
//     name: string;
//   }[];
// }
interface DndListProps {
  data: {
    customerId: number;
    customerName: string;
    customerAddress: string;
    pharmacy: string;
    openAmount: number;
    taskType: string;
  }[];
}

export default function Task({ data }: DndListProps) {
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(data);

  const items = state.map((item, index) => (
    <Draggable
      key={item.customerId}
      index={index}
      draggableId={item.customerName}
    >
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Text className={classes.customerId}>{item.customerId}</Text>
          <div>
            <Text>{item.customerName}</Text>
            <Text color="dimmed" size="sm">
              Position: {item.customerAddress} • Mass: {item.pharmacy} • Amount:
              {item.openAmount}
            </Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
