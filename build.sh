#!/bin/bash

# add crosswalk
ionic plugin add cordova-plugin-crosswalk-webview

# build android app with crosswalk
ionic build android --release

# copy android crosswalk apks to build folder
cp platforms/android/build/outputs/apk/android-x86-release.apk bin/android-pre5-x86.apk
cp platforms/android/build/outputs/apk/android-armv7-release.apk bin/android-pre5-armv7.apk

# rm crosswalk
ionic plugin rm cordova-plugin-crosswalk-webview

# build android app without crosswalk
ionic build android --release -- --minSdkVersion=21

# copy android non-crosswalk apks to build folder
cp platforms/android/build/outputs/apk/android-release.apk bin/android-5.apk