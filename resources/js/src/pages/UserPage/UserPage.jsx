import { useEffect, useRef, useState } from "react";

import style from "./UserPage.module.css";
import { Input } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { ButtonComp } from "../../components/ButtonComp/ButtonComp";
import { useNavigate } from "react-router-dom";
import pagesRoutes from "../../routes/pagesRoutes";
import { Link } from "../../components/Link/Link";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser } from "../../reqests/UpdateUser";
import {
    stateEmail,
    stateName,
    statePasswor,
    statePasswordOld,
} from "../../store/features/UserSlice";
import { type } from "@testing-library/user-event/dist/type";
export const UserPage = () => {
    const navigate = useNavigate();
    // const [Data, setDataFunction] = useState("");

    const [unwrapHeigt, unwrapHeigtFunction] = useState([0, "none"]);
    const dispatch = useDispatch();

    const UserData = useSelector((state) => state.user);
    const [Passworn_now_two, Passworn_now_twoFunction] = useState("");
    console.log(UserData);
    // console.log(Passworn_now_two);
    const unwrap = () => {
        unwrapHeigtFunction([700, "block"]);
    };

    // useEffect(
    //     (UserData) => {
    //         setDataFunction({
    //             email: UserData.email,
    //             id: UserData.id,
    //             name: UserData.name,
    //             password: UserData.password,
    //             password_now: UserData.password_now,
    //         });
    //     },
    //     [UserData]
    // );
    // console.log(Data);

    const UpdateUserName = (e) => {
        dispatch(stateName({ name: e.target.value }));
    };
    const UpdateUserEmail = (e) => {
        dispatch(stateEmail({ email: e.target.value }));
    };
    const statePasswor_old = (e) => {
        dispatch(statePasswordOld({ password: e.target.value }));
    };
    const statePassword = (e) => {
        dispatch(statePasswor({ password_now: e.target.value }));
    };

    const SaveUpdate = async (e) => {
        // e.preventDefault();
        if (UserData.password_now == "") {
            if (UserData.password_now == Passworn_now_two) {
                const Users = await UpdateUser(UserData);
                console.log(Users);
            }
        } else {
            const Users = await UpdateUser(UserData);
            console.log(Users);
        }
    };

    return (
        <div className={style.addFilms}>
            <div className={style.addFilmsWrapper}>
                <div className={style.blockDescription}>
                    <div className={style.InputWrapper}>
                        <div className={style.TextDescr}>Логин:</div>
                        <div className={style.TextDescr}>{UserData.name}</div>
                    </div>
                    <div className={style.InputWrapper}>
                        <div className={style.TextDescr}>Email:</div>
                        <div className={style.TextDescr}>{UserData.email}</div>
                    </div>

                    <Link onClick={unwrap} className={style.InpytSub}>
                        Редактировать{" "}
                    </Link>
                </div>
                <form
                    // onSubmit={handleSubmit(hendlerUpload)}
                    encType="multipart/form-data"
                >
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
                                type="text"
                                onChange={UpdateUserName}
                                className={style.InpytDescr}
                                value={UserData.name}
                            ></Input>
                        </div>
                        <div className={style.InputWrapperUpdate}>
                            <div className={style.TextDescr}>Email</div>
                            <Input
                                onChange={UpdateUserEmail}
                                type="text"
                                className={style.InpytDescr}
                                value={UserData.email}
                            />
                        </div>
                        <div className={style.InputWrapperUpdate}>
                            <div className={style.TextDescr}>Пароль</div>
                            <Input
                                type="password"
                                className={style.InpytDescr}
                                onChange={statePasswor_old}
                                // placeholder="name"
                                // value={"s"}
                                // readonly="readonly"
                            ></Input>
                        </div>
                        <div className={style.InputWrapperUpdate}>
                            <div className={style.TextDescr}>Новый Пароль</div>
                            <Input
                                // {...register("password_now")}
                                type="password"
                                onChange={statePassword}
                                className={style.InpytDescr}
                                // placeholder="name"
                                // value={"s"}
                                readonly="readonly"
                            ></Input>
                        </div>
                        <div className={style.InputWrapperUpdate}>
                            <div className={style.TextDescr}>
                                Подтверждение пароля
                            </div>
                            <Input
                                type="password"
                                onChange={(e) =>
                                    Passworn_now_twoFunction(e.target.value)
                                }
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
                                onClick={SaveUpdate}
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
