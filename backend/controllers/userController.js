const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/users/register
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, telephone, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            dateOfBirth,
            telephone,
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    email: user.email
                }
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`Login attempt failed: No user found with email ${email}`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log(`User found: ${user.email}. Checking password...`);
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            console.log('Password matched! Login successful.');
            res.json({
                message: 'Login successful',
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    email: user.email
                }
            });
        } else {
            console.log('Password did not match.');
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile/:id
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.telephone = req.body.telephone || user.telephone;
        user.email = req.body.email || user.email;
        user.profilePic = req.body.profilePic || user.profilePic;

        const updatedUser = await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                telephone: updatedUser.telephone,
                email: updatedUser.email,
                profilePic: updatedUser.profilePic
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
