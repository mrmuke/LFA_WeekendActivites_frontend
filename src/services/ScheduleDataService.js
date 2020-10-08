import http from "../http-common";

class ScheduleDataService {
    getAll() {
        return http.get("/schedules");
    }
    getCurrent() {
        return http.get(`/schedules/current`)
    }
    get(id) {
        return http.get(`/schedules/${id}`);
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

    delete(id) {
        return http.delete(`/schedules/${id}`);
    }
}
export default new ScheduleDataService();