
import axios from "axios";
export default axios.create({
	baseURL:  "http://localhost:8080/api"/* "https://lfawa-api.herokuapp.com/api"*/,
  headers:{
    "Content-type":"application/json",
    "token":localStorage.getItem("token")
  }
});
