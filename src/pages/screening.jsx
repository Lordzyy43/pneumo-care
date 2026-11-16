import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, HeartPulse, RotateCcw, ShieldAlert, ShieldCheck, AlertTriangle, Clock3, ClipboardList } from "lucide-react";
import { screeningQuestions } from "../data/screening/questions";
import QuestionCard from "../components/screening/QuestionCard";

const SCREENING_DRAFT_KEY = "pneumo-care-screening-draft";

function readScreeningDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(SCREENING_DRAFT_KEY) || "null");
    if (!draft || typeof draft !== "object") return null;
    const answers = Object.fromEntries(Object.entries(draft.answers || {}).filter(([id, value]) => screeningQuestions.some((question) => question.id === id && question.options.some((option) => option.value === value))));
    return { answers, currentStep: Math.min(Math.max(Number.isInteger(draft.currentStep) ? draft.currentStep : 0, 0), screeningQuestions.length - 1), started: Boolean(draft.started), review: Boolean(draft.review), onset: draft.onset || "" };
  } catch { return null; }
}

function Screening() {
  const navigate = useNavigate();
  const [initialDraft] = useState(readScreeningDraft);
  const [currentStep, setCurrentStep] = useState(initialDraft?.currentStep ?? 0);
  const [answers, setAnswers] = useState(initialDraft?.answers ?? {});
  const [started, setStarted] = useState(initialDraft?.started ?? false);
  const [review, setReview] = useState(initialDraft?.review ?? false);
  const [onset, setOnset] = useState(initialDraft?.onset ?? "");
  const [safetyAlert, setSafetyAlert] = useState(null);

  useEffect(() => {
    sessionStorage.setItem(SCREENING_DRAFT_KEY, JSON.stringify({ currentStep, answers, started, review, onset }));
  }, [currentStep, answers, started, review, onset]);

  const currentQuestion = screeningQuestions[currentStep];
  const selectedAnswer = answers[currentQuestion.id];
  const hasReportedSymptoms = ["breathingDifficulty", "oneSidedChestPain", "rapidBreathing"].some((id) => answers[id] === "yes");
  const answeredCount = screeningQuestions.filter((question) => answers[question.id]).length;

  function handleAnswer(value) {
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);
    const safety = currentQuestion.safety;
    setSafetyAlert(safety?.triggerValues?.includes(value) ? { priority: safety.priority, message: safety.message } : null);
  }

  function handleNext() {
    if (!selectedAnswer || safetyAlert) return;
    if (currentStep < screeningQuestions.length - 1) setCurrentStep((step) => step + 1);
    else setReview(true);
  }

  function handleRestart() {
    sessionStorage.removeItem(SCREENING_DRAFT_KEY);
    setCurrentStep(0); setAnswers({}); setStarted(false); setReview(false); setOnset(""); setSafetyAlert(null);
  }

  function showQuestion(index) {
    setCurrentStep(index); setReview(false);
    const question = screeningQuestions[index];
    const answer = answers[question.id];
    const safety = question.safety;
    setSafetyAlert(safety?.triggerValues?.includes(answer) ? { priority: safety.priority, message: safety.message } : null);
  }

  function finishScreening() {
    sessionStorage.removeItem(SCREENING_DRAFT_KEY);
    navigate("/screening/result", { state: { answers, onset: hasReportedSymptoms ? onset : "" } });
  }

  if (safetyAlert) {
    const isEmergency = safetyAlert.priority === "emergency";
    return <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-5 py-12 sm:px-8"><div className="mx-auto max-w-2xl"><section role="alert" aria-live="assertive" className={`rounded-3xl border bg-white p-6 shadow-sm sm:p-10 ${isEmergency ? "border-red-200" : "border-amber-200"}`}>
      <div className={`mb-6 grid size-14 place-items-center rounded-2xl ${isEmergency ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>{isEmergency ? <ShieldAlert size={30} /> : <AlertTriangle size={30} />}</div>
      <p className={`text-xs font-extrabold tracking-[2px] ${isEmergency ? "text-red-600" : "text-amber-600"}`}>{isEmergency ? "PERINGATAN MEDIS DARURAT" : "PERINGATAN MEDIS SEGERA"}</p>
      <h1 className="mt-3 text-3xl font-extrabold text-[#102A43]">{isEmergency ? "Segera cari pertolongan darurat." : "Anda memerlukan penilaian medis segera."}</h1>
      <p className="mt-5 text-sm leading-7 text-slate-600">{safetyAlert.message}</p>
      <div className={`mt-7 rounded-2xl border p-5 ${isEmergency ? "border-red-100 bg-red-50" : "border-amber-100 bg-amber-50"}`}><h2 className="font-bold">Langkah yang perlu dilakukan</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6"><li>{isEmergency ? "Hubungi layanan darurat setempat atau minta bantuan menuju IGD sekarang." : "Segera hubungi tenaga medis atau fasilitas pelayanan kesehatan untuk memperoleh penilaian."}</li><li>Jika kondisi memburuk, muncul sesak napas berat, atau pingsan, cari pertolongan darurat.</li><li>Jangan menunda pertolongan untuk menyelesaikan skrining.</li></ul></div>
      <p className="mt-6 rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-500">Peringatan ini didasarkan pada jawaban Anda dan bukan diagnosis. Aplikasi tidak dapat memastikan penyebab gejala atau menentukan kondisi medis Anda.</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={() => setSafetyAlert(null)} className="min-h-12 rounded-xl border px-5 text-sm font-semibold">Periksa kembali jawaban</button><button type="button" onClick={handleRestart} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold"><RotateCcw size={16} />Mulai ulang</button><Link to="/education" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102A43] px-5 text-sm font-semibold text-white">Buka materi edukasi</Link></div>
    </section></div></main>;
  }

  return <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-5 py-10 sm:px-8 sm:py-14"><div className="mx-auto max-w-3xl">
    <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#102A43]"><ArrowLeft size={16} />Kembali ke beranda</Link>
    <header className="mt-8"><div className="flex items-center gap-2 text-xs font-extrabold tracking-[1.7px] text-teal-700"><HeartPulse size={17} />PNEUMO CARE SCREENING</div><h1 className="mt-4 text-3xl font-extrabold text-[#102A43] sm:text-4xl">Kenali kondisi Anda</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">Skrining edukatif untuk membantu merangkum gejala dan faktor riwayat yang dapat Anda diskusikan dengan tenaga medis.</p></header>
    {!started ? <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"><div className="grid size-14 place-items-center rounded-2xl bg-teal-50 text-teal-700"><ClipboardList size={28} /></div><h2 className="mt-5 text-2xl font-bold text-[#102A43]">Sebelum mulai</h2><p className="mt-3 text-sm leading-7 text-slate-600">Jawab berdasarkan kondisi saat ini dan riwayat Anda. Anda dapat meninjau jawaban sebelum melihat ringkasan.</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-4"><Clock3 className="text-teal-700" size={20} /><p className="mt-3 text-sm font-bold">Sekitar 2 menit</p><p className="mt-1 text-xs leading-5 text-slate-500">{screeningQuestions.length} pertanyaan singkat.</p></div><div className="rounded-2xl bg-slate-50 p-4"><ShieldAlert className="text-amber-700" size={20} /><p className="mt-3 text-sm font-bold">Utamakan keselamatan</p><p className="mt-1 text-xs leading-5 text-slate-500">Jika sesak berat atau mendadak, cari pertolongan darurat.</p></div></div><p className="mt-5 text-xs leading-6 text-slate-500">Jawaban disimpan sementara di sesi tab ini agar Anda dapat melanjutkan jika halaman dimuat ulang. Data tidak dikirim ke server.</p><button type="button" onClick={() => setStarted(true)} className="mt-7 min-h-12 w-full rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700">{initialDraft?.started ? "Lanjutkan skrining" : "Mulai skrining"}</button></section> : review ? <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="text-2xl font-bold text-[#102A43]">Tinjau jawaban</h2><p className="mt-2 text-sm leading-6 text-slate-500">Pilih Ubah untuk kembali ke pertanyaan terkait.</p><div className="mt-6 space-y-3">{screeningQuestions.map((question, index) => <div key={question.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold text-teal-700">{question.category}</p><p className="mt-1 text-sm font-semibold text-[#102A43]">{question.title}</p><p className="mt-1 text-xs text-slate-500">Jawaban: {question.options.find((option) => option.value === answers[question.id])?.label || "Belum dijawab"}</p></div><button type="button" onClick={() => showQuestion(index)} className="min-h-10 rounded-lg border px-4 text-sm font-semibold">Ubah</button></div>)}</div>{hasReportedSymptoms && <div className="mt-6 rounded-2xl bg-teal-50 p-5"><label htmlFor="symptom-onset" className="block text-sm font-bold text-[#102A43]">Kapan keluhan mulai terasa?</label><p className="mt-1 text-xs leading-5 text-slate-600">Konteks ini membantu saat menjelaskan keluhan kepada tenaga medis dan tidak mengubah hasil skrining.</p><select id="symptom-onset" value={onset} onChange={(event) => setOnset(event.target.value)} className="mt-3 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"><option value="">Pilih (opsional)</option><option>Baru saja atau mendadak</option><option>Dalam beberapa jam terakhir</option><option>Sudah lebih lama</option><option>Tidak yakin</option></select></div>}<div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-between"><button type="button" onClick={() => { setReview(false); setCurrentStep(screeningQuestions.length - 1); }} className="min-h-12 rounded-xl border px-5 text-sm font-semibold">Kembali ke pertanyaan</button><button type="button" onClick={finishScreening} disabled={answeredCount !== screeningQuestions.length} className="min-h-12 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white disabled:opacity-40">Lihat panduan hasil</button></div>{answeredCount !== screeningQuestions.length && <p className="mt-3 text-xs text-amber-700">Lengkapi semua pertanyaan sebelum melihat hasil.</p>}</section> : <QuestionCard question={currentQuestion} index={currentStep} total={screeningQuestions.length} selectedAnswer={selectedAnswer} onAnswer={handleAnswer} onBack={() => setCurrentStep((step) => Math.max(0, step - 1))} canGoBack={currentStep > 0} onNext={handleNext} nextLabel={currentStep === screeningQuestions.length - 1 ? "Tinjau jawaban" : "Selanjutnya"} />}
    <div className="mt-5 flex items-start gap-2.5 px-1"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-slate-400" /><p className="text-xs leading-6 text-slate-500">Skrining ini bersifat edukatif dan bukan alat diagnosis. Jika kondisi memburuk, jangan menunggu skrining selesai untuk mencari pertolongan medis.</p></div>
  </div></main>;
}

export default Screening;
