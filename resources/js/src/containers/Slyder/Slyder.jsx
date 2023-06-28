import style from "./Slyder.module.css";
import { MovieBlock } from "../../containers/MovieBlock/MovieBlock";
import { Children, useEffect, useState } from "react";
import React from "react";
export const Slyder = () => {
  const [line, lineFunction] = useState(0);
  const sliderLine = React.createRef();

  const Left = () => {
    lineFunction((lineOffset) => {
      let newOffset = lineOffset + 304;
      console.log(newOffset);

      // if (newOffset >= maxLength) {
      //   newOffset = maxLength;
      // }
      if (newOffset >= 0) {
        newOffset = -(4 * 304);
      }
      return newOffset;
    });
  };
  const Right = () => {
    lineFunction((lineOffset) => {
      let newOffset = lineOffset - 304;
      console.log(newOffset);
      const maxLength = -(4 * 304);
      if (newOffset <= maxLength) {
        newOffset = 0;
      }
      return newOffset;
    });
  };
  return (
    <>
      <div className={style.container}>
        <div onClick={Left} className={style.controlLeft}>
          {"<"}
        </div>
        <div className={style.wrapper}>
          <div
            className={style.wrapper_line}
            style={{ transform: `translateX(${line}px)` }}
          >
            <MovieBlock data={"1"} />
            <MovieBlock data={"2"} />
            <MovieBlock data={"3"} />
            <MovieBlock data={"4"} />
            <MovieBlock data={"5"} />
            <MovieBlock data={"6"} />
            <MovieBlock data={"7"} />
            <MovieBlock data={"8"} />
            <MovieBlock data={"9"} />
          </div>
        </div>
        <div className={style.controlRight} onClick={Right}>
          {">"}
        </div>
      </div>
    </>
  );
};
