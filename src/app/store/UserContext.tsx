"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
  hobbies: string[];
  dob: string;
  gender: string;
  tasks?: {
    id: string;
    title: string;
    description: string;
  }[];
}

interface UserContextType {
  users: User[];
  currentUser: User | null;
  addUser: (user: User) => void;
  loginUser: (email: string, password: string | number) => boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  updateUserProfile: (updatedUser: User) => void;
  deleteUser: (id: string) => void;
  deleteTaskFromUser: (id: string, taskIndex: number) => void;
  updateTaskInUser: (
    id: string,
    taskIndex: number,
    updatedTask: {
      title: string;
      description: string;
      id: string;
    }
  ) => void;
  addTaskToUser: (
    id: string,
    task: { id: string; title: string; description: string }
  ) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(existingUsers);

    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const addUser = (user: User) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, user];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };

  const loginUser = (email: string, password: string | number) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCookie("currentUser", JSON.stringify(user), 7);
      return true;
    }
    return false;
  };
  const updateUserProfile = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    if (currentUser?.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };

  const deleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    if (currentUser?.id === id) {
      setCurrentUser(null);
    }
  };
  const deleteTaskFromUser = (id: string, taskIndex: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              tasks:
                Array.isArray(user.tasks) &&
                user.tasks.length > taskIndex &&
                taskIndex >= 0
                  ? user.tasks.filter((_, index) => index !== taskIndex)
                  : user.tasks,
            }
          : user
      )
    );
    if (currentUser && currentUser.id === id) {
      if (
        Array.isArray(currentUser.tasks) &&
        currentUser.tasks.length > taskIndex &&
        taskIndex >= 0
      ) {
        setCurrentUser({
          ...currentUser,
          tasks: currentUser.tasks.filter((_, index) => index !== taskIndex),
        });
      }
    }
  };
  const updateTaskInUser = (
    id: string,
    taskIndex: number,
    updatedTask: {
      title: string;
      description: string;
      id: string;
    }
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id &&
        Array.isArray(user.tasks) &&
        taskIndex >= 0 &&
        taskIndex < user.tasks.length
          ? {
              ...user,
              tasks: user.tasks.map((task, index) =>
                index === taskIndex ? updatedTask : task
              ),
            }
          : user
      )
    );
    console.log(updatedTask, "updateTaskInUser");
    if (
      currentUser &&
      currentUser.id === id &&
      Array.isArray(currentUser.tasks) &&
      taskIndex >= 0 &&
      taskIndex < currentUser.tasks.length
    ) {
      setCurrentUser({
        ...currentUser,
        tasks: currentUser.tasks.map((task, index) =>
          index === taskIndex ? updatedTask : task
        ),
      });
    }
  };
  const addTaskToUser = (
    id: string,
    task: { id?: string; title: string; description: string }
  ) => {
    const newTask = { ...task, id: task.id || Date.now().toString() };
    console.log(task, "addTaskToUser");
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              tasks: user.tasks ? [...user.tasks, newTask] : [newTask],
            }
          : user
      )
    );
  };
  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    deleteCookie("currentUser");
  };
  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        loginUser,
        currentUser,
        setCurrentUser,
        updateUserProfile,
        deleteUser,
        deleteTaskFromUser,
        updateTaskInUser,
        addTaskToUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
