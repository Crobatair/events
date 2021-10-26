import {API_URL} from "@/config/index";
import AuthContext from "@/context/AuthContext";
import {useContext} from "react";
import cookie from 'cookie'

export default async (req, res) => {
  if(req.method === "GET"){
    if(!req.headers.cookie){
      res.status(403).json({message: 'Not Authorized'});
      return
    }

    const { token } = cookie.parse(req.headers.cookie)
    const strapiReq = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${token}`
      }
    })

    const user = await strapiReq.json();
    if(strapiReq.ok){
      res.status(200).json({ user: user})
    } else {
      res.status(403).json({
        message: 'User Forbidden'
      })
    }

  }else{
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      message: `Method ${req.method} is not Allowed`
    });
  }

}