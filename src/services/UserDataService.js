import axios from "axios";
import BASE_URL from "../../BASE_URL";
import http from "../http-common";

class UserDataService {
    create(data) {
        return axios.create({
		baseURL: BASE_URL,
            headers: {
              "Content-type": "application/json",
              "id":data
            }
          }).post("/users/auth")
     }
     get(id) {
         return http.get(`/users/${id}`);
     }
     getAll(){
         return http.get('/users/all');
     }
     update(id, data) {
         return http.put(`/users/${id}`, data);
     }
     strike(id){
         return http.post('/admin/users/strike', id);
     }
     resetStrike(id){
         return http.post('/admin/users/resetStrike', id);
     }

}
export default new UserDataService();
