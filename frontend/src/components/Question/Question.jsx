// import React, { useState, useEffect } from "react";

const Question = ({ questionType }) => {
  return (
    <>
      <div className="question">
        {`What is the name of the ${questionType}?`}
      </div>
    </>
  );
};

export default Question;
