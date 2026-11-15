import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  HeartPulse,
  Activity,
  Wind,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";

const topics = [
  {
    number: "01",
    title: "Definisi",
    description:
      "Memahami apa itu tension pneumothorax dan mengapa kondisi ini berbahaya.",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-700",
  },
  {
    number: "02",
    title: "Mekanisme",
    description:
      "Mengenali bagaimana udara yang terperangkap dapat mengganggu fungsi paru dan sirkulasi.",
    icon: Wind,
    color: "bg-teal-50 text-teal-700",
  },
  {
    number: "03",
    title: "Tanda dan gejala",
    description:
      "Memahami gejala gangguan pernapasan dan tanda perburukan yang membutuhkan perhatian segera.",
    icon: Activity,
    color: "bg-amber-50 text-amber-700",
  },
  {
    number: "04",
    title: "Penanganan medis",
    description:
      "Mengenal prinsip penanganan darurat yang dilakukan oleh tenaga medis.",
    icon: Stethoscope,
    color: "bg-indigo-50 text-indigo-700",
  },
];

function Education() {
  return (
    <main className="overflow-hidden bg-slate-50 text-[#102A43]">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-[calc(100%-36px)] max-w-[1200px] py-14 md:w-[calc(100%-64px)] md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[1.8px] text-teal-700">
              <BookOpen size={16} />
              PUSAT EDUKASI KESEHATAN
            </div>

            <h1 className="mt-5 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Memahami{" "}
              <span className="text-blue-600">Tension Pneumothorax</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-500 sm:text-base">
              Pelajari bagaimana udara yang terperangkap di rongga pleura dapat
              menekan paru dan mengganggu sirkulasi, serta mengapa pengenalan
              kondisi ini secara cepat sangat penting.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#pengenalan"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Mulai belajar
                <ArrowDown size={17} />
              </a>

              <Link
                to="/screening"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-[#102A43] transition hover:border-blue-300"
              >
                Buka skrining
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Topic navigation */}
      <section className="mx-auto w-[calc(100%-36px)] max-w-[1200px] py-12 md:w-[calc(100%-64px)] md:py-16">
        <div className="max-w-2xl">
          <p className="text-[11px] font-extrabold tracking-[1.8px] text-teal-700">
            MATERI PEMBELAJARAN
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Pelajari langkah demi langkah
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            Mulai dari pengertian dasar, mekanisme terjadinya, gejala, hingga
            prinsip penanganan medis.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <a
                key={topic.number}
                href={`#${topic.number}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid size-11 place-items-center rounded-xl ${topic.color}`}
                  >
                    <Icon size={21} />
                  </span>

                  <span className="text-xs font-extrabold text-slate-300">
                    {topic.number}
                  </span>
                </div>

                <h3 className="mt-5 font-bold">{topic.title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {topic.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-blue-600">
                  Baca materi
                  <ArrowRight
                    size={14}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Definition */}
      <section id="pengenalan" className="scroll-mt-8 bg-[#EEF4FA]">
        <div
          id="01"
          className="mx-auto grid w-[calc(100%-36px)] max-w-[1200px] gap-10 py-14 md:w-[calc(100%-64px)] md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
        >
          <div>
            <p className="text-[11px] font-extrabold tracking-[1.8px] text-teal-700">
              01 — DEFINISI
            </p>

            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Apa itu tension pneumothorax?
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              Pneumotoraks adalah keadaan ketika udara masuk ke rongga pleura,
              yaitu ruang di antara dua lapisan pleura yang mengelilingi paru
              dan melapisi dinding dada.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Pada tension pneumothorax, udara terperangkap dan tekanan di
              rongga pleura terus meningkat. Kondisi ini dapat menyebabkan paru
              kolaps serta mengganggu aliran darah kembali ke jantung.
            </p>
          </div>

          <div className="rounded-3xl border border-white bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
                <HeartPulse size={22} />
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Mengapa kondisi ini berbahaya?
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  Tekanan yang meningkat dapat menekan paru, mengurangi aliran
                  balik vena, dan menurunkan kemampuan sirkulasi mempertahankan
                  aliran darah ke organ tubuh.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-extrabold tracking-wider text-slate-500">
                RISIKO UTAMA
              </p>

              <div className="mt-4 space-y-3">
                {[
                  "Kolaps paru dan gangguan pernapasan",
                  "Penurunan aliran balik vena ke jantung",
                  "Syok obstruktif dan henti jantung",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-teal-600"
                    />
                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mechanism */}
      <section id="02" className="scroll-mt-8">
        <div className="mx-auto w-[calc(100%-36px)] max-w-[1200px] py-14 md:w-[calc(100%-64px)] md:py-20">
          <p className="text-[11px] font-extrabold tracking-[1.8px] text-teal-700">
            02 — MEKANISME
          </p>

          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Bagaimana kondisi ini berkembang?
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            Pada keadaan tertentu, udara dapat masuk ke rongga pleura tetapi
            sulit keluar. Akibatnya, tekanan bertambah dan dapat menimbulkan
            gangguan yang semakin berat.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Udara masuk",
                text: "Cedera atau kondisi tertentu memungkinkan udara memasuki rongga pleura.",
              },
              {
                step: "02",
                title: "Tekanan meningkat",
                text: "Udara yang terperangkap meningkatkan tekanan dan dapat menyebabkan paru kolaps.",
              },
              {
                step: "03",
                title: "Pernapasan dan sirkulasi terganggu",
                text: "Tekanan dapat mengurangi aliran balik vena dan berkembang menjadi syok obstruktif.",
              },
            ].map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span className="text-sm font-extrabold text-teal-700">
                  TAHAP {item.step}
                </span>

                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section id="03" className="scroll-mt-8 bg-white">
        <div className="mx-auto w-[calc(100%-36px)] max-w-[1200px] py-14 md:w-[calc(100%-64px)] md:py-20">
          <p className="text-[11px] font-extrabold tracking-[1.8px] text-teal-700">
            03 — TANDA DAN GEJALA
          </p>

          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Kenali tanda peringatan
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            Gejala dapat berbeda pada setiap pasien. Tidak semua tanda klasik
            selalu muncul, sehingga kondisi ini membutuhkan penilaian klinis
            yang cepat.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Sesak napas",
                text: "Kesulitan bernapas yang dapat muncul mendadak atau memburuk dengan cepat.",
              },
              {
                title: "Nyeri dada",
                text: "Nyeri dada yang dapat terjadi, khususnya dalam konteks cedera dada.",
              },
              {
                title: "Gangguan sirkulasi",
                text: "Tekanan darah dapat menurun dan denyut jantung dapat meningkat.",
              },
              {
                title: "Penurunan oksigen",
                text: "Kadar oksigen dapat menurun akibat gangguan fungsi pernapasan.",
              },
              {
                title: "Perubahan kesadaran",
                text: "Kondisi berat dapat menyebabkan kebingungan atau penurunan kesadaran.",
              },
              {
                title: "Suara napas menurun pada satu sisi",
                text: "Temuan pemeriksaan yang perlu dinilai tenaga medis bersama kondisi klinis lainnya.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200"
              >
                <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
                  <Activity size={20} />
                </div>

                <h3 className="mt-4 font-bold">{item.title}</h3>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldAlert size={23} className="mt-0.5 shrink-0 text-red-700" />

              <div>
                <h3 className="font-bold text-red-900">
                  Kapan harus mencari pertolongan darurat?
                </h3>

                <p className="mt-2 text-sm leading-7 text-red-900">
                  Jika terjadi sesak napas berat atau mendadak, nyeri dada
                  setelah cedera, pingsan, atau kondisi memburuk dengan cepat,
                  segera hubungi layanan darurat setempat atau menuju IGD.
                  Jangan menunggu skrining selesai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical treatment */}
      <section id="04" className="scroll-mt-8 bg-[#EEF4FA]">
        <div className="mx-auto w-[calc(100%-36px)] max-w-[1200px] py-14 md:w-[calc(100%-64px)] md:py-20">
          <p className="text-[11px] font-extrabold tracking-[1.8px] text-teal-700">
            04 — PENANGANAN MEDIS
          </p>

          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Mengapa penanganan cepat penting?
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            Tension pneumothorax yang dicurigai pada pasien tidak stabil
            merupakan keadaan darurat. Penanganan dilakukan oleh tenaga medis
            sesuai kondisi pasien dan protokol klinis.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Penilaian segera",
                text: "Tenaga medis menilai pernapasan, sirkulasi, kesadaran, dan tanda vital untuk mengenali kondisi yang mengancam nyawa.",
              },
              {
                title: "Dekompresi darurat",
                text: "Jika diindikasikan, tenaga medis melakukan dekompresi pleura sebagai tindakan penyelamatan awal.",
              },
              {
                title: "Penanganan lanjutan",
                text: "Drainase dada dan pemantauan lanjutan dilakukan sesuai keadaan klinis serta kebutuhan pasien.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white bg-white p-6"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-teal-50 text-teal-700">
                  {index === 0 ? (
                    <HeartPulse size={21} />
                  ) : index === 1 ? (
                    <Activity size={21} />
                  ) : (
                    <Stethoscope size={21} />
                  )}
                </span>

                <h3 className="mt-4 font-bold">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-xs leading-6 text-slate-500">
            Tindakan dekompresi dan pemasangan drainase dada merupakan prosedur
            medis invasif yang harus dilakukan oleh tenaga terlatih. Informasi
            ini bukan panduan untuk melakukan tindakan sendiri.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto w-[calc(100%-36px)] max-w-[1200px] py-14 md:w-[calc(100%-64px)] md:py-20">
        <div className="rounded-3xl bg-[#102A43] p-6 text-white sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-[11px] font-extrabold tracking-[1.8px] text-teal-300">
              LANJUTKAN PEMBELAJARAN
            </p>

            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Pengetahuan membantu kita mengenali risiko.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Pelajari gejala dengan bijak dan utamakan pertolongan medis jika
              terdapat tanda bahaya.
            </p>
          </div>

          <div className="mt-7 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
            <Link
              to="/screening"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 text-sm font-semibold text-white transition hover:bg-blue-400"
            >
              Mulai skrining
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kembali ke beranda
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Education;
