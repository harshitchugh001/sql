const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const saltRounds = 10;

exports.signup = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    console.log(req.body);
  
    try {

      console.log("hhhhh");
    //   console.log(await db.query(` Select * from users where email = "harshitchugh001@gmail.com"`, userEmail));
    //   const existingUser = await db.query(`Select * from users where email = "harshitchugh001@gmail.com"`, userEmail);
    //   console.log(existingUser);
    //   if (existingUser.rows.length > 0) {
    //     return res.status(400).json({ error: 'Email is already registered.' });
    //   }
  
      console.log(userEmail)
  
     
      const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
  
     
      const userid = Math.floor(10000000 + Math.random() * 90000000);

      console.log(userName,userEmail,userPassword,userid)
  
      
      await db.query(`INSERT INTO Users (username, email, password, userid) VALUES ($1, $2, $3, $4)`, userName, userEmail, hashedPassword, userid);
  
      return res.status(201).json({ message: 'Signup successful.' });
    } catch (error) {
      console.error('SIGNUP ERROR:', error);
      return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
  };


exports.signin = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  try {
    // Find user by email
    const user = await db.query('SELECT * FROM Users WHERE email = $1', [userEmail]);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'User with that email does not exist. Please sign up.' });
    }

    // Compare password
    const passwordMatch = bcrypt.compareSync(userPassword, user.rows[0].password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Email and password do not match.' });
    }

    // Create and send JWT token
    const payload = {
      id: user.rows[0].id,
      userId: user.rows[0].userid,
      name: user.rows[0].username,
      email: user.rows[0].email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.json({
      token,
      user: payload,
    });
  } catch (error) {
    console.error('SIGNIN ERROR:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};
