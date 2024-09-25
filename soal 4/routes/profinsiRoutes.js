// const express = require('express');
// const pool = require('../db');
// const upload = require('../midelware/multer');
// const router = express.Router();

// // Dashboard
// router.get('/dashboard', async (req, res) => {
//     const profinsi = await pool.query(`SELECT * FROM profinsi_tbs`);
//     const kabupaten = await pool.query(`SELECT * FROM kabupaten_tbs`);
//     res.render('dashboard', { profinsi: profinsi.rows, kabupaten: kabupaten.rows });
// });

// // Add Province
// router.get('/add-profinsi', (req, res) => {
//     res.render('add-profinsi');
// });

// router.post('/add-profinsi', (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             res.render('add-profinsi', { msg: err });
//         } else {
//             const { nama, diresmikan, pulau } = req.body;
//             const image = `/uploads/${req.file.filename}`;

//             try {
//                 await pool.query(
//                     `INSERT INTO profinsi_tbs (user_id, nama, diresmikan, pulau, image) VALUES ($1, $2, $3, $4, $5)`,
//                     [req.session.userId, nama, diresmikan, pulau, image]
//                 );
//                 res.redirect('/dashboard');
//             } catch (err) {
//                 res.send('Error: ' + err.message);
//             }
//         }
//     });
// });

// // Edit Province
// router.get('/edit-profinsi/:id', async (req, res) => {
//     const id = req.params.id;
//     const profinsi = await pool.query(`SELECT * FROM profinsi_tbs WHERE id = $1`, [id]);
//     res.render('edit-profinsi', { profinsi: profinsi.rows[0] });
// });

// router.post('/edit-profinsi/:id', (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             res.render('edit-profinsi', { msg: err });
//         } else {
//             const { nama, diresmikan, pulau } = req.body;
//             const id = req.params.id;
//             const image = req.file ? `/uploads/${req.file.filename}` : req.body.oldImage;

//             try {
//                 await pool.query(
//                     `UPDATE profinsi_tbs SET nama = $1, diresmikan = $2, pulau = $3, image = $4 WHERE id = $5`,
//                     [nama, diresmikan, pulau, image, id]
//                 );
//                 res.redirect('/dashboard');
//             } catch (err) {
//                 res.send('Error: ' + err.message);
//             }
//         }
//     });
// });

// // Delete Province
// router.get('/delete-profinsi/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         await pool.query(`DELETE FROM profinsi_tbs WHERE id = $1`, [id]);
//         res.redirect('/dashboard');
//     } catch (err) {
//         res.send('Error: ' + err.message);
//     }
// });


// // Detail Province
// router.get('/detail-profinsi/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         const profinsi = await pool.query(`SELECT * FROM profinsi_tbs WHERE id = $1`, [id]);
        
//         if (profinsi.rows.length > 0) {
//             res.render('detail-profinsi', { profinsi: profinsi.rows[0] });
//         } else {
//             res.send('Provinsi tidak ditemukan');
//         }
//     } catch (err) {
//         res.send('Error: ' + err.message);
//     }
// });



// module.exports = router;
