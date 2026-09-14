"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Copy,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Clock,
  AlertCircle,
  ListChecks,
  Users2,
  X,
} from "lucide-react";
import {
  QUESTIONS,
  TOTAL_QUESTIONS,
  KAKAO_CHANNEL_URL,
  runDiagnosis,
  getAnswerLabels,
  getSelectedMissedLabels,
  getToolLabels,
  type Answers,
  type QuestionDef,
  type ScoreTier,
} from "./logic";

const PRIMARY = "#E85D30";

const TITLE_STYLE: React.CSSProperties = {
  lineHeight: "1.32",
  letterSpacing: "-0.03em",
  wordBreak: "keep-all",
  textWrap: "balance",
};

const BODY_STYLE: React.CSSProperties = {
  lineHeight: "1.85",
  wordBreak: "keep-all",
};

const TIER_COLORS: Record<ScoreTier, { bg: string; text: string }> = {
  high: { bg: `${PRIMARY}15`, text: PRIMARY },
  mid: { bg: "#FDF3E2", text: "#B7862C" },
  low: { bg: "#F1F2F4", text: "#6B7280" },
};

type Step = "intro" | "quiz" | "result";

function ProgressBar({ current }: { current: number }) {
  const percent = Math.round((current / TOTAL_QUESTIONS) * 100);
  return (
    <div className="mb-7">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500">
          {current} / {TOTAL_QUESTIONS}
        </span>
        <span className="text-xs font-semibold" style={{ color: PRIMARY }}>
          {percent}%
        </span>
      </div>
      <div
        className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={TOTAL_QUESTIONS}
        aria-label={`진단 진행률 ${current} / ${TOTAL_QUESTIONS}`}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${percent}%`, backgroundColor: PRIMARY }}
        />
      </div>
    </div>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="flex items-center gap-2.5 w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all focus:outline-none focus-visible:ring-2"
      style={{
        borderColor: selected ? PRIMARY : "#E5E7EB",
        backgroundColor: selected ? `${PRIMARY}0D` : "#FFFFFF",
        color: selected ? "#171717" : "#4B5563",
        outlineColor: PRIMARY,
      }}
    >
      {selected ? (
        <CheckCircle2 size={18} style={{ color: PRIMARY, flexShrink: 0 }} />
      ) : (
        <Circle size={18} className="text-gray-300" style={{ flexShrink: 0 }} />
      )}
      <span style={{ wordBreak: "keep-all" }}>{label}</span>
    </button>
  );
}

export default function FlowCheckPage() {
  const [step, setStep] = useState<Step>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState<string | null>(null);
  const [showConsultant, setShowConsultant] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const question = QUESTIONS[qIndex];

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  }

  function toggleOption(q: QuestionDef, value: string) {
    setError(null);
    setAnswers((prev) => {
      const id = q.id;
      const current = prev[id] ?? [];
      if (!q.multi) {
        return { ...prev, [id]: [value] };
      }
      const exclusiveValue = q.exclusiveValue;
      if (exclusiveValue) {
        if (value === exclusiveValue) {
          return { ...prev, [id]: current.includes(exclusiveValue) ? [] : [exclusiveValue] };
        }
        const withoutExclusive = current.filter((v) => v !== exclusiveValue);
        const next = withoutExclusive.includes(value)
          ? withoutExclusive.filter((v) => v !== value)
          : [...withoutExclusive, value];
        return { ...prev, [id]: next };
      }
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [id]: next };
    });
  }

  function handleNext() {
    const selected = answers[question.id] ?? [];
    if (selected.length < question.minSelect) {
      setError("이 질문에 답변을 선택해주세요.");
      return;
    }
    setError(null);
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex((i) => i + 1);
    } else {
      setStep("result");
    }
  }

  function handleBack() {
    setError(null);
    if (qIndex === 0) {
      setStep("intro");
    } else {
      setQIndex((i) => i - 1);
    }
  }

  function handleRestart() {
    setAnswers({});
    setQIndex(0);
    setError(null);
    setShowConsultant(false);
    setStep("intro");
  }

  const diagnosis = step === "result" ? runDiagnosis(answers) : null;

  async function handleCopySummary() {
    if (!diagnosis) return;
    try {
      await navigator.clipboard.writeText(diagnosis.summaryText);
      showToast("결과 요약을 복사했습니다.");
    } catch {
      showToast("복사에 실패했습니다. 화면을 캡처해 전달해주세요.");
    }
  }

  async function handleKakaoStart() {
    if (diagnosis) {
      try {
        await navigator.clipboard.writeText(diagnosis.summaryText);
        showToast("결과 요약을 복사했습니다. 카카오톡 상담에 붙여넣어 주세요.");
      } catch {
        showToast("복사에 실패했지만 카카오톡 상담은 계속 진행할 수 있습니다.");
      }
    }
    window.open(KAKAO_CHANNEL_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="font-sans min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        {/* ─── Header ─── */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            OZ.K Lab 홈으로
          </Link>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: `${PRIMARY}18`, color: PRIMARY }}
          >
            OZ.K Flow Check
          </div>
        </div>

        {step === "intro" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" style={TITLE_STYLE}>
              3분 업무자동화 자가진단
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6" style={TITLE_STYLE}>
              우리 회사 업무,
              <br />
              <span style={{ color: PRIMARY }}>자동화가 먼저 필요한 단계</span>일까요?
            </h2>
            <p className="text-base text-gray-500 mb-10 max-w-md mx-auto" style={BODY_STYLE}>
              3분 진단으로 반복 업무, 누락 위험, 현재 업무 흐름을 확인하고
              <br />
              OZ.K Lab의 권장 도입 방향을 받아보세요.
            </p>

            <div className="grid gap-3 max-w-sm mx-auto mb-10 text-left">
              {[
                "개인정보·실제 고객 데이터 입력 없이 진행",
                "응답 기반의 참고용 진단 결과",
                "결과 확인 후 무료 15분 상담 가능",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <ShieldCheck size={16} style={{ color: PRIMARY, flexShrink: 0, marginTop: "2px" }} />
                  <span className="text-sm text-gray-600" style={BODY_STYLE}>
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setStep("quiz")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-white text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              3분 무료 진단 시작하기
              <ArrowRight size={17} />
            </button>
          </motion.div>
        )}

        {step === "quiz" && (
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <ProgressBar current={qIndex + 1} />

            <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1" style={TITLE_STYLE}>
                Q{question.no}. {question.title}
              </h2>
              {question.multi && (
                <p className="text-xs text-gray-400 mb-5">
                  복수 선택 가능 (해당 사항이 없으면 목록의 &lsquo;없음&rsquo;류 항목을 선택하세요)
                </p>
              )}
              {!question.multi && <div className="mb-5" />}

              <div className="grid sm:grid-cols-2 gap-3">
                {question.options.map((opt) => {
                  const selected = (answers[question.id] ?? []).includes(opt.value);
                  return (
                    <OptionButton
                      key={opt.value}
                      label={opt.label}
                      selected={selected}
                      onClick={() => toggleOption(question, opt.value)}
                    />
                  );
                })}
              </div>

              {error && (
                <p role="alert" aria-live="assertive" className="flex items-center gap-1.5 text-sm text-red-500 mt-4">
                  <AlertCircle size={15} />
                  {error}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-medium text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm"
              >
                <ArrowLeft size={15} />
                이전
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-medium text-white transition-opacity hover:opacity-90 text-sm"
                style={{ backgroundColor: PRIMARY }}
              >
                {qIndex === QUESTIONS.length - 1 ? "결과 보기" : "다음"}
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        )}

        {step === "result" && diagnosis && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* 추천 단계 — 결과 화면에서 가장 먼저·명확하게 보여줄 정보 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 mb-5">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: `${PRIMARY}18`, color: PRIMARY }}
              >
                현재 추천 단계
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" style={TITLE_STYLE}>
                {diagnosis.recommendation.headline}
              </h2>
              <p className="text-sm sm:text-base text-gray-600" style={BODY_STYLE}>
                {diagnosis.recommendation.body}
              </p>
            </div>

            {/* 업무 운영 부담도 — 추천 단계를 뒷받침하는 참고 지표 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-1.5 text-gray-400">
                  업무 운영 부담도
                </p>
                <div
                  className="text-3xl sm:text-4xl font-black text-gray-900"
                  aria-label={`업무 운영 부담도 ${diagnosis.breakdown.total}점, 100점 만점 중 ${diagnosis.label.grade}`}
                >
                  {diagnosis.breakdown.total}
                  <span className="text-base font-bold text-gray-300">/100</span>
                </div>
              </div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap"
                style={{ backgroundColor: TIER_COLORS[diagnosis.label.tier].bg, color: TIER_COLORS[diagnosis.label.tier].text }}
              >
                {diagnosis.label.grade}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              {/* 병목 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: PRIMARY }}>
                  현재 가장 큰 병목
                </p>
                <ul className="space-y-2">
                  {diagnosis.bottlenecks.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700" style={BODY_STYLE}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: PRIMARY }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 절감 시간 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: PRIMARY }}>
                  예상 절감 시간
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={18} style={{ color: PRIMARY }} />
                  <span className="text-lg font-bold text-gray-900">{diagnosis.timeSaving}</span>
                </div>
                <p className="text-xs text-gray-400" style={{ lineHeight: "1.7" }}>
                  위 결과는 입력한 응답을 기준으로 한 참고용 예상치입니다. 실제 절감 효과와 구축 범위는 업무 흐름 확인 후 달라질 수 있습니다.
                </p>
              </div>
            </div>

            {/* 1차 적용 범위 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-7 mb-5">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: PRIMARY }}>
                추천 1차 적용 범위
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {diagnosis.firstPhaseScope.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700" style={BODY_STYLE}>
                    <CheckCircle2 size={15} style={{ color: PRIMARY, flexShrink: 0, marginTop: "2px" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 무료 15분 확인 내용 */}
            <div className="rounded-2xl p-6 sm:p-7 mb-8" style={{ backgroundColor: "#F8F9FA" }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: PRIMARY }}>
                무료 15분에서 확인할 내용
              </p>
              <ul className="space-y-2">
                {diagnosis.consultationChecklist.map((item, i) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700" style={BODY_STYLE}>
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `${PRIMARY}18`, color: PRIMARY }}
                    >
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleKakaoStart}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: PRIMARY }}
                >
                  <MessageCircle size={16} />
                  내 결과로 15분 확인하기 · 카카오톡 상담 시작
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm"
                >
                  <Copy size={15} />
                  결과 요약 복사
                </button>
                <button
                  type="button"
                  onClick={() => setShowConsultant(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm"
                >
                  <ListChecks size={15} />
                  상담자용 요약 미리보기
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-gray-500 hover:bg-gray-50 transition-all text-sm"
                >
                  <RefreshCw size={15} />
                  결과 다시 하기
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* ─── 상담자용 요약 미리보기 ─── */}
      {showConsultant && diagnosis && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="상담자용 결과 요약 미리보기"
          onClick={() => setShowConsultant(false)}
        >
          <div
            className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Users2 size={18} style={{ color: PRIMARY }} />
                상담자용 결과 요약
              </h3>
              <button
                type="button"
                onClick={() => setShowConsultant(false)}
                aria-label="닫기"
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="text-xs text-gray-500 rounded-xl p-3.5 mb-5"
              style={{ backgroundColor: "#F8F9FA", lineHeight: "1.7" }}
            >
              데모용 상담자 요약입니다. 현재 브라우저에서 입력한 값만 사용하며 서버에 저장되지 않습니다.
            </div>

            <dl className="space-y-4 text-sm">
              <SummaryRow label="업무 운영 부담도" value={`${diagnosis.breakdown.total}점 · ${diagnosis.label.grade}`} />
              <SummaryRow label="현재 추천 단계" value={diagnosis.recommendation.headline} />
              <SummaryRow
                label="고객의 현재 관리 도구"
                value={getToolLabels(answers).join(", ") || "선택 없음"}
              />
              <SummaryRow
                label="업무 전달 경로"
                value={getAnswerLabels("channelCount", answers).join(", ") || "-"}
              />
              <SummaryRow
                label="주간 수기 정리 시간"
                value={getAnswerLabels("weeklyHours", answers).join(", ") || "-"}
              />
              <SummaryRow
                label="선택한 누락 항목"
                value={getSelectedMissedLabels(answers).join(", ") || "선택 없음"}
              />
              <SummaryRow
                label="S/N 이력 필요도"
                value={getAnswerLabels("snNeed", answers).join(", ") || "-"}
              />
              <SummaryRow
                label="고도화 요구"
                value={getAnswerLabels("advancedNeeds", answers).join(", ") || "-"}
              />
            </dl>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: PRIMARY }}>
                무료 15분 상담 확인 질문
              </p>
              <ol className="space-y-2 list-decimal list-inside">
                {diagnosis.consultantQuestions.map((q) => (
                  <li key={q} className="text-sm text-gray-700" style={BODY_STYLE}>
                    {q}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* ─── Toast ─── */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg max-w-[90vw] text-center"
        >
          {toast}
        </div>
      )}
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-semibold text-gray-400">{label}</dt>
      <dd className="text-gray-800" style={{ wordBreak: "keep-all" }}>
        {value}
      </dd>
    </div>
  );
}
