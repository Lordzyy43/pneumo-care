
import { Link, useLocation } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  GraduationCap,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { screeningQuestions } from "../data/screening/questions";

function Result() {
  const location = useLocation();
  const answers = location.state?.answers;

  // Validasi hasil skrining
  if (!answers || Object.keys(answers).length === 0) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-amber-50 text-amber-600">
            <CircleHelp size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-[#102A43]">
            Hasil belum tersedia
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Silakan selesaikan proses skrining terlebih dahulu untuk melihat
            ringkasan jawaban Anda.
          </p>

          <Link
            to="/screening"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Mulai skrining
          </Link>
        </div>
      </main>
    );
  }

  // Menghubungkan jawaban dengan data pertanyaan
  const answeredQuestions = screeningQuestions.map((question) => ({
    ...question,
    answer: answers[question.id] ?? null,
  }));

  // Mengelompokkan jawaban
  const yesAnswers = answeredQuestions.filter(
    (question) => question.answer === "yes",
  );

  const noAnswers = answeredQuestions.filter(
    (question) => question.answer === "no",
  );

  const uncertainAnswers = answeredQuestions.filter(
    (question) => question.answer === "unsure",
  );

  const unansweredQuestions = answeredQuestions.filter(
    (question) => question.answer === null,
  );

  // Mengidentifikasi safety trigger dari konfigurasi pertanyaan
  const triggeredSafetyQuestions = answeredQuestions.filter(
    (question) =>
      question.safety?.triggerValues?.includes(question.answer),
  );

  const hasEmergency = triggeredSafetyQuestions.some(
    (question) => question.safety.priority === "emergency",
  );

  const hasUrgent = triggeredSafetyQuestions.some(
    (question) => question.safety.priority === "urgent",
  );

  const hasAnswers = yesAnswers.length > 0;
  const hasUncertainty = uncertainAnswers.length > 0;
  const isIncomplete = unansweredQuestions.length > 0;

  // Menentukan status berdasarkan prioritas tertinggi
  let resultStatus;

  if (hasEmergency) {
    resultStatus = "emergency";
  } else if (hasUrgent) {
    resultStatus = "urgent";
  } else if (isIncomplete) {
    resultStatus = "incomplete";
  } else if (hasAnswers || hasUncertainty) {
    resultStatus = "attention";
  } else {
    resultStatus = "no_symptoms";
  }

  // Konfigurasi tampilan berdasarkan status
  const statusConfig = {
    emergency: {
      title: "Segera cari pertolongan darurat.",
      description:
        "Jawaban Anda menunjukkan tanda bahaya yang memerlukan pertolongan medis darurat. Jangan menunda penanganan untuk membaca atau menyelesaikan proses aplikasi.",
      icon: ShieldAlert,
      container: "border-red-200 bg-red-50",
      iconStyle: "bg-red-100 text-red-700",
      titleStyle: "text-red-900",
      descriptionStyle: "text-red-800",
    },
    urgent: {
      title: "Anda memerlukan penilaian medis segera.",
      description:
        "Jawaban Anda menunjukkan tanda yang memerlukan penilaian tenaga medis sesegera mungkin. Jangan menunda pemeriksaan.",
      icon: AlertTriangle,
      container: "border-amber-200 bg-amber-50",
      iconStyle: "bg-amber-100 text-amber-700",
      titleStyle: "text-amber-900",
      descriptionStyle: "text-amber-800",
    },
    incomplete: {
      title: "Skrining belum selesai.",
      description:
        "Masih terdapat pertanyaan yang belum dijawab. Ringkasan ini belum mencakup seluruh informasi yang tersedia.",
      icon: CircleHelp,
      container: "border-slate-200 bg-slate-50",
      iconStyle: "bg-slate-100 text-slate-600",
      titleStyle: "text-[#102A43]",
      descriptionStyle: "text-slate-600",
    },
    attention: {
      title: "Terdapat jawaban yang perlu diperhatikan.",
      description:
        "Beberapa jawaban Anda menunjukkan gejala atau ketidakpastian. Pertimbangkan penilaian tenaga medis untuk memahami kondisi Anda.",
      icon: AlertTriangle,
      container: "border-amber-200 bg-amber-50",
      iconStyle: "bg-amber-100 text-amber-700",
      titleStyle: "text-amber-900",
      descriptionStyle: "text-amber-800",
    },
    no_symptoms: {
      title: "Tidak ada gejala yang dilaporkan.",
      description:
        "Anda menjawab Tidak pada seluruh pertanyaan. Namun, hasil ini tidak dapat memastikan bahwa Anda bebas dari tension pneumothorax.",
      icon: CheckCircle2,
      container: "border-emerald-200 bg-emerald-50",
      iconStyle: "bg-emerald-100 text-emerald-700",
      titleStyle: "text-emerald-900",
      descriptionStyle: "text-emerald-800",
    },
  };

  const currentStatus = statusConfig[resultStatus];
  const StatusIcon = currentStatus.icon;

  // Label jawaban
  function getAnswerLabel(value) {
    const labels = {
      yes: "Ya",
      no: "Tidak",
      unsure: "Tidak yakin",
    };

    return labels[value] ?? "Belum dijawab";
  }

  // Warna label jawaban
  function getAnswerStyle(value) {
    if (value === "yes") {
      return "border-amber-100 bg-amber-50 text-amber-700";
    }

    if (value === "unsure") {
      return "border-slate-200 bg-slate-100 text-slate-600";
    }

    if (value === "no") {
      return "border-emerald-100 bg-emerald-50 text-emerald-700";
    }

    return "border-slate-200 bg-slate-50 text-slate-500";
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <div className="text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-blue-50 text-blue-600">
            <ClipboardCheck size={32} />
          </div>

          <p className="mt-5 text-xs font-extrabold tracking-[2px] text-teal-700">
            PNEUMO CARE RESULT
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102A43] sm:text-4xl">
            Ringkasan Skrining
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            Berikut merupakan ringkasan jawaban yang Anda berikan selama
            proses skrining.
          </p>
        </div>

        {/* SUMMARY STATUS */}
        <section
          className={`mt-9 rounded-3xl border p-6 shadow-sm sm:p-8 ${currentStatus.container}`}
          aria-live="polite"
        >
          <div className="flex items-start gap-4">
            <div
              className={`grid size-12 shrink-0 place-items-center rounded-xl ${currentStatus.iconStyle}`}
            >
              <StatusIcon size={25} />
            </div>

            <div>
              <h2 className={`text-lg font-bold ${currentStatus.titleStyle}`}>
                {currentStatus.title}
              </h2>

              <p
                className={`mt-2 text-sm leading-7 ${currentStatus.descriptionStyle}`}
              >
                {currentStatus.description}
              </p>
            </div>
          </div>

          {/* ANSWER COUNTS */}
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-medium text-slate-500">
                Total pertanyaan
              </p>
              <p className="mt-2 text-2xl font-extrabold text-[#102A43]">
                {screeningQuestions.length}
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-medium text-emerald-700">
                Jawaban tidak
              </p>
              <p className="mt-2 text-2xl font-extrabold text-emerald-800">
                {noAnswers.length}
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-medium text-amber-700">
                Jawaban ya
              </p>
              <p className="mt-2 text-2xl font-extrabold text-amber-800">
                {yesAnswers.length}
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-medium text-slate-600">
                Tidak yakin
              </p>
              <p className="mt-2 text-2xl font-extrabold text-slate-700">
                {uncertainAnswers.length}
              </p>
            </div>
          </div>
        </section>

        {/* SAFETY TRIGGERS */}
        {triggeredSafetyQuestions.length > 0 && (
          <section className="mt-6 rounded-3xl border border-amber-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <ShieldAlert size={22} className="shrink-0 text-amber-600" />

              <div>
                <h2 className="font-bold text-[#102A43]">
                  Tanda bahaya yang terdeteksi dari jawaban
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Berdasarkan aturan keselamatan pada kuesioner
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {triggeredSafetyQuestions.map((question) => {
                const isEmergency =
                  question.safety.priority === "emergency";

                return (
                  <div
                    key={question.id}
                    className={`rounded-xl border p-4 ${
                      isEmergency
                        ? "border-red-100 bg-red-50"
                        : "border-amber-100 bg-amber-50"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[#102A43]">
                        {question.title}
                      </p>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                          isEmergency
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {isEmergency ? "DARURAT" : "SEGERA"}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-6 text-slate-600">
                      Jawaban: {getAnswerLabel(question.answer)}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ANSWER DETAILS */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
              <ClipboardCheck size={21} />
            </div>

            <div>
              <h2 className="font-bold text-[#102A43]">
                Detail jawaban
              </h2>
              <p className="text-xs text-slate-400">
                Jawaban berdasarkan setiap pertanyaan
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {answeredQuestions.map((question, index) => (
              <div
                key={question.id}
                className="rounded-2xl border border-slate-100 p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold tracking-[1.5px] text-teal-700">
                      {question.category}
                    </p>

                    <p className="mt-1 text-[10px] font-bold tracking-wider text-slate-400">
                      PERTANYAAN {index + 1}
                    </p>

                    <h3 className="mt-2 text-sm leading-6 font-semibold text-[#102A43]">
                      {question.title}
                    </h3>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${getAnswerStyle(question.answer)}`}
                  >
                    {getAnswerLabel(question.answer)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RECOMMENDATION */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <AlertTriangle
              size={23}
              className="shrink-0 text-amber-600"
            />
            <h2 className="font-bold text-[#102A43]">
              Hal yang perlu diperhatikan
            </h2>
          </div>

          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            {hasEmergency && (
              <p>
                Segera hubungi layanan darurat setempat atau minta bantuan
                untuk menuju IGD sekarang. Jangan mengemudi sendiri dan
                jangan menunda pertolongan.
              </p>
            )}

            {!hasEmergency && hasUrgent && (
              <p>
                Segera hubungi tenaga medis atau fasilitas pelayanan
                kesehatan untuk mendapatkan penilaian. Jika muncul sesak
                napas berat, pingsan, atau kondisi memburuk, cari pertolongan
                darurat.
              </p>
            )}

            {!hasEmergency && !hasUrgent && hasAnswers && (
              <p>
                Anda memberikan jawaban Ya pada {yesAnswers.length} pertanyaan.
                Gejala yang dilaporkan perlu dinilai berdasarkan kondisi
                klinis oleh tenaga medis.
              </p>
            )}

            {!hasEmergency && !hasUrgent && hasUncertainty && (
              <p>
                Terdapat {uncertainAnswers.length} jawaban Tidak yakin.
                Jika ketidakpastian berkaitan dengan gejala berat atau
                mendadak, jangan menunda mencari pertolongan medis.
              </p>
            )}

            {isIncomplete && (
              <p>
                Terdapat {unansweredQuestions.length} pertanyaan yang belum
                dijawab. Ringkasan ini belum mencakup seluruh informasi
                skrining.
              </p>
            )}

            {resultStatus === "no_symptoms" && (
              <p>
                Anda tidak melaporkan gejala berdasarkan pertanyaan yang
                tersedia. Tetap perhatikan perubahan kondisi tubuh dan cari
                pertolongan medis jika mengalami tanda bahaya.
              </p>
            )}

            <p>
              Hasil ini merupakan ringkasan jawaban, bukan penilaian klinis
              atau diagnosis tension pneumothorax.
            </p>
          </div>
        </section>

        {/* DISCLAIMER */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-slate-400"
          />

          <p className="text-xs leading-6 text-slate-500">
            <strong className="text-slate-700">
              Informasi penting:
            </strong>{" "}
            Pneumo Care merupakan media edukasi dan skrining awal, bukan
            alat diagnosis medis. Hasil ini tidak dapat memastikan ataupun
            menyingkirkan tension pneumothorax. Jika terdapat tanda bahaya,
            segera cari pertolongan medis darurat tanpa menunggu hasil aplikasi.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Link
            to="/screening"
            replace
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <RotateCcw size={17} />
            Ulangi skrining
          </Link>

          <Link
            to="/education"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-5 text-sm font-semibold text-white transition hover:bg-[#1b4568]"
          >
            <GraduationCap size={18} />
            Pelajari materi
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Result;
