"use client";
import FieldInput from "@/Components/FieldInput/FieldInput";
import { useEffect, useState } from "react";

const Modal = ({
  task,
  onSave,
  onClose,
}: {
  task: { title: string; description: string; id: string };
  onSave: (task: { title: string; description: string; id: string }) => void;
  onClose: () => void;
}) => {
  const [taskData, setTaskData] = useState(task);

  useEffect(() => {
    setTaskData(task);
  }, [task]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(taskData);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-slate-900 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <FieldInput
            label="Title:"
            placeholder="Title"
            type="text"
            name="text"
            value={taskData.title}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
          />
          <FieldInput
            label="Description:"
            placeholder="Description"
            type="textarea"
            name="text"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          />
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
