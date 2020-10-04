
import axios from "axios";
export default axios.create({
  baseURL: "http://3.101.80.179.xip.io/api",
  headers:{
    "Content-type":"application/json",
    "token":localStorage.getItem("token")
  }
});
