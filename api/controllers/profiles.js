const User = require('../models/user'); 

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};