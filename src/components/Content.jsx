import React, { useState, useEffect } from "react";
import sun from "../images/icon-sun.svg";
import moon from "../images/icon-moon.svg";
import TaskList from "./TaskList";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { RiArrowDownDoubleFill } from "react-icons/ri";



const FILTER_ALL = "all";
const FILTER_COMPLETED = "completed";
const FILTER_ACTIVE = "active";

const Content = ({ theme, setTheme }) => {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(FILTER_ALL);


  const handleTheme = () => {
    setTheme(!theme);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask === "") return;
   

    console.log("enviado");

    const task = {
      id: Date.now(),
      task: newTask,
      isCompleted: false,
    };

    setTaskList([task, ...taskList]);

    form.reset();
    setNewTask("");
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleDelete = (id) => {
    const update = taskList.filter((element) => element.id !== id);
    setTaskList(update);
  };

  const handleCompleted = (id) => {
    const update = taskList.map((element) =>
      element.id === id
        ? {
            ...element,
            isCompleted: !element.isCompleted,
          }
        : element
    );

    setTaskList(update);
  };

  useEffect(() => {
    const update = taskList.filter((element) => element.isCompleted !== true);

    setItems(update);
  }, [taskList]);

  const clearCompleted = () => {
    setTaskList(items);
  };

  const filteredTodos = taskList.filter((element) => {
    if (filter === FILTER_ALL) {
      return true;
    } else if (filter === FILTER_COMPLETED) {
      return element.isCompleted;
    } else {
      return !element.isCompleted;
    }
  });

  const handleDragEnd = (e) => {
    const { active, over } = e;

    const oldIndex = taskList.findIndex((element) => element.id == active.id);
    const newIndex = taskList.findIndex((element) => element.id == over.id);

    const newOrder = arrayMove(taskList, oldIndex, newIndex);

    setTaskList(newOrder);
  };

  return (
    <main
     
    >
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <section className= "text-newTaskColor dark:text-black">
          <div className="absolute top-[0px] inset-0 my-container flex flex-col   px-[30px] py-[50px] md:pt-[60px] ">
            <div className="flex flex-row  justify-between mb-[30px] md:mb[35px] items-center ">
              <h1 className="font-bold text-[25px] md:text-[40px] text-white tracking-[14px] ">
                TODO
              </h1>

              <button onClick={handleTheme}>
                {
                  theme ? 
                  <img className="w-[20px] md:w-[30px]" src={moon} alt="moon" />
                  : 
                  <img className="w-[20px] md:w-[30px]" src={sun} alt="sun" />

                }
              </button>
            </div>
            <form
              id="form"
              onSubmit={handleSubmit}
              className="md:h-[70px] mb-[20px] flex flex-row p-5 gap-2 justify-start items-center w-full h-[50px] rounded-lg bg-veryDarkDesaturatedBlue  dark:bg-veryLightGray"
            >
              <input
                onChange={handleChange}
                id="input"
                placeholder="Create a new todo..."
                className="dark:text-black order-3 ps-2 bg-transparent rounded-lg border border-transparent  focus:outline-none focus:border-transparent"
                type="text"
              />
              <input
                type="submit"
                className="order-2 text-transparent h-[25px] w-[25px] rounded-[100px] bg-transpartent border border-solid  border-completedTaskColor  dark:border-gray-300 hover:bg-blue-900 dark:hover:bg-gray-300"
              />

              <div className="order-1  me-[10px]">
                <RiArrowDownDoubleFill />
              </div>
            </form>

            <SortableContext
              items={taskList}
              strategy={verticalListSortingStrategy}
            >
              {filteredTodos.map((element, index) => (
                <TaskList
                  element={element}
                  index={index}
                  handleDelete={handleDelete}
                  handleCompleted={handleCompleted}
                  key={element.id}
                />
              ))}
            </SortableContext>

            <div className="text-completedTaskColor ">
              <article className="md:h-[70px] px-[25px] mb-[20px]  text-[14px] flex flex-row p-5 gap-2 justify-between items-center w-full h-[50px] rounded-b-lg bg-veryDarkDesaturatedBlue dark:bg-veryLightGray ">
                <p> {items.length} items left</p>
                <button
                  onClick={clearCompleted}
                  className=" order-3  bg-transpartent  hover:text-newTaskColor dark:hover:text-black "
                >
                  Clear Completed
                </button>
              </article>
              <article className="md:h-[70px] mb-[20px]  text-[14px] flex flex-row p-5 gap-5 justify-center items-center w-full h-[50px] rounded-lg bg-veryDarkDesaturatedBlue  dark:bg-veryLightGray ">
                <button
                  onClick={() => setFilter(FILTER_ALL)}
                  className={` ${
                    filter === FILTER_ALL ? "text-blue-500" : ""
                  }   bg-transpartent hover:text-newTaskColor  dark:hover:text-black `}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter(FILTER_ACTIVE)}
                  className={` ${
                    filter === FILTER_ACTIVE ? "text-blue-500" : ""
                  }   bg-transpartent  hover:text-newTaskColor dark:hover:text-black `}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter(FILTER_COMPLETED)}
                  className={` ${
                    filter === FILTER_COMPLETED ? "text-blue-500" : ""
                  }    bg-transpartent  hover:text-newTaskColor dark:hover:text-black `}
                >
                  Completed
                </button>
              </article>

              <article className="text-center ">
                <p className="hover:text-newTaskColor">
                  Drag and drop to reorder list
                </p>
              </article>
            </div>
          </div>
        </section>
      </DndContext>
    </main>
  );
};

export default Content;
