import * as React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Line,
} from "recharts";

const DATA = [
  { m: "Apr", payments: 42_000, growth: 6.2 },
  { m: "May", payments: 58_200, growth: 8.1 },
  { m: "Jun", payments: 73_500, growth: 9.4 },
  { m: "Jul", payments: 91_300, growth: 11.8 },
  { m: "Aug", payments: 106_800, growth: 12.6 },
  { m: "Sep", payments: 128_400, growth: 14.9 },
];

const getVar = (v: string, fb: string) =>
  typeof window !== "undefined"
    ? getComputedStyle(document.documentElement).getPropertyValue(v).trim() || fb
    : fb;

export default function TrialGrowthSection() {
  const [theme, setTheme] = React.useState({
    border: "#E9EEF5",
    text: "#64748B",
    primary: "#2563EB",
    primary10: "rgba(37, 99, 235, .10)",
    violet: "#7C3AED",
  });
  React.useEffect(() => {
    setTheme({
      border: getVar("--fb-border", "#E9EEF5"),
      text: getVar("--fb-muted", "#64748B"),
      primary: getVar("--fb-primary", "#2563EB"),
      primary10: getVar("--fb-primary-10", "rgba(37,99,235,.10)"),
      violet: getVar("--fb-violet", "#7C3AED"),
    });
  }, []);

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 md:grid-cols-2 md:items-center">
        {/* LEFT: texto + CTAs menores */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.36 }}
        >
          <h2 className="max-w-xl text-5xl font-extrabold leading-tight text-slate-900 md:text-[44px]">
            Start with a 7-day free <br className="hidden md:block" /> trial of Pro.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[color:var(--fb-muted,#64748B)]">
            No credit card required. Cancel anytime. All features included.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* CTAs menores (40px) */}
            <button
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[color:var(--fb-primary)] px-5 text-[15px] font-medium text-white shadow-[0_1px_2px_rgba(16,24,40,.08)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[color:var(--fb-primary)]"
            >
              Start for free
            </button>
            <button
              className="inline-flex h-10 items-center justify-center rounded-xl border border-[color:var(--fb-border)] bg-white px-5 text-[15px] font-medium text-slate-700 transition hover:bg-[color:var(--fb-primary-10)] focus:outline-none focus:ring-2 focus:ring-[color:var(--fb-primary)]"
            >
              See our plans
            </button>
          </div>

          {/* micro-stats para credibilidade */}
          <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--fb-border)] bg-white px-2.5 py-1">
              99.2% payment success
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--fb-border)] bg-white px-2.5 py-1">
              Avg. payout time 1.8 days
            </span>
          </div>
        </motion.div>

        {/* RIGHT: Card com gráfico animado Payments & Growth */}
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.36 }}
          className="relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm"
          style={{ borderColor: theme.border }}
          aria-label="Payments and growth chart"
        >
          {/* halo sutil */}
          <div className="pointer-events-none absolute inset-0 opacity-[.35]"
               style={{
                 background:
                   "radial-gradient(600px 220px at 70% 20%, rgba(59,130,246,.06), transparent 60%)",
               }}
          />

          {/* Chart */}
          <div className="relative z-10 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={DATA} margin={{ top: 10, right: 16, left: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.primary} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={theme.primary10} stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#EEF2F7" strokeDasharray="3 3" />
                <XAxis dataKey="m" tick={{ fill: theme.text, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: theme.text, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: theme.text, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, "dataMax + 4"]}
                  unit="%"
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: `1px solid ${theme.border}`,
                    boxShadow: "0 1px 2px rgba(16,24,40,.04)",
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: 8 }} />
                <Bar
                  yAxisId="left"
                  dataKey="payments"
                  name="Payments (USD)"
                  fill="url(#barFill)"
                  stroke={theme.primary}
                  strokeOpacity={0.4}
                  radius={8}
                  isAnimationActive
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="growth"
                  name="Growth (%)"
                  stroke={theme.violet}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3 }}
                  isAnimationActive
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* pulses de pagamentos (micro-animação suave) */}
          <div className="pointer-events-none absolute bottom-8 right-8 flex items-center gap-2">
            <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--fb-primary)]">
              <span className="absolute inset-0 -m-1 rounded-full bg-[color:var(--fb-primary)]/40 blur-[2px] animate-ping" />
            </span>
            <span className="text-xs font-medium text-slate-600">new payment</span>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}