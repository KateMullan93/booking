import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {AuthService} from '../../services/auth.service';

//plugins
import { NativeStorage } from '@ionic-native/native-storage';

//pages
import  {RoomavalibityPage} from '../../pages/roomavalibity/roomavalibity';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-login',
 	templateUrl: 'login.html',
 })
 export class LoginPage {
 	employeeNo:string;
 	showMessage:boolean;
 	messageToDisplay:string;
 	msgBackground:string;
 	constructor(
 		public navCtrl: NavController, 
 		public navParams: NavParams,
 		public authService:AuthService,
 		public nativeStorage:NativeStorage,
 		public viewCtrl:ViewController) {
 		this.employeeNo="";
 		this.showMessage=false;
 		this.msgBackground="";
 		this.messageToDisplay="";
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad LoginPage');
 	}
 	authenticateEmployee(){
 		console.log("sdfsdf");
 		if(this.employeeNo!=null&&this.employeeNo!=""){
 			this.authService.authenticateEmployee(this.employeeNo).subscribe(
 				empData=>{
 					if(empData.statusCode==200){
 						if(empData.data.length!=0){
 							this.nativeStorage.setItem('employeeDetails',{employeeNo:empData.data[0].employeeNo})
 							.then
 							(
 								() => {

 									console.log('Stored item!');
 									this.navCtrl.push(RoomavalibityPage);
 								}
 								,
 								error => console.error('Error storing item', error)
 								);
 						}
 						else{
 							this.showMessage=true;
 							this.messageToDisplay="Employee Not Found";
 							this.msgBackground='#ff5c33';
 						}
 					}
 					else
 					{
 						console.log("error with the api call");
 					}
 				},
 				err=>{
 					console.log(err);
 				}
 				);
 		}
 		else{
 			this.showMessage=true;
 			this.messageToDisplay="Please enter your employee number";
 			this.msgBackground='#ff5c33';
 		}
 	}

 }
