import {API_URL} from "@/config/index";
import cookie from 'cookie'

export default async (req, res) => {
  if(req.method === 'OPTIONS'){
    res.status(200).json({})
  }

  if(req.method === "GET"){
    if(!req.headers.cookie){
      res.status(403).json({message: 'Not Authorized'});
      return
    }

    const { token } = cookie.parse(req.headers.cookie)
    const strapiReq = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
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