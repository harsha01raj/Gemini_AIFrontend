import { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { ReloadContext } from "../../context/ReloadContext";
import { ThemeContext } from "../../context/ThemeContext";
import { InputContext } from "../../context/InputContext";

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const [promptArray, setPromptArray] = useState([]);
  const { reloadSidebar } = useContext(ReloadContext);
  const [settingOption, setsettingOption] = useState(false);
  const { theme, triggerTheme } = useContext(ThemeContext);
  const {triggerRecentInput}=useContext(InputContext)
  const token = localStorage.getItem("Token");
  // console.log(token);
  // console.log(theme);
  const fetchdata = async () => {
    try {
      const res = await fetch(
        "https://geminibackend-wxq6.onrender.com/recent",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const prompts = await res.json();
      setPromptArray(prompts.Prompts);
      // console.log(prompts.Prompts);  // This is where you should log the data if needed
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [reloadSidebar]);

  return (
    <div className="sidebar" id={theme}>
      <div className="top">
        {theme == "light" ? (
          <img
            onClick={() => setExtended((prev) => !prev)}
            className="menu"
            src={assets.menu_icon}
            alt=""
            style={{ width: "30px" }}
          />
        ) : (
          <img
            onClick={() => setExtended((prev) => !prev)}
            className="menu"
            src={assets.lightmenu_icon}
            alt=""
            style={{
              width: "60px",
              marginLeft: "-5px",
              marginTop: "-8px",
              marginBottom: "-10px",
            }}
          />
        )}

        <div
          className="new-chat"
          onClick={() => {
            localStorage.setItem("Theme", theme), window.location.reload();
          }}
        >
          {theme == "light" ? (
            <img src={assets.plus_icon} alt="" />
          ) : (
            <img src={assets.lightplus_icon} alt="" />
          )}

          {extended ? <p>New chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>

            {promptArray?.map((ele) => (
              <div className="recent-entry" key={ele._id} onClick={()=>triggerRecentInput(ele.prompt)}>
                {theme == "light" ? (
                  <img src={assets.message_icon} alt="" />
                ) : (
                  <img src={assets.lightmessage_icon} alt="" />
                )}

                <p>{ele.prompt.slice(0, 18)}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          {theme == "light" ? (
            <img src={assets.question_icon} alt="" />
          ) : (
            <img src={assets.lightquestion_icon} alt="" />
          )}

          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          {theme == "light" ? (
            <img src={assets.history_icon} alt="" />
          ) : (
            <img
              src={assets.wall_clock_icon}
              alt=""
              style={{ width: "18px" }}
            />
          )}

          {extended ? <p>Activity</p> : null}
        </div>

        <div
          className="bottom-item recent-entry"
          onClick={() => setsettingOption((prev) => !prev)}
        >
          {theme == "light" ? (
            <img src={assets.setting_icon} alt="" />
          ) : (
            <img src={assets.lightSetting_icon} alt="" />
          )}

          {extended ? <p>Setting</p> : null}
          {settingOption ? (
            <div className="setting-option">
              <div className="bottom-item recent-entry">
                {theme === "light" ? (
                  <img src={assets.extension_black_icon} alt="" />
                ) : (
                  <img src={assets.extension_icon} alt="" />
                )}

                <p>Extensions</p>
              </div>
              <div className="bottom-item recent-entry">
                <img src={assets.link_icon} alt="" />
                <p>Your public links</p>
              </div>
              <div
                className="bottom-item recent-entry"
                onClick={() => triggerTheme()}
              >
                {theme == "light" ? (
                  <img src={assets.moon_icon} alt="" />
                ) : (
                  <img src={assets.lightsun_icon} alt="" />
                )}

                <p>Dark theme</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
