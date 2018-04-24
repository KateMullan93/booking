  import {Injectable} from '@angular/core';
  import {Http, Headers} from '@angular/http';
  import 'rxjs/add/operator/map';
  @Injectable()
  export class AppService{
    isDev:boolean;
    baseUrl='http://34.244.184.254/api/';
   // baseUrl='http://172.29.123.218:3000/api/';
    constructor(private http:Http){
      console.log('App Service Initialized...');
      this.isDev = true; // Change to false before deployment
    }
    prepEndpoint(ep){
      if(this.isDev){
        return ep;
      } else {
        return 'https://www.ssdfsdf.com/'+ep;
      }
    }
    getBeacons(){
      let ep = this.prepEndpoint(this.baseUrl+'beacons');
      return this.http.get(ep)
      .map(res => res.json());
    }
    getRoomByBeaconId(employeeAndBeaconDetails){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let ep = this.prepEndpoint(this.baseUrl+'getroom/');
      return this.http.post(ep, JSON.stringify(employeeAndBeaconDetails), {headers: headers})
      .map(res => res.json()); 
    }
    bookRoom(roomDataAndEmployeeData)
    {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let ep = this.prepEndpoint(this.baseUrl+'booking');
      return this.http.post(ep, JSON.stringify(roomDataAndEmployeeData), {headers: headers})
      .map(res => res.json()); 

    }
    getRecentBookedTimes(roomData){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let ep = this.prepEndpoint(this.baseUrl+'getrecentbookings');
      return this.http.post(ep, JSON.stringify(roomData), {headers: headers})
      .map(res => res.json()); 

    }

  }  