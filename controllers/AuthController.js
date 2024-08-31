const admin = require('../database/firebase');
const User = require('../schemas/userModel');

class AuthController {
    async authenticateUser(req, res) {
        const { id_token } = req.body;
        if (!id_token) {
            return res.status(400).json({ message: 'ID token is required' });
        }

        try {
            const decodedToken = await admin.auth().verifyIdToken(id_token);
            const { uid, name, email, picture } = decodedToken;
            console.log(uid, name, email, picture);
            const user = await User.findOneAndUpdate(
                { userId: uid },
                { userName: name, userEmailId: email, userProfilePicture: picture },
                { new: true, upsert: true }
            ).catch(err => console.error("Update error:", err));


            res.status(200).json({ status: 200, data: { userId: uid, token: id_token }, message: 'User authenticated successfully' });
        } catch (error) {
            console.log(error); // More detailed logging of the error
            res.status(500).json({ message: 'Error authenticating user' });
        }
    }
}

module.exports = new AuthController();
