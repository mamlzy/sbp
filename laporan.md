# SISTEM PAKAR DIAGNOSA PENYAKIT GIGI BERBASIS WEB MENGGUNAKAN METODE BACKWARD CHAINING

---

## RINGKASAN

Sistem pakar diagnosa penyakit gigi merupakan aplikasi berbasis web yang dirancang untuk membantu masyarakat awam dalam mengidentifikasi penyakit gigi berdasarkan gejala yang dialami. Sistem ini mengadopsi pengetahuan dari pakar (dokter gigi) ke dalam komputer sehingga dapat memberikan diagnosa awal beserta saran pengobatan. Penelitian ini menggunakan metode Backward Chaining dengan teknik penelusuran Depth First Search untuk melakukan inferensi pengetahuan. Basis pengetahuan sistem mencakup 8 jenis penyakit gigi yang umum diderita masyarakat, yaitu Gingivitis, Periodontitis, Pulpitis Reversible, Pulpitis Irreversible, Abses Periapeks, Abses Periodontal, Abses Gingival, dan Trench Mouth (ANUG), beserta 25 gejala yang telah dikumpulkan dari sumber pakar. Representasi pengetahuan menggunakan kaidah produksi (IF-THEN) dengan sistem pembobotan untuk menentukan tingkat kepastian diagnosa. Sistem diimplementasikan menggunakan Next.js, React, TypeScript, dan MySQL. Hasil pengujian menunjukkan sistem mampu memberikan diagnosa dengan tingkat kepastian yang terukur dan memudahkan pengguna dalam melakukan konsultasi mandiri sebelum berkunjung ke dokter gigi.

**Kata Kunci:** Sistem pakar, penyakit gigi, backward chaining, depth first search, diagnosa

---

## BAB 1: PENDAHULUAN

### 1.1 Latar Belakang Masalah

Kesehatan gigi dan mulut merupakan bagian integral dari kesehatan tubuh secara keseluruhan. Menurut data Riset Kesehatan Dasar (Riskesdas), prevalensi masalah gigi dan mulut di Indonesia mencapai angka yang cukup tinggi, namun akses terhadap pelayanan kesehatan gigi masih terbatas di berbagai daerah. Ketidakhadiran seorang dokter gigi atau ahli yang dapat menentukan penyakit gigi yang diderita beserta pengobatannya dapat mengakibatkan proses penyembuhan menjadi lama atau bahkan berakibat fatal bagi pasien.

Beberapa permasalahan utama yang dihadapi masyarakat dalam konteks kesehatan gigi antara lain:

1. **Keterbatasan Akses ke Dokter Gigi**: Posisi geografis yang jauh dari fasilitas kesehatan menyebabkan masyarakat kesulitan untuk berkonsultasi dengan dokter gigi secara langsung. Hal ini terutama dirasakan oleh masyarakat di daerah terpencil.

2. **Keterlambatan Identifikasi Penyakit**: Ketidaktahuan masyarakat awam tentang gejala-gejala penyakit gigi menyebabkan penanganan yang terlambat. Banyak penyakit gigi yang sebenarnya dapat dicegah atau diobati dengan mudah jika teridentifikasi lebih awal.

3. **Keterbatasan Waktu Konsultasi**: Dokter gigi memiliki keterbatasan waktu dalam melayani pasien, sehingga tidak semua pasien dapat dilayani dengan optimal.

4. **Minimnya Edukasi Kesehatan Gigi**: Masyarakat awam seringkali tidak memahami hubungan antara gejala yang dialami dengan penyakit gigi tertentu.

### 1.2 Solusi yang Diusulkan

Untuk mengatasi permasalahan tersebut, dikembangkan sebuah Sistem Pakar Diagnosa Penyakit Gigi berbasis web. Sistem pakar adalah sistem yang berusaha mengadopsi pengetahuan manusia ke komputer, agar komputer dapat menyelesaikan masalah seperti yang biasa dilakukan oleh para ahli (Kusumadewi, 2003). Dengan sistem pakar ini, orang awam dapat menyelesaikan masalah identifikasi penyakit gigi yang sebenarnya hanya bisa diselesaikan dengan bantuan dokter gigi.

Sistem pakar yang dikembangkan memiliki karakteristik sebagai berikut:

1. **Berbasis Web**: Sistem dapat diakses melalui browser dari perangkat apapun yang terhubung ke internet, sehingga meningkatkan aksesibilitas.

2. **Metode Backward Chaining**: Sistem menggunakan metode pelacakan mundur (backward chaining) dengan teknik penelusuran Depth First Search. Proses dimulai dari hipotesis (penyakit) kemudian dicari fakta-fakta (gejala) yang mendukung hipotesis tersebut.

3. **Sistem Pembobotan**: Setiap gejala memiliki bobot yang berbeda terhadap masing-masing penyakit, sehingga hasil diagnosa lebih akurat dengan tingkat kepastian yang terukur.

4. **Fitur Manajemen Basis Pengetahuan**: Admin atau dokter dapat menambah, mengubah, dan menghapus data penyakit, gejala, serta aturan (rules), sehingga sistem dapat terus berkembang sesuai perkembangan ilmu kedokteran gigi.

5. **Penyimpanan Riwayat Konsultasi**: Sistem menyimpan riwayat konsultasi pengguna untuk keperluan tracking dan referensi di masa mendatang.

Dengan adanya sistem pakar ini, diharapkan masyarakat dapat melakukan identifikasi awal terhadap penyakit gigi yang dialami, mengetahui tingkat keparahan berdasarkan nilai kepastian diagnosa, serta mendapatkan saran pengobatan awal sebelum berkonsultasi langsung dengan dokter gigi profesional.

---

## BAB 2: AKUISISI PENGETAHUAN

### 2.1 Teknik Akuisisi Pengetahuan

Akuisisi pengetahuan adalah proses pengumpulan, transfer, dan transformasi keahlian dalam menyelesaikan masalah dari sumber pengetahuan ke dalam program komputer. Pada penelitian ini, akuisisi pengetahuan dilakukan melalui beberapa teknik:

#### 2.1.1 Wawancara dengan Pakar

Informasi mengenai penyakit gigi diperoleh melalui konsultasi dengan dokter gigi yang berpengalaman. Dari wawancara ini diperoleh informasi mengenai:

