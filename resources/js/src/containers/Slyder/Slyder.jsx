import style from "./Slyder.module.css";
import { MovieBlock } from "../../containers/MovieBlock/MovieBlock";
import { Children, useEffect, useState } from "react";
import { PagesFilms } from "../../reqests/PagesFilms";
import React from "react";
export const Slyder = () => {
    const [line, lineFunction] = useState(2);
    const sliderLine = React.createRef();
    const [Slid, SliderFunction] = useState(false);
    const dataFilms = async (page) => {
        const films = await PagesFilms(page);
        SliderFunction(films);
        // console.log(films);
        // dispatch(setFilms(films));
    };
    useEffect(() => {
        dataFilms();
    }, []);
    console.log(Slid);
    const Left = () => {
        lineFunction((lineOffset) => {
            let newOffset = lineOffset + 304;
            // console.log(newOffset);

            // if (newOffset >= maxLength) {
            //   newOffset = maxLength;
            // }
            if (newOffset >= 0) {
                newOffset = -(5 * 304);
            }
            return newOffset;
        });
    };
    const Right = () => {
        lineFunction((lineOffset) => {
            let newOffset = lineOffset - 304;
            console.log(newOffset);
            const maxLength = -(5 * 304);
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
                        {Slid &&
                            Slid.data.map((e) => {
                                return <MovieBlock key={e.id} data={e} />;
                            })}
                        {/* <MovieBlock data={"1"} />
                        <MovieBlock data={"2"} />
                        <MovieBlock data={"3"} />
                        <MovieBlock data={"4"} />
                        <MovieBlock data={"5"} />
                        <MovieBlock data={"6"} />
                        <MovieBlock data={"7"} />
                        <MovieBlock data={"8"} />
                        <MovieBlock data={"9"} /> */}
                    </div>
                </div>
                <div className={style.controlRight} onClick={Right}>
                    {">"}
                </div>
            </div>
        </>
    );
};
