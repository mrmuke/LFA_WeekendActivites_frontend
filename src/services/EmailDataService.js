import http from "../http-common";

class EmailDataService {
  sendEmail(event,userId) {

    return http.post(`/sendEmail?userId=`+userId,event)
  }



}

export default new EmailDataService();