import http from "../http-common";

class ScheduleDataService {
    getAll() {
        return http.get("/schedules");
    }
    getCurrent() {
        return http.get(`/schedules/current`).catch(()=>{
            window.location.replace("/noschedule")})
    }
    get(id) {
        return http.get(`/schedules/${id}`);
    }
    publish(id) {
        return http.post(`/admin/schedules/publish/${id}`);
    }
    create(data) {
        return http.post("/admin/schedules", data);
    }
    update(id, data) {
        return http.put(`/schedules/${id}`, data);
    }
    addUser(id, data){
        return http.post(`/schedules/${id}/add`, data);
    }
    removeUser(id, data){
        return http.post(`/schedules/${id}/remove`, data);
    }
    bumpUser(id, data){
        return http.post(`/admin/schedules/${id}/bump`, data);
    }
    swapUser(id, data){
        return http.post(`/admin/schedules/${id}/swap`, data);
    }
    delete(id) {
        return http.delete(`/admin/schedules/${id}`);
    }
}
export default new ScheduleDataService();