"use client";

import React, { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../utils";
import clsx from "clsx";

const schema = yup.object().shape({
  title: yup.string().required(),
});

type TitleFormFields = {
  title: string;
};

function TitleForm() {
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TitleFormFields>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    setFormLoading(true);

    axios
      .post("/api/todos/title", data)
      .then((response) => {
        reset({
          title: "",
        });
        setFormLoading(false);
        router.refresh();
      })
      .catch((response) => {
        setFormLoading(false);
        router.refresh();
      });
  });

  const btnStyles = clsx(
    "hover:bg-white hover:bg-opacity-5 rounded-md h-8 w-8 flex items-center justify-center",
    formLoading && "bg-white bg-opacity-5"
  );

  return (
    <div className="w-full bg-gray-800 py-2 pr-4 pl-4 rounded-md mb-4">
      <div className="w-full">
        <form
          style={{
            gridTemplateColumns: "1fr 24px",
          }}
          className={`w-full grid items-center justify-items-center gap-2`}
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <input
            {...register("title")}
            className="text-sm w-full bg-white bg-opacity-5 outline-none rounded-md px-2 py-1"
            type="text"
            name="title"
            defaultValue=""
          />

          <button
            type="submit"
            id="my-tooltip"
            data-tooltip-id="todos"
            data-tooltip-content="Add Todo"
            data-tooltip-place="top"
            className={btnStyles}
            disabled={formLoading}
          >
            {formLoading ? (
              <LoadingSpinner />
            ) : (
              <IoMdAdd aria-hidden className="text-2xl" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TitleForm;
