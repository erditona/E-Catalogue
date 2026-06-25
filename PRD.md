# PRD — GM Mobilindo (GM Mobilindo) Management System

> Product Requirements Document turunan dari [`SRS_GM_Mobilindo.md`](SRS_GM_Mobilindo.md).
> Dokumen ini memecah SRS menjadi requirement + **task list** dengan status pengerjaan, sehingga jelas apa yang **sudah**, **sebagian**, dan **belum** dikerjakan.

**Terakhir diperbarui:** 25 Juni 2026

---

## Legenda Status

| Simbol | Arti |
|:------:|------|
| ✅ | Selesai (sudah diimplementasi, mode dummy/frontend) |
| 🟡 | Sebagian (dasar ada, masih kurang sesuai SRS) |
| ⬜ | Belum dikerjakan |

> **Catatan mode saat ini:** aplikasi berjalan **mode demo** — data masih **dummy** (Redux store, belum ada API). **Login di-skip** dan **role belum diberlakukan**: untuk sementara dipakai **1 user dengan akses penuh ke semua menu**. Matriks role (Owner/Admin/Sales) tetap dicatat sebagai target Fase berikutnya.

---

## 1. Ringkasan Produk

Sistem manajemen showroom mobil bekas yang mencakup seluruh siklus: pembelian unit → rekondisi → inventory → ready stock → CRM/lead → test drive → sales order → pembayaran → pengeluaran → cash flow → laporan profit. Selain panel internal, aplikasi juga menyediakan **situs publik (E-Catalogue)** untuk calon pembeli.

### 1.1 Tujuan
- Mencatat & melacak setiap unit dari masuk hingga terjual beserta HPP-nya.
- Mengelola lead/penjualan/pembayaran secara terstruktur.
- Memberi visibilitas keuangan (pengeluaran, cash flow, profit) ke owner.
- Menarik calon pembeli lewat katalog online.

### 1.2 Di luar cakupan fase ini
- Autentikasi nyata & RBAC (role-based access control).
- Integrasi backend/API, upload file nyata, notifikasi.

---

## 2. User Role (Target)

Sesuai SRS — **belum diberlakukan** (saat ini single-user full akses). Menjadi acuan implementasi RBAC.

| Modul | Owner | Admin | Sales | Status RBAC |
|-------|:-----:|:-----:|:-----:|:-----------:|
| Dashboard | ✅ | — | — | ⬜ |
| Inventory | ✅ | ✅ | — | ⬜ |
| Rekondisi | ✅ | ✅ | — | ⬜ |
| CRM / Lead | ✅ | ✅ | ✅ | ⬜ |
| Test Drive | ✅ | ✅ | ✅ | ⬜ |
| Sales Order | ✅ | ✅ | ✅ | ⬜ |
| Pembayaran | ✅ | ✅ | — | ⬜ |
| Pengeluaran | — | ✅ | — | ⬜ |
| Cash Flow | ✅ | ✅ | — | ⬜ |
| Laporan | ✅ | ✅ | — | ⬜ |

**Task RBAC / Auth:**
- [x] ✅ **Auth nyata** (login `identifier`+password) terhubung ke backend `/api/v1/auth/*`
- [x] ✅ Token (access + refresh) + **auto-refresh on 401** (rotation) via interceptor Axios
- [x] ✅ Hidrasi sesi `/auth/me` saat load + **logout** (cabut session) + **guard** route `_admin`
- [ ] 🟡 RBAC: `permissionCodes` & `groupMenus` sudah diterima dari API — belum dipakai untuk filter menu/aksi
- [ ] ⬜ Guard per-permission tiap route/aksi (CREATE/UPDATE/DELETE)
- [ ] ⬜ Sembunyikan menu sidebar sesuai `groupMenus`/permission
- [ ] ⬜ Halaman manajemen Role / User / Menu (endpoint tersedia di backend)

---

## 3. Business Flow

```
Inspeksi & Pembelian Unit → Inventory → Rekondisi → Ready Stock
→ Customer/Lead (CRM) → Test Drive → Sales Order → Pembayaran
→ Serah Terima → Pengeluaran → Laporan Profit & Cash Flow
```

Status alur: rangkaian menu & data sudah tersambung secara dummy; perhitungan HPP→OTR→Profit otomatis masih ⬜.

---

## 4. Module: Inventory

