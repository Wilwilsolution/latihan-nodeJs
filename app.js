const express = require('express');
const app = express();
const port = 3000; // Port yang akan digunakan, Anda dapat menggantinya sesuai kebutuhan

app.get('/', (req, res) => {
  res.send('Hello World');
});
// Array of objects
const data = [
  { id: 1, name: 'Object 1' },
  { id: 2, name: 'Object 2' },
  { id: 3, name: 'Object 3' }
];

app.get('/get-data', (req, res) => {
  res.json(data);
  console.log(data);
});

app.get('/buat-file', (req, res) => {
  const fileContent = 'Hallo Nama Saya Wildan Chaerul Afif '; // Isi file yang akan dibuat

  // Tulis isi file ke dalam file yang bernama 'example.txt'
  fs.writeFile('info.txt', fileContent, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Gagal membuat file.');
    } else {
      res.send('File berhasil dibuat dengan isi: ' + fileContent);
    }
  });
});
//hitung bilangan random
app.get('/random-number', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 1000); // Menghasilkan bilangan acak antara 0 dan 99
  res.json({ randomNumber });
});
//konversi teks
app.get('/uppercase/:teks', (req, res) => {
  const teks = req.params.teks;
  const uppercaseText = teks.toUpperCase();
  res.json({ uppercaseText });
});
//hitung karakter
app.get('/hitung-karakter/:teks', (req, res) => {
  const teks = req.params.teks;
  const jumlahKarakter = teks.length;
  res.json({ jumlahKarakter });
});
const QRCode = require('qrcode');
//kode qr dengan teks
app.get('/qrcode/:teks', async (req, res) => {
  const teks = req.params.teks;
  try {
    const qrcode = await QRCode.toDataURL(teks);
    res.send(`<img src="${qrcode}" alt="QR Code" />`);
  } catch (error) {
    res.status(500).json({ error: 'Gagal membuat QR Code' });
  }
});

//bilangan fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

app.get('/fibonacci/:n', (req, res) => {
  const n = parseInt(req.params.n);
  const result = fibonacci(n);
  res.json({ result });
});
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
