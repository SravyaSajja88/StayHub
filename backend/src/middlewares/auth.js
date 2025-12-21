import jwt from 'jsonwebtoken';
const verifyToken = (req,res,next) => {
    try{
        const token = req.cookies.auth_token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.userId = decoded.id;
        next();
    }
    catch(err) {
        res.status(401).json({message:"Unauthorized"});
    }
}
export { verifyToken };