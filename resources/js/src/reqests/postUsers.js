import axios from "axios"
 export const postUsers= async(data)=>{
    console.log(data)
 const User = await axios.post("http://diplom.loc/api/regisration",data)

 return User
 }