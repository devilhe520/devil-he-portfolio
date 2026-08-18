export type CaseLanguage = "zh" | "en";

export type CaseText = { zh: string; en: string };

export type CaseOverviewData = {
  slug: string;
  index: string;
  brand: string;
  category: CaseText;
  period: string;
  role: CaseText;
  image: string;
  imagePosition?: string;
  accent: string;
  summary: CaseText;
  facts: Array<{ label: CaseText; value: CaseText }>;
  sections: Array<{ number: string; title: CaseText; body: CaseText }>;
};

export const caseOverviews: Record<string, CaseOverviewData> = {
  tiffany: {
    slug: "tiffany",
    index: "01",
    brand: "Tiffany & Co.",
    category: { zh: "奢侈品数字电商", en: "Luxury E-commerce" },
    period: "2024—2025",
    role: { zh: "Design Head / 核心设计负责人", en: "Design Head / UX Lead" },
    image: "/brand-visuals/tiffany-shanghai.jpg",
    accent: "#77a7a3",
    summary: {
      zh: "主导 Tiffany 中国数字电商项目的核心 UX 设计与交付，在全球品牌规范、复杂电商业务与中国消费者体验之间建立平衡。",
      en: "Led core UX design and delivery for Tiffany China digital commerce, balancing global brand standards, complex commerce and local consumer expectations.",
    },
    facts: [
      { label: { zh: "项目类型", en: "Project" }, value: { zh: "中国数字电商体验", en: "China digital commerce" } },
      { label: { zh: "核心角色", en: "Role" }, value: { zh: "设计统筹与 UX 负责人", en: "Design leadership & UX ownership" } },
      { label: { zh: "协作范围", en: "Collaboration" }, value: { zh: "Global / Local、业务、开发、QA", en: "Global / Local, business, development, QA" } },
    ],
    sections: [
      { number: "01", title: { zh: "项目背景与角色", en: "Context & Role" }, body: { zh: "担任项目 Design Head，负责核心用户流程、信息架构和关键体验方案，并协同多方团队推进设计评审、开发落地与验收。", en: "As Design Head, I owned core journeys, information architecture and key experience solutions while aligning multiple teams through review, implementation and acceptance." } },
      { number: "02", title: { zh: "挑战与贡献", en: "Challenge & Contribution" }, body: { zh: "核心挑战是在全球品牌规范、复杂电商业务和中国消费者习惯之间建立清晰平衡。我将业务要求转化为可执行的体验决策，并持续把控关键触点的一致性。", en: "The central challenge was balancing global brand standards, complex commerce requirements and Chinese consumer behavior. I translated business needs into executable experience decisions and protected consistency across key touchpoints." } },
      { number: "03", title: { zh: "交付价值与反思", en: "Delivery Value & Reflection" }, body: { zh: "项目强化了我在大型国际品牌环境中进行设计统筹、跨团队决策和交付质量管理的能力，也进一步明确了 Design Head 对最终体验结果的责任。", en: "The program strengthened my ability to lead design decisions, cross-functional alignment and delivery quality in a global brand environment—and clarified the accountability of a Design Head for the final experience." } },
    ],
  },
  sothebys: {
    slug: "sothebys",
    index: "02",
    brand: "Sotheby’s",
    category: { zh: "中国官网与微信拍卖体验", en: "China Website & WeChat Auction" },
    period: "2022—2023",
    role: { zh: "主导 UX Design", en: "Lead UX Design" },
    image: "/brand-visuals/sothebys.jpg",
    accent: "#7e474a",
    summary: {
      zh: "面对复杂拍卖流程、多状态业务和需求不明确等问题，主导需求拆解、信息架构与核心用户流程设计。",
      en: "Led requirement framing, information architecture and core journeys across complex auction flows, multiple business states and ambiguous requirements.",
    },
    facts: [
      { label: { zh: "项目类型", en: "Project" }, value: { zh: "官网与微信拍卖小程序", en: "Website & WeChat auction" } },
      { label: { zh: "核心角色", en: "Role" }, value: { zh: "主导 UX 设计", en: "Lead UX design" } },
      { label: { zh: "复杂度", en: "Complexity" }, value: { zh: "拍卖流程、多业务状态、分批交付", en: "Auction flows, multiple states, phased delivery" } },
    ],
    sections: [
      { number: "01", title: { zh: "项目背景与角色", en: "Context & Role" }, body: { zh: "主导 Sotheby’s 中国官网及微信拍卖小程序 UX 设计，负责需求拆解、信息架构和核心用户流程，并与产品、运营、开发及测试团队协作。", en: "Led UX design for Sotheby’s China website and WeChat auction experience, covering requirement framing, information architecture and core journeys with product, operations, engineering and QA." } },
      { number: "02", title: { zh: "挑战与贡献", en: "Challenge & Contribution" }, body: { zh: "拍卖业务包含大量时间、身份和交易状态，且部分需求需要在设计过程中持续澄清。我通过行业研究、状态梳理和分批交付降低遗漏与返工风险。", en: "Auction journeys involve time, identity and transaction states, while requirements continued to evolve. Industry research, state mapping and phased delivery helped reduce gaps and rework risk." } },
      { number: "03", title: { zh: "交付价值与反思", en: "Delivery Value & Reflection" }, body: { zh: "项目让我形成了面对复杂业务时先建立逻辑框架、再推进界面设计的工作方式，并更加重视异常状态和验收阶段对最终体验的影响。", en: "The work reinforced an approach of establishing the logic framework before interface design, with greater attention to exceptional states and the impact of acceptance on the final experience." } },
    ],
  },
  nike: {
    slug: "nike",
    index: "03",
    brand: "Nike",
    category: { zh: "中国官网与微信小程序", en: "China Website & WeChat Mini Program" },
    period: "2021—2022",
    role: { zh: "主导 UX 优化与交付", en: "Lead UX Optimization & Delivery" },
    image: "/brand-visuals/nike.jpg",
    accent: "#a25e32",
    summary: {
      zh: "在严格 Global 规范与成熟业务体系下，主导核心交互优化、设计交付与开发验收。",
      en: "Led interaction optimization, design delivery and implementation review within rigorous global standards and a mature commerce ecosystem.",
    },
    facts: [
      { label: { zh: "项目类型", en: "Project" }, value: { zh: "中国数字渠道体验", en: "China digital channels" } },
      { label: { zh: "核心角色", en: "Role" }, value: { zh: "UX 优化与设计交付", en: "UX optimization & delivery" } },
      { label: { zh: "重点", en: "Focus" }, value: { zh: "Global 规范、本土运营、开发验收", en: "Global standards, local operations, QA" } },
    ],
    sections: [
      { number: "01", title: { zh: "项目背景与角色", en: "Context & Role" }, body: { zh: "负责 Nike 中国官网及微信小程序的核心交互优化和设计交付，在成熟业务体系内协同运营、开发与测试团队推进方案落地。", en: "Owned core interaction optimization and design delivery for Nike China’s website and WeChat Mini Program, partnering with operations, engineering and QA." } },
      { number: "02", title: { zh: "挑战与贡献", en: "Challenge & Contribution" }, body: { zh: "项目需要严格遵循 Global 规范，同时满足中国市场高频运营需求。我在统一体验原则下优化关键交互，并参与规划可配置组件以提升本地运营灵活性。", en: "The work had to follow global standards while supporting high-frequency local operations. I optimized key interactions within shared principles and contributed to configurable patterns for greater local flexibility." } },
      { number: "03", title: { zh: "交付价值与反思", en: "Delivery Value & Reflection" }, body: { zh: "项目深化了我对大型设计体系的理解：本土化并不是改变品牌语言，而是在统一规则中找到更适合本地消费者和运营团队的实现方式。", en: "The program deepened my understanding of large design systems: localization is not about changing brand language, but finding better implementations for local consumers and operations within shared rules." } },
    ],
  },
  "chloe-gucci": {
    slug: "chloe-gucci",
    index: "04",
    brand: "Chloé / Gucci",
    category: { zh: "奢侈品牌数字体验", en: "Luxury Digital Experience" },
    period: "2019—2020",
    role: { zh: "主导 UX Design", en: "Lead UX Design" },
    image: "/brand-visuals/chloe.jpg",
    imagePosition: "center 36%",
    accent: "#8b8177",
    summary: {
      zh: "在全球品牌规范与中国消费者购物习惯之间进行本土化体验优化，保持品牌调性的同时提升数字购物效率。",
      en: "Localized luxury commerce experiences between global brand standards and Chinese shopping behaviors, improving efficiency while preserving brand expression.",
    },
    facts: [
      { label: { zh: "项目类型", en: "Project" }, value: { zh: "奢侈品牌中国数字渠道", en: "Luxury digital channels in China" } },
      { label: { zh: "核心角色", en: "Role" }, value: { zh: "主导 UX 设计", en: "Lead UX design" } },
      { label: { zh: "重点", en: "Focus" }, value: { zh: "商品发现、信息表达、快捷购买", en: "Discovery, product information, fast purchase" } },
    ],
    sections: [
      { number: "01", title: { zh: "项目背景与角色", en: "Context & Role" }, body: { zh: "主导国际奢侈品牌中国数字渠道与电商体验设计，围绕商品浏览、商品信息和购买链路进行本土化优化。", en: "Led UX design for international luxury brands across China digital channels, localizing product discovery, information and purchase journeys." } },
      { number: "02", title: { zh: "挑战与贡献", en: "Challenge & Contribution" }, body: { zh: "核心挑战是不能用效率破坏品牌氛围，也不能让视觉表达阻碍购物任务。我围绕 Quick View、商品信息与快捷加购等场景优化路径与信息优先级。", en: "The challenge was to improve efficiency without weakening brand atmosphere—and to prevent visual expression from obstructing shopping tasks. I refined paths and information priority across Quick View, product information and fast add-to-cart." } },
      { number: "03", title: { zh: "交付价值与反思", en: "Delivery Value & Reflection" }, body: { zh: "这些项目建立了我对 Luxury UX 的核心理解：高级感来自品牌表达、信息节奏和交互效率之间的平衡，而不是单纯减少内容。", en: "These projects shaped my view of Luxury UX: premium experience comes from balancing brand expression, information rhythm and interaction efficiency—not simply removing content." } },
    ],
  },
};
