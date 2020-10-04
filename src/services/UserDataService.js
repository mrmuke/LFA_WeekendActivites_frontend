import axios from "axios";
import http from "../http-common";

class UserDataService {
    create(data) {
        return axios.create({
		baseURL: "http://13.56.11.238.xip.io/api",
            headers: {
              "Content-type": "application/json",
              "id":data
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
