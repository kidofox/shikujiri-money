"use client";

import { useState, useEffect } from "react";

// ============================================================
// 型定義
// ============================================================
type Step = "intro" | "q1" | "q2" | "q3" | "input" | "result";

interface FormData {
  dream: string;
  emotionalCheck: string;
  totalDebt: string;
  monthlyPayment: string;
  loanCount: string;
}

// ============================================================
// 定数
// ============================================================
const DREAMS = [
  { id: "sleep", emoji: "🌙", label: "朝まで\nぐっすり眠りたい" },
  { id: "family", emoji: "👨‍👩‍👧", label: "家族と\n笑って過ごしたい" },
  { id: "job", emoji: "💼", label: "仕事に\n集中したい" },
  { id: "self", emoji: "🌱", label: "自分のことを\n好きになりたい" },
];

const EMOTIONAL_CHECKS = [
  { id: "always", label: "毎日考えて、もう限界" },
  { id: "often", label: "給料日前後に特につらい" },
  { id: "sometimes", label: "たまに不安になる" },
  { id: "fine", label: "返済はできているが将来が不安" },
];

// ============================================================
// 減額シミュレーション計算
// ============================================================
function calcReduction(totalDebt: number, loanCount: number) {
  // 任意整理：利息カット＋過払い想定（概算）
  const interestRate = 0.18;
  const years = 5;
  const totalInterest = totalDebt * interestRate * years;
  const arbitration = Math.round(totalInterest * 0.7 / 10000) * 10000;

  // 個人再生：借金総額の1/5〜1/3が目安
  const reorganization = Math.round((totalDebt * 0.25) / 10000) * 10000;

  // 自己破産：原則全額免除
  const bankruptcy = totalDebt;

  return { arbitration, reorganization, bankruptcy };
}

// ============================================================
// メインコンポーネント
// ============================================================
export default function Page() {
  const [step, setStep] = useState<Step>("intro");
  const [form, setForm] = useState<FormData>({
    dream: "",
    emotionalCheck: "",
    totalDebt: "",
    monthlyPayment: "",
    loanCount: "",
  });
  const [animating, setAnimating] = useState(false);
  const [time, setTime] = useState("");

  // 現在時刻（深夜帯の共感演出）
  useEffect(() => {
    const update = () => {
      const h = new Date().getHours();
      const m = new Date().getMinutes();
      setTime(`${h}:${String(m).padStart(2, "0")}`);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  const isLateNight = () => {
    const h = new Date().getHours();
    return h >= 22 || h < 6;
  };

  const goTo = (next: Step) => {
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const totalDebtNum = parseInt(form.totalDebt.replace(/,/g, "")) || 0;
  const loanCountNum = parseInt(form.loanCount) || 1;
  const reduction = calcReduction(totalDebtNum, loanCountNum);

  // ============================================================
  // レンダリング
  // ============================================================
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0d1117 0%, #161b27 50%, #0d1117 100%)",
        fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif",
        color: "#e8eaf0",
        overflowX: "hidden",
      }}
    >
      {/* 背景の静かな光 */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(99,120,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "480px",
          margin: "0 auto",
          padding: "0 20px 80px",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "translateY(0)",
        }}
      >
        {/* ヘッダー */}
        <header style={{ padding: "24px 0 8px", textAlign: "center" }}>
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "#6b7280",
              textTransform: "uppercase",
            }}
          >
            shikujiri-money.com
          </span>
          {isLateNight() && (
            <p style={{ fontSize: "12px", color: "#4b5563", marginTop: "4px" }}>
              {time} — こんな時間まで、お疲れ様です
            </p>
          )}
        </header>

        {/* PR表記 */}
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "10px",
              color: "#6b7280",
              border: "1px solid #374151",
              borderRadius: "4px",
              padding: "2px 8px",
              letterSpacing: "0.05em",
            }}
          >
            PR ・ 本サービスはアフィリエイト広告を含みます
          </span>
        </div>

        {/* ========== INTRO ========== */}
        {step === "intro" && (
          <div>
            <div style={{ padding: "48px 0 32px", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "24px" }}>🌒</div>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  lineHeight: "1.5",
                  letterSpacing: "0.02em",
                  marginBottom: "16px",
                  color: "#f1f5f9",
                }}
              >
                その借金、
                <br />
                <span style={{ color: "#818cf8" }}>国の制度</span>で
                <br />
                減らせるかもしれない。
              </h1>
              <p
                style={{
                  fontSize: "15px",
                  color: "#9ca3af",
                  lineHeight: "1.8",
                  marginBottom: "8px",
                }}
              >
                自己破産や債務整理は「逃げ」ではありません。
                <br />
                国が用意した、人生を立て直すための制度です。
              </p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "32px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#9ca3af",
                  lineHeight: "1.9",
                  textAlign: "center",
                }}
              >
                「誰にも言えない」「自分が悪い」
                <br />
                そう思って一人で抱えていませんか。
                <br />
                <br />
                <span style={{ color: "#c7d2fe" }}>
                  あなたが責められるべき理由は、ひとつもありません。
                </span>
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "24px",
                marginBottom: "32px",
              }}
            >
              {[
                { num: "3分", label: "診断時間" },
                { num: "無料", label: "費用" },
                { num: "匿名", label: "名前不要" },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#818cf8",
                    }}
                  >
                    {item.num}
                  </div>
                  <div style={{ fontSize: "11px", color: "#6b7280" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => goTo("q1")}
              style={{
                width: "100%",
                padding: "18px",
                background:
