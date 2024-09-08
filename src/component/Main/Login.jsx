import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleClick = async () => {
    const payload = {
      email,
      password,
    };
    console.log(payload);
    try {
      const res = await fetch(
        "https://geminibackend-1.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const user = await res.json();
      console.log(user);
      alert(user.Message);
      localStorage.setItem("Token", user.Token);
      setEmail("");
      setPassword("");
      if (user.Message == "You have successfully logged in") {
        localStorage.setItem("Login", user.login);
        localStorage.setItem("User", JSON.stringify(user.User));
      }

      // console.log(user.User)
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="login" id={theme}>
      <div id="table">
        <h2>Login Here</h2>
        <table>
          <tr>
            <th>Email:- </th>
            <td>
              <input
                type="email"
                placeholder="Enter your email ..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Password:- </th>
            <td>
              <input
                type="text"
                placeholder="Enter your password ..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </td>
          </tr>
        </table>
        <button onClick={handleClick}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
