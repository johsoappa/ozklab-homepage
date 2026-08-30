# OZ.K Lab 공식 홈페이지

OZ.K Lab 공식 홈페이지 — 현장에 맞는 CRM, A/S·QC, 업무자동화 시스템을 설계·구축하는 B2B 디지털 솔루션 브랜드.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Font**: Pretendard (CDN)
- **Deployment**: Vercel
- **Domain**: ozklab.kr

## 브랜드 구조

| 브랜드 | 역할 |
|--------|------|
| **OZ.K Lab** (오즈케이랩) | 공식 사업자명 / 운영사 — CRM·A/S·QC·업무자동화 시스템 구축 |
| **꿈따라** | OZ.K Lab이 운영하는 자녀 진로탐색 서비스 (하단 운영 서비스 영역에서만 연결) |

> 사업자명은 기존 `좋소아빠`에서 `오즈케이랩`으로 변경되었습니다. `좋소아빠`, `명따라`는 이번 B2B 공식 홈페이지에는 노출하지 않습니다.

## 페이지 섹션

1. Hero
2. 고객 문제
3. 솔루션 (CRM / A/S·QC / Workflow / Platform)
4. 구축 사례
5. 도입 절차
6. About OZ.K Lab
7. 운영 서비스 (꿈따라)
8. 상담 신청
9. Footer

## 로컬 개발

```bash
npm install
npm run dev
```

## 빌드 & 배포

```bash
npm run build   # 프로덕션 빌드
npm start       # 프로덕션 서버 실행
```

Vercel에 main 브랜치를 push하면 자동 배포됩니다.

## 링크 관리

| 항목 | 링크 |
|------|------|
| 꿈따라 서비스 | https://꿈따라.kr |
| 문의 이메일 | contact@ozklab.com |
| GitHub | https://github.com/johsoappa/ozklab-homepage |

> 문의 이메일: `contact@ozklab.com`

## 로고 에셋

| 파일 | 경로 | 상태 |
|------|------|------|
| 풀 로고 | `public/images/ozk-lab-logo.png` | ⚠️ 배경 포함 — 교체 필요 |

> **⚠️ 현재 로고 파일 주의사항**
> `public/images/ozk-lab-logo.png`는 체커보드 배경이 픽셀에 포함된 상태입니다.
> 진짜 투명 배경(알파 채널)이 있는 PNG 또는 SVG 파일로 교체해야 합니다.
> 교체 시 동일 경로(`public/images/ozk-lab-logo.png`)에 덮어쓰면 됩니다.

- Header/Footer는 현재 텍스트 로고로 임시 적용 중
- 투명 PNG/SVG 파일 준비 후 `next/image`로 교체 예정
- **추후 필요 작업**:
  - Favicon용 심볼 버전 별도 제작 필요
  - Open Graph(OG) 공유 이미지 별도 제작 필요

## Tailwind CSS v4 참고

이 프로젝트는 Tailwind CSS v4를 사용합니다. v4에서는 `tailwind.config.ts` 대신
`app/globals.css`의 `@theme` 블록으로 디자인 토큰을 관리합니다.

- Primary Color: `#E85D30` (CSS 변수: `--primary`)
