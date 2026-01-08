import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Stethoscope,
  Brain,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { getSession } from "@/lib/get-session";

export default async function HomePage() {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Sistem Pakar Gigi
            </span>
          </div>
          <nav className="flex items-center gap-4">
            {session ? (
              <Link href="/dashboard">
                <Button>
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Masuk</Button>
                </Link>
                <Link href="/register">
                  <Button>Daftar</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Brain className="h-4 w-4" />
            Sistem Pakar Berbasis Backward Chaining
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900">
            Diagnosa Penyakit Gigi
            <span className="text-blue-600"> dengan Cerdas</span>
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            Sistem pakar yang menggunakan metode Backward Chaining untuk
            membantu mendiagnosa penyakit gigi berdasarkan gejala yang Anda
            alami. Dapatkan hasil diagnosa cepat dan saran pengobatan.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={session ? "/konsultasi" : "/register"}>
              <Button size="lg" className="text-lg px-8">
                <Stethoscope className="mr-2 h-5 w-5" />
                Mulai Konsultasi
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Fitur Unggulan
          </h2>
          <p className="text-gray-600">
            Sistem pakar kami dilengkapi berbagai fitur untuk memudahkan
            diagnosa
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Metode Backward Chaining</CardTitle>
              <CardDescription>
                Menggunakan metode inferensi Backward Chaining dengan
                penelusuran Depth First Search untuk diagnosa yang akurat
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Diagnosa Cepat</CardTitle>
              <CardDescription>
                Proses diagnosa hanya membutuhkan beberapa menit dengan
                menjawab pertanyaan tentang gejala yang dialami
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Basis Pengetahuan</CardTitle>
              <CardDescription>
                Database penyakit dan gejala yang lengkap berdasarkan
                pengetahuan pakar dokter gigi
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Diseases Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Penyakit yang Dapat Didiagnosa
            </h2>
            <p className="text-gray-600">
              Sistem kami dapat mendiagnosa 8 penyakit gigi umum
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Gingivitis",
              "Periodontitis",
              "Pulpitis Reversible",
              "Pulpitis Irreversible",
              "Abses Periapeks",
              "Abses Periodontal",
              "Abses Gingival",
              "Trench Mouth",
            ].map((disease) => (
              <Card key={disease}>
                <CardContent className="flex items-center gap-3 py-4">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-medium">{disease}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Cara Kerja Sistem
          </h2>
          <p className="text-gray-600">
            Proses diagnosa yang mudah dan terstruktur
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              1
            </div>
            <h3 className="mb-2 text-xl font-semibold">Daftar/Masuk</h3>
            <p className="text-gray-600">
              Buat akun atau masuk untuk memulai konsultasi
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              2
            </div>
            <h3 className="mb-2 text-xl font-semibold">Jawab Pertanyaan</h3>
            <p className="text-gray-600">
              Jawab pertanyaan tentang gejala yang Anda alami
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              3
            </div>
            <h3 className="mb-2 text-xl font-semibold">Dapatkan Hasil</h3>
            <p className="text-gray-600">
              Terima hasil diagnosa dan saran pengobatan
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Mulai Diagnosa Sekarang
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            Gratis dan mudah digunakan. Dapatkan hasil diagnosa dalam hitungan
            menit.
          </p>
          <Link href={session ? "/konsultasi" : "/register"}>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 bg-white text-blue-600 hover:bg-blue-50"
            >
              Mulai Konsultasi Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">
                Sistem Pakar Gigi
              </span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Sistem Pakar Diagnosa Penyakit Gigi.
              Dibuat untuk tujuan pendidikan.
            </p>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              ⚠️ Disclaimer: Hasil diagnosa ini merupakan panduan awal dan tidak
              menggantikan konsultasi dengan dokter gigi profesional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
