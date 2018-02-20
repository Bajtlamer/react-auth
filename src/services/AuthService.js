import jwt_decode from "jwt-decode";


export const checkAuth=()=>{
        // localStorage.clear();
        var token = null;
        var payload = {};
        let exp = null;
        token = localStorage.getItem('token');
        // console.log(token);
        
        if(token !== null && token !== 'null'){
            payload = jwt_decode(token);
            if(payload.exp){
                exp = payload.exp;
            }else{
                return false;
            }

            const dateTime = Date.now();
            const timestamp = Math.floor(dateTime / 1000);
            // console.log('Payload:',payload.exp);
            // console.log('Date:',timestamp);
            
            if(exp > timestamp){
                return true;
            }else{
                return false;
            }
        }
        // console.log(exp);
        return false;
    }
