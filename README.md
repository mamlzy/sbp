# Sistem Pakar Diagnosa Penyakit Gigi

Sistem pakar berbasis web untuk mendiagnosa penyakit gigi menggunakan metode **Backward Chaining** dengan penelusuran **Depth First Search**.

## 📋 Deskripsi

Sistem ini dikembangkan untuk membantu masyarakat dalam mendiagnosa penyakit gigi berdasarkan gejala yang dialami. Sistem menggunakan basis pengetahuan (knowledge base) yang berisi aturan-aturan IF-THEN untuk menarik kesimpulan diagnosa.

### Penyakit yang Dapat Didiagnosa

1. **Gingivitis** - Peradangan pada gusi
2. **Periodontitis** - Infeksi gusi serius
3. **Pulpitis Reversible** - Peradangan ringan pada pulpa gigi
4. **Pulpitis Irreversible** - Peradangan parah pada pulpa gigi
5. **Abses Periapeks** - Infeksi di ujung akar gigi
6. **Abses Periodontal** - Infeksi pada gusi di samping akar gigi
7. **Abses Gingival** - Infeksi lokal pada gusi
8. **Trench Mouth (ANUG)** - Infeksi gusi parah dengan nekrosis

## 🛠️ Teknologi

- **Framework**: Next.js 15 (App Router)
- **Database**: MySQL
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📦 Instalasi

### Prasyarat

- Node.js 18+
- MySQL 8.0+
- pnpm (atau npm/yarn)

### Langkah-langkah

1. **Clone repository**

```bash
git clone <repository-url>
cd sbp
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Setup database MySQL**

Buat database baru di MySQL:

```sql
CREATE DATABASE sistem_pakar_gigi;
```

4. **Konfigurasi environment**

Edit file `.env` dan sesuaikan dengan konfigurasi database Anda:

```env
DATABASE_URL="mysql://root:password@localhost:3306/sistem_pakar_gigi"
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
```

5. **Push schema ke database**

```bash
pnpm db:push
```

6. **Seed database dengan data awal**

```bash
pnpm db:seed
```

7. **Jalankan development server**

```bash
pnpm dev
```

8. **Buka browser**

Akses aplikasi di [http://localhost:3000](http://localhost:3000)

## 👤 Akun Default

Setelah menjalankan seed, akun admin tersedia:

- **Email**: admin@gmail.com
- **Password**: rahasia123

## 📁 Struktur Folder

```
sbp/
├── app/
│   ├── (auth)/           # Halaman autentikasi
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/      # Halaman dashboard
│   │   ├── dashboard/
│   │   ├── konsultasi/   # Halaman konsultasi
│   │   ├── riwayat/      # Riwayat konsultasi
│   │   └── admin/        # Panel admin
│   │       ├── penyakit/ # CRUD penyakit
│   │       ├── gejala/   # CRUD gejala
│   │       ├── aturan/   # CRUD aturan
│   │       └── users/    # Manajemen users
│   ├── api/              # API routes
│   └── page.tsx          # Landing page
├── components/           # Komponen UI
│   └── ui/
├── lib/
│   ├── db/               # Database schema & config
│   │   ├── index.ts
│   │   ├── schema.ts
│   │   └── seed.ts
│   ├── auth.ts           # Better Auth config
│   ├── auth-client.ts    # Auth client
│   ├── inference-engine.ts # Mesin inferensi
│   └── utils.ts
└── drizzle.config.ts
```

## 🔧 Scripts

| Script             | Deskripsi                      |
| ------------------ | ------------------------------ |
| `pnpm dev`         | Jalankan development server    |
| `pnpm build`       | Build untuk production         |
| `pnpm start`       | Jalankan production server     |
| `pnpm db:push`     | Push schema ke database        |
| `pnpm db:generate` | Generate migrasi               |
| `pnpm db:migrate`  | Jalankan migrasi               |
| `pnpm db:studio`   | Buka Drizzle Studio            |
| `pnpm db:seed`     | Seed database dengan data awal |

## 🧠 Metode Inferensi

### Backward Chaining

Sistem menggunakan metode Backward Chaining yang bekerja dengan cara:

1. Dimulai dari hipotesis (penyakit)
2. Mencari gejala yang terkait dengan penyakit tersebut
3. Mencocokkan dengan gejala yang dialami user
4. Menghitung nilai kepastian berdasarkan bobot gejala yang cocok

### Depth First Search

Penelusuran menggunakan DFS yang:

1. Bermula dari simpul akar
2. Bergerak ke bawah ke tingkat dalam yang berurutan
3. Jika menemui jalan buntu, melacak ke belakang (backtracking)

## 📊 Struktur Basis Pengetahuan

### Tabel Penyakit

| Field      | Deskripsi                       |
| ---------- | ------------------------------- |
| id         | Kode penyakit (P001, P002, dst) |
| nama       | Nama penyakit                   |
| deskripsi  | Deskripsi penyakit              |
| pengobatan | Saran pengobatan                |

### Tabel Gejala

| Field      | Deskripsi                     |
| ---------- | ----------------------------- |
| id         | Kode gejala (G001, G002, dst) |
| nama       | Nama gejala                   |
| pertanyaan | Pertanyaan untuk user         |

### Tabel Aturan

| Field      | Deskripsi               |
| ---------- | ----------------------- |
| penyakitId | Relasi ke penyakit      |
| gejalaId   | Relasi ke gejala        |
| bobot      | Bobot kepentingan (1-5) |

## 🔐 Role Pengguna

| Role   | Akses                             |
| ------ | --------------------------------- |
| User   | Konsultasi, lihat riwayat         |
| Dokter | + Kelola penyakit, gejala, aturan |
| Admin  | + Kelola users                    |

## 📚 Referensi

Sistem ini dikembangkan berdasarkan penelitian:

> Bambang Yuwono. (2010). "Pengembangan Sistem Pakar pada Perangkat Mobile untuk Mendiagnosa Penyakit Gigi". UPN "Veteran" Yogyakarta.

## ⚠️ Disclaimer

Hasil diagnosa dari sistem ini merupakan panduan awal dan **tidak menggantikan konsultasi dengan dokter gigi profesional**. Segera kunjungi dokter gigi untuk pemeriksaan lebih lanjut.

## 📝 License

MIT License
