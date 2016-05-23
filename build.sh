#!/bin/bash

# add crosswalk
ionic plugin add cordova-plugin-crosswalk-webview

# build android app with crosswalk
ionic build --release android

# copy android crosswalk apks to build folder
cp platforms/android/build/outputs/apk/android-x86-release.apk ~/Desktop/android-pre5-x86.apk
cp platforms/android/build/outputs/apk/android-armv7-release.apk ~/Desktop/android-pre5-armv7.apk

# rm crosswalk
ionic plugin rm cordova-plugin-crosswalk-webview

# build android app without crosswalk
ionic build --release android -- --minSdkVersion=21

# copy android non-crosswalk apks to build folder
cp platforms/android/build/outputs/apk/android-release.apk ~/Desktop/android-5.apk