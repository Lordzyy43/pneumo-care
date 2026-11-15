import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu } from "lucide-react";

function Navbar() {
  return (
    <header className="border-b border-slate-200/80 bg-slate-50">
      <div className="mx-auto flex min-h-[80px] w-[calc(100%-36px)] max-w-[1200px] items-center justify-between gap-4 md:w-[calc(100%-64px)]">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-xl bg-[#102A43] text-xl font-extrabold text-white">
            P
          </span>

          <span>
            <span className="block text-lg font-bold tracking-tight text-[#102A43]">
              Pneumo
            </span>
            <span className="block text-[10px] font-extrabold tracking-[3px] text-teal-600">
              CARE
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-8 md:flex"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-semibold transition-colors ${
                isActive
                  ? "text-[#102A43]"
                  : "text-slate-500 hover:text-[#102A43]"
              }`
            }
          >
            Beranda
          </NavLink>

          <NavLink
            to="/education"
            className={({ isActive }) =>
              `text-sm font-semibold transition-colors ${
                isActive
                  ? "text-[#102A43]"
                  : "text-slate-500 hover:text-[#102A43]"
              }`
            }
          >
            Edukasi
          </NavLink>
        </nav>

        <Link
          to="/screening"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-3 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 sm:px-5 sm:text-sm"
        >
          Mulai Skrining
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
