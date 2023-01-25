
import axios from "axios";
import BASE_URL from "../BASE_URL";
export default axios.create({
	baseURL: BASE_URL,
  headers:{
    "Content-type":"application/json",
    "token":localStorage.getItem("token")
  }
});
