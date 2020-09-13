import http from "../http-common";

class UserDataService {
    create(data) {
        return http.post("/users", data);
     }
     get(id) {
         return http.get(`/users/${id}`);
     }
     update(id, data) {
         return http.put(`/users/${id}`, data);
     }
}
export default new UserDataService();