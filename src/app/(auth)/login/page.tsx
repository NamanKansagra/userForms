import LoginPage from "@/app/view/login/LoginPage";

// const fetchData = async () => {
//   const response = await fetch("http://localhost:3000/api/hello", {
//     method: "POST",
//     body: JSON.stringify({
//       name: "John Doe",
//       email: "t2QY5@testing.com",
//     }),
//   });
//   const data = await response.json();
//   return data;
// };

const Login = async () => {
  // const data = await fetchData();
  // console.log(data);
  return <LoginPage />;
};

export default Login;
