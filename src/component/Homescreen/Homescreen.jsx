import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";
import { InputProvider } from "../../context/InputContext";

const Homescreen = () => {
  return (
    <InputProvider>
      <Sidebar />
      <Main />
    </InputProvider>
  );
};

export default Homescreen;
