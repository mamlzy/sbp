"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Pill,
} from "lucide-react";

interface Gejala {
  id: string;
  kode: string;
  nama: string;
  pertanyaan: string | null;
}

interface DiagnosisResult {
  penyakit: {
    id: string;
    kode: string;
    nama: string;
    deskripsi: string | null;
    pengobatan: string | null;
  };
  nilaiKepastian: number;
  gejalacocok: string[];
  totalGejala: number;
}

type Step = "welcome" | "consultation" | "result";

export default function KonsultasiPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [gejalaList, setGejalaList] = useState<Gejala[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredYes, setAnsweredYes] = useState<string[]>([]);
  const [answeredNo, setAnsweredNo] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DiagnosisResult[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGejala();
  }, []);

  const fetchGejala = async () => {
    try {
      const response = await fetch("/api/gejala");
      if (response.ok) {
        const data = await response.json();
        setGejalaList(data);
      }
    } catch (err) {
      console.error("Error fetching symptoms:", err);
    }
  };

  const startConsultation = () => {
    setStep("consultation");
    setCurrentIndex(0);
    setAnsweredYes([]);
    setAnsweredNo([]);
    setResults([]);
    setError("");
  };

  const handleAnswer = (answer: "yes" | "no") => {
    const currentGejala = gejalaList[currentIndex];

    if (answer === "yes") {
      setAnsweredYes([...answeredYes, currentGejala.id]);
    } else {
      setAnsweredNo([...answeredNo, currentGejala.id]);
    }

    // Check if we should continue or finish
    const totalAnswered = answeredYes.length + answeredNo.length + 1;
    const newAnsweredYes =
      answer === "yes" ? [...answeredYes, currentGejala.id] : answeredYes;

    // Finish if answered all questions or enough data collected
    if (
      currentIndex >= gejalaList.length - 1 ||
      (newAnsweredYes.length >= 3 && totalAnswered >= 5)
    ) {
      finishConsultation(newAnsweredYes);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const finishConsultation = async (finalAnsweredYes: string[]) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/konsultasi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gejalaIds: finalAnsweredYes }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
        setStep("result");
      } else {
        setError("Gagal melakukan diagnosa. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("Error during consultation:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const resetConsultation = () => {
    setStep("welcome");
    setCurrentIndex(0);
    setAnsweredYes([]);
    setAnsweredNo([]);
    setResults([]);
    setError("");
  };

  // Welcome Step
  if (step === "welcome") {
    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <Stethoscope className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Konsultasi Penyakit Gigi
          </h1>
          <p className="mt-2 text-gray-500">
            Sistem Pakar untuk Mendiagnosa Penyakit Gigi
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Petunjuk Konsultasi</CardTitle>
            <CardDescription>
              Ikuti langkah-langkah berikut untuk mendapatkan diagnosa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                1
              </div>
              <div>
                <p className="font-medium">Jawab Pertanyaan</p>
                <p className="text-sm text-gray-500">
                  Sistem akan menanyakan gejala-gejala yang Anda alami
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                2
              </div>
              <div>
                <p className="font-medium">Proses Diagnosa</p>
                <p className="text-sm text-gray-500">
                  Sistem akan menganalisis gejala menggunakan metode Backward
                  Chaining
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                3
              </div>
              <div>
                <p className="font-medium">Hasil Diagnosa</p>
                <p className="text-sm text-gray-500">
                  Dapatkan hasil diagnosa beserta tingkat kepastian dan saran
                  pengobatan
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            size="lg"
            onClick={startConsultation}
            disabled={gejalaList.length === 0}
          >
            {gejalaList.length === 0 ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memuat data...
              </>
            ) : (
              <>
                Mulai Konsultasi
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {gejalaList.length === 0 && (
            <p className="mt-2 text-sm text-gray-500">
              Data gejala belum tersedia. Pastikan database sudah di-seed.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Consultation Step
  if (step === "consultation") {
    const currentGejala = gejalaList[currentIndex];
    const progress = ((currentIndex + 1) / gejalaList.length) * 100;

    if (loading) {
      return (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
            <p className="mt-4 text-gray-500">Menganalisis gejala...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Konsultasi</h1>
          <p className="mt-1 text-gray-500">
            Jawab pertanyaan berikut dengan jujur
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              Pertanyaan {currentIndex + 1} dari {gejalaList.length}
            </span>
            <span className="text-gray-500">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Answered Summary */}
        <div className="flex gap-4">
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Ya: {answeredYes.length}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Tidak: {answeredNo.length}
          </Badge>
        </div>

        {/* Question Card */}
        <Card className="border-2 border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {currentGejala?.pertanyaan ||
                `Apakah Anda mengalami ${currentGejala?.nama}?`}
            </CardTitle>
            <CardDescription>
              Kode Gejala: {currentGejala?.kode}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                onClick={() => handleAnswer("yes")}
                className="w-32 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Ya
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleAnswer("no")}
                className="w-32"
              >
                <XCircle className="mr-2 h-5 w-5" />
                Tidak
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Skip to Result Button */}
        {answeredYes.length >= 2 && (
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => finishConsultation(answeredYes)}
            >
              Selesaikan konsultasi sekarang →
            </Button>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-red-600">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}
      </div>
    );
  }

  // Result Step
  if (step === "result") {
    return (
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Hasil Diagnosa</h1>
          <p className="mt-2 text-gray-500">
            Berdasarkan gejala yang Anda alami
          </p>
        </div>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Konsultasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-2xl font-bold text-green-600">
                  {answeredYes.length}
                </p>
                <p className="text-sm text-gray-500">Gejala Dialami</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-2xl font-bold text-gray-600">
                  {answeredNo.length}
                </p>
                <p className="text-sm text-gray-500">Gejala Tidak Dialami</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-yellow-500" />
              <p className="mt-4 text-lg font-medium">
                Tidak Dapat Mendiagnosa
              </p>
              <p className="mt-2 text-gray-500">
                Berdasarkan gejala yang Anda berikan, sistem tidak dapat
                menemukan penyakit yang cocok. Silakan konsultasikan langsung
                dengan dokter gigi.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => (
              <Card
                key={result.penyakit.id}
                className={
                  index === 0 ? "border-2 border-blue-500 shadow-lg" : ""
                }
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      {index === 0 && (
                        <Badge className="mb-2">Diagnosa Utama</Badge>
                      )}
                      <CardTitle className="text-xl">
                        {result.penyakit.nama}
                      </CardTitle>
                      <CardDescription>
                        Kode: {result.penyakit.kode}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">
                        {result.nilaiKepastian}%
                      </div>
                      <p className="text-sm text-gray-500">Tingkat Kepastian</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Certainty Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Nilai Kepastian</span>
                      <span>{result.nilaiKepastian}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-full transition-all ${
                          result.nilaiKepastian >= 70
                            ? "bg-green-500"
                            : result.nilaiKepastian >= 50
                            ? "bg-yellow-500"
                            : "bg-orange-500"
                        }`}
                        style={{ width: `${result.nilaiKepastian}%` }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  {result.penyakit.deskripsi && (
                    <div>
                      <h4 className="font-medium text-gray-900">Deskripsi</h4>
                      <p className="mt-1 text-gray-600">
                        {result.penyakit.deskripsi}
                      </p>
                    </div>
                  )}

                  {/* Matching Symptoms */}
                  <div>
                    <h4 className="font-medium text-gray-900">Gejala Cocok</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {result.gejalacocok.map((g, i) => (
                        <Badge key={i} variant="secondary">
                          {g}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {result.gejalacocok.length} dari {result.totalGejala}{" "}
                      gejala cocok
                    </p>
                  </div>

                  {/* Treatment */}
                  {result.penyakit.pengobatan && (
                    <div className="rounded-lg bg-blue-50 p-4">
                      <div className="flex items-center gap-2 text-blue-800">
                        <Pill className="h-5 w-5" />
                        <h4 className="font-medium">Saran Pengobatan</h4>
                      </div>
                      <p className="mt-2 text-blue-700">
                        {result.penyakit.pengobatan}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-yellow-600" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Penting!</p>
                <p>
                  Hasil diagnosa ini merupakan panduan awal dan tidak
                  menggantikan konsultasi dengan dokter gigi profesional.
                  Segera kunjungi dokter gigi untuk pemeriksaan lebih lanjut.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={resetConsultation}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Konsultasi Baru
          </Button>
          <Button onClick={() => router.push("/riwayat")}>
            Lihat Riwayat
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
