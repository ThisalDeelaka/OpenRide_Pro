const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password, accountType } = req.body; // accountType will be 'user' or 'bikeOwner'
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Assign role based on accountType
    const role = accountType === 'bikeOwner' ? 'bikeOwner' : 'user';

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    
    req.session.userId = newUser._id; // create session
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Return user details (excluding password)
    const userDetails = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    
    req.session.userId = user._id; // create session
    res.json({ message: 'Login successful', user: userDetails });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// User logout
exports.logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
};
