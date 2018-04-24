import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';


//plugins goes here
import { NativeStorage } from '@ionic-native/native-storage';

//app services goes here
import {AppService} from '../../services/app.service';



/**
 * Generated class for the RoombookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-roombooking',
 	templateUrl: 'roombooking.html',
 })
 export class RoombookingPage {
 	startTime:string;
 	endTime:string;
 	roomId:string;
 	employeeNo:string;
 	todayDate:String;
 	showMessage:boolean;
 	messageToDisplay:string;
 	msgBackground:string;
 	constructor(public navCtrl: NavController,
 		public navParams: NavParams,
 		public nativeStorage:NativeStorage,
 		public appService:AppService,
 		public platform:Platform) {
 		this.showMessage=false;
 		this.msgBackground="";
 		this.messageToDisplay="";
 		var today = new Date();
 		this.todayDate=today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear();
 		this.startTime="";
 		this.endTime="";
 		this.roomId=navParams.get('roomId');
 		this.platform.ready().then(() => {

 			this.nativeStorage.getItem('employeeDetails').then((employeeData) => { 
 				this.employeeNo=employeeData.employeeNo;
 			});
 		}
 		);
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad RoombookingPage');
 	}
 	bookRoom(){
 		if(this.startTime!==""||this.endTime!==""){
 			if(this.timeBasicCheck()){
 				var startTimeSplit=this.startTime.split(":");
 				var endTimeSplit=this.endTime.split(":");
 				var startTimeHours=startTimeSplit[0];
 				var startTimeMins=startTimeSplit[1];
 				var endTimeHours=endTimeSplit[0];
 				var endTimeMins=endTimeSplit[1];

 				if(this.basicTimeValidation(startTimeHours,startTimeMins,endTimeHours,endTimeMins)){
 					if(this.threeHoursMaxCheck(startTimeHours,startTimeMins,endTimeHours,endTimeMins)){
 						

 						if(this.startTimeIsGreaterThanCurrentTime(startTimeHours,startTimeMins)){

 							if(parseInt(startTimeHours)<8||parseInt(endTimeHours)>20){
 								this.showMessage=true;
 								this.messageToDisplay="Bookings cannot be made before 8am or after 8pm";
 								this.msgBackground='#ff5c33';
 							}
 							else
 							{
 								var dateForStartTime=new Date();
 								var dateForEndTime=new Date();
 								var startTime=dateForStartTime.setHours(parseInt(startTimeHours),parseInt(startTimeMins),0);
 								var endTime=dateForEndTime.setHours(parseInt(endTimeHours),parseInt(endTimeMins),0);
 								var roomDataAndEmployeeData={
 									roomId:this.roomId,
 									employeeNo:this.employeeNo,
 									startDate:new Date(startTime).toISOString(),
 									endDate:new Date(endTime).toISOString()

 								};
 								this.appService.bookRoom(roomDataAndEmployeeData).subscribe(data=>{
 									if(data.statusCode==200){
 										if(data.status==="booked"){
 											this.showMessage=true;
 											this.messageToDisplay="Successfully Booked";
 											this.msgBackground='green';
 										}
 										else
 										{
 											this.showMessage=true;
 											this.messageToDisplay="Not avalible to Book";
 											this.msgBackground='#ff5c33';
 										}
 									}
 									else
 									{
 										console.log("error with the server api call");
 									}
 								},err=>{
 									console.log("error with server");
 								});
 							}

 						}
 						else
 						{
 							this.showMessage=true;
 							this.messageToDisplay="Please check your start and end time is correct.";
 							this.msgBackground='#ff5c33';
 						}

 					}
 					else
 					{
 						this.showMessage=true;
 						this.messageToDisplay="Please check your start and end time is correct.";
 						this.msgBackground='#ff5c33';
 					}
 				}	
 				else
 				{
 					this.showMessage=true;
 					this.messageToDisplay="Please check your start and end time is correct.";
 					this.msgBackground='#ff5c33';

 				}

 			}
 			else
 			{
 				this.showMessage=true;
 				this.messageToDisplay="Please check your start and end time is correct.";
 				this.msgBackground='#ff5c33';
 			}

 		}
 		else
 		{
 			this.showMessage=true;
 			this.messageToDisplay="Please check your start and end time is correct.";
 			this.msgBackground='#ff5c33';
 		}
 	}
 	startTimeIsGreaterThanCurrentTime(startTimeHours,startTimeMins){
 		var currentDate=new Date();
 		if(currentDate.getHours()<=parseInt(startTimeHours)){
 			if(currentDate.getHours()==parseInt(startTimeHours)){
 				if(currentDate.getMinutes()<=parseInt(startTimeMins)){
 					return true;
 				}
 				else
 				{
 					return false;
 				}
 			}
 			else
 			{
 				return true;
 			}
 		}
 		else
 		{
 			return false;
 		}
 	}
 	timeBasicCheck(){

 		if (this.startTime.indexOf(':')>-1&&this.endTime.indexOf(':')>-1)
 		{
 			var startTimeSplit=this.startTime.split(":");
 			var endTimeSplit=this.endTime.split(":");
 			var startTimeHours=startTimeSplit[0];
 			var startTimeMins=startTimeSplit[1];
 			var endTimeHours=endTimeSplit[0];
 			var endTimeMins=endTimeSplit[1];
 			if(startTimeHours!=""&&endTimeHours!=""&&endTimeMins!=""&&startTimeMins!=""){
 				if(parseInt(startTimeMins)>=0&&parseInt(startTimeMins)<=60&&parseInt(endTimeMins)>=0&&parseInt(endTimeMins)<=60){
 					if(parseInt(startTimeHours)>=0&&parseInt(startTimeHours)<=24&&parseInt(endTimeHours)>=0&&parseInt(endTimeHours)<=24){
 						return true;
 					}
 					else{
 						return false;	
 					}


 				}
 				else
 				{
 					return false;
 				}
 			}
 			else
 			{
 				return false;
 			}

 		}
 		else{
 			return false;
 		}
 	}
 	basicTimeValidation(startTimeHours,startTimeMins,endTimeHours,endTimeMins){
 		if(this.minsCheck(startTimeMins,endTimeMins)){
 			if(parseInt(endTimeHours)<parseInt(startTimeHours)){
 				return false;
 			}
 			else
 			{
 				if(parseInt(endTimeHours)==parseInt(startTimeHours)){
 					if(parseInt(endTimeMins)<=parseInt(startTimeMins)){
 						return false;
 					}		
 					else
 					{
 						return true;
 					}
 				}
 				else
 				{
 					return true;
 				}
 			}
 		}
 		else
 		{
 			return  false;
 		}
 	}
 	minsCheck(startTimeMins,endTimeMins){
 		if(parseInt(startTimeMins)>60||parseInt(endTimeMins)>60){
 			return false;
 		}
 		else
 		{
 			return true;
 		}
 	}
 	threeHoursMaxCheck(startTimeHours,startTimeMins,endTimeHours,endTimeMins){
 		var maxHoursDifference=parseInt(endTimeHours)-parseInt(startTimeHours);
 		if(maxHoursDifference>=3){
 			if(maxHoursDifference==3){
 				var maxMinsDifference=parseInt(endTimeMins)-parseInt(startTimeMins);
 				if(maxMinsDifference>=0){
 					return false;
 				}
 				else
 				{
 					return true;
 				}
 			}
 			else
 			{
 				return false;
 			}
 		}
 		else
 		{
 			return true;
 		}

 	}
 	closeErrorMessage(){
 		this.showMessage=false;
 	}
 }
