import React, { useState } from 'react';
import axios from "axios";

const Textarea = (props) => {
  const [text, setText] = useState('');

  const textareaChange = (e) => {
    setText(e.target.value);
  }

  const uppercaseText = (e) => {
    e.preventDefault();
    if (text !== '') {
      setText(text.toUpperCase());
      props.showAlert("converted to uppercase", "Success")
    }
  }

  const lowercaseText = (e) => {
    e.preventDefault();
    if (text !== '') {
      setText(text.toLowerCase());
      props.showAlert("converted to lowercase", "Success")
    }
  }

  const clearText = (e) => {
    e.preventDefault();
    if (text !== '') {
      setText('');
      props.showAlert("text cleared", "Success")
    }
  }

  const capitalizeText = (e) => {
    e.preventDefault();
    if (text !== '') {
      const str = text.trim();
      const sentence = str.charAt(0).toUpperCase() + str.slice(1);
      setText(sentence);
      props.showAlert("first letter capitalised", "Success")
    }
  }

  const capitalizeWords = (e) => {
    e.preventDefault();
    if (text !== '') {
      const arr = text.split(" ");
      for (let i = 0; i < arr.length; i++)
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      const str = arr.join(" ");
      setText(str);
      props.showAlert("all words capitalised", "Success")
    }
  }

  const remExtraSpaces = (e) => {
    e.preventDefault();
    if (text !== '') {
      setText(text.replace(/\s+/g, ' ').trim());
      props.showAlert("extra spaces removed", "Success")
    }
  }
  const compileCode = () => {
    axios.post('http://localhost:30001/compile', {
      code: text,
    })
      .then(function (response) {
        // if (response.data.got)
        //   console.log("Got the code");
        console.log("Response ",response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <form className="container">
        <div className="flex items-center justify-center mt-8 mb-7 text-xl">
          <textarea className={`${props.mode}` === "light" ? "p-4 border-4 border-blue-500 focus:border-blue-400" : "p-4 border-4 border-yellow-500 focus:border-yellow-400 text-white bg-gray-800"} rows="5" cols="55" value={text} onChange={textareaChange} placeholder="Enter your text here..." />
        </div>
        <div className="flex items-center justify-center text-white font-bold">
          <button className={`${props.mode}` === "light" ? "bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded m-1 w-1/6" : "text-black bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded m-1 w-1/6"} onClick={uppercaseText}>Convert to Uppercase</button>
          <button className={`${props.mode}` === "light" ? "bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded m-1 w-1/6" : "text-black bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded m-1 w-1/6"} onClick={lowercaseText}>Convert to Lowercase</button>
          <button className={`${props.mode}` === "light" ? "bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded m-1 w-1/6" : "text-black bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded m-1 w-1/6"} onClick={clearText}>Clear Text</button>
        </div>
        <div className="flex items-center justify-center text-white font-bold">
          <button className={`${props.mode}` === "light" ? "bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded m-1 w-1/6" : "text-black bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded m-1 w-1/6"} onClick={capitalizeText}>Capitalize Sentence</button>
          <button className={`${props.mode}` === "light" ? "bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded m-1 w-1/6" : "text-black bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded m-1 w-1/6"} onClick={capitalizeWords}>Capitalize Each Word</button>
          <button className={`${props.mode}` === "light" ? "bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded m-1 w-1/6" : "text-black bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded m-1 w-1/6"} onClick={remExtraSpaces}>Remove Extra Spaces</button>
        </div>
        <div className="w-1/2 flex flex-col mx-auto my-2">
          <h1 className={`${props.mode}` === "light" ? "text-3xl text-bold px-2" : "text-3xl text-white text-bold px-2"}>Your text summary:</h1>
          <h3 className="bg-green-500 rounded-md p-1 m-1">{(text === '') ? 0 : text.replace(/\s+/g, ' ').trim().split(' ').length} Words and {text.length} Characters</h3>
          <h3 className="bg-green-500 rounded-md p-1 m-1">Could be read in {((text === '') ? 0 : text.replace(/\s+/g, ' ').trim().split(' ').length) * (60 / 200)} seconds</h3>
        </div>
      </form>
      <button className="btn btn-primary btn-lg btn-block" onClick={() => { compileCode() }}>Run</button>
    </>
  )
}

export default Textarea
