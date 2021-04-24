/* eslint-disable */
import axios from 'axios';
const API_URL = 'https://zthornhill.pythonanywhere.com/'

export class APIService {
  constructor() {

  }

  getSubscription(param_pk) {
    const url = `${API_URL}/api/subscriptions/${param_pk}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
 }


  getSubscriptionList() {
      const url = `${API_URL}/api/subscriptions`;
      let jwtToken = localStorage.getItem('token');
      console.log(":::jwtToken:::::" + jwtToken);
      const headers = {Authorization: `jwt ${jwtToken}`};
      return axios.get(url, {headers: headers});

  }

   addNewSubscription(subscription){
  const url = `${API_URL}/api/subscriptions/`;
  let jwtToken = localStorage.getItem('token');
  const headers = {Authorization: `jwt ${jwtToken}`};
  return axios.post(url, subscription, {headers: headers});
 }

 updateSubscription(subscription){
   const url = `${API_URL}/api/subscriptions/${subscription.pk}`;
   let jwtToken = localStorage.getItem('token');
   const headers = {Authorization: `jwt ${jwtToken}`};
   return axios.put(url, subscription, {headers: headers});
 }

 deleteSubscription(subscription_Pk){
    const url = `${API_URL}/api/subscriptions/${subscription_Pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
 }

  authenticateLogin(credentials) {
    const url = `${API_URL}/auth/`;
    return axios.post(url, credentials);
  }

  registerUser(credentials) {
    console.log(API_URL)
    const url = `${API_URL}api/register/`;
    credentials.customusername = credentials.username
    return axios.post(url, credentials);
  }
}