- Jenis-jenis penyakit gigi yang umum diderita masyarakat
- Gejala-gejala yang menyertai setiap penyakit
- Tingkat kepentingan (bobot) setiap gejala terhadap penyakit tertentu
- Metode pengobatan dan penanganan awal

#### 2.1.2 Studi Literatur

Pengetahuan juga diperoleh dari buku-buku kedokteran gigi, jurnal ilmiah, dan referensi akademik lainnya untuk melengkapi dan memvalidasi informasi dari pakar.

#### 2.1.3 Observasi Kasus

Pengamatan terhadap kasus-kasus penyakit gigi yang umum terjadi dilakukan untuk memahami pola hubungan antara gejala dan penyakit.

### 2.2 Hasil Akuisisi Pengetahuan

#### 2.2.1 Data Penyakit

Dari proses akuisisi pengetahuan, diperoleh 8 jenis penyakit gigi yang akan menjadi domain sistem pakar ini:

| Kode | Nama Penyakit         | Deskripsi                                                                                                                                                |
| ---- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P001 | Gingivitis            | Peradangan pada gusi yang disebabkan oleh penumpukan plak. Gusi menjadi merah, bengkak, dan mudah berdarah saat menyikat gigi.                           |
| P002 | Periodontitis         | Infeksi gusi serius yang merusak jaringan lunak dan tulang penyangga gigi. Merupakan tahap lanjut dari gingivitis yang tidak diobati.                    |
| P003 | Pulpitis Reversible   | Peradangan ringan pada pulpa gigi yang masih dapat sembuh. Ditandai dengan rasa ngilu saat terkena rangsangan dingin atau manis.                         |
| P004 | Pulpitis Irreversible | Peradangan parah pada pulpa gigi yang tidak dapat sembuh sendiri. Nyeri spontan dan berdenyut, terutama di malam hari.                                   |
| P005 | Abses Periapeks       | Infeksi yang terjadi di ujung akar gigi, biasanya akibat gigi berlubang yang tidak diobati atau trauma pada gigi.                                        |
| P006 | Abses Periodontal     | Infeksi yang terjadi pada gusi di samping akar gigi, biasanya terkait dengan penyakit periodontal.                                                       |
| P007 | Abses Gingival        | Infeksi lokal pada gusi yang menyebabkan pembengkakan berisi nanah, biasanya disebabkan oleh benda asing yang tersangkut di gusi.                        |
| P008 | Trench Mouth (ANUG)   | Acute Necrotizing Ulcerative Gingivitis adalah infeksi gusi yang parah dengan nekrosis jaringan gusi. Ditandai dengan bau mulut yang sangat tidak sedap. |

#### 2.2.2 Data Gejala

Diperoleh 25 gejala yang relevan dengan penyakit-penyakit gigi di atas:

| Kode | Nama Gejala                          | Pertanyaan Konsultasi                                               |
| ---- | ------------------------------------ | ------------------------------------------------------------------- |
| G001 | Gusi berwarna merah (bukan pink)     | Apakah gusi Anda berwarna merah, bukan pink seperti biasa?          |
| G002 | Gusi membengkak                      | Apakah gusi Anda mengalami pembengkakan?                            |
| G003 | Gusi terasa nyeri                    | Apakah gusi Anda terasa nyeri atau sakit?                           |
| G004 | Gusi terasa lunak/tidak kencang      | Apakah gusi Anda terasa lunak dan tidak kencang?                    |
| G005 | Pendarahan saat menyikat gigi        | Apakah gusi Anda berdarah saat menyikat gigi?                       |
| G006 | Keluar nanah dari gusi               | Apakah ada nanah yang keluar dari gusi Anda?                        |
| G007 | Gusi menyusut/turun                  | Apakah gusi Anda tampak menyusut atau turun?                        |
| G008 | Gigi goyang                          | Apakah ada gigi yang terasa goyang?                                 |
| G009 | Bau mulut tidak sedap                | Apakah Anda mengalami bau mulut yang tidak sedap?                   |
| G010 | Gigi sensitif terhadap dingin        | Apakah gigi Anda sensitif/ngilu terhadap minuman dingin?            |
| G011 | Gigi sensitif terhadap panas         | Apakah gigi Anda sensitif/ngilu terhadap minuman panas?             |
| G012 | Gigi sensitif terhadap makanan manis | Apakah gigi Anda sensitif/ngilu saat makan makanan manis?           |
| G013 | Nyeri gigi spontan                   | Apakah Anda mengalami nyeri gigi yang muncul tiba-tiba tanpa sebab? |
| G014 | Nyeri gigi berdenyut                 | Apakah nyeri gigi Anda terasa berdenyut-denyut?                     |
| G015 | Nyeri gigi bertambah saat malam      | Apakah nyeri gigi Anda bertambah parah di malam hari?               |
| G016 | Nyeri gigi saat mengunyah            | Apakah gigi Anda terasa nyeri saat mengunyah makanan?               |
| G017 | Bengkak di wajah/pipi                | Apakah ada pembengkakan di wajah atau pipi Anda?                    |
| G018 | Demam                                | Apakah Anda mengalami demam?                                        |
| G019 | Kelenjar getah bening membengkak     | Apakah kelenjar getah bening di leher Anda membengkak?              |
| G020 | Gigi berlubang terlihat              | Apakah ada lubang yang terlihat pada gigi Anda?                     |
| G021 | Ada benjolan berisi nanah di gusi    | Apakah ada benjolan yang berisi nanah (bisul) pada gusi Anda?       |
| G022 | Gusi berubah warna keabu-abuan       | Apakah gusi Anda berubah warna menjadi keabu-abuan?                 |
| G023 | Jaringan gusi rusak/berlubang        | Apakah ada bagian gusi yang tampak rusak atau berlubang?            |
| G024 | Rasa tidak enak di mulut             | Apakah ada rasa tidak enak (logam/busuk) di mulut Anda?             |
| G025 | Sulit membuka mulut                  | Apakah Anda kesulitan membuka mulut lebar?                          |

#### 2.2.3 Data Pengobatan

Setiap penyakit dilengkapi dengan saran pengobatan yang diperoleh dari pakar:

