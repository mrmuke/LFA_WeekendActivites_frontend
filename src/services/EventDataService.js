import http from "../http-common";

class EventDataService {
    getAll() {
        return http.get("/voteEvents");
    }

    get(id) {
        return http.get(`/voteEvents/${id}`);
    }
    upvote(id){
        return http.post(`/voteEvents/upvote/${id}`)
    }
    downvote(id)
    {
        return http.post(`/voteEvents/downvote/${id}`)
    }


    create(data) {
        return http.post("/voteEvents", data);
    }

    update(id, data) {
        return http.put(`/voteEvents/${id}`, data);
    }

    delete(id) {
        return http.delete(`/voteEvents/${id}`);
    }




}

export default new EventDataService();