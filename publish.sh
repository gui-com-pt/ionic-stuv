#!/bin/sh

cordova build --release android

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore viseu-app-key.keystre /home/dk/work/ionic-stuv/platforms/android/build/outputs/apk/android-release-unsigned.apk viseu