webpackJsonp([3],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoombookingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_app_service__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//plugins goes here

//app services goes here

/**
 * Generated class for the RoombookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RoombookingPage = (function () {
    function RoombookingPage(navCtrl, navParams, nativeStorage, appService, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeStorage = nativeStorage;
        this.appService = appService;
        this.platform = platform;
        this.showMessage = false;
        this.msgBackground = "";
        this.messageToDisplay = "";
        var today = new Date();
        this.todayDate = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
        this.startTime = "";
        this.endTime = "";
        this.roomId = navParams.get('roomId');
        this.platform.ready().then(function () {
            _this.nativeStorage.getItem('employeeDetails').then(function (employeeData) {
                _this.employeeNo = employeeData.employeeNo;
            });
        });
    }
    RoombookingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RoombookingPage');
    };
    RoombookingPage.prototype.bookRoom = function () {
        var _this = this;
        if (this.startTime !== "" || this.endTime !== "") {
            if (this.timeBasicCheck()) {
                var startTimeSplit = this.startTime.split(":");
                var endTimeSplit = this.endTime.split(":");
                var startTimeHours = startTimeSplit[0];
                var startTimeMins = startTimeSplit[1];
                var endTimeHours = endTimeSplit[0];
                var endTimeMins = endTimeSplit[1];
                if (this.basicTimeValidation(startTimeHours, startTimeMins, endTimeHours, endTimeMins)) {
                    if (this.threeHoursMaxCheck(startTimeHours, startTimeMins, endTimeHours, endTimeMins)) {
                        if (this.startTimeIsGreaterThanCurrentTime(startTimeHours, startTimeMins)) {
                            if (parseInt(startTimeHours) < 8 || parseInt(endTimeHours) > 20) {
                                this.showMessage = true;
                                this.messageToDisplay = "Bookings cannot be made before 8am or after 8pm";
                                this.msgBackground = '#ff5c33';
                            }
                            else {
                                var dateForStartTime = new Date();
                                var dateForEndTime = new Date();
                                var startTime = dateForStartTime.setHours(parseInt(startTimeHours), parseInt(startTimeMins), 0);
                                var endTime = dateForEndTime.setHours(parseInt(endTimeHours), parseInt(endTimeMins), 0);
                                var roomDataAndEmployeeData = {
                                    roomId: this.roomId,
                                    employeeNo: this.employeeNo,
                                    startDate: new Date(startTime).toISOString(),
                                    endDate: new Date(endTime).toISOString()
                                };
                                this.appService.bookRoom(roomDataAndEmployeeData).subscribe(function (data) {
                                    if (data.statusCode == 200) {
                                        if (data.status === "booked") {
                                            _this.showMessage = true;
                                            _this.messageToDisplay = "Successfully Booked";
                                            _this.msgBackground = 'green';
                                        }
                                        else {
                                            _this.showMessage = true;
                                            _this.messageToDisplay = "Not avalible to Book";
                                            _this.msgBackground = '#ff5c33';
                                        }
                                    }
                                    else {
                                        console.log("error with the server api call");
                                    }
                                }, function (err) {
                                    console.log("error with server");
                                });
                            }
                        }
                        else {
                            this.showMessage = true;
                            this.messageToDisplay = "Please check your start and end time is correct.";
                            this.msgBackground = '#ff5c33';
                        }
                    }
                    else {
                        this.showMessage = true;
                        this.messageToDisplay = "Please check your start and end time is correct.";
                        this.msgBackground = '#ff5c33';
                    }
                }
                else {
                    this.showMessage = true;
                    this.messageToDisplay = "Please check your start and end time is correct.";
                    this.msgBackground = '#ff5c33';
                }
            }
            else {
                this.showMessage = true;
                this.messageToDisplay = "Please check your start and end time is correct.";
                this.msgBackground = '#ff5c33';
            }
        }
        else {
            this.showMessage = true;
            this.messageToDisplay = "Please check your start and end time is correct.";
            this.msgBackground = '#ff5c33';
        }
    };
    RoombookingPage.prototype.startTimeIsGreaterThanCurrentTime = function (startTimeHours, startTimeMins) {
        var currentDate = new Date();
        if (currentDate.getHours() <= parseInt(startTimeHours)) {
            if (currentDate.getHours() == parseInt(startTimeHours)) {
                if (currentDate.getMinutes() <= parseInt(startTimeMins)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    RoombookingPage.prototype.timeBasicCheck = function () {
        if (this.startTime.indexOf(':') > -1 && this.endTime.indexOf(':') > -1) {
            var startTimeSplit = this.startTime.split(":");
            var endTimeSplit = this.endTime.split(":");
            var startTimeHours = startTimeSplit[0];
            var startTimeMins = startTimeSplit[1];
            var endTimeHours = endTimeSplit[0];
            var endTimeMins = endTimeSplit[1];
            if (startTimeHours != "" && endTimeHours != "" && endTimeMins != "" && startTimeMins != "") {
                if (parseInt(startTimeMins) >= 0 && parseInt(startTimeMins) <= 60 && parseInt(endTimeMins) >= 0 && parseInt(endTimeMins) <= 60) {
                    if (parseInt(startTimeHours) >= 0 && parseInt(startTimeHours) <= 24 && parseInt(endTimeHours) >= 0 && parseInt(endTimeHours) <= 24) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    RoombookingPage.prototype.basicTimeValidation = function (startTimeHours, startTimeMins, endTimeHours, endTimeMins) {
        if (this.minsCheck(startTimeMins, endTimeMins)) {
            if (parseInt(endTimeHours) < parseInt(startTimeHours)) {
                return false;
            }
            else {
                if (parseInt(endTimeHours) == parseInt(startTimeHours)) {
                    if (parseInt(endTimeMins) <= parseInt(startTimeMins)) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
        }
        else {
            return false;
        }
    };
    RoombookingPage.prototype.minsCheck = function (startTimeMins, endTimeMins) {
        if (parseInt(startTimeMins) > 60 || parseInt(endTimeMins) > 60) {
            return false;
        }
        else {
            return true;
        }
    };
    RoombookingPage.prototype.threeHoursMaxCheck = function (startTimeHours, startTimeMins, endTimeHours, endTimeMins) {
        var maxHoursDifference = parseInt(endTimeHours) - parseInt(startTimeHours);
        if (maxHoursDifference >= 3) {
            if (maxHoursDifference == 3) {
                var maxMinsDifference = parseInt(endTimeMins) - parseInt(startTimeMins);
                if (maxMinsDifference >= 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    RoombookingPage.prototype.closeErrorMessage = function () {
        this.showMessage = false;
    };
    RoombookingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-roombooking',template:/*ion-inline-start:"/Users/katemullan/Booking/roombooking/src/pages/roombooking/roombooking.html"*/`<!--\n  Generated template for the RoombookingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n	<ion-navbar>\n		<ion-title >Room Boooking</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n	<ion-grid no-padding>\n		<ion-row no-padding>\n			<ion-col no-padding>\n				<p class="todayDate">{{todayDate}}</p>\n				<p *ngIf="showMessage&&msgBackground==\'#ff5c33\'"  class="errorMessageCss orangeBackground">{{messageToDisplay}}</p>\n				<p *ngIf="showMessage&&msgBackground==\'green\'"  class="errorMessageCss greenBackground">{{messageToDisplay}}</p>\n				<ion-item class="ionItemCss">\n					<ion-label color="primary"  >Start Time</ion-label>\n					<ion-input placeholder="12:08" (ionFocus)="closeErrorMessage()"   [(ngModel)]="startTime">\n						\n					</ion-input>\n				</ion-item>\n				<ion-item>\n					<ion-label color="primary"  >End Time</ion-label>\n					<ion-input placeholder="16:05" (ionFocus)="closeErrorMessage()" [(ngModel)]="endTime">\n						\n					</ion-input>\n				</ion-item>\n				<div class="bookingButtonDiv">\n					<button ion-button color="primary" class="bookingButton" (click)="bookRoom()">Book</button>\n				</div>\n			</ion-col>\n		</ion-row>\n	</ion-grid>\n</ion-content>\n`/*ion-inline-end:"/Users/katemullan/Booking/roombooking/src/pages/roombooking/roombooking.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_3__services_app_service__["a" /* AppService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
    ], RoombookingPage);
    return RoombookingPage;
}());

//# sourceMappingURL=roombooking.js.map

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		282,
		2
	],
	"../pages/roomavalibity/roomavalibity.module": [
		283,
		1
	],
	"../pages/roombooking/roombooking.module": [
		284,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 158;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = (function () {
    //  baseUrl='http:// 172.29.123.218:3000/api/';
    function AuthService(http) {
        this.http = http;
        this.baseUrl = 'http://34.244.184.254/api/';
        console.log('App Service Initialized...');
        this.isDev = true;
    }
    AuthService.prototype.prepEndpoint = function (ep) {
        if (this.isDev) {
            return ep;
        }
        else {
            return 'https://www.ssdfsdf.com/' + ep;
        }
    };
    AuthService.prototype.authenticateEmployee = function (employeeNo) {
        var ep = this.prepEndpoint(this.baseUrl + 'employee/' + employeeNo);
        return this.http.get(ep)
            .map(function (res) { return res.json(); });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BeaconProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ibeacon__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_app_service__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BeaconProvider = (function () {
    function BeaconProvider(platform, events, IBeacon, appService, localNotifications) {
        this.platform = platform;
        this.events = events;
        this.IBeacon = IBeacon;
        this.appService = appService;
        this.localNotifications = localNotifications;
    }
    BeaconProvider.prototype.initialise = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            // we need to be running on a device
            if (_this.platform.is('cordova')) {
                // Request permission to use location 
                _this.IBeacon.requestAlwaysAuthorization();
                _this.IBeacon.isBluetoothEnabled().then(function (blueToothStatus) {
                    if (blueToothStatus) {
                    }
                    else {
                        // Schedule a single notification
                        _this.localNotifications.schedule({
                            id: 999,
                            text: 'Please Switch on Bluetooth'
                        });
                    }
                });
                // create a new delegate and register it with the native layer
                _this.delegate = _this.IBeacon.Delegate();
                // Subscribe to some of the delegate's event handlers
                _this.delegate.didEnterRegion()
                    .subscribe(function (data) {
                    _this.events.publish('this.delegate.didEnterRegion', data);
                }, function (error) { return console.error(); });
                _this.appService.getBeacons()
                    .subscribe(function (beacons) {
                    if (beacons.statusCode == 200) {
                        var i = 0;
                        for (i = 0; i < beacons.data.length; i++) {
                            console.log(beacons.data[i]);
                            _this.region = _this.IBeacon.BeaconRegion(beacons.data[i].beaconId, beacons.data[i].uuid, beacons.data[i].major, beacons.data[i].minor);
                            _this.region.NotifyEntryStateOnDisplay = true;
                            _this.region.NotifyOnEntry = true;
                            _this.region.NotifyOnExit = true;
                            // start ranging
                            _this.IBeacon.startMonitoringForRegion(_this.region)
                                .then(function () {
                                resolve(true);
                                console.log("monitor for region");
                            }, function (error) {
                                resolve(false);
                            });
                        }
                    }
                    else {
                        console.log("check error with the api call");
                    }
                }, function (err) {
                    console.log("couldn't able to register beacons error with the api call");
                });
            }
            else {
                resolve(false);
            }
        });
        return promise;
    };
    BeaconProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_ibeacon__["a" /* IBeacon */], __WEBPACK_IMPORTED_MODULE_4__services_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], BeaconProvider);
    return BeaconProvider;
}());

