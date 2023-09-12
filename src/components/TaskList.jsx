import React from "react";
import icon from "../images/icon-check.svg";
import cross from "../images/icon-cross.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDraggable } from "react-icons/ri";


const TaskList = ({ element, index, handleDelete, handleCompleted }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: element.id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

  return (
    
      <article
         ref={setNodeRef} style={style} {...attributes} 
        className={`${
          index === 0 ? " rounded-t-lg    " : " "
        }  md:h-[70px] dark:text-veryDarkBlue  border-solid border-gray-700 border-b-[0.2px] dark:border-gray-200  flex flex-row p-5 gap-2 justify-between items-center w-full h-[50px]  bg-veryDarkDesaturatedBlue dark:bg-veryLightGray `}
      >
        <div className="flex flex-row justify-start items-center gap-2 ">
        <button className=" me-[10px]  hover:text-gray-50  cursor-grab active:cursor-grabbing text-center " {...listeners}  >
          <RiDraggable/>
        </button>
          <p
            onClick={() => handleCompleted(element.id)}
            className={`${
              element.isCompleted ? "line-through text-completedTaskColor" : ""
            } order-2 ps-2 bg-transparent rounded-lg   cursor-pointer `}
          >
            {element.task}
          </p>
          <button
            onClick={() => handleCompleted(element.id)}
            className={` ${
              element.isCompleted ? "bg-gradient-to-r from-blue-500 to-fuchsia-500 ": ""
            }  flex justify-center items-center order-1 text-transparent h-[25px] w-[25px] rounded-[100px] bg-transpartent border border-solid border-newTaskColorLight hover:bg-blue-900 hover:bg-blue-900 dark:hover:bg-gray-300 `}
          >
            {" "}
            {element.isCompleted ? (
              <img className="" src={icon} alt="checked" />
            ) : (
              ""
            )}{" "}
          </button>
        </div>
        <button
          onClick={() => handleDelete(element.id)}
          className="order-3 text-white h-[25px] w-[25px]  bg-transpartent      "
        >
          <img src={cross} alt="" />
        </button>
      </article>
  )
};

export default TaskList;
