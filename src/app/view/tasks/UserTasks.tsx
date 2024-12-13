"use client";
import { User, useUserContext } from "@/app/store/UserContext";
import Button from "@/Components/Button/Button";
import Hero from "@/Components/Hero/Hero";
import Modal from "@/Components/Modal/Modal";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UserTasks = () => {
  const {
    users,
    currentUser,
    deleteTaskFromUser,
    updateTaskInUser,
    addTaskToUser,
  } = useUserContext();

  const searchParams = useSearchParams();

  const userId = searchParams.get("id");

  const currentUserTasks: User | undefined = users.find(
    (user) => user.id && user.id === userId
  );
  const router = useRouter();
  const [sessionUSer, setSessionUSer] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setSessionUSer(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, []);

  const [modalTask, setModalTask] = useState<{
    title: string;
    description: string;
    id: string;
  } | null>(null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  if (!currentUserTasks) {
    return <p>Please select a valid user to view tasks.</p>;
  }

  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTaskFromUser(currentUserTasks.id, index);
    }
  };

  const handleEdit = (index: number) => {
    const taskToEdit = currentUserTasks?.tasks;
    // console.log("currentUserTasks", currentUserTasks);
    setModalTask(taskToEdit?.[index] || { title: "", description: "", id: "" });
    setIsModalVisible(true);
  };

  const handleSave = (taskData: {
    title: string;
    description: string;
    id: string;
  }) => {
    const userTasks = currentUserTasks.tasks || [];
    const existingIndex = userTasks.findIndex(
      (task) => task.id === taskData.id
    );

    if (existingIndex !== -1) {
      updateTaskInUser(currentUserTasks.id, existingIndex, taskData);
    } else {
      addTaskToUser(currentUserTasks.id, taskData);
    }
    setIsModalVisible(false);
  };

  const handleNewTask = () => {
    setModalTask({ title: "", description: "", id: `${Date.now()}` });
    setIsModalVisible(true);
  };

  const tasks = currentUserTasks.tasks || [];
  return (
    <Hero>
      <div>
        <h2 className="my-4">Tasks for {currentUserTasks.email}</h2>
        {tasks.length === 0 ? (
          <p>No tasks available. Add some tasks!</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <br />
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="flex">
                  <Button
                    label="Edit"
                    variant="primary"
                    className="mr-[10px] text-green-600"
                    onClick={() => handleEdit(index)}
                  />
                  <Button
                    label="Delete"
                    variant="danger"
                    className="text-red-700"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        <Button
          className="mt-2"
          variant="secondary"
          onClick={handleNewTask}
          label="Add New Task"
        />
        {isModalVisible && modalTask && (
          <Modal
            task={modalTask}
            onSave={handleSave}
            onClose={() => setIsModalVisible(false)}
          />
        )}
      </div>
    </Hero>
  );
};

export default UserTasks;
