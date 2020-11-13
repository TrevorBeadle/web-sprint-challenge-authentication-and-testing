 const db = require('../database/dbConfig');
 
 function findByUsername(username) {
  return db('users').where({username}).first();
 }

 function add(user) {
   return db('users').insert(user);
 }