const admin = require("firebase-admin")
let serviceAccount;



require('dotenv').config()


try {
    serviceAccount = JSON.parse(process.env.FIREBASE_JSON)
} catch (error) {
    console.error('Failed to load the module:', error);
}






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
module.exports = admin 