| Penyakit              | Saran Pengobatan                                                                                                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Gingivitis            | Menjaga kebersihan mulut dengan menyikat gigi 2x sehari, menggunakan benang gigi, dan berkumur dengan obat kumur antiseptik. Lakukan pembersihan karang gigi (scaling) oleh dokter gigi.                     |
| Periodontitis         | Scaling dan root planing untuk membersihkan bakteri di bawah gusi. Antibiotik mungkin diperlukan. Pada kasus parah, operasi gusi mungkin diperlukan. Konsultasikan dengan dokter gigi spesialis periodonsia. |
| Pulpitis Reversible   | Menghilangkan penyebab iritasi seperti tambalan gigi yang bocor atau karies. Penambalan gigi yang tepat. Hindari makanan dan minuman yang terlalu panas, dingin, atau manis.                                 |
| Pulpitis Irreversible | Perawatan saluran akar (root canal treatment) untuk mengangkat jaringan pulpa yang terinfeksi. Jika gigi tidak dapat dipertahankan, pencabutan gigi mungkin diperlukan.                                      |
| Abses Periapeks       | Drainase abses untuk mengeluarkan nanah. Perawatan saluran akar atau pencabutan gigi. Antibiotik untuk mengatasi infeksi. Kompres hangat untuk mengurangi bengkak.                                           |
| Abses Periodontal     | Drainase abses dan pembersihan kantong periodontal. Scaling dan root planing. Antibiotik jika diperlukan. Perawatan periodontal lebih lanjut mungkin diperlukan.                                             |
| Abses Gingival        | Menghilangkan penyebab seperti benda asing atau sisa makanan. Drainase abses jika diperlukan. Berkumur dengan air garam hangat. Antibiotik jika infeksi menyebar.                                            |
| Trench Mouth (ANUG)   | Pembersihan profesional oleh dokter gigi. Antibiotik (metronidazole). Obat kumur antibakteri (chlorhexidine). Pereda nyeri. Perbaikan nutrisi dan istirahat yang cukup.                                      |

---

## BAB 3: REPRESENTASI PENGETAHUAN

### 3.1 Teknik Representasi Pengetahuan

Representasi pengetahuan bertujuan untuk mengembangkan suatu struktur yang akan membantu pengkodean pengetahuan ke dalam program. Dalam penelitian ini, basis pengetahuan direpresentasikan menggunakan **Kaidah Produksi (Production Rules)** dalam format IF-THEN.

Format kaidah produksi yang digunakan:

```
IF Gejala1 AND Gejala2 AND ... AND GejalaN THEN Penyakit (dengan tingkat kepastian X%)
```

Kaidah produksi merupakan statemen dua bagian yang disatukan menjadi sepenggal kecil pengetahuan:

- **Bagian IF (Antecedent/Premis)**: Menyatakan kondisi atau gejala-gejala yang dialami
- **Bagian THEN (Consequent/Konklusi)**: Menyatakan kesimpulan berupa penyakit yang diderita

### 3.2 Sistem Pembobotan

Untuk meningkatkan akurasi diagnosa, setiap gejala diberikan bobot terhadap penyakit tertentu. Bobot menunjukkan tingkat kepentingan gejala dalam menentukan suatu penyakit. Skala bobot yang digunakan adalah 1-5:

| Bobot | Keterangan                   |
| ----- | ---------------------------- |
| 1     | Kurang penting               |
| 2     | Cukup penting                |
| 3     | Penting                      |
| 4     | Sangat penting               |
| 5     | Paling penting (gejala khas) |

### 3.3 Hasil Representasi Pengetahuan

#### 3.3.1 Basis Aturan (Rule Base)

Berikut adalah representasi aturan dalam format IF-THEN untuk setiap penyakit:

**Aturan 1: Gingivitis (P001)**

```
IF  Gusi berwarna merah (G001) [bobot: 3]
AND Gusi membengkak (G002) [bobot: 3]
AND Gusi terasa nyeri (G003) [bobot: 2]
AND Gusi terasa lunak (G004) [bobot: 2]
AND Pendarahan saat menyikat gigi (G005) [bobot: 4]
AND Bau mulut tidak sedap (G009) [bobot: 2]
THEN Gingivitis
```

**Aturan 2: Periodontitis (P002)**

```
IF  Gusi berwarna merah (G001) [bobot: 2]
AND Gusi membengkak (G002) [bobot: 2]
AND Pendarahan saat menyikat gigi (G005) [bobot: 3]
AND Keluar nanah dari gusi (G006) [bobot: 4]
AND Gusi menyusut/turun (G007) [bobot: 5]
AND Gigi goyang (G008) [bobot: 5]
AND Bau mulut tidak sedap (G009) [bobot: 3]
THEN Periodontitis
```

**Aturan 3: Pulpitis Reversible (P003)**

```
IF  Gigi sensitif terhadap dingin (G010) [bobot: 5]
AND Gigi sensitif terhadap manis (G012) [bobot: 4]
AND Gigi berlubang terlihat (G020) [bobot: 3]
THEN Pulpitis Reversible
```

**Aturan 4: Pulpitis Irreversible (P004)**

```
IF  Gigi sensitif terhadap dingin (G010) [bobot: 3]
AND Gigi sensitif terhadap panas (G011) [bobot: 4]
AND Nyeri gigi spontan (G013) [bobot: 5]
AND Nyeri gigi berdenyut (G014) [bobot: 5]
AND Nyeri gigi bertambah saat malam (G015) [bobot: 4]
AND Gigi berlubang terlihat (G020) [bobot: 3]
THEN Pulpitis Irreversible
```

**Aturan 5: Abses Periapeks (P005)**

```
IF  Nyeri gigi berdenyut (G014) [bobot: 4]
AND Nyeri gigi saat mengunyah (G016) [bobot: 4]
AND Bengkak di wajah/pipi (G017) [bobot: 5]
AND Demam (G018) [bobot: 3]
AND Kelenjar getah bening membengkak (G019) [bobot: 3]
AND Ada benjolan berisi nanah di gusi (G021) [bobot: 5]
THEN Abses Periapeks
```

**Aturan 6: Abses Periodontal (P006)**

```
IF  Gusi membengkak (G002) [bobot: 3]
AND Gusi terasa nyeri (G003) [bobot: 3]
AND Keluar nanah dari gusi (G006) [bobot: 5]
AND Gigi goyang (G008) [bobot: 4]
AND Nyeri gigi saat mengunyah (G016) [bobot: 3]
AND Ada benjolan berisi nanah di gusi (G021) [bobot: 5]
THEN Abses Periodontal
```

