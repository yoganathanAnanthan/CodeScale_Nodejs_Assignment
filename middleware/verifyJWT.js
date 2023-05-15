const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer')) {
        return res.status(401).json({ message: 'unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' })
      }

    
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' })
        }else{
            req.userId = decodedToken.userId
            next()
        }
        
    })
}

module.exports = verifyJWT