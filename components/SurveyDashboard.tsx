"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from "recharts";
import { surveyData } from "@/lib/survey-data";

const COLORS = {
  terracotta: "#F4A52C",
  crimson: "#8E001C",
  rose: "#D4A9A5",
  beige: "#F0E6D3",
  brown: "#7A5C48",
  amber: "#D4A017",
};

const PIE_COLORS = [
  COLORS.terracotta,
  COLORS.crimson,
  COLORS.rose,
  COLORS.brown,
  COLORS.amber,
];

const RADIAN = Math.PI / 180;
function PieLabel({ cx, cy, midAngle, innerRadius, outerRadius, pct }: {
  cx: number; cy: number; midAngle: number; innerRadius: number; outerRadius: number; pct: number;
}) {
  if (pct < 6) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${pct}%`}
    </text>
  );
}

function StatCard({ label, value, sub, color = "terracotta" }: {
  label: string; value: string | number; sub?: string; color?: string;
}) {
  const colorMap: Record<string, string> = {
    terracotta: "text-terracotta",
    sage: "text-crimson",
    crimson: "text-crimson",
    rose: "text-rose-mappa",
  };
  return (
    <div className="bg-white rounded-2xl p-6 border border-cream-dark">
      <div className={`font-serif text-4xl font-bold ${colorMap[color] || "text-terracotta"} mb-1`}>{value}</div>
      <div className="text-brown-dark font-medium text-sm">{label}</div>
      {sub && <div className="text-brown-light text-xs mt-1">{sub}</div>}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-serif text-lg font-semibold text-brown-dark mb-4 flex items-center gap-2">
      <span className="w-1 h-5 bg-terracotta rounded-full inline-block" />
      {children}
    </h3>
  );
}

export default function SurveyDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-brown-dark rounded-2xl p-8 text-white">
        <div className="text-terracotta-light text-xs font-medium uppercase tracking-widest mb-2">Survey Results</div>
        <h2 className="font-serif text-2xl font-bold mb-2">Discovering Arts & Culture in Rome</h2>
        <p className="text-white/60 text-sm">
          Survey conducted among international students in Rome — Spring 2026
        </p>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Respondents" value="490" sub="International students" />
        <StatCard label="Want a Platform" value="62%" sub="Answered Yes" color="sage" />
        <StatCard label="Find Events Hard" value="73%" sub="Not really + Very difficult" color="terracotta" />
        <StatCard label="Use Instagram" value="46%" sub="Primary discovery channel" color="rose" />
      </div>

      {/* Platform interest — highlight */}
      <div className="bg-white rounded-2xl p-6 border border-cream-dark">
        <SectionTitle>Would you be interested in a platform for students?</SectionTitle>
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="flex gap-2 h-12 rounded-xl overflow-hidden">
              {surveyData.platformInterest.map((item) => (
                <div
                  key={item.name}
                  style={{ width: `${item.pct}%` }}
                  className={`flex items-center justify-center text-white text-sm font-bold transition-all ${
                    item.name === "Yes" ? "bg-terracotta" : item.name === "Maybe" ? "bg-crimson/70" : "bg-brown-light"
                  }`}
                  title={`${item.name}: ${item.pct}%`}
                >
                  {item.pct > 10 ? `${item.pct}%` : ""}
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-3">
              {surveyData.platformInterest.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-sm text-brown-light">
                  <span className={`w-3 h-3 rounded-full ${item.name === "Yes" ? "bg-terracotta" : item.name === "Maybe" ? "bg-crimson/70" : "bg-brown-light"}`} />
                  {item.name} — {item.value}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="font-serif text-5xl font-bold text-terracotta">62%</div>
            <div className="text-sm text-brown-light mt-1">say <strong>Yes</strong></div>
          </div>
        </div>
      </div>

      {/* Row 1 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Student types */}
        <div className="bg-white rounded-2xl p-6 border border-cream-dark">
          <SectionTitle>Who responded?</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={surveyData.studentTypes}
                cx="50%"
                cy="50%"
                outerRadius={85}
                dataKey="value"
                labelLine={false}
                label={(props) => <PieLabel {...props} pct={props.pct} />}
              >
                {surveyData.studentTypes.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v} responses`]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Discovery ease */}
        <div className="bg-white rounded-2xl p-6 border border-cream-dark">
          <SectionTitle>Is it easy to find cultural events?</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={surveyData.discoveryEase}
                cx="50%"
                cy="50%"
                outerRadius={85}
                dataKey="value"
                labelLine={false}
                label={(props) => <PieLabel {...props} pct={props.pct} />}
              >
                {surveyData.discoveryEase.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v} responses`]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Social media */}
        <div className="bg-white rounded-2xl p-6 border border-cream-dark">
          <SectionTitle>Social media platforms used</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={surveyData.socialMedia} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0E6D3" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={90} />
              <Tooltip formatter={(v: number) => [`${v} responses`]} />
              <Bar dataKey="value" fill={COLORS.terracotta} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Preferred format */}
        <div className="bg-white rounded-2xl p-6 border border-cream-dark">
          <SectionTitle>What format would help most?</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={surveyData.preferredFormats} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0E6D3" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={100} />
              <Tooltip formatter={(v: number) => [`${v} responses`]} />
              <Bar dataKey="value" fill={COLORS.crimson} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Age groups */}
        <div className="bg-white rounded-2xl p-6 border border-cream-dark">
          <SectionTitle>Age distribution</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={surveyData.ageGroups}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0E6D3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [`${v} responses`]} />
              <Bar dataKey="value" fill={COLORS.rose} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cultural activities */}
        <div className="bg-white rounded-2xl p-6 border border-cream-dark">
          <SectionTitle>Cultural activities enjoyed (multi-select)</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={surveyData.culturalActivities} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0E6D3" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={90} />
              <Tooltip formatter={(v: number) => [`${v} mentions`]} />
              <Bar dataKey="value" fill={COLORS.brown} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attendance frequency */}
      <div className="bg-white rounded-2xl p-6 border border-cream-dark">
        <SectionTitle>How often do students attend cultural activities?</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {surveyData.attendanceFrequency.map((item) => (
            <div key={item.name} className="text-center p-4 bg-cream rounded-xl">
              <div className="font-serif text-3xl font-bold text-terracotta">{item.pct}%</div>
              <div className="text-sm text-brown-light mt-1">{item.name}</div>
              <div className="text-xs text-brown-light/60">{item.value} students</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
