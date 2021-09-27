import PushNotification from 'react-native-push-notification';

export default ({ id, culture, type }) => {
    const defaultOptions = {
        /* Android Only Properties */
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        color: "red", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: 'some_tag', // (optional) add tag to message
        group: "group", // (optional) add group to message
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: "high", // (optional) set notification priority, default: high
        visibility: "public", // (optional) set notification visibility, default: private
        importance: "high", // (optional) set notification importance, default: high
        /* iOS and Android properties */
        message: "Irrigação Finalizada", // (required)
        playSound: true, // (optional) default: true
        soundName: 'just_saying.mp3', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        //number: '1', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        //repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        actions: '["Ok"]',  // (Android only) See the doc for notification actions to know more
    };
    const options = {
        ...defaultOptions,
        title: `Finalizada ${id}`, // (optional)
        ticker: `Finalizada ${id}`, // (optional)
        bigText: `Irrigação finalizada para ${id}, cultura ${culture}${type !== '' ? (', tipo ' + type) : ''}.`, // (optional) default: "message" prop
        subText: `${culture}`, // (optional) default: none
    }

    return PushNotification.localNotification(options);
}