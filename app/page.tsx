"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Target,
  ChevronRight,
  ArrowRight,
  Briefcase,
  GraduationCap,
  BookOpen,
  Code2,
  Menu,
  X,
} from "lucide-react";

const PRIMARY = "#E85D30";

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
    { href: "#services", label: "서비스" },
    { href: "#ai-workflow", label: "AI 워크플로우" },
    { href: "#portfolio", label: "포트폴리오" },
    { href: "#myeongtara", label: "명따라" },
    { href: "#contact", label: "문의" },
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
              문의하기
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
                문의하기
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
    icon: <Briefcase size={18} />,
    title: "좋소아빠 자동화",
    desc: "작은 회사와 실무자를 위한 업무 자동화 솔루션",
  },
  {
    icon: <GraduationCap size={18} />,
    title: "꿈따라",
    desc: "자녀 진로탐색 서비스",
    link: "https://꿈따라.kr",
  },
  {
    icon: <BookOpen size={18} />,
    title: "명따라",
    desc: "생년월일 기반 자기이해 리포트",
  },
  {
    icon: <Zap size={18} />,
    title: "AI Workflow",
    desc: "기획·구현·전략을 연결하는 실행 구조",
  },
];

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
                <Zap size={13} />
                AI × 자동화 × 디지털 솔루션
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5"
                style={{ lineHeight: "1.2" }}
              >
                AI와 자동화로
                <br />
                <span style={{ color: PRIMARY }}>현실에 쓰이는</span>
                <br />
                서비스를 만듭니다.
              </h1>
              <p className="text-base sm:text-lg text-gray-500 mb-8"
                style={{ lineHeight: "1.8" }}
              >
                OZ.K Lab은 아이의 진로 탐색부터 작은 조직의 업무 자동화까지,
                생활과 현장에서 바로 쓰이는 디지털 솔루션을 설계합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://꿈따라.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-opacity hover:opacity-90 text-sm"
                  style={{ backgroundColor: PRIMARY }}
                >
                  꿈따라 보러가기
                  <ArrowRight size={15} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm"
                >
                  자동화 솔루션 문의하기
                  <ChevronRight size={15} />
                </a>
              </div>
            </motion.div>

            {/* Right: service summary cards */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
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
                  <p className="text-sm font-semibold text-gray-900 mb-1">{card.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                  {card.link && (
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-xs font-medium"
                      style={{ color: PRIMARY }}
                    >
                      바로가기 <ArrowRight size={12} />
                    </a>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
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
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 leading-snug">
                현실에 쓰이는 디지털 솔루션을 만드는
                <br />
                실행형 연구소
              </h2>
              <p className="text-base text-gray-600" style={{ lineHeight: "1.9" }}>
                OZ.K Lab은 현실에 쓰이는 디지털 솔루션을 만드는 실행형 연구소입니다.
                AI, 웹앱, 엑셀, 구글시트 자동화 기술을 활용해
                작은 조직과 개인이 바로 사용할 수 있는 실무형 시스템을 설계합니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="services" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: PRIMARY }}
              >
                Services
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                OZ.K Lab의 서비스
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Briefcase size={24} />,
                tag: "업무 자동화",
                title: "좋소아빠 자동화",
                subtitle: null as string | null,
                desc: "작은 회사와 실무자를 위한 업무 자동화 솔루션입니다. 엑셀, 구글시트, 웹앱, AI를 활용해 반복 입력, 집계, 보고서 작성, 업무 추적 과정을 줄이고 현장에서 바로 사용할 수 있는 시스템을 만듭니다.",
                link: null as string | null,
              },
              {
                icon: <GraduationCap size={24} />,
                tag: "진로 탐색",
                title: "꿈따라",
                subtitle: null,
                desc: "막연한 꿈이 아닌, 실행 가능한 내일을 설계하는 자녀 진로탐색 서비스입니다. 자녀의 관심사와 성향을 바탕으로 직업 탐색, 진로 대화, 부모 가이드를 제공합니다.",
                link: "https://꿈따라.kr",
              },
              {
                icon: <BookOpen size={24} />,
                tag: "자기이해 리포트",
                title: "명따라",
                subtitle: "Birth Code Analysis",
                desc: "생년월일과 전통 상징 체계를 바탕으로 성향, 강점, 반복 패턴, 일의 방향성을 정리하는 자기이해 리포트입니다. 현실적인 선택을 돕기 위한 참고형 인사이트 콘텐츠입니다.",
                link: null,
              },
            ].map((svc, i) => (
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
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{svc.title}</h3>
                  {svc.subtitle && (
                    <p className="text-xs text-gray-400 mb-2.5">{svc.subtitle}</p>
                  )}
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{svc.desc}</p>
                  {svc.link && (
                    <a
                      href={svc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-4 text-sm font-medium hover:gap-2 transition-all duration-200"
                      style={{ color: PRIMARY }}
                    >
                      서비스 보기 <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI Workflow ─── */}
      <section id="ai-workflow" className="py-16 sm:py-20" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: PRIMARY }}
              >
                AI Workflow
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                기획·구현·전략을 연결하는
                <br />
                AI 워크플로우
              </h2>
              <p className="text-gray-500 max-w-md mx-auto text-sm" style={{ lineHeight: "1.8" }}>
                아이디어 기획부터 시스템 구현, 서비스 전략까지
                AI를 활용해 통합적으로 설계합니다.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Brain size={28} />,
                step: "01",
                title: "기획",
                desc: "현장의 문제를 정의하고, AI와 함께 구조화된 솔루션을 설계합니다.",
              },
              {
                icon: <Code2 size={28} />,
                step: "02",
                title: "구현",
                desc: "웹앱, 자동화 스크립트, AI 도구를 실제 환경에 맞게 구축합니다.",
              },
              {
                icon: <Target size={28} />,
                step: "03",
                title: "전략",
                desc: "서비스의 방향성과 확장 전략을 지속적으로 검토하고 개선합니다.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="relative bg-white rounded-2xl p-7 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-5 right-5 text-4xl font-black text-gray-50 select-none">
                    {item.step}
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${PRIMARY}15`, color: PRIMARY }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Portfolio ─── */}
      <section id="portfolio" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: PRIMARY }}
              >
                Portfolio
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">주요 작업물</h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              {
                category: "좋소아빠 자동화",
                title: "사무직 업무관리 & 보고서 자동화 시스템",
                desc: "반복적인 보고서 작성과 업무 집계를 자동화하여 실무 효율을 높인 맞춤형 시스템입니다.",
                link: null as string | null,
              },
              {
                category: "좋소아빠 자동화",
                title: "QC/AS 업무 자동화",
                desc: "품질관리 및 A/S 업무 흐름을 구조화하고 자동 추적·집계 시스템으로 전환한 프로젝트입니다.",
                link: null,
              },
              {
                category: "좋소아빠 자동화",
                title: "구글시트/엑셀 자동 보고 시스템",
                desc: "현장 데이터를 실시간으로 집계하고 보고서를 자동 생성하는 스프레드시트 자동화 솔루션입니다.",
                link: null,
              },
              {
                category: "꿈따라",
                title: "꿈따라 베타 서비스",
                desc: "자녀의 진로 탐색을 돕는 AI 기반 대화형 서비스로, 직업 탐색부터 부모 가이드까지 제공합니다.",
                link: "https://꿈따라.kr",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <span
                    className="text-xs font-semibold tracking-widest uppercase mb-2.5"
                    style={{ color: PRIMARY }}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{item.desc}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-4 text-sm font-medium hover:gap-2 transition-all duration-200"
                      style={{ color: PRIMARY }}
                    >
                      서비스 보기 <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 명따라 ─── */}
      <section id="myeongtara" className="py-16 sm:py-20" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <div className="text-center mb-8">
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-3"
                  style={{ color: PRIMARY }}
                >
                  명따라
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">명따라</h2>
                <p className="text-base text-gray-400">생년월일 기반 자기이해 리포트</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl p-7 sm:p-9 border border-gray-100">
                <p className="text-gray-700 text-sm sm:text-base mb-4" style={{ lineHeight: "1.9" }}>
                  명따라는 생년월일과 전통 상징 체계를 바탕으로
                  성향, 강점, 반복 패턴, 일의 방향성을 정리하는 자기이해 리포트입니다.
                </p>
                <p className="text-gray-700 text-sm sm:text-base mb-7" style={{ lineHeight: "1.9" }}>
                  예언이나 확정적 판단이 아니라,
                  나를 더 잘 이해하고 현실적인 선택을 돕기 위한 참고형 인사이트 콘텐츠입니다.
                </p>

                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { label: "성향 분석", desc: "나만의 기질과 반복 패턴 파악" },
                    { label: "강점 정리", desc: "일과 관계에서의 자연스러운 강점" },
                    { label: "방향성 제안", desc: "현실적인 선택을 위한 참고 인사이트" },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4">
                      <div
                        className="w-2 h-2 rounded-full mb-2.5"
                        style={{ backgroundColor: PRIMARY }}
                      />
                      <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-400 mt-5">Birth Code Analysis · 준비 중</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-xl mx-auto text-center">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: PRIMARY }}
              >
                Contact
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                함께 만들어 갑시다
              </h2>
              <p className="text-gray-500 mb-2 text-sm sm:text-base" style={{ lineHeight: "1.85" }}>
                현재 OZ.K Lab의 공식 문의 채널을 준비 중입니다.
              </p>
              <p className="text-gray-500 mb-8 text-sm sm:text-base" style={{ lineHeight: "1.85" }}>
                자동화 솔루션, 꿈따라 제휴, 명따라 리포트 관련 문의는
                곧 안내드리겠습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-medium text-white text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: PRIMARY }}
                  onClick={() => {}}
                >
                  문의 채널 준비 중
                </button>
                <a
                  href="https://꿈따라.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-medium text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm"
                >
                  꿈따라 바로가기
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="max-w-xs">
              <div className="font-bold text-lg text-gray-900 mb-2.5">
                OZ.K <span style={{ color: PRIMARY }}>Lab</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                AI와 자동화로 현실에 쓰이는 서비스를 만드는 실행형 연구소입니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  자동화 솔루션
                </p>
                <p className="font-medium text-gray-700">좋소아빠 자동화</p>
                <p className="text-xs text-gray-400 mt-1">실무 자동화 솔루션 브랜드</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  서비스
                </p>
                <div className="space-y-2">
                  <div>
                    <a
                      href="https://꿈따라.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      꿈따라
                    </a>
                    <p className="text-xs text-gray-400">자녀 진로탐색 서비스</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">명따라</span>
                    <p className="text-xs text-gray-400">자기이해 리포트</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p className="text-xs text-gray-400">© OZ.K Lab. All rights reserved.</p>
            <p className="text-xs text-gray-400">
              OZ.K Lab은 좋소아빠 자동화, 꿈따라, 명따라를 운영하는 실행형 디지털 솔루션 브랜드입니다.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
