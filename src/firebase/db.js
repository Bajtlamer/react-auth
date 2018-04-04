import { db } from './firebase';

// User API

export const doCreateUser = (username, email) =>
  db.ref(`users/`).push({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const onceGetTrips = () =>
  db.ref('flexbusapp/trips').once('value');

// Other db APIs ...
