import { useEffect, useRef, useState } from "react";
import { Textarea } from "../../components/Textarea/Textarea";
import style from "./addFilms.module.css";
import { Input } from "../../components/Input/Input";
import { addFilms } from "../../reqests/addFilms";
import { useForm } from "react-hook-form";
import { ButtonComp } from "../../components/ButtonComp/ButtonComp";
import { useNavigate } from "react-router-dom";
import pagesRoutes from "../../routes/pagesRoutes";
import { getCotegory } from "../../reqests/getCotegory";
import { getGenre } from "../../reqests/getGenre";
export const AddFilms = () => {
  const navigate = useNavigate();
  const [setFiles, setFilesFunction] = useState(null);
  const [setPoster, setPoserFunction] = useState(null);
  const [getCot, getCotegoryFunction] = useState(false);
  const [getGanre, getGanreFunction] = useState(false);
  const filePicker = useRef(null);
  const posterPicker = useRef(null);
  const downloadFile = () => {
    filePicker.current.click();
  };

  const downloadPoster = () => {
    posterPicker.current.click();
  };
  const hendlerChange = (e) => {
    // console.log(e.target.files);
    setFilesFunction(e.target.files[0]);
  };
  const PosterChange = (e) => {
    // console.log(e.target.files);
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
  } = useForm();

  useEffect(() => {
    Conegory();
    Genre();
  }, []);

  console.log(getGanre);
  const hendlerUpload = async (data) => {
    console.log(data);
    const form = new FormData();

    form.append("films", setFiles);
    form.append("name", data["name"]);
    form.append("category_id", data["category_id"]);
    form.append("description", data["description"]);
    form.append("Year", data["Year"]);
    // form.append("genre_id", data["check"]);
    data["check"].forEach((element) => {
      form.append("genre_id[]", element);
    });

    console.log(data);

    form.append("name_img_film", setPoster);
    console.log(form.get("Year"));

    if (addFilms(form)) {
      navigate(pagesRoutes.MAIN);
    }
  };

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
                type="text"
                className={style.InpytDescr}
                placeholder="name"
              ></Input>
            </div>
            {/* <div className={style.InputWrapper}> */}
            <Input
              type="file"
              ref={filePicker}
              // className={style.InpytDescrFileNone}
              placeholder="film"
              onChange={hendlerChange}
            ></Input>
            <Input
              type="file"
              ref={posterPicker}
              // className={style.InpytDescrFileNone}
              placeholder="poster"
              onChange={PosterChange}
            ></Input>

            {/* <ButtonComp className={style.InpytDescrFile} onClick={downloadFile}>
              film download
            </ButtonComp>
            <ButtonComp
              className={style.InpytDescrFile}
              onClick={downloadPoster}
            >
              poster download
            </ButtonComp> */}
            {/* </div> */}
          </div>

          <div className={style.blockDescriptionDate}>
            <div className={style.InputWrapper}>
              <div className={style.TextDescr}>Category</div>
              <select
                {...register("category_id")}
                name="category_id"
                className={style.InpytDescr}
              >
                {getCot &&
                  getCot.data.map((items) => {
                    return (
                      <>
                        <option key={items.id} value={items.id}>
                          {items.text}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>

            <div className={style.InputWrapper}>
              <div className={style.TextDescr}>Date</div>
              <Input
                {...register("Year")}
                type="date"
                className={style.InpytDescr}
                placeholder="date"
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
                    <div>
                      <input
                        {...register("check")}
                        className={style.CheckBox}
                        key={items.id}
                        type="checkbox"
                        value={items.id}
                      />
                      {items.name}
                    </div>
                  );
                })}
            </div>
            </div>
          </div>
          <div className={style.blockTextarea}>
            <Textarea
              type="text"
              {...register("description")}
              className={style.Textarea}
            ></Textarea>
          </div>
          <div className={style.blockButton}>
            <ButtonComp className={style.ButtonAdd} onClick={() => {}}>
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
