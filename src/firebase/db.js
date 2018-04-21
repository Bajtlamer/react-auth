import { db } from './firebase';

// User API

export const doCreateUser = (username, email) =>
  db.ref(`users/`).push({
    username,
    email,
  });

export const addTripToUser = (userId, month, year, trip) =>
    db.ref(`userTrips/` + userId + '/' + year + '/' + month + '/').push(trip);

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const getTrips = () =>
    db.ref('/trips/').orderByChild('trasa');

export const addTrip = (trip, id) =>
    db.ref('/trips/'+id).set(trip);

export const deleteTripTemplate = (id) =>
    db.ref('/trips/' + id);
  
export const getTripById = (id) =>
    db.ref('/trips/' + id).once('value');

export const removeDriversTrips = (driverId, month, year, key) =>
    db.ref('/userTrips/' + driverId + '/' + year + '/' + month + '/' + key);

    export const getDriversTrips = (driverId, month, year) =>
    db.ref('/userTrips/' + driverId + '/' + year + '/' + month + '/');
  
// Other db APIs ...
