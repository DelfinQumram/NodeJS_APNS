var express = require('express')
const PushNotifications = new require('node-pushnotifications');
const apn = require('apn');
 
var app = express()
 
app.listen(3000)

//------------------------------------------------------------------------------
// Configure push module
//------------------------------------------------------------------------------
const settings = {
    // gcm: {
    //     id: null,
    // },
    apn: {
        // token: {
        //     key: './certs/key.p8', // optionally: fs.readFileSync('./certs/key.p8') 
        //     keyId: 'ABCD',
        //     teamId: 'EFGH',
        // },
        // cert: './certs/devCert.pem',
        // key: './certs/devKey.pem',
        passphrase :'qumram',
        production : false
    }
};

// const push = new PushNotifications(settings);

    const options = {
        cert: './certs/devCert.pem',
        key: './certs/devKey.pem',
        passphrase :'qumram',
        production : false
    };
    const apnProvider = new apn.Provider(options);

//------------------------------------------------------------------------------
// Configure push Notification
//------------------------------------------------------------------------------

// push data
const data = {
    title: 'New push notification', // REQUIRED 
    body: 'Powered by AppFeel', // REQUIRED 
    custom: {
        sender: 'AppFeel',
    },
    priority: 'high', // gcm, apn. Supported values are 'high' or 'normal' (gcm). Will be translated to 10 and 5 for apn. Defaults to 'high' 
    collapseKey: '', // gcm for android, used as collapseId in apn 
    contentAvailable: true, // gcm for android 
    delayWhileIdle: true, // gcm for android 
    restrictedPackageName: '', // gcm for android 
    dryRun: false, // gcm for android 
    icon: '', // gcm for android 
    tag: '', // gcm for android 
    color: '', // gcm for android 
    clickAction: '', // gcm for android. In ios, category will be used if not supplied 
    locKey: '', // gcm, apn 
    bodyLocArgs: '', // gcm, apn 
    titleLocKey: '', // gcm, apn 
    titleLocArgs: '', // gcm, apn 
    retries: 1, // gcm, apn 
    encoding: '', // apn 
    badge: 2, // gcm for ios, apn 
    // alert: '', // It is also accepted a text message in alert 
    titleLocKey: '', // apn and gcm for ios 
    titleLocArgs: '', // apn and gcm for ios 
    launchImage: '', // apn and gcm for ios 
    action: '', // apn and gcm for ios 
    topic: '', // apn and gcm for ios 
    category: '', // apn and gcm for ios 
    contentAvailable: '', // apn and gcm for ios 
    urlArgs: '', // apn and gcm for ios 
    truncateAtWordEnd: true, // apn and gcm for ios 
    mutableContent: 0, // apn 
    expiry: Math.floor(Date.now() / 1000) + 28 * 86400, // seconds 
};

// Push destination devices
// const registrationIds = [];
// registrationIds.push('f43abe6fb70545a0d80b88e3cf1329ec7f42b35a');
// registrationIds.push('801441d435155c0c869b0c03192d6325dc05020d');

let deviceToken = "2eac69a08879fe893475e83860b339b4c8af1aa5fd52cf613b709d5a270d22fa";

//------------------------------------------------------------------------------
// Send push!!!
//------------------------------------------------------------------------------
// push.send(registrationIds, data, (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//       const answer = result[0];
//       if ( answer.failure >= 0 ){
//         console.log(answer.message);        
//       } else {
//         console.log("Lo logre!!!!");
//       }
//     }
// });

var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 1;
note.sound = "ping.aiff";
note.alert = "This is a new message from NodeJS";
note.payload = {'messageFrom': 'John Appleseed'};
note.topic = "com.qumram.whatsappRecordStatus";

apnProvider.send(note, deviceToken).then( (result) => {
  // see documentation for an explanation of result    
    if ( result.failed.length > 0 ){
        const failed = result.failed[0];
        console.log(failed);
    } else {
        console.log("Lo logre!!!!");
    }
});

// // Or you could use it as a promise: 
// push.send(registrationIds, data)
//     .then((results) => { ... })
//     .catch((err) => { ... });

// Config get 
app.get('/settings', function(req, res) {
  res.json({"push settings": settings})
})