//# sourceMappingURL=beacon.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(231);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_background_mode__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_ibeacon__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_roomavalibity_roomavalibity__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_roombooking_roombooking__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_app_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_service__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_beacon_beacon__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//plugins goes here





//page goes here




//app services goes here 



var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_roomavalibity_roomavalibity__["a" /* RoomavalibityPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_roombooking_roombooking__["a" /* RoombookingPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/roomavalibity/roomavalibity.module#RoomavalibityPageModule', name: 'RoomavalibityPage', segment: 'roomavalibity', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/roombooking/roombooking.module#RoombookingPageModule', name: 'RoombookingPage', segment: 'roombooking', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_roomavalibity_roomavalibity__["a" /* RoomavalibityPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_roombooking_roombooking__["a" /* RoombookingPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_ibeacon__["a" /* IBeacon */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_background_mode__["a" /* BackgroundMode */],
                __WEBPACK_IMPORTED_MODULE_14__services_app_service__["a" /* AppService */],
                __WEBPACK_IMPORTED_MODULE_15__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_storage__["a" /* NativeStorage */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_16__providers_beacon_beacon__["a" /* BeaconProvider */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__["a" /* LocalNotifications */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_background_mode__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_roomavalibity_roomavalibity__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//Plugins  Goes here


//pages goes here


var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, backgroundMode, nativeStorage) {
        var _this = this;
        this.backgroundMode = backgroundMode;
        this.nativeStorage = nativeStorage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            //Enabling BackGround mode
            _this.backgroundMode.enable();
            _this.nativeStorage.getItem('employeeDetails').then(function (employee) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_roomavalibity_roomavalibity__["a" /* RoomavalibityPage */];
            }, function (err) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
            });
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/katemullan/Booking/roombooking/src/app/app.html"*/`<ion-nav [root]="rootPage"></ion-nav>\n`/*ion-inline-end:"/Users/katemullan/Booking/roombooking/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_background_mode__["a" /* BackgroundMode */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__["a" /* NativeStorage */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppService = (function () {
    // baseUrl='http://172.29.123.218:3000/api/';
    function AppService(http) {
        this.http = http;
        this.baseUrl = 'http://34.244.184.254/api/';
        console.log('App Service Initialized...');
        this.isDev = true; // Change to false before deployment
    }
    AppService.prototype.prepEndpoint = function (ep) {
        if (this.isDev) {
            return ep;
        }
        else {
            return 'https://www.ssdfsdf.com/' + ep;
        }
    };
    AppService.prototype.getBeacons = function () {
        var ep = this.prepEndpoint(this.baseUrl + 'beacons');
        return this.http.get(ep)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.getRoomByBeaconId = function (employeeAndBeaconDetails) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint(this.baseUrl + 'getroom/');
        return this.http.post(ep, JSON.stringify(employeeAndBeaconDetails), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.bookRoom = function (roomDataAndEmployeeData) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint(this.baseUrl + 'booking');
        return this.http.post(ep, JSON.stringify(roomDataAndEmployeeData), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.getRecentBookedTimes = function (roomData) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint(this.baseUrl + 'getrecentbookings');
        return this.http.post(ep, JSON.stringify(roomData), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AppService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], AppService);
    return AppService;
}());

//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_roomavalibity_roomavalibity__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//plugins

//pages

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, authService, nativeStorage, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.nativeStorage = nativeStorage;
        this.viewCtrl = viewCtrl;
        this.employeeNo = "";
        this.showMessage = false;
        this.msgBackground = "";
        this.messageToDisplay = "";
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.authenticateEmployee = function () {
        var _this = this;
        console.log("sdfsdf");
        if (this.employeeNo != null && this.employeeNo != "") {
            this.authService.authenticateEmployee(this.employeeNo).subscribe(function (empData) {
                if (empData.statusCode == 200) {
                    if (empData.data.length != 0) {
                        _this.nativeStorage.setItem('employeeDetails', { employeeNo: empData.data[0].employeeNo })
                            .then(function () {
                            console.log('Stored item!');
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_roomavalibity_roomavalibity__["a" /* RoomavalibityPage */]);
                        }, function (error) { return console.error('Error storing item', error); });
                    }
                    else {
                        _this.showMessage = true;
                        _this.messageToDisplay = "Employee Not Found";
                        _this.msgBackground = '#ff5c33';
                    }
                }
                else {
                    console.log("error with the api call");
                }
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.showMessage = true;
            this.messageToDisplay = "Please enter your employee number";
            this.msgBackground = '#ff5c33';
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/katemullan/Booking/roombooking/src/pages/login/login.html"*/`	<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n	\n<ion-content no-padding>\n	<ion-grid >\n		<ion-row>\n			<ion-col>\n				<p *ngIf="showMessage&&msgBackground==\'#ff5c33\'"  class="errorMessageCss orangeBackground">{{messageToDisplay}}</p>\n				<p *ngIf="showMessage&&msgBackground==\'green\'"  class="errorMessageCss greenBackground">{{messageToDisplay}}</p>\n				<ion-item>\n					<ion-label color="primary"  floating>Employee No</ion-label>\n					<ion-input value="" [(ngModel)]="employeeNo"></ion-input>\n				</ion-item>\n				<div class="buttonContent">\n					<button ion-button color="primary" (tap)="authenticateEmployee()">Login</button>\n				</div>\n			</ion-col>\n		</ion-row>\n	</ion-grid>\n</ion-content>\n`/*ion-inline-end:"/Users/katemullan/Booking/roombooking/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomavalibityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_beacon_beacon__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_app_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_roombooking_roombooking__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//plugins goes here

//Providers  Goes Here

//app services goes here

//pages goes here


/**
 * Generated class for the RoomavalibityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RoomavalibityPage = (function () {
    function RoomavalibityPage(navCtrl, navParams, beaconProvider, events, zone, appService, platform, nativeStorage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.beaconProvider = beaconProvider;
        this.events = events;
        this.zone = zone;
        this.appService = appService;
        this.platform = platform;
        this.nativeStorage = nativeStorage;
        this.roomData = [];
        this.logOutStatus = false;
        this.platform.ready().then(function () {
            _this.nativeStorage.getItem('employeeDetails').then(function (employeeData) {
                _this.employeeNo = employeeData.employeeNo;
                //Code is for Initialize the Beacons
                _this.beaconProvider.initialise().then(function (isInitialised) {
                    if (isInitialised) {
                        _this.listenToBeaconEvents();
                    }
                });
            });
        });
    }
    RoomavalibityPage.prototype.showLogout = function () {
        if (this.logOutStatus) {
            this.logOutStatus = false;
        }
        else {
            this.logOutStatus = true;
        }
    };
    RoomavalibityPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RoomavalibityPage');
    };
    RoomavalibityPage.prototype.listenToBeaconEvents = function () {
        var _this = this;
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
        this.events.subscribe('this.delegate.didEnterRegion', function (data) {
            var beaconAndEmployeeData = {
                employeeNo: _this.employeeNo,
                beaconId: data.region.identifier
            };
            _this.appService.getRoomByBeaconId(beaconAndEmployeeData).subscribe(function (data) {
                if (data.statusCode == 200) {
                    var roomData = {
                        _id: data.data._id,
                        image: data.data.image,
                        location: data.data.location,
                        name: data.data.name,
                        status: data.status,
                        avalibleTime: data.avalibleTime
                    };
                    if (_this.roomData.length == 0) {
                        _this.zone.run(function () {
                            _this.roomData.push(roomData);
                        });
                        console.log(_this.roomData);
                    }
                    else {
                        _this.zone.run(function () {
                            var roomAlreadyPresent = false;
                            var i = 0;
                            for (i = 0; i < _this.roomData.length; i++) {
                                if (_this.roomData[i]._id === roomData._id) {
                                    roomAlreadyPresent = true;
                                }
                            }
                            if (!roomAlreadyPresent) {
                                _this.roomData.unshift(roomData);
                            }
                        });
                    }
                }
                else {
                    console.log("Issue when fetching user data");
                }
            }, function (err) {
            });
        });
    };
    RoomavalibityPage.prototype.bookRoom = function (roomId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_roombooking_roombooking__["a" /* RoombookingPage */], {
            roomId: roomId
        });
    };
    RoomavalibityPage.prototype.logOut = function () {
        var _this = this;
        this.nativeStorage.clear().then(function (clearred) {
            console.log(clearred);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
        }, function (err) {
            console.log("Error with native storage");
        });
    };
    RoomavalibityPage.prototype.closeLogout = function () {
        this.logOutStatus = false;
    };
    RoomavalibityPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.logOutStatus = false;
        if (this.roomData.length > 0) {
            var roomDataObject = {
                roomData: this.roomData
            };
            this.appService.getRecentBookedTimes(roomDataObject).subscribe(function (data) {
                if (data.statusCode == 200) {
                    _this.roomData = [];
                    _this.roomData = data.data;
                    refresher.complete();
                }
                else {
                    console.log("Error when fetching new data");
                    refresher.complete();
                }
            }, function (err) {
                console.log("Error with server");
            });
        }
        else {
            refresher.complete();
        }
    };
    RoomavalibityPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-roomavalibity',template:/*ion-inline-start:"/Users/katemullan/Booking/roombooking/src/pages/roomavalibity/roomavalibity.html"*/` <!--\n  Generated template for the RoomavalibityPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header >\n	<ion-navbar [hideBackButton]="true">\n		<ion-buttons left>\n			<button ion-button icon-only class="personIcon" (click)="showLogout()">\n				<ion-icon name="person"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>\n			Room Avalibity\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n\n<ion-content no-padding>\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n		<ion-refresher-content\n		pullingIcon="arrow-dropdown"\n		pullingText="Pull to refresh"\n		refreshingSpinner="circles"\n		refreshingText="Refreshing...">\n	</ion-refresher-content>\n</ion-refresher>\n<ion-grid no-padding>\n	<ion-row no-padding>\n		<ion-col no-padding>\n			<div  class="logOutCss" ion-fixed *ngIf="logOutStatus">\n				<div class="triangle"></div>\n				<div class="employeeId">{{employeeNo}}</div>\n				<div class="logOutButton">\n					<button ion-button color="primary" (click)="logOut()">Logout</button>\n				</div>\n			</div>\n		</ion-col>\n	</ion-row>\n</ion-grid>\n<ion-grid no-padding (tap)="closeLogout()">\n	<ion-row no-padding *ngFor=" let eachRoom of roomData">\n		<ion-col col-4>\n			<div class="image" [ngStyle]="{\'background-image\': \'url(\' + eachRoom.image + \')\'}">\n\n			</div>\n		</ion-col>\n		<ion-col col-8>\n			<div class="rightSidePart">\n				<div class="avalibleUntilText">{{eachRoom.avalibleTime}}</div>\n				<button ion-button color="primary" (click)="bookRoom(eachRoom._id)" class="bookingButton" *ngIf="eachRoom.status===\'avalible\'">Book</button>\n				<button ion-button color="gray" class="bookingButton" *ngIf="eachRoom.status===\'unavalible\'">Book</button>\n			</div>\n		</ion-col>\n	</ion-row>\n</ion-grid>\n</ion-content>\n`/*ion-inline-end:"/Users/katemullan/Booking/roombooking/src/pages/roomavalibity/roomavalibity.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_beacon_beacon__["a" /* BeaconProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_4__services_app_service__["a" /* AppService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */]])
    ], RoomavalibityPage);
    return RoomavalibityPage;
}());

//# sourceMappingURL=roomavalibity.js.map

/***/ })

},[207]);
//# sourceMappingURL=main.js.map