"use client";
import { useUserContext } from "@/app/store/UserContext";
import { useRouter } from "next/navigation";

interface Link {
  path: string;
  label?: string;
  onClick?: () => void;
}

const Header = () => {
  const router = useRouter();
  const arrow = (link: Link) => {
    if (link.onClick) {
      link.onClick();
    }
    router.push(link.path);
  };
  const { currentUser, logoutUser } = useUserContext();
  const isAdmin = currentUser?.isAdmin;

  const commonLinks: Link[] = [{ path: "/", label: "Home" }];

  const userLinks: Link[] = [
    { path: "/user/profile", label: "User Profile" },
    { path: "/tasks", label: "Task List" },
    { path: "/", label: "Logout", onClick: logoutUser },
  ];

  const guestLinks: Link[] = [
    { path: "/login", label: "Login" },
    { path: "/signup", label: "SignUp" },
  ];

  const adminLinks: Link[] = [
    { path: "/signup", label: "Add Users" },
    { path: "/login", label: "Login" },
    { path: "/admin", label: "Users List" },
    { path: "/", label: "Logout", onClick: logoutUser },
  ];

  let linksToDisplay = [...commonLinks];

  if (currentUser && !isAdmin) {
    linksToDisplay = [...linksToDisplay, ...userLinks];
  } else if (!currentUser) {
    linksToDisplay = [...linksToDisplay, ...guestLinks];
  } else if (isAdmin) {
    linksToDisplay = [...linksToDisplay, ...adminLinks];
  }
  return (
    <div className="bg-slate-600 text-slate-200">
      <nav>
        <ul className="flex flex-row gap-4 justify-evenly p-14 text-4xl">
          {linksToDisplay.map((link, index) => (
            <li key={index}>
              <div className="cursor-pointer" onClick={() => arrow(link)}>
                {link.label}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
