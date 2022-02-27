import React, { useState } from "react";
import Nav from "./Components/Nav";
import Textarea from "./Components/Textarea";
import About from "./Components/About";
import Alert from "./Components/Alert ";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.background = "#0d1117";
      showAlert("Dark mode enabled", "Success");
    } else {
      setMode("light");
      document.body.style.background = "#bccad6";
      showAlert("Light mode disabled", "Success");
    }
  };

  return (
    <div>
      <Router>
        <Nav mode={mode} toggleMode={toggleMode} />
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "1 hw",
            height: "1.8 vh",
            margin: "10px 28%",
          }}
        >
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/about">
              <About mode={mode} />
            </Route>
            <Route exact path="">
              <Textarea
                mode={mode}
                toggleMode={toggleMode}
                showAlert={showAlert}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
