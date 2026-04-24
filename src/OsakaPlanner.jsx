import React, { useState, useEffect } from "react";
import {
  Plane, MapPin, Clock, Coffee, UtensilsCrossed, ShoppingBag,
  Train, Umbrella, Sparkles, Camera, Moon, Sun, Hotel,
  Navigation, Heart, AlertCircle, CloudRain, ChevronRight,
  CheckCircle2, Circle, Languages, Map as MapIcon, Share2, X,
  Wallet,
} from "lucide-react";

// ================= PALETTE (Rose Gold & Pearl) =================
const C = {
  primary: "#FF85A1",
  primaryDeep: "#E56A87",
  accent: "#FFB7C5",
  pearl: "#FFF9FA",
  bg: "#FFF5F7",
  bgRain: "#EDF1F5",     // Pearl-blue for rain wash
  cloud: "#FDF2F5",
  hairline: "#F5D5DD",
  hairlineRain: "#D9E0E8",
  text: "#4A0E0E",
  subtext: "#8E6E6E",
  white: "#FFFFFF",
  rain: "#5B7A9C",
  rainBg: "#E8EEF5",
};

export default function OsakaPlanner() {
  const [activeTab, setActiveTab] = useState("plan");
  const [expandedDay, setExpandedDay] = useState(1);
  const [likedCafes, setLikedCafes] = useState({});
  const [packed, setPacked] = useState({});
  const [rainMode, setRainMode] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  // Inject font
  useEffect(() => {
    const id = "osaka-font-link";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  // Scroll TO TOP OF PAGE on tab change (smooth)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setFabOpen(false);
  }, [activeTab]);

  const toggleLike = (name) =>
    setLikedCafes((p) => ({ ...p, [name]: !p[name] }));
  const togglePacked = (i) =>
    setPacked((p) => ({ ...p, [i]: !p[i] }));

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: 500,
        color: C.text,
        backgroundColor: rainMode ? C.bgRain : C.bg,
        transition: "background-color 0.6s ease",
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartPop {
          0%, 100% { transform: scale(1); }
          40% { transform: scale(1.4); }
        }
        @keyframes fabIn {
          from { opacity: 0; transform: scale(0.85) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .anim-fade { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .anim-heart { animation: heartPop 0.32s ease-out; }
        .anim-fab { animation: fabIn 0.18s ease-out; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      {/* =========== HEADER =========== */}
      <header className="relative px-6 pt-12 pb-6 overflow-hidden">
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: "-30%",
            right: "-15%",
            width: "280px",
            height: "280px",
            background: `radial-gradient(circle, ${rainMode ? "#C7D5E2" : "#FFD1DC"}, transparent 70%)`,
            filter: "blur(50px)",
            opacity: 0.85,
            transition: "background 0.6s ease",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: "-15%",
            left: "-10%",
            width: "200px",
            height: "200px",
            background: `radial-gradient(circle, ${rainMode ? "#D6DFE9" : "#FFB7C5"}, transparent 70%)`,
            filter: "blur(40px)",
            opacity: 0.6,
            transition: "background 0.6s ease",
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              WebkitBackdropFilter: "blur(10px)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${rainMode ? C.hairlineRain : C.hairline}`,
              transition: "all 0.6s ease",
            }}
          >
            <Sparkles size={12} style={{ color: rainMode ? C.rain : C.primary }} />
            <span
              className="uppercase"
              style={{
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.2em",
                color: rainMode ? C.rain : C.primary,
              }}
            >
              May 27 – 31, 2026
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(44px, 9vw, 64px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: C.text,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            Osaka<span style={{ color: rainMode ? C.rain : C.primary, fontStyle: "normal" }}>.</span>
          </h1>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: C.subtext,
              marginTop: "10px",
            }}
          >
            Taiwan ↔ Osaka · Namba Base · Kyoto Edit
          </p>
        </div>
      </header>

      {/* =========== MAIN CONTENT =========== */}
      <main id="osaka-main" className="max-w-2xl mx-auto px-6 pb-32">
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
          {activeTab === "kit" && (
            <KitTab packed={packed} onToggle={togglePacked} />
          )}
        </div>
      </main>

      {/* =========== FAB (Translate / Map / Share) =========== */}
      <div
        className="fixed z-50 flex flex-col items-end"
        style={{ bottom: "104px", right: "20px" }}
      >
        {fabOpen && (
          <div className="flex flex-col-reverse gap-2.5 mb-3 items-end anim-fab">
            {[
              {
                icon: Languages,
                label: "Translate",
                action: () => {
                  try {
                    window.open("https://translate.google.com/?sl=zh-TW&tl=ja", "_blank", "noopener,noreferrer");
                  } catch (e) {}
                },
              },
              {
                icon: MapIcon,
                label: "Map · Namba",
                action: () => {
                  try {
                    window.open("https://maps.google.com/?q=Namba+Station+Osaka", "_blank", "noopener,noreferrer");
                  } catch (e) {}
                },
              },
              {
                icon: Share2,
                label: "Share trip",
                action: () => {
                  try {
                    if (navigator.share) {
                      navigator.share({
                        title: "Osaka Trip",
                        text: "May 27–31, 2026 · Namba · Kyoto day trip",
                      }).catch(() => {});
                    } else if (navigator.clipboard) {
                      navigator.clipboard.writeText("Osaka Trip · May 27–31, 2026 · Namba");
                    }
                  } catch (e) {}
                },
              },
            ].map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={() => { a.action(); setFabOpen(false); }}
                className="flex items-center gap-2 pl-2.5 pr-4 py-2 rounded-full active:scale-95"
                style={{
                  backgroundColor: C.white,
                  border: `1px solid ${C.hairline}`,
                  boxShadow: "0 6px 20px -6px rgba(255,133,161,0.4)",
                  cursor: "pointer",
                  transition: "transform 0.15s ease",
                }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: C.cloud }}
                >
                  <a.icon size={13} style={{ color: C.primary }} />
                </span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: C.text }}>
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setFabOpen(!fabOpen)}
          aria-label={fabOpen ? "Close menu" : "Open quick actions"}
          className="w-14 h-14 rounded-full flex items-center justify-center active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
            color: C.white,
            boxShadow: "0 10px 25px -6px rgba(255,133,161,0.55)",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.15s ease",
          }}
        >
          {fabOpen ? <X size={22} /> : <Languages size={22} />}
        </button>
      </div>

      {/* =========== STICKY BOTTOM NAV (Glass, thumb-zone) =========== */}
      <nav
        className="fixed left-0 right-0 z-40 px-4 pb-4 pt-2"
        style={{ bottom: 0 }}
      >
        <div
          className="max-w-md mx-auto flex justify-around p-1.5 rounded-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.78)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
            backdropFilter: "saturate(180%) blur(20px)",
            border: `1px solid ${rainMode ? "rgba(217,224,232,0.7)" : "rgba(245,213,221,0.7)"}`,
            boxShadow: "0 14px 40px -12px rgba(255,133,161,0.3), 0 4px 12px -4px rgba(0,0,0,0.05)",
            transition: "all 0.6s ease",
          }}
        >
          {[
            { id: "plan", icon: Navigation, label: "Plan" },
            { id: "cafes", icon: Coffee, label: "Cafes" },
            { id: "budget", icon: Wallet, label: "Budget" },
            { id: "kit", icon: Sparkles, label: "Kit" },
          ].map((t) => (
            <NavBtn
              key={t.id}
              active={activeTab === t.id}
              icon={t.icon}
              label={t.label}
              rainMode={rainMode}
              onClick={() => setActiveTab(t.id)}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}

// ================= NAV BUTTON =================
function NavBtn({ active, icon: Icon, label, onClick, rainMode }) {
  const accent = rainMode ? C.rain : C.primary;
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center py-1.5 active:scale-90"
      style={{
        flex: 1,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.15s ease",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: "40px",
          height: "32px",
          borderRadius: "999px",
          backgroundColor: active ? accent : "transparent",
          boxShadow: active ? `0 6px 14px -3px ${accent}66` : "none",
          transition: "all 0.25s ease",
          marginBottom: "2px",
        }}
      >
        <Icon
          size={17}
          strokeWidth={active ? 2.6 : 2}
          style={{ color: active ? C.white : C.subtext }}
        />
      </div>
      <span
        className="uppercase"
        style={{
          fontSize: "9px",
          fontWeight: active ? 800 : 600,
          letterSpacing: "0.06em",
          color: active ? accent : C.subtext,
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ================= TAB: PLAN =================
function PlanTab({ expandedDay, setExpandedDay, rainMode, setRainMode }) {
  return (
    <div className="space-y-7">
      {/* Quick status scroller */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-1">
        {[
          { icon: Hotel, label: "Namba Base", sub: "Same hotel · 2 rooms" },
          { icon: Plane, label: "TPE → KIX", sub: "EVA / Starlux / CAL" },
          { icon: Umbrella, label: "May Weather", sub: "22°C · tsuyu start" },
          { icon: Wallet, label: "Budget", sub: "¥80–120k p.p." },
        ].map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-40 p-4 rounded-3xl"
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
            <div style={{ fontSize: "13px", fontWeight: 800 }}>{item.label}</div>
            <div style={{ fontSize: "11px", fontWeight: 500, color: C.subtext, marginTop: "2px" }}>
              {item.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Strategic pick */}
      <div
        className="rounded-[28px] p-6 md:p-7"
        style={{
          backgroundColor: "rgba(255,255,255,0.75)",
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${C.hairline}`,
          boxShadow: "0 10px 40px -15px rgba(255,133,161,0.25)",
        }}
      >
        <div
          className="uppercase mb-2"
          style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.22em", color: C.primary }}
        >
          ♡ Strategic pick
        </div>
        <h2
          style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.015em", color: C.text, lineHeight: 1.2 }}
        >
          Stay in <span style={{ color: C.primary, fontStyle: "italic" }}>Namba</span>, not Umeda.
        </h2>
        <p
          className="mt-3"
          style={{ fontSize: "13px", fontWeight: 500, color: C.text, lineHeight: 1.55, opacity: 0.85 }}
        >
          Nankai Rapi:t drops you direct at Namba in 38 min (¥1,450) — zero transfers with luggage.
          Walking-distance to Dotonbori, Kuromon, Shinsaibashi. Midosuji line to Umeda in 8 min.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {["Cross Hotel", "Monterey Grasmere", "Swissotel Nankai", "HOTEL THE FLAG"].map((h) => (
            <span
              key={h}
              className="rounded-full px-3 py-1"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: C.primary,
                backgroundColor: C.cloud,
                border: `1px solid ${C.hairline}`,
              }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Rain Mode Switcher Card */}
      <div
        className="rounded-[28px] p-5 transition-all duration-500"
        style={{
          backgroundColor: rainMode ? "rgba(232,238,245,0.75)" : "rgba(255,255,255,0.75)",
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${rainMode ? C.hairlineRain : C.hairline}`,
        }}
      >
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <div
              className="uppercase mb-1"
              style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.2em", color: rainMode ? C.rain : C.primary }}
            >
              ⛅ Travel intel
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: C.text }}>
              {rainMode ? "Rainy mode" : "Sunny mode"}
            </h3>
            <p style={{ fontSize: "12px", fontWeight: 500, color: C.subtext, marginTop: "4px", lineHeight: 1.5 }}>
              {rainMode
                ? "Day 4 swapped to Whity Umeda underground & HEP FIVE indoor ferris wheel."
                : "Standard route: Nakazakicho walk and Umeda Sky outdoor deck included."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRainMode(!rainMode)}
            className="relative shrink-0 rounded-full"
            style={{
              width: "52px",
              height: "30px",
              backgroundColor: rainMode ? C.rain : C.primary,
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.4s ease",
              padding: 0,
            }}
            aria-label="Toggle rain mode"
          >
            <span
              className="flex items-center justify-center"
              style={{
                position: "absolute",
                top: "2px",
                left: rainMode ? "24px" : "2px",
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                backgroundColor: C.white,
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                transition: "left 0.4s ease",
              }}
            >
              {rainMode ? (
                <CloudRain size={12} style={{ color: C.rain }} />
              ) : (
                <Sun size={12} style={{ color: C.primary }} />
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Day cards */}
      <div>
        <SectionHeader eyebrow="Day by day" title="The Itinerary" sub="Tap any day to expand" rainMode={rainMode} />
        <div className="space-y-3">
          {DAYS.map((day) => (
            <DayCard
              key={day.n}
              day={day}
              expanded={expandedDay === day.n}
              onToggle={() => setExpandedDay(expandedDay === day.n ? null : day.n)}
              rainMode={rainMode}
            />
          ))}
        </div>
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
        sub={`Six curated spots${likedCount > 0 ? ` · ${likedCount} saved ♡` : ""}`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CAFES.map((cafe) => (
          <CafeCard
            key={cafe.name}
            cafe={cafe}
            isLiked={!!likedCafes[cafe.name]}
            onLike={() => onLike(cafe.name)}
          />
        ))}
      </div>
    </div>
  );
}

// ================= TAB: BUDGET =================
function BudgetTab() {
  return (
    <div>
      <SectionHeader
        eyebrow="Per person · ex. flights"
        title="Budget Breakdown"
        sub="Where the ¥80–120k goes across 5 days"
      />

      <div
        className="rounded-[28px] py-10 px-6 mb-7 text-center"
        style={{
          background: `linear-gradient(135deg, ${C.cloud} 0%, ${C.white} 50%, #FFD1DC50 100%)`,
          border: `1px solid ${C.hairline}`,
        }}
      >
        <div
          className="uppercase mb-3"
          style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.22em", color: C.subtext }}
        >
          Total per person
        </div>
        <div
          style={{
            fontSize: "44px",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: C.text,
            lineHeight: 1,
            fontStyle: "italic",
          }}
        >
          ¥80<span style={{ color: C.primary }}>–</span>120k
        </div>
        <div style={{ fontSize: "12px", fontWeight: 500, color: C.subtext, marginTop: "10px" }}>
          5 days · 4 nights · Namba-based · Kyoto day trip included
        </div>
      </div>

      {/* Stacked bar */}
      <div className="mb-7">
        <div
          className="h-3 rounded-full overflow-hidden flex"
          style={{ border: `1px solid ${C.hairline}` }}
        >
          {BUDGET.map((b, i) => {
            const shades = [C.primary, C.accent, "#FFD1DC", C.primaryDeep, "#C9A0A8"];
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
            const shades = [C.primary, C.accent, "#FFD1DC", C.primaryDeep, "#C9A0A8"];
            return (
              <div key={b.cat} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: shades[i % shades.length] }}
                />
                <span style={{ fontSize: "11px", fontWeight: 500, color: C.subtext }}>
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
            className="py-4 grid grid-cols-12 gap-3 items-baseline"
            style={{ borderBottom: `1px solid ${C.hairline}` }}
          >
            <div className="col-span-7 md:col-span-6">
              <div style={{ fontSize: "13px", fontWeight: 800, color: C.text }}>{b.cat}</div>
              <div style={{ fontSize: "11px", fontWeight: 500, color: C.subtext, marginTop: "2px" }}>
                {b.note}
              </div>
            </div>
            <div className="col-span-2 text-right md:text-left" style={{ fontSize: "11px", fontWeight: 600, color: C.primary }}>
              {b.pct}%
            </div>
            <div className="col-span-3 md:col-span-4 text-right" style={{ fontSize: "12px", fontWeight: 800, color: C.text }}>
              ¥{b.lo.toLocaleString()}–{b.hi.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-6 rounded-2xl p-4"
        style={{ backgroundColor: C.cloud, border: `1px solid ${C.hairline}` }}
      >
        <p style={{ fontSize: "12px", fontWeight: 500, color: C.text, lineHeight: 1.55 }}>
          <strong style={{ color: C.primary }}>Buffer:</strong> the ¥120k ceiling covers one yakiniku/kappo
          splurge + Umeda Sky + a generous drugstore run. Trim any one to hit ¥80k.
        </p>
      </div>
    </div>
  );
}

// ================= TAB: KIT =================
function KitTab({ packed, onToggle }) {
  const packedCount = Object.values(packed).filter(Boolean).length;
  const total = PACKING.length;

  return (
    <div>
      <SectionHeader eyebrow="Travel kit" title="Packing & Logistics" sub="Don't forget these for late May" />

      <div
        className="rounded-[28px] p-5 md:p-6 mb-7"
        style={{
          backgroundColor: "rgba(255,255,255,0.75)",
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${C.hairline}`,
        }}
      >
        <div className="flex items-baseline justify-between mb-3">
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: C.text }}>Packing checklist</h3>
          <span
            className="px-2.5 py-1 rounded-full"
            style={{ fontSize: "11px", fontWeight: 700, color: C.primary, backgroundColor: C.cloud }}
          >
            {packedCount}/{total}
          </span>
        </div>
        <div className="h-2 rounded-full mb-4 overflow-hidden" style={{ backgroundColor: C.cloud }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${(packedCount / total) * 100}%`,
              background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <div className="space-y-1">
          {PACKING.map((item, i) => {
            const isPacked = !!packed[i];
            return (
              <button
                key={i}
                type="button"
                onClick={() => onToggle(i)}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left"
                style={{
                  backgroundColor: isPacked ? C.cloud : "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
              >
                {isPacked ? (
                  <CheckCircle2 size={20} style={{ color: C.primary, flexShrink: 0 }} fill="#FFD1DC" />
                ) : (
                  <Circle size={20} style={{ color: C.subtext, opacity: 0.4, flexShrink: 0 }} />
                )}
                <span
                  style={{
                    fontSize: "13px",
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

      <h3 className="mb-4" style={{ fontSize: "16px", fontWeight: 800, color: C.text }}>
        Logistics memo
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {TIPS.map((tip) => (
          <div
            key={tip.title}
            className="rounded-2xl p-4"
            style={{ backgroundColor: C.white, border: `1px solid ${C.hairline}` }}
          >
            <div
              className="inline-flex w-9 h-9 rounded-full items-center justify-center mb-3"
              style={{ backgroundColor: C.cloud }}
            >
              <tip.icon size={15} style={{ color: C.primary }} />
            </div>
            <h4 style={{ fontSize: "14px", fontWeight: 800, color: C.text, marginBottom: "4px" }}>
              {tip.title}
            </h4>
            <p style={{ fontSize: "12px", fontWeight: 500, color: C.subtext, lineHeight: 1.5 }}>
              {tip.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 rounded-[28px] p-6" style={{ backgroundColor: C.text, color: C.white }}>
        <div
          className="uppercase mb-2"
          style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.22em", color: "#ffffff80" }}
        >
          Quick reference
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.015em", marginBottom: "16px" }}>
          KIX ⇄ Namba transit
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { lbl: "Recommended", t: "Nankai Rapi:t (特急)", s: "38 min · ¥1,450 · direct" },
            { lbl: "Budget", t: "Nankai Airport Express", s: "48 min · ¥970" },
            { lbl: "Avoid", t: "JR Haruka", s: "Goes to Tennoji only" },
          ].map((r) => (
            <div
              key={r.t}
              className="rounded-xl p-3"
              style={{ backgroundColor: "#ffffff14", border: "1px solid #ffffff20" }}
            >
              <div
                className="uppercase mb-1"
                style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "0.14em", color: "#ffffff99" }}
              >
                {r.lbl}
              </div>
              <div style={{ fontSize: "13px", fontWeight: 800, marginBottom: "2px" }}>{r.t}</div>
              <div style={{ fontSize: "11px", fontWeight: 500, color: "#ffffffaa" }}>{r.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ================= COMPONENTS =================
function SectionHeader({ eyebrow, title, sub, rainMode }) {
  const accent = rainMode ? C.rain : C.primary;
  return (
    <div className="mb-6">
      <div
        className="uppercase mb-2"
        style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.22em", color: accent }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontSize: "clamp(28px, 5.5vw, 36px)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: C.text,
          lineHeight: 1.05,
          fontStyle: "italic",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-2" style={{ fontSize: "13px", fontWeight: 500, color: C.subtext }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function DayCard({ day, expanded, onToggle, rainMode }) {
  const isDay4 = day.n === 4;
  const items = isDay4 && rainMode && day.rainyItems ? day.rainyItems : day.items;
  const accent = rainMode ? C.rain : C.primary;
  const accentBg = rainMode ? C.rainBg : C.cloud;

  return (
    <div
      className="rounded-[28px] overflow-hidden"
      style={{
        backgroundColor: expanded ? C.white : "rgba(255,255,255,0.55)",
        border: `1px solid ${expanded ? (rainMode ? C.hairlineRain : C.accent) : C.hairline}`,
        boxShadow: expanded ? "0 12px 36px -14px rgba(255,133,161,0.25)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between gap-3"
        style={{ background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div
            className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{
              background: expanded
                ? `linear-gradient(135deg, ${accent}, ${rainMode ? "#7E9AB3" : C.accent})`
                : C.white,
              color: expanded ? C.white : accent,
              fontSize: "16px",
              fontWeight: 900,
              border: expanded ? "none" : `1px solid ${C.hairline}`,
              boxShadow: expanded ? `0 6px 16px -4px ${accent}66` : "none",
              transition: "all 0.25s ease",
            }}
          >
            {day.n}
          </div>
          <div className="min-w-0">
            <div
              className="uppercase mb-0.5"
              style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.16em", color: C.subtext }}
            >
              {day.date}
            </div>
            <div
              className="truncate"
              style={{ fontSize: "16px", fontWeight: 800, color: C.text, letterSpacing: "-0.01em" }}
            >
              {day.title}
            </div>
            {!expanded && (
              <div
                className="truncate mt-0.5"
                style={{ fontSize: "11px", fontWeight: 500, color: C.subtext }}
              >
                {day.mood}
              </div>
            )}
          </div>
        </div>
        <ChevronRight
          size={20}
          className="shrink-0"
          style={{
            color: expanded ? accent : C.subtext,
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        />
      </button>

      {expanded && (
        <div className="px-5 pb-6 anim-fade">
          <div
            className="mb-4 pb-4"
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: C.subtext,
              borderBottom: `1px dashed ${C.hairline}`,
            }}
          >
            {day.sub} · <span style={{ fontStyle: "italic" }}>{day.mood}</span>
          </div>

          <div className="space-y-4">
            {items.map((item, i) => (
              <div key={i} className="flex gap-3 relative">
                {i < items.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "32px",
                      bottom: "-16px",
                      width: "2px",
                      backgroundColor: C.hairline,
                    }}
                  />
                )}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10"
                  style={{ backgroundColor: item.swapped ? C.rainBg : accentBg }}
                >
                  <item.icon
                    size={14}
                    style={{ color: item.swapped ? C.rain : accent }}
                  />
                </div>
                <div className="flex-1 pt-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="px-2 py-0.5 rounded-md"
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        color: accent,
                        backgroundColor: accentBg,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.t}
                    </span>
                    {item.swapped && (
                      <span
                        className="px-2 py-0.5 rounded-md uppercase"
                        style={{
                          fontSize: "9px",
                          fontWeight: 800,
                          color: C.white,
                          backgroundColor: C.rain,
                          letterSpacing: "0.06em",
                        }}
                      >
                        Rainy switch
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: C.text,
                      marginBottom: "3px",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: C.subtext,
                      lineHeight: 1.55,
                    }}
                  >
                    {item.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CafeCard({ cafe, isLiked, onLike }) {
  const [imgStage, setImgStage] = useState(0); // 0 = unsplash, 1 = picsum, 2 = svg fallback

  const imgSrc =
    imgStage === 0
      ? cafe.image
      : imgStage === 1
      ? `https://picsum.photos/seed/${encodeURIComponent(cafe.name)}/800/600`
      : null;

  return (
    <div
      className="rounded-[28px] overflow-hidden"
      style={{
        backgroundColor: C.white,
        border: `1px solid ${C.hairline}`,
        boxShadow: "0 4px 18px -8px rgba(255,133,161,0.18)",
      }}
    >
      {/* 4:3 image hero */}
      <div
        className="relative w-full"
        style={{
          paddingBottom: "75%",
          background: `linear-gradient(135deg, ${cafe.hue}, ${cafe.hue2 || cafe.hue})`,
          overflow: "hidden",
        }}
      >
        {/* Real image — Unsplash first, Picsum fallback */}
        {imgSrc && (
          <img
            src={imgSrc}
            alt={cafe.name}
            loading="lazy"
            onError={() => setImgStage((s) => s + 1)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* SVG fallback only when both image services fail */}
        {imgStage >= 2 && (
          <svg
            viewBox="0 0 200 150"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              color: C.text,
              opacity: 0.18,
            }}
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M60 60 L60 100 Q60 115 75 115 L115 115 Q130 115 130 100 L130 60 Z" />
              <path d="M130 68 Q150 68 150 85 Q150 98 130 98" />
              <path d="M75 40 Q75 30 82 30 Q89 30 89 40 Q89 50 82 50 Q75 50 75 40" />
              <path d="M95 38 Q95 28 102 28 Q109 28 109 38 Q109 48 102 48 Q95 48 95 38" />
              <path d="M115 42 Q115 32 122 32 Q129 32 129 42 Q129 52 122 52 Q115 52 115 42" />
            </g>
          </svg>
        )}

        {/* Soft bottom shade for text legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.18) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Area badge */}
        <div
          className="uppercase"
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            padding: "5px 10px",
            borderRadius: "999px",
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "0.12em",
            backgroundColor: "rgba(255,255,255,0.92)",
            color: C.text,
            WebkitBackdropFilter: "blur(8px)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {cafe.area}
        </div>

        {/* Heart button */}
        <button
          type="button"
          onClick={onLike}
          aria-label="Save cafe"
          className={`${isLiked ? "anim-heart" : ""}`}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.95)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px -2px rgba(0,0,0,0.18)",
            WebkitBackdropFilter: "blur(8px)",
            backdropFilter: "blur(8px)",
            transition: "transform 0.15s ease",
          }}
        >
          <Heart
            size={17}
            fill={isLiked ? C.primary : "transparent"}
            stroke={isLiked ? C.primary : C.text}
            strokeWidth={2.2}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 800,
            color: C.text,
            letterSpacing: "-0.015em",
            marginBottom: "3px",
            lineHeight: 1.25,
          }}
        >
          {cafe.name}
        </h3>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: C.subtext,
            marginBottom: "12px",
            fontStyle: "italic",
          }}
        >
          {cafe.vibe}
        </div>

        <div className="space-y-2 pt-3" style={{ borderTop: `1px dashed ${C.hairline}` }}>
          <div className="flex items-center gap-2">
            <Clock size={12} style={{ color: C.primary, flexShrink: 0 }} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: C.text }}>{cafe.open}</span>
          </div>
          <div className="flex items-start gap-2">
            <Sparkles size={12} style={{ color: C.primary, marginTop: "3px", flexShrink: 0 }} />
            <span style={{ fontSize: "12px", fontWeight: 500, color: C.text }}>{cafe.specialty}</span>
          </div>
        </div>

        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: C.subtext,
            lineHeight: 1.5,
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: `1px dashed ${C.hairline}`,
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
      { t: "12:45–13:30", icon: Plane, label: "Land at KIX", detail: "Full-service from Taipei lands midday. Clear customs, pick up ICOCA, activate eSIM." },
      { t: "14:30", icon: Train, label: "Nankai Rapi:t → Namba", detail: "Direct, 38 min, ¥1,450. Skip JR Haruka — wrong direction for Namba." },
      { t: "15:30", icon: Hotel, label: "Hotel check-in", detail: "Drop bags, shower, quick reset. Individual rooms — no rushing." },
      { t: "16:30", icon: ShoppingBag, label: "Shinsaibashi arcade warm-up", detail: "Covered arcade — Loft, PLAZA, Uniqlo flagship. Beat jet lag with low-stakes browsing." },
      { t: "18:30", icon: UtensilsCrossed, label: "Dinner · Endo Sushi or Ichiran", detail: "Endo for clean sushi; Ichiran for classic solo-booth ramen." },
      { t: "20:00", icon: Camera, label: "Dotonbori Glico-sign stroll", detail: "Neon, Ebisu Bridge photo, Don Quijote ferris wheel view. 30–45 min." },
      { t: "21:30", icon: Moon, label: "Konbini haul · early night", detail: "Lawson pudding, Strong Zero, onigiri. Sleep early — Day 2 is the real start." },
    ],
  },
  {
    n: 2, date: "THU · MAY 28",
    title: "Namba · Shinsaibashi Deep Dive",
    sub: "難波・心齋橋深度",
    mood: "Food crawl · Vintage · Neon night",
    items: [
      { t: "10:30", icon: Coffee, label: "Breakfast · Mel Coffee Roasters", detail: "Nishi-Shinsaibashi. Opens 10:00. Third-wave pour-over + pastry." },
      { t: "11:30", icon: UtensilsCrossed, label: "Kuromon Ichiba food crawl", detail: "Graze: uni, A5 wagyu skewers, oysters, eel, tuna. Skip lunch." },
      { t: "13:30", icon: ShoppingBag, label: "Shinsaibashi-suji arcade", detail: "Covered arcade. Uniqlo / GU flagship, Loft, PLAZA, drugstores." },
      { t: "15:00", icon: Heart, label: "Amerika-mura (vintage anchor)", detail: "2nd STREET, Ragtag, Kinji, Flamingo. 90-min cap." },
      { t: "16:30", icon: MapPin, label: "Orange Street · Horie", detail: "Indie boutiques, design stores, quieter than the arcade." },
      { t: "17:30", icon: Coffee, label: "Coffee · LiLo Coffee Roasters", detail: "Standing bar, rotating single origins. Local favorite." },
      { t: "19:00", icon: UtensilsCrossed, label: "Dinner · Yakiniku splurge", detail: "Matsusakaya Namba or Ittan. A5 wagyu. Reserve via Tablecheck." },
      { t: "21:30", icon: Sparkles, label: "Dotonbori takoyaki · river walk", detail: "Kukuru for takoyaki. Late-night neon photos." },
    ],
  },
  {
    n: 3, date: "FRI · MAY 29",
    title: "Kyoto Day Trip",
    sub: "京都一日",
    mood: "Temples · Matcha · Bamboo",
    items: [
      { t: "09:30", icon: Train, label: "JR Namba → Kyoto", detail: "~45 min via Osaka Stn. Or Hankyu Kyoto line from Umeda → Kawaramachi." },
      { t: "10:30", icon: Sparkles, label: "Arashiyama Bamboo + Tenryu-ji", detail: "Arashiyama first. Walk the grove, peek at Tenryu-ji garden." },
      { t: "12:30", icon: UtensilsCrossed, label: "Lunch · Yudofu Sagano", detail: "Walk-in classic. Or Shoraian if you book ahead." },
      { t: "14:00", icon: Navigation, label: "Train to Gion · Hanamikoji", detail: "Old Kyoto machiya lanes, geiko district in late afternoon." },
      { t: "15:30", icon: Coffee, label: "Matcha · Nakamura Tokichi or % Arabica", detail: "THE matcha parfait. Queue is real — go before 16:00." },
      { t: "16:30", icon: MapPin, label: "Kiyomizu-dera (optional)", detail: "Sunset from the wooden terrace is magic. Skip if feet are done." },
      { t: "19:00", icon: Train, label: "Return to Osaka · light dinner", detail: "Okonomiyaki at Mizuno or Chibo." },
    ],
  },
  {
    n: 4, date: "SAT · MAY 30",
    title: "Umeda · Nakazakicho Slow Day",
    sub: "梅田・中崎町慢行",
    mood: "Select shops · Depachika · Sky views · Kappo",
    items: [
      { t: "10:30", icon: Coffee, label: "Breakfast · Mondial Kaffee 328", detail: "Umeda · Nishitenma. Latte-art-championship winner. Opens 08:00." },
      { t: "11:30", icon: ShoppingBag, label: "Hankyu · Hanshin depachika", detail: "Basement food halls. Sample wagashi, bento, fruit sandwiches." },
      { t: "13:00", icon: MapPin, label: "Nakazakicho vintage walk", detail: "Old machiya-turned-cafes, indie vintage. Taiyouno-Tou, Salon de AManTO." },
      { t: "14:30", icon: Coffee, label: "Cafe · Taiyouno-Tou", detail: "Deep Showa-era vibes. Tatami feel, slow pour, homemade cake." },
      { t: "16:00", icon: ShoppingBag, label: "Grand Front · select shops", detail: "BEAMS, Journal Standard, United Arrows, SHIPS, Tomorrowland." },
      { t: "18:00", icon: Sun, label: "Umeda Sky Building Observatory", detail: "Sunset golden hour — arrive 18:00. ¥1,500. 360° skyline." },
      { t: "20:00", icon: UtensilsCrossed, label: "Dinner · Kitashinchi sushi or kappo", detail: "Upscale, quieter than Namba. Book ahead." },
    ],
    rainyItems: [
      { t: "10:30", icon: Coffee, label: "Breakfast · Mondial Kaffee 328", detail: "Umeda · Nishitenma. Stay cozy with champion lattes." },
      { t: "11:30", icon: ShoppingBag, label: "Hankyu · Hanshin depachika", detail: "Basement food halls. Extra-comforting on a wet day." },
      { t: "13:00", icon: ShoppingBag, label: "Whity Umeda underground", detail: "Swap Nakazakicho outdoor walk → Whity Umeda / Diamor underground malls.", swapped: true },
      { t: "14:30", icon: Coffee, label: "Cafe · 4/4 Seasons Coffee", detail: "Indoor cafe near Osaka Station — Taiyouno-Tou requires street walking.", swapped: true },
      { t: "16:00", icon: ShoppingBag, label: "Grand Front · select shops", detail: "Covered from Osaka Station. BEAMS, Journal Standard, United Arrows." },
      { t: "18:00", icon: MapIcon, label: "HEP FIVE Ferris wheel", detail: "Swap Umeda Sky outdoor deck → HEP FIVE indoor ferris wheel + Lucua food floor.", swapped: true },
      { t: "20:00", icon: UtensilsCrossed, label: "Dinner · Kitashinchi sushi or kappo", detail: "Direct subway access from Umeda. Book ahead." },
    ],
  },
  {
    n: 5, date: "SUN · MAY 31",
    title: "Last Bites & Departure",
    sub: "最後的早午餐・返程",
    mood: "Slow morning · Drugstore haul · Buffer",
    items: [
      { t: "09:30", icon: Hotel, label: "Late checkout · bag strategy", detail: "Hotels hold bags till 18:00. Or ship to KIX via Yamato (~¥2,000)." },
      { t: "10:30", icon: Coffee, label: "Brunch · favorite cafe", detail: "No new places on departure day. Return to Mel, LiLo, or Mondial." },
      { t: "12:00", icon: ShoppingBag, label: "Don Quijote Dotonbori", detail: "Kit Kats, Hada Labo, Canmake. Tax-free counter — passport on you." },
      { t: "14:00", icon: UtensilsCrossed, label: "Light lunch near Namba", detail: "Tonkatsu at Wako, soba at Tsurutontan, or curry at Kuidaore." },
      { t: "15:30", icon: Train, label: "Nankai Rapi:t → KIX", detail: "Aim for KIX 2.5–3 hrs before int'l departure." },
      { t: "18:00+", icon: Plane, label: "Fly home", detail: "Duty-free last chance: Royce', Tokyo Banana, Shiroi Koibito." },
    ],
  },
];

const CAFES = [
  {
    name: "Mel Coffee Roasters",
    area: "Nishi-Shinsaibashi",
    vibe: "Quiet · Minimalist · Pour-over",
    open: "10:00–19:00",
    specialty: "Single-origin pour-over",
    note: "No WiFi, small counter. Go for the coffee, not the laptop.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&auto=format&fit=crop",
    hue: "#FFE0E6", hue2: "#FFCED6",
  },
  {
    name: "LiLo Coffee Roasters",
    area: "Amerika-mura",
    vibe: "Standing bar · Indie · Rotating beans",
    open: "11:00–21:00",
    specialty: "Espresso tonic · Daily SO",
    note: "Tiny space. The Amemura youth crowd's daily stop.",
    image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80&auto=format&fit=crop",
    hue: "#FFD6DC", hue2: "#FFC4CC",
  },
  {
    name: "Mondial Kaffee 328",
    area: "Umeda · Nishitenma",
    vibe: "Champion barista · Latte-art",
    open: "08:00–19:00",
    specialty: "Cappuccino · Latte art",
    note: "Latte Art Championship winner roastery.",
    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=800&q=80&auto=format&fit=crop",
    hue: "#FFCDD8", hue2: "#FFB7C5",
  },
  {
    name: "% Arabica Higashiyama",
    area: "Kyoto · Day 3",
    vibe: "Iconic · Minimal · Worldwide-famous",
    open: "09:00–18:00",
    specialty: "Kyoto latte",
    note: "Go early or queue. Fujii-Daimaru branch is calmer.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80&auto=format&fit=crop",
    hue: "#FFE3E8", hue2: "#FFD1DC",
  },
  {
    name: "Taiyouno-Tou (太陽ノ塔)",
    area: "Nakazakicho",
    vibe: "Showa vintage · Tatami · Bookish",
    open: "11:00–21:00",
    specialty: "Café au lait · Homemade cake",
    note: "Converted machiya. 1970s Kyoto in the middle of Osaka.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80&auto=format&fit=crop",
    hue: "#FFC8D4", hue2: "#FFAFBF",
  },
  {
    name: "Streamer Coffee",
    area: "Shinsaibashi",
    vibe: "Urban · Military latte · Loud music",
    open: "08:00–20:00",
    specialty: "Military latte (5-shot)",
    note: "Tokyo transplant, still one of the city's best espressos.",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80&auto=format&fit=crop",
    hue: "#FFDAD8", hue2: "#FFC2C0",
  },
];

const BUDGET = [
  { cat: "Hotel (4 nights, 2 rooms)", lo: 40000, hi: 60000, pct: 50, note: "¥10–15k/room/night, Namba mid-tier" },
  { cat: "Food & Drinks", lo: 25000, hi: 35000, pct: 27, note: "~¥5–7k/day incl. yakiniku splurge" },
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
  "Allergy meds + pain reliever",
  "Reusable tote (for shopping)",
  "Eco water bottle",
  "Cash ¥30,000 backup",
];

const TIPS = [
  { icon: Umbrella, title: "Late-May Weather", detail: "Transition to tsuyu. Expect 1–2 shower days, ~22°C highs, humidity 70%+." },
  { icon: CloudRain, title: "Rainy Day Plan B", detail: "Toggle Rain Mode on the Plan tab to swap Day 4 for indoor alternatives." },
  { icon: Train, title: "Transit Card", detail: "ICOCA for trains, buses, konbini. Buy at JR KIX counter on arrival." },
  { icon: Clock, title: "No-Early-Rise", detail: "Every morning starts 10:00+. Cafes open 10–11. Use slow mornings in-room." },
  { icon: AlertCircle, title: "Reservations", detail: "Book 2–3 weeks out: yakiniku, kappo/sushi, Shoraian Kyoto." },
  { icon: Sparkles, title: "Drugstore Strategy", detail: "Save the haul for Day 5 morning. Passport for tax-free counter." },
];