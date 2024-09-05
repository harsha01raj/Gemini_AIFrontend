import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const handleClick = async () => {
    const payload = {
      username,
      email,
      password,
    };
    console.log(payload);
    try {
      const res = await fetch("https://geminibackend-1.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const user = await res.json();
      console.log(user);
      alert(user.Message);
      setUserName("");
      setEmail("");
      setPassword("");
      navigate("/login")
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="login" id={theme}>
      <div id="table">
        <h2>Sign Up Here</h2>
        <table>
          <tr>
            <th>Username:- </th>
            <td>
              <input
                type="text"
                placeholder="Enter user name ..."
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </td>
          </tr>
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

export default Register;
