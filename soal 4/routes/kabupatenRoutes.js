// const express = require('express');
// const pool = require('../db');
// const upload = require('../midelware/multer');
// const router = express.Router();

// // Add Kabupaten
// router.get('/add-kabupaten', async (req, res) => {
//     const profinsi = await pool.query(`SELECT * FROM profinsi_tbs`);
//     res.render('add-kabupaten', { profinsi: profinsi.rows });
// });

// router.post('/add-kabupaten', (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             res.render('add-kabupaten', { msg: err });
//         } else {
//             const { nama, provinsi_id, diresmikan } = req.body;
//             const image = `/uploads/${req.file.filename}`;

//             try {
//                 await pool.query(
//                     `INSERT INTO kabupaten_tbs (nama, provinsi_id, diresmikan, image) VALUES ($1, $2, $3, $4)`,
//                     [nama, provinsi_id, diresmikan, image]
//                 );
//                 res.redirect('/dashboard');
//             } catch (err) {
//                 res.send('Error: ' + err.message);
//             }
//         }
//     });
// });

// // Edit Kabupaten
// router.get('/edit-kabupaten/:id', async (req, res) => {
//     const id = req.params.id;
//     const kabupaten = await pool.query(`SELECT * FROM kabupaten_tbs WHERE id = $1`, [id]);
//     res.render('edit-kabupaten', { kabupaten: kabupaten.rows[0]});
// });

// router.post('/edit-kabupaten/:id', (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             res.render('edit-kabupaten', { msg: err });
//         } else {
//             const { nama, provinsi_id, diresmikan } = req.body;
//             const id = req.params.id;
//             const image = req.file ? `/uploads/${req.file.filename}` : req.body.oldImage;

//             try {
//                 await pool.query(
//                     `UPDATE kabupaten_tbs SET nama = $1, provinsi_id = $2, diresmikan = $3, image = $4 WHERE id = $5`,
//                     [nama, provinsi_id, diresmikan, image, id]
//                 );
//                 res.redirect('/dashboard');
//             } catch (err) {
//                 res.send('Error: ' + err.message);
//             }
//         }
//     });
// });

// // Delete Kabupaten
// router.get('/delete-kabupaten/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         await pool.query(`DELETE FROM kabupaten_tbs WHERE id = $1`, [id]);
//         res.redirect('/dashboard');
//     } catch (err) {
//         res.send('Error: ' + err.message);
//     }
// });


// module.exports = router;
