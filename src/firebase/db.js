import { db } from './firebase';

// User API

export const doCreateUser = (username, email) =>
  db.ref(`users/`).push({
    username,
    email,
  });

export const addTripToUser = (userId, month, trip) =>
  db.ref(`userTrips/`).push({
    userId,
    month,
    trip
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

  export const getTrips = () =>
    db.ref('/trips').once('value');
  
  export const getTripById = (id) =>
    db.ref('/trips/' + id).once('value');

    export const getDriversTrips = (driverId, month) =>
    db.ref('/userTrips/').orderByChild('userId').equalTo(driverId);
  
// Other db APIs ...
