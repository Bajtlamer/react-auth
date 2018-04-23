// import jwt_decode from "jwt-decode";
import { db } from '../firebase';

export const checkAuth = () => {
    // localStorage.clear();
    var user = null;
    var payload = {};
    let exp = null;
    user = localStorage.getItem('user');
    // console.log(user);

    if (user !== null && user !== 'null') {
        payload = JSON.parse(user);
        // console.log(JSON.parse(payload));
        if (payload.stsTokenManager.expirationTime) {
            exp = payload.stsTokenManager.expirationTime;
        } else {
            return false;
        }

        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);
        // console.log('Payload:',exp);
        // console.log('Date:',timestamp);

        if (exp > timestamp) {
            return true;
        } else {
            return false;
        }
    }
    // console.log(exp);
    return false;
}

export const isAdministrator = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && typeof user !== 'undefined') {
        var uid = user.uid;
        if (uid) {
            return db.getUserIsAdmin(uid).then(snap => {
                return new Promise((resolve, reject) => {
                    if (snap) {
                        resolve(snap.val().isAdmin);
                    } else {
                        reject(false);
                    }
                });
            });
        }
    }
}