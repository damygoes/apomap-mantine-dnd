import TasksTable from "./components/TasksTable";

function App() {
  return (
    <div className="flex flex-col justify-start items-start p-4 gap-4 h-screen w-full border-none">
      <h1>Welcome to Drag-N-Drop</h1>
      <div className="flex justify-between items-start h-full w-full p-2 gap-4 ">
        <div className="w-1/2 p-2 bg-slate-200 h-full rounded-md border-none">
          <TasksTable />
        </div>
        <div
          className="w-1/2 p-2 bg-slate-200 h-full rounded-md border-none"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            console.log(`Dropped in Tour`);
          }}
        >
          <h2>Tours</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
