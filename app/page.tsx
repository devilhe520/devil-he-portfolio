"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { caseOverviews } from "./data/case-overviews";

type Lang = "zh" | "en";
type LocalText = { zh: string; en: string };

const deliveryProjects = [
  {
    index: "01",
    slug: "tiffany",
    brand: "Tiffany & Co.",
    title: { zh: "奢侈品数字电商", en: "Luxury E-commerce" },
    period: "2024—2025",
    role: { zh: "Design Head / 核心设计负责人", en: "Design Head / UX Lead" },
    summary: {
      zh: "主导 Tiffany 中国数字电商项目的 UX 设计与交付，在全球品牌规范、复杂电商业务与中国消费者体验之间建立平衡。",
      en: "Led UX design and delivery for Tiffany China digital commerce, balancing global brand standards, complex business needs and local consumer expectations.",
    },
    scope: {
      zh: ["端到端 UX", "设计质量", "全球 / 本地协作", "UAT 与上线"],
      en: ["End-to-end UX", "Design Quality", "Global / Local", "UAT & Go-live"],
    },
    image: "/brand-visuals/tiffany-shanghai.jpg",
    imagePosition: "center",
    detailImages: [
      "/brand-visuals/tiffany-detail-store.jpg",
      "/brand-visuals/tiffany-detail-interior.jpg",
      "/brand-visuals/tiffany-detail-cafe.jpg",
    ],
    tone: "tiffany",
  },
  {
    index: "02",
    slug: "sothebys",
    brand: "Sotheby’s",
    title: { zh: "中国官网 & 微信拍卖小程序", en: "China Website & WeChat Auction" },
    period: "2022—2023",
    role: { zh: "主导 UX Design", en: "Lead UX Design" },
    summary: {
      zh: "将复杂拍卖流程、多状态业务和不明确需求转译为清晰的信息架构与核心用户流程。",
      en: "Translated complex auction journeys, multi-state business logic and ambiguous requirements into a clear information architecture and core user flows.",
    },
    scope: {
      zh: ["复杂业务 UX", "信息架构", "多状态设计"],
      en: ["Complex Business UX", "Information Architecture", "Multi-state Design"],
    },
    image: "/brand-visuals/sothebys.jpg",
    imagePosition: "center",
    detailImages: [
      "/brand-visuals/sothebys.jpg",
      "/brand-visuals/sothebys-detail-auction.jpg",
      "/brand-visuals/sothebys-detail-art.jpg",
    ],
    tone: "sothebys",
  },
  {
    index: "03",
    slug: "nike",
    brand: "Nike",
    title: { zh: "中国官网 & 微信小程序", en: "China Website & WeChat Mini Program" },
    period: "2021—2022",
    role: { zh: "主导 UX 优化与交付", en: "Lead UX Optimization & Delivery" },
    summary: {
      zh: "在严格 Global 规范与成熟业务体系下主导核心交互优化、设计交付与开发验收。",
      en: "Led interaction optimization, design delivery and implementation review within rigorous global standards and a mature commerce ecosystem.",
    },
    scope: {
      zh: ["本土化体验", "设计交付", "运营灵活性"],
      en: ["Localization", "Design Delivery", "Operational Flexibility"],
    },
    image: "/brand-visuals/nike-house-of-innovation.jpg",
    imagePosition: "center",
    detailImages: [
      "/brand-visuals/nike-detail-digital.jpg",
      "/brand-visuals/nike-detail-customization.jpg",
      "/brand-visuals/nike-detail-community.jpg",
    ],
    tone: "nike",
  },
  {
    index: "04",
    slug: "chloe-gucci",
    brand: "Chloé / Gucci",
    title: { zh: "奢侈品牌数字体验", en: "Luxury Digital Experience" },
    period: "2019—2020",
    role: { zh: "主导 UX Design", en: "Lead UX Design" },
    summary: {
      zh: "围绕商品浏览、Quick View、商品信息与快捷加购，优化国际奢侈品牌在中国市场的数字购物体验。",
      en: "Optimized product discovery, Quick View, product information and fast add-to-cart for international luxury brands in China.",
    },
    scope: {
      zh: ["奢侈品电商", "Global-to-China", "电商 UX"],
      en: ["Luxury Commerce", "Global-to-China", "E-commerce UX"],
    },
    image: "/brand-visuals/chloe-boutique.webp",
    imagePosition: "center 48%",
    detailImages: [
      "/brand-visuals/chloe.jpg",
      "/brand-visuals/chloe-boutique.webp",
      "/brand-visuals/gucci-detail-space.jpg",
    ],
    tone: "chloe",
  },
];

