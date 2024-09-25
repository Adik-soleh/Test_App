// const express = require('express');
// const bcrypt = require('bcryptjs');
// const pool = require('../db');
// const router = express.Router();

// // Home Route
// router.get('/', (req, res) => {
//     res.render('login');
// });

// // Register User
// router.get('/register', (req, res) => {
//     res.render('register');
// });

// router.post('/register', async (req, res) => {
//     const { email, username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     try {
//         await pool.query(
//             `INSERT INTO user_tbs (email, username, password) VALUES ($1, $2, $3)`,
//             [email, username, hashedPassword]
//         );
//         res.redirect('/login');
//     } catch (err) {
//         res.send('Error: ' + err.message);
//     }
// });

// // Login User
// router.get('/login', (req, res) => {
//     res.render('login');
// });

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await pool.query(`SELECT * FROM user_tbs WHERE email = $1`, [email]);
//         if (user.rows.length > 0) {
//             const match = await bcrypt.compare(password, user.rows[0].password);
//             if (match) {
//                 req.session.userId = user.rows[0].id;
//                 res.redirect('/dashboard');
//             } else {
//                 res.send('Error: tidak');
//             }
//         } else {
//             res.send('User not found');
//         }
//     } catch (err) {
//         res.send('Error: ' + err.message);
//     }
// });


// // Delete session
// router.get('/logout', function (req, res, next) {
//     if (req.session) {
//       req.session.destroy(function (err) {
//         if (err) {
//           return next(err);
//         } else {
//           return res.redirect('/login');
//         }
//       });
//     }
//   });
  

// 