**Aturan 7: Abses Gingival (P007)**

```
IF  Gusi membengkak (G002) [bobot: 4]
AND Gusi terasa nyeri (G003) [bobot: 4]
AND Keluar nanah dari gusi (G006) [bobot: 4]
AND Ada benjolan berisi nanah di gusi (G021) [bobot: 5]
THEN Abses Gingival
```

**Aturan 8: Trench Mouth/ANUG (P008)**

```
IF  Gusi berwarna merah (G001) [bobot: 3]
AND Gusi membengkak (G002) [bobot: 3]
AND Gusi terasa nyeri (G003) [bobot: 4]
AND Pendarahan saat menyikat gigi (G005) [bobot: 4]
AND Bau mulut tidak sedap (G009) [bobot: 5]
AND Demam (G018) [bobot: 3]
AND Gusi berubah warna keabu-abuan (G022) [bobot: 5]
AND Jaringan gusi rusak/berlubang (G023) [bobot: 5]
AND Rasa tidak enak di mulut (G024) [bobot: 4]
THEN Trench Mouth (ANUG)
```

#### 3.3.2 Tabel Relasi Penyakit-Gejala

Berikut adalah tabel relasi lengkap antara penyakit dan gejala beserta bobotnya:

| Penyakit | G001 | G002 | G003 | G004 | G005 | G006 | G007 | G008 | G009 | G010 | G011 | G012 | G013 | G014 | G015 | G016 | G017 | G018 | G019 | G020 | G021 | G022 | G023 | G024 |
| -------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| P001     | 3    | 3    | 2    | 2    | 4    | -    | -    | -    | 2    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    |
| P002     | 2    | 2    | -    | -    | 3    | 4    | 5    | 5    | 3    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    |
| P003     | -    | -    | -    | -    | -    | -    | -    | -    | -    | 5    | -    | 4    | -    | -    | -    | -    | -    | -    | -    | 3    | -    | -    | -    | -    |
| P004     | -    | -    | -    | -    | -    | -    | -    | -    | -    | 3    | 4    | -    | 5    | 5    | 4    | -    | -    | -    | -    | 3    | -    | -    | -    | -    |
| P005     | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | 4    | -    | 4    | 5    | 3    | 3    | -    | 5    | -    | -    | -    |
| P006     | -    | 3    | 3    | -    | -    | 5    | -    | 4    | -    | -    | -    | -    | -    | -    | -    | 3    | -    | -    | -    | -    | 5    | -    | -    | -    |
| P007     | -    | 4    | 4    | -    | -    | 4    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | -    | 5    | -    | -    | -    |
| P008     | 3    | 3    | 4    | -    | 4    | -    | -    | -    | 5    | -    | -    | -    | -    | -    | -    | -    | -    | 3    | -    | -    | -    | 5    | 5    | 4    |

---

## BAB 4: INFERENSI PENGETAHUAN

### 4.1 Metode Inferensi

Motor inferensi (inference engine) adalah bagian yang mengandung mekanisme fungsi berpikir dan pola-pola penalaran sistem yang digunakan oleh seorang pakar (Turban, 1995). Dalam sistem pakar ini, metode inferensi yang digunakan adalah **Backward Chaining** dengan teknik penelusuran **Depth First Search**.

#### 4.1.1 Backward Chaining

Backward chaining adalah metode penalaran yang dimulai dari hipotesis (kesimpulan) terlebih dahulu, kemudian dicari fakta-fakta yang mendukung hipotesis tersebut. Dalam konteks sistem pakar diagnosa penyakit gigi:

1. **Hipotesis**: Daftar penyakit gigi (P001-P008)
2. **Fakta**: Gejala-gejala yang dialami pengguna (G001-G025)

Proses backward chaining:

1. Sistem memulai dengan hipotesis (daftar penyakit)
2. Untuk setiap penyakit, sistem mencari gejala-gejala yang terkait
3. Sistem mencocokkan gejala yang terkait dengan gejala yang dialami pengguna
4. Dihitung tingkat kepastian berdasarkan gejala yang cocok

#### 4.1.2 Depth First Search (DFS)

Depth First Search adalah teknik penelusuran yang dimulai dari simpul akar dan bergerak ke bawah ke tingkat dalam yang berurutan. Proses ini berlangsung terus sampai kesimpulan ditemukan, atau jika menemui jalan buntu akan melacak ke belakang (backtracking).

Dalam implementasi sistem ini:

1. Pengguna menjawab pertanyaan gejala secara berurutan
2. Jika pengguna menjawab "Ya" pada suatu gejala, sistem memprioritaskan gejala-gejala lain yang terkait dengan penyakit yang sama
3. Proses berlanjut hingga data cukup untuk membuat diagnosa

### 4.2 Algoritma Inferensi

```
ALGORITMA DIAGNOSA:

Input: gejalaIds[] (array ID gejala yang dialami pengguna)
Output: results[] (array hasil diagnosa dengan nilai kepastian)

1. Ambil semua data penyakit dari basis pengetahuan
2. Ambil semua aturan (relasi penyakit-gejala) dari basis pengetahuan

3. Untuk setiap penyakit P dalam daftar penyakit:
   a. Ambil semua aturan yang terkait dengan penyakit P
   b. Jika tidak ada aturan untuk P, lanjut ke penyakit berikutnya

   c. Inisialisasi:
      - gejalacocok[] = []
      - totalBobot = 0
      - bobotCocok = 0

   d. Untuk setiap aturan A yang terkait dengan P:
      - totalBobot += A.bobot
      - Jika A.gejalaId ada dalam gejalaIds:
        * Tambahkan nama gejala ke gejalacocok[]
        * bobotCocok += A.bobot

   e. Hitung nilai kepastian:
      nilaiKepastian = (bobotCocok / totalBobot) * 100

   f. Jika gejalacocok tidak kosong:
      Tambahkan hasil ke results[] dengan format:
      {penyakit: P, nilaiKepastian, gejalacocok, totalGejala}

4. Urutkan results[] berdasarkan nilaiKepastian (tertinggi ke terendah)
5. Return results[]
```

### 4.3 Formula Perhitungan Nilai Kepastian

Nilai kepastian dihitung berdasarkan rasio bobot gejala yang cocok terhadap total bobot gejala yang seharusnya ada untuk suatu penyakit:

$$\text{Nilai Kepastian} = \frac{\sum_{i=1}^{n} \text{Bobot Gejala Cocok}_i}{\sum_{j=1}^{m} \text{Total Bobot Gejala Penyakit}_j} \times 100\%$$

Dimana:

- n = jumlah gejala yang cocok (dialami pengguna)
- m = jumlah total gejala yang terkait dengan penyakit

### 4.4 Contoh Proses Inferensi

**Skenario**: Pengguna mengalami gejala berikut:

- G001: Gusi berwarna merah
- G002: Gusi membengkak
- G005: Pendarahan saat menyikat gigi

**Proses Backward Chaining untuk Gingivitis (P001):**

1. Aturan Gingivitis memiliki gejala: G001(3), G002(3), G003(2), G004(2), G005(4), G009(2)
2. Total bobot = 3 + 3 + 2 + 2 + 4 + 2 = 16
3. Gejala yang cocok: G001(3), G002(3), G005(4)
4. Bobot cocok = 3 + 3 + 4 = 10
5. Nilai kepastian = (10/16) × 100% = 62.5%

**Proses Backward Chaining untuk Periodontitis (P002):**

1. Aturan Periodontitis memiliki gejala: G001(2), G002(2), G005(3), G006(4), G007(5), G008(5), G009(3)
2. Total bobot = 2 + 2 + 3 + 4 + 5 + 5 + 3 = 24
3. Gejala yang cocok: G001(2), G002(2), G005(3)
4. Bobot cocok = 2 + 2 + 3 = 7
5. Nilai kepastian = (7/24) × 100% = 29.2%

**Hasil**: Sistem akan menampilkan Gingivitis sebagai diagnosa utama dengan nilai kepastian 62.5%, dan Periodontitis sebagai kemungkinan kedua dengan nilai kepastian 29.2%.

---

## BAB 5: UJI COBA DAN SIMPULAN

### 5.1 Skenario Uji Coba

Untuk menguji keandalan sistem pakar, dilakukan uji coba dengan memasukkan fakta-fakta baru (gejala) dan mengamati hasil diagnosa yang dihasilkan.

#### 5.1.1 Uji Coba Kasus 1: Gingivitis

**Fakta (Gejala yang dialami):**

- G001: Gusi berwarna merah ✓
- G002: Gusi membengkak ✓
- G003: Gusi terasa nyeri ✓
- G004: Gusi terasa lunak ✓
- G005: Pendarahan saat menyikat gigi ✓
- G009: Bau mulut tidak sedap ✓

**Proses Inferensi:**

| Penyakit             | Gejala Cocok                       | Total Bobot | Bobot Cocok | Nilai Kepastian |
| -------------------- | ---------------------------------- | ----------- | ----------- | --------------- |
| Gingivitis (P001)    | G001, G002, G003, G004, G005, G009 | 16          | 16          | 100%            |
| Periodontitis (P002) | G001, G002, G005, G009             | 24          | 10          | 41.7%           |
| Trench Mouth (P008)  | G001, G002, G003, G005, G009       | 36          | 19          | 52.8%           |

**Hasil Diagnosa:** Gingivitis dengan nilai kepastian 100%

**Saran Pengobatan:** Menjaga kebersihan mulut dengan menyikat gigi 2x sehari, menggunakan benang gigi, dan berkumur dengan obat kumur antiseptik. Lakukan pembersihan karang gigi (scaling) oleh dokter gigi.

---

#### 5.1.2 Uji Coba Kasus 2: Pulpitis Irreversible

**Fakta (Gejala yang dialami):**

- G010: Gigi sensitif terhadap dingin ✓
- G011: Gigi sensitif terhadap panas ✓
- G013: Nyeri gigi spontan ✓
- G014: Nyeri gigi berdenyut ✓
- G015: Nyeri gigi bertambah saat malam ✓
- G020: Gigi berlubang terlihat ✓

**Proses Inferensi:**

| Penyakit                     | Gejala Cocok                       | Total Bobot | Bobot Cocok | Nilai Kepastian |
| ---------------------------- | ---------------------------------- | ----------- | ----------- | --------------- |
| Pulpitis Irreversible (P004) | G010, G011, G013, G014, G015, G020 | 24          | 24          | 100%            |
| Pulpitis Reversible (P003)   | G010, G020                         | 12          | 8           | 66.7%           |
| Abses Periapeks (P005)       | G014                               | 24          | 4           | 16.7%           |

**Hasil Diagnosa:** Pulpitis Irreversible dengan nilai kepastian 100%

**Saran Pengobatan:** Perawatan saluran akar (root canal treatment) untuk mengangkat jaringan pulpa yang terinfeksi. Jika gigi tidak dapat dipertahankan, pencabutan gigi mungkin diperlukan.

---

#### 5.1.3 Uji Coba Kasus 3: Abses Periapeks

**Fakta (Gejala yang dialami):**

- G014: Nyeri gigi berdenyut ✓
- G016: Nyeri gigi saat mengunyah ✓
- G017: Bengkak di wajah/pipi ✓
- G018: Demam ✓
- G021: Ada benjolan berisi nanah di gusi ✓

**Proses Inferensi:**

| Penyakit                     | Gejala Cocok                 | Total Bobot | Bobot Cocok | Nilai Kepastian |
| ---------------------------- | ---------------------------- | ----------- | ----------- | --------------- |
| Abses Periapeks (P005)       | G014, G016, G017, G018, G021 | 24          | 21          | 87.5%           |
| Abses Periodontal (P006)     | G016, G021                   | 23          | 8           | 34.8%           |
| Pulpitis Irreversible (P004) | G014                         | 24          | 5           | 20.8%           |

**Hasil Diagnosa:** Abses Periapeks dengan nilai kepastian 87.5%

**Saran Pengobatan:** Drainase abses untuk mengeluarkan nanah. Perawatan saluran akar atau pencabutan gigi. Antibiotik untuk mengatasi infeksi. Kompres hangat untuk mengurangi bengkak.

---

#### 5.1.4 Uji Coba Kasus 4: Trench Mouth (ANUG)

**Fakta (Gejala yang dialami):**

