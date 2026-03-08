import { useState, useMemo, useEffect } from "react";

const PLANT_CATEGORIES = {
  "🥦 Vegetables": [
    { name: "Broccoli", emoji: "🥦", pointsPer: 1.0, portion: "80g (2–3 florets)" },
    { name: "Spinach", emoji: "🌿", pointsPer: 0.5, portion: "80g raw (large handful)" },
    { name: "Kale", emoji: "🥬", pointsPer: 0.5, portion: "80g raw (large handful)" },
    { name: "Carrot", emoji: "🥕", pointsPer: 1.0, portion: "80g (1 medium carrot)" },
    { name: "Courgette", emoji: "🫑", pointsPer: 1.0, portion: "80g (½ medium courgette)" },
    { name: "Tomato", emoji: "🍅", pointsPer: 0.5, portion: "80g (1 medium or 7 cherry)" },
    { name: "Bell Pepper", emoji: "🫑", pointsPer: 1.0, portion: "80g (½ large pepper)" },
    { name: "Onion", emoji: "🧅", pointsPer: 0.5, portion: "80g (1 medium onion)" },
    { name: "Garlic", emoji: "🧄", pointsPer: 0.25, portion: "1–2 cloves (~10g)" },
    { name: "Cucumber", emoji: "🥒", pointsPer: 0.5, portion: "80g (5cm chunk)" },
    { name: "Aubergine", emoji: "🍆", pointsPer: 1.0, portion: "80g (3–4 slices)" },
    { name: "Sweet Potato", emoji: "🍠", pointsPer: 1.0, portion: "80g (½ medium)" },
    { name: "Beetroot", emoji: "🫀", pointsPer: 1.0, portion: "80g (2 small beets)" },
    { name: "Celery", emoji: "🌱", pointsPer: 0.5, portion: "80g (2–3 stalks)" },
    { name: "Leek", emoji: "🌿", pointsPer: 1.0, portion: "80g (1 medium leek)" },
  ],
  "🍎 Fruits": [
    { name: "Apple", emoji: "🍎", pointsPer: 1.0, portion: "80g (1 medium apple)" },
    { name: "Banana", emoji: "🍌", pointsPer: 1.0, portion: "80g (1 small/medium banana)" },
    { name: "Blueberries", emoji: "🫐", pointsPer: 0.5, portion: "80g (large handful)" },
    { name: "Strawberries", emoji: "🍓", pointsPer: 0.5, portion: "80g (7 medium berries)" },
    { name: "Mango", emoji: "🥭", pointsPer: 1.0, portion: "80g (2 heaped tbsp sliced)" },
    { name: "Orange", emoji: "🍊", pointsPer: 1.0, portion: "80g (1 medium orange)" },
    { name: "Avocado", emoji: "🥑", pointsPer: 1.0, portion: "80g (½ medium avocado)" },
    { name: "Grapes", emoji: "🍇", pointsPer: 0.5, portion: "80g (~15 grapes)" },
    { name: "Pear", emoji: "🍐", pointsPer: 1.0, portion: "80g (1 medium pear)" },
    { name: "Pineapple", emoji: "🍍", pointsPer: 1.0, portion: "80g (1 large slice)" },
    { name: "Raspberries", emoji: "🍓", pointsPer: 0.5, portion: "80g (large handful)" },
    { name: "Lemon", emoji: "🍋", pointsPer: 0.25, portion: "Juice of ½ lemon (~15ml)" },
  ],
  "🌾 Grains & Legumes": [
    { name: "Oats", emoji: "🌾", pointsPer: 1.0, portion: "40g dry (1 standard portion)" },
    { name: "Brown Rice", emoji: "🍚", pointsPer: 1.0, portion: "180g cooked (4 heaped tbsp)" },
    { name: "Quinoa", emoji: "🌾", pointsPer: 1.0, portion: "180g cooked (4 heaped tbsp)" },
    { name: "Lentils", emoji: "🫘", pointsPer: 1.0, portion: "80g cooked (3 heaped tbsp)" },
    { name: "Chickpeas", emoji: "🫘", pointsPer: 1.0, portion: "80g cooked (3 heaped tbsp)" },
    { name: "Black Beans", emoji: "🫘", pointsPer: 1.0, portion: "80g cooked (3 heaped tbsp)" },
    { name: "Edamame", emoji: "🫛", pointsPer: 1.0, portion: "80g shelled beans" },
    { name: "Tofu", emoji: "⬜", pointsPer: 0.5, portion: "100g (palm-sized piece)" },
    { name: "Wholemeal Bread", emoji: "🍞", pointsPer: 0.5, portion: "1–2 slices (~40g)" },
    { name: "Barley", emoji: "🌾", pointsPer: 1.0, portion: "180g cooked (4 heaped tbsp)" },
  ],
  "🌰 Nuts & Seeds": [
    { name: "Almonds", emoji: "🌰", pointsPer: 0.5, portion: "30g (~23 almonds)" },
    { name: "Walnuts", emoji: "🌰", pointsPer: 0.5, portion: "30g (~7 walnut halves)" },
    { name: "Chia Seeds", emoji: "✨", pointsPer: 0.5, portion: "15g (1 tbsp)" },
    { name: "Flaxseed", emoji: "✨", pointsPer: 0.5, portion: "15g (1 tbsp)" },
    { name: "Sunflower Seeds", emoji: "🌻", pointsPer: 0.5, portion: "30g (2 tbsp)" },
    { name: "Pumpkin Seeds", emoji: "🎃", pointsPer: 0.5, portion: "30g (2 tbsp)" },
    { name: "Cashews", emoji: "🌰", pointsPer: 0.5, portion: "30g (~18 cashews)" },
    { name: "Peanuts", emoji: "🥜", pointsPer: 0.5, portion: "30g (small handful)" },
  ],
  "🍄 Mushrooms & Herbs": [
    { name: "Mushrooms", emoji: "🍄", pointsPer: 1.0, portion: "80g (3–4 medium mushrooms)" },
    { name: "Basil", emoji: "🌿", pointsPer: 0.25, portion: "Small handful of leaves (~5g)" },
    { name: "Parsley", emoji: "🌿", pointsPer: 0.25, portion: "Small handful of leaves (~5g)" },
    { name: "Coriander", emoji: "🌿", pointsPer: 0.25, portion: "Small handful of leaves (~5g)" },
    { name: "Oregano", emoji: "🌿", pointsPer: 0.25, portion: "1 tsp dried or small handful fresh (~2g)" },
    { name: "Ginger", emoji: "🫚", pointsPer: 0.25, portion: "1 tsp grated or 5g fresh" },
    { name: "Turmeric", emoji: "🟡", pointsPer: 0.25, portion: "¼ tsp powder or 3g fresh" },
  ],
  "🫘 More Legumes": [
    { name: "Cannellini Beans", emoji: "🫘", pointsPer: 1.0, portion: "80g cooked (3 heaped tbsp)" },
    { name: "Kidney Beans", emoji: "🫘", pointsPer: 1.0, portion: "80g cooked (3 heaped tbsp)" },
    { name: "Butter Beans", emoji: "🫘", pointsPer: 1.0, portion: "80g cooked (3 heaped tbsp)" },
    { name: "Peas", emoji: "🫛", pointsPer: 1.0, portion: "80g (3 heaped tbsp)" },
    { name: "Soya Beans", emoji: "🫘", pointsPer: 1.0, portion: "80g cooked" },
    { name: "Mung Beans", emoji: "🫘", pointsPer: 1.0, portion: "80g cooked (3 heaped tbsp)" },
  ],
};

