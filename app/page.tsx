"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Wrench,
  FileText,
  Layers,
  ClipboardList,
  History,
  ScrollText,
  Settings2,
  Search,
  Hammer,
  RefreshCw,
  ArrowRight,
  ChevronRight,
  Mail,
  MessageCircle,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";

const PRIMARY = "#E85D30";

/* 한글 대제목 공통 규칙 — letter-spacing -0.03em, line-height 1.32, keep-all, balance */
const TITLE_STYLE: React.CSSProperties = {
  lineHeight: "1.32",
  letterSpacing: "-0.03em",
  wordBreak: "keep-all",
  textWrap: "balance",
};

/* 본문·설명 문구 공통 규칙 — line-height 1.85, keep-all */
const BODY_STYLE: React.CSSProperties = {
  lineHeight: "1.85",
  wordBreak: "keep-all",
};

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "소개" },
    { href: "#solutions", label: "솔루션" },
    { href: "#cases", label: "구축 사례" },
    { href: "#process", label: "도입 절차" },
    { href: "#services", label: "운영 서비스" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="font-bold text-xl text-gray-900">
            OZ.K <span style={{ color: PRIMARY }}>Lab</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              상담 신청
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 shadow-lg rounded-b-xl">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <a
                href="#contact"
                className="block text-center px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: PRIMARY }}
                onClick={() => setMenuOpen(false)}
              >
                상담 신청
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

const heroCards = [
  {
    icon: <Users size={18} />,
    title: "고객 정보가 흩어져 있나요?",
    desc: "상담·작업·첨부 이력을 한곳에서 관리합니다.",
  },
  {
    icon: <Wrench size={18} />,
    title: "A/S·QC 이력이 이어지지 않나요?",
    desc: "시리얼번호와 작업 이력을 기준으로 흐름을 정리합니다.",
  },
  {
    icon: <FileText size={18} />,
    title: "보고와 안내문 작성이 반복되나요?",
    desc: "업무 데이터를 기준으로 보고·안내 흐름을 자동화합니다.",
  },
];

const problemCards = [
  {
    icon: <Users size={24} />,
    title: "고객 정보가 사람마다 다릅니다",
    desc: "고객정보, 상담내용, 사진·첨부, 요청사항이 담당자별로 흩어집니다.",
  },
  {
    icon: <History size={24} />,
    title: "작업 이력이 이어지지 않습니다",
    desc: "접수, 수리, 재고, 비용, 발송 이력이 분리되어 이전 처리 내용을 찾기 어렵습니다.",
  },
  {
    icon: <ScrollText size={24} />,
    title: "보고와 안내가 수작업입니다",
    desc: "업무일지, 업체 안내, 정산 자료를 반복해서 정리하고 복사해야 합니다.",
  },
  {
    icon: <Settings2 size={24} />,
    title: "기존 시스템이 현장에 맞지 않습니다",
    desc: "현재 사용하는 ERP나 시트가 있어도 실제 담당자의 입력 흐름과 맞지 않는 경우가 많습니다.",
  },
];

const solutionCards = [
  {
    tag: "CRM",
    icon: <Users size={24} />,
    title: "고객·상담 관리",
    desc: "고객 기본정보, 상담내용, 사진·첨부, 요청사항과 이력을 한곳에서 관리합니다.",
  },
  {
    tag: "A/S·QC",
    icon: <Wrench size={24} />,
    title: "A/S·리퍼·QC 관리",
    desc: "접수부터 작업, 부품, 비용 안내, 발송, 이력 조회까지 운영 흐름을 연결합니다.",
  },
  {
    tag: "Workflow",
    icon: <ClipboardList size={24} />,
    title: "업무일지·보고 자동화",
    desc: "현장 입력 데이터를 기준으로 업무일지, 현황, 안내문, 보고 자료를 빠르게 정리합니다.",
  },
  {
    tag: "Platform",
    icon: <Layers size={24} />,
    title: "맞춤형 운영 시스템",
    desc: "기존 엑셀·구글시트·업무 도구의 흐름을 분석해 우리 조직에 맞는 웹 기반 운영 구조를 설계합니다.",
  },
];

const caseStudies = [
  {
    title: "A/S·리퍼 업무일지 자동화",
    problemLabel: "문제",
    problem: "서비스 처리 대장 데이터를 매일 수작업으로 분류하고 업무일지를 작성해야 했습니다.",
    approachLabel: "구축 방향",
    approach:
      "원본 데이터 복사·붙여넣기만으로 리퍼·A/S 분류, 동일 시리얼번호 기준 집계, 업체별 처리 내역과 담당자별 업무일지를 생성하도록 구성했습니다.",
    valueLabel: "핵심 가치",
    value: "반복 집계 시간을 줄이고, 팀원이 같은 기준으로 오늘의 업무를 공유할 수 있도록 했습니다.",
  },
  {
    title: "A/S·QC 통합 운영관리 구조 설계",
    problemLabel: "문제",
    problem: "접수, 작업관리, 부품, 비용 안내, 장비 이력, 업무보고가 여러 자료와 담당자에게 나뉘어 있었습니다.",
    approachLabel: "구축 방향",
    approach:
      "시리얼번호 기반 종전 이력 조회를 중심으로 접수·작업·부품·업체 안내·보고 흐름을 하나의 운영 플랫폼으로 연결하는 구조를 설계했습니다.",
    valueLabel: "핵심 가치",
    value: "담당자가 바뀌어도 누적 이력을 확인하고, 동일한 기준으로 업무를 이어갈 수 있습니다.",
  },
];

const processSteps = [
  {
    icon: <Search size={28} />,
    step: "01",
    title: "업무 진단",
    desc: "현재 사용하는 자료, 담당자 역할, 반복 업무와 병목을 함께 확인합니다.",
  },
  {
    icon: <Layers size={28} />,
    step: "02",
    title: "구조 설계",
    desc: "고객·작업·재고·정산·보고 중 필요한 흐름을 우선순위에 맞게 설계합니다.",
  },
  {
    icon: <Hammer size={28} />,
    step: "03",
    title: "구축·테스트",
    desc: "실제 담당자가 사용할 수 있도록 화면과 입력 흐름을 구현하고 점검합니다.",
  },
  {
    icon: <RefreshCw size={28} />,
    step: "04",
    title: "운영 개선",
    desc: "사용 과정에서 발생하는 불편을 확인하고, 다음 개선 범위를 함께 정리합니다.",
  },
];

const CONTACT_MAILTO =
  "mailto:contact@ozklab.com?subject=" +
  encodeURIComponent("[OZ.K Lab] 업무 시스템 구축 상담 문의");

const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_AxdxexhX";

export default function Home() {
  return (
    <main className="font-sans">
      <Nav />

      {/* ─── Hero ─── */}
      <section
        id="hero"
        className="min-h-[calc(100vh-64px)] flex items-center bg-white mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{ backgroundColor: `${PRIMARY}18`, color: PRIMARY }}
              >
                <Layers size={13} />
                CRM · A/S·QC · 업무 자동화
              </div>
              <h1
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5"
                style={TITLE_STYLE}
              >
                고객관리부터 작업·정산까지,
                <br />
                <span style={{ color: PRIMARY }}>현장에 맞는 업무 시스템</span>
                을 구축합니다.
              </h1>
              <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-md" style={BODY_STYLE}>
                엑셀, 메신저, 종이와 담당자 기억에 흩어진 업무를 누구나 이어서{" "}
                <span className="whitespace-nowrap">처리할 수 있는 운영 시스템으로 바꿉니다.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-opacity hover:opacity-90 text-sm"
                  style={{ backgroundColor: PRIMARY }}
                >
                  우리 회사 업무 진단 받기
                  <ArrowRight size={15} />
                </a>
                <a
                  href="#cases"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm"
                >
                  구축 사례 보기
                  <ChevronRight size={15} />
                </a>
              </div>
            </motion.div>

            {/* Right: problem-solving cards */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
              className="flex flex-col gap-3"
            >
              {heroCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${PRIMARY}15`, color: PRIMARY }}
                  >
                    {card.icon}
                  </div>
                  <p
                    className="text-sm font-semibold text-gray-900 mb-1"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {card.title}
                  </p>
                  <p
                    className="text-xs text-gray-500"
                    style={{ lineHeight: "1.65", wordBreak: "keep-all" }}
                  >
                    {card.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 고객 문제 ─── */}
      <section id="problems" className="py-20 sm:py-24" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-10 max-w-2xl">
              <h2
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
                style={TITLE_STYLE}
              >
                현장에서는 이런 문제로 업무가 멈춥니다.
              </h2>
              <p className="text-gray-500 max-w-xl text-sm" style={BODY_STYLE}>
                툴을 하나 더 늘리기보다, 지금의 업무 흐름을 연결하는 구조가 먼저 필요합니다.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {problemCards.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 h-full flex flex-col hover:shadow-md transition-all duration-300">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${PRIMARY}15`, color: PRIMARY }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="text-base font-bold text-gray-900 mb-2"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm text-gray-600"
                    style={BODY_STYLE}
                  >
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 솔루션 ─── */}
      <section id="solutions" className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-10 max-w-2xl">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: PRIMARY }}
              >
                Solutions
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={TITLE_STYLE}>
                업무를 더 잘게 나누기보다,
                <br />
                한 번에 이어지도록 설계합니다.
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {solutionCards.map((svc, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${PRIMARY}15`, color: PRIMARY }}
                  >
                    {svc.icon}
                  </div>
                  <span
                    className="text-xs font-semibold tracking-widest uppercase mb-1.5"
                    style={{ color: PRIMARY }}
                  >
                    {svc.tag}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{svc.title}</h3>
                  <p
                    className="text-sm text-gray-600 flex-1"
                    style={BODY_STYLE}
                  >
                    {svc.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 구축 사례 ─── */}
      <section id="cases" className="py-20 sm:py-24" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-10 max-w-2xl">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: PRIMARY }}
              >
                Cases
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
                style={TITLE_STYLE}
              >
                현장의 흐름을 이해해 만든 구축 사례
              </h2>
              <p className="text-gray-500 max-w-xl text-sm" style={BODY_STYLE}>
                업무를 단순히 디지털로 옮기지 않고, 담당자가 실제로 사용하는 흐름에 맞춰 설계합니다.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-7 h-full flex flex-col">
                  <h3
                    className="text-lg font-bold text-gray-900 mb-4"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {item.title}
                  </h3>
                  <div className="space-y-4 flex-1">
                    <div>
                      <p
                        className="text-xs font-semibold tracking-widest uppercase mb-1.5"
                        style={{ color: PRIMARY }}
                      >
                        {item.problemLabel}
                      </p>
                      <p
                        className="text-sm text-gray-600"
                        style={BODY_STYLE}
                      >
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold tracking-widest uppercase mb-1.5"
                        style={{ color: PRIMARY }}
                      >
                        {item.approachLabel}
                      </p>
                      <p
                        className="text-sm text-gray-600"
                        style={BODY_STYLE}
                      >
                        {item.approach}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold tracking-widest uppercase mb-1.5"
                        style={{ color: PRIMARY }}
                      >
                        {item.valueLabel}
                      </p>
                      <p
                        className="text-sm text-gray-600"
                        style={BODY_STYLE}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 도입 절차 ─── */}
      <section id="process" className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-10 max-w-2xl">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: PRIMARY }}
              >
                Process
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={TITLE_STYLE}>
                우리 회사 업무에 맞게, 이렇게 시작합니다.
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {processSteps.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="absolute top-5 right-5 text-3xl font-black text-gray-50 select-none">
                    {item.step}
                  </div>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${PRIMARY}15`, color: PRIMARY }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p
                    className="text-sm text-gray-600"
                    style={BODY_STYLE}
                  >
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OZ.K Lab 소개 ─── */}
      <section id="about" className="py-16 sm:py-20" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: PRIMARY }}
              >
                About OZ.K Lab
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5" style={TITLE_STYLE}>
                현장을 이해하고,
                <br />
                바로 쓰이는 시스템을 만듭니다.
              </h2>
              <div
                className="text-base text-gray-600 max-w-xl mx-auto space-y-4"
                style={BODY_STYLE}
              >
                <p>
                  OZ.K Lab은 작은 조직과 현장 실무자가 실제로 겪는 업무 문제를 이해하고,
                  고객관리, 업무흐름, 보고와 운영 데이터를 더 쉽게{" "}
                  <span className="whitespace-nowrap">연결하는 디지털 시스템을 설계합니다.</span>
                </p>
                <p>
                  복잡한 기능을 늘리기보다, 지금의 업무가 더 빠르고 정확하게{" "}
                  <span className="whitespace-nowrap">이어지는 구조를 만드는 데 집중합니다.</span>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 운영 서비스 ─── */}
      <section id="services" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-10 max-w-2xl">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: PRIMARY }}
              >
                Services
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={TITLE_STYLE}>
                OZ.K Lab이 운영하는 서비스
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="max-w-xl">
              <div className="border border-gray-100 rounded-2xl p-6 sm:p-7 flex items-center gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${PRIMARY}15`, color: PRIMARY }}
                >
                  <GraduationCap size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">꿈따라</h3>
                  <p className="text-sm text-gray-600 mb-3" style={BODY_STYLE}>
                    자녀와 부모가 함께 직업을 탐색하고, 진로 대화를 시작할 수 있도록 돕는 진로탐색 서비스입니다.
                  </p>
                  <a
                    href="https://꿈따라.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all duration-200"
                    style={{ color: PRIMARY }}
                  >
                    꿈따라 보러가기 <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 상담 신청 ─── */}
      <section id="contact" className="py-16 sm:py-20" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-xl mx-auto text-center">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: PRIMARY }}
              >
                Contact
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 max-w-sm mx-auto"
                style={{
                  lineHeight: "1.35",
                  letterSpacing: "-0.01em",
                  wordBreak: "keep-all",
                  textWrap: "balance",
                }}
              >
                우리 회사의 업무 흐름을
                <br />
                어디부터 정리하면 좋을지
                <br />
                함께 살펴보겠습니다.
              </h2>
              <p
                className="text-gray-500 mb-8 text-sm sm:text-base"
                style={{ lineHeight: "1.9", wordBreak: "keep-all" }}
              >
                고객관리, A/S·QC, 업무일지, 보고 자동화처럼 반복되는 업무가 있다면{" "}
                <span className="whitespace-nowrap">현재 사용 중인 방식부터 알려주세요.</span>
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <a
                    href={KAKAO_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="카카오톡 채널에서 OZ.K Lab 상담 시작하기 (새 창 열림)"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-medium text-white text-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    <MessageCircle size={15} />
                    카카오톡 상담 시작
                  </a>
                  <a
                    href={CONTACT_MAILTO}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-medium text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm"
                  >
                    <Mail size={15} />
                    상담 문의하기
                  </a>
                </div>
                <a
                  href={CONTACT_MAILTO}
                  className="text-sm text-gray-400 hover:underline transition-colors"
                  style={{ color: PRIMARY }}
                >
                  contact@ozklab.com
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="max-w-[280px]">
              <div className="font-bold text-lg text-gray-900 mb-2.5">
                OZ.K <span style={{ color: PRIMARY }}>Lab</span>
              </div>
              <p
                className="text-sm text-gray-500"
                style={{ lineHeight: "1.75", wordBreak: "keep-all" }}
              >
                OZ.K Lab은 현장에 맞는 CRM, A/S·QC,{" "}
                <span className="whitespace-nowrap">업무자동화 시스템을 설계·구축합니다.</span>
              </p>
            </div>

            <div className="text-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                서비스
              </p>
              <div className="space-y-3">
                <div>
                  <a
                    href="https://꿈따라.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    꿈따라
                  </a>
                  <p className="text-xs text-gray-400 mt-0.5">자녀 진로탐색 서비스</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="text-xs text-gray-400 whitespace-nowrap">
              © 오즈케이랩(OZ.K Lab). All rights reserved.
            </p>
            <a
              href="mailto:contact@ozklab.com"
              className="text-xs text-gray-400 hover:underline transition-colors"
            >
              contact@ozklab.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