- G001: Gusi berwarna merah ✓
- G002: Gusi membengkak ✓
- G003: Gusi terasa nyeri ✓
- G005: Pendarahan saat menyikat gigi ✓
- G009: Bau mulut sangat tidak sedap ✓
- G022: Gusi berubah warna keabu-abuan ✓
- G023: Jaringan gusi rusak/berlubang ✓
- G024: Rasa tidak enak di mulut ✓

**Proses Inferensi:**

| Penyakit             | Gejala Cocok                                   | Total Bobot | Bobot Cocok | Nilai Kepastian |
| -------------------- | ---------------------------------------------- | ----------- | ----------- | --------------- |
| Trench Mouth (P008)  | G001, G002, G003, G005, G009, G022, G023, G024 | 36          | 33          | 91.7%           |
| Gingivitis (P001)    | G001, G002, G003, G005, G009                   | 16          | 14          | 87.5%           |
| Periodontitis (P002) | G001, G002, G005, G009                         | 24          | 10          | 41.7%           |

**Hasil Diagnosa:** Trench Mouth (ANUG) dengan nilai kepastian 91.7%

**Saran Pengobatan:** Pembersihan profesional oleh dokter gigi. Antibiotik (metronidazole). Obat kumur antibakteri (chlorhexidine). Pereda nyeri. Perbaikan nutrisi dan istirahat yang cukup.

---

### 5.2 Analisis Hasil Uji Coba

Berdasarkan hasil uji coba yang telah dilakukan, dapat dianalisis bahwa:

1. **Akurasi Diagnosa**: Sistem mampu memberikan diagnosa yang akurat ketika gejala-gejala yang dimasukkan lengkap. Semakin banyak gejala khas yang dipilih, semakin tinggi nilai kepastian diagnosa.

2. **Pembedaan Penyakit Serupa**: Sistem dapat membedakan penyakit-penyakit yang memiliki gejala serupa (seperti Gingivitis dan Trench Mouth) berdasarkan gejala-gejala khas yang memiliki bobot tinggi.

3. **Multiple Diagnosis**: Sistem memberikan beberapa kemungkinan diagnosa dengan nilai kepastian masing-masing, sehingga pengguna mendapat gambaran yang lebih komprehensif.

4. **Reliability**: Metode backward chaining dengan sistem pembobotan terbukti efektif dalam memberikan hasil yang konsisten dan dapat diandalkan.

### 5.3 Simpulan

Berdasarkan penelitian yang telah dilakukan, dapat ditarik simpulan sebagai berikut:

1. **Sistem pakar diagnosa penyakit gigi** telah berhasil dikembangkan menggunakan metode Backward Chaining dengan teknik penelusuran Depth First Search. Sistem mampu melakukan diagnosa terhadap 8 jenis penyakit gigi berdasarkan 25 gejala yang tersimpan dalam basis pengetahuan.

2. **Representasi pengetahuan** menggunakan kaidah produksi (IF-THEN) dengan sistem pembobotan memungkinkan sistem untuk memberikan diagnosa dengan tingkat kepastian yang terukur dalam bentuk persentase.

3. **Sistem berbasis web** memudahkan akses bagi pengguna dari berbagai perangkat. Antarmuka yang intuitif dengan format tanya-jawab membuat proses konsultasi mudah dipahami oleh masyarakat awam.

4. **Fitur manajemen basis pengetahuan** memungkinkan admin atau dokter untuk memperbarui data penyakit, gejala, dan aturan, sehingga sistem dapat terus berkembang mengikuti perkembangan ilmu kedokteran gigi.

5. **Penyimpanan riwayat konsultasi** memberikan nilai tambah bagi pengguna untuk melakukan tracking kondisi kesehatan gigi dari waktu ke waktu.

6. Sistem ini **tidak dimaksudkan untuk menggantikan diagnosa dokter gigi profesional**, melainkan sebagai alat bantu untuk identifikasi awal sehingga pengguna dapat mempersiapkan diri sebelum berkonsultasi dengan dokter gigi.

---

## BAB 6: RANCANGAN USER INTERFACE / PROTOTYPE

### 6.1 Arsitektur Sistem

Sistem pakar diagnosa penyakit gigi dikembangkan menggunakan arsitektur modern berbasis web dengan teknologi:

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL dengan Drizzle ORM
- **Authentication**: Better Auth

### 6.2 Struktur Halaman

Sistem terdiri dari beberapa halaman utama:

1. **Halaman Autentikasi** (Login & Register)
2. **Dashboard** - Halaman utama setelah login
3. **Konsultasi** - Halaman untuk melakukan diagnosa
4. **Riwayat** - Halaman riwayat konsultasi
5. **Admin Panel** - Halaman pengelolaan data (khusus admin/dokter)

### 6.3 Desain Antarmuka

