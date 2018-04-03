// import jwt_decode from "jwt-decode";


export const checkAuth=()=>{
        // localStorage.clear();
        var user = null;
        var payload = {};
        let exp = null;
        user = localStorage.getItem('user');
        // console.log(user);
        
        if(user !== null && user !== 'null'){
            payload = JSON.parse(user);
            // console.log(JSON.parse(payload));
            if(payload.stsTokenManager.expirationTime){
                exp = payload.stsTokenManager.expirationTime;
            }else{
                return false;
            }

            const dateTime = Date.now();
            const timestamp = Math.floor(dateTime / 1000);
            // console.log('Payload:',exp);
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
