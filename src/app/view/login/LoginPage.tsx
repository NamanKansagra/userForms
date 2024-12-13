"use client";
import Hero from "@/Components/Hero/Hero";
import Form from "@/Components/Form/Form";
import FieldInput from "@/Components/FieldInput/FieldInput";
import Button from "@/Components/Button/Button";
import { useUserContext } from "@/app/store/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const { loginUser, setCurrentUser } = useUserContext();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success =
      loginUser(loginData.email, loginData.password) ||
      loginUser(email, password);

    if (!success) {
      setErrorMessage("Incorrect email or password.");
      alert("Incorrect email or password.");
    } else {
      setErrorMessage("");
      alert("Login successful!");
      router.push(`/user/profile`);
    }
  };

  return (
    <Hero>
      <Form onSubmit={handleSubmit}>
        <FieldInput
          label="Email"
          placeholder="Enter your email"
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleInputChange}
        />
        <FieldInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
        />
        <Button className="hover:bg-green-600" label="Login" />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </Form>
    </Hero>
  );
};

export default LoginPage;
