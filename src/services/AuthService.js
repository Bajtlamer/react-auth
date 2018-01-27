import jwt_decode from "jwt-decode";


export const checkAuth=()=>{
        // localStorage.clear();
        var token = null;
        var payload = {};
        token = localStorage.getItem('token');
        console.log(token);
        if(token){
            payload = jwt_decode(token);
            console.log(payload.exp);
            return true;
        }
        // console.log(exp);
        return false;
    }