#### 6.3.1 Halaman Login

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    [ICON: Stethoscope]                      │
│                                                             │
│                         MASUK                               │
│              Sistem Pakar Diagnosa Penyakit Gigi            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Email                                                │   │
│  │ ┌─────────────────────────────────────────────────┐ │   │
│  │ │ nama@email.com                                  │ │   │
│  │ └─────────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  │ Password                                             │   │
│  │ ┌─────────────────────────────────────────────────┐ │   │
│  │ │ ••••••••                                        │ │   │
│  │ └─────────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  │ ┌─────────────────────────────────────────────────┐ │   │
│  │ │                    MASUK                         │ │   │
│  │ └─────────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  │       Belum punya akun? Daftar                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 6.3.2 Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ┌─────────────┐                                                              │
│ │  SIDEBAR    │   Dashboard                                                  │
│ │             │   Selamat datang, [Nama User]!                              │
│ │ Dashboard   │                                                              │
│ │ Konsultasi  │   ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐│
│ │ Riwayat     │   │ 🩺 Mulai         │ │ 📋 Riwayat      │ │ 📊 Basis     ││
│ │             │   │ Konsultasi       │ │ Konsultasi      │ │ Pengetahuan  ││
│ │ ─────────── │   │                  │ │                  │ │              ││
│ │ ADMIN       │   │ Diagnosa penyakit│ │ 5 kali konsultasi│ │ 8 penyakit   ││
│ │ Penyakit    │   │ gigi Anda        │ │                  │ │ 25 gejala    ││
│ │ Gejala      │   │                  │ │                  │ │              ││
│ │ Aturan      │   │ [Mulai Sekarang] │ │ [Lihat Riwayat] │ │ [Kelola Data]││
│ │ Users       │   └──────────────────┘ └──────────────────┘ └──────────────┘│
│ │             │                                                              │
│ │             │   Konsultasi Terakhir                                        │
│ │             │   ┌────────────────────────────────────────────────────────┐│
│ │             │   │ Gingivitis                           │ 85% yakin      ││
│ │             │   │ 5 Januari 2026                       │                 ││
│ │             │   ├────────────────────────────────────────────────────────┤│
│ │             │   │ Pulpitis Reversible                  │ 67% yakin      ││
│ │             │   │ 3 Januari 2026                       │                 ││
│ │ [Logout]    │   └────────────────────────────────────────────────────────┘│
│ └─────────────┘                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 6.3.3 Halaman Konsultasi - Welcome

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    [ICON: Stethoscope]                      │
│                                                             │
│              Konsultasi Penyakit Gigi                       │
│         Sistem Pakar untuk Mendiagnosa Penyakit Gigi        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 Petunjuk Konsultasi                  │   │
│  │                                                      │   │
│  │  ① Jawab Pertanyaan                                 │   │
│  │     Sistem akan menanyakan gejala-gejala yang       │   │
│  │     Anda alami                                       │   │
│  │                                                      │   │
│  │  ② Proses Diagnosa                                  │   │
│  │     Sistem akan menganalisis gejala menggunakan     │   │
│  │     metode Backward Chaining                         │   │
│  │                                                      │   │
│  │  ③ Hasil Diagnosa                                   │   │
│  │     Dapatkan hasil diagnosa beserta tingkat         │   │
│  │     kepastian dan saran pengobatan                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│              ┌──────────────────────────┐                  │
│              │   Mulai Konsultasi   →   │                  │
│              └──────────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 6.3.4 Halaman Konsultasi - Pertanyaan

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Konsultasi                                                 │
│  Jawab pertanyaan berikut dengan jujur                      │
│                                                             │
│  Pertanyaan 3 dari 25                              12%      │
│  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░          │
│                                                             │
│  ┌────────────┐  ┌────────────┐                            │
│  │ ✓ Ya: 2    │  │ ✗ Tidak: 0 │                            │
│  └────────────┘  └────────────┘                            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │     Apakah gusi Anda terasa nyeri atau sakit?       │   │
│  │                                                      │   │
│  │                 Kode Gejala: G003                    │   │
│  │                                                      │   │
│  │     ┌──────────────┐    ┌──────────────┐            │   │
│  │     │   ✓  YA      │    │   ✗ TIDAK    │            │   │
│  │     └──────────────┘    └──────────────┘            │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│           Selesaikan konsultasi sekarang →                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 6.3.5 Halaman Hasil Diagnosa

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                          [ICON: CheckCircle]                                 │
│                                                                              │
│                          Hasil Diagnosa                                      │
│                  Berdasarkan gejala yang Anda alami                          │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                     Ringkasan Konsultasi                                │ │
│  │  ┌───────────────────────┐  ┌───────────────────────┐                  │ │
│  │  │          5            │  │          3            │                  │ │
│  │  │   Gejala Dialami      │  │ Gejala Tidak Dialami  │                  │ │
│  │  └───────────────────────┘  └───────────────────────┘                  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  ┌─────────────┐                                                        │ │
│  │  │Diagnosa Utama│                                         85%          │ │
│  │  └─────────────┘                                    Tingkat Kepastian   │ │
│  │  Gingivitis                                                             │ │
│  │  Kode: P001                                                             │ │
│  │                                                                          │ │
│  │  Nilai Kepastian  ████████████████████░░░░  85%                        │ │
│  │                                                                          │ │
│  │  Deskripsi:                                                             │ │
│  │  Peradangan pada gusi yang disebabkan oleh penumpukan plak. Gusi       │ │
│  │  menjadi merah, bengkak, dan mudah berdarah saat menyikat gigi.        │ │
│  │                                                                          │ │
│  │  Gejala Cocok:                                                          │ │
│  │  ┌────────────────┐ ┌─────────────┐ ┌──────────────────────┐           │ │
│  │  │Gusi merah      │ │Gusi bengkak │ │Pendarahan saat sikat │           │ │
│  │  └────────────────┘ └─────────────┘ └──────────────────────┘           │ │
│  │  5 dari 6 gejala cocok                                                  │ │
│  │                                                                          │ │
│  │  ┌────────────────────────────────────────────────────────────────┐    │ │
│  │  │ 💊 Saran Pengobatan                                             │    │ │
│  │  │ Menjaga kebersihan mulut dengan menyikat gigi 2x sehari,       │    │ │
│  │  │ menggunakan benang gigi, dan berkumur dengan obat kumur        │    │ │
│  │  │ antiseptik. Lakukan pembersihan karang gigi (scaling).         │    │ │
│  │  └────────────────────────────────────────────────────────────────┘    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ ⚠️ Penting!                                                            │ │
│  │ Hasil diagnosa ini merupakan panduan awal dan tidak menggantikan       │ │
│  │ konsultasi dengan dokter gigi profesional.                             │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│         ┌──────────────────┐    ┌──────────────────┐                        │
│         │ 🔄 Konsultasi Baru│    │   Lihat Riwayat  │                        │
│         └──────────────────┘    └──────────────────┘                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 6.3.6 Halaman Admin - Kelola Penyakit

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ┌─────────────┐                                                              │
│ │  SIDEBAR    │   Kelola Penyakit                        [+ Tambah Penyakit]│
│ │             │   Tambah, edit, dan hapus data penyakit gigi                │
│ │ Dashboard   │                                                              │
│ │ Konsultasi  │   ┌────────────────────────────────────────────────────────┐│
│ │ Riwayat     │   │ 💊 Daftar Penyakit                                      ││
│ │             │   │    Total 8 penyakit terdaftar                          ││
│ │ ─────────── │   ├────────────────────────────────────────────────────────┤│
│ │ ADMIN       │   │ Kode  │ Nama Penyakit      │ Deskripsi  │ Gejala │ Aksi││
│ │ Penyakit ← │   ├───────┼────────────────────┼────────────┼────────┼─────┤│
│ │ Gejala      │   │ P001  │ Gingivitis         │ Peradangan │ 6      │Edit ││
│ │ Aturan      │   │       │                    │ pada gusi..│ gejala │Hapus││
│ │ Users       │   ├───────┼────────────────────┼────────────┼────────┼─────┤│
│ │             │   │ P002  │ Periodontitis      │ Infeksi    │ 7      │Edit ││
│ │             │   │       │                    │ gusi serius│ gejala │Hapus││
│ │             │   ├───────┼────────────────────┼────────────┼────────┼─────┤│
│ │             │   │ P003  │ Pulpitis Reversible│ Peradangan │ 3      │Edit ││
│ │             │   │       │                    │ ringan..   │ gejala │Hapus││
│ │             │   ├───────┼────────────────────┼────────────┼────────┼─────┤│
│ │             │   │ P004  │ Pulpitis Irreversib│ Peradangan │ 6      │Edit ││
│ │             │   │       │                    │ parah..    │ gejala │Hapus││
│ │ [Logout]    │   └────────────────────────────────────────────────────────┘│
│ └─────────────┘                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 6.3.7 Halaman Admin - Kelola Aturan (Basis Aturan)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ┌─────────────┐                                                              │
│ │  SIDEBAR    │   Kelola Basis Aturan                      [+ Tambah Aturan]│
│ │             │   Aturan IF-THEN untuk menghubungkan gejala dengan penyakit │
│ │ Dashboard   │                                                              │
│ │ Konsultasi  │   ┌────────────────────────────────────────────────────────┐│
│ │ Riwayat     │   │ ℹ️ Tentang Basis Aturan                                 ││
│ │             │   │ Basis aturan menggunakan format IF-THEN. Contoh:       ││
│ │ ─────────── │   │ IF [Gusi merah] AND [Gusi bengkak] THEN [Gingivitis]   ││
│ │ ADMIN       │   └────────────────────────────────────────────────────────┘│
│ │ Penyakit    │                                                              │
│ │ Gejala      │   ┌────────────────────────────────────────────────────────┐│
│ │ Aturan    ← │   │ P001 - Gingivitis                                       ││
│ │ Users       │   │ 6 gejala terkait                                        ││
│ │             │   ├────────────────────────────────────────────────────────┤│
│ │             │   │ Kode   │ Nama Gejala                    │ Bobot │ Aksi ││
│ │             │   ├────────┼────────────────────────────────┼───────┼──────┤│
│ │             │   │ G001   │ Gusi berwarna merah            │  3    │ Edit ││
│ │             │   │        │                                │       │ Hapus││
│ │             │   ├────────┼────────────────────────────────┼───────┼──────┤│
│ │             │   │ G002   │ Gusi membengkak                │  3    │ Edit ││
│ │             │   │        │                                │       │ Hapus││
│ │             │   ├────────┼────────────────────────────────┼───────┼──────┤│
│ │             │   │ G005   │ Pendarahan saat menyikat gigi  │  4    │ Edit ││
│ │ [Logout]    │   │        │                                │       │ Hapus││
│ └─────────────┘   └────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.4 Alur Penggunaan Sistem

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                          ALUR PENGGUNAAN SISTEM                              │
│                                                                              │
│   ┌─────────┐    ┌─────────┐    ┌─────────────┐    ┌─────────────────┐     │
│   │  Login  │───▶│Dashboard│───▶│ Konsultasi  │───▶│ Jawab Pertanyaan│     │
│   └─────────┘    └─────────┘    └─────────────┘    └────────┬────────┘     │
│                                                              │               │
│                                                              ▼               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     Proses Backward Chaining                         │   │
│   │                                                                       │   │
│   │  1. Ambil semua penyakit (hipotesis)                                 │   │
│   │  2. Untuk setiap penyakit, cari gejala terkait                       │   │
│   │  3. Cocokkan dengan gejala yang dijawab "Ya"                         │   │
│   │  4. Hitung nilai kepastian berdasarkan bobot                         │   │
│   │  5. Urutkan hasil dari nilai kepastian tertinggi                     │   │
│   │                                                                       │   │
│   └────────────────────────────────┬────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│   ┌─────────────────┐    ┌────────────────┐    ┌──────────────────────┐    │
│   │  Hasil Diagnosa │───▶│Saran Pengobatan│───▶│ Simpan ke Riwayat    │    │
│   │  + % Kepastian  │    │                │    │                      │    │
│   └─────────────────┘    └────────────────┘    └──────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.5 Fitur Utama Sistem

