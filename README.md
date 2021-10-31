## Description
__CTA Tracker__ is a multi-platform mobile application for the Chicago Transit Authority bus and train tracking. 
The backend for this app is implemented in two microservices – [CTA Train Tracker Service](https://github.com/mDemianchuk/cta-train-tracker-service) 
and [CTA Bus Tracker Service](https://github.com/mDemianchuk/cta-bus-tracker-service) that utilize official CTA [Train Tracker](https://www.transitchicago.com/developers/traintracker/) and [Bus Tracker](https://www.transitchicago.com/developers/bustracker/) APIs.
Users can get arrival times for any bus or train stop and conveniently access their favorite stops from the Favorite Stops tab.

## Demo
![iOS client demo](https://raw.githubusercontent.com/mDemianchuk/cta-tracker/master/img/ios-demo.gif)

## Requirements
- Node.js
- Cordova
- [iOS requirements](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/#installing-the-requirements)
    * Xcode
    * Deployment tools
- [Android requirements](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#installing-the-requirements)
    * JDK
    * Gradle
    * Android SDK

## Usage
1. Install project dependencies
   ```$xslt
   $ npm install
   ```
2. Add the [platforms](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#add-platforms) that you want to target your app
    ```$xslt
    $ cordova platform add ios
    $ cordova platform add android
    ```

    To check your current set of platforms:
    ```$xslt
    $ cordova platform ls
    ```

3. Install [pre-requisites](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#install-pre-requisites-for-building) for building

    To check if you satisfy requirements for building the platform:
    ```$xslt
    $ cordova requirements
    ```

4. Run the app
    ```$xslt
    $ npm start
    ```
