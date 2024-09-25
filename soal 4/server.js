const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const pool = require('./db'); // Menyesuaikan dengan path db kamu
const upload = require('./midelware/multer'); // Menyesuaikan dengan path middleware kamu
const path = require('path');
const app = express();
const checksession = require('./midelware/auth')
const flash = require('connect-flash');

// Set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Untuk file static, jika diperlukan

// Session configuration
app.use(session({
    name: "My_session",
    secret: "A7Ve6dJ3y6",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 172800000
    }
  }));

//flash 
app.use(flash());

//set up flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.notfound_msg = req.flash('notfound_msg');
    next();
  });


// Set up view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Home Route
app.get('/', (req, res) => {
  res.render('login');
});

// Register User
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
  
    // Cek apakah ada kolom yang kosong
    if (!email || !username || !password) {
      req.flash('error_msg', 'Semua kolom harus diisi');
      return res.redirect('/register');
    }
  
    try {
      // Cek apakah email sudah ada di database
      const userExists = await pool.query('SELECT * FROM user_tbs WHERE email = $1', [email]);
      
      
      if (userExists.rows.length > 0) {
        // Jika user dengan email yang sama sudah ada
        req.flash('notfound_msg', 'Akun dengan email ini sudah terdaftar');
        return res.redirect('/register');
        
    }
    
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Masukkan user baru ke database
      await pool.query(
          'INSERT INTO user_tbs (email, username, password) VALUES ($1, $2, $3)',
          [email, username, hashedPassword]
        );
        
      req.flash('success_msg', 'Registrasi berhasil. Silakan login.');
      res.redirect('/login');
    } catch (err) {
        req.flash('error_msg', 'Terjadi kesalahan saat registrasi');
        res.redirect('/register');
    }
  });
  
  

// Login User
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(`SELECT * FROM user_tbs WHERE email = $1`, [email]);
    if (user.rows.length > 0) {
      const match = await bcrypt.compare(password, user.rows[0].password);
      console.log(match);
      if (match) {
        req.session.userId = user.rows[0].id;
        req.flash('success_msg', 'Error: user tidak cocok');
        res.redirect('/dashboard');
      } else {
        req.flash('error_msg', 'Error: password tidak cocok');
        res.redirect('/login')
      }
    } else {
        req.flash('notfound_msg', 'Error: user tidak cocok');
        res.redirect('/login')
    }
  } catch (err) {
    res.send('Error: ' + err.message);
  }
  
  
});

// Logout User
app.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/login');
      }
    });
  }
});

// Dashboard Route
app.get('/dashboard',checksession, async (req, res) => {
  const profinsi = await pool.query(`SELECT * FROM profinsi_tbs`);
  const kabupaten = await pool.query(`SELECT * FROM kabupaten_tbs`);
  res.render('dashboard', { profinsi: profinsi.rows, kabupaten: kabupaten.rows });
});

// Kabupaten Routes
app.get('/add-kabupaten',checksession, async (req, res) => {
  const profinsi = await pool.query(`SELECT * FROM profinsi_tbs`);
  res.render('add-kabupaten', { profinsi: profinsi.rows });
});

app.post('/add-kabupaten',checksession, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.render('add-kabupaten', { msg: err });
    } else {
      const { nama, provinsi_id, diresmikan } = req.body;
      const image = `/uploads/${req.file.filename}`;

      try {
        await pool.query(
          `INSERT INTO kabupaten_tbs (nama, provinsi_id, diresmikan, image) VALUES ($1, $2, $3, $4)`,
          [nama, provinsi_id, diresmikan, image]
        );
        res.redirect('/dashboard');
      } catch (err) {
        res.send('Error: ' + err.message);
      }
    }
  });
});

app.get('/edit-kabupaten/:id',checksession, async (req, res) => {
  const id = req.params.id;
  const kabupaten = await pool.query(`SELECT * FROM kabupaten_tbs WHERE id = $1`, [id]);
  res.render('edit-kabupaten', { kabupaten: kabupaten.rows[0] });
});

app.post('/edit-kabupaten/:id',checksession, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.render('edit-kabupaten', { msg: err });
    } else {
      const { nama, provinsi_id, diresmikan } = req.body;
      const id = req.params.id;
      const image = req.file ? `/uploads/${req.file.filename}` : req.body.oldImage;

      try {
        await pool.query(
          `UPDATE kabupaten_tbs SET nama = $1, provinsi_id = $2, diresmikan = $3, image = $4 WHERE id = $5`,
          [nama, provinsi_id, diresmikan, image, id]
        );
        res.redirect('/dashboard');
      } catch (err) {
        res.send('Error: ' + err.message);
      }
    }
  });
});

app.get('/delete-kabupaten/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query(`DELETE FROM kabupaten_tbs WHERE id = $1`, [id]);
    res.redirect('/dashboard');
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});

// Province (Profinsi) Routes
app.get('/add-profinsi',checksession, (req, res) => {
  res.render('add-profinsi');
});

app.post('/add-profinsi',checksession, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.render('add-profinsi', { msg: err });
    } else {
      const { nama, diresmikan, pulau } = req.body;
      const image = `/uploads/${req.file.filename}`;

      try {
        await pool.query(
          `INSERT INTO profinsi_tbs (user_id, nama, diresmikan, pulau, image) VALUES ($1, $2, $3, $4, $5)`,
          [req.session.userId, nama, diresmikan, pulau, image]
        );
        res.redirect('/dashboard');
      } catch (err) {
        res.send('Error: ' + err.message);
      }
    }
  });
});

app.get('/edit-profinsi/:id',checksession, async (req, res) => {
  const id = req.params.id;
  const profinsi = await pool.query(`SELECT * FROM profinsi_tbs WHERE id = $1`, [id]);
  res.render('edit-profinsi', { profinsi: profinsi.rows[0] });
});

app.post('/edit-profinsi/:id', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.render('edit-profinsi', { msg: err });
    } else {
      const { nama, diresmikan, pulau } = req.body;
      const id = req.params.id;
      const image = req.file ? `/uploads/${req.file.filename}` : req.body.oldImage;

      try {
        await pool.query(
          `UPDATE profinsi_tbs SET nama = $1, diresmikan = $2, pulau = $3, image = $4 WHERE id = $5`,
          [nama, diresmikan, pulau, image, id]
        );
        res.redirect('/dashboard');
      } catch (err) {
        res.send('Error: ' + err.message);
      }
    }
  });
});

app.get('/delete-profinsi/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query(`DELETE FROM profinsi_tbs WHERE id = $1`, [id]);
    res.redirect('/dashboard');
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});

app.get('/detail-profinsi/:id',checksession, async (req, res) => {
  const id = req.params.id;
  try {
    const profinsi = await pool.query(`SELECT * FROM profinsi_tbs WHERE id = $1`, [id]);

    if (profinsi.rows.length > 0) {
      res.render('detail-profinsi', { profinsi: profinsi.rows[0] });
    } else {
      res.send('Provinsi tidak ditemukan');
    }
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
