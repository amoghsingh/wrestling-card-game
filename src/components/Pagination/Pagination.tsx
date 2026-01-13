import React, { useState } from "react";
import "./style.scss";

const Pagination = () => {
  const [isDropped, setIsDropped] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);
  const [firstPageNo, setFirstPageNo] = useState(1);
  const [lastPageNo, setLastPageNo] = useState(5);
  const pageData = {
    firstPage: 1,
    lastPage: 20,
  };

  const loadPages = (firstPageNo: number, lastPageNo: number) => {
    let pages = [];
    for (let i = firstPageNo; i <= lastPageNo; i++) {
      pages.push(
        <div
          key={i}
          className={i === selectedPage ? "page active" : "page"}
          onClick={() => {
            setSelectedPage(i);
          }}
        >
          {i}
        </div>
      );
    }
    return pages;
  };

  const incrementPageNo = () => {
    if (lastPageNo < pageData.lastPage) {
      setFirstPageNo((prev) => prev + 1);
      setLastPageNo((prev) => prev + 1);
    }
  };

  const decrementPageNo = () => {
    if (firstPageNo > pageData.firstPage) {
      setFirstPageNo((prev) => prev - 1);
      setLastPageNo((prev) => prev - 1);
    }
  };

  const handleDrag = (e) => {
    e.dataTransfer.setData("text", "drag-me");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    if (data === "drag-me") {
      setIsDropped(true);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="pages">
          <button onClick={decrementPageNo}>Prev</button>
          {loadPages(firstPageNo, lastPageNo)}
          <button onClick={incrementPageNo}>Next</button>
        </div>
        {isDropped === false ? (
          <>
            <div
              className="box1"
              id="dragme"
              draggable="true"
              onDragStart={handleDrag}
            >
              A
            </div>
            <div
              className="box2"
              id="drophere"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              B
            </div>
          </>
        ) : (
          <div className="box2" id="drophere">
            <div className="box1">A</div>B
          </div>
        )}
      </div>
    </>
  );
};

export default Pagination;
