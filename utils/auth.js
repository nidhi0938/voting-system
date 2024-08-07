const jwt = require("jsonwebtoken");

const sessionIdToUserMap=new Map();
const key="Ali7haider12312331"; 
// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.Email,
        username:user.UserName,
        role:user.Role

    },
    key
    );
}
// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }
function getUser(token){
    if (!token) return null;
    return jwt.verify(token,key);
}

module.exports={
    setUser,getUser,
}