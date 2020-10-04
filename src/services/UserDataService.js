import axios from "axios";
import http from "../http-common";

class UserDataService {
    create(data) {
        return axios.create({
            baseURL: "http://3.101.80.179.xip.io/api",
            headers: {
              "Content-type": "application/json",
              "id_token":data
            }
          }).post("/users/auth")
     }
     get(id) {
         return http.get(`/users/${id}`);
     }
     update(id, data) {
         return http.put(`/users/${id}`, data);
     }
}
export default new UserDataService();