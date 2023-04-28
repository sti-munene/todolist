"use client";

import React, { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdSaveAlt } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { Todo, TodoClient } from "../../types";

const schema = yup.object().shape({
  notes: yup.string().required(),
});

type NotesFormFields = {
  notes: string;
};

function NotesSection({
  expanded,
  todo,
}: {
  expanded: boolean;
  todo: TodoClient;
}) {
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NotesFormFields>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    setFormLoading(true);

    axios
      .patch(`/api/todos/${todo.id}`, data)
      .then((response) => {
        setFormLoading(false);
        router.refresh();
        console.log(response);
      })
      .catch((response) => {
        setFormLoading(false);
        router.refresh();
      });
  });

  return (
    <>
      <div className="bg-white bg-opacity-5 p-2 rounded-md">
        <form onSubmit={onSubmit} autoComplete="off">
          <div
            className={`${
              expanded && "border-b border-gray-800 "
            } pb-1 flex items-center justify-between`}
          >
            <h3 className="stylistic-font text-xl">Notes</h3>
            <div className="flex items-center gap-1">
              <button
                type="submit"
                className="h-8 w-8 flex items-center justify-center hover:bg-white hover:bg-opacity-5 rounded-md"
                id="my-tooltip"
                data-tooltip-id="todos"
                data-tooltip-content="Save Todo Notes"
                data-tooltip-place="top"
              >
                <MdSaveAlt aria-hidden />
              </button>
              <button
                id="my-tooltip"
                data-tooltip-id="todos"
                data-tooltip-content="Delete Todo Notes"
                data-tooltip-place="top"
                className="h-8 w-8 flex items-center justify-center hover:bg-white hover:bg-opacity-5 rounded-md"
              >
                <IoMdClose aria-hidden />
              </button>
            </div>
          </div>

          <div className="mt-2">
            <div>
              <textarea
                {...register("notes")}
                rows={10}
                cols={10}
                className="
              txt-input min-h-12 py-3 bg-white bg-opacity-5
              valid:bg-white valid:bg-opacity-5 
              invalid:bg-opacity-5 invalid:bg-white 
              placeholder:text-sm
              border border-white border-opacity-5 text-current text-sm 
              rounded-md block w-full px-2 focus:bg-white focus:bg-opacity-10"
                name="notes"
                placeholder="Todo notes here..."
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NotesSection;
