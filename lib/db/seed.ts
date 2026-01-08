import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { penyakit, gejala, aturan, user, account } from './schema';
import * as bcrypt from 'bcryptjs';
import { authClient } from '../auth-client';
import { auth } from '../auth';

async function seed() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  const db = drizzle(connection);

  console.log('🌱 Seeding database...\n');

  // Clear existing data
  console.log('Clearing existing data...');
  await db.delete(aturan);
  await db.delete(penyakit);
  await db.delete(gejala);

  // Seed Penyakit (Diseases) - Based on reference document
  console.log('Seeding penyakit (diseases)...');
  const penyakitData = [
    {
      id: 'P001',
      kode: 'P001',
      nama: 'Gingivitis',
      deskripsi:
        'Gingivitis adalah peradangan pada gusi yang disebabkan oleh penumpukan plak. Gusi menjadi merah, bengkak, dan mudah berdarah saat menyikat gigi.',
      pengobatan:
        'Menjaga kebersihan mulut dengan menyikat gigi 2x sehari, menggunakan benang gigi, dan berkumur dengan obat kumur antiseptik. Lakukan pembersihan karang gigi (scaling) oleh dokter gigi.',
    },
    {
      id: 'P002',
      kode: 'P002',
      nama: 'Periodontitis',
      deskripsi:
        'Periodontitis adalah infeksi gusi serius yang merusak jaringan lunak dan tulang penyangga gigi. Merupakan tahap lanjut dari gingivitis yang tidak diobati.',
      pengobatan:
        'Scaling dan root planing untuk membersihkan bakteri di bawah gusi. Antibiotik mungkin diperlukan. Pada kasus parah, operasi gusi mungkin diperlukan. Konsultasikan dengan dokter gigi spesialis periodonsia.',
    },
    {
      id: 'P003',
      kode: 'P003',
      nama: 'Pulpitis Reversible',
      deskripsi:
        'Pulpitis reversible adalah peradangan ringan pada pulpa gigi yang masih dapat sembuh. Ditandai dengan rasa ngilu saat terkena rangsangan dingin atau manis.',
      pengobatan:
        'Menghilangkan penyebab iritasi seperti tambalan gigi yang bocor atau karies. Penambalan gigi yang tepat. Hindari makanan dan minuman yang terlalu panas, dingin, atau manis.',
    },
    {
      id: 'P004',
      kode: 'P004',
      nama: 'Pulpitis Irreversible',
      deskripsi:
        'Pulpitis irreversible adalah peradangan parah pada pulpa gigi yang tidak dapat sembuh sendiri. Nyeri spontan dan berdenyut, terutama di malam hari.',
      pengobatan:
        'Perawatan saluran akar (root canal treatment) untuk mengangkat jaringan pulpa yang terinfeksi. Jika gigi tidak dapat dipertahankan, pencabutan gigi mungkin diperlukan.',
    },
    {
      id: 'P005',
      kode: 'P005',
      nama: 'Abses Periapeks',
      deskripsi:
        'Abses periapeks adalah infeksi yang terjadi di ujung akar gigi, biasanya akibat gigi berlubang yang tidak diobati atau trauma pada gigi.',
      pengobatan:
        'Drainase abses untuk mengeluarkan nanah. Perawatan saluran akar atau pencabutan gigi. Antibiotik untuk mengatasi infeksi. Kompres hangat untuk mengurangi bengkak.',
    },
    {
      id: 'P006',
      kode: 'P006',
      nama: 'Abses Periodontal',
      deskripsi:
        'Abses periodontal adalah infeksi yang terjadi pada gusi di samping akar gigi, biasanya terkait dengan penyakit periodontal.',
      pengobatan:
        'Drainase abses dan pembersihan kantong periodontal. Scaling dan root planing. Antibiotik jika diperlukan. Perawatan periodontal lebih lanjut mungkin diperlukan.',
    },
    {
      id: 'P007',
      kode: 'P007',
      nama: 'Abses Gingival',
      deskripsi:
        'Abses gingival adalah infeksi lokal pada gusi yang menyebabkan pembengkakan berisi nanah, biasanya disebabkan oleh benda asing yang tersangkut di gusi.',
      pengobatan:
        'Menghilangkan penyebab seperti benda asing atau sisa makanan. Drainase abses jika diperlukan. Berkumur dengan air garam hangat. Antibiotik jika infeksi menyebar.',
    },
    {
      id: 'P008',
      kode: 'P008',
      nama: 'Trench Mouth (ANUG)',
      deskripsi:
        'Trench mouth atau Acute Necrotizing Ulcerative Gingivitis adalah infeksi gusi yang parah dengan nekrosis jaringan gusi. Ditandai dengan bau mulut yang sangat tidak sedap.',
      pengobatan:
        'Pembersihan profesional oleh dokter gigi. Antibiotik (metronidazole). Obat kumur antibakteri (chlorhexidine). Pereda nyeri. Perbaikan nutrisi dan istirahat yang cukup.',
    },
  ];

  await db.insert(penyakit).values(penyakitData);
  console.log(`✓ Inserted ${penyakitData.length} penyakit`);

  // Seed Gejala (Symptoms) - Based on reference document
  console.log('Seeding gejala (symptoms)...');
  const gejalaData = [
    {
      id: 'G001',
      kode: 'G001',
      nama: 'Gusi berwarna merah (bukan pink)',
      pertanyaan: 'Apakah gusi Anda berwarna merah, bukan pink seperti biasa?',
    },
    {
      id: 'G002',
      kode: 'G002',
      nama: 'Gusi membengkak',
      pertanyaan: 'Apakah gusi Anda mengalami pembengkakan?',
    },
    {
      id: 'G003',
      kode: 'G003',
      nama: 'Gusi terasa nyeri',
      pertanyaan: 'Apakah gusi Anda terasa nyeri atau sakit?',
    },
    {
      id: 'G004',
      kode: 'G004',
      nama: 'Gusi terasa lunak/tidak kencang',
      pertanyaan: 'Apakah gusi Anda terasa lunak dan tidak kencang?',
    },
    {
      id: 'G005',
      kode: 'G005',
      nama: 'Pendarahan saat menyikat gigi',
      pertanyaan: 'Apakah gusi Anda berdarah saat menyikat gigi?',
    },
    {
      id: 'G006',
      kode: 'G006',
      nama: 'Keluar nanah dari gusi',
      pertanyaan: 'Apakah ada nanah yang keluar dari gusi Anda?',
    },
    {
      id: 'G007',
      kode: 'G007',
      nama: 'Gusi menyusut/turun',
      pertanyaan: 'Apakah gusi Anda tampak menyusut atau turun?',
    },
    {
      id: 'G008',
      kode: 'G008',
      nama: 'Gigi goyang',
      pertanyaan: 'Apakah ada gigi yang terasa goyang?',
    },
    {
      id: 'G009',
      kode: 'G009',
      nama: 'Bau mulut tidak sedap',
      pertanyaan: 'Apakah Anda mengalami bau mulut yang tidak sedap?',
    },
    {
      id: 'G010',
      kode: 'G010',
      nama: 'Gigi sensitif terhadap dingin',
      pertanyaan: 'Apakah gigi Anda sensitif/ngilu terhadap minuman dingin?',
    },
    {
      id: 'G011',
      kode: 'G011',
      nama: 'Gigi sensitif terhadap panas',
      pertanyaan: 'Apakah gigi Anda sensitif/ngilu terhadap minuman panas?',
    },
    {
      id: 'G012',
      kode: 'G012',
      nama: 'Gigi sensitif terhadap makanan manis',
      pertanyaan: 'Apakah gigi Anda sensitif/ngilu saat makan makanan manis?',
    },
    {
      id: 'G013',
      kode: 'G013',
      nama: 'Nyeri gigi spontan',
      pertanyaan:
        'Apakah Anda mengalami nyeri gigi yang muncul tiba-tiba tanpa sebab?',
    },
    {
      id: 'G014',
      kode: 'G014',
      nama: 'Nyeri gigi berdenyut',
      pertanyaan: 'Apakah nyeri gigi Anda terasa berdenyut-denyut?',
    },
    {
      id: 'G015',
      kode: 'G015',
      nama: 'Nyeri gigi bertambah saat malam',
      pertanyaan: 'Apakah nyeri gigi Anda bertambah parah di malam hari?',
    },
    {
      id: 'G016',
      kode: 'G016',
      nama: 'Nyeri gigi saat mengunyah',
      pertanyaan: 'Apakah gigi Anda terasa nyeri saat mengunyah makanan?',
    },
    {
      id: 'G017',
      kode: 'G017',
      nama: 'Bengkak di wajah/pipi',
      pertanyaan: 'Apakah ada pembengkakan di wajah atau pipi Anda?',
    },
    {
      id: 'G018',
      kode: 'G018',
      nama: 'Demam',
      pertanyaan: 'Apakah Anda mengalami demam?',
    },
    {
      id: 'G019',
      kode: 'G019',
      nama: 'Kelenjar getah bening membengkak',
      pertanyaan: 'Apakah kelenjar getah bening di leher Anda membengkak?',
    },
    {
      id: 'G020',
      kode: 'G020',
      nama: 'Gigi berlubang terlihat',
      pertanyaan: 'Apakah ada lubang yang terlihat pada gigi Anda?',
    },
    {
      id: 'G021',
      kode: 'G021',
      nama: 'Ada benjolan berisi nanah di gusi',
      pertanyaan:
        'Apakah ada benjolan yang berisi nanah (bisul) pada gusi Anda?',
    },
    {
      id: 'G022',
      kode: 'G022',
      nama: 'Gusi berubah warna keabu-abuan',
      pertanyaan: 'Apakah gusi Anda berubah warna menjadi keabu-abuan?',
    },
    {
      id: 'G023',
      kode: 'G023',
      nama: 'Jaringan gusi rusak/berlubang',
      pertanyaan: 'Apakah ada bagian gusi yang tampak rusak atau berlubang?',
    },
    {
      id: 'G024',
      kode: 'G024',
      nama: 'Rasa tidak enak di mulut',
      pertanyaan: 'Apakah ada rasa tidak enak (logam/busuk) di mulut Anda?',
    },
    {
      id: 'G025',
      kode: 'G025',
      nama: 'Sulit membuka mulut',
      pertanyaan: 'Apakah Anda kesulitan membuka mulut lebar?',
    },
  ];

  await db.insert(gejala).values(gejalaData);
  console.log(`✓ Inserted ${gejalaData.length} gejala`);

  // Seed Aturan (Rules) - Based on decision tree from reference
  console.log('Seeding aturan (rules)...');
  const aturanData = [
    // Gingivitis (P001)
    { penyakitId: 'P001', gejalaId: 'G001', bobot: 3 }, // Gusi merah
    { penyakitId: 'P001', gejalaId: 'G002', bobot: 3 }, // Gusi bengkak
    { penyakitId: 'P001', gejalaId: 'G003', bobot: 2 }, // Gusi nyeri
    { penyakitId: 'P001', gejalaId: 'G004', bobot: 2 }, // Gusi lunak
    { penyakitId: 'P001', gejalaId: 'G005', bobot: 4 }, // Pendarahan saat sikat gigi
    { penyakitId: 'P001', gejalaId: 'G009', bobot: 2 }, // Bau mulut

    // Periodontitis (P002)
    { penyakitId: 'P002', gejalaId: 'G001', bobot: 2 }, // Gusi merah
    { penyakitId: 'P002', gejalaId: 'G002', bobot: 2 }, // Gusi bengkak
    { penyakitId: 'P002', gejalaId: 'G005', bobot: 3 }, // Pendarahan
    { penyakitId: 'P002', gejalaId: 'G006', bobot: 4 }, // Keluar nanah
    { penyakitId: 'P002', gejalaId: 'G007', bobot: 5 }, // Gusi menyusut
    { penyakitId: 'P002', gejalaId: 'G008', bobot: 5 }, // Gigi goyang
    { penyakitId: 'P002', gejalaId: 'G009', bobot: 3 }, // Bau mulut

    // Pulpitis Reversible (P003)
    { penyakitId: 'P003', gejalaId: 'G010', bobot: 5 }, // Sensitif dingin
    { penyakitId: 'P003', gejalaId: 'G012', bobot: 4 }, // Sensitif manis
    { penyakitId: 'P003', gejalaId: 'G020', bobot: 3 }, // Gigi berlubang

    // Pulpitis Irreversible (P004)
    { penyakitId: 'P004', gejalaId: 'G010', bobot: 3 }, // Sensitif dingin
    { penyakitId: 'P004', gejalaId: 'G011', bobot: 4 }, // Sensitif panas
    { penyakitId: 'P004', gejalaId: 'G013', bobot: 5 }, // Nyeri spontan
    { penyakitId: 'P004', gejalaId: 'G014', bobot: 5 }, // Nyeri berdenyut
    { penyakitId: 'P004', gejalaId: 'G015', bobot: 4 }, // Nyeri malam
    { penyakitId: 'P004', gejalaId: 'G020', bobot: 3 }, // Gigi berlubang

    // Abses Periapeks (P005)
    { penyakitId: 'P005', gejalaId: 'G014', bobot: 4 }, // Nyeri berdenyut
    { penyakitId: 'P005', gejalaId: 'G016', bobot: 4 }, // Nyeri mengunyah
    { penyakitId: 'P005', gejalaId: 'G017', bobot: 5 }, // Bengkak wajah
    { penyakitId: 'P005', gejalaId: 'G018', bobot: 3 }, // Demam
    { penyakitId: 'P005', gejalaId: 'G019', bobot: 3 }, // Kelenjar bengkak
    { penyakitId: 'P005', gejalaId: 'G021', bobot: 5 }, // Benjolan nanah

    // Abses Periodontal (P006)
    { penyakitId: 'P006', gejalaId: 'G002', bobot: 3 }, // Gusi bengkak
    { penyakitId: 'P006', gejalaId: 'G003', bobot: 3 }, // Gusi nyeri
    { penyakitId: 'P006', gejalaId: 'G006', bobot: 5 }, // Keluar nanah
    { penyakitId: 'P006', gejalaId: 'G008', bobot: 4 }, // Gigi goyang
    { penyakitId: 'P006', gejalaId: 'G016', bobot: 3 }, // Nyeri mengunyah
    { penyakitId: 'P006', gejalaId: 'G021', bobot: 5 }, // Benjolan nanah

    // Abses Gingival (P007)
    { penyakitId: 'P007', gejalaId: 'G002', bobot: 4 }, // Gusi bengkak
    { penyakitId: 'P007', gejalaId: 'G003', bobot: 4 }, // Gusi nyeri
    { penyakitId: 'P007', gejalaId: 'G006', bobot: 4 }, // Keluar nanah
    { penyakitId: 'P007', gejalaId: 'G021', bobot: 5 }, // Benjolan nanah

    // Trench Mouth (P008)
    { penyakitId: 'P008', gejalaId: 'G001', bobot: 3 }, // Gusi merah
    { penyakitId: 'P008', gejalaId: 'G002', bobot: 3 }, // Gusi bengkak
    { penyakitId: 'P008', gejalaId: 'G003', bobot: 4 }, // Gusi nyeri
    { penyakitId: 'P008', gejalaId: 'G005', bobot: 4 }, // Pendarahan
    { penyakitId: 'P008', gejalaId: 'G009', bobot: 5 }, // Bau mulut parah
    { penyakitId: 'P008', gejalaId: 'G018', bobot: 3 }, // Demam
    { penyakitId: 'P008', gejalaId: 'G022', bobot: 5 }, // Gusi keabu-abuan
    { penyakitId: 'P008', gejalaId: 'G023', bobot: 5 }, // Jaringan gusi rusak
    { penyakitId: 'P008', gejalaId: 'G024', bobot: 4 }, // Rasa tidak enak
  ];

  await db.insert(aturan).values(aturanData);
  console.log(`✓ Inserted ${aturanData.length} aturan`);

  // Create admin user
  console.log('Creating admin user...');

  try {
    await auth.api.signUpEmail({
      body: {
        email: 'admin@gmail.com',
        password: 'rahasia123',
        name: 'Admin',
      },
    });

    console.log(
      '✓ Created admin user (email: admin@gmail.com, password: rahasia123)',
    );
  } catch (error) {
    console.log('error =>', error);
    console.log('Admin user already exists, skipping...');
  }

  console.log('\n✅ Database seeding completed!');
  console.log('\n📋 Summary:');
  console.log(`   - ${penyakitData.length} penyakit (diseases)`);
  console.log(`   - ${gejalaData.length} gejala (symptoms)`);
  console.log(`   - ${aturanData.length} aturan (rules)`);
  console.log('\n👤 Admin Login:');
  console.log('   Email: admin@gmail.com');
  console.log('   Password: rahasia123');

  await connection.end();
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
