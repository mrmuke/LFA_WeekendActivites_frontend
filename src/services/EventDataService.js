import http from "../http-common";

class EventDataService {
    getAll() {
        return http.get("/voteEvents");
    }

    get(id) {
        return http.get(`/voteEvents/${id}`);
    }
    upvote(id, email){
        return http.post(`/voteEvents/upvote/${id}?email=${email}`)
    }
    downvote(id,email)
    {
        return http.post(`/voteEvents/downvote/${id}?email=${email}`)
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