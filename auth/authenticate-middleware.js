/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if(!token) {
      return res.status(401).json({message: 'invalid credentials'});
    }

    jwt.verify(token, 'secret token', (err, decoded) => {
      if(err) {
        return res.status(401).json({message: 'invalid credentials'});
      }
      req.token = decoded;
      next();
    })
  } catch(err) {
    next(err);
  }
};
