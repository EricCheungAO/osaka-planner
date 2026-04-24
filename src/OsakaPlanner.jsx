import React, { useState, useEffect } from "react";
import {
  Plane, MapPin, Clock, Coffee, UtensilsCrossed, ShoppingBag,
  Train, Umbrella, Sparkles, Camera, Moon, Sun, Hotel,
  Navigation, Heart, AlertCircle, Cloud, CloudRain, ChevronRight,
  CheckCircle2, Circle, Languages, Map as MapIcon, Share2, X,
  Wallet,
} from "lucide-react";

// ================= PALETTE =================
const C = {
  primary: "#FF85A1",      // Vibrant Pink
  primaryDeep: "#E56A87",  // Pressed pink
  secondary: "#FFD1DC",    // Pastel Pink
  accent: "#FFB7C5",       // Sakura
  bg: "#FFF5F7",           // Blush wash
  cloud: "#FDF2F5",        // Very-light pink subsurface
  hairline: "#F5D5DD",     // Soft pink hairline
  text: "#4A0E0E",         // Deep Cocoa
  subtext: "#8E6E6E",      // Muted Rose
  white: "#FFFFFF",
};

export default function OsakaPlanner() {
  const [activeTab, setActiveTab] = useState("plan");
  const [expandedDay, setExpandedDay] = useState(1);
  const [likedCafes, setLikedCafes] = useState({});
  const [packed, setPacked] = useState({});
  const [rainMode, setRainMode] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  // Inject Inter font
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Shippori+Mincho:wght@500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch (e) {} };
  }, []);

  // Scroll to top on tab change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [activeTab]);

  const font = { fontFamily: '"Inter", -apple-system, sans-serif', fontWeight: 500 };
  const serif = { fontFamily: '"Shippori Mincho", "Inter", serif' };

  const toggleLike = (name) => setLikedCafes((p) => ({ ...p, [name]: !p[name] }));
  const togglePacked = (i) => setPacked((p) => ({ ...p, [i]: !p[i] }));

  return (
    <div
      className="min-h-screen w-full relative"
      style={{ ...font, backgroundColor: C.bg, color: C.text }}
    >
      {/* =========== ANIMATIONS & GLOBAL STYLES =========== */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartPop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        @keyframes fabIn {
          from { opacity: 0; transform: scale(0.7) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .anim-fade { animation: fadeInUp 0.4s ease-out; }
        .anim-heart { animation: heartPop 0.3s ease-out; }
        .anim-fab { animation: fabIn 0.2s ease-out; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>

      {/* =========== HERO =========== */}
      <header className="relative overflow-hidden pt-14 pb-14 px-6">
        {/* Blur orbs */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: "-15%", right: "-10%", width: "360px", height: "360px",
            background: `radial-gradient(circle, ${C.secondary}, transparent 70%)`,
            filter: "blur(60px)", opacity: 0.9,
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            bottom: "-30%", left: "-15%", width: "280px", height: "280px",
            background: `radial-gradient(circle, ${C.accent}, transparent 70%)`,
            filter: "blur(50px)", opacity: 0.7,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center anim-fade">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              border: `1px solid ${C.hairline}`,
            }}
          >
            <Sparkles size={13} style={{ color: C.primary }} />
            <span
              className="uppercase"
              style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: C.primary }}
            >
              May 27 – May 31, 2026
            </span>
          </div>

          <h1
            className="tracking-tight mb-3"
            style={{
              fontSize: "clamp(48px, 9vw, 84px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              color: C.text,
            }}
          >
            Osaka <span style={{ color: C.primary, fontStyle: "italic", fontWeight: 900 }}>Magic.</span>
          </h1>
          <p style={{ fontSize: "15px", fontWeight: 500, color: C.subtext }}>
            Taiwan <span style={{ color: C.primary }}>✈</span> Osaka · A dreamy 5-day escape for two
          </p>
        </div>
      </header>

      {/* =========== QUICK STATUS CARDS =========== */}
      <div className="px-6 mb-10">
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-1">
          {[
            { icon: Hotel, label: "Namba Base", sub: "Same hotel · 2 rooms" },
            { icon: Plane, label: "TPE → KIX", sub: "EVA / Starlux / CAL" },
            { icon: Umbrella, label: "May Weather", sub: "22°C · tsuyu start" },
            { icon: Wallet, label: "Budget", sub: "¥80–120k p.p." },
            { icon: Languages, label: "Language", sub: "中 / 日 / EN" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 p-4 rounded-2xl"
              style={{
                backgroundColor: C.white,
                border: `1px solid ${C.hairline}`,
                boxShadow: "0 2px 12px -4px rgba(255,133,161,0.12)",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: C.cloud }}
              >
                <item.icon size={15} style={{ color: C.primary }} />
              </div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: C.text }}>{item.label}</div>
              <div style={{ fontSize: "11px", fontWeight: 500, color: C.subtext, marginTop: "2px" }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========== STRATEGIC PICK CARD =========== */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div
          className="rounded-3xl p-7 md:p-9"
          style={{
            backgroundColor: C.white,
            border: `1px solid ${C.hairline}`,
            boxShadow: "0 10px 40px -15px rgba(255,133,161,0.25)",
          }}
        >
          <div
            className="uppercase mb-2"
            style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: C.primary }}
          >
            ♡ Strategic pick
          </div>
          <h2
            style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.015em", color: C.text, lineHeight: 1.15 }}
          >
            Stay in <span style={{ color: C.primary, fontStyle: "italic" }}>Namba</span>, not Umeda.
          </h2>
          <p
            className="mt-4"
            style={{ fontSize: "15px", fontWeight: 500, color: C.text, lineHeight: 1.55, opacity: 0.85 }}
          >
            The Nankai Rapi:t drops you direct at Namba Station in 38 min (¥1,450) with zero transfers
            — which matters when you're landing midday with luggage. Namba keeps you walking-distance
            to Dotonbori, Kuromon, and Shinsaibashi, and the Midosuji line reaches Umeda in 8 min for
            the Day 4 slow walk.
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {["Cross Hotel Osaka", "Monterey Grasmere", "Swissotel Nankai", "HOTEL THE FLAG"].map((h) => (
              <span
                key={h}
                className="rounded-full px-3 py-1.5"
                style={{
                  fontSize: "12px", fontWeight: 600, color: C.primary,
                  backgroundColor: C.cloud, border: `1px solid ${C.hairline}`,
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Flight options */}
          <div
            className="mt-7 pt-6"
            style={{ borderTop: `1px dashed ${C.hairline}` }}
          >
            <div
              className="uppercase mb-4"
              style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", color: C.subtext }}
            >
              Full-service flights · target midday KIX
            </div>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {[
                { carrier: "EVA Air BR132", route: "10:20 → 13:30", tag: "Early midday" },
                { carrier: "China Air CI172", route: "09:25 → 12:45", tag: "Earliest" },
                { carrier: "Starlux JX820", route: "10:35 → 13:30", tag: "Premium" },
                { carrier: "EVA Air BR178", route: "13:55 → 17:20", tag: "Backup" },
              ].map((f) => (
                <div key={f.carrier} className="flex items-baseline justify-between gap-3">
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: C.text }}>{f.carrier}</div>
                    <div style={{ fontSize: "12px", fontWeight: 500, color: C.subtext }}>{f.route}</div>
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 whitespace-nowrap"
                    style={{
                      fontSize: "10px", fontWeight: 700, color: C.primary,
                      backgroundColor: C.cloud, border: `1px solid ${C.hairline}`,
                    }}
                  >
                    {f.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========== MAIN CONTENT =========== */}
      <main className="max-w-4xl mx-auto px-6 pb-32">
        <div key={activeTab} className="anim-fade">
          {activeTab === "plan" && (
            <PlanTab
              expandedDay={expandedDay}
              setExpandedDay={setExpandedDay}
              rainMode={rainMode}
              setRainMode={setRainMode}
            />
          )}
          {activeTab === "cafes" && (
            <CafesTab likedCafes={likedCafes} onLike={toggleLike} />
          )}
          {activeTab === "budget" && <BudgetTab />}
          {activeTab === "kit" && <KitTab packed={packed} onToggle={togglePacked} />}
        </div>
      </main>

      {/* =========== BOTTOM TAB NAV (Floating Pill) =========== */}
      <nav
        className="fixed z-40 h-16 flex items-center justify-around px-3 rounded-full"
        style={{
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 32px)",
          maxWidth: "420px",
          backgroundColor: "rgba(255,255,255,0.88)",
          backdropFilter: "saturate(180%) blur(14px)",
          border: `1px solid ${C.hairline}`,
          boxShadow: "0 10px 40px -10px rgba(255,133,161,0.35)",
        }}
      >
        {[
          { id: "plan", icon: Navigation, label: "Plan" },
          { id: "cafes", icon: Coffee, label: "Cafes" },
          { id: "budget", icon: Wallet, label: "Budget" },
          { id: "kit", icon: Sparkles, label: "Kit" },
        ].map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all active:scale-95"
              style={{
                backgroundColor: active ? C.cloud : "transparent",
                minWidth: "60px",
              }}
            >
              <t.icon
                size={18}
                style={{ color: active ? C.primary : C.subtext, marginBottom: "2px" }}
                strokeWidth={active ? 2.4 : 2}
              />
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: active ? 700 : 500,
                  color: active ? C.primary : C.subtext,
                  letterSpacing: "0.02em",
                }}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* =========== FLOATING ACTION BUTTON =========== */}
      <div className="fixed z-50" style={{ bottom: "104px", right: "20px" }}>
        {/* Mini action menu (expands up) */}
        {fabOpen && (
          <div className="flex flex-col-reverse gap-3 mb-3 items-end anim-fab">
            {[
              { icon: Languages, label: "Translate", action: () => window.open("https://translate.google.com/?sl=zh&tl=ja", "_blank") },
              { icon: MapIcon, label: "Map Namba", action: () => window.open("https://maps.google.com/?q=Namba+Station+Osaka", "_blank") },
              { icon: Share2, label: "Share trip", action: () => {
                if (navigator.share) {
                  navigator.share({ title: "Osaka Trip", text: "May 27–31, 2026 · Namba base · Kyoto day trip" }).catch(() => {});
                } else if (navigator.clipboard) {
                  navigator.clipboard.writeText("Osaka Trip · May 27–31, 2026 · Namba");
                }
              } },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => { a.action(); setFabOpen(false); }}
                className="flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full transition-transform active:scale-95"
                style={{
                  backgroundColor: C.white,
                  border: `1px solid ${C.hairline}`,
                  boxShadow: "0 6px 20px -6px rgba(255,133,161,0.35)",
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: C.cloud }}
                >
                  <a.icon size={14} style={{ color: C.primary }} />
                </div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: C.text }}>{a.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-transform active:scale-90 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
            color: C.white,
            boxShadow: "0 10px 25px -6px rgba(255,133,161,0.55)",
            transform: fabOpen ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 0.2s ease-out",
          }}
        >
          {fabOpen ? <X size={22} /> : <Languages size={22} />}
        </button>
      </div>

      {/* =========== FOOTER spacer is handled by pb-32 on main =========== */}
    </div>
  );
}

// ================= TAB: PLAN =================
function PlanTab({ expandedDay, setExpandedDay, rainMode, setRainMode }) {
  return (
    <div>
      <SectionHeader eyebrow="Day by day" title="The Itinerary" sub="Click any day to expand · times are targets" />

      <div className="space-y-4">
        {DAYS.map((day) => (
          <DayCard
            key={day.n}
            day={day}
            expanded={expandedDay === day.n}
            onToggle={() => setExpandedDay(expandedDay === day.n ? null : day.n)}
            rainMode={rainMode}
            setRainMode={setRainMode}
          />
        ))}
      </div>
    </div>
  );
}

// ================= TAB: CAFES =================
function CafesTab({ likedCafes, onLike }) {
  const likedCount = Object.values(likedCafes).filter(Boolean).length;
  return (
    <div>
      <SectionHeader
        eyebrow="Coffee itinerary"
        title="Cafe Edit"
        sub={`Six curated spots · all open by 10–11 AM${likedCount > 0 ? ` · ${likedCount} saved ♡` : ""}`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CAFES.map((cafe) => (
          <CafeCard key={cafe.name} cafe={cafe} isLiked={!!likedCafes[cafe.name]} onLike={() => onLike(cafe.name)} />
        ))}
      </div>
    </div>
  );
}

// ================= TAB: BUDGET =================
function BudgetTab() {
  return (
    <div>
      <SectionHeader eyebrow="Per person · ex. flights" title="Budget Breakdown" sub="Where the ¥80–120k goes across 5 days" />

      <div
        className="rounded-3xl py-10 px-6 mb-8 text-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${C.cloud} 0%, ${C.white} 50%, ${C.secondary}50 100%)`,
          border: `1px solid ${C.hairline}`,
        }}
      >
        <div className="uppercase mb-3" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: C.subtext }}>
          Total per person
        </div>
        <div style={{ fontSize: "52px", fontWeight: 900, letterSpacing: "-0.03em", color: C.text, lineHeight: 1, fontStyle: "italic" }}>
          ¥80<span style={{ color: C.primary }}>–</span>120k
        </div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: C.subtext, marginTop: "10px" }}>
          5 days · 4 nights · Namba-based · Kyoto day trip included
        </div>
      </div>

      {/* Horizontal bar */}
      <div className="mb-8">
        <div
          className="h-3 rounded-full overflow-hidden flex"
          style={{ border: `1px solid ${C.hairline}` }}
        >
          {BUDGET.map((b, i) => {
            const shades = [C.primary, C.accent, C.secondary, C.primaryDeep, C.subtext + "60"];
            return (
              <div
                key={b.cat}
                style={{ width: `${b.pct}%`, backgroundColor: shades[i % shades.length] }}
                title={`${b.cat} · ${b.pct}%`}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
          {BUDGET.map((b, i) => {
            const shades = [C.primary, C.accent, C.secondary, C.primaryDeep, C.subtext + "60"];
            return (
              <div key={b.cat} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: shades[i % shades.length] }} />
                <span style={{ fontSize: "12px", fontWeight: 500, color: C.subtext }}>
                  {b.cat.split(" (")[0]} · {b.pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.hairline}` }}>
        {BUDGET.map((b) => (
          <div
            key={b.cat}
            className="py-5 grid grid-cols-12 gap-3 items-baseline"
            style={{ borderBottom: `1px solid ${C.hairline}` }}
          >
            <div className="col-span-7 md:col-span-6">
              <div style={{ fontSize: "15px", fontWeight: 700, color: C.text }}>{b.cat}</div>
              <div style={{ fontSize: "12px", fontWeight: 500, color: C.subtext, marginTop: "2px" }}>{b.note}</div>
            </div>
            <div className="col-span-2 text-right md:text-left" style={{ fontSize: "12px", fontWeight: 600, color: C.primary }}>
              {b.pct}%
            </div>
            <div className="col-span-3 md:col-span-4 text-right" style={{ fontSize: "14px", fontWeight: 700, color: C.text }}>
              ¥{b.lo.toLocaleString()}–{b.hi.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-7 rounded-2xl p-5"
        style={{ backgroundColor: C.cloud, border: `1px solid ${C.hairline}` }}
      >
        <p style={{ fontSize: "13px", fontWeight: 500, color: C.text, lineHeight: 1.55 }}>
          <strong style={{ color: C.primary }}>Buffer note:</strong> the ¥120k ceiling covers one
          yakiniku or kappo splurge + Umeda Sky ticket + a generous drugstore/gift run. Trim any one
          to hit ¥80k comfortably.
        </p>
      </div>
    </div>
  );
}

// ================= TAB: KIT (packing + logistics) =================
function KitTab({ packed, onToggle }) {
  const packedCount = Object.values(packed).filter(Boolean).length;
  const total = PACKING.length;

  return (
    <div>
      <SectionHeader
        eyebrow="Travel kit"
        title="Packing & Logistics"
        sub="Don't forget these for late May in Japan"
      />

      {/* Packing progress */}
      <div
        className="rounded-3xl p-6 mb-8"
        style={{ backgroundColor: C.white, border: `1px solid ${C.hairline}` }}
      >
        <div className="flex items-baseline justify-between mb-4">
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: C.text }}>Packing checklist</h3>
          <span style={{ fontSize: "13px", fontWeight: 600, color: C.primary }}>
            {packedCount}/{total}
          </span>
        </div>
        <div
          className="h-2 rounded-full mb-5 overflow-hidden"
          style={{ backgroundColor: C.cloud }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(packedCount / total) * 100}%`,
              background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
            }}
          />
        </div>
        <div className="space-y-1">
          {PACKING.map((item, i) => {
            const isPacked = !!packed[i];
            return (
              <button
                key={i}
                onClick={() => onToggle(i)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors"
                style={{ backgroundColor: isPacked ? C.cloud : "transparent" }}
              >
                {isPacked ? (
                  <CheckCircle2 size={20} style={{ color: C.primary }} fill={C.secondary} />
                ) : (
                  <Circle size={20} style={{ color: C.subtext, opacity: 0.4 }} />
                )}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: isPacked ? C.subtext : C.text,
                    textDecoration: isPacked ? "line-through" : "none",
                    opacity: isPacked ? 0.7 : 1,
                  }}
                >
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logistics tips */}
      <h3 className="mb-4" style={{ fontSize: "18px", fontWeight: 700, color: C.text }}>
        Logistics memo
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {TIPS.map((tip) => (
          <div
            key={tip.title}
            className="rounded-2xl p-5"
            style={{ backgroundColor: C.white, border: `1px solid ${C.hairline}` }}
          >
            <div
              className="inline-flex w-9 h-9 rounded-full items-center justify-center mb-3"
              style={{ backgroundColor: C.cloud }}
            >
              <tip.icon size={16} style={{ color: C.primary }} />
            </div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, color: C.text, marginBottom: "4px" }}>
              {tip.title}
            </h4>
            <p style={{ fontSize: "13px", fontWeight: 500, color: C.subtext, lineHeight: 1.5 }}>
              {tip.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Transit reference */}
      <div
        className="mt-8 rounded-3xl p-7 md:p-8"
        style={{ backgroundColor: C.text, color: C.white }}
      >
        <div className="uppercase mb-3" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", color: "#ffffff80" }}>
          Quick reference
        </div>
        <h3 style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.015em", marginBottom: "18px" }}>
          KIX ⇄ Namba transit
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { lbl: "Recommended", t: "Nankai Rapi:t (特急)", s: "38 min · ¥1,450 · direct" },
            { lbl: "Budget", t: "Nankai Airport Express", s: "48 min · ¥970" },
            { lbl: "Avoid for Namba", t: "JR Haruka", s: "Goes to Tennoji only" },
          ].map((r) => (
            <div
              key={r.t}
              className="rounded-xl p-4"
              style={{ backgroundColor: "#ffffff10", border: "1px solid #ffffff1a" }}
            >
              <div className="uppercase mb-1.5" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", color: "#ffffff99" }}>
                {r.lbl}
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "2px" }}>{r.t}</div>
              <div style={{ fontSize: "12px", fontWeight: 500, color: "#ffffffaa" }}>{r.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ================= COMPONENTS =================

function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div className="mb-8">
      <div
        className="uppercase mb-2"
        style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: C.primary }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontSize: "clamp(28px, 5vw, 38px)",
          fontWeight: 800,
          letterSpacing: "-0.025em",
          color: C.text,
          lineHeight: 1.1,
          fontStyle: "italic",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-2" style={{ fontSize: "14px", fontWeight: 500, color: C.subtext }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function DayCard({ day, expanded, onToggle, rainMode, setRainMode }) {
  const isDay4 = day.n === 4;
  const items = isDay4 && rainMode ? day.rainyItems : day.items;

  return (
    <div
      className="rounded-3xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: expanded ? C.white : "rgba(255,255,255,0.5)",
        border: `1px solid ${expanded ? C.accent : C.hairline}`,
        boxShadow: expanded ? "0 14px 40px -14px rgba(255,133,161,0.25)" : "none",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 md:px-6 md:py-5 flex items-center justify-between gap-4 transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div
            className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: expanded
                ? `linear-gradient(135deg, ${C.primary}, ${C.accent})`
                : C.white,
              color: expanded ? C.white : C.primary,
              fontSize: "17px",
              fontWeight: 800,
              border: expanded ? "none" : `1px solid ${C.hairline}`,
              boxShadow: expanded ? "0 6px 16px -4px rgba(255,133,161,0.45)" : "none",
            }}
          >
            {day.n}
          </div>
          <div className="text-left min-w-0">
            <div
              className="uppercase mb-0.5"
              style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: C.subtext }}
            >
              {day.date}
            </div>
            <div
              className="truncate"
              style={{ fontSize: "17px", fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}
            >
              {day.title}
            </div>
            {!expanded && (
              <div
                className="truncate mt-0.5"
                style={{ fontSize: "12px", fontWeight: 500, color: C.subtext }}
              >
                {day.mood}
              </div>
            )}
          </div>
        </div>
        <ChevronRight
          size={20}
          className="shrink-0 transition-transform duration-300"
          style={{
            color: expanded ? C.primary : C.subtext,
            transform: expanded ? "rotate(90deg)" : "rotate(0)",
          }}
        />
      </button>

      {expanded && (
        <div className="px-5 md:px-6 pb-6 anim-fade">
          {/* Sub-header */}
          <div
            className="mb-4 pb-4"
            style={{ fontSize: "12px", fontWeight: 500, color: C.subtext, borderBottom: `1px dashed ${C.hairline}` }}
          >
            {day.sub} · <span style={{ fontStyle: "italic" }}>{day.mood}</span>
          </div>

          {/* Rain toggle for Day 4 */}
          {isDay4 && (
            <div
              className="mb-5 p-4 rounded-2xl flex items-center justify-between gap-3"
              style={{
                backgroundColor: rainMode ? "#E8EEF5" : C.cloud,
                border: `1px solid ${rainMode ? "#C9D6E3" : C.hairline}`,
                transition: "all 0.3s ease",
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: C.white }}
                >
                  {rainMode ? (
                    <CloudRain size={17} style={{ color: "#5B7A9C" }} />
                  ) : (
                    <Sun size={17} style={{ color: "#E8A94B" }} />
                  )}
                </div>
                <div className="min-w-0">
                  <div style={{ fontSize: "13px", fontWeight: 700, color: C.text }}>
                    {rainMode ? "Rainy day plan" : "Sunny day plan"}
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 500, color: C.subtext }}>
                    ~27% rain probability · late May tsuyu start
                  </div>
                </div>
              </div>
              <button
                onClick={() => setRainMode(!rainMode)}
                className="relative shrink-0 rounded-full transition-colors duration-300"
                style={{
                  width: "48px",
                  height: "26px",
                  backgroundColor: rainMode ? "#5B7A9C" : C.primary,
                }}
                aria-label="Toggle rain mode"
              >
                <span
                  className="absolute top-0.5 rounded-full transition-all duration-300"
                  style={{
                    width: "22px",
                    height: "22px",
                    left: rainMode ? "24px" : "2px",
                    backgroundColor: C.white,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                  }}
                />
              </button>
            </div>
          )}

          {/* Timeline items */}
          <div className="space-y-5">
            {items.map((item, i) => {
              const isSwapped = isDay4 && rainMode && item.swapped;
              return (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center shrink-0 pt-1">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: isSwapped ? "#E8EEF5" : C.cloud,
                      }}
                    >
                      <item.icon
                        size={14}
                        style={{ color: isSwapped ? "#5B7A9C" : C.primary }}
                      />
                    </div>
                    {i < items.length - 1 && (
                      <div
                        className="w-[2px] flex-1 mt-1"
                        style={{ backgroundColor: C.hairline, minHeight: "16px" }}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-2 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className="px-2 py-0.5 rounded-md"
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: C.primary,
                          backgroundColor: C.cloud,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {item.t}
                      </span>
                      {isSwapped && (
                        <span
                          className="px-2 py-0.5 rounded-md"
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#5B7A9C",
                            backgroundColor: "#E8EEF5",
                            letterSpacing: "0.04em",
                          }}
                        >
                          INDOOR
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: C.text, marginBottom: "3px", lineHeight: 1.3 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: C.subtext, lineHeight: 1.55 }}>
                      {item.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function CafeCard({ cafe, isLiked, onLike }) {
  return (
    <div
      className="rounded-3xl overflow-hidden transition-transform hover:-translate-y-1 duration-300"
      style={{
        backgroundColor: C.white,
        border: `1px solid ${C.hairline}`,
        boxShadow: "0 4px 18px -8px rgba(255,133,161,0.18)",
      }}
    >
      {/* 4:3 cover */}
      <div
        className="relative w-full"
        style={{
          aspectRatio: "4 / 3",
          background: `linear-gradient(135deg, ${cafe.hue}, ${cafe.hue2 || cafe.hue})`,
        }}
      >
        <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full" style={{ color: C.text, opacity: 0.12 }}>
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M60 60 L60 100 Q60 115 75 115 L115 115 Q130 115 130 100 L130 60 Z" />
            <path d="M130 68 Q150 68 150 85 Q150 98 130 98" />
            <path d="M75 40 Q75 30 82 30 Q89 30 89 40 Q89 50 82 50 Q75 50 75 40" />
            <path d="M95 38 Q95 28 102 28 Q109 28 109 38 Q109 48 102 48 Q95 48 95 38" />
            <path d="M115 42 Q115 32 122 32 Q129 32 129 42 Q129 52 122 52 Q115 52 115 42" />
          </g>
        </svg>
        <div
          className="absolute top-4 left-4 uppercase px-2.5 py-1 rounded-full"
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            backgroundColor: "rgba(255,255,255,0.9)",
            color: C.text,
            backdropFilter: "blur(4px)",
          }}
        >
          {cafe.area}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onLike(); }}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-90 ${isLiked ? "anim-heart" : ""}`}
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(4px)",
            boxShadow: "0 4px 12px -4px rgba(0,0,0,0.15)",
          }}
          aria-label="Save cafe"
        >
          <Heart
            size={18}
            fill={isLiked ? C.primary : "none"}
            stroke={isLiked ? C.primary : C.text}
            strokeWidth={2.2}
          />
        </button>
      </div>

      <div className="p-5">
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: C.text, letterSpacing: "-0.01em", marginBottom: "3px", lineHeight: 1.25 }}>
          {cafe.name}
        </h3>
        <div style={{ fontSize: "12px", fontWeight: 500, color: C.subtext, marginBottom: "14px", fontStyle: "italic" }}>
          {cafe.vibe}
        </div>

        <div className="space-y-2 pt-3" style={{ borderTop: `1px dashed ${C.hairline}` }}>
          <div className="flex items-center gap-2">
            <Clock size={12} style={{ color: C.primary }} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: C.text }}>{cafe.open}</span>
          </div>
          <div className="flex items-start gap-2">
            <Sparkles size={12} style={{ color: C.primary, marginTop: "3px", flexShrink: 0 }} />
            <span style={{ fontSize: "12px", fontWeight: 500, color: C.text }}>{cafe.specialty}</span>
          </div>
        </div>

        <p
          style={{
            fontSize: "12px", fontWeight: 500, color: C.subtext, lineHeight: 1.5,
            marginTop: "12px", paddingTop: "12px", borderTop: `1px dashed ${C.hairline}`,
          }}
        >
          {cafe.note}
        </p>
      </div>
    </div>
  );
}

// ================= DATA =================

const DAYS = [
  {
    n: 1, date: "WED · MAY 27",
    title: "Arrival & Soft Landing",
    sub: "抵達・安靜開場",
    mood: "Low-stakes · Dotonbori lights · Early night",
    items: [
      { t: "12:45–13:30", icon: Plane, label: "Land at KIX", detail: "Full-service from Taipei lands midday. Clear customs, pick up ICOCA at JR counter, activate eSIM." },
      { t: "14:30", icon: Train, label: "Nankai Rapi:t → Namba", detail: "Direct, 38 min, ¥1,450. Skip JR Haruka — wrong direction for Namba." },
      { t: "15:30", icon: Hotel, label: "Hotel check-in", detail: "Drop bags, shower, quick reset. Individual rooms — no rushing." },
      { t: "16:30", icon: ShoppingBag, label: "Shinsaibashi arcade warm-up", detail: "Covered arcade — Loft, PLAZA, Uniqlo flagship. Low-commitment browse to beat jet lag." },
      { t: "18:30", icon: UtensilsCrossed, label: "Dinner · Endo Sushi or Ichiran Dotonbori", detail: "Endo for clean sushi; Ichiran for classic solo-booth ramen. Either way, casual." },
      { t: "20:00", icon: Camera, label: "Dotonbori Glico-sign stroll", detail: "Neon, Ebisu Bridge photo, Don Quijote ferris wheel view. 30–45 min walk." },
      { t: "21:30", icon: Moon, label: "Konbini haul · early night", detail: "Lawson pudding, Strong Zero, onigiri. Sleep early — Day 2 is the real start." },
    ],
  },
  {
    n: 2, date: "THU · MAY 28",
    title: "Namba · Shinsaibashi Deep Dive",
    sub: "難波・心齋橋深度",
    mood: "Food crawl · Vintage · Neon night",
    items: [
      { t: "10:30", icon: Coffee, label: "Breakfast · Mel Coffee Roasters", detail: "Nishi-Shinsaibashi. Opens 10:00. Third-wave pour-over + pastry. Minimalist, quiet." },
      { t: "11:30", icon: UtensilsCrossed, label: "Kuromon Ichiba food crawl", detail: "'Osaka's kitchen.' Graze: uni, A5 wagyu skewers, oysters, eel, tuna sashimi. Come hungry, skip lunch." },
      { t: "13:30", icon: ShoppingBag, label: "Shinsaibashi-suji arcade", detail: "Rain-proof covered arcade. Uniqlo / GU flagship, Loft, PLAZA, Matsumoto Kiyoshi drugstore." },
      { t: "15:00", icon: Heart, label: "Amerika-mura (vintage anchor)", detail: "Osaka's vintage district. 2nd STREET · Ragtag · Kinji · Flamingo. Set a 90-min timer." },
      { t: "16:30", icon: MapPin, label: "Orange Street · Horie (select shops)", detail: "Between Amemura and Shinsaibashi — indie boutiques, design stores. Graphpaper-adjacent aesthetic." },
      { t: "17:30", icon: Coffee, label: "Coffee · LiLo Coffee Roasters", detail: "Standing bar, rotating single origins. Local favorite in Amemura." },
      { t: "19:00", icon: UtensilsCrossed, label: "Dinner · Yakiniku (Matsusakaya or Ittan)", detail: "A5 wagyu splurge. Reserve 2–3 weeks ahead via Tablecheck. ~¥7–9k p.p." },
      { t: "21:30", icon: Sparkles, label: "Dotonbori takoyaki · river walk", detail: "Kukuru for takoyaki. Late-night neon photos. Rikuro's cheesecake if still standing." },
    ],
  },
  {
    n: 3, date: "FRI · MAY 29",
    title: "Kyoto Day Trip",
    sub: "京都一日",
    mood: "Temples · Matcha · Bamboo",
    items: [
      { t: "09:30", icon: Train, label: "JR Namba → Kyoto (via Osaka Stn)", detail: "~45 min. Or: Hankyu Kyoto line from Umeda → Kawaramachi, cheaper." },
      { t: "10:30", icon: Sparkles, label: "Arashiyama Bamboo Grove + Tenryu-ji", detail: "Arashiyama first while it's breathable. Walk the grove, peek at Tenryu-ji garden." },
      { t: "12:30", icon: UtensilsCrossed, label: "Lunch · Yudofu Sagano or Shoraian", detail: "Shoraian needs reservation. Yudofu Sagano is the walk-in classic." },
      { t: "14:00", icon: Navigation, label: "Train to Gion · Hanamikoji · Yasaka-jinja", detail: "Old Kyoto machiya lanes, geiko district in late afternoon light." },
      { t: "15:30", icon: Coffee, label: "Matcha · Nakamura Tokichi or % Arabica", detail: "THE matcha parfait. Queue is real — go before 16:00." },
      { t: "16:30", icon: MapPin, label: "Kiyomizu-dera (optional)", detail: "Sunset from the wooden terrace is magic. Skip if feet are done." },
      { t: "19:00", icon: Train, label: "Return to Osaka · light dinner", detail: "Okonomiyaki at Mizuno or Chibo in Dotonbori." },
    ],
  },
  {
    n: 4, date: "SAT · MAY 30",
    title: "Umeda · Nakazakicho Slow Day",
    sub: "梅田・中崎町慢行",
    mood: "Select shops · Depachika · Sky views · Kappo",
    items: [
      { t: "10:30", icon: Coffee, label: "Breakfast · Mondial Kaffee 328", detail: "Umeda (Nishitenma). Latte-art-championship winner. Opens 08:00." },
      { t: "11:30", icon: ShoppingBag, label: "Hankyu · Hanshin depachika", detail: "Basement food halls. Sample wagashi, bento, fruit sandwiches. Grab picnic lunch." },
      { t: "13:00", icon: MapPin, label: "Nakazakicho vintage walk", detail: "Old machiya-turned-cafes, indie vintage. Taiyouno-Tou, Salon de AManTO, Ground Floor." },
      { t: "14:30", icon: Coffee, label: "Cafe · Taiyouno-Tou", detail: "Deep Showa-era vibes. Tatami feel, slow pour, homemade cake." },
      { t: "16:00", icon: ShoppingBag, label: "Grand Front Osaka · select shops", detail: "BEAMS · Journal Standard · United Arrows · SHIPS · Tomorrowland · Hankyu Men's." },
      { t: "18:00", icon: Sun, label: "Umeda Sky Building Observatory", detail: "Sunset golden hour — arrive 18:00. ¥1,500. 360° skyline." },
      { t: "20:00", icon: UtensilsCrossed, label: "Dinner · Kitashinchi sushi or kappo", detail: "Upscale, quieter than Namba. Sushi Harasho or mid-tier kappo. Book ahead." },
    ],
    rainyItems: [
      { t: "10:30", icon: Coffee, label: "Breakfast · Mondial Kaffee 328", detail: "Umeda (Nishitenma). Latte-art-championship winner. Opens 08:00.", swapped: false },
      { t: "11:30", icon: ShoppingBag, label: "Hankyu · Hanshin depachika", detail: "Basement food halls. Extra-comforting on a wet day.", swapped: false },
      { t: "13:00", icon: ShoppingBag, label: "Whity Umeda underground", detail: "Swap Nakazakicho outdoor walk → Whity Umeda / Diamor Osaka underground malls. Dry + dense shopping.", swapped: true },
      { t: "14:30", icon: Coffee, label: "Cafe · Mondial Kaffee or 4/4 Seasons", detail: "Indoor cafes near Osaka Station — Taiyouno-Tou requires street walking.", swapped: true },
      { t: "16:00", icon: ShoppingBag, label: "Grand Front Osaka · select shops", detail: "Covered from Osaka Station. BEAMS, Journal Standard, United Arrows, SHIPS.", swapped: false },
      { t: "18:00", icon: MapIcon, label: "HEP FIVE Ferris wheel (indoor car)", detail: "Swap Umeda Sky outdoor deck → HEP FIVE indoor ferris wheel + Lucua food floor. Still skyline, stays dry.", swapped: true },
      { t: "20:00", icon: UtensilsCrossed, label: "Dinner · Kitashinchi sushi or kappo", detail: "Direct subway access from Umeda. Book ahead.", swapped: false },
    ],
  },
  {
    n: 5, date: "SUN · MAY 31",
    title: "Last Bites & Departure",
    sub: "最後的早午餐・返程",
    mood: "Slow morning · Drugstore haul · Buffer",
    items: [
      { t: "09:30", icon: Hotel, label: "Late checkout · bag strategy", detail: "Most Namba hotels hold bags till 18:00. Or ship to KIX via Yamato (~¥2,000)." },
      { t: "10:30", icon: Coffee, label: "Brunch · a favorite cafe", detail: "No new places on departure day. Return to Mel, LiLo, or Mondial." },
      { t: "12:00", icon: ShoppingBag, label: "Last-minute · Don Quijote Dotonbori", detail: "Kit Kats, Hada Labo, Canmake. Tax-free counter — passport on you." },
      { t: "14:00", icon: UtensilsCrossed, label: "Light lunch near Namba Station", detail: "Tonkatsu at Wako, soba at Tsurutontan, or curry at Kuidaore." },
      { t: "15:30", icon: Train, label: "Nankai Rapi:t → KIX", detail: "Aim for KIX 2.5–3 hrs before int'l departure." },
      { t: "18:00+", icon: Plane, label: "Fly home", detail: "Duty-free last chance: Royce', Tokyo Banana, Shiroi Koibito." },
    ],
  },
];

const CAFES = [
  { name: "Mel Coffee Roasters", area: "Nishi-Shinsaibashi", vibe: "Quiet · Minimalist · Pour-over", open: "10:00–19:00", specialty: "Single-origin pour-over", note: "No WiFi, small counter. Go for the coffee, not the laptop.", hue: "#FFE0E6", hue2: "#FFCED6" },
  { name: "LiLo Coffee Roasters", area: "Amerika-mura", vibe: "Standing bar · Indie · Rotating beans", open: "11:00–21:00", specialty: "Espresso tonic · Daily SO", note: "Tiny space. The Amemura youth crowd's daily stop.", hue: "#FFD6DC", hue2: "#FFC4CC" },
  { name: "Mondial Kaffee 328", area: "Umeda · Nishitenma", vibe: "Champion barista · Latte-art", open: "08:00–19:00", specialty: "Cappuccino · Latte art", note: "Latte Art Championship winner roastery.", hue: "#FFCDD8", hue2: "#FFB7C5" },
  { name: "% Arabica Kyoto Higashiyama", area: "Kyoto · Day 3", vibe: "Iconic · Minimal · Worldwide-famous", open: "09:00–18:00", specialty: "Kyoto latte", note: "Go early or queue. Fujii-Daimaru branch is calmer.", hue: "#FFE3E8", hue2: "#FFD1DC" },
  { name: "Taiyouno-Tou (太陽ノ塔)", area: "Nakazakicho", vibe: "Showa vintage · Tatami · Bookish", open: "11:00–21:00", specialty: "Café au lait · Homemade cake", note: "Converted machiya. 1970s Kyoto in the middle of Osaka.", hue: "#FFC8D4", hue2: "#FFAFBF" },
  { name: "Streamer Coffee Company", area: "Shinsaibashi", vibe: "Urban · Military latte · Loud music", open: "08:00–20:00", specialty: "Military latte (5-shot)", note: "Tokyo transplant, still one of the city's best espressos.", hue: "#FFDAD8", hue2: "#FFC2C0" },
];

const BUDGET = [
  { cat: "Hotel (4 nights, 2 rooms)", lo: 40000, hi: 60000, pct: 50, note: "¥10–15k/room/night, Namba mid-tier" },
  { cat: "Food & Drinks", lo: 25000, hi: 35000, pct: 27, note: "~¥5–7k/day incl. 1 yakiniku splurge" },
  { cat: "Transit (incl. Kyoto)", lo: 5000, hi: 8000, pct: 7, note: "Rapi:t roundtrip + ICOCA + JR Kyoto" },
  { cat: "Shopping & Gifts", lo: 7000, hi: 12000, pct: 11, note: "Drugstore, lifestyle, apparel" },
  { cat: "Attractions & Misc", lo: 3000, hi: 5000, pct: 5, note: "Umeda Sky, temples, buffer" },
];

const PACKING = [
  "Passport + photocopy (separate bag)",
  "ICOCA card (or add to Apple Wallet)",
  "Visit Japan Web QR (pre-register)",
  "Light rain shell + compact umbrella",
  "Comfy walking shoes (broken in)",
  "Portable power bank (10,000mAh+)",
  "Universal adapter (JP is Type A)",
  "Sunscreen (travel size, SPF 30+)",
  "Allergy meds · pain reliever",
  "Reusable tote (for shopping)",
  "Eco water bottle",
  "Cash ¥30,000 backup (not all places take card)",
];

const TIPS = [
  { icon: Umbrella, title: "Late-May Weather", detail: "Transition to tsuyu. Expect 1–2 shower days, ~22°C highs, humidity 70%+. Pack a light rain shell." },
  { icon: Cloud, title: "Rainy Day Plan B", detail: "Shinsaibashi arcade is fully covered. Use the Day 4 rain-mode toggle to see indoor swaps." },
  { icon: Train, title: "Transit Card", detail: "ICOCA for trains, buses, konbini. Buy at JR KIX counter. Osaka Amazing Pass NOT worth it for this trip." },
  { icon: Clock, title: "No-Early-Rise Protocol", detail: "Every morning starts 10:00+. Cafes open at 10–11. Use slow mornings in-room." },
  { icon: AlertCircle, title: "Reservations", detail: "Book 2–3 weeks out: yakiniku (Day 2), kappo/sushi (Day 4), Shoraian Kyoto (if doing)." },
  { icon: Sparkles, title: "Drugstore Strategy", detail: "Save the drugstore haul for Day 5 morning — don't carry skincare for 4 days. Passport for tax-free." },
];
