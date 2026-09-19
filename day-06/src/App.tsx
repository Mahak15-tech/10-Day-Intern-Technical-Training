"use client"; // needed for Next.js App Router; harmless in plain React

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import "./app.css";

type Employee = {
  id: number;
  name: string;
  department: string;
  salary: number;
};

type Theme = "light" | "dark";

// Change this to your Node.js endpoint (or set NEXT_PUBLIC_API_URL in .env.local)
const API_URL =
  (globalThis as { process?: { env?: { NEXT_PUBLIC_API_URL?: string } } }).process
    ?.env?.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/employees";

// Shown if the API can't be reached, so the page is never blank
const SAMPLE: Employee[] = [
  { id: 1, name: "Aarav Sharma", department: "Engineering", salary: 45000 },
  { id: 2, name: "Sneha Patil", department: "Design", salary: 38000 },
  { id: 3, name: "Rohan Mehta", department: "Marketing", salary: 32000 },
  { id: 4, name: "Priya Desai", department: "HR", salary: 28000 },
  { id: 5, name: "Vihaan Joshi", department: "Sales", salary: 35000 },
  { id: 6, name: "Kavya Nair", department: "Finance", salary: 42000 },
];

// Accepts slightly different field names from the backend
function normalize(raw: any): Employee {
  return {
    id: Number(raw.id ?? raw.employeeId ?? raw._id),
    name: String(raw.name ?? raw.fullName ?? "Unnamed"),
    department: String(raw.department ?? raw.dept ?? "General"),
    salary: Number(raw.salary ?? raw.monthlySalary ?? 0),
  };
}

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

/* Counts up from 0 to `target` (skipped when the user prefers reduced motion) */
function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3)))); // ease-out
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

