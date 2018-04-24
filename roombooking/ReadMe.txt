Read Me

Access Server-Side code: 

cd roombooking
sudo ssh -i "key.pem.txt" ubuntu@ec2-34-244-184-254.eu-west-1.compute.amazonaws.com
cd server/Booking/server/src

Running Ionic Application: 

npm install -g ionic cordova

after installing:

//for adding platform 
cordova platform add android

//for running the app
ionic cordova run android 

//for building apk
$ ionic cordova build android