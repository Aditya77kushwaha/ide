import React from 'react'

const About = (props) => {
    return (
        <div className="container mx-auto my-8 p-8 w-2/3 bg-red-400 rounded">
            <h1 className="text-3xl text-bold underline mb-3">Welcome to Text Formatter</h1>
            <p className="text-xl text-bold break-words">
            This website aims to help you with tasks where text formatting is needed. 
            It's not intended to replace a word processor, but the formatting tools 
            available here can help speed up some jobs which might otherwise be long
            and repetitive.
            </p>
            <p className="text-xl text-bold break-words">
            Text Formatter can also quickly tell you how many words and characters 
            are there in your text.
            </p>
        </div>
    )
}

export default About
