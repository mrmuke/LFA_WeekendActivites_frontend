import http from "../http-common";

class ScheduleDataService {
    getAll() {
        return http.get("/schedules");
    }
    getCurrent() {
        return http.get(`/schedules/current`).catch(e=>
            localStorage.setItem("user",null),
            localStorage.setItem("token",null),
            window.location.reload())
    }
    get(id) {
        return http.get(`/schedules/${id}`);
    }

    publish(id) {
        return http.post(`/schedules/publish/${id}`);
    }

    create(data) {
        return http.post("/schedules", data);
    }

    update(id, data) {
        return http.put(`/schedules/${id}`, data);
    }
    bumpToEnd(event){
        return http.post("/schedules/bump", event)
    }
    deleteUser(scheduleId, eventName,user){
        return http.delete(`/schedules/${scheduleId}/${eventName}`, user)
    }

    delete(id) {
        return http.delete(`/schedules/${id}`);
    }
}
export default new ScheduleDataService();