import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  const btnText =
    props.mode === "light" ? "Enable Dark Mode" : "Disable Dark Mode";

  return (
    <nav
      className={
        `${props.mode}` === "light" ? "bg-yellow-500" : "bg-gray-900 text-white"
      }
      style={{ top: 0 }}
    >
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <li className="ml-5 p-3 font-sans font-bold text-2xl">
          <Link to="">Text Formatter</Link>
        </li>
        <li className="px-2 py-1 my-3 font-sans text-xl hover:bg-green-500 hover:text-black rounded">
          <Link to="">Home</Link>
        </li>
        <li className="px-2 py-1 my-3 font-sans text-xl hover:bg-green-500 hover:text-black rounded">
          <Link to="/about">About Us</Link>
        </li>
        <li
          className={
            `${props.mode}` === "light"
              ? "ml-auto mr-5 text-white font-bold text-sm mt-1 self-end"
              : "ml-auto mr-5 font-bold text-sm mt-1 self-end"
          }
        >
          <button className="btn btn-primary btn-sm" onClick={props.toggleMode}>
            {btnText}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
