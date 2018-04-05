import { db } from './firebase';

// User API

export const doCreateUser = (username, email) =>
  db.ref(`users/`).push({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const getTrips = () =>
  db.ref('/trips').once('value');

// Other db APIs ...
