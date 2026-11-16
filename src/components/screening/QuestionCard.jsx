import { ArrowLeft, ArrowRight } from "lucide-react";

export default function QuestionCard({
  question,
  index,
  total,
  selectedAnswer,
  onAnswer,
  onBack,
  onNext,
  canGoBack,
  nextLabel,
}) {
  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(16,42,67,0.04)] sm:mt-10 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-[#102A43]">Pertanyaan {index + 1} dari {total}</p>
        <span className="text-sm font-bold text-teal-700">{Math.round(((index + (selectedAnswer ? 1 : 0)) / total) * 100)}%</span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Progres skrining" aria-valuemin={0} aria-valuemax={total} aria-valuenow={index + (selectedAnswer ? 1 : 0)}>
        <div className="h-full rounded-full bg-teal-500 transition-all duration-300" style={{ width: `${((index + (selectedAnswer ? 1 : 0)) / total) * 100}%` }} />
      </div>
      <div className="mt-8">
        <span className="inline-flex rounded-full bg-teal-50 px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-teal-700">{question.category}</span>
        <h2 id="screening-question" className="mt-4 text-xl leading-relaxed font-bold tracking-tight text-[#102A43] sm:text-2xl">{question.title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-500">{question.description}</p>
      </div>
      <fieldset className="mt-7" aria-labelledby="screening-question">
        <legend className="mb-4 text-sm font-bold text-[#102A43]">Pilih salah satu jawaban</legend>
        <div className="space-y-3">
          {question.options.map((option) => {
            const checked = selectedAnswer === option.value;
            return <label key={option.value} className={`flex min-h-14 cursor-pointer items-center justify-between rounded-2xl border p-4 transition focus-within:ring-2 focus-within:ring-blue-300 ${checked ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}>
              <span className="text-sm font-semibold text-slate-700">{option.label}</span>
              <input type="radio" name={`question-${question.id}`} value={option.value} checked={checked} onChange={() => onAnswer(option.value)} className="size-5 accent-blue-600" />
            </label>;
          })}
        </div>
      </fieldset>
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
        <button type="button" onClick={onBack} disabled={!canGoBack} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold disabled:opacity-40"><ArrowLeft size={16} />Sebelumnya</button>
        <button type="button" onClick={onNext} disabled={!selectedAnswer} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white disabled:opacity-40">{nextLabel}<ArrowRight size={16} /></button>
      </div>
    </section>
  );
}
