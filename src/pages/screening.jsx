import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  HeartPulse,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";

import { screeningQuestions } from "../data/screening/questions";

const SCREENING_DRAFT_KEY = "pneumo-care-screening-draft";

function readScreeningDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(SCREENING_DRAFT_KEY) || "null");
    if (!draft || typeof draft !== "object") return null;
    const answers = Object.fromEntries(
      Object.entries(draft.answers || {}).filter(([id, value]) =>
        screeningQuestions.some((question) => question.id === id && question.options.some((option) => option.value === value)),
      ),
    );
    const currentStep = Math.min(Math.max(Number.isInteger(draft.currentStep) ? draft.currentStep : 0, 0), screeningQuestions.length - 1);
    return { answers, currentStep };
  } catch {
    return null;
  }
}

function Screening() {
  const navigate = useNavigate();

  const [initialDraft] = useState(readScreeningDraft);
  const [currentStep, setCurrentStep] = useState(initialDraft?.currentStep ?? 0);
  const [answers, setAnswers] = useState(initialDraft?.answers ?? {});
  const [safetyAlert, setSafetyAlert] = useState(null);

  useEffect(() => {
    sessionStorage.setItem(SCREENING_DRAFT_KEY, JSON.stringify({ currentStep, answers }));
  }, [currentStep, answers]);

  const currentQuestion = screeningQuestions[currentStep];

  const selectedAnswer = answers[currentQuestion.id];

  const answeredCount = screeningQuestions.filter(
    (question) => answers[question.id],
  ).length;

  const progress = ((currentStep + (selectedAnswer ? 1 : 0)) / screeningQuestions.length) * 100;
  // KATEGORI SKRINING
  const categories = [
    ...new Set(screeningQuestions.map((question) => question.category)),
  ];

  const currentCategoryIndex = categories.indexOf(currentQuestion.category);

  function handleAnswer(value) {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };

    setAnswers(updatedAnswers);

    const safety = currentQuestion.safety;

    if (safety?.triggerValues?.includes(value)) {
      setSafetyAlert({
        priority: safety.priority,
        message: safety.message,
      });
    } else {
      setSafetyAlert(null);
    }
  }

  function handleNext() {
    if (!selectedAnswer || safetyAlert) return;

    if (currentStep < screeningQuestions.length - 1) {
      setCurrentStep((step) => step + 1);
      return;
    }

    navigate("/screening/result", {
      state: { answers },
    });
    sessionStorage.removeItem(SCREENING_DRAFT_KEY);
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  }

  function handleRestart() {
    setCurrentStep(0);
    setAnswers({});
    setSafetyAlert(null);
  }

  // SAFETY ALERT
  if (safetyAlert) {
    const isEmergency = safetyAlert.priority === "emergency";

    return (
      <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <section
            role="alert"
            aria-live="assertive"
            className={`rounded-3xl border bg-white p-6 shadow-sm sm:p-10 ${
              isEmergency ? "border-red-200" : "border-amber-200"
            }`}
          >
            {/* ALERT ICON */}
            <div
              className={`mb-6 grid size-14 place-items-center rounded-2xl ${
                isEmergency
                  ? "bg-red-50 text-red-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {isEmergency ? (
                <ShieldAlert size={30} />
              ) : (
                <AlertTriangle size={30} />
              )}
            </div>

            {/* ALERT LABEL */}
            <p
              className={`text-xs font-extrabold tracking-[2px] ${
                isEmergency ? "text-red-600" : "text-amber-600"
              }`}
            >
              {isEmergency
                ? "PERINGATAN MEDIS DARURAT"
                : "PERINGATAN MEDIS SEGERA"}
            </p>

            {/* ALERT TITLE */}
            <h1 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight text-[#102A43] sm:text-4xl">
              {isEmergency
                ? "Segera cari pertolongan darurat."
                : "Anda memerlukan penilaian medis segera."}
            </h1>

            {/* ALERT MESSAGE */}
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              {safetyAlert.message}
            </p>

            {/* RECOMMENDED ACTION */}
            <div
              className={`mt-7 rounded-2xl border p-5 ${
                isEmergency
                  ? "border-red-100 bg-red-50"
                  : "border-amber-100 bg-amber-50"
              }`}
            >
              <h2
                className={`font-bold ${
                  isEmergency ? "text-red-800" : "text-amber-800"
                }`}
              >
                Langkah yang perlu dilakukan
              </h2>

              <ul
                className={`mt-3 list-disc space-y-2 pl-5 text-sm leading-6 ${
                  isEmergency ? "text-red-900" : "text-amber-900"
                }`}
              >
                {isEmergency ? (
                  <>
                    <li>
                      Hubungi layanan darurat setempat atau minta bantuan untuk
                      menuju IGD sekarang.
                    </li>
                    <li>
                      Jangan mengemudi sendiri. Minta bantuan orang lain atau
                      layanan darurat.
                    </li>
                    <li>
                      Jangan menunda pertolongan untuk menyelesaikan skrining
                      atau menunggu hasil aplikasi.
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      Segera hubungi tenaga medis atau fasilitas pelayanan
                      kesehatan untuk memperoleh penilaian.
                    </li>
                    <li>
                      Jika muncul sesak napas berat, pingsan, atau kondisi
                      memburuk, segera cari pertolongan darurat.
                    </li>
                    <li>
                      Jangan menunda penilaian medis untuk menyelesaikan
                      skrining.
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* MEDICAL DISCLAIMER */}
            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-xs leading-6 text-slate-500">
                Tension pneumothorax merupakan kondisi medis serius yang dapat
                mengancam jiwa. Peringatan ini didasarkan pada jawaban Anda dan
                bukan merupakan diagnosis. Aplikasi Pneumo Care tidak dapat
                memastikan penyebab gejala atau menentukan kondisi medis Anda.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <RotateCcw size={16} />
                Mulai ulang skrining
              </button>

              <Link
                to="/education"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102A43] px-5 text-sm font-semibold text-white transition hover:bg-[#1b4568]"
              >
                Buka materi edukasi
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // SCREENING PAGE
  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#102A43]"
        >
          <ArrowLeft size={16} />
          Kembali ke beranda
        </Link>

        {/* PAGE HEADER */}
        <div className="mt-8">
          <div className="flex items-center gap-2 text-xs font-extrabold tracking-[1.7px] text-teal-700">
            <HeartPulse size={17} />
            PNEUMO CARE SCREENING
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#102A43] sm:text-4xl">
            Kenali kondisi Anda
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Jawab pertanyaan berikut sesuai kondisi Anda. Pemeriksaan tanda
            bahaya dilakukan terlebih dahulu untuk mengutamakan keselamatan.
          </p>
        </div>

        {/* SCREENING CARD */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(16,42,67,0.04)] sm:mt-10 sm:p-8">
          {/* PROGRESS */}
          <div>
            {/* Informasi progres */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#102A43]">
                  Pertanyaan {currentStep + 1} dari {screeningQuestions.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Bagian {currentCategoryIndex + 1} dari {categories.length}
                </p>
              </div>

              <span className="text-sm font-bold tabular-nums text-teal-700">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Navigasi kategori */}
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {categories.map((category, index) => {
                const categoryQuestions = screeningQuestions.filter(
                  (question) => question.category === category,
                );

                const answeredCount = categoryQuestions.filter(
                  (question) => answers[question.id],
                ).length;

                const isCompleted = answeredCount === categoryQuestions.length;

                const isActive = index === currentCategoryIndex;

                return (
                  <div
                    key={category}
                    aria-current={isActive ? "step" : undefined}
                    className={`rounded-xl border p-3 transition-colors ${
                      isActive
                        ? "border-teal-300 bg-teal-50"
                        : isCompleted
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-slate-100 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                          isActive
                            ? "bg-teal-600 text-white"
                            : isCompleted
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 size={15} /> : index + 1}
                      </span>

                      <span className="text-[10px] font-semibold text-slate-400">
                        {answeredCount}/{categoryQuestions.length}
                      </span>
                    </div>

                    <p
                      className={`mt-2 text-[10px] leading-4 font-bold sm:text-xs ${
                        isActive
                          ? "text-teal-800"
                          : isCompleted
                            ? "text-emerald-800"
                            : "text-slate-500"
                      }`}
                    >
                      {category}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label="Progres skrining"
            aria-valuemin={0}
            aria-valuemax={screeningQuestions.length}
              aria-valuenow={Math.min(currentStep + (selectedAnswer ? 1 : 0), screeningQuestions.length)}
              aria-valuetext={`${Math.min(currentStep + (selectedAnswer ? 1 : 0), screeningQuestions.length)} dari ${screeningQuestions.length} pertanyaan telah ditinjau`}
          >
            <div
              className="h-full rounded-full bg-teal-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* SAFETY INFORMATION */}
          {currentQuestion.safety && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <ShieldAlert
                size={20}
                className="mt-0.5 shrink-0 text-amber-700"
              />

              <p className="text-xs leading-6 text-amber-900 sm:text-sm">
                <strong>Utamakan keselamatan.</strong> Jika Anda mengalami sesak
                napas berat atau mendadak, segera cari pertolongan medis
                darurat.
              </p>
            </div>
          )}

          {/* QUESTION */}
          <div className="mt-9">
            {/* Question metadata */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-teal-700">
                {currentQuestion.category}
              </span>

              <span className="text-xs font-medium text-slate-400">
                Pertanyaan {currentStep + 1}
              </span>
            </div>

            {/* Question title */}
            <h2
              id="screening-question"
              className="mt-5 text-xl leading-relaxed font-bold tracking-tight text-[#102A43] sm:text-2xl sm:leading-relaxed"
            >
              {currentQuestion.title}
            </h2>

            {/* Question description */}
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              {currentQuestion.description}
            </p>
          </div>

          {/* ANSWER OPTIONS */}
          <fieldset className="mt-8" aria-labelledby="screening-question">
            <legend className="mb-4 text-sm font-bold text-[#102A43]">
              Pilih salah satu jawaban
            </legend>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option.value;

                return (
                  <label
                    key={option.value}
                    className={`flex min-h-[68px] cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-all duration-200 ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 shadow-sm ring-2 ring-blue-100"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-xl text-sm font-bold ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>

                      <span
                        className={`text-sm font-semibold ${
                          isSelected ? "text-blue-800" : "text-slate-700"
                        }`}
                      >
                        {option.label}
                      </span>
                    </div>

                    <span
                      className={`grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                        isSelected
                          ? "border-blue-600 bg-blue-600"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <span className="size-2 rounded-full bg-white" />
                      )}
                    </span>

                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option.value}
                      checked={isSelected}
                      onChange={() => handleAnswer(option.value)}
                      className="peer sr-only"
                      aria-label={option.label}
                    />
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* NAVIGATION */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-[#102A43] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={16} />
              Sebelumnya
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedAnswer || Boolean(safetyAlert)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentStep === screeningQuestions.length - 1
                ? "Lihat ringkasan jawaban"
                : "Selanjutnya"}

              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* DISCLAIMER */}
        <div className="mt-5 flex items-start gap-2.5 px-1">
          <ShieldCheck size={17} className="mt-0.5 shrink-0 text-slate-400" />

          <p className="text-xs leading-6 text-slate-400">
            Skrining ini bersifat edukatif dan bukan alat diagnosis. Jika
            kondisi memburuk, jangan menunggu skrining selesai untuk mencari
            pertolongan medis.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Screening;
