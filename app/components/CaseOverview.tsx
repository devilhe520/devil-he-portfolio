"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CaseLanguage, CaseOverviewData, CaseText } from "../data/case-overviews";

function text(value: CaseText, lang: CaseLanguage) {
  return value[lang];
}

const ui = {
  zh: {
    back: "返回代表项目",
    label: "公开项目概览",
    visual: "公开品牌氛围图",
    noteTitle: "保密说明",
    note: "由于客户项目保密要求，本页面仅呈现项目背景、角色与高层贡献。完整设计过程、界面及交付材料仅在线下面试中沟通。",
    contact: "联系我",
    resume: "下载简历",
    next: "继续查看代表项目",
  },
  en: {
    back: "Back to selected work",
    label: "Public project overview",
    visual: "Public brand atmosphere visual",
    noteTitle: "Confidentiality",
    note: "Due to client confidentiality, this page presents project context, role and high-level contribution only. Detailed processes, interfaces and delivery materials are reserved for interviews.",
    contact: "Get in touch",
    resume: "Download résumé",
    next: "Continue exploring selected work",
  },
};

export default function CaseOverview({ data }: { data: CaseOverviewData }) {
  const [lang, setLang] = useState<CaseLanguage>("zh");
  const c = ui[lang];

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested !== "en") return;
    const frame = window.requestAnimationFrame(() => setLang("en"));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  return (
    <main className="case-page" style={{ "--case-accent": data.accent } as React.CSSProperties}>
      <header className="case-header">
        <a className="case-wordmark" href={`/?lang=${lang}#work`}>D<span>H</span></a>
        <a className="case-back" href={`/?lang=${lang}#work`}>{c.back}</a>
        <div className="case-language" aria-label={lang === "zh" ? "语言切换" : "Language switch"}>
          <button type="button" className={lang === "zh" ? "active" : ""} onClick={() => setLang("zh")}>中</button><span>/</span><button type="button" className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </header>

      <section className="case-hero">
        <div className="case-hero-meta"><span>{data.index}</span><span>{c.label}</span><span>{data.period}</span></div>
        <h1>{data.brand}</h1>
        <div className="case-hero-bottom">
          <div><p className="case-category">{text(data.category, lang)}</p><p className="case-role">{text(data.role, lang)}</p></div>
          <p className="case-summary">{text(data.summary, lang)}</p>
        </div>
      </section>

      <figure className="case-cover">
        <Image
          src={data.image}
          width={1800}
          height={1200}
          sizes="100vw"
          style={{ objectPosition: data.imagePosition ?? "center" }}
          alt=""
          priority
        />
        <figcaption>{c.visual}</figcaption>
      </figure>

      <section className="case-facts" aria-label={lang === "zh" ? "项目概况" : "Project facts"}>
        {data.facts.map((item) => <div key={item.label.en}><span>{text(item.label, lang)}</span><strong>{text(item.value, lang)}</strong></div>)}
      </section>

      <section className="case-sections">
        {data.sections.map((section) => (
          <article key={section.number}>
            <span>{section.number}</span>
            <h2>{text(section.title, lang)}</h2>
            <p>{text(section.body, lang)}</p>
          </article>
        ))}
      </section>

      <aside className="case-confidentiality">
        <span>{c.noteTitle}</span><p>{c.note}</p>
      </aside>

      <section className="case-footer-cta">
        <p>{c.next}</p>
        <div><a href={`/?lang=${lang}#work`}>{c.back}</a><a href="/Devil_He_Resume.pdf" target="_blank" rel="noreferrer">{c.resume}</a><a href="mailto:devilhe520@gmail.com">{c.contact}</a></div>
      </section>
    </main>
  );
}
