import jwt from "jsonwebtoken";
import {createError} from "../utils/error.js"

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.acces_token;
    if(!token){
        return next(createError(401, "Ви не автентифіковані!"));
    }

    jwt.verify(token,"Hnvl743Hsfu&49fnHGiagbHFE3Hnvsd7", (err,user)=>{
        if (err) return next(createError(403, "Токен недійсний!"));
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next)=>{
    verifyToken(req,res,next, () =>{
        if(req.user.id === req.params.id || req.user.type==="admin"){
            next();
        }else{
            return next (createError(403, "Ви не авторизовані!"))
        }
    });
};

export const verifyAdmin = (req, res, next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.type==="admin"){
            next();

        }else{
            return next (createError(403, "Ви не авторизовані!")) 
        }
    })
}