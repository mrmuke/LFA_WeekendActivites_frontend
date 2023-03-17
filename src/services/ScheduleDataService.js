import http from "../http-common";

class ScheduleDataService {
    getAll() {
        return http.get("/schedules");
    }
    getCurrent() {
        return http.get(`/schedules/current`).catch(()=>{
            localStorage.setItem("user",null);
            localStorage.setItem("token",null);
            window.location.reload()})
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

    delete(id) {
        return http.delete(`/admin/schedules/${id}`);
    }
}
export default new ScheduleDataService();