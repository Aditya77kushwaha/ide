import React, { useState } from "react";
import axios from "axios";

const Textarea = (props) => {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("c");

  const textareaChange = (e) => {
    setText(e.target.value);
  };

  const uppercaseText = (e) => {
    e.preventDefault();
    if (text !== "") {
      setText(text.toUpperCase());
      props.showAlert("converted to uppercase", "Success");
    }
  };

  const lowercaseText = (e) => {
    e.preventDefault();
    if (text !== "") {
      setText(text.toLowerCase());
      props.showAlert("converted to lowercase", "Success");
    }
  };

  const clearText = (e) => {
    e.preventDefault();
    if (text !== "") {
      setText("");
      props.showAlert("text cleared", "Success");
    }
  };

  const capitalizeText = (e) => {
    e.preventDefault();
    if (text !== "") {
      const str = text.trim();
      const sentence = str.charAt(0).toUpperCase() + str.slice(1);
      setText(sentence);
      props.showAlert("first letter capitalised", "Success");
    }
  };

  const capitalizeWords = (e) => {
    e.preventDefault();
    if (text !== "") {
      const arr = text.split(" ");
      for (let i = 0; i < arr.length; i++)
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      const str = arr.join(" ");
      setText(str);
      props.showAlert("all words capitalised", "Success");
    }
  };

  const remExtraSpaces = (e) => {
    e.preventDefault();
    if (text !== "") {
      setText(text.replace(/\s+/g, " ").trim());
      props.showAlert("extra spaces removed", "Success");
    }
  };
  const compileCode = () => {
    console.log(lang);
    axios
      .post("http://localhost:30001/compile", {
        code: text,
        input: input,
        lang: lang,
      })
      .then(function (response) {
        if (response.data.got) console.log("Got the code");
        console.log("Response ", response.data.data);

        response.data.data.stderr
          ? setOutput(response.data.data.stderr)
          : setOutput(response.data.data.stdout);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <form className="container">
        <div className="flex items-center justify-center mt-8 mb-7 text-xl">
          <textarea
            style={
              props.mode === "light"
                ? {
                    background: "#ebeef2",
                    color: "black",
                    padding: "10px",
                    maxHeight: "300px",
                  }
                : {
                    background: "white",
                    color: "black",
                    padding: "10px",
                    maxHeight: "300px",
                  }
            }
            rows="5"
            cols="55"
            value={text}
            onChange={textareaChange}
            placeholder="Enter your text here..."
          />
          <p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                compileCode();
              }}
              style={{ marginRight: "10px" }}
            >
              Run
            </button>
            <input
              onChange={(e) => {
                setLang(e.target.value.toLowerCase());
              }}
              placeholder="extension"
            ></input>
          </p>
        </div>
        <div className="flex items-center justify-center mt-8 mb-7 text-xl">
          <textarea
            rows="3"
            cols="25"
            className="mx-3"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            style={{ maxHeight: "150px" }}
            placeholder="Input"
          ></textarea>
          <textarea
            rows="3"
            cols="25"
            className="mx-3"
            value={output}
            onChange={(e) => {
              setOutput(e.target.value);
            }}
            style={{ maxHeight: "150px" }}
            placeholder="Output"
          ></textarea>
        </div>
        <div class="container" style={{ marginLeft: "-20px" }}>
          <div class="row" style={{ margin: "10px" }}>
            <div class="col-sm">
              <button
                className="btn btn-primary btn-sm"
                onClick={uppercaseText}
              >
                Convert to Uppercase
              </button>
            </div>
            <div class="col-sm">
              <button
                className="btn btn-primary btn-sm"
                onClick={lowercaseText}
              >
                Convert to Lowercase
              </button>
            </div>
            <div class="col-sm">
              <button
                className="btn btn-primary btn-md"
                style={{ padding: "15px 32px" }}
                onClick={clearText}
              >
                Clear Text
              </button>
            </div>
          </div>
          <div class="row" style={{ margin: "10px" }}>
            <div class="col-sm">
              <button
                className="btn btn-primary btn-sm"
                onClick={capitalizeText}
              >
                Capitalize Sentence
              </button>
            </div>
            <div class="col-sm">
              <button
                className="btn btn-primary btn-sm"
                onClick={capitalizeWords}
              >
                Capitalize Each Word
              </button>
            </div>
            <div class="col-sm">
              <button
                className="btn btn-primary btn-sm"
                onClick={remExtraSpaces}
              >
                Remove Extra Spaces
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center text-white font-bold"></div>
        <div className="flex items-center justify-center text-white font-bold"></div>
        <div className="w-1/2 flex flex-col mx-auto my-2">
          <h1
            className={
              `${props.mode}` === "light"
                ? "text-3xl text-bold px-2"
                : "text-3xl text-white text-bold px-2"
            }
          >
            Your text summary:
          </h1>
          <h3 className="bg-green-500 rounded-md p-1 m-1">
            {text === ""
              ? 0
              : text.replace(/\s+/g, " ").trim().split(" ").length}{" "}
            Words and {text.length} Characters
          </h3>
          <h3 className="bg-green-500 rounded-md p-1 m-1">
            Could be read in{" "}
            {(text === ""
              ? 0
              : text.replace(/\s+/g, " ").trim().split(" ").length) *
              (60 / 200)}{" "}
            seconds
          </h3>
        </div>
      </form>
    </>
  );
};

export default Textarea;
