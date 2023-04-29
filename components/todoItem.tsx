"use client";

import React, { forwardRef, useMemo, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdCalendarToday, MdSaveAlt } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { HiMenuAlt4 } from "react-icons/hi";
import { BiChevronUp, BiPencil } from "react-icons/bi";
import { RiAlarmWarningFill } from "react-icons/ri";
import { Todo, TodoClient } from "../types";
import DatePicker from "react-datepicker";
import NotesForm from "./forms/notes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { LoadingSpinner } from "./utils";
import NotesSection from "./forms/notes";
import clsx from "clsx";

const CustomDatePicker = forwardRef<HTMLButtonElement>((props: any, ref) => {
  const { onClick } = props;

  return (
    <button
      className="bg-white bg-opacity-5 rounded-md px-2 py-1 h-8 w-full flex items-center justify-start text-sm gap-2"
      onClick={onClick}
      ref={ref}
      id="my-tooltip"
      data-tooltip-id="todos"
      data-tooltip-content="Set Due Date"
      data-tooltip-place="top"
    >
      <MdCalendarToday aria-hidden />
      <span>Set Due Date</span>
    </button>
  );
});

CustomDatePicker.displayName = "CustomDatePicker";

type TitleFormFields = {
  title: string;
};

const schema = yup.object().shape({
  title: yup.string().required(),
});

function TodoItem({ todo }: { todo: TodoClient }) {
  const cleanDueDate = useMemo(() => {
    if (todo?.dueDate) {
      const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
      d.setUTCSeconds(todo?.dueDate as number);

      return d;
    }
    return null;
  }, [todo]);

  const [dueDate, setDueDate] = useState(cleanDueDate);
  const [expanded, setExpanded] = useState(false);
  const noteStyles = "min-h-fit py-4 border-t border-gray-700";

  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [complete, setComplete] = useState(todo.complete);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TitleFormFields>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    setFormLoading(true);

    axios
      .patch(`/api/todos/${todo.id}`, data)
      .then((response) => {
        setFormLoading(false);
        router.refresh();
      })
      .catch((err) => {
        setFormLoading(false);
        router.refresh();
      });
  });

  const datePickerStyles = clsx(
    dueDate ? "block my-2 h-12" : "block my-2 h-12"
  );

  return (
    <div className="hover:shadow-md w-full bg-gray-800 py-2 pr-4 pl-4 rounded-md mb-4">
      <div
        style={{
          gridTemplateColumns: "24px 24px 1fr 24px",
        }}
        className={`w-full grid items-center justify-items-center gap-2 ${
          expanded && "pb-2"
        }`}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="hover:bg-white hover:bg-opacity-5 rounded-md h-8 w-8 flex items-center justify-center"
          id="my-tooltip"
          data-tooltip-id="todos"
          data-tooltip-content="Expand Todo"
          data-tooltip-place="top"
        >
          <HiMenuAlt4 className="text-2xl" />
        </button>

        <div className="h-4 w-4 flex items-center justify-center">
          <Switch
            isOn={complete}
            handleToggle={() => {
              setComplete(!complete);
              axios
                .patch(`/api/todos/${todo.id}`, {
                  complete: !complete,
                })
                .then((res) => {
                  router.refresh();
                })
                .catch((err) => {
                  router.refresh();
                });
            }}
          />
        </div>

        <div className="w-full">
          <form className="relative" onSubmit={onSubmit} autoComplete="off">
            <div>
              <input
                {...register("title")}
                name="title"
                className="text-sm w-full bg-white bg-opacity-5 outline-none rounded-md px-2 py-1"
                type="text"
                defaultValue={todo.title || ""}
                placeholder="I want to ..."
              />
              <input type="submit" hidden />
            </div>

            {formLoading && (
              <div className="absolute right-4 top-0">
                <LoadingSpinner />
              </div>
            )}
          </form>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="hover:bg-white hover:bg-opacity-5 rounded-md h-8 w-8 flex items-center justify-center"
          id="my-tooltip"
          data-tooltip-id="todos"
          data-tooltip-content="Expand Todo"
          data-tooltip-place="top"
        >
          <BiChevronUp
            className={expanded ? "rotate-180 text-2xl" : "text-2xl"}
          />
        </button>
      </div>

      <div
        className={expanded ? "block " + noteStyles : "hidden " + noteStyles}
      >
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <NotesSection todo={todo} expanded={expanded} />

          <div>
            <div className="flex items-center gap-1">
              {dueDate ? (
                <h3 className="stylistic-font text-xl">
                  Due Date: {dueDate?.toDateString()}
                </h3>
              ) : (
                <h3 className="stylistic-font text-xl">Due Date</h3>
              )}
            </div>

            <div
              className={`${
                dueDate
                  ? "hidden"
                  : "rounded-md my-2 flex items-center gap-2 bg-red-500 bg-opacity-20 px-2 py-2"
              }`}
            >
              <RiAlarmWarningFill aria-hidden className="text-red-400" />
              <p className="text-sm text-red-400">No due date set.</p>
            </div>

            <div className={datePickerStyles}>
              <DatePicker
                selected={dueDate}
                onChange={(date: Date) => {
                  setDueDate(date);
                  axios
                    .patch(`/api/todos/${todo.id}`, {
                      dueDate: date,
                    })
                    .then((res) => {
                      router.refresh();
                    })
                    .catch((err) => {
                      router.refresh();
                    });
                }}
                customInput={<CustomDatePicker />}
                isClearable
                placeholderText="Pick Due Date"
                clearButtonClassName="rounded-tr-md rounded-br-md h-8 w-8 flex items-center hover:bg-white hover:bg-opacity-5"
              />
            </div>

            <div className="flex items-center justify-end w-full my-4">
              <button
                onClick={() => {
                  setDeleteLoading(true);
                  axios
                    .delete(`/api/todos/${todo.id}`)
                    .then((res) => {
                      setDeleteLoading(false);
                      router.refresh();
                    })
                    .catch((err) => {
                      setDeleteLoading(false);
                      router.refresh();
                    });
                }}
                className="text-sm rounded-md px-4 py-1 h-8 flex gap-1 items-center justify-center bg-red-500 hover:bg-red-400"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Processing..." : "Delete Todo"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;

const Switch = ({
  isOn,
  handleToggle,
}: {
  isOn: boolean;
  handleToggle: () => void;
}) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="h-full w-full"
        type="checkbox"
        id="my-tooltip"
        data-tooltip-id="todos"
        data-tooltip-content="Mark Todo as Complete"
        data-tooltip-place="top"
      />
    </>
  );
};
