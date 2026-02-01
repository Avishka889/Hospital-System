// Hardcoded Admin Credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Admin123';

// @desc    Admin Login
// @route   POST /api/admin/login
exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            res.json({
                message: 'Admin login successful',
                admin: {
                    username: ADMIN_USERNAME,
                    role: 'admin'
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid admin credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
