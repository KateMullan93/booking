import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';
import { LocalNotifications } from '@ionic-native/local-notifications';


import {AppService} from '../../services/app.service';


@Injectable()
export class BeaconProvider {

	delegate: any;
	region: any;

	constructor(public platform: Platform, public events: Events,public IBeacon:IBeacon,public appService:AppService,public localNotifications:LocalNotifications) {
	}

	initialise(): any {
		let promise = new Promise((resolve, reject) => {
			// we need to be running on a device
			if (this.platform.is('cordova')) {

				// Request permission to use location 
				this.IBeacon.requestAlwaysAuthorization();	

				this.IBeacon.isBluetoothEnabled().then(blueToothStatus=>{
					if(blueToothStatus){

					}
					else
					{
						// Schedule a single notification
						this.localNotifications.schedule({
							id: 999,
							text: 'Please Switch on Bluetooth'
						});
					}
				});

				// create a new delegate and register it with the native layer
				this.delegate = this.IBeacon.Delegate();

				






				// Subscribe to some of the delegate's event handlers
				this.delegate.didEnterRegion()
				.subscribe(
					data => {
						this.events.publish('this.delegate.didEnterRegion', data);
					},
					error => console.error()
					);
			


					this.appService.getBeacons()
					.subscribe(beacons => {

						if(beacons.statusCode==200){
							var i=0;
							for(i=0;i<beacons.data.length;i++){
						
							console.log(beacons.data[i]);
							this.region = this.IBeacon.BeaconRegion(beacons.data[i].beaconId,beacons.data[i].uuid,beacons.data[i].major,beacons.data[i].minor);
							this.region.NotifyEntryStateOnDisplay = true;
							this.region.NotifyOnEntry = true;
							this.region.NotifyOnExit = true;

							// start ranging
							this.IBeacon.startMonitoringForRegion(this.region)
							.then(
								() => {
									resolve(true);
									console.log("monitor for region");
								},
								error => {

									resolve(false);
								}
								);

						
							}
						}
						else{
							console.log("check error with the api call");

						}
					},
					err=>{
						console.log("couldn't able to register beacons error with the api call");
					}
					);

				} else {

					resolve(false);
				}
			});

		return promise;
	}
}
