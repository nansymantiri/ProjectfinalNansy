/* script.js
   Fitur yang disediakan:
   - Keranjang (tambah, kosongkan, checkout)
   - Login demo sederhana (tidak aman, hanya demo)
   - Update data dashboard sederhana
*/

// Keranjang
let keranjang = [];

function tambahKeranjang(nama, harga) {
  keranjang.push({ nama, harga });
  alert(`${nama} ditambahkan ke keranjang.`);
  renderKeranjang();
  updateDashboard();
}

function renderKeranjang() {
  const list = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!list || !totalEl) return;
  list.innerHTML = '';
  let total = 0;
  keranjang.forEach((item, i) => {
    const li = document.createElement('li');
    li.textContent = `${item.nama}`;
    const span = document.createElement('span');
    span.textContent = `Rp${item.harga.toLocaleString()}`;
    li.appendChild(span);
    list.appendChild(li);
    total += item.harga;
  });
  totalEl.textContent = `Rp${total.toLocaleString()}`;
}

function kosongkanKeranjang() {
  keranjang = [];
  renderKeranjang();
  alert('Keranjang dikosongkan.');
  updateDashboard();
}

function checkout() {
  if (keranjang.length === 0) {
    alert('Keranjang masih kosong!');
    return;
  }
  const daftar = keranjang.map(i => i.nama + ' (' + formatRupiah(i.harga) + ')').join('\n');
  alert('Pesanan kamu:\n' + daftar + '\n\nTerima kasih!');
  // Simpan riwayat sederhana ke localStorage
  const riwayat = JSON.parse(localStorage.getItem('riwayat')) || [];
  riwayat.push({ waktu: new Date().toLocaleString(), items: keranjang });
  localStorage.setItem('riwayat', JSON.stringify(riwayat));
  keranjang = [];
  renderKeranjang();
  updateDashboard();
}

// Format
function formatRupiah(num) {
  return 'Rp' + num.toLocaleString();
}

// Login demo
function login(e) {
  if (e) e.preventDefault();
  const user = document.getElementById('username')?.value;
  const pass = document.getElementById('password')?.value;
  if (user === 'mahasiswa' && pass === 'kantin') {
    alert('Login berhasil! Mengarahkan ke Dashboard...');
    // Simpan status login sederhana
    localStorage.setItem('user', user);
    window.location.href = 'dashboard.html';
    return false;
  }
  alert('Username atau password salah. (demo: mahasiswa / kantin)');
  return false;
}

// Dashboard update
function updateDashboard() {
  const dashInfo = document.getElementById('dash-info');
  const dashOrders = document.getElementById('dash-orders');
  if (!dashInfo || !dashOrders) return;

  const riwayat = JSON.parse(localStorage.getItem('riwayat')) || [];
  if (riwayat.length === 0) {
    dashInfo.textContent = 'Belum ada aktivitas.';
    dashOrders.innerHTML = '';
    return;
  }
  dashInfo.textContent = `Total pesanan: ${riwayat.length}`;
  dashOrders.innerHTML = '';
  riwayat.slice(-5).reverse().forEach((r) => {
    const li = document.createElement('li');
    li.textContent = `${r.waktu} — ${r.items.map(i=>i.nama).join(', ')}`;
    dashOrders.appendChild(li);
  });
}

// Inisialisasi saat halaman dimuat
window.addEventListener('load', () => {
  renderKeranjang();
  updateDashboard();
});
