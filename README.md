## Description
__CTA Tracker__ is a multi-platform mobile application for the Chicago Transit Authority bus and train tracking. 
This app utilizes two microservices – [CTA Train Tracker Service](https://github.com/mDemianchuk/cta-train-tracker-service) 
and [CTA Bus Tracker Service](https://github.com/mDemianchuk/cta-bus-tracker-service) that are gateways for 
the official CTA [Train](https://www.transitchicago.com/developers/traintracker/) and [Bus](https://www.transitchicago.com/developers/bustracker/) Tracker APIs. 
The user can see arrival times for any bus or train stop and save it to their Favorite Stops to have easy access to it.

## Demo
![iOS client demo](https://raw.githubusercontent.com/mDemianchuk/cta-tracker/fix/mdemianchukGif/img/ios-demo.gif)

## Requirements
- Node.js
- [iOS requirements](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/#installing-the-requirements)
    * Xcode
    * Deployment tools
- [Android requirements](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#installing-the-requirements)
    * JDK
    * Gradle
    * Android SDK

## Usage
1. Add the [platforms](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#add-platforms) that you want to target your app
    ```$xslt
    $ cordova platform add ios
    $ cordova platform add android
    ```

    To check your current set of platforms:
    ```$xslt
    $ cordova platform ls
    ```

2. Install [pre-requisites](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#install-pre-requisites-for-building) for building

    To check if you satisfy requirements for building the platform:
    ```$xslt
    $ cordova requirements
    ```

3. Run the app
    ```$xslt
    npm start
    ```
