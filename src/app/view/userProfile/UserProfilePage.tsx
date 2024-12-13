"use client";
import Button from "@/Components/Button/Button";
import CheckBox from "@/Components/CheckBox/CheckBox";
import FieldInput from "@/Components/FieldInput/FieldInput";
import Form from "@/Components/Form/Form";
import Hero from "@/Components/Hero/Hero";
import Label from "@/Components/Label/Label";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { User, useUserContext } from "@/app/store/UserContext";
import { useRouter } from "next/navigation";

const hobbies = ["Reading", "Writing", "Cooking", "Hiking", "Traveling"];

const UserProfilePage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
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

  const { users, currentUser, updateUserProfile } = useUserContext();

  const selectedUser =
    users.find((user) => user.id && user.id === userId) || currentUser;

  console.log(users, "selectedUser");

  const [profileData, setProfileData] = useState<
    Pick<User, "hobbies" | "dob" | "gender">
  >({
    hobbies: selectedUser?.hobbies || [],
    dob: selectedUser?.dob || "",
    gender: selectedUser?.gender || "",
  });

  const handleHobbyChange = (hobby: string) => {
    setProfileData((prevUser) => ({
      ...prevUser,
      hobbies: prevUser.hobbies.includes(hobby)
        ? prevUser.hobbies.filter((h) => h !== hobby)
        : [...prevUser.hobbies, hobby],
    }));
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedUser?.id) {
      alert("Error: User ID is missing.");
      return;
    }

    const updatedUser: User = {
      ...selectedUser,
      ...profileData,
      id: selectedUser.id,
      hobbies: profileData.hobbies,
    };

    updateUserProfile(updatedUser);

    console.log("updatedUser", updatedUser);
    alert("Profile updated successfully!");
  };

  if (!selectedUser) {
    return <p>User not found.</p>;
  }
  return (
    <Hero>
      <Form onSubmit={handleSubmit}>
        <h2 className="font-bold">{selectedUser.email}'s Profile:</h2>
        <FieldInput
          label="Date of Birth:"
          type="date"
          name="dob"
          value={profileData.dob}
          onChange={handleInputChange}
          required={false}
        />
        <div className="flex">
          <Label label="Hobbies:" />
          {hobbies.map((hobby) => (
            <div className="mx-1 mb-1" key={hobby}>
              <CheckBox
                id={hobby}
                checked={profileData.hobbies.includes(hobby)}
                onChange={() => handleHobbyChange(hobby)}
              />
              <label htmlFor={hobby}>{hobby}</label>
            </div>
          ))}
        </div>
        <div>
          <Label label="Gender:" />
          <select
            className="bg-transparent"
            name="gender"
            value={profileData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Button className="mt-2" label="Save Profile" variant="secondary" />
      </Form>
    </Hero>
  );
};

export default UserProfilePage;
