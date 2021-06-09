# ItunesClone
Simple music player using react-native and iTunes API.

# Supported Devices
This project support Android & IOS apps.
min Android version = 21
min IOS version = 10

# Supported Feature
1. Search music/song by artist
2. Play Music
3. Pause Music
4. Seek Music
5. Backward Music
6. Forward Music

# Requirement to build
Before run or build this project, if you have't setup react-native environtment, kindly check this react-native documentation https://reactnative.dev/docs/environment-setup

# How to build / run app
- You must setup react-native environtment
- do ```yarn install``` or ```npm install```

A. Android
- make sure emulator is active or your android device is connected to the PC (make sure that your device in the same network)
- run command ```npx react-native run-android``` (for debug) or ```npx react-native run-android --variant=release``` (for release)
- wait until all process finish

OR you can build release APK and install to your android devices manually
- run ```cd android && ./gradlew assembleRelease```
- wait until process finish, then you can find the apk under ```android/app/build/outputs/apk/release```

B. IOS
- go to ```ios``` directory of this project from your terminal
- run ```pod install```
- go to ```ios``` directory of this project from finder
- double click on ```iTunesClone.xcworkspace```
- once it opened, then select IOS simulator, next to play button. 
- press play button and wait until process finish
