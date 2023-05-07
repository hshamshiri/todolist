import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import InputText from "./component/inputText";
import FilterButton from "./component/filterButton";

const Footer = ({ tasks, filterItem }) => {
  return (
    <div
      className=" flex w-full static bottom-0 left-0  h-20 items-center  p-2 bg-green-300"
      style={{}}
    >
      <div className="flex  w-1/2 px-4 ">
        <p>{`${tasks.length} items left`}</p>
      </div>

      <div className="flex w-1/2 justify-end px-4">
        <FilterButton filterItem={filterItem} title={"all"} />
        <FilterButton filterItem={filterItem} title={"active"} />
        <FilterButton filterItem={filterItem} title={"done"} />
      </div>
    </div>
  );
};

const TodoBody = ({
  tasks,
  term,
  changeActive,
  editTask,
  doneTask,
  deleteTask,
}) => {
  return (
    <div className="w-full h-screen pxs-5 overflow-y-scroll bg-slate-500 p-3">
      {tasks.length > 0 &&
        tasks
          .filter((task) => {
            if (term === "all") return task;
            if (term === "active" && task.active === true) return task;
            if (term === "done" && task.done === true) return task;
          })
          .map((task, i) => {
            return (
              <div
                className="flex justify-between  items-center border-b-2 p-2"
                key={`task-${i}`}
              >
                <div className="flex">
                  <input
                    className="mr-2 ml-1"
                    // defaultChecked={task.active}
                    onChange={() => changeActive(i)}
                    type={"checkbox"}
                    checked={task.active}
                  />
                  <p
                    className={clsx({
                      "line-through text-blue-800": task.done,
                      "text-slate-50": !task.done,
                    })}
                  >
                    {task.task}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => editTask(task, i)}
                    className="h-fit p-1 mr-1 border rounded px-4 bg-blue-200"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => doneTask(i)}
                    className={clsx({
                      "h-fit p-1 border rounded px-4 bg-red-200": task.done,
                      "h-fit p-1 border rounded px-4 bg-blue-200": !task.done,
                    })}
                  >
                    {task.done ? "undone" : "done"}
                  </button>
                  <button
                    className="h-fit p-1 ml-1 border rounded px-4 bg-red-400"
                    onClick={() => deleteTask(i)}
                  >
                    remove
                  </button>
                </div>
              </div>
            );
          })}
    </div>
  );
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");
  const [indexChangeElement, setIndexChangeElement] = useState(-1);
  const [term, setTerm] = useState("all");

  const inputHasChange = (value) => {
    setInputText(value);
  };
  useEffect(() => {
    function retrieveData() {
      if (localStorage.getItem("tasksList")) {
        retrieveFromLocalStorage();
      } else {
        //localStorage.setItem("tasksList", tasks);
      }
    }
    retrieveData();
  }, []);

  const saveTask = (keyCode) => {
    if (keyCode === 13) {
      if (inputText === "") {
        //do something
      } else {
        if (indexChangeElement >= 0) {
          let newTasks = [...tasks];
          newTasks[indexChangeElement].task = inputText;
          setTasks(newTasks);
        } else
          setTasks([...tasks, { task: inputText, active: false, done: false }]);
      }
      setInputText("");
      setIndexChangeElement(-1);
      saveTolocalStorage();
    }
  };

  const saveTolocalStorage = () => {
    localStorage.setItem("tasksList", JSON.stringify(tasks));
  };
  const retrieveFromLocalStorage = () => {
    let tasks = JSON.parse(localStorage.getItem("tasksList"));
    setTasks(tasks);
  };

  const editTask = (task, index) => {
    setIndexChangeElement(index);
    setInputText(task.task);
  };

  const changeActive = (index) => {
    let cloneTask = [...tasks];
    if (!cloneTask[index].done) {
      cloneTask[index].active = !cloneTask[index].active;
      setTasks(cloneTask);
      saveTolocalStorage();
    }
  };

  const doneTask = (index) => {
    let cloneTask = [...tasks];
    cloneTask[index].done = !cloneTask[index].done;
    cloneTask[index].active = false;
    setTasks(cloneTask);
    saveTolocalStorage();
  };

  const deleteTask = (index) => {
    let cloneTask = [...tasks];
    cloneTask.splice(index, 1);
    setTasks(cloneTask);
    saveTolocalStorage();
  };

  const filterItem = (type) => {
    setTerm(type);
  };

  return (
    <div className="flex items-center align-center h-full w-full">
      <div className=" w-screen h-screen border-redius max-h-full    bg-zinc-200">
        <div className="flex flex-col items-center max-h-full  p-2 h-full w-full bg-blue-100">
          <h1 className="font-black text-slate-600 mt-5">Thinks To Do</h1>
          {/* input */}
          <InputText
            saveTask={saveTask}
            inputText={inputText}
            inputHasChange={inputHasChange}
          />

          <TodoBody
            tasks={tasks}
            term={term}
            changeActive={changeActive}
            editTask={editTask}
            doneTask={doneTask}
            deleteTask={deleteTask}
          />

          {/* footer */}
          <Footer tasks={tasks} filterItem={filterItem} />
        </div>
      </div>
    </div>
  );
}

export default App;