**Tujuan:** Mencatat seluruh unit yang masuk showroom.

**Sudah:**
- [x] ✅ Halaman Inventory: grid kartu, filter status, search
- [x] ✅ CRUD unit (tambah/edit/hapus) + modal detail unit
- [x] ✅ Field dasar: merek, tipe/model, varian, plat, tahun, warna, transmisi, kilometer, bahan bakar, harga (jual), harga beli, status, foto, badge "Baru"
- [x] ✅ Status unit (ready/rekondisi/booked/sold/pembelian) + badge

**Belum / sebagian:**
- [ ] 🟡 Form unit lengkap sesuai SRS — kurang: **Pilihan Stok (Investor/GM)**, **No Rangka**, **No Mesin**, **Tanggal Pajak**, **Status BPKB**
- [ ] ⬜ **Barcode auto-generate** unit
- [ ] ⬜ Kelengkapan (checkbox): Kunci Serep, Manual Book, Buku Service, Dongkrak, Kunci Roda, Ban Serep
- [ ] ⬜ **Formula harga otomatis**: HPP = Harga Beli + Total Rekondisi; Harga Target = HPP + 22%; **Harga OTR = HPP + 25%**
- [ ] ⬜ Aturan: Harga OTR tetap walau ada rekondisi tambahan setelah Ready Stock

---

## 5. Module: Pembelian Unit

**Sudah:**
- [x] ✅ Halaman daftar pembelian + ringkasan (jumlah unit, total modal)
- [x] ✅ Input pembelian via form unit (status "pembelian")

**Belum:**
- [ ] 🟡 Field khusus pembelian (tanggal pembelian, sumber/investor) terpisah dari unit
- [ ] ⬜ Catat pembelian sebagai transaksi kas keluar otomatis

---

## 6. Module: Rekondisi

**Tujuan:** Mencatat seluruh biaya perbaikan & meng-update HPP.

**Sudah:**
- [x] ✅ Halaman rekondisi: daftar unit + progress bar + estimasi selesai
- [x] ✅ Edit progress & ETA via modal unit

**Belum:**
- [ ] ⬜ **Rekondisi sebagai entri biaya** (form: unit, tanggal, jenis kerusakan, vendor, keterangan, nominal)
- [ ] ⬜ **Upload invoice** rekondisi
- [ ] ⬜ Multiple rekondisi per unit + akumulasi Total Rekondisi
- [ ] ⬜ Update HPP otomatis saat rekondisi disimpan
- [ ] ⬜ Tambah rekondisi pada unit yang sudah **Ready Stock** (HPP naik, OTR tetap)

---

## 7. Module: CRM / Lead

**Tujuan:** Semua sales wajib input lead; lead tidak boleh dihapus.

**Sudah:**
- [x] ✅ Papan **Kanban** per tahap (Lead/Test Drive/Negosiasi/SPK)
- [x] ✅ Tambah & edit lead (nama, no HP, sumber lead, unit diminati, tahap, budget, follow up)

**Belum / sebagian:**
- [ ] 🟡 Field lengkap — kurang: **Alamat**, **Pekerjaan**, **Upload KTP**, **Sales (auto dari user login)**
- [ ] ⬜ **Informasi kredit**: Leasing, Status SLIK, Status Approval, Keterangan
- [ ] ⬜ **Status flow lengkap**: New → Follow Up → Test Drive → Approved Kredit/Cash Buyer → Booking → Deal → (Reject SLIK/Cancel)
- [ ] ⬜ Aturan **lead tidak boleh dihapus** (saat ini masih bisa dihapus)
- [ ] ⬜ Riwayat/timeline aktivitas lead

---

## 8. Module: Test Drive

**Sudah:**
- [x] ✅ Daftar & CRUD test drive (customer, unit, tanggal, jam, status)

**Belum:**
- [ ] ⬜ **Sales pendamping** (auto dari user login)
- [ ] ⬜ **Upload Foto KTP & SIM**
- [ ] ⬜ **Validasi wajib**: tidak boleh submit jika KTP/SIM kosong
- [ ] ⬜ Field catatan

---

## 9. Module: Sales Order (Penjualan)

**Sudah:**
- [x] ✅ Daftar transaksi penjualan + CRUD + modal detail
- [x] ✅ Field: customer, unit, tanggal, total, tipe bayar (Cash/Kredit), status

