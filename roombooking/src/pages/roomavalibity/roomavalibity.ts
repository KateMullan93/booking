	import { Component } from '@angular/core';
	import { IonicPage, NavController, NavParams,Events  } from 'ionic-angular';
	import { NgZone } from '@angular/core';
	import { Platform } from 'ionic-angular';

//plugins goes here
import { NativeStorage } from '@ionic-native/native-storage';


//Providers  Goes Here
import { BeaconProvider } from '../../providers/beacon/beacon';

//app services goes here
import {AppService} from '../../services/app.service';


//pages goes here
import {RoombookingPage} from '../../pages/roombooking/roombooking';
import {LoginPage} from '../../pages/login/login';
/**
 * Generated class for the RoomavalibityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-roomavalibity',
 	templateUrl: 'roomavalibity.html',
 })
 export class RoomavalibityPage {
 	employeeNo:string;
 	roomData:RoomData[]=[];
 	logOutStatus:boolean;
 	constructor(
 		public navCtrl: NavController, 
 		public navParams: NavParams,
 		public beaconProvider:BeaconProvider,
 		public events:Events,
 		public zone:NgZone,
 		public appService:AppService,
 		public platform:Platform,
 		public nativeStorage:NativeStorage
 		) {
 		this.logOutStatus=false;
 		this.platform.ready().then(() => {

 			this.nativeStorage.getItem('employeeDetails').then((employeeData) => { 

 				this.employeeNo=employeeData.employeeNo;

 				//Code is for Initialize the Beacons
 				this.beaconProvider.initialise().then((isInitialised) => {
 					if (isInitialised) {
 						this.listenToBeaconEvents();

 					}
 				});



 			}
 			);


 		}
 		);


 	}
 	showLogout(){
 		if(this.logOutStatus){
 			this.logOutStatus=false;
 		}
 		else
 		{
 			this.logOutStatus=true;
 		}
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad RoomavalibityPage');

 	}
 	listenToBeaconEvents() {

 			/*
 			this.events.subscribe('this.delegate.didRangeBeaconsInRegion', (data) => {
      		// update the UI with the beacon list
		    console.log(data);
		    this.zone = new NgZone({ enableLongStackTrace: false });
		    this.zone.run(() => {
			    this.beacons = [];
			    let beaconList = data.beacons;
			    	beaconList.forEach((beacon) => {
			    		let beaconObject = new BeaconModel(beacon);
			    		console.log(beaconObject);
			    		this.backgroundMode.moveToForeground();
			    		this.beacons.push(beaconObject);
			    	});
				});
			});
			*/
			this.events.subscribe('this.delegate.didEnterRegion', (data) => {
				var beaconAndEmployeeData={
					employeeNo:this.employeeNo,
					beaconId:data.region.identifier
				};
				this.appService.getRoomByBeaconId(beaconAndEmployeeData).subscribe(data=>{

					if(data.statusCode==200){
						var roomData={
							_id:data.data._id,
							image:data.data.image,
							location:data.data.location,
							name:data.data.name,
							status:data.status,
							avalibleTime:data.avalibleTime
						};
						if(this.roomData.length==0){
							this.zone.run(() => {
								this.roomData.push(roomData);
							}
							);
							console.log(this.roomData);
						}	
						else
						{	
							this.zone.run(() => {
								var roomAlreadyPresent=false;
								var i=0;
								for(i=0;i<this.roomData.length;i++){
									if(this.roomData[i]._id===roomData._id){
										roomAlreadyPresent=true;
									}
								}
								if(!roomAlreadyPresent){
									this.roomData.unshift(roomData);
								}

								
							});

						}

					}	
					else
					{
						console.log("Issue when fetching user data");
					}

				},
				err=>{

				}
				);
			});
		}
		bookRoom(roomId){
			this.navCtrl.push(RoombookingPage,
			{
				roomId:roomId
			}
			);
		}
		logOut(){
			this.nativeStorage.clear().then(clearred=>{
				console.log(clearred);
				this.navCtrl.setRoot(LoginPage);
			},
			err=>{
				console.log("Error with native storage");
			})
		}
		closeLogout(){
			this.logOutStatus=false;
		}
		doRefresh(refresher) {
			this.logOutStatus=false;
			if(this.roomData.length>0){
				var roomDataObject={
					roomData:this.roomData
				};
				this.appService.getRecentBookedTimes(roomDataObject).subscribe(data=>{
					if(data.statusCode==200){
						this.roomData=[];
						this.roomData=data.data;
						refresher.complete();
					}
					else
					{
						console.log("Error when fetching new data");
						refresher.complete();
					}
				},
				err=>{
					console.log("Error with server");
				});
			}
			else
			{
				refresher.complete();
			}

		}

	}
	export interface RoomData{
		_id:string;
		image:string;
		location:string;
		name:string;
		status:string;
		avalibleTime:string;
	}