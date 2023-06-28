import { useEffect, useRef, useState } from "react";

import style from "./UserPage.module.css";
import { Input } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { ButtonComp } from "../../components/ButtonComp/ButtonComp";
import { useNavigate } from "react-router-dom";
import pagesRoutes from "../../routes/pagesRoutes";
import { Link } from "../../components/Link/Link";
import { useDispatch, useSelector } from "react-redux";
export const UserPage = () => {
  const navigate = useNavigate();
  const [setFiles, setFilesFunction] = useState(null);

  const [unwrapHeigt, unwrapHeigtFunction] = useState([0, "none"]);

  const UserData = useSelector((state) => state.user);
  const unwrap = () => {
    unwrapHeigtFunction([700, "block"]);
  };
  console.log(UserData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Conegory();
    // Genre();
  }, []);

  // console.log(getGanre);
  // const hendlerUpload = async (data) => {
  //   console.log(data);
  //   const form = new FormData();

  //   form.append("films", setFiles);
  //   form.append("name", data["name"]);
  //   form.append("category_id", data["category_id"]);
  //   form.append("description", data["description"]);
  //   form.append("Year", data["Year"]);
  //   // form.append("genre_id", data["check"]);
  //   data["check"].forEach((element) => {
  //     form.append("genre_id[]", element);
  //   });

  //   console.log(data);

  //   form.append("name_img_film", setPoster);
  //   console.log(form.get("Year"));

  //   if (addFilms(form)) {
  //     navigate(pagesRoutes.MAIN);
  //   }
  // };

  return (
    <div className={style.addFilms}>
      <div className={style.addFilmsWrapper}>
        <form
          // onSubmit={handleSubmit(hendlerUpload)}
          encType="multipart/form-data"
        >
          <div className={style.blockDescription}>
            <div className={style.InputWrapper}>
              <div className={style.TextDescr}>Логин:</div>
              <div className={style.TextDescr}>{UserData.name}</div>
            </div>
            <div className={style.InputWrapper}>
              <div className={style.TextDescr}>Email:</div>
              <div className={style.TextDescr}>{UserData.email}</div>
            </div>

            {/* <div className={style.InputWrapper}> */}
            <Link
              onClick={unwrap}
              // type="submit"
              className={style.InpytSub}
              // value="Редактировать"
            >
              Редактировать{" "}
            </Link>
          </div>

          <div
            style={{
              height: `${unwrapHeigt[0] + "px"}`,
              display: `${unwrapHeigt[1]}`,
              transition: "1s all",
            }}
            className={style.blockDescriptionDate}
          >
            <div className={style.InputWrapperUpdate}>
              <div className={style.TextDescr}>Логин</div>
              <Input
                {...register("name")}
                type="text"
                onChange={() => {}}
                className={style.InpytDescr}
                // placeholder="name"
                value={UserData.name}
                readonly="readonly"
              ></Input>
            </div>
            <div className={style.InputWrapperUpdate}>
              <div className={style.TextDescr}>Email</div>
              <Input
                onChange={() => {}}
                {...register("email")}
                readonly="readonly"
                type="text"
                className={style.InpytDescr}
                // placeholder="name"
                value={UserData.email}
              ></Input>
            </div>
            <div className={style.InputWrapperUpdate}>
              <div className={style.TextDescr}>Пароль</div>
              <Input
                {...register("password")}
                type="text"
                onChange={() => {}}
                className={style.InpytDescr}
                // placeholder="name"
                // value={"s"}
                readonly="readonly"
              ></Input>
            </div>
            <div className={style.InputWrapperUpdate}>
              <div className={style.TextDescr}>Новый Пароль</div>
              <Input
                {...register("password_now")}
                type="text"
                onChange={() => {}}
                className={style.InpytDescr}
                // placeholder="name"
                // value={"s"}
                readonly="readonly"
              ></Input>
            </div>
            <div className={style.InputWrapperUpdate}>
              <div className={style.TextDescr}>Подтверждение пароля</div>
              <Input
                {...register("Confirm_password")}
                type="text"
                onChange={() => {}}
                className={style.InpytDescr}
                // placeholder="name"
                // value={"s"}
                readonly="readonly"
              ></Input>
            </div>
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
            {unwrapHeigt[0] === 0 ? (
              ""
            ) : (
              <ButtonComp
                // style={{ display: `${unwrapHeigt[1]}` }}
                className={style.ButtonAddSave}
                type="submit"
              >
                Save
              </ButtonComp>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