const WEEKLY_GOAL = 30;
const SERVING_OPTIONS = [
  { label: "Small", sublabel: "½ serving", value: 0.5 },
  { label: "Regular", sublabel: "1 serving", value: 1.0 },
  { label: "Large", sublabel: "1½ servings", value: 1.5 },
  { label: "Double", sublabel: "2 servings", value: 2.0 },
];

const getTodayKey = () => new Date().toISOString().split("T")[0];
const getWeekDays = () => {
  const today = new Date();
  const day = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((day + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split("T")[0];
  });
};

function ServingPicker({ plant, servingSize, setServingSize, onAdd }) {
  return (
    <div className="flash" style={{ marginTop: 16, padding: 16, background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 12 }}>
      <p className="pp-body" style={{ fontSize: 13, color: "#e8f5e8", marginBottom: 6 }}>
        {plant.emoji} <strong>{plant.name}</strong> — how much did you have?
      </p>
      {plant.portion && (
        <p className="pp-body" style={{ fontSize: 11, color: "rgba(134,239,172,0.5)", marginBottom: 12, background: "rgba(134,239,172,0.06)", borderRadius: 6, padding: "4px 8px", display: "inline-block" }}>
          📏 1 serving = {plant.portion}
        </p>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 12 }}>
        {SERVING_OPTIONS.map((s) => (
          <button key={s.value} className="pp-btn" onClick={() => setServingSize(s.value)} style={{
            padding: "8px 4px", borderRadius: 8, fontSize: 12, fontFamily: "'DM Sans', sans-serif",
            background: servingSize === s.value ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.05)",
            border: servingSize === s.value ? "1px solid #4ade80" : "1px solid rgba(255,255,255,0.1)",
            color: servingSize === s.value ? "#4ade80" : "#a8d5a8",
          }}>
            <div style={{ fontWeight: 600 }}>{s.label}</div>
            <div style={{ opacity: 0.6, fontSize: 10, marginTop: 1 }}>{s.sublabel}</div>
            <div style={{ opacity: 0.7, fontSize: 11, marginTop: 2 }}>{(plant.pointsPer * s.value).toFixed(2)}pts</div>
          </button>
        ))}
      </div>
      <button className="pp-btn" onClick={onAdd} style={{
        width: "100%", padding: "11px", background: "#4ade80", color: "#0f1a0f", borderRadius: 10,
        fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14,
      }}>
        ＋ Add {(plant.pointsPer * servingSize).toFixed(2)} points
      </button>
    </div>
  );
}

