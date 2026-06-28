# TASK LIST — GM Mobilindo E-Catalogue

> Daftar task actionable turunan dari [PRD.md](PRD.md) & [SRS](SRS_GM_Mobilindo.md).
> Status: `[x]` selesai · `[~]` sebagian · `[ ]` belum. Prioritas: 🔴 tinggi · 🟠 sedang · 🟢 rendah.
>
> **Terakhir diperbarui:** 28 Juni 2026

---

## ✅ SELESAI (Done)

### Fondasi & UI
- [x] Setup project (Vite + React 19 + TS + Tailwind + TanStack Router)
- [x] Tema "Claude Orange" + token warna (CSS vars)
- [x] UI kit reusable (Modal, ConfirmDialog, DetailModal, Button, Field, DataTable, RowActions, Pagination, Tooltip, SectionCard, StatusBadge, UnitCard, PageHeader)
- [x] Layout admin (Sidebar grup, Header, MainLayout) + Quick Input
- [x] Animasi halus (float-up, stagger, modal-in) + reduce-motion

### Situs Publik (Customer)
- [x] Beranda marketing (hero, keunggulan, cara kerja, unggulan, testimoni, CTA)
- [x] Katalog + filter (merek/harga/transmisi/BBM/sort/search) + sidebar kanan
- [x] Detail mobil (galeri + spesifikasi + CTA + unit serupa)
- [x] Simulasi Kredit interaktif
- [x] Tentang & Kontak + PublicLayout (navbar/footer)
- [x] Responsif semua device

### Autentikasi (API nyata)
- [x] Axios client + base URL fleksibel (env)
- [x] Interceptor 1 pintu: attach token + auto-refresh 401 (rotation + antrean)
- [x] Refresh **hanya** saat `INVALID_ACCESS_TOKEN`; kode sesi-berakhir → langsung logout
- [x] Global error handler (network/timeout/5xx/parsing) + GlobalErrorModal
- [x] Login (identifier+password), `/auth/me` hydrate, logout, guard `_admin`
- [x] **Modal konfirmasi logout** + bersihkan cache React Query saat logout
- [x] **Logout semua perangkat** (`/auth/logout-all`) dgn konfirmasi di Header

### Master Data (API nyata)
- [x] Merek + Tipe (nested) CRUD + paginated/search
- [x] Vendor CRUD
- [x] Cabang CRUD + **PIC (dropdown user aktif, `picId` wajib)** + galeri foto (upload/hapus dgn konfirmasi, media `/m/:id`)
- [x] Akses Control: Role, User, Menu/Group/Permission (CRUD + set permission/role/branch) — halaman Menu dirapikan jadi alur 3-kolom (Group → Menu → Permission)
- [x] Master sederhana via komponen generik `SimpleMasterPage` (`code` **wajib** + auto-uppercase): **Leasing, Sumber Lead, Pengecekan, Kategori Pengeluaran, Metode Pembayaran, Dokumen, Perlengkapan**

### Modul admin (dummy)
- [x] Dashboard (stat, ready stock, grafik, pipeline, rekondisi, aktivitas)
- [x] Inventory, Pembelian, Rekondisi, Ready Stock (CRUD unit)
- [x] CRM/Lead (kanban), Test Drive, Penjualan, Pembayaran (CRUD)
- [x] Pengeluaran & Cash Flow
- [x] Laporan (ringkasan) & Pengaturan

---

## 📊 Status Integrasi API (`master_prd.md` §3–§19)

> Audit endpoint-per-endpoint dokumen API vs kode. **Semua endpoint sudah terintegrasi.** Indikator: ✅ penuh · 🟡 sebagian/belum di-UI · ⬜ belum.

| Module | API frontend | Endpoint | Status |
|--------|--------------|:--------:|:------:|
| Role (+ set permission) | `roleApi` | 6/6 | ✅ |
| User (+ set role/branch, soft-delete) | `userApi` | 7/7 | ✅ |
| Menu / Group / Permission | `menuApi` | 12/12 | ✅ |
| Auth (login/refresh/me/logout/logout-all) | `authApi` + interceptor | 5/5 | ✅ |
| Merek | `merekApi` | 4/5 | ✅ |
| Tipe (nested) | `tipeApi` | 4/5 | ✅ |
| Vendor | `vendorApi` | 4/5 | ✅ |
| Branch & Media | `branchApi` | 8/8 | ✅ |
| Leasing | `leasingApi` | 4/5 | ✅ |
| Sumber Lead | `sumberLeadApi` | 4/5 | ✅ |
| Pengecekan | `pengecekanApi` | 4/5 | ✅ |
| Kategori Pengeluaran | `kategoriPengeluaranApi` | 4/5 | ✅ |
| Metode Pembayaran | `metodePembayaranApi` | 4/5 | ✅ |
| Dokumen | `dokumenApi` | 4/5 | ✅ |
| Perlengkapan | `perlengkapanApi` | 4/5 | ✅ |

> *4/5 = endpoint detail `GET /:id` belum dipakai karena data sudah lengkap dari endpoint list — bukan kekurangan.*
>
> **Penyempurnaan opsional (bukan endpoint baru):** filter list User via `roleId`/`isActive` (belum ada kontrol UI), endpoint detail `GET /:id` bila kelak dibutuhkan.

