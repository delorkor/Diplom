import { useEffect, useRef, useState } from "react";
import { Textarea } from "../../components/Textarea/Textarea";
import style from "./addFilms.module.css";
import { Input } from "../../components/Input/Input";
import { addFilms } from "../../reqests/addFilms";
import { Controller, useForm } from "react-hook-form";
import { ButtonComp } from "../../components/ButtonComp/ButtonComp";
import { useNavigate } from "react-router-dom";
import pagesRoutes from "../../routes/pagesRoutes";
import { getCotegory } from "../../reqests/getCotegory";
import { getGenre } from "../../reqests/getGenre";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./ValidFiles";

export const AddFilms = () => {
    const navigate = useNavigate();
    // const [setFilesErrors, setFilesErrorsFunction] = useState(true);
    const [setFiles, setFilesFunction] = useState(null);
    const [setPoster, setPoserFunction] = useState(null);
    const [getCot, getCotegoryFunction] = useState(false);
    const [getGanre, getGanreFunction] = useState(false);
    const [spinerDownload, spinerDownloadFunction] = useState(false);
    const [category_idValid, category_idValidFunction] = useState(true);
    const filePicker = useRef(null);
    const posterPicker = useRef(null);
    const downloadFile = () => {
        filePicker.current.click();
    };
    // console.log(category_idValid);
    const downloadPoster = () => {
        posterPicker.current.click();
    };
    const hendlerChange = (e) => {
        e.preventDefault();
        // console.log(e.target.files);
        setFilesFunction(e.target.files[0]);
    };
    const PosterChange = (e) => {
        // console.log(e.target.files);
        e.preventDefault();
        setPoserFunction(e.target.files[0]);
    };
    const Genre = async () => {
        const GanreAll = await getGenre();
        getGanreFunction(GanreAll);
        return GanreAll;
    };
    const Conegory = async () => {
        const CotegoryAll = await getCotegory();
        getCotegoryFunction(CotegoryAll);
        return CotegoryAll;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        Conegory();
        Genre();
    }, []);

    // console.log(getGanre);
    const hendlerUpload = async (data) => {
        if (!setFiles || !setPoster) {
            console.log(category_idValid);
            category_idValidFunction(false);
        } else {
            console.log(data);
            const form = new FormData();

            form.append("films", setFiles);
            form.append("name", data["name"]);
            form.append("category_id", data["category_id"]);
            form.append("description", data["description"]);
            form.append("Year", data["Year"]);
            // form.append("genre_id", data["check"]);
            if (data["check"]) {
                data["check"].forEach((element) => {
                    form.append("genre_id[]", element);
                });
            }

            console.log(data);

            form.append("name_img_film", setPoster);
            console.log(form.get("Year"));
            spinerDownloadFunction(true);
            const fileDown = await addFilms(form);
            spinerDownloadFunction(false);

            if (fileDown) {
                navigate(pagesRoutes.MAIN);
            }
        }
    };

    useEffect(() => {}, []);

    return (
        <div className={style.addFilms}>
            <div className={style.addFilmsWrapper}>
                <form
                    onSubmit={handleSubmit(hendlerUpload)}
                    encType="multipart/form-data"
                >
                    <div className={style.blockDescription}>
                        <div className={style.InputWrapper}>
                            <div className={style.TextDescr}>Name</div>
                            <Input
                                {...register("name")}
                                error={errors.name?.message}
                                type="text"
                                className={style.InpytDescr}
                                placeholder="name"
                            ></Input>
                        </div>
                        {/* <div className={style.InputWrapper}> */}
                        <Input
                            type="file"
                            ref={filePicker}
                            className={style.InpytDescrFileNone}
                            placeholder="film"
                            onChange={hendlerChange}
                            accept="video/*"
                        ></Input>
                        <Input
                            type="file"
                            ref={posterPicker}
                            className={style.InpytDescrFileNone}
                            placeholder="poster"
                            onChange={PosterChange}
                            accept="image/*"
                        ></Input>

                        <ButtonComp
                            className={style.InpytDescrFile}
                            onClick={downloadFile}
                        >
                            video download
                        </ButtonComp>

                        <ButtonComp
                            className={style.InpytDescrFile}
                            onClick={downloadPoster}
                        >
                            poster download
                        </ButtonComp>

                        {/* </div> */}
                    </div>
                    {!category_idValid && (
                        <span style={{ color: "#ff0000", fontSize: 18 }}>
                            Выберете видео и постер
                        </span>
                    )}
                    <div className={style.blockDescriptionDate}>
                        <div className={style.InputWrapper}>
                            <div className={style.TextDescr}>Category</div>

                            <select
                                // options={getCot.data}
                                {...register("category_id")}
                                name="category_id"
                                error={errors.category_id?.message}
                                className={style.InpytDescr}
                            >
                                {getCot &&
                                    getCot.data.map((items) => {
                                        return (
                                            <option
                                                key={items.id}
                                                value={items.id}
                                            >
                                                {items.text}
                                            </option>
                                        );
                                    })}
                            </select>
                            <span style={{ color: "#ff0000", fontSize: 18 }}>
                                {errors.category_id?.message}
                            </span>
                        </div>

                        <div className={style.InputWrapper}>
                            <div className={style.TextDescr}>Date</div>
                            <Input
                                {...register("Year")}
                                error={errors.Year?.message}
                                type="date"
                                className={style.InpytDescr}
                            ></Input>
                        </div>
                    </div>
                    <div className={style.blockDescriptionDate}>
                        <div className={style.wrapperCheck}>
                            <div className={style.TextDescr}>Genre</div>

                            <div className={style.Check}>
                                {getGanre &&
                                    getGanre.data.map((items) => {
                                        return (
                                            <div
                                                className={
                                                    style.wrapperCheckMap
                                                }
                                                key={items.id}
                                            >
                                                {items.name}
                                                <input
                                                    {...register("check")}
                                                    className={style.CheckBox}
                                                    key={items.id}
                                                    type="checkbox"
                                                    value={items.id}
                                                />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className={style.blockTextarea}>
                        {!spinerDownload ? (
                            <>
                                <Textarea
                                    type="text"
                                    {...register("description")}
                                    error={errors.description?.message}
                                    className={style.Textarea}
                                ></Textarea>
                                <span
                                    style={{
                                        color: "#ff0000",
                                        fontSize: 20,
                                        // fontFamily: "Exo 2",
                                    }}
                                >
                                    {errors.description?.message}
                                </span>
                            </>
                        ) : (
                            <h2 style={{color:'#fff'}} >Загрузка...</h2>
                        )}
                    </div>
                    <div className={style.blockButton}>
                        <ButtonComp
                            className={style.ButtonAdd}
                            onClick={() => {
                                navigate(pagesRoutes.MAIN);
                            }}
                        >
                            Cancel
                        </ButtonComp>
                        <ButtonComp className={style.ButtonAdd} type="submit">
                            Save
                        </ButtonComp>
                    </div>
                </form>
            </div>
        </div>
    );
};