const strategyCases = [
  {
    brand: "Canada Goose",
    visual: "CG",
    image: "/brand-visuals/canada-goose.jpg",
    tone: "strategy-cg",
    focus: { zh: "全球品牌中国数字体验策略", en: "Global-to-China Strategy" },
    description: {
      zh: "从 Brand / Product / Experience 三层构建跨渠道中国市场体验框架。",
      en: "A cross-channel China experience framework built across Brand, Product and Experience.",
    },
  },
  {
    brand: "Ray-Ban",
    visual: "RB",
    image: "/brand-visuals/ray-ban.jpg",
    tone: "strategy-rb",
    focus: { zh: "数字电商与 OMO 体验", en: "Commerce & OMO Experience" },
    description: {
      zh: "连接商城、会员、验光、门店与售后，形成连续的消费者旅程。",
      en: "Connecting commerce, membership, vision care, stores and after-sales into one journey.",
    },
  },
  {
    brand: "Tiffany Tmall",
    visual: "T",
    image: "/brand-visuals/tiffany-shanghai.jpg",
    tone: "strategy-tt",
    focus: { zh: "消费者体验与电商策略", en: "Consumer & Commerce Strategy" },
    description: {
      zh: "围绕礼赠、悦己、人生节点与会员关系重构品牌消费触点。",
      en: "Reframing gifting, self-purchase, life moments and membership touchpoints.",
    },
  },
  {
    brand: "MCM",
    visual: "M",
    image: "/brand-visuals/mcm.jpg",
    tone: "strategy-mcm",
    focus: { zh: "UX 诊断与电商优化", en: "UX Audit & Optimization" },
    description: {
      zh: "以 AS-IS / TO-BE 方法重构导航、商品、交易与会员体验。",
      en: "Restructuring navigation, product, transaction and membership through AS-IS / TO-BE analysis.",
    },
  },
  {
    brand: "Balenciaga Fragrance",
    visual: "BF",
    image: "/brand-visuals/balenciaga-fragrance.jpg",
    tone: "strategy-bf",
    focus: { zh: "香氛数字体验创新", en: "Digital Experience Innovation" },
    description: {
      zh: "以虚拟试香、人格测试与联觉体验探索无法被屏幕直接传递的气味。",
      en: "Exploring scent through virtual sampling, personality tests and multisensory concepts.",
    },
  },
  {
    brand: "Michelin",
    visual: "MI",
    image: "/brand-visuals/michelin.jpg",
    tone: "strategy-mi",
    focus: { zh: "产品策略与竞品研究", en: "Product Strategy & Research" },
    description: {
      zh: "围绕内容获取、决策信任与行动转化重构产品核心信息架构。",
      en: "Reframing information architecture around discovery, decision confidence and conversion.",
    },
  },
];

const capabilities = [
  {
    num: "01",
    title: { zh: "数字体验策略", en: "Digital Experience Strategy" },
    description: { zh: "消费者洞察、竞品分析、用户旅程与体验策略", en: "Consumer insight, competitive analysis, journeys and experience strategy" },
  },
  {
    num: "02",
    title: { zh: "UX 与产品设计", en: "UX & Product Design" },
    description: { zh: "信息架构、交互设计、原型与复杂电商体验", en: "Information architecture, interaction, prototyping and complex commerce" },
  },
  {
    num: "03",
    title: { zh: "国际品牌中国本土化", en: "Global-to-China" },
    description: { zh: "全球品牌规范与中国数字消费生态的本土化转译", en: "Translating global brand standards into China’s digital ecosystem" },
  },
  {
    num: "04",
    title: { zh: "设计交付", en: "Design Delivery" },
    description: { zh: "设计质量、跨团队协作、UAT 与上线交付", en: "Design quality, cross-functional collaboration, UAT and launch" },
  },
  {
    num: "05",
    title: { zh: "解决方案咨询", en: "Solution Consulting" },
    description: { zh: "体验诊断、解决方案规划与 Proposal Storyline", en: "UX audit, solution planning and proposal storytelling" },
  },
];

const timeline = [
  {
    year: "2025—Now",
    title: { zh: "策略与解决方案咨询", en: "Strategy & Solution Consulting" },
    detail: { zh: "核心参与国际品牌数字业务售前、体验策略与解决方案", en: "Core contributor to digital pre-sales, experience strategy and solution design for global brands" },
  },
  {
    year: "2024—2025",
    title: { zh: "Tiffany Design Head", en: "Tiffany Design Head" },
    detail: { zh: "大型奢侈品数字电商项目设计统筹与上线交付", en: "Design leadership and launch delivery for a large-scale luxury commerce program" },
  },
  {
    year: "2021—2023",
    title: { zh: "复杂数字平台", en: "Complex Platforms" },
    detail: { zh: "Nike 中国数字渠道与 Sotheby’s 复杂拍卖体验", en: "Nike China digital channels and Sotheby’s complex auction experience" },
  },
  {
    year: "2018—2020",
    title: { zh: "奢侈品牌本土化", en: "Luxury Localization" },
    detail: { zh: "Chloé、Gucci 等国际品牌中国数字体验", en: "China digital experiences for Chloé, Gucci and other global brands" },
  },
  {
    year: "2015—2018",
    title: { zh: "UX 专业基础", en: "UX Foundations" },
    detail: { zh: "Web、Mobile 与数字产品的交互和视觉设计基础", en: "Interaction and visual design foundations across web, mobile and digital products" },
  },
];

