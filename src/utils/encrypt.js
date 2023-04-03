const CryptoJS = require("crypto-js");
let key = process.env.VUE_APP_USER_ENCRYPTION_KEY

export function encrypt(data){
    return CryptoJS.AES.encrypt(JSON.stringify(data),key).toString()
}
export function decrypt(data){
    if(data ==null||data=="null"){
        return null;
    }
    if(data[0]=="{"){
        localStorage.setItem("user",encrypt(JSON.parse(data)))
        return JSON.parse(data)
      }
      console.log(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data,key)));
    return JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data,key)))
}