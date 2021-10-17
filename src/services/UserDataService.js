import axios from "axios";
import http from "../http-common";

class UserDataService {
    create(data) {
        return axios.create({
		baseURL: /* "http://localhost:8080/api" */ "https://lfawa-api.herokuapp.com/api",
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
         return http.post('/users/strike', id);
     }
     resetStrike(id){
         return http.post('/users/resetStrike', id);
     }

}
export default new UserDataService();
