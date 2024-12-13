"use client";
import { useUserContext } from "@/app/store/UserContext";
import Button from "@/Components/Button/Button";
import { useRouter } from "next/navigation";

export default function UserListPage() {
  const { users, deleteUser } = useUserContext();
  const router = useRouter();

  const handleSelectUser = (userId: string) => {
    if (userId) {
      router.push(`/user/profile?id=${userId}`);
    } else {
      alert("User ID is missing. Unable to navigate to the profile.");
    }
  };
  const handleDeleteUser = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      deleteUser(id);
      alert("User deleted successfully!");
    }
  };

  const handleViewTasks = (userId: string) => {
    if (userId) {
      router.push(`/tasks?id=${userId}`);
    } else {
      alert("User ID is missing. Unable to navigate to tasks.");
    }
  };

  return (
    <div className="h-[50vh] flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4">List of Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="border border-red-800 p-4 rounded-md">
          {users.map((user, index) => (
            <li className="mb-4" key={index}>
              <strong>{user.email}</strong> {user.isAdmin ? "(Admin)" : ""}
              <div className="flex mt-2">
                <Button
                  className="mx-1"
                  label="View Profile"
                  onClick={() => handleSelectUser(user.id)}
                />
                <Button
                  className="mx-1"
                  label="Delete"
                  variant="danger"
                  onClick={() => handleDeleteUser(user.id)}
                />
                <Button
                  className="mx-1"
                  label="View Tasks"
                  variant="secondary"
                  onClick={() => handleViewTasks(user.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