| No  | Fitur                             | Deskripsi                                                      |
| --- | --------------------------------- | -------------------------------------------------------------- |
| 1   | Autentikasi                       | Login dan registrasi pengguna dengan role (user/admin/dokter)  |
| 2   | Konsultasi Interaktif             | Sistem tanya-jawab untuk mengumpulkan gejala                   |
| 3   | Diagnosa dengan Backward Chaining | Proses inferensi menggunakan metode backward chaining          |
| 4   | Nilai Kepastian                   | Perhitungan persentase kepastian berdasarkan bobot gejala      |
| 5   | Saran Pengobatan                  | Rekomendasi pengobatan untuk setiap penyakit                   |
| 6   | Riwayat Konsultasi                | Penyimpanan dan tampilan riwayat konsultasi pengguna           |
| 7   | Manajemen Penyakit                | CRUD data penyakit (khusus admin)                              |
| 8   | Manajemen Gejala                  | CRUD data gejala (khusus admin)                                |
| 9   | Manajemen Aturan                  | CRUD aturan/relasi penyakit-gejala dengan bobot (khusus admin) |
| 10  | Manajemen User                    | Pengelolaan pengguna dan role (khusus admin)                   |

---

## DAFTAR PUSTAKA

1. Kusumadewi, S. (2003). _Artificial Intelligence (Teknik dan Aplikasinya)_. Yogyakarta: Graha Ilmu.

2. Turban, E. (1995). _Decision Support System and Expert System_ (4th ed.). New Jersey: Prentice-Hall, Inc.

3. Pressman, R. (2002). _Rekayasa Perangkat Lunak Pendekatan Praktisi_. Yogyakarta: Andi Offset.

4. Giarratano, J., & Riley, G. (1994). _Expert Systems Principles and Programming_. Boston: PWS Publishing Company.

5. McLeod, R. (1995). _Management Information Systems_ (6th ed.). New Jersey: Prentice-Hall, Inc.

---

_Laporan ini dibuat sebagai dokumentasi Sistem Pakar Diagnosa Penyakit Gigi berbasis Web menggunakan metode Backward Chaining._
