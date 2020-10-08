
import axios from "axios";
export default axios.create({
	baseURL: /* "http://localhost:8080/api" */ "http://54.177.140.153.xip.io/api",
  headers:{
    "Content-type":"application/json",
    "token":localStorage.getItem("token")
  }
});