const brandGroups = [
  {
    title: { zh: "奢品 / 时尚", en: "Luxury / Fashion" },
    brands: [
      { name: "Tiffany & Co.", logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tiffany%20%26%20Co.%202024%20logo.svg", kind: "standard" },
      { name: "Gucci", logo: "/brand-logos/gucci-official.svg", kind: "standard" },
      { name: "Chloé", logo: "/brand-logos/chloe.svg", kind: "standard" },
      { name: "Balenciaga", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Balenciaga2017Logo.svg", kind: "standard" },
      { name: "MCM", logo: "/brand-logos/mcm-official.svg", kind: "standard logo-invert-source" },
      { name: "JACQUEMUS", logo: "/brand-logos/jacquemus-official.svg", kind: "standard" },
      { name: "Canada Goose", logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Canada_Goose_2023_logo.svg", kind: "standard" },
    ],
  },
  {
    title: { zh: "运动 / 生活", en: "Sports / Lifestyle" },
    brands: [
      { name: "Nike", logo: "/brand-logos/nike.svg", kind: "symbol" },
      { name: "KAILAS", logo: "/brand-logos/kailas.png", kind: "badge" },
      { name: "Ray-Ban", logo: "/brand-logos/ray-ban-official.svg", kind: "standard logo-rayban-scale" },
      { name: "Coach", logo: "/brand-logos/coach-official.svg", kind: "standard" },
      { name: "Gap", logo: "/brand-logos/gap.svg", kind: "badge" },
      { name: "Reebok", logo: "/brand-logos/reebok.svg", kind: "symbol" },
    ],
  },
  {
    title: { zh: "数字 / 消费", en: "Digital / Consumer" },
    brands: [
      { name: "Sotheby’s", logo: "/brand-logos/sothebys-official.svg", kind: "standard" },
      { name: "Michelin", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Michelin_Wordmark.svg", kind: "standard" },
      { name: "Armani", logo: "/brand-logos/armani-official.svg", kind: "standard" },
    ],
  },
];

const brandVisuals = [
  { brand: "Tiffany & Co.", image: "/brand-visuals/tiffany-shanghai.jpg", className: "brand-visual-lead", objectPosition: "center" },
  { brand: "Nike", image: "/brand-visuals/nike-house-of-innovation.jpg", className: "", objectPosition: "center 58%" },
  { brand: "Chloé", image: "/brand-visuals/chloe-boutique.webp", className: "", objectPosition: "center 48%" },
  { brand: "Sotheby’s", image: "/brand-visuals/sothebys.jpg", className: "brand-visual-bottom", objectPosition: "center 18%" },
];

const beyondWorkCards = [
  {
    num: "01",
    image: "/lifestyle-visuals/training.jpg",
    images: [
      "/lifestyle-visuals/training-01.jpg",
      "/lifestyle-visuals/training-02.jpg",
      "/lifestyle-visuals/training-03.jpg",
    ],
    icon: "training" as const,
    title: { zh: "综合体能训练", en: "Functional Fitness" },
    tags: "CrossFit · HYROX · Strength & Conditioning",
    description: {
      zh: "持续进行力量、耐力、爆发力与综合运动能力训练。对我而言，训练不仅是身体管理，也是一种长期建立专注力、自律与行动力的方式。",
      en: "I train across strength, endurance, power and overall athletic capacity. Fitness is not only physical—it is a long-term practice in focus, discipline and consistent execution.",
    },
  },
  {
    num: "02",
    image: "/lifestyle-visuals/hyrox.jpg",
    images: [
      "/lifestyle-visuals/competition-03.jpg",
      "/lifestyle-visuals/competition-01.jpg",
      "/lifestyle-visuals/competition-02.jpg",
      "/lifestyle-visuals/competition-04.jpg",
    ],
    icon: "competition" as const,
    title: { zh: "赛事与挑战", en: "Competition" },
    tags: "Quanli Games · XP · HYROX Men’s Individual Pro",
    description: {
      zh: "参加全力游戏、XP、HYROX 男子个人精英赛等赛事，在真实比赛环境中检验训练成果，并通过每一次准备、参赛与复盘寻找新的提升空间。",
      en: "I have competed in Quanli Games, XP and the HYROX Men’s Individual Pro division—testing preparation under pressure and using every race as a new point of reflection.",
    },
  },
  {
    num: "03",
    image: "/lifestyle-visuals/outdoor.jpg",
    images: [
      "/lifestyle-visuals/outdoor-01.jpg",
      "/lifestyle-visuals/outdoor-02.jpg",
      "/lifestyle-visuals/outdoor-03.jpg",
    ],
    icon: "outdoor" as const,
    title: { zh: "户外与生活", en: "Outdoor Life" },
    tags: "Outdoor · Energy · Perspective",
    description: {
      zh: "热爱户外活动，在城市、自然与运动之间切换节奏。通过身体体验保持能量，也让自己持续接触工作之外更真实、更丰富的世界。",
      en: "Outdoor activities help me reset my rhythm, maintain energy and stay connected with experiences beyond work and the screen.",
    },
  },
];

const copy = {
  zh: {
    nav: ["项目", "能力", "经历", "关于"],
    talk: "联系我",
    available: "正在关注资深设计与体验策略机会",
    heroTitle: "设计连接全球品牌",
    heroEm: "与中国市场的数字体验。",
    role: "资深 UX / 数字体验设计师",
    intro: "我是贺霜 Devil He。专注于奢侈品与国际消费品牌的数字体验，连接品牌愿景、商业目标与中国消费者。",
    explore: "查看代表项目",
    resume: "下载简历",
    profile: "01 / 个人简介",
    numbers: ["数字体验设计经验", "服务国际品牌", "设计项目管理经验", "专业项目管理认证"],
    positionLabel: "职业定位",
    positionLead: "我把复杂业务转译为清晰、可落地的数字体验。",
    positionEm: "从洞察与架构，到设计统筹、\n开发协同和上线交付。",
    pillars: [
      ["Global-to-China", "品牌本土化", "熟悉全球品牌规范与中国数字消费生态，在品牌一致性与本地体验之间建立平衡。"],
      ["End-to-end UX", "完整设计交付", "从需求拆解、信息架构与核心方案，到开发协作、UAT 和上线质量把控。"],
      ["Strategy & Solution", "策略与咨询", "将 UX 延伸至体验诊断、数字策略、解决方案规划与售前提案支持。"],
    ],
    deliveryLabel: "主导设计项目",
    deliveryTitle: "从品牌意图，\n到上线交付。",
    deliveryIntro: "以下项目均为设计执行与交付型项目，由我主导核心 UX 方案并推动落地。",
    expandDetails: "在当前页查看更多细节",
    collapseDetails: "收起项目细节",
    publicOverview: "展开内容仅呈现项目背景、核心贡献与交付价值；完整材料在线下面试中沟通。",
    strategyLabel: "数字体验策略与解决方案咨询",
    strategyTitle: "超越屏幕，",
    strategyEm: "构建体验系统。",
    strategyIntro: "2025—2026，作为 UX 核心专业角色参与国际品牌数字业务售前及解决方案项目，围绕客户 Brief、品牌战略与业务目标输出体验策略、概念与关键方案。",
    roleNote: "角色说明 — 核心参与，与业务、Account 及技术团队共同支持 Proposal 与 Pitch。",
    showMore: "展开其余案例",
    showLess: "收起案例",
    capabilitiesLabel: "核心能力",
    capabilitiesTitle: "策略建立在\n交付之上。",
    capabilitiesIntro: "从消费者洞察、信息架构与交互设计，到设计统筹、开发协同和上线交付；不只提出方向，也理解设计如何被真正使用。",
    capabilityModelKicker: "工作模型",
    capabilityModelTitle: "从问题到上线",
    capabilitySkillsKicker: "专业能力",
    capabilityModelSteps: [
      ["01", "洞察", "消费者 / 业务 / 品牌"],
      ["02", "设计", "架构 / 交互 / 原型"],
      ["03", "交付", "协作 / UAT / 上线"],
    ],
    experienceLabel: "职业经历",
    experienceTitle: "十年经验，\n持续从复杂中学习。",
    brandsLabel: "品牌经验",
    brandsCount: "服务品牌 20+",
    beyondLabel: "工作之外",
    beyondTitle: "在训练与比赛中，\n持续突破边界。",
    beyondIntro: "工作之外，我长期投入 CrossFit、HYROX 等综合体能训练，同时热爱健身与户外活动。训练与竞技让我持续练习目标拆解、节奏控制，以及在压力下保持专注与稳定。",
    lifestyleReference: "运动氛围图 / 待替换为个人照片",
    contactKicker: "期待资深 UX 与数字体验设计机会",
    contactTitle: "一起创造真正",
    contactEm: "有意义的体验。",
    roleFooter: "资深 UX / 数字体验设计师",
    back: "返回顶部",
    footer: "为清晰而设计，为结果而落地。",
  },
  en: {
    nav: ["Work", "Capabilities", "Experience", "Beyond"],
    talk: "Let’s talk",
    available: "Available for senior opportunities",
    heroTitle: "Designing digital experiences",
    heroEm: "where global brands meet China.",
    role: "Senior UX / Digital Experience Designer",
    intro: "I’m Devil He, creating digital experiences for luxury and global consumer brands by connecting brand vision, business goals and Chinese consumers.",
    explore: "Explore selected work",
    resume: "Download résumé",
    profile: "01 / Profile",
    numbers: ["Years in digital experience", "Global brands served", "Years in project management", "Certified professional"],
    positionLabel: "Positioning",
    positionLead: "I translate complex businesses into clear, buildable digital experiences.",
    positionEm: "From insight and architecture to design leadership, implementation and launch.",
    pillars: [
      ["Global-to-China", "Brand localization", "Balancing global brand standards with the behaviors and expectations of China’s digital consumers."],
      ["End-to-end UX", "Complete delivery", "From requirements and architecture to core UX, implementation collaboration, UAT and launch quality."],
      ["Strategy & Solution", "Strategy and consulting", "Extending UX into experience diagnosis, digital strategy, solution planning and pre-sales support."],
    ],
    deliveryLabel: "Selected delivery projects",
    deliveryTitle: "From brand intent\nto launch delivery.",
    deliveryIntro: "Delivery-led programs where I owned the core UX direction and helped move the work into production.",
    expandDetails: "View more details here",
    collapseDetails: "Close project details",
    publicOverview: "Expanded content covers project context, core contribution and delivery value only. Detailed materials are reserved for interviews.",
    strategyLabel: "Strategy & solution consulting",
    strategyTitle: "Beyond screens,",
    strategyEm: "toward systems.",
    strategyIntro: "Across 2025—2026, I contributed as a core UX specialist to pre-sales and solution programs for global brands, translating client briefs, brand strategies and business goals into experience direction and key concepts.",
    roleNote: "Role clarity — Core contributor working with business, account and technology teams to support proposals and pitches.",
    showMore: "Show selected cases",
    showLess: "Show fewer cases",
    capabilitiesLabel: "Capabilities",
    capabilitiesTitle: "Strategy grounded\nin delivery.",
    capabilitiesIntro: "From consumer insight and information architecture to design leadership, implementation and launch—I shape direction with a practical understanding of delivery.",
    capabilityModelKicker: "Working model",
    capabilityModelTitle: "From problem to launch",
    capabilitySkillsKicker: "Professional capabilities / What I bring",
    capabilityModelSteps: [
      ["01", "Insight", "Consumer / Business / Brand"],
      ["02", "Design", "Architecture / Interaction / Prototype"],
      ["03", "Delivery", "Collaboration / UAT / Launch"],
    ],
    experienceLabel: "Experience",
    experienceTitle: "A decade of learning\nthrough complexity.",
    brandsLabel: "Selected brand experience",
    brandsCount: "20+ brands served",
    beyondLabel: "Beyond work",
    beyondTitle: "Building strength.\nTesting limits.",
    beyondIntro: "Outside of design, I dedicate much of my time to CrossFit, HYROX and functional fitness, alongside strength training and outdoor activities. Training and competition continuously sharpen my discipline, pacing and ability to stay focused under pressure.",
    lifestyleReference: "Atmosphere image / replace with personal photo",
    contactKicker: "Open to senior UX & digital experience opportunities",
    contactTitle: "Let’s create something",
    contactEm: "meaningful.",
    roleFooter: "Senior UX / Digital Experience Designer",
    back: "Back to top",
    footer: "Designed for clarity, built with intention.",
  },
};

function local(value: LocalText, lang: Lang) {
  return value[lang];
}

function Multiline({ children }: { children: string }) {
  const parts = children.split("\n");
  return <>{parts.map((part, index) => <span key={part}>{part}{index < parts.length - 1 && <br />}</span>)}</>;
}

type LineIconName = "position" | "delivery" | "strategy" | "capability" | "experience" | "brands" | "training" | "competition" | "outdoor" | "mail" | "message" | "phone" | "download" | "work";

function LineIcon({ name }: { name: LineIconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.35, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<LineIconName, React.ReactNode> = {
    position: <><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2.5" /><path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" /></>,
    delivery: <><rect x="4" y="5" width="16" height="14" rx="1" /><path d="M8 9h8M8 13h5M16 16l1.5 1.5L21 14" /></>,
    strategy: <><circle cx="6" cy="17" r="2" /><circle cx="12" cy="7" r="2" /><circle cx="18" cy="15" r="2" /><path d="M7 15.5l4-6.5M13.5 8.5l3.2 4.8M8 17h8" /></>,
    capability: <><path d="M4 18V9l8-5 8 5v9l-8 3-8-3Z" /><path d="m4 9 8 4 8-4M12 13v8" /></>,
    experience: <><path d="M4 18h16M6 18V9h12v9M9 9V6h6v3" /><path d="M10 13h4" /></>,
    brands: <><path d="M4 8h16v11H4zM7 5h10v3" /><path d="M8 12h8M8 15h5" /></>,
    training: <><path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" /></>,
    competition: <><path d="M8 4h8v4c0 3-1.5 5-4 6-2.5-1-4-3-4-6V4Z" /><path d="M8 6H5v2c0 2 1.5 3 3.5 3M16 6h3v2c0 2-1.5 3-3.5 3M12 14v4M8 20h8" /></>,
    outdoor: <><path d="m3 19 6-10 3 5 3-4 6 9H3Z" /><path d="M16 5a2 2 0 1 0 0-4" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m4 7 8 6 8-6" /></>,
    message: <><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9h8M8 12h5" /></>,
    phone: <><path d="M7 3h3l1 5-2 1c1.2 3 3 4.8 6 6l1-2 5 1v3c0 2-1.5 4-4 4C9 20 4 15 3 7c0-2.5 2-4 4-4Z" /></>,
    download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" /></>,
    work: <><rect x="3" y="6" width="18" height="13" rx="1" /><path d="M9 6V4h6v2M3 11h18M10 11v2h4v-2" /></>,
  };
  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true" {...common}>{paths[name]}</svg>;
}

function SectionLabel({ number, icon, children, light = false }: { number: string; icon: LineIconName; children: React.ReactNode; light?: boolean }) {
  return <div className={`section-label${light ? " light" : ""}`}><LineIcon name={icon} /><span>{number}</span><b>{children}</b></div>;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllStrategy, setShowAllStrategy] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [beyondSlides, setBeyondSlides] = useState([0, 0, 0]);
  const c = copy[lang];

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested !== "en") return;
    const frame = window.requestAnimationFrame(() => setLang("en"));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setBeyondSlides((slides) => slides.map((value, index) =>
        (value + 1) % beyondWorkCards[index].images.length
      ));
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      ".numbers > div, .positioning-band > *, .section-heading > *, .project-card, .capability-intro > *, .capability-framework, .capability-row, .strategy-title, .strategy-copy, .strategy-card, .about-photo, .about-content, .brands-heading, .brand-visual-wall figure, .brand-group, .beyond-heading > *, .beyond-card, .contact-section > *"
    );
    targets.forEach((target, index) => {
      target.classList.add("motion-reveal");
      target.style.setProperty("--motion-order", String(index % 4));
    });
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={`site-shell lang-${lang}`}>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={lang === "zh" ? "返回首页" : "Back home"}>D<span>H</span></a>
        <button className={`mobile-menu-toggle${menuOpen ? " open" : ""}`} type="button" aria-label={lang === "zh" ? "打开导航" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? "open" : ""} aria-label={lang === "zh" ? "主导航" : "Main navigation"}>
          <a href="#work" onClick={() => setMenuOpen(false)}>{c.nav[0]}</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>{c.nav[1]}</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>{c.nav[2]}</a>
          <a href="#beyond" onClick={() => setMenuOpen(false)}>{c.nav[3]}</a>
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label={lang === "zh" ? "语言切换" : "Language switch"}>
            <button type="button" className={lang === "zh" ? "active" : ""} aria-pressed={lang === "zh"} onClick={() => setLang("zh")}>中</button>
            <span>/</span>
            <button type="button" className={lang === "en" ? "active" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
          </div>
          <a className="header-cta" href="#contact">{c.talk}</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker"><span>Shanghai, China</span><span>{c.available}</span></div>
        <h1>{c.heroTitle}<br /><em>{c.heroEm}</em></h1>
        <div className="hero-bottom">
          <div className="hero-intro">
            <p className="eyebrow">{c.role}</p>
            <p>{c.intro}</p>
            <div className="hero-actions">
              <a className="hero-link" href="#work"><LineIcon name="work" /><span>01</span>{c.explore}</a>
              <a className="hero-link" href="/Devil_He_Resume.pdf" target="_blank" rel="noreferrer"><LineIcon name="download" /><span>02</span>{c.resume}</a>
            </div>
          </div>
          <figure className="portrait-wrap">
            <div className="portrait-number">{c.profile}</div>
            <Image src="/devil-he-profile.jpg" width={930} height={1241} sizes="(max-width: 700px) 58vw, 240px" alt="Devil He portrait" priority />
          </figure>
        </div>
      </section>

      <section className="numbers" aria-label={lang === "zh" ? "职业概览" : "Career overview"}>
        {["10+", "20+", "05+", "PMP"].map((value, index) => (
          <div key={value}><strong>{value}</strong><span>{c.numbers[index]}</span></div>
        ))}
      </section>

      <section className="positioning-band">
        <SectionLabel number="02" icon="position">{c.positionLabel}</SectionLabel>
        <div className="positioning-statement">
          <p>{c.positionLead}</p>
          <span><Multiline>{c.positionEm}</Multiline></span>
        </div>
        <div className="positioning-points">
          {c.pillars.map(([kicker, title], index) => (
            <div key={kicker}><span>0{index + 1}</span><strong>{title}</strong><small>{kicker}</small></div>
          ))}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <SectionLabel number="03" icon="delivery" light>{c.deliveryLabel}</SectionLabel>
          <h2><Multiline>{c.deliveryTitle}</Multiline></h2>
          <p>{c.deliveryIntro}</p>
        </div>
        <div className="projects-grid">
          {[0, 1].map((column) => (
          <div className="project-column" key={column}>
          {deliveryProjects.filter((_, index) => index % 2 === column).map((project) => {
            const details = caseOverviews[project.slug];
            const isExpanded = expandedProject === project.slug;
            return (
            <article className={`project-card ${project.tone}${isExpanded ? " details-open" : ""}`} key={project.brand}>
              <div className="project-top"><span>{project.index}</span><span>{project.period}</span></div>
              <div className="project-visual">
                <Image src={project.image} width={1400} height={1000} sizes="(max-width: 700px) 100vw, 50vw" style={{ objectPosition: project.imagePosition }} alt="" />
              </div>
              <div className="project-content">
                <p className="project-role">{local(project.role, lang)}</p>
                <h3>{project.brand}</h3>
                <h4>{local(project.title, lang)}</h4>
                <p className="project-summary">{local(project.summary, lang)}</p>
                <ul>{project.scope[lang].map((item) => <li key={item}>{item}</li>)}</ul>
                <button
                  className="project-overview-toggle"
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`project-details-${project.slug}`}
                  onClick={() => setExpandedProject(isExpanded ? null : project.slug)}
                >
                  <span>{isExpanded ? c.collapseDetails : c.expandDetails}</span>
                  <b aria-hidden="true">{isExpanded ? "−" : "＋"}</b>
                </button>
                <div className={`project-detail-panel${isExpanded ? " open" : ""}`} id={`project-details-${project.slug}`} aria-hidden={!isExpanded}>
                  <div className="project-detail-inner">
                    {details.sections.map((section, sectionIndex) => (
                      <section className="project-detail-row" key={section.number}>
                        <span>{section.number}</span>
                        <figure className="project-detail-visual">
                          <Image src={project.detailImages[sectionIndex]} width={720} height={480} sizes="(max-width: 700px) 85vw, 180px" alt="" />
                        </figure>
                        <div><h5>{local(section.title, lang)}</h5><p>{local(section.body, lang)}</p></div>
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );})}
          </div>
          ))}
        </div>
        <p className="public-overview-note">{c.publicOverview}</p>
      </section>

      <section className="capabilities-section" id="approach">
        <div className="capability-intro">
          <SectionLabel number="04" icon="capability">{c.capabilitiesLabel}</SectionLabel>
          <h2><Multiline>{c.capabilitiesTitle}</Multiline></h2>
          <p>{c.capabilitiesIntro}</p>
        </div>
        <div className="capability-framework">
          <div className="framework-head"><span>{c.capabilityModelKicker}</span><strong>{c.capabilityModelTitle}</strong></div>
          <div className="framework-steps">
            {c.capabilityModelSteps.map(([number, title, detail]) => (
              <div className="framework-step" key={number}><span>{number}</span><strong>{title}</strong><small>{detail}</small></div>
            ))}
          </div>
        </div>
        <div className="capability-skills-kicker">{c.capabilitySkillsKicker}</div>
        <div className="capabilities-list">
          {capabilities.map((item) => (
            <div className="capability-row" key={item.num}>
              <span>{item.num}</span><h3>{local(item.title, lang)}</h3><p>{local(item.description, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="strategy-section">
        <div className="strategy-title">
          <SectionLabel number="05" icon="strategy">{c.strategyLabel}</SectionLabel>
          <h2>{c.strategyTitle}<br /><em>{c.strategyEm}</em></h2>
        </div>
        <div className="strategy-copy">
          <p>{c.strategyIntro}</p>
          <p className="role-note">{c.roleNote}</p>
        </div>
        <div className={`strategy-grid${showAllStrategy ? " expanded" : ""}`}>
          {strategyCases.map((item, index) => (
            <article className="strategy-card" key={item.brand}>
              <div className={`strategy-media ${item.tone}`}>
                <Image src={item.image} width={1400} height={1000} sizes="(max-width: 700px) 100vw, 33vw" alt="" />
                <span className="strategy-index">{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.visual}</strong>
              </div>
              <div className="strategy-card-copy">
                <small>{local(item.focus, lang)}</small>
                <h3>{item.brand}</h3>
                <p>{local(item.description, lang)}</p>
              </div>
            </article>
          ))}
        </div>
        <button className="strategy-toggle" type="button" aria-expanded={showAllStrategy} onClick={() => setShowAllStrategy((value) => !value)}>{showAllStrategy ? c.showLess : c.showMore}</button>
      </section>

      <section className="about-section" id="about">
        <div className="about-photo"><Image src="/devil-he-about.jpg" width={1080} height={1620} sizes="(max-width: 900px) 100vw, 50vw" alt="Devil He in Shanghai" /><span>Devil He — Shanghai</span></div>
        <div className="about-content">
          <SectionLabel number="06" icon="experience" light>{c.experienceLabel}</SectionLabel>
          <h2><Multiline>{c.experienceTitle}</Multiline></h2>
          <div className="timeline">
            {timeline.map((item) => (
              <div className="timeline-row" key={item.year}>
                <span>{item.year}</span><strong>{local(item.title, lang)}</strong><p>{local(item.detail, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="brands" className="brands-section">
        <div className="brands-heading">
          <SectionLabel number="07" icon="brands">{c.brandsLabel}</SectionLabel>
          <strong>{c.brandsCount}</strong>
        </div>
        <div className="brand-visual-wall">
          {brandVisuals.map((item) => (
            <figure className={item.className} key={item.brand}>
              <Image src={item.image} width={1400} height={1000} sizes="(max-width: 700px) 100vw, 50vw" style={{ objectPosition: item.objectPosition }} alt={`${item.brand} brand environment`} />
              <figcaption><strong>{item.brand}</strong></figcaption>
            </figure>
          ))}
        </div>
        <div className="brand-groups">
          {brandGroups.map((group, index) => (
            <article className="brand-group" key={group.title.en}>
              <span>0{index + 1}</span>
              <h3>{local(group.title, lang)}</h3>
              <div className="brand-marks">
                {group.brands.map((brand) => (
                  <div className={`brand-mark logo-${brand.kind}${brand.logo ? "" : " wordmark-only"}`} key={brand.name}>
                    <span className="brand-logo-frame">
                      {brand.logo ? <img src={brand.logo} alt={`${brand.name} logo`} loading="lazy" style={brand.kind.includes("invert-source") ? { filter: "brightness(0)" } : undefined} /> : <strong>{brand.name}</strong>}
                    </span>
                    <small>{brand.name}</small>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="beyond-section" id="beyond">
        <div className="beyond-heading">
          <SectionLabel number="08" icon="training">{c.beyondLabel}</SectionLabel>
          <h2><Multiline>{c.beyondTitle}</Multiline></h2>
          <p>{c.beyondIntro}</p>
        </div>
        <div className="beyond-grid">
          {beyondWorkCards.map((item, cardIndex) => {
            const carouselImages = item.images;
            const activeSlide = beyondSlides[cardIndex] ?? 0;
            return (
            <article className="beyond-card" key={item.num}>
              <div className={`beyond-image${carouselImages ? " beyond-carousel" : ""}`}>
                <Image key={carouselImages[activeSlide]} src={carouselImages[activeSlide]} width={1400} height={1000} sizes="(max-width: 700px) 100vw, 33vw" alt={`${local(item.title, lang)} ${activeSlide + 1}`} />
                {carouselImages ? (
                  <div className="beyond-carousel-controls">
                    <button type="button" aria-label={lang === "zh" ? "上一张" : "Previous image"} onClick={() => setBeyondSlides((slides) => slides.map((value, index) => index === cardIndex ? (value - 1 + carouselImages.length) % carouselImages.length : value))}>←</button>
                    <span>{String(activeSlide + 1).padStart(2, "0")} / {String(carouselImages.length).padStart(2, "0")}</span>
                    <button type="button" aria-label={lang === "zh" ? "下一张" : "Next image"} onClick={() => setBeyondSlides((slides) => slides.map((value, index) => index === cardIndex ? (value + 1) % carouselImages.length : value))}>→</button>
                  </div>
                ) : <span>{c.lifestyleReference}</span>}
              </div>
              <div className="beyond-card-top"><LineIcon name={item.icon} /><span>{item.num}</span></div>
              <h3>{local(item.title, lang)}</h3>
              <small>{item.tags}</small>
              <p>{local(item.description, lang)}</p>
            </article>
          );})}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-kicker">{c.contactKicker}</div>
        <h2><span>{c.contactTitle}</span><em>{c.contactEm}</em></h2>
        <div className="contact-bottom">
          <div><p>Shanghai, China</p><p>{c.roleFooter}</p></div>
          <div className="contact-links">
            <a href="mailto:devilhe520@gmail.com"><LineIcon name="mail" />devilhe520@gmail.com</a>
            <a href="mailto:1240251878@qq.com"><LineIcon name="message" />1240251878@qq.com</a>
            <a href="tel:+8617628040172"><LineIcon name="phone" />+86 176 2804 0172</a>
          </div>
        </div>
      </section>

      <footer><span>© 2026 Devil He</span><span>{c.footer}</span><a href="#top">{c.back}</a></footer>
    </main>
  );
}
