
import axios from "axios";
export default axios.create({
	baseURL: "http://13.56.11.238.xip.io/api",
  headers:{
    "Content-type":"application/json",
    "token":localStorage.getItem("token")
  }
});
