import moment from 'moment';
import Constants from 'expo-constants';
import axios from 'axios'
import uuid from 'uuid';

const { manifest } = Constants;
const api = manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : 'www.productionurl.com';

//const url = `http://${api}/events`;
//const url='http://localhost:3000/events'
//const url=`http://${api}/events`;
const url = `http://10.0.2.2:3000/events`;

export async function getEvents() {
  console.log("url:",url) 
  try{
    const resp=await axios.get(url);
    const events=resp.data;
    var result =events.map(e => ({ ...e, date: new Date(e.date) }))
    console.log("events");
    return result;  
  }
  catch(ex){
    console.log(ex.stack)
    console.log("error")
  }
}

export function postEvent(formData){
    return fetch(url,{
      method:'POST',
      body:JSON.stringify({
        "title": formData.title,
        "date": formData.date,
        "id": uuid()
      }),
      headers:new Headers({'content-type':'application/json'})
      }).then((response)=>response.json()).catch(ex=>console.log(ex));
  }
  // catch(ex){

  // }


export function formatDate(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format('D MMM YYYY');
}

export function formatDateTime(dateString) {
    const parsed = moment(new Date(dateString));
  
    if (!parsed.isValid()) {
      return dateString;
    }
  
    return parsed.format('H A on D MMM YYYY');
  }
  

export function getCountdownParts(eventDate) {
  const duration = moment.duration(moment(new Date(eventDate)).diff(new Date()));
  return {
    days: parseInt(duration.as('days')),
    hours: duration.get('hours'),
    minutes: duration.get('minutes'),
    seconds: duration.get('seconds'),
  };
}

function generateUUID() {
  var d = new Date().getTime();
  if(Date.now){
      d = Date.now(); //high-precision timer
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};