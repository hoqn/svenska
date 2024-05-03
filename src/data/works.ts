import type { ImageMetadata } from "astro";
import type { CollectionEntry } from "astro:content";

type WorkWithoutDetailedPage = {
  title: string;
  icon: string | ImageMetadata;
  startDate?: string | Date;
  endDate?: string | Date;
  stacks: string[];
  summary?: string;
  roles?: string | string[];
  links?: Record<string, string>;
  images?: string[];
};

type WorkWithDetailedPage = Partial<WorkWithoutDetailedPage> & {
  slug: CollectionEntry<"works">["slug"];
};

export type Work = WorkWithDetailedPage | WorkWithoutDetailedPage;

export function hasDetailedPage(work: Work): work is WorkWithDetailedPage {
  return "slug" in work;
}

const normal = [
  {
    slug: "hakpl",
    roles: ["웹 프런트엔드", "기획", "1인"],
    links: {
      서비스: "https://hakpl.vercel.app",
      소스코드: "https://github.com/hoqn/hakpl",
    },
    summary: `
(진행 중)  

이전에 진행했던 안드로이드 앱 학교플러스 서비스의 기능들을 웹으로 구현했어요.  
기능만 유지되었을 뿐, 완전히 새롭게 디자인하고 개발하였답니다.

\`framer-motion\`을 활용해 자연스러운 애니메이션과 트랜지션을 구현했어요!
`,
  },
  {
    slug: "readiary",
    roles: ["웹 프런트엔드", "기획"],
    links: {
      "소스코드(FE)": "https://github.com/hoqn/readiary-fe",
    },
    summary: `
읽은 책을 기록하고 GPT와 Stable Diffusion과 같은 LLM을 활용하여 책에 대한 질문과 이미지를 생성하는 웹 서비스예요. 이는 단순히 책을 기록하는 것을 넘어 효과적인 독후활동을 도와준답니다.
`,
    // TODO: add images
  },
  {
    slug: "cinema-seoul",
    roles: ["웹 프런트엔드", "데이터베이스"],
    links: {
      "소스코드(FE)": "https://github.com/Cinema-Seoul/cine-seoul-fe",
    },
    summary: `
가상의 영화관을 위한 예매 및 영화관 상영 일정 관리 웹 서비스예요. 고객들이 영화를 검색하고 예매할 수 있는 고객용 웹 서비스와, 직원들이 영화 정보와 상영 일정을 등록할 수 있는 직원용 웹 서비스를 동시에 개발했어요.
`,
  },
  {
    slug: "mr-daebak",
    roles: ["웹 백엔드", "데이터베이스"],
    links: {
      "소스코드(BE)": "https://github.com/hoqn/mrdaebak-backend",
    },
    summary: `
가상의 음식점을 위한 음식 배달 주문 및 음식점 관리 웹 서비스예요. 고객들이 음식과 옵션들을 고르고 주문할 수 있는 고객용 웹 서비스와, 직원 정보나 재료 수급 관리와 같은 음식점 내부 정보를 관리하는 직원용 웹 서비스를 동시에 개발했어요.
`,
  },
  {
    slug: "hakkyoplus",
    roles: ["앱(안드로이드)"],
    links: {
      "구글 플레이":
        "https://play.google.com/store/apps/details?id=com.agravic.schoollife",
    },
    summary: `
전국 초중고 학생들을 대상으로 시간표 관리, 식단 확인, 그리고 학사일정 확인을 제공하는 학교 생활 도움 앱이에요. 학사일정이나 급식 정보는 공공API 중 교육부 NEIS의 API를 활용하였고, 시간표의 경우 테마를 지원하고 학기별로 관리할 수 있게 했어요.
`,
  },
] satisfies Work[];

const misc = [
  {
    slug: "makeju",
    roles: ["웹 프런트엔드", "기획"],
    links: {
      데모사이트: "https://makeju.vercel.app",
      소스코드: "https://github.com/hoqn/makeju",
    },
    summary: `
간단하게 맥주 제조에 필요한 재료인 몰트(맥아)와 홉 종류를 선택해 나만의 맥주를 만들어볼 수 있는 미니 서비스예요.  
SRM 수치를 통해 색깔을 예측해서 보여줘요. 귀여운 인터랙션도 있답니다.
`,
  },
  {
    title: "개인 블로그(Astro)",
    icon: "🏈",
    roles: ["웹 프런트엔드", "기획"],
    stacks: ["TypeScript", "Astro"],
    startDate: "2023.",
    summary: `
글을 작성하고자 만든 블로그예요. 그 전에도 \`Hexo\`를 활용하여 만든 블로그가 있었는데, 
\`Astro\`에 큰 관심이 생겨 이를 활용해 리뉴얼했어요.
    `,
  },
  {
    title: "Send2Tistory",
    icon: "🎩",
    roles: ["앱 (안드로이드)"],
    stacks: ["Kotlin", "Android", "Jetpack Compose"],
    startDate: "2021.",
    endDate: "2021.",
    summary: `
취미로 만들었던 앱 프로젝트예요. Tistory API를 활용해 간단히 공유 버튼을 눌러 바로 Tistory 블로그에 글을 업로드해주는 앱이에요.

이 프로젝트는 **혼자 진행**했어요. 사실, 이 프로젝트는 태블릿으로 글을 작성하며 이런 게 있음 좋겠다는 간단한 생각과 \`Jetpack Compose\`를 활용해보고 싶다는 생각으로 만든 아주아주 간단한 앱이에요. 간단한 앱이지만 Play 스토어에 업로드했어요.
    `,
  },
] satisfies Work[];

export { normal, misc };
