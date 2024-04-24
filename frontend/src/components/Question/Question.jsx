import React, { useState, useEffect } from "react";

const Question = ({
  generatedQuestion = "What is the name of the artist?",
}) => {
  return (
    <>
      <div className="question">
        <p>{generatedQuestion}</p>
      </div>
    </>
  );
};

export default Question;