**Belum:**
- [ ] ⬜ **Sales penjual** (dropdown/auto)
- [ ] ⬜ **Harga OTR auto** muncul saat unit dipilih
- [ ] ⬜ **Diskon Showroom** + **Harga Final = OTR − Diskon** (otomatis)
- [ ] ⬜ Tautan ke status pembayaran & serah terima

---

## 10. Module: Pembayaran

**Sudah:**
- [x] ✅ Daftar pembayaran + CRUD + detail
- [x] ✅ Ringkasan total masuk & pending
- [x] ✅ Field: invoice, customer, metode, nominal, tanggal, status

**Belum:**
- [ ] ⬜ Skema **Cash**: Booking + Pelunasan 1/2; Sisa = OTR − Total Bayar
- [ ] ⬜ Skema **Kredit**: OTR, Booking, DP, Refund/Bonus Leasing, Pencairan Leasing (manual)
- [ ] ⬜ Pembayaran ter-link ke **Sales Order** (banyak pembayaran per order)
- [ ] ⬜ **Status Lunas / Belum Lunas** dihitung otomatis vs OTR
- [ ] ⬜ Dashboard pembayaran per unit (OTR, total dibayar, sisa)

---

## 11. Module: Pengeluaran ✅ (baru)

**Sudah:**
- [x] ✅ Halaman Pengeluaran + CRUD (kategori, nama, nominal, tanggal, catatan)
- [x] ✅ Kategori: **Investor**, **Operasional Showroom**, **Operasional Kendaraan**, **Lainnya**
- [x] ✅ Ringkasan total & per kategori

**Belum:**
- [ ] ⬜ **Auto-generate Investor Fee bulanan** (2.5% × dana investor)
- [ ] ⬜ Upload bukti pengeluaran

---

## 12. Module: Cash Flow ✅ (baru)

**Sudah:**
- [x] ✅ Halaman Cash Flow: kartu **Saldo Awal, Kas Masuk, Kas Keluar, Saldo Akhir**
- [x] ✅ Kas masuk dari pembayaran (Sukses); kas keluar dari pengeluaran + pembelian unit
- [x] ✅ Riwayat arus kas (masuk/keluar) terurut tanggal
- [x] ✅ Formula: Saldo Akhir = Saldo Awal + Kas Masuk − Kas Keluar

**Belum:**
- [ ] ⬜ Masukkan biaya **rekondisi** & **refund** ke kas keluar/masuk
- [ ] ⬜ Filter periode (harian/mingguan/bulanan)
- [ ] ⬜ Grafik tren kas

---

## 13. Module: Dashboard

**Sudah:**
- [x] ✅ KPI inventory (total stok, ready, rekondisi), lead, unit terjual, omzet + progress target
- [x] ✅ Ready stock, grafik penjualan, pipeline, unit rekondisi, aktivitas terbaru, ringkasan bawah

**Belum:**
- [ ] 🟡 KPI **keuangan real** (Kas Masuk/Keluar/Profit bulan ini) tersambung ke Cash Flow
- [ ] ⬜ KPI sales: Booking, Deal, Cancel (dari CRM)
- [ ] ⬜ Total biaya rekondisi real
- [ ] ⬜ Data dashboard dari agregasi store (sebagian masih angka statis)

---

## 14. Module: Laporan

**Sudah:**
- [x] ✅ Ringkasan + grafik tren penjualan + stok per merek

**Belum:**
- [ ] ⬜ **Laporan Inventory**: stok ready, terjual, **aging stock**
- [ ] ⬜ **Laporan Sales**: penjualan per sales, closing rate, lead conversion
- [ ] ⬜ **Laporan Rekondisi**: per unit, per vendor
- [ ] ⬜ **Laporan Cash Flow**: harian/mingguan/bulanan
- [ ] ⬜ **Laporan Profit Unit**: Profit = Harga Jual − (Harga Beli + Rekondisi + Biaya Unit)
- [ ] ⬜ Export (PDF/Excel) — tombol ada, belum berfungsi

---

## 14b. Module: Master Data ✅ (terintegrasi API)

Endpoint master data sudah tersedia di backend & **terhubung nyata** (React Query, pola 1 pintu).

**Merek & Tipe** (`/api/v1/mereks`, `/api/v1/mereks/:id/tipes`)
- [x] ✅ List merek (paginated + search) + CRUD
- [x] ✅ Kelola **Tipe** (nested per merek) — list + CRUD via modal

