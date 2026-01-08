import { db } from "./db";
import { penyakit, gejala, aturan } from "./db/schema";
import { eq } from "drizzle-orm";

export interface Gejala {
  id: string;
  kode: string;
  nama: string;
  pertanyaan: string | null;
}

export interface Penyakit {
  id: string;
  kode: string;
  nama: string;
  deskripsi: string | null;
  pengobatan: string | null;
}

export interface AturanWithGejala {
  penyakitId: string;
  gejalaId: string;
  bobot: number;
  gejala: Gejala;
}

export interface DiagnosisResult {
  penyakit: Penyakit;
  nilaiKepastian: number;
  gejalacocok: string[];
  totalGejala: number;
}

/**
 * Backward Chaining Inference Engine
 * Menggunakan metode penelusuran Depth First Search
 * 
 * Proses:
 * 1. Mulai dari hipotesis (penyakit)
 * 2. Cari gejala yang terkait dengan penyakit
 * 3. Cocokkan dengan gejala yang dialami user
 * 4. Hitung nilai kepastian berdasarkan gejala yang cocok
 */
export async function diagnose(
  gejalaIds: string[]
): Promise<DiagnosisResult[]> {
  // Get all diseases with their rules
  const semuaPenyakit = await db.query.penyakit.findMany();
  const semuaAturan = await db.query.aturan.findMany({
    with: {
      gejala: true,
    },
  });

  const results: DiagnosisResult[] = [];

  // Backward chaining: Start from each disease (hypothesis)
  for (const p of semuaPenyakit) {
    // Get rules for this disease
    const aturanPenyakit = semuaAturan.filter((a) => a.penyakitId === p.id);
    
    if (aturanPenyakit.length === 0) continue;

    // Find matching symptoms
    const gejalacocok: string[] = [];
    let totalBobot = 0;
    let bobotCocok = 0;

    for (const a of aturanPenyakit) {
      totalBobot += a.bobot;
      if (gejalaIds.includes(a.gejalaId)) {
        gejalacocok.push(a.gejala.nama);
        bobotCocok += a.bobot;
      }
    }

    // Calculate certainty percentage
    const nilaiKepastian = Math.round((bobotCocok / totalBobot) * 100);

    // Only include if there's at least one matching symptom
    if (gejalacocok.length > 0) {
      results.push({
        penyakit: p,
        nilaiKepastian,
        gejalacocok,
        totalGejala: aturanPenyakit.length,
      });
    }
  }

  // Sort by certainty value (highest first)
  results.sort((a, b) => b.nilaiKepastian - a.nilaiKepastian);

  return results;
}

/**
 * Get next symptom to ask based on current symptoms
 * Uses Depth First Search to traverse decision tree
 */
export async function getNextGejala(
  answeredGejalaIds: string[],
  answeredYes: string[],
  answeredNo: string[]
): Promise<Gejala | null> {
  // Get all symptoms
  const semuaGejala = await db.query.gejala.findMany();
  const semuaAturan = await db.query.aturan.findMany();

  // Get symptoms that haven't been answered yet
  const unanswered = semuaGejala.filter(
    (g) => !answeredGejalaIds.includes(g.id)
  );

  if (unanswered.length === 0) return null;

  // If user answered yes to some symptoms, prioritize symptoms
  // that belong to the same diseases (Depth First Search)
  if (answeredYes.length > 0) {
    // Find diseases that have the symptoms user said yes to
    const potentialDiseases = new Set<string>();
    for (const gejalaId of answeredYes) {
      const rules = semuaAturan.filter((a) => a.gejalaId === gejalaId);
      for (const rule of rules) {
        potentialDiseases.add(rule.penyakitId);
      }
    }

    // Get symptoms from these diseases that haven't been answered
    for (const penyakitId of potentialDiseases) {
      const diseaseSymptoms = semuaAturan
        .filter((a) => a.penyakitId === penyakitId)
        .map((a) => a.gejalaId);

      for (const symptomId of diseaseSymptoms) {
        if (!answeredGejalaIds.includes(symptomId)) {
          const symptom = semuaGejala.find((g) => g.id === symptomId);
          if (symptom) return symptom;
        }
      }
    }
  }

  // If no specific path, return the first unanswered symptom
  return unanswered[0];
}

/**
 * Get all symptoms for consultation
 */
export async function getAllGejala(): Promise<Gejala[]> {
  return await db.query.gejala.findMany();
}

/**
 * Check if we have enough information to make a diagnosis
 */
export function canMakeDiagnosis(
  answeredYes: string[],
  totalAnswered: number
): boolean {
  // Can diagnose if user answered yes to at least 2 symptoms
  // or answered at least 5 questions
  return answeredYes.length >= 2 || totalAnswered >= 5;
}
