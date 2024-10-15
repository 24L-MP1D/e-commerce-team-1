"use client";

import { backCode } from "./cart";
import * as React from "react";
import { useState, useEffect } from "react";
import { useFormik, FormikErrors } from "formik";
import * as yup from "yup";

interface User {
  userName: string;
  email: string;
  phoneNumber: String;
  address: String;
}

const validationSchema = yup.object({
  userName: yup.string().min(1).required("Name is required!"),
  email: yup.string().email().required("Not an email!"),
  phoneNumber: yup.string().min(1).required("Name is required!"),
  address: yup.string().min(1).required("Name is required!"),
});

const initialValues = {
  userName: "",
  email: "",
  phoneNumber: "",
  address: "",
};

export const FindUser = async () => {
  const token = localStorage.getItem("Authorization") || "";
  const res = await fetch(`${backCode}/user/get`, {
    method: "GET",
    headers: { "Content-Type": "application/json", authToken: token },
  });
  const data = await res.json();
  return data;
};

export const editUser = async (
  userName: string,
  email: string,
  phoneNumber: string,
  address: string
) => {
  const token = localStorage.getItem("Authorization") || "";
  console.log("token ", token);
  try {
    const res = await fetch(`${backCode}/user/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", authToken: token },
      body: JSON.stringify({ userName, email, phoneNumber, address }),
    });
  } catch (error) {
    console.error("Can't update user information");
  }
};
