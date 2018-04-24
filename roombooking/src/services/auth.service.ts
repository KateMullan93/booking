import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
  isDev:boolean;
 baseUrl='http://34.244.184.254/api/';
//  baseUrl='http:// 172.29.123.218:3000/api/';
  constructor(private http:Http){
    console.log('App Service Initialized...');
      this.isDev = true;
    }
    prepEndpoint(ep){
      if(this.isDev){
        return ep;
      } else {
        return 'https://www.ssdfsdf.com/'+ep;
      }
    }
    authenticateEmployee(employeeNo){
      let ep = this.prepEndpoint(this.baseUrl+'employee/'+employeeNo);
      return this.http.get(ep)
      .map(res => res.json());
    }

  }