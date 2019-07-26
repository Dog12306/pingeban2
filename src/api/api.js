import http from "@/utils/request";

export const getCode = (data, cd) => http.post(`/Config/sendMsg`, data).then(cd);

export const doLogin = (data, cd) => http.post(`/Login/userLogin`, data).then(cd);

export const getUserInfo = (cd) => http.post(`/IsLogin/getMember`).then(cd);

export const loginOut = (data, cd) => http.post(`/Members/lognOut`, data).then(cd)