**Vendor** (`/api/v1/vendors`)
- [x] ✅ List (paginated + search) + CRUD (nama, alamat, telepon, status)

**Cabang / Branch + Media** (`/api/v1/branches`, `/branches/:id/images`, `/m/:id`)
- [x] ✅ List (paginated + search) + CRUD (nama, code, lokasi, longlat, kontak)
- [x] ✅ **Galeri foto**: upload (multipart) & hapus, preview via media publik `/m/:id`
- [ ] 🟡 Pilih PIC cabang (perlu integrasi list user)

**Belum:**
- [ ] ⬜ Hubungkan Merek/Tipe & Vendor ke form Inventory & Rekondisi (gantikan input teks)

---

## 15. Cross-cutting

- [ ] ⬜ **Audit Log** (siapa, sebelum, sesudah, waktu) untuk setiap perubahan data
- [x] ✅ **Autentikasi** terintegrasi API (lihat §2); 🟡 RBAC enforcement belum
- [ ] 🟡 Integrasi API — **auth + master data (merek/tipe/vendor/cabang) sudah**; modul bisnis (unit/lead/sales/dll) masih dummy (menunggu endpoint)
- [ ] ⬜ Upload file (KTP, SIM, invoice, BPKB)
- [ ] ⬜ Validasi form menyeluruh (Zod)

---

## 16. Situs Publik / E-Catalogue (di luar SRS — sudah dibuat)

- [x] ✅ Beranda marketing (hero, keunggulan, cara kerja, unit unggulan, testimoni, CTA)
- [x] ✅ Katalog + filter (merek, harga, transmisi, BBM, sort, search) — sidebar kanan
- [x] ✅ Detail mobil (galeri foto + spesifikasi + CTA + unit serupa)
- [x] ✅ Simulasi Kredit interaktif
- [x] ✅ Tentang & Kontak
- [x] ✅ Responsif + animasi halus

---

## 17. Roadmap

### Fase 1 — Fondasi (sekarang, single-user full menu, dummy)
- [x] ✅ Semua menu inti + situs publik
- [x] ✅ CRUD dasar semua modul operasional
- [x] ✅ Modul Pengeluaran & Cash Flow
- [ ] 🟡 Formula HPP/OTR, rekondisi biaya, pembayaran cash/kredit

### Fase 2 — Bisnis logic & keuangan akurat
- [ ] ⬜ Formula HPP→OTR→Profit otomatis end-to-end
- [ ] ⬜ Rekondisi berbasis biaya + update HPP
- [ ] ⬜ Pembayaran cash/kredit lengkap + status lunas
- [ ] ⬜ Laporan lengkap (aging, profit unit, cashflow periodik) + export
- [ ] ⬜ Audit log

### Fase 3 — Multi-user & integrasi
- [ ] ⬜ Auth nyata + RBAC (Owner/Admin/Sales)
- [ ] ⬜ Integrasi API/backend
- [ ] ⬜ Upload dokumen

### Fase 4 — Rekomendasi SRS (Fase 2 SRS)
- [ ] ⬜ WhatsApp follow up lead
- [ ] ⬜ Approval digital owner (diskon besar)
- [ ] ⬜ E-Sign SPK · Scan barcode unit
- [ ] ⬜ Reminder pajak & aging stock > 60 hari
- [ ] ⬜ Dashboard ROI investor · Multi cabang · Mobile app sales

---

## 18. Ringkasan Progres

| Modul | Status |
|-------|:------:|
| Inventory | 🟡 |
| Pembelian Unit | 🟡 |
| Rekondisi | 🟡 |
| Ready Stock | ✅ |
| CRM / Lead | 🟡 |
| Test Drive | 🟡 |
| Sales Order | 🟡 |
| Pembayaran | 🟡 |
| Pengeluaran | ✅ |
| Cash Flow | ✅ |
| Master Data (Merek/Tipe/Vendor/Cabang) — API | ✅ |
| Dashboard | 🟡 |
| Laporan | 🟡 |
| Situs Publik (E-Catalogue) | ✅ |
| Autentikasi (login/refresh/logout/guard) | ✅ |
| RBAC enforcement (permission/menu) | 🟡 |
| Audit Log | ⬜ |
| Integrasi API modul bisnis | ⬜ |

*PRD ini hidup — perbarui status checkbox setiap menyelesaikan task.*
