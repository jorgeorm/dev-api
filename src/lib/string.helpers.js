/**
 * 
 */
exports.randomStr = (length) => {
    let str = "";
    const strBase = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i = 0; i < length; i++) {
        str += strBase.charAt(Math.floor(Math.random() * strBase.length))
    }

    return str;
};