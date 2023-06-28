
import React, { useState } from "react";
import { Link } from "../../components/Link/Link";
import style from "./ModalFilter.module.css"
import { ButtonComp } from "../../components/ButtonComp/ButtonComp";
import { Input } from "../../components/Input/Input";
export const ModalFilter=({classes,modalActiv,includeModal})=>{
 const [activSort,activSortFunction]=useState(false)
  const activButSort=(e)=>{
 e.preventDefault()
    activSortFunction(!activSort)
  }

    return(<nav className={(modalActiv)?style.navClass:style.ModalFilterNone}> <div className={style.ModalFilterActiv} >
<div className={style.modalHeader}>
<div className={style.modalHeaderText}>filter</div>
<Link onClick={includeModal} className={style.modalHeaderExit}>x</Link>
</div>
<div className={style.sortText}>Sort by</div>
<div className={style.sortYour}>
<ButtonComp onClick={activButSort} className={(!activSort)?style.ButSort:style.ButSortActiv}>Rating</ButtonComp>
<ButtonComp onClick={activButSort} className={(activSort)?style.ButSort:style.ButSortActiv}>Year</ButtonComp>
</div>
<hr className={style.line} />

<div className={style.sortTextGanre}>Ganre</div>
<div className={style.GanreWrapper}>
<ButtonComp onClick={()=>{}} className={style.ButGanre}>Adventure</ButtonComp>
<ButtonComp onClick={()=>{}} className={style.ButGanre}>Dramma</ButtonComp>
<ButtonComp onClick={()=>{}} className={style.ButGanre}>Documental</ButtonComp>
<ButtonComp onClick={()=>{}} className={style.ButGanre}>Thriller</ButtonComp>
<ButtonComp onClick={()=>{}} className={style.ButGanre}>Thriller</ButtonComp>
</div>
<div className={style.sortTextYears}>Years</div>
<div className={style.YearDate}>
    <Input className={style.InpytDate} placeholder="From" ></Input>
    <Input className={style.InpytDate} placeholder="To"></Input>
</div>
<div className={style.sortTextYears}>Ratig</div>
<div className={style.YearDate}>
    <Input type="text" className={style.InpytDate} placeholder="From" ></Input>
    <Input type="text" className={style.InpytDate} placeholder="To"></Input>
</div>

<div className={style.modalWrapperButton}>
<ButtonComp onClick={()=>{}} className={style.ButModal}>Clear filter</ButtonComp>
<ButtonComp onClick={()=>{}} className={style.ButModal}>Show results</ButtonComp>
</div>


    </div>
    </nav>)
}