---

## 🚧 BELUM / SEBAGIAN (To Do)

### A. Integrasi API modul bisnis (ganti dummy) 🔴
> Menunggu endpoint backend. Pola: service `*.api.ts` + React Query hooks + ganti `useAppSelector` dummy.
- [ ] 🔴 Inventory/Unit — list, CRUD, detail
- [ ] 🔴 Sales Order (Penjualan)
- [ ] 🔴 Pembayaran (cash/kredit)
- [ ] 🟠 CRM/Lead
- [ ] 🟠 Test Drive
- [ ] 🟠 Rekondisi (biaya)
- [ ] 🟠 Pengeluaran & Cash Flow
- [ ] 🟢 Dashboard & Laporan (agregasi dari API)

### B. RBAC & Multi-user 🔴
- [x] **Sidebar dinamis** dari `groupMenus` (`/auth/me`) + fallback menu statis — path backend di-resolve ke route frontend nyata via `PATH_BY_CODE` (anti-404), grup **Akses Kontrol** (Role/User/Menu) kini tampil di sidebar
- [x] Halaman manajemen **Role** (CRUD + set permission)
- [x] Halaman manajemen **User** (CRUD + set role + set branch)
- [x] Halaman manajemen **Menu/Group/Permission**
- [x] **Guard aksi per-permission** — tombol Create/Edit/Delete/Set-Permission disembunyikan sesuai `permissionCodes` (`usePermissions` + `Can`)
- [x] **Gate halaman per READ permission** — `RequirePermission` (Akses Ditolak bila tak punya `*_READ`), pada Role/User/Menu
- [ ] 🟠 Terapkan guard aksi yang sama ke modul Master Data begitu kode permission-nya tersedia
- [ ] 🟢 Guard route `beforeLoad` per-permission (opsional; saat ini cukup gate komponen + enforcement backend)

### C. Inventory sesuai SRS 🔴
- [ ] 🔴 Sambungkan dropdown **Merek/Tipe** & **Vendor** (dari Master Data) ke form Inventory/Rekondisi
- [ ] 🔴 Formula harga: HPP = Beli + Rekondisi; Target = HPP+22%; **OTR = HPP+25%**
- [ ] 🟠 Field: Pilihan Stok (Investor/GM), No Rangka, No Mesin, Tgl Pajak, Status BPKB
- [ ] 🟠 Kelengkapan (checkbox: kunci serep, manual book, buku service, dongkrak, kunci roda, ban serep)
- [ ] 🟢 Barcode auto-generate + scan

### D. Rekondisi berbasis biaya 🔴
- [ ] 🔴 Entri biaya rekondisi (unit, tanggal, jenis, vendor, nominal) + akumulasi
- [ ] 🟠 Update HPP otomatis saat rekondisi disimpan
- [ ] 🟠 Upload invoice rekondisi
- [ ] 🟢 Tambah rekondisi pada unit Ready Stock (OTR tetap)

### E. CRM / Test Drive sesuai SRS 🟠
- [ ] 🟠 Lead: alamat, pekerjaan, upload KTP, sales auto, info kredit (leasing/SLIK/approval)
- [ ] 🟠 Status flow lengkap (New→Follow Up→TD→Approved/Cash→Booking→Deal / Reject/Cancel)
- [ ] 🟠 Aturan lead tidak boleh dihapus
- [ ] 🟠 Test Drive: upload KTP & SIM + validasi wajib, sales pendamping auto

### F. Sales Order & Pembayaran sesuai SRS 🟠
- [ ] 🟠 Sales Order: OTR auto dari unit, Diskon Showroom, Harga Final
- [ ] 🟠 Pembayaran Cash (booking + pelunasan) & Kredit (DP/refund/pencairan)
- [ ] 🟠 Status Lunas/Belum Lunas otomatis vs OTR + pembayaran ter-link order

### G. Laporan & Audit 🟠
- [ ] 🟠 Laporan: inventory/aging, sales per sales, closing rate, rekondisi, cashflow periodik, profit unit
- [ ] 🟠 Export PDF/Excel
- [ ] 🔴 **Audit Log** (siapa, sebelum, sesudah, waktu)

### H. Lain-lain 🟢
- [x] **Halaman 404** (`NotFound`) ber-branding + `defaultNotFoundComponent` di router (tombol Kembali / Dashboard / Katalog)
- [ ] 🟢 Fungsikan wishlist/favorit (tombol hati) & bandingkan mobil
- [ ] 🟢 Validasi form menyeluruh (Zod)
- [ ] 🟢 Code-splitting (chunk > 500kB) + optimasi gambar
- [ ] 🟢 Fase 2 SRS: WhatsApp follow-up, approval owner, e-sign SPK, reminder pajak/aging, ROI investor, multi cabang, mobile app

---

## 🎯 Saran urutan berikutnya
1. **C** — sambungkan Master Data (Merek/Tipe/Vendor) ke form Inventory + formula HPP/OTR.
2. **D** — rekondisi berbasis biaya yang update HPP (fondasi profit).
3. **B** — RBAC: filter menu dari `/auth/me` + halaman Role/User.
4. **A** — integrasi API modul bisnis begitu endpoint tersedia.