export default function PlantPointsTracker() {
  const [log, setLog] = useState({});
  const [customPlants, setCustomPlants] = useState([]);
  const [storageReady, setStorageReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [servingSize, setServingSize] = useState(1.0);
  const [customName, setCustomName] = useState("");
  const [customPoints, setCustomPoints] = useState(1.0);
  const [activeTab, setActiveTab] = useState("log");
  const [addedFlash, setAddedFlash] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLog = localStorage.getItem("plant-log");
      if (savedLog) setLog(JSON.parse(savedLog));
    } catch (e) {}
    try {
      const savedPlants = localStorage.getItem("custom-plants");
      if (savedPlants) setCustomPlants(JSON.parse(savedPlants));
    } catch (e) {}
    setStorageReady(true);
  }, []);

  // Save log to localStorage
  useEffect(() => {
    if (!storageReady) return;
    try { localStorage.setItem("plant-log", JSON.stringify(log)); } catch (e) {}
  }, [log, storageReady]);

  // Save custom plants to localStorage
  useEffect(() => {
    if (!storageReady) return;
    try { localStorage.setItem("custom-plants", JSON.stringify(customPlants)); } catch (e) {}
  }, [customPlants, storageReady]);

  const todayKey = getTodayKey();
  const weekDays = getWeekDays();

  const todayLog = log[todayKey] || [];
  const todayPoints = todayLog.reduce((s, e) => s + e.points, 0);
  const todayUnique = new Set(todayLog.map(e => e.name.toLowerCase())).size;

  const allWeekEntries = weekDays.flatMap(d => log[d] || []);
  const weekPoints = allWeekEntries.reduce((s, e) => s + e.points, 0);
  const weekUnique = new Set(allWeekEntries.map(e => e.name.toLowerCase())).size;

  const UNIQUE_GOAL = 30;
  const weekProgress = Math.min((weekPoints / WEEKLY_GOAL) * 100, 100);
  const weekUniqueProgress = Math.min((weekUnique / UNIQUE_GOAL) * 100, 100);

  const allPlants = useMemo(() => [...Object.values(PLANT_CATEGORIES).flat(), ...customPlants], [customPlants]);
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allPlants.filter((p) => p.name.toLowerCase().includes(q));
  }, [searchQuery, allPlants]);

  const addEntry = (plant, size) => {
    const points = parseFloat((plant.pointsPer * size).toFixed(2));
    const entry = { id: Date.now(), name: plant.name, emoji: plant.emoji, points, size };
    setLog((prev) => ({ ...prev, [todayKey]: [...(prev[todayKey] || []), entry] }));
    setAddedFlash(plant.name);
    setTimeout(() => setAddedFlash(null), 1500);
    setSelectedPlant(null);
    setServingSize(1.0);
    setSearchQuery("");
  };

  const addCustomEntry = () => {
    if (!customName.trim()) return;
    const pts = parseFloat(customPoints) || 1.0;
    // Save to custom plants database if not already there
    const exists = allPlants.some(p => p.name.toLowerCase() === customName.trim().toLowerCase());
    if (!exists) {
      const newPlant = { name: customName.trim(), emoji: "🌱", pointsPer: pts, portion: null, custom: true };
      setCustomPlants(prev => [...prev, newPlant]);
    }
    // Also log it immediately for today
    const entry = { id: Date.now(), name: customName.trim(), emoji: "🌱", points: pts, size: 1 };
    setLog((prev) => ({ ...prev, [todayKey]: [...(prev[todayKey] || []), entry] }));
    setAddedFlash(customName.trim());
    setTimeout(() => setAddedFlash(null), 1500);
    setCustomName("");
    setCustomPoints(1.0);
  };

  const removeEntry = (dateKey, id) => {
    setLog((prev) => ({ ...prev, [dateKey]: (prev[dateKey] || []).filter((e) => e.id !== id) }));
  };

  const [saveCode, setSaveCode] = useState("");
  const [showSavePanel, setShowSavePanel] = useState(false);
  const [loadInput, setLoadInput] = useState("");
  const [loadError, setLoadError] = useState("");
  const [copyFlash, setCopyFlash] = useState(false);

  const generateSaveCode = () => {
    const data = { log, customPlants, savedAt: new Date().toISOString(), version: 1 };
    return btoa(JSON.stringify(data));
  };

  const handleSave = () => {
    const code = generateSaveCode();
    setSaveCode(code);
    setShowSavePanel("save");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopyFlash(true);
        setTimeout(() => setCopyFlash(false), 2000);
      }).catch(() => {});
    }
  };

  const handleLoad = () => {
    setLoadError("");
    try {
      const data = JSON.parse(atob(loadInput.trim()));
      if (data.log) setLog(data.log);
      if (data.customPlants) setCustomPlants(data.customPlants);
      setShowSavePanel(false);
      setLoadInput("");
    } catch (e) {
      setLoadError("That code doesn't look right — please paste it again exactly as copied.");
    }
  };

  const dayName = (dateStr) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "short" });
  };
  const isToday = (dateStr) => dateStr === todayKey;

  const ringColor = weekProgress >= 100 ? "#4ade80" : weekProgress >= 60 ? "#a3e635" : "#86efac";

  if (!storageReady) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f1a0f 0%, #1a2e1a 50%, #0f1f0f 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>🌱</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(134,239,172,0.6)", fontSize: 14 }}>Loading your plant log…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f1a0f 0%, #1a2e1a 50%, #0f1f0f 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#e8f5e8",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .pp-header { font-family: 'Playfair Display', serif; }
        .pp-body { font-family: 'DM Sans', sans-serif; }
        .pp-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; backdrop-filter: blur(10px); }
        .pp-btn { cursor: pointer; border: none; transition: all 0.2s; }
        .pp-btn:hover { transform: translateY(-1px); }
        .pp-plant-chip { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; background: rgba(134,239,172,0.12); border: 1px solid rgba(134,239,172,0.25); border-radius: 999px; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #86efac; }
        .pp-plant-chip:hover { background: rgba(134,239,172,0.22); border-color: rgba(134,239,172,0.5); transform: scale(1.03); }
        .pp-plant-chip.selected { background: rgba(74,222,128,0.3); border-color: #4ade80; color: #fff; }
        .pp-tab { padding: 10px 20px; border-radius: 999px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; border: none; transition: all 0.2s; }
        .pp-tab.active { background: #4ade80; color: #0f1a0f; }
        .pp-tab:not(.active) { background: transparent; color: #86efac; border: 1px solid rgba(134,239,172,0.3); }
        .pp-input { background: rgba(255,255,255,0.07); border: 1px solid rgba(134,239,172,0.25); border-radius: 10px; padding: 10px 14px; color: #e8f5e8; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; width: 100%; transition: border-color 0.2s; }
        .pp-input:focus { border-color: #4ade80; }
        .pp-input::placeholder { color: rgba(134,239,172,0.4); }
        .pp-select { background: rgba(255,255,255,0.07); border: 1px solid rgba(134,239,172,0.25); border-radius: 10px; padding: 10px 14px; color: #e8f5e8; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; cursor: pointer; }
        .pp-entry { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255,255,255,0.04); border-radius: 10px; margin-bottom: 6px; border: 1px solid rgba(255,255,255,0.07); }
        .pp-remove { background: rgba(248,113,113,0.15); border: none; border-radius: 6px; color: #f87171; padding: 4px 8px; cursor: pointer; font-size: 12px; transition: background 0.2s; }
        .pp-remove:hover { background: rgba(248,113,113,0.3); }
        .pp-cat-btn { padding: 8px 16px; border-radius: 999px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; border: 1px solid rgba(134,239,172,0.25); color: #86efac; background: transparent; transition: all 0.2s; white-space: nowrap; }
        .pp-cat-btn.active { background: rgba(134,239,172,0.2); border-color: #86efac; }
        .pp-cat-btn:hover { background: rgba(134,239,172,0.12); }
        .flash { animation: flashIn 0.3s ease-out; }
        @keyframes flashIn { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }
        .ring-track { fill: none; stroke: rgba(134,239,172,0.15); }
        .ring-fill { fill: none; stroke-linecap: round; transition: stroke-dashoffset 0.8s ease; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(134,239,172,0.3); border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "24px 20px 0", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h1 className="pp-header" style={{ fontSize: 28, fontWeight: 700, color: "#4ade80", letterSpacing: "-0.5px" }}>
              Plant Points
            </h1>
            <p className="pp-body" style={{ fontSize: 13, color: "rgba(134,239,172,0.6)", marginTop: 2 }}>
              {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
            {addedFlash && (
              <div className="flash pp-body" style={{ background: "rgba(74,222,128,0.2)", border: "1px solid #4ade80", borderRadius: 999, padding: "6px 16px", fontSize: 13, color: "#4ade80" }}>
                ✓ {addedFlash} added!
              </div>
            )}
            <div style={{ display: "flex", gap: 6 }}>
              <button className="pp-btn" onClick={handleSave} style={{ padding: "7px 14px", background: "#4ade80", color: "#0f1a0f", borderRadius: 999, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12 }}>
                ↓ Save
              </button>
              <button className="pp-btn" onClick={() => setShowSavePanel("load")} style={{ padding: "7px 14px", background: "rgba(134,239,172,0.1)", border: "1px solid rgba(134,239,172,0.3)", color: "#86efac", borderRadius: 999, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12 }}>
                ↑ Load
              </button>
            </div>
            <p className="pp-body" style={{ fontSize: 10, color: "rgba(134,239,172,0.25)" }}>save before closing</p>
          </div>
        </div>

        {/* Save panel */}
        {showSavePanel === "save" && (
          <div className="pp-card flash" style={{ padding: 20, marginBottom: 20, borderColor: "rgba(74,222,128,0.4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p className="pp-body" style={{ fontSize: 14, color: "#e8f5e8", fontWeight: 600 }}>Your save code</p>
              <button className="pp-btn" onClick={() => setShowSavePanel(false)} style={{ background: "none", color: "rgba(134,239,172,0.4)", fontSize: 18 }}>×</button>
            </div>
            <p className="pp-body" style={{ fontSize: 12, color: "rgba(134,239,172,0.6)", marginBottom: 12 }}>
              Copy this code and paste it into your <strong style={{ color: "#86efac" }}>Notes app</strong> for safekeeping. Use "Load" next time to restore your data.
            </p>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 12, marginBottom: 12, wordBreak: "break-all", fontSize: 11, color: "#86efac", fontFamily: "monospace", maxHeight: 80, overflowY: "auto" }}>
              {saveCode}
            </div>
            <button className="pp-btn" onClick={() => {
              navigator.clipboard.writeText(saveCode).then(() => { setCopyFlash(true); setTimeout(() => setCopyFlash(false), 2000); }).catch(() => {});
            }} style={{ width: "100%", padding: "11px", background: copyFlash ? "rgba(74,222,128,0.3)" : "#4ade80", color: copyFlash ? "#4ade80" : "#0f1a0f", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, border: copyFlash ? "1px solid #4ade80" : "none", transition: "all 0.3s" }}>
              {copyFlash ? "✓ Copied!" : "Copy to clipboard"}
            </button>
          </div>
        )}

        {/* Load panel */}
        {showSavePanel === "load" && (
          <div className="pp-card flash" style={{ padding: 20, marginBottom: 20, borderColor: "rgba(134,239,172,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p className="pp-body" style={{ fontSize: 14, color: "#e8f5e8", fontWeight: 600 }}>Load saved data</p>
              <button className="pp-btn" onClick={() => { setShowSavePanel(false); setLoadInput(""); setLoadError(""); }} style={{ background: "none", color: "rgba(134,239,172,0.4)", fontSize: 18 }}>×</button>
            </div>
            <p className="pp-body" style={{ fontSize: 12, color: "rgba(134,239,172,0.6)", marginBottom: 12 }}>Paste your save code from Notes below.</p>
            <textarea
              className="pp-input"
              placeholder="Paste your save code here…"
              value={loadInput}
              onChange={(e) => { setLoadInput(e.target.value); setLoadError(""); }}
              style={{ height: 80, resize: "none", fontFamily: "monospace", fontSize: 11, marginBottom: 8 }}
            />
            {loadError && <p className="pp-body" style={{ fontSize: 12, color: "#f87171", marginBottom: 8 }}>{loadError}</p>}
            <button className="pp-btn" onClick={handleLoad} style={{ width: "100%", padding: "11px", background: "#4ade80", color: "#0f1a0f", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14 }}>
              Restore my data
            </button>
          </div>
        )}

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div className="pp-card" style={{ padding: "16px 20px" }}>
            <p className="pp-body" style={{ fontSize: 12, color: "rgba(134,239,172,0.5)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Today</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
              <div>
                <p className="pp-header" style={{ fontSize: 28, fontWeight: 700, color: "#4ade80", lineHeight: 1 }}>{todayPoints.toFixed(1)}</p>
                <p className="pp-body" style={{ fontSize: 11, color: "rgba(134,239,172,0.45)", marginTop: 2 }}>points</p>
              </div>
              <div style={{ borderLeft: "1px solid rgba(134,239,172,0.15)", paddingLeft: 12 }}>
                <p className="pp-header" style={{ fontSize: 28, fontWeight: 700, color: "#a3e635", lineHeight: 1 }}>{todayUnique}</p>
                <p className="pp-body" style={{ fontSize: 11, color: "rgba(134,239,172,0.45)", marginTop: 2 }}>unique</p>
              </div>
            </div>
          </div>
          <div className="pp-card" style={{ padding: "16px 20px" }}>
            <p className="pp-body" style={{ fontSize: 12, color: "rgba(134,239,172,0.5)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>This Week</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
              <div>
                <p className="pp-header" style={{ fontSize: 28, fontWeight: 700, color: "#4ade80", lineHeight: 1 }}>{weekPoints.toFixed(1)}</p>
                <p className="pp-body" style={{ fontSize: 11, color: "rgba(134,239,172,0.45)", marginTop: 2 }}>points</p>
              </div>
              <div style={{ borderLeft: "1px solid rgba(134,239,172,0.15)", paddingLeft: 12 }}>
                <p className="pp-header" style={{ fontSize: 28, fontWeight: 700, color: "#a3e635", lineHeight: 1 }}>{weekUnique}</p>
                <p className="pp-body" style={{ fontSize: 11, color: "rgba(134,239,172,0.45)", marginTop: 2 }}>unique</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress Bars */}
        <div className="pp-card" style={{ padding: "16px 20px", marginBottom: 24 }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span className="pp-body" style={{ fontSize: 13, color: "rgba(134,239,172,0.7)" }}>🌿 Unique plants this week</span>
              <span className="pp-body" style={{ fontSize: 13, color: "#a3e635", fontWeight: 600 }}>{weekUnique} / {UNIQUE_GOAL}</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 999, height: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${weekUniqueProgress}%`, background: "linear-gradient(90deg, #a3e635, #4ade80)", borderRadius: 999, transition: "width 0.6s ease" }} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span className="pp-body" style={{ fontSize: 13, color: "rgba(134,239,172,0.7)" }}>✨ Points this week</span>
              <span className="pp-body" style={{ fontSize: 13, color: "#4ade80", fontWeight: 600 }}>{weekPoints.toFixed(1)} / {WEEKLY_GOAL}</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 999, height: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${weekProgress}%`, background: "linear-gradient(90deg, #4ade80, #a3e635)", borderRadius: 999, transition: "width 0.6s ease" }} />
            </div>
          </div>
          {/* Day dots */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginTop: 14 }}>
            {weekDays.map((d) => {
              const entries = log[d] || [];
              const uniq = new Set(entries.map(e => e.name.toLowerCase())).size;
              const intensity = Math.min(uniq / 5, 1);
              return (
                <div key={d} style={{ textAlign: "center" }}>
                  <div style={{ width: "100%", height: 6, borderRadius: 999, background: uniq > 0 ? `rgba(163,230,53,${0.2 + intensity * 0.8})` : "rgba(255,255,255,0.07)", transition: "background 0.3s", marginBottom: 4 }} />
                  <span className="pp-body" style={{ fontSize: 10, color: isToday(d) ? "#4ade80" : "rgba(134,239,172,0.4)", fontWeight: isToday(d) ? 600 : 400 }}>{dayName(d)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["log", "history"].map((t) => (
            <button key={t} className={`pp-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
              {t === "log" ? "🌱 Log Plants" : "📋 History"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px 40px" }}>

        {activeTab === "log" && (
          <div>
            {/* Search */}
            <div className="pp-card" style={{ padding: 20, marginBottom: 16 }}>
              <p className="pp-body" style={{ fontSize: 13, color: "rgba(134,239,172,0.6)", marginBottom: 10 }}>Search plants</p>
              <input
                className="pp-input"
                placeholder="e.g. broccoli, oats, blueberries..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setActiveCategory(null); setSelectedPlant(null); }}
              />
              {searchResults.length > 0 && (
                <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {searchResults.map((p) => (
                    <span key={p.name} className={`pp-plant-chip ${selectedPlant?.name === p.name ? "selected" : ""}`} onClick={() => setSelectedPlant(selectedPlant?.name === p.name ? null : p)}>
                      {p.emoji} {p.name}
                    </span>
                  ))}
                </div>
              )}
              {searchResults.length > 0 && selectedPlant && (
                <ServingPicker plant={selectedPlant} servingSize={servingSize} setServingSize={setServingSize} onAdd={() => addEntry(selectedPlant, servingSize)} />
              )}
              {searchQuery.trim().length > 1 && searchResults.length === 0 && (
                <p className="pp-body" style={{ fontSize: 13, color: "rgba(134,239,172,0.35)", marginTop: 10 }}>No matches — try the custom entry below</p>
              )}
            </div>

            {/* Browse by category */}
            <div className="pp-card" style={{ padding: 20, marginBottom: 16 }}>
              <p className="pp-body" style={{ fontSize: 13, color: "rgba(134,239,172,0.6)", marginBottom: 12 }}>Browse by category</p>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                {Object.keys(PLANT_CATEGORIES).map((cat) => (
                  <button key={cat} className={`pp-cat-btn ${activeCategory === cat ? "active" : ""}`} onClick={() => { setActiveCategory(activeCategory === cat ? null : cat); setSearchQuery(""); setSelectedPlant(null); }}>
                    {cat}
                  </button>
                ))}
              </div>
              {activeCategory && (
                <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {PLANT_CATEGORIES[activeCategory].map((p) => (
                    <span key={p.name} className={`pp-plant-chip ${selectedPlant?.name === p.name ? "selected" : ""}`} onClick={() => setSelectedPlant(selectedPlant?.name === p.name ? null : p)}>
                      {p.emoji} {p.name} <span style={{ opacity: 0.6 }}>·{p.pointsPer}pt</span>
                    </span>
                  ))}
                </div>
              )}
              {activeCategory && selectedPlant && PLANT_CATEGORIES[activeCategory]?.some(p => p.name === selectedPlant.name) && (
                <ServingPicker plant={selectedPlant} servingSize={servingSize} setServingSize={setServingSize} onAdd={() => addEntry(selectedPlant, servingSize)} />
              )}
            </div>

            {/* Custom entry */}
            <div className="pp-card" style={{ padding: 20, marginBottom: 16 }}>
              <p className="pp-body" style={{ fontSize: 13, color: "rgba(134,239,172,0.6)", marginBottom: 4 }}>Add a new plant</p>
              <p className="pp-body" style={{ fontSize: 11, color: "rgba(134,239,172,0.35)", marginBottom: 12 }}>It'll be saved and appear in search for next time</p>
              <div style={{ display: "flex", gap: 8 }}>
                <input className="pp-input" placeholder="Plant name (e.g. oregano)" value={customName} onChange={(e) => setCustomName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustomEntry()} style={{ flex: 2 }} />
                <input className="pp-input" type="number" min="0.25" step="0.25" value={customPoints} onChange={(e) => setCustomPoints(e.target.value)} style={{ flex: 1 }} title="Points per serving" />
                <button className="pp-btn" onClick={addCustomEntry} style={{ padding: "10px 16px", background: "#4ade80", color: "#0f1a0f", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}>
                  + Add
                </button>
              </div>
              <p className="pp-body" style={{ fontSize: 11, color: "rgba(134,239,172,0.3)", marginTop: 6 }}>Points per serving — use 0.25 for herbs/spices, 0.5 for small portions, 1.0 for a full serving</p>
            </div>

            {/* My custom plants */}
            {customPlants.length > 0 && (
              <div className="pp-card" style={{ padding: 20, marginBottom: 16 }}>
                <p className="pp-body" style={{ fontSize: 13, color: "rgba(134,239,172,0.6)", marginBottom: 12 }}>🌱 My saved plants</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {customPlants.map((p) => (
                    <span key={p.name} className={`pp-plant-chip ${selectedPlant?.name === p.name ? "selected" : ""}`} onClick={() => setSelectedPlant(selectedPlant?.name === p.name ? null : p)}>
                      {p.emoji} {p.name} <span style={{ opacity: 0.6 }}>·{p.pointsPer}pt</span>
                    </span>
                  ))}
                </div>
                {selectedPlant && customPlants.some(p => p.name === selectedPlant.name) && (
                  <ServingPicker plant={selectedPlant} servingSize={servingSize} setServingSize={setServingSize} onAdd={() => addEntry(selectedPlant, servingSize)} />
                )}
              </div>
            )}

            {/* Today's log */}
            {todayLog.length > 0 && (
              <div>
                <p className="pp-body" style={{ fontSize: 13, color: "rgba(134,239,172,0.5)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Today's log</p>
                {todayLog.map((e) => (
                  <div key={e.id} className="pp-entry">
                    <span style={{ fontSize: 18, marginRight: 10 }}>{e.emoji}</span>
                    <span className="pp-body" style={{ flex: 1, fontSize: 14, color: "#e8f5e8" }}>{e.name}</span>
                    <span className="pp-body" style={{ fontSize: 14, color: "#4ade80", fontWeight: 600, marginRight: 10 }}>+{e.points}pts</span>
                    <button className="pp-remove" onClick={() => removeEntry(todayKey, e.id)}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div>
            {weekDays.slice().reverse().map((d) => {
              const dayLog = log[d] || [];
              const pts = dayLog.reduce((a, e) => a + e.points, 0);
              const uniq = new Set(dayLog.map(e => e.name.toLowerCase())).size;
              if (dayLog.length === 0 && !isToday(d)) return null;
              return (
                <div key={d} className="pp-card" style={{ padding: 20, marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: dayLog.length ? 12 : 0 }}>
                    <span className="pp-header" style={{ fontSize: 16, color: isToday(d) ? "#4ade80" : "#e8f5e8" }}>
                      {isToday(d) ? "Today" : new Date(d + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" })}
                    </span>
                    {dayLog.length > 0 && (
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <span className="pp-body" style={{ fontSize: 13, color: "#a3e635" }}>{uniq} unique</span>
                        <span className="pp-body" style={{ fontSize: 13, color: "#4ade80", fontWeight: 600 }}>{pts.toFixed(1)} pts</span>
                      </div>
                    )}
                  </div>
                  {dayLog.length === 0 && <p className="pp-body" style={{ fontSize: 13, color: "rgba(134,239,172,0.3)" }}>Nothing logged yet</p>}
                  {(() => {
                    const seen = new Set();
                    return dayLog.map((e) => {
                      const key = e.name.toLowerCase();
                      const isRepeat = seen.has(key);
                      seen.add(key);
                      return (
                        <div key={e.id} className="pp-entry">
                          <span style={{ fontSize: 16, marginRight: 8 }}>{e.emoji}</span>
                          <span className="pp-body" style={{ flex: 1, fontSize: 13, color: "#c8e6c8" }}>{e.name}</span>
                          {isRepeat && <span className="pp-body" style={{ fontSize: 10, color: "rgba(134,239,172,0.35)", marginRight: 8, border: "1px solid rgba(134,239,172,0.2)", borderRadius: 4, padding: "1px 5px" }}>repeat</span>}
                          <span className="pp-body" style={{ fontSize: 13, color: "#86efac", marginRight: 8 }}>+{e.points}pts</span>
                          <button className="pp-remove" onClick={() => removeEntry(d, e.id)}>✕</button>
                        </div>
                      );
                    });
                  })()}
                </div>
              );
            })}
            {weekDays.every((d) => (log[d] || []).length === 0) && (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <p style={{ fontSize: 40, marginBottom: 12 }}>🌱</p>
                <p className="pp-body" style={{ color: "rgba(134,239,172,0.4)" }}>No plants logged this week yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
