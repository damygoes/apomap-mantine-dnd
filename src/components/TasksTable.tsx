import { tasks } from "../dummyTasks";
import Task from "./Task";

type Props = {};

const TasksTable = (props: Props) => {
  return <Task data={tasks} />;
};

export default TasksTable;
