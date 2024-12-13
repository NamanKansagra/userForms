"use client";
import Button from "@/Components/Button/Button";
import FieldInput from "@/Components/FieldInput/FieldInput";
import Form from "@/Components/Form/Form";
import Hero from "@/Components/Hero/Hero";
import React, { useState } from "react";
import { User, useUserContext } from "@/app/store/UserContext";
import { generateUserId } from "@/app/utility/uuid";

const SignUpPage = () => {
  const { addUser } = useUserContext();
  const [formData, setFormData] = useState<Omit<User, "tasks">>({
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
    hobbies: [""],
    dob: "",
    gender: "",
    id: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    console.log(formData, "formData");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setIsError(true);
      return;
    } else {
      setMessage("Success");
    }

    const newUser: User = {
      ...formData,
      id: generateUserId(),
      hobbies: [""],
      dob: "",
      gender: "",
    };

    addUser(newUser);
  };

  return (
    <Hero>
      <Form onSubmit={handleSubmit}>
        <FieldInput
          label="Email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <FieldInput
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <FieldInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <FieldInput
          label="Admin"
          type="checkbox"
          name="isAdmin"
          value={formData.isAdmin}
          onChange={handleInputChange}
          required={false}
        />
        <Button className="mt-1" label="Signup" />
        {message && (
          <div
            className={`m-4 p-2 text-center rounded max-w-prose${
              isError
                ? " bg-red-100 text-red-700"
                : " bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}
      </Form>
    </Hero>
  );
};

export default SignUpPage;
