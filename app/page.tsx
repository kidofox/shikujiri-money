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
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none",
                borderRadius: "14px",
                color: "#fff",
                fontSize: "17px",
                fontWeight: "700",
                cursor: "pointer",
                letterSpacing: "0.04em",
                boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
              }}
            >
              無料で診断してみる →
            </button>
            <p
              style={{
                textAlign: "center",
                fontSize: "12px",
                color: "#4b5563",
                marginTop: "12px",
              }}
            >
              個人情報の入力は不要です
            </p>
          </div>
        )}

        {/* ========== Q1: 夢・希望 ========== */}
        {step === "q1" && (
          <div>
            <StepIndicator current={1} total={3} />
            <div style={{ padding: "32px 0 24px" }}>
              <p style={{ fontSize: "13px", color: "#818cf8", marginBottom: "8px" }}>
                まず、聞かせてください
              </p>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  lineHeight: "1.6",
                  color: "#f1f5f9",
                }}
              >
                借金がなくなったら、
                <br />
                一番したいことは何ですか？
              </h2>
              <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "8px" }}>
                正解はありません。今、心に浮かんだことを。
              </p>
            </div>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
            >
              {DREAMS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setForm((f) => ({ ...f, dream: d.id }));
                    goTo("q2");
                  }}
                  style={{
                    padding: "20px 12px",
                    background:
                      form.dream === d.id
                        ? "rgba(99,102,241,0.2)"
                        : "rgba(255,255,255,0.03)",
                    border:
                      form.dream === d.id
                        ? "1.5px solid #818cf8"
                        : "1.5px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    color: "#e8eaf0",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "1.6",
                    cursor: "pointer",
                    whiteSpace: "pre-line",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>{d.emoji}</div>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========== Q2: 感情チェック ========== */}
        {step === "q2" && (
          <div>
            <StepIndicator current={2} total={3} />
            <div style={{ padding: "32px 0 24px" }}>
              <p style={{ fontSize: "13px", color: "#818cf8", marginBottom: "8px" }}>
                あなたのことをもう少し教えてください
              </p>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  lineHeight: "1.6",
                  color: "#f1f5f9",
                }}
              >
                今の気持ちに近いのは
                <br />
                どれですか？
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {EMOTIONAL_CHECKS.map((e) => (
                <button
                  key={e.id}
                  onClick={() => {
                    setForm((f) => ({ ...f, emotionalCheck: e.id }));
                    goTo("q3");
                  }}
                  style={{
                    padding: "16px 20px",
                    background:
                      form.emotionalCheck === e.id
                        ? "rgba(99,102,241,0.15)"
                        : "rgba(255,255,255,0.03)",
                    border:
                      form.emotionalCheck === e.id
                        ? "1.5px solid #818cf8"
                        : "1.5px solid rgba(255,255,255,0.07)",
                    borderRadius: "12px",
                    color: "#d1d5db",
                    fontSize: "15px",
                    fontWeight: "500",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========== Q3: 入力フォーム ========== */}
        {step === "q3" && (
          <div>
            <StepIndicator current={3} total={3} />
            <div style={{ padding: "32px 0 24px" }}>
              <p style={{ fontSize: "13px", color: "#818cf8", marginBottom: "8px" }}>
                最後に、3つだけ数字を教えてください
              </p>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  lineHeight: "1.6",
                  color: "#f1f5f9",
                }}
              >
                どのくらい
                <br />
                減らせるか確認します
              </h2>
              <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "8px" }}>
                概算で構いません。目安を知るだけで大丈夫です。
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <InputField
                label="借金の総額（おおよそ）"
                placeholder="例：150"
                unit="万円"
                value={form.totalDebt}
                onChange={(v) => setForm((f) => ({ ...f, totalDebt: v }))}
                hint="複数あれば合計で"
              />
              <InputField
                label="月々の返済額（合計）"
                placeholder="例：3"
                unit="万円"
                value={form.monthlyPayment}
                onChange={(v) => setForm((f) => ({ ...f, monthlyPayment: v }))}
                hint="最低返済額の合計でOK"
              />
              <InputField
                label="借入先の件数"
                placeholder="例：3"
                unit="件"
                value={form.loanCount}
                onChange={(v) => setForm((f) => ({ ...f, loanCount: v }))}
                hint="カード・消費者金融など"
              />
            </div>

            <button
              onClick={() => {
                if (form.totalDebt) goTo("result");
              }}
              disabled={!form.totalDebt}
              style={{
                width: "100%",
                marginTop: "28px",
                padding: "18px",
                background: form.totalDebt
                  ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                  : "rgba(255,255,255,0.06)",
                border: "none",
                borderRadius: "14px",
                color: form.totalDebt ? "#fff" : "#4b5563",
                fontSize: "17px",
                fontWeight: "700",
                cursor: form.totalDebt ? "pointer" : "not-allowed",
                letterSpacing: "0.04em",
                boxShadow: form.totalDebt
                  ? "0 4px 24px rgba(99,102,241,0.35)"
                  : "none",
                transition: "all 0.3s",
              }}
            >
              減額できる金額を確認する →
            </button>
          </div>
        )}

        {/* ========== RESULT ========== */}
        {step === "result" && (
          <div>
            {/* 感情に寄り添うメッセージ */}
            <div style={{ padding: "32px 0 24px", textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>✨</div>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#f1f5f9",
                  lineHeight: "1.6",
                  marginBottom: "12px",
                }}
              >
                あなたは、
                <br />
                <span style={{ color: "#a5b4fc" }}>一人で十分すぎるほど</span>
                <br />
                頑張ってきました。
              </h2>
              <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: "1.8" }}>
                {form.emotionalCheck === "always"
                  ? "毎日不安を抱えながら、ここまで来たんですね。本当に、お疲れ様でした。"
                  : form.emotionalCheck === "often"
                  ? "給料日前後の憂鬱、ずっと続いていたんですね。そのつらさは本物です。"
                  : "先のことを考えると不安になる気持ち、とてもよくわかります。"}
              </p>
            </div>

            {/* 減額シミュレーション結果 */}
            <div
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.25)",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "#818cf8",
                  marginBottom: "16px",
                  letterSpacing: "0.05em",
                }}
              >
                📊 あなたの場合、3つの選択肢があります
              </p>

              {[
                {
                  label: "任意整理",
                  description: "利息をカット、元本を分割返済",
                  amount: `約 ${Math.round(reduction.arbitration / 10000)}万円`,
                  unit: "の利息が減る可能性",
                  color: "#34d399",
                  note: "仕事・財産への影響が最も少ない",
                },
                {
                  label: "個人再生",
                  description: "借金を最大で5分の1まで圧縮",
                  amount: `約 ${Math.round(reduction.reorganization / 10000)}万円`,
                  unit: "まで減額できる可能性",
                  color: "#60a5fa",
                  note: "住宅ローンを残したまま整理も可能",
                },
                {
                  label: "自己破産",
                  description: "借金を原則すべて免除",
                  amount: `約 ${Math.round(reduction.bankruptcy / 10000)}万円`,
                  unit: "全額免除の可能性",
                  color: "#f472b6",
                  note: "新しいスタートを切るための制度",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px",
                    padding: "16px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "12px",
                          fontWeight: "700",
                          color: item.color,
                          border: `1px solid ${item.color}`,
                          borderRadius: "6px",
                          padding: "2px 8px",
                          marginBottom: "6px",
                        }}
                      >
                        {item.label}
                      </span>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#9ca3af",
                          marginBottom: "4px",
                        }}
                      >
                        {item.description}
                      </p>
                      <p style={{ fontSize: "11px", color: "#6b7280" }}>
                        💡 {item.note}
                      </p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "8px" }}>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: item.color,
                        }}
                      >
                        {item.amount}
                      </div>
                      <div style={{ fontSize: "11px", color: "#6b7280" }}>
                        {item.unit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <p
                style={{
                  fontSize: "11px",
                  color: "#4b5563",
                  textAlign: "center",
                  marginTop: "12px",
                  lineHeight: "1.6",
                }}
              >
                ※上記は概算です。実際の金額は弁護士・司法書士への無料相談でご確認ください。
              </p>
            </div>

            {/* 心理的ハードルを下げるメッセージ */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "24px",
              }}
            >
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: "700",
                  color: "#f1f5f9",
                  marginBottom: "12px",
                  lineHeight: "1.6",
                }}
              >
                「相談」は、もう決断でも覚悟でもありません。
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#9ca3af",
                  lineHeight: "1.9",
                  marginBottom: "12px",
                }}
              >
                債務整理の相談は、毎年数十万人が利用しています。
                あなたが今夜感じている「この状況から抜け出したい」という気持ち——それを専門家に伝えるだけで、
                具体的な選択肢が見えてきます。
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#a5b4fc",
                  lineHeight: "1.9",
                }}
              >
                {form.dream === "sleep" && "「朝まで眠れる日」は、相談の一歩から始まります。"}
                {form.dream === "family" && "「家族と笑える日」を取り戻すために、法律は存在しています。"}
                {form.dream === "job" && "「仕事に集中できる日々」は、あなたが思うより近いかもしれません。"}
                {form.dream === "self" && "「自分を好きになれる日」を、専門家と一緒に設計できます。"}
                {!form.dream && "その「もう少しだけ楽になりたい」という気持ちが、第一歩です。"}
              </p>
            </div>

            {/* 不安解消FAQ */}
            <div style={{ marginBottom: "28px" }}>
              <p
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  marginBottom: "12px",
                  letterSpacing: "0.05em",
                }}
              >
                よくある不安
              </p>
              {[
                {
                  q: "家族や職場にバレますか？",
                  a: "官報に掲載されますが、ほとんどの方は日常生活で知られることはありません。弁護士から職場に連絡が行くことはありません。",
                },
                {
                  q: "財産はすべて失いますか？",
                  a: "任意整理・個人再生では財産を手放す必要はありません。自己破産でも生活に必要な財産（99万円以下の現金等）は手元に残ります。",
                },
                {
                  q: "相談したら依頼しないといけませんか？",
                  a: "初回相談は無料・無義務です。話を聞くだけで終わって構いません。",
                },
              ].map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "20px",
                padding: "28px 24px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#f1f5f9",
                  lineHeight: "1.6",
                  marginBottom: "8px",
                }}
              >
                今夜が、変わる夜になる。
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                  marginBottom: "24px",
                  lineHeight: "1.7",
                }}
              >
                弁護士・司法書士への無料相談（PR）
                <br />
                秘密厳守・名前だけで相談可能
              </p>

              <a
                href="#affiliate-link"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "18px",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none",
                  borderRadius: "14px",
                  color: "#fff",
                  fontSize: "17px",
                  fontWeight: "700",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  boxShadow: "0 4px 28px rgba(99,102,241,0.45)",
                  boxSizing: "border-box",
                }}
              >
                無料で専門家に相談してみる →
              </a>

              <p
                style={{
                  fontSize: "11px",
                  color: "#4b5563",
                  marginTop: "12px",
                  lineHeight: "1.6",
                }}
              >
                ※本サービスはアフィリエイト広告です（PR）。
                <br />
                相談・診断はすべて提携の弁護士・司法書士が対応します。
                <br />
                当サイトは非弁行為に該当する法律相談・法律事務は行いません。
              </p>
            </div>

            {/* 緊急サポートライン */}
            <div
              style={{
                marginTop: "24px",
                padding: "16px 20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  lineHeight: "1.8",
                }}
              >
                💙 もし今、死にたい気持ちがあるなら
                <br />
                <a
                  href="tel:0120783556"
                  style={{
                    color: "#818cf8",
                    fontWeight: "700",
                    textDecoration: "none",
                  }}
                >
                  よりそいホットライン：0120-279-338（24時間）
                </a>
                <br />
                <a
                  href="tel:0570064556"
                  style={{
                    color: "#818cf8",
                    textDecoration: "none",
                  }}
                >
                  いのちの電話：0570-783-556
                </a>
                <br />
                <span style={{ fontSize: "11px", color: "#4b5563" }}>
                  あなたの命は、借金よりずっと大切です。
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// サブコンポーネント
// ============================================================

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        padding: "20px 0 0",
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === current ? "28px" : "8px",
            height: "8px",
            borderRadius: "4px",
            background: i + 1 <= current ? "#818cf8" : "rgba(255,255,255,0.1)",
            transition: "all 0.3s",
          }}
        />
      ))}
    </div>
  );
}

function InputField({
  label,
  placeholder,
  unit,
  value,
  onChange,
  hint,
}: {
  label: string;
  placeholder: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "500",
          color: "#d1d5db",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>
      {hint && (
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            marginBottom: "6px",
          }}
        >
          {hint}
        </p>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            padding: "14px 16px",
            background: "rgba(255,255,255,0.05)",
            border: "1.5px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            color: "#f1f5f9",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <span style={{ fontSize: "14px", color: "#9ca3af", flexShrink: 0 }}>
          {unit}
        </span>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        paddingBottom: "12px",
        marginBottom: "12px",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          color: "#d1d5db",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          textAlign: "left",
          padding: "4px 0",
        }}
      >
        <span>{q}</span>
        <span
          style={{
            fontSize: "18px",
            color: "#818cf8",
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "none",
            flexShrink: 0,
            marginLeft: "8px",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p
          style={{
            fontSize: "13px",
            color: "#9ca3af",
            lineHeight: "1.8",
            marginTop: "8px",
            paddingRight: "8px",
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}
