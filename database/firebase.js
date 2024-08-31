const admin = require("firebase-admin")
let serviceAccount;

try {
    serviceAccount = require("../straptude-firebase-adminsdk.json")
} catch (error) {
    console.error('Failed to load the module:', error);
}

require('dotenv').config()

// if (serviceAccount) {
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})
// }
// else {
//     console.log("here")
//     admin.initializeApp(
//         options = {
//             "projectId": process.env.FIREBASE_PROJECT_ID
//         }
//     )
// }
module.exports =  admin 