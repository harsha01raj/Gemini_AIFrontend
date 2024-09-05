import { useContext, useEffect, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { ReloadContext } from "../../context/ReloadContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { InputContext } from "../../context/InputContext";
const Main = () => {
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentPrompt, setRecentPrompt] = useState("");
  const [displayLogin, setDisplayLogin] = useState(false);
  const login = JSON.parse(localStorage.getItem("Login")) || null;
  const token = localStorage.getItem("Token");
  const { inputFromRecent } = useContext(InputContext);
  // console.log(token)
  let User = null;
  if (login) {
    User = JSON.parse(localStorage.getItem("User"));
  }
  // console.log(`Display:${displayLogin}`)
  const { triggerReload } = useContext(ReloadContext);
  const { theme } = useContext(ThemeContext);
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResult((prev) => prev + nextWord);
    }, 100 * index);
  };

  const sendData = async (recentPrompt) => {
    const payload = {
      prompt: recentPrompt,
    };
    try {
      const res = await fetch("https://geminibackend-1.onrender.com/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = async () => {
    if (!input.trim()) {
      console.log("Prompt cannot be empty");
      return;
    }
    const currentPrompt = input;
    setRecentPrompt(currentPrompt);

    const payload = {
      prompt: currentPrompt,
    };

    try {
      setLoading(true);
      setShowResult(true);

      // Fetch the response from the API
      const res = await fetch("https://geminibackend-1.onrender.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      // Clean up the response text to handle formatting issues
      let dataText = data.text;

      // Remove Markdown-like headers (##) at the beginning of the text
      dataText = dataText.replace(/^##\s*/, ""); // Remove starting ##

      // Split the response based on ** for bold formatting
      let responseArray = dataText.split("**");
      let newResponse = "";

      // Handle formatting for bold text
      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 0) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      // Handle line breaks and other formatting
      newResponse = newResponse.split("*").join("<br/></br>");

      // Split the text by spaces and display with a delay
      let newResponseArray = newResponse.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }

      // Clear input and reset states
      setInput("");
      triggerReload();
      setResult("");
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (recentPrompt.trim()) {
      sendData(recentPrompt);
    }
  }, [recentPrompt]);
  useEffect(() => {
    if (inputFromRecent) {
      setInput(inputFromRecent); // Set input to recentInput
      // handleClick(); // Call handleClick when input changes
    }
  }, [inputFromRecent]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default behavior of form submission
      handleClick();
    }
  };

  return (
    <div className="main" id={theme}>
      <div className="nav">
        <p>Gemini</p>
        {login ? (
          <div className="After_login">
            <img
              src={assets.user_icon}
              alt=""
              onClick={() => setDisplayLogin((prev) => !prev)}
              style={{ marginRight: "20px", marginLeft: "20px" }}
            />
          </div>
        ) : (
          <div id="Before_login">
            <Link to="/register" id="link">
              Sign Up
            </Link>
            <br />
            <Link to="/login" id="link">
              Login
            </Link>
            <img
              src={assets.darkcontact}
              alt=""
              style={{ marginRight: "20px", marginLeft: "20px" }}
            />
          </div>
        )}

        {displayLogin && User && User.email ? (
          <>
            <div
              className="login_containter"
              id={theme}
              style={{ textAlign: "center" }}
            >
              <img
                src={assets.user_icon}
                alt=""
                onClick={() => setDisplayLogin((prev) => !prev)}
              />
              <h3 style={{ textAlign: "center" }}>{User.username}</h3>
              <div
                style={{
                  textAlign: "left",
                  borderTop: "2px solid",
                  paddingTop: "10px",
                  marginTop: "20px",
                }}
              >
                <p>
                  <b>Email : </b>
                  {User.email}
                </p>
                <button
                  onClick={() => {
                    localStorage.setItem("Login", "false"),
                      window.location.reload();
                    localStorage.setItem("Token", null);
                    localStorage.setItem("Theme", theme);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div
                className="card"
                onClick={() => {
                  setInput("");
                  setInput(
                    "Suggest beautiful places to see on an upcoming road trip"
                  );
                  setRecentPrompt(
                    "Suggest beautiful places to see on an upcoming road trip"
                  );
                }}
              >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                {theme == "light" ? (
                  <img src={assets.compass_icon} alt="" />
                ) : (
                  <img src={assets.lightcompass_icon} alt="" />
                )}
              </div>
              <div
                className="card"
                onClick={() => {
                  setInput("Briefly summarize this concept: urban planning");
                  setRecentPrompt(
                    "Briefly summarize this concept: urban planning"
                  );
                }}
              >
                <p>Briefly summarize this concept: urban planning</p>
                {theme == "light" ? (
                  <img src={assets.bulb_icon} alt="" />
                ) : (
                  <img src={assets.light_bulb_icon} alt="" />
                )}
              </div>
              <div
                className="card"
                onClick={() => {
                  setInput(
                    "Brainstorm team bonding activities for our work retreat"
                  );
                  setRecentPrompt(
                    "Brainstorm team bonding activities for our work retreat"
                  );
                }}
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                {theme == "light" ? (
                  <img src={assets.message_icon} alt="" />
                ) : (
                  <img src={assets.messagelight_icon} alt="" />
                )}
              </div>
              <div
                className="card"
                onClick={() => {
                  setInput("Improve the readability of the following code");

                  setRecentPrompt(
                    "Improve the readability of the following code"
                  );
                }}
              >
                <p>Improve the readability of the following code</p>
                {theme == "light" ? (
                  <img src={assets.code_icon} alt="" />
                ) : (
                  <img src={assets.slash_icon} alt="" />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: result }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress} // Add onKeyPress event handler
            />
            <div>
              {theme == "light" ? (
                <img src={assets.gallery_icon} alt="" />
              ) : (
                <img src={assets.lightgallery_icon} alt="" />
              )}
              {theme == "light" ? (
                <img src={assets.mic_icon} alt="" />
              ) : (
                <img src={assets.lightmic_icon} alt="" />
              )}

              {input && theme == "light" ? (
                <img src={assets.send_icon} alt="" onClick={handleClick} />
              ) : null}
              {input && theme == "dark" ? (
                <img src={assets.lightsend_icon} alt="" onClick={handleClick} />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
