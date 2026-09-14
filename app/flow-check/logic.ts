/**
 * OZ.K Flow Check — 점수·판정·결과 문구 생성 로직 (순수 함수)
 * 외부 API/LLM 호출 없음. 모든 계산은 사용자가 선택한 answers만으로 결정된다.
 */

export type QuestionId =
  | "teamSize"
  | "monthlyVolume"
  | "tools"
  | "channelCount"
  | "weeklyHours"
  | "missedItems"
  | "snNeed"
  | "standardization"
  | "advancedNeeds";

export type QuestionOption = {
  value: string;
  label: string;
};

export type QuestionDef = {
  id: QuestionId;
  no: number;
  title: string;
  multi: boolean;
  /** 최소 선택 개수. 단일 선택은 1, 복수 선택도 배타 옵션이 있어 항상 1 */
  minSelect: number;
  options: QuestionOption[];
  /** 복수 선택 문항에서 다른 선택지와 함께 고를 수 없는 "해당 없음"류 옵션의 값 */
  exclusiveValue?: string;
};

export type Answers = Partial<Record<QuestionId, string[]>>;

export const QUESTIONS: QuestionDef[] = [
  {
    id: "teamSize",
    no: 1,
    title: "운영 팀 인원",
    multi: false,
    minSelect: 1,
    options: [
      { value: "1-2", label: "1~2명" },
      { value: "3-5", label: "3~5명" },
      { value: "6-15", label: "6~15명" },
      { value: "16+", label: "16명 이상" },
    ],
  },
  {
    id: "monthlyVolume",
    no: 2,
    title: "월 평균 처리 업무 건수",
    multi: false,
    minSelect: 1,
    options: [
      { value: "under30", label: "30건 미만" },
      { value: "30-99", label: "30~99건" },
      { value: "100-299", label: "100~299건" },
      { value: "300+", label: "300건 이상" },
    ],
  },
  {
    id: "tools",
    no: 3,
    title: "현재 업무 관리 방식",
    multi: true,
    minSelect: 1,
    exclusiveValue: "noTool",
    options: [
      { value: "noTool", label: "별도 관리 도구 없이 전화·카카오톡·기억에 의존합니다" },
      { value: "excel", label: "엑셀" },
      { value: "sheets", label: "구글시트" },
      { value: "kakao", label: "카카오톡" },
      { value: "callText", label: "전화·문자" },
      { value: "email", label: "이메일" },
      { value: "erp", label: "ERP 또는 별도 시스템" },
    ],
  },
  {
    id: "channelCount",
    no: 4,
    title: "접수·업무 전달 경로 수",
    multi: false,
    minSelect: 1,
    options: [
      { value: "1", label: "한 곳에서만 관리" },
      { value: "2", label: "2곳" },
      { value: "3", label: "3곳" },
      { value: "4+", label: "4곳 이상" },
    ],
  },
  {
    id: "weeklyHours",
    no: 5,
    title: "매주 상태 확인·보고서 정리에 드는 시간",
    multi: false,
    minSelect: 1,
    options: [
      { value: "under1", label: "1시간 미만" },
      { value: "1-3", label: "1~3시간" },
      { value: "3-6", label: "3~6시간" },
      { value: "6+", label: "6시간 이상" },
    ],
  },
  {
    id: "missedItems",
    no: 6,
    title: "자주 발생하는 누락 또는 재작업",
    multi: true,
    minSelect: 1,
    exclusiveValue: "none",
    options: [
      { value: "none", label: "특별히 없음" },
      { value: "assignee", label: "담당자 배정 누락" },
      { value: "customerNotice", label: "고객 안내 누락" },
      { value: "payment", label: "비용·입금 확인 누락" },
      { value: "schedule", label: "발송·방문 일정 누락" },
      { value: "tracking", label: "미완료 업무 추적 어려움" },
      { value: "weeklyReport", label: "주간 보고 수기 집계" },
    ],
  },
  {
    id: "snNeed",
    no: 7,
    title: "S/N 또는 장비·작업 이력 확인 필요도",
    multi: false,
    minSelect: 1,
    options: [
      { value: "none", label: "필요 없음" },
      { value: "sometimes", label: "가끔 필요" },
      { value: "often", label: "자주 필요" },
      { value: "required", label: "업무상 필수" },
    ],
  },
  {
    id: "standardization",
    no: 8,
    title: "업무 상태·처리 단계의 표준화 수준",
    multi: false,
    minSelect: 1,
    options: [
      { value: "varies", label: "담당자마다 방식이 다름" },
      { value: "rough", label: "대략적인 기준만 있음" },
      { value: "mostly", label: "대부분 동일한 단계로 관리됨" },
      { value: "clear", label: "명확한 상태값과 기준이 있음" },
    ],
  },
  {
    id: "advancedNeeds",
    no: 9,
    title: "도입 첫 단계부터 필요한 고도화 요구",
    multi: true,
    minSelect: 1,
    exclusiveValue: "none",
    options: [
      { value: "none", label: "특별히 없음" },
      { value: "fileManagement", label: "사진·PDF 파일 관리" },
      { value: "erpIntegration", label: "ERP 또는 외부 시스템 연동" },
      { value: "autoMessage", label: "자동 메시지 발송" },
      { value: "permission", label: "지점·팀별 권한 관리" },
      { value: "sensitiveData", label: "개인정보 또는 민감정보 처리" },
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

// ─── 점수 계산 ───

const VOLUME_SCORE: Record<string, number> = {
  under30: 3,
  "30-99": 8,
  "100-299": 14,
  "300+": 20,
};

const HOURS_SCORE: Record<string, number> = {
  under1: 3,
  "1-3": 12,
  "3-6": 22,
  "6+": 30,
};

const CHANNEL_SCORE: Record<string, number> = {
  "1": 3,
  "2": 8,
  "3": 12,
  "4+": 15,
};

const SN_SCORE: Record<string, number> = {
  none: 0,
  sometimes: 7,
  often: 12,
  required: 15,
};

function missedScore(count: number): number {
  if (count <= 0) return 0;
  if (count === 1) return 8;
  if (count === 2) return 14;
  return 20;
}

/** Q6 선택 개수. "특별히 없음"(배타 옵션)만 선택된 경우는 0개로 취급한다. */
function getMissedCount(answers: Answers): number {
  const items = answers.missedItems ?? [];
  if (items.length === 1 && items[0] === "none") return 0;
  return items.length;
}

export type ScoreBreakdown = {
  volume: number;
  hours: number;
  channel: number;
  missed: number;
  sn: number;
  total: number;
};

export function calculateScore(answers: Answers): ScoreBreakdown {
  const volume = VOLUME_SCORE[answers.monthlyVolume?.[0] ?? ""] ?? 0;
  const hours = HOURS_SCORE[answers.weeklyHours?.[0] ?? ""] ?? 0;
  const channel = CHANNEL_SCORE[answers.channelCount?.[0] ?? ""] ?? 0;
  const missed = missedScore(getMissedCount(answers));
  const sn = SN_SCORE[answers.snNeed?.[0] ?? ""] ?? 0;
  return { volume, hours, channel, missed, sn, total: volume + hours + channel + missed + sn };
}

export type ScoreTier = "high" | "mid" | "low" | "base";

export function getScoreLabel(total: number): { grade: string; tier: ScoreTier } {
  if (total >= 80) return { grade: "자동화 우선 검토", tier: "high" };
  if (total >= 60) return { grade: "자동화 도입 권장", tier: "mid" };
  if (total >= 40) return { grade: "선택적 개선 검토", tier: "low" };
  return { grade: "업무 표준화·기록 정리 우선", tier: "base" };
}

// ─── 추천 도입 방향 ───

export type RecommendationType = "starter" | "custom" | "standardize" | "diagnostic";

export type RecommendationResult = {
  type: RecommendationType;
  headline: string;
  body: string;
};

const STANDARDIZATION_ORDER: Record<string, number> = {
  varies: 1,
  rough: 2,
  mostly: 3,
  clear: 4,
};

export function getRecommendation(answers: Answers, total: number): RecommendationResult {
  const standardization = answers.standardization?.[0] ?? "";
  const tools = answers.tools ?? [];
  const advanced = answers.advancedNeeds ?? [];
  const advancedExtra = advanced.filter((v) => v !== "none");
  const stdOrder = STANDARDIZATION_ORDER[standardization] ?? 0;
  const hasNoTool = tools.length === 1 && tools[0] === "noTool";

  // C. 업무 표준화 우선 — 가장 먼저 확인 (기초가 부족하면 과도한 자동화 권유 금지)
  if (total <= 39 || standardization === "varies" || hasNoTool) {
    return {
      type: "standardize",
      headline: "업무 표준화가 먼저 필요합니다.",
      body: "지금은 프로그램 도입보다 업무 상태와 기록 기준을 먼저 정리하는 단계입니다. OZ.K Lab은 우선순위와 기본 관리 구조부터 제안드릴 수 있습니다.",
    };
  }

  // A. Service Flow Starter 권장
  const hasBasicTool = tools.includes("excel") || tools.includes("sheets");
  const onlyNoAdvanced = advanced.length === 1 && advanced[0] === "none";
  if (total >= 60 && stdOrder >= 2 && hasBasicTool && onlyNoAdvanced) {
    return {
      type: "starter",
      headline: "Service Flow Starter 도입을 검토해 보세요.",
      body: "현재 업무 흐름을 크게 바꾸지 않고 접수·작업 현황·이력·고객 안내·주간 마감을 먼저 정리할 수 있습니다.",
    };
  }

  // B. 맞춤 구축 설계 진단 권장
  if (total >= 60 && advancedExtra.length > 0) {
    return {
      type: "custom",
      headline: "맞춤 구축 설계 진단을 권장합니다.",
      body: "업무 자동화 필요도는 높지만, 표준 Starter보다 맞춤 설계가 필요한 구조입니다. 무료 결과 확인 후 유료 설계 진단을 권장합니다.",
    };
  }

  // D. 유료 설계 진단 권장 (A/B/C에 명확히 속하지 않는 경우)
  return {
    type: "diagnostic",
    headline: "설계 진단으로 다음 단계를 확인하세요.",
    body: "자동화 가능성은 있으나, 현재 업무 구조와 데이터 준비 상태를 1회 더 확인하는 것이 좋습니다. 무료 15분 결과 확인 후 설계 진단 여부를 결정하세요.",
  };
}

// ─── 병목 ───

const MISSED_LABELS: Record<string, string> = {
  assignee: "담당자 배정 누락",
  customerNotice: "고객 안내 누락",
  payment: "비용·입금 확인 누락",
  schedule: "발송·방문 일정 누락",
  tracking: "미완료 업무 추적 어려움",
  weeklyReport: "주간 보고 수기 집계",
};

const FALLBACK_BOTTLENECKS = ["업무 전달 경로 분산", "수기 상태 확인", "이력 검색 지연", "주간 보고 수기 집계"];

export function getBottlenecks(answers: Answers): string[] {
  const selected = (answers.missedItems ?? [])
    .map((v) => MISSED_LABELS[v])
    .filter((v): v is string => Boolean(v));
  const result = [...selected];
  for (const fallback of FALLBACK_BOTTLENECKS) {
    if (result.length >= 3) break;
    if (!result.includes(fallback)) result.push(fallback);
  }
  return result.slice(0, 3);
}

// ─── 예상 절감 시간 ───

const TIME_SAVING: Record<string, string> = {
  under1: "월 1~3시간",
  "1-3": "월 3~6시간",
  "3-6": "월 6~12시간",
  "6+": "월 12시간 이상",
};

export function getTimeSavingRange(answers: Answers): string {
  return TIME_SAVING[answers.weeklyHours?.[0] ?? ""] ?? "월 1~3시간";
}

// ─── 추천 1차 적용 범위 ───

export const STARTER_SCOPE = [
  "접수·작업 현황",
  "S/N·장비·작업 이력",
  "고객 안내문 표준화",
  "미완료 업무 관리",
  "주간 마감 보고",
];

export function getFirstPhaseScope(type: RecommendationType, answers: Answers): string[] {
  if (type === "starter") return STARTER_SCOPE;

  if (type === "custom") {
    const advanced = answers.advancedNeeds ?? [];
    const extra: string[] = [];
    if (advanced.includes("fileManagement")) extra.push("사진·PDF 첨부 관리");
    if (advanced.includes("erpIntegration")) extra.push("ERP·외부 시스템 연동 설계");
    if (advanced.includes("autoMessage")) extra.push("자동 안내 메시지 구조");
    if (advanced.includes("permission")) extra.push("지점·팀별 권한 구조");
    if (advanced.includes("sensitiveData")) extra.push("개인정보·민감정보 처리 방식");
    return ["접수·작업 현황", "고객 안내문 표준화", ...extra];
  }

  if (type === "standardize") {
    return ["업무 상태·처리 단계 기준 정리", "기록 도구 통일(엑셀·구글시트 기준)", "담당자별 처리 기준 통일"];
  }

  return ["현재 업무 흐름 재확인", "자동화 우선순위 데이터 정리", "설계 진단을 통한 구축 범위 확정"];
}

// ─── 무료 15분에서 확인할 내용 (고객용, 결과 화면) ───

export function getConsultationChecklist(type: RecommendationType): string[] {
  switch (type) {
    case "starter":
      return [
        "현재 엑셀·구글시트 구조로 Starter 적용이 가능한 범위",
        "우선 정리할 접수·이력·보고 흐름",
        "도입 후 예상 절감 시간 재확인",
      ];
    case "custom":
      return [
        "맞춤 설계가 필요한 구체적 범위",
        "ERP·파일·권한 등 요구사항 우선순위",
        "설계 진단 진행 범위와 절차",
      ];
    case "standardize":
      return [
        "현재 업무 상태 기준을 정리하는 방법",
        "기록 도구를 통일하는 우선순위",
        "표준화 이후 자동화 검토 시점",
      ];
    default:
      return [
        "현재 업무 구조와 데이터 준비 상태",
        "자동화 우선순위와 적용 범위",
        "설계 진단 진행 여부와 범위",
      ];
  }
}

// ─── 상담자용 요약 — 무료 15분 상담 확인 질문 (동적 3개) ───

const TOOL_LABELS: Record<string, string> = {
  noTool: "별도 관리 도구 없음(전화·카카오톡·기억 의존)",
  excel: "엑셀",
  sheets: "구글시트",
  kakao: "카카오톡",
  callText: "전화·문자",
  email: "이메일",
  erp: "ERP 또는 별도 시스템",
};

export function getToolLabels(answers: Answers): string[] {
  return (answers.tools ?? []).map((v) => TOOL_LABELS[v]).filter((v): v is string => Boolean(v));
}

/** 특정 문항에서 사용자가 선택한 옵션의 표시용 라벨 목록 */
export function getAnswerLabels(id: QuestionId, answers: Answers): string[] {
  const question = QUESTIONS.find((q) => q.id === id);
  if (!question) return [];
  const values = answers[id] ?? [];
  return values
    .map((v) => question.options.find((o) => o.value === v)?.label)
    .filter((v): v is string => Boolean(v));
}

/** 선택한 누락·재작업 항목 라벨 (fallback 보완 없이 실제 선택값만) */
export function getSelectedMissedLabels(answers: Answers): string[] {
  return (answers.missedItems ?? [])
    .map((v) => MISSED_LABELS[v])
    .filter((v): v is string => Boolean(v));
}

export function getConsultantQuestions(answers: Answers): string[] {
  const questions: string[] = [];

  const tools = answers.tools ?? [];
  const usesNoTool = tools.length === 1 && tools[0] === "noTool";
  if (usesNoTool) {
    questions.push("현재는 별도 관리 도구 없이 전화·카카오톡·기억에 의존하고 계신데, 가장 먼저 기록으로 남기고 싶은 업무는 무엇인가요?");
  } else {
    const toolLabels = getToolLabels(answers);
    const toolText = toolLabels.length > 0 ? toolLabels.join("·") : "현재 사용 중인 관리 도구";
    questions.push(`현재 사용 중인 ${toolText}의 항목·열 구조는 어떻게 되어 있나요?`);
  }

  const sn = answers.snNeed?.[0];
  if (sn === "often" || sn === "required") {
    questions.push("S/N 또는 장비·작업 이력을 업무 시작 전 반드시 확인해야 하나요?");
  } else {
    questions.push("업무 상태와 처리 단계는 어떤 기준으로 구분하고 계신가요?");
  }

  const bottlenecks = getBottlenecks(answers);
  const top = bottlenecks[0] ?? "업무 누락 및 재작업";
  questions.push(`${top}이(가) 가장 자주 발생하는 시점은 언제인가요?`);

  return questions;
}

// ─── 결과 요약 (클립보드 복사용 — 개인 연락처 미포함) ───

export function buildSummaryText(
  answers: Answers,
  breakdown: ScoreBreakdown,
  recommendation: RecommendationResult
): string {
  const label = getScoreLabel(breakdown.total);
  const bottlenecks = getBottlenecks(answers).join(", ");
  const timeSaving = getTimeSavingRange(answers);
  const scope = getFirstPhaseScope(recommendation.type, answers).join(", ");

  return [
    "OZ.K Flow Check 진단 결과",
    `자동화 우선도: ${breakdown.total}점 (${label.grade})`,
    `추천 도입 방향: ${recommendation.headline}`,
    `현재 가장 큰 병목: ${bottlenecks}`,
    `예상 절감 시간: ${timeSaving}`,
    `추천 1차 적용 범위: ${scope}`,
    "※ 위 결과는 입력한 응답을 기준으로 한 참고용 예상치이며, 실제 절감 효과와 구축 범위는 업무 흐름 확인 후 달라질 수 있습니다.",
  ].join("\n");
}

// ─── 진단 결과 통합 ───

export type DiagnosisResult = {
  breakdown: ScoreBreakdown;
  label: { grade: string; tier: ScoreTier };
  recommendation: RecommendationResult;
  bottlenecks: string[];
  timeSaving: string;
  firstPhaseScope: string[];
  consultationChecklist: string[];
  consultantQuestions: string[];
  summaryText: string;
};

export function runDiagnosis(answers: Answers): DiagnosisResult {
  const breakdown = calculateScore(answers);
  const label = getScoreLabel(breakdown.total);
  const recommendation = getRecommendation(answers, breakdown.total);
  const bottlenecks = getBottlenecks(answers);
  const timeSaving = getTimeSavingRange(answers);
  const firstPhaseScope = getFirstPhaseScope(recommendation.type, answers);
  const consultationChecklist = getConsultationChecklist(recommendation.type);
  const consultantQuestions = getConsultantQuestions(answers);
  const summaryText = buildSummaryText(answers, breakdown, recommendation);

  return {
    breakdown,
    label,
    recommendation,
    bottlenecks,
    timeSaving,
    firstPhaseScope,
    consultationChecklist,
    consultantQuestions,
    summaryText,
  };
}

export const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_AxdxexhX";
