import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Plus, ShieldCheck } from "lucide-react";

function Home() {
  return (
    <main className="overflow-hidden bg-slate-50 text-[#102A43]">
      <section className="mx-auto grid min-h-[600px] w-[calc(100%-36px)] max-w-[1200px] items-center gap-12 py-16 md:w-[calc(100%-64px)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-20">
        <div className="max-w-[620px]">
          <div className="inline-flex items-center gap-2.5 text-[11px] font-extrabold tracking-[1.7px] text-teal-600">
            <span className="size-2 rounded-full bg-teal-500" />
            HEALTH EDUCATION PLATFORM
          </div>

          <h1 className="mt-7 text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-extrabold tracking-[-0.055em]">
            Understand the signs.
            <br />
            <span className="text-blue-600">Act at the right time.</span>
          </h1>

          <p className="mt-6 max-w-[500px] text-sm leading-8 text-slate-500 sm:text-base">
            Kenali tanda dan gejala tension pneumothorax, pahami informasi
            kesehatannya, dan ketahui kapan pertolongan medis diperlukan.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/screening"
              className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Mulai Skrining
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            <Link
              to="/education"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-[#102A43] transition hover:border-blue-400"
            >
              Pelajari Kondisi Ini
            </Link>
          </div>

          <p className="mt-7 flex max-w-[460px] items-start gap-2.5 text-xs leading-6 text-slate-400">
            <ShieldCheck
              size={17}
              className="mt-0.5 shrink-0 text-teal-600"
              aria-hidden="true"
            />
            Informasi edukatif untuk membantu memahami gejala, bukan pengganti
            diagnosis tenaga medis.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="relative isolate grid min-h-[360px] place-items-center sm:min-h-[440px]"
        >
          <div className="absolute -z-10 size-[260px] rounded-full border border-slate-200 sm:size-[310px]" />
          <div className="absolute -z-10 size-[320px] rounded-full border border-slate-200 sm:size-[390px]" />

          <div className="w-full max-w-[340px] rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_24px_70px_rgba(16,42,67,0.09)] sm:p-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold tracking-[2px] text-slate-500">
                PNEUMO CARE
              </span>
              <span className="size-2 rounded-full bg-teal-500" />
            </div>

            <div className="my-3 rounded-2xl bg-[radial-gradient(ellipse_at_center,_#eef8fc_0%,_#f8fafc_70%)]">
              <svg
                viewBox="0 0 300 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto block w-full max-w-[290px]"
              >
                <path
                  d="M146 48V133M154 48V133"
                  stroke="#6D9FAE"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M146 95L119 128M154 95L181 128"
                  stroke="#6D9FAE"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M132 113C113 95 98 111 83 137C68 163 52 199 65 224C76 246 111 236 128 217C141 202 143 174 143 148V126C143 119 138 115 132 113Z"
                  fill="#BCECE5"
                  stroke="#248F8A"
                  strokeWidth="3"
                />
                <path
                  d="M168 113C187 95 202 111 217 137C232 163 248 199 235 224C224 246 189 236 172 217C159 202 157 174 157 148V126C157 119 162 115 168 113Z"
                  fill="#C9DFFF"
                  stroke="#4D82CE"
                  strokeWidth="3"
                />
                <path
                  d="M143 139L112 166M143 157L104 194M143 176L119 205M157 139L188 166M157 157L196 194M157 176L181 205"
                  stroke="#6D9FAE"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="150" cy="30" r="12" fill="#D7F4EF" />
                <circle cx="150" cy="30" r="5" fill="#248F8A" />
              </svg>
            </div>

            <div className="flex items-center gap-2.5 border-t border-slate-100 pt-4 text-[11px] text-slate-500">
              <span className="size-2 rounded-full bg-teal-500" />
              Knowledge starts with awareness
            </div>
          </div>

          <div className="absolute right-0 bottom-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-[0_15px_40px_rgba(16,42,67,0.10)] sm:right-[-8px] sm:bottom-10 sm:p-4">
            <span className="grid size-9 place-items-center rounded-xl bg-teal-50 text-teal-700">
              <Plus size={24} />
            </span>
            <div>
              <strong className="block text-xs">Know the signs</strong>
              <span className="mt-1 block text-[10px] text-slate-400">
                Recognize warning symptoms
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EEF4FA]">
        <div className="mx-auto flex w-[calc(100%-36px)] max-w-[1200px] flex-col gap-5 py-12 md:w-[calc(100%-64px)] md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div>
            <span className="text-[11px] font-extrabold tracking-[1.7px] text-teal-600">
              YOUR HEALTH, YOUR AWARENESS
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Understand before you act.
            </h2>
          </div>

          <p className="max-w-[470px] text-sm leading-7 text-slate-500">
            Pelajari kondisi tension pneumothorax melalui informasi yang
            terstruktur dan panduan respons awal yang mengutamakan keselamatan.
          </p>

          <Link
            to="/education"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Baca materi edukasi
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