/* ---------- Icons (one consistent 1.8px stroke set) ---------- */
function Icon({ size = 24, children }: { size?: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
type IconProps = { size?: number };

const UsersIcon = ({ size }: IconProps) => (
  <Icon size={size}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
    <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c2.1.7 3.5 2.5 3.5 5.2" />
  </Icon>
);
const GridIcon = ({ size }: IconProps) => (
  <Icon size={size}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
  </Icon>
);
const RupeeIcon = ({ size }: IconProps) => (
  <Icon size={size}>
    <path d="M7 5h11M7 9.5h11M7 5c5.5 0 5.5 8 0 8H6.5l8.5 7" />
  </Icon>
);
const SearchIcon = ({ size }: IconProps) => (
  <Icon size={size}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </Icon>
);
const BuildingIcon = ({ size }: IconProps) => (
  <Icon size={size}>
    <path d="M4 21V5.5L12 3l8 2.5V21M9 21v-4h6v4M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01" />
  </Icon>
);
const ChevronIcon = ({ size }: IconProps) => (
  <Icon size={size}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);
const PersonIcon = ({ size }: IconProps) => (
  <Icon size={size}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
  </Icon>
);
const SunIcon = ({ size }: IconProps) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
  </Icon>
);
const MoonIcon = ({ size }: IconProps) => (
  <Icon size={size}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
  </Icon>
);

/* Leaf sprig in the hero; draws itself once on load */
const LeafDoodle = () => (
  <svg
    className="hero-doodle"
    viewBox="0 0 200 110"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path pathLength={1} d="M6 96C40 92 66 74 96 60c16-7.5 34-12 60-10" />
    <path pathLength={1} d="M96 60c-2-16 6-30 22-38 4 16-2 32-22 38Z" />
    <path pathLength={1} d="M96 60c-14-10-18-26-10-42 15 8 20 24 10 42Z" />
    <path pathLength={1} d="M136 52c6-10 16-16 30-16-2 12-12 18-30 16Z" />
  </svg>
);

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [status, setStatus] = useState<"loading" | "live" | "offline">("loading");
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All Departments");
  const [theme, setTheme] = useState<Theme>("light");

  /* Theme: use saved choice, otherwise the system preference */
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("es-theme");
    } catch {}
    const initial: Theme =
      saved === "dark" || saved === "light"
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("es-theme", next);
    } catch {}
  };

  /* Load employees */
  useEffect(() => {
    let cancelled = false;
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data.employees ?? [];
        setEmployees(list.map(normalize));
        setStatus("live");
      })
      .catch(() => {
        if (cancelled) return;
        setEmployees(SAMPLE);
        setStatus("offline");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const departments = useMemo(
    () => ["All Departments", ...Array.from(new Set(employees.map((e) => e.department)))],
    [employees]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return employees.filter(
      (e) =>
        (dept === "All Departments" || e.department === dept) &&
        (q === "" ||
          e.name.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q) ||
          String(e.id).includes(q))
    );
  }, [employees, query, dept]);

  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
  const deptCount = Math.max(departments.length - 1, 0);

  const shownEmployees = useCountUp(employees.length, 800);
  const shownDepts = useCountUp(deptCount, 800);
  const shownSalary = useCountUp(totalSalary, 1200);

  return (
    <div className="page">
      <header className="header">
        <div className="logo">
          Employee<em>Sphere.</em>
        </div>
        <div className="header-actions">
          <div className={`status-pill ${status === "offline" ? "offline" : ""}`}>
            {status === "live" && "Live API connected"}
            {status === "offline" && "API offline · showing sample data"}
            {status === "loading" && "Connecting…"}
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            title={theme === "light" ? "Dark theme" : "Light theme"}
          >
            {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>
        </div>
      </header>

      <section className="hero">
        <p className="eyebrow">Employee management</p>
        <h1 className="hero-title">
          Manage your team <em>with clarity.</em>
        </h1>
        <p className="hero-sub">
          A simple and beautiful workspace to view and understand your employees.
        </p>
        <LeafDoodle />
      </section>

      <section className="stats" aria-label="Summary">
        <div className="stat-card">
          <div className="icon-bubble">
            <UsersIcon />
          </div>
          <div>
            <span className="stat-label">Total employees</span>
            <span className="stat-value">{shownEmployees}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-bubble">
            <GridIcon />
          </div>
          <div>
            <span className="stat-label">Departments</span>
            <span className="stat-value">{shownDepts}</span>
          </div>
        </div>
        <div className="stat-card highlight">
          <div className="icon-bubble">
            <RupeeIcon />
          </div>
          <div>
            <span className="stat-label">Total salary</span>
            <span className="stat-value">{inr(shownSalary)}</span>
          </div>
        </div>
      </section>

      <section className="workforce" aria-labelledby="team-title">
        <div className="panel-head">
          <div>
            <p className="section-eyebrow">Your workforce</p>
            <h2 className="section-title" id="team-title">
              Team members
            </h2>
          </div>
          <span className="count" aria-live="polite">
            {visible.length} {visible.length === 1 ? "employee" : "employees"}
          </span>
        </div>

        <div className="toolbar">
          <div className="search-wrap">
            <SearchIcon size={20} />
            <input
              className="search"
              type="search"
              placeholder="Search employees…"
              aria-label="Search employees"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="select-wrap">
            <BuildingIcon size={20} />
            <select
              className="select"
              aria-label="Filter by department"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <span className="select-chevron">
              <ChevronIcon size={18} />
            </span>
          </div>
        </div>

        <div className="grid">
          {status === "loading" &&
            Array.from({ length: 6 }).map((_, i) => <div className="skeleton" key={i} />)}

          {status !== "loading" && visible.length === 0 && (
            <div className="empty">
              No employees match your search. Clear the filters to see everyone.
            </div>
          )}

          {visible.map((e, i) => (
            <article className="card" key={e.id} style={{ "--i": i } as CSSProperties}>
              <div className="card-top">
                <div className="avatar" aria-hidden="true">
                  {e.name.charAt(0).toUpperCase()}
                </div>
                <div className="card-id">
                  <h3 className="name">{e.name}</h3>
                  <span className="dept" data-dept={e.department}>
                    {e.department}
                  </span>
                </div>
                <span className="badge">#{String(e.id).padStart(3, "0")}</span>
              </div>
              <div className="meta">
                <div className="meta-item">
                  <PersonIcon size={20} />
                  <div>
                    <span className="meta-label">Employee ID</span>
                    <span className="meta-value">{e.id}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <RupeeIcon size={20} />
                  <div>
                    <span className="meta-label">Monthly salary</span>
                    <span className="meta-value">{inr(e.salary)}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">EmployeeSphere · Built with Next.js and Node.js</footer>
    </div>
  );
}