"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Category = "brand" | "poster" | "illustration";

type WorkImage = {
  src: string;
  thumb: string;
  alt: string;
};

type Project = {
  id: string;
  number: string;
  category: Category;
  categoryLabel: string;
  title: string;
  english: string;
  summary: string;
  tags: string[];
  accent: string;
  images: WorkImage[];
};

const image = (name: string, alt: string): WorkImage => ({
  src: `/works/full/${name}.webp`,
  thumb: `/works/thumb/${name}.webp`,
  alt,
});

const projects: Project[] = [
  {
    id: "paopao",
    number: "01",
    category: "brand",
    categoryLabel: "品牌系统",
    title: "Pao泡宠物品牌",
    english: "PAO PAW BRAND SYSTEM",
    summary:
      "以温暖陪伴为核心，将软萌角色、包装语言与多场景触点整合为一致的宠物品牌体验。",
    tags: ["IP 形象", "包装", "场景应用"],
    accent: "#ff7f93",
    images: [
      image("design-paopao-application", "Pao泡宠物品牌场景应用展板"),
      image("design-paopao-packaging", "Pao泡宠物食品包装与细节设计"),
      image("design-paopao-harness", "Pao泡宠物胸背带产品设计"),
      image("design-paopao-guidelines", "Pao泡品牌标志规范与延展"),
    ],
  },
  {
    id: "pawnest",
    number: "02",
    category: "brand",
    categoryLabel: "品牌系统",
    title: "PawNest 吾窝",
    english: "PET LIFESTYLE IDENTITY",
    summary:
      "从“宠物与家共享生活”出发，建立柔和、克制且适合多品类延展的生活方式品牌。",
    tags: ["VI 设计", "产品系列", "生活方式"],
    accent: "#ff6c4d",
    images: [
      image("design-pawnest-identity", "PawNest吾窝宠物生活品牌视觉识别"),
      image("design-pawnest-range", "PawNest吾窝宠物产品系列设计"),
      image("design-pawnest-detail", "PawNest吾窝宠物外出包细节设计"),
    ],
  },
  {
    id: "huoluer",
    number: "03",
    category: "brand",
    categoryLabel: "IP 设计",
    title: "活路儿民艺 IP",
    english: "FOLK CRAFT IP DESIGN",
    summary:
      "提取传统民艺的造型与色彩记忆，用亲和的角色语言连接非遗内容和年轻受众。",
    tags: ["非遗活化", "角色设计", "视觉展板"],
    accent: "#f1ba3f",
    images: [image("design-huoluer-ip", "活路儿民艺IP品牌设计展板")],
  },
  {
    id: "dunhuang",
    number: "04",
    category: "poster",
    categoryLabel: "文化海报",
    title: "敦煌文旅季",
    english: "DUNHUANG CULTURAL JOURNEY",
    summary:
      "以飞天、壁画色谱与丝路意象重组文旅叙事，让传统文化在当代版式中重新流动。",
    tags: ["文旅视觉", "东方美学", "系列海报"],
    accent: "#d38b46",
    images: [
      image("design-dunhuang-01", "敦煌文旅季飞天主题海报"),
      image("design-dunhuang-02", "敦煌文旅季系列视觉海报"),
    ],
  },
  {
    id: "environment",
    number: "05",
    category: "poster",
    categoryLabel: "公益海报",
    title: "共生环境议题",
    english: "COEXISTENCE POSTER SERIES",
    summary:
      "围绕海洋塑料与空气生态两组议题，将环境数据转译为具有传播张力的视觉隐喻。",
    tags: ["公益传播", "视觉隐喻", "议题设计"],
    accent: "#67b8d6",
    images: [
      image("design-ocean-poster", "关注海洋塑料污染的公益海报"),
      image("design-breathe-poster", "关注空气与森林生态的公益海报"),
    ],
  },
  {
    id: "eastern-animals",
    number: "06",
    category: "illustration",
    categoryLabel: "手绘创作",
    title: "动物与东方意象",
    english: "EASTERN ANIMAL STUDIES",
    summary:
      "用线描、色彩与水墨层次刻画动物结构，在具象造型中保留装饰性与叙事感。",
    tags: ["钢笔线描", "综合材料", "造型研究"],
    accent: "#c9ff63",
    images: [
      image("hand-armored-horse", "东方装饰马匹钢笔线描作品"),
      image("hand-cranes", "双鹤水墨与炭笔手绘作品"),
      image("hand-silk-road-horse", "丝路主题彩色马匹插画"),
    ],
  },
  {
    id: "object-imagination",
    number: "07",
    category: "illustration",
    categoryLabel: "手绘创作",
    title: "器物与想象",
    english: "OBJECTS & IMAGINATION",
    summary:
      "从电话、器皿与游乐设施等日常物件出发，通过超现实组合拓展画面的故事空间。",
    tags: ["创意素描", "线描插画", "构成练习"],
    accent: "#a7a0ff",
    images: [
      image("hand-night-ferris", "夜色摩天轮主题幻想手绘"),
      image("hand-vintage-telephone", "复古电话主题线描作品"),
      image("hand-bowl-illustration", "器皿主题黑白创意插画"),
    ],
  },
  {
    id: "figure-study",
    number: "08",
    category: "illustration",
    categoryLabel: "基础造型",
    title: "人物素描研究",
    english: "FIGURE DRAWING STUDY",
    summary:
      "以人物动态、体块与明暗关系为重点，持续训练观察力和视觉表达的基本功。",
    tags: ["人物速写", "炭笔", "光影研究"],
    accent: "#efebe2",
    images: [image("hand-portrait-study", "坐姿人物炭笔素描研究")],
  },
];

const filters: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "全部作品" },
  { key: "brand", label: "品牌设计" },
  { key: "poster", label: "海报设计" },
  { key: "illustration", label: "手绘创作" },
];

export default function PortfolioClient() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const filteredProjects = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(height > 0 ? window.scrollY / height : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [filter]);

  const closeProject = useCallback(() => setActiveProject(null), []);

  const moveImage = useCallback(
    (step: number) => {
      if (!activeProject) return;
      setActiveImage(
        (current) =>
          (current + step + activeProject.images.length) %
          activeProject.images.length,
      );
    },
    [activeProject],
  );

  useEffect(() => {
    if (!activeProject) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
      if (event.key === "ArrowRight") moveImage(1);
      if (event.key === "ArrowLeft") moveImage(-1);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [activeProject, closeProject, moveImage]);

  const openProject = (project: Project) => {
    setActiveImage(0);
    setActiveProject(project);
  };

  const moveHero = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--hero-x", `${x}`);
    event.currentTarget.style.setProperty("--hero-y", `${y}`);
  };

  return (
    <main>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <nav className="top-nav" aria-label="主导航">
        <a className="monogram" href="#top" aria-label="返回首页">
          M<span>·</span>C
        </a>
        <div className="nav-links">
          <a href="#works">作品</a>
          <a href="#process">方法</a>
          <a href="#about">关于</a>
        </div>
        <a className="nav-cta" href="#contact">
          联系合作 <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section id="top" className="hero" onPointerMove={moveHero}>
        <div className="hero-noise" aria-hidden="true" />
        <div className="orb orb-one" aria-hidden="true" />
        <div className="orb orb-two" aria-hidden="true" />

        <div className="hero-kicker" data-reveal>
          <span>Portfolio 2024—2026</span>
          <span>Shanghai · China</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow" data-reveal>
            VISUAL DESIGNER · AIGC EXPLORER
          </p>
          <h1 data-reveal>
            <span>牟成露</span>
            <em>MOU CHENGLU</em>
          </h1>
          <p className="hero-statement" data-reveal>
            在传统造型与当代视觉系统之间，
            <br />
            构建有温度的品牌叙事。
          </p>
        </div>

        <div className="hero-art" aria-label="精选作品预览">
          <figure className="hero-card hero-card-a">
            <img
              src="/works/thumb/design-dunhuang-01.webp"
              alt="敦煌文旅季海报局部"
            />
          </figure>
          <figure className="hero-card hero-card-b">
            <img
              src="/works/thumb/hand-silk-road-horse.webp"
              alt="丝路主题马匹手绘局部"
            />
          </figure>
          <figure className="hero-card hero-card-c">
            <img
              src="/works/thumb/design-paopao-application.webp"
              alt="Pao泡宠物品牌场景应用局部"
            />
          </figure>
          <span className="hero-art-index">SELECTED / 03</span>
        </div>

        <div className="hero-footer">
          <div className="hero-stats" data-reveal>
            <div>
              <strong>19</strong>
              <span>件作品</span>
            </div>
            <div>
              <strong>08</strong>
              <span>组系列</span>
            </div>
            <div>
              <strong>02</strong>
              <span>创作方向</span>
            </div>
          </div>
          <a className="scroll-cue" href="#works" aria-label="向下浏览作品">
            <span>SCROLL TO EXPLORE</span>
            <i aria-hidden="true">↓</i>
          </a>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, group) => (
            <span key={group}>
              BRAND IDENTITY <i>✦</i> CULTURAL POSTER <i>✦</i> HAND DRAWING{" "}
              <i>✦</i> AIGC WORKFLOW <i>✦</i> VISUAL STORYTELLING <i>✦</i>{" "}
            </span>
          ))}
        </div>
      </div>

      <section id="works" className="works-section section-shell">
        <header className="section-heading" data-reveal>
          <div>
            <span className="section-index">01 / SELECTED WORKS</span>
            <h2>精选项目</h2>
          </div>
          <p>
            从品牌策略、文化传播到手绘基础，
            <br />
            以清晰的问题意识组织视觉表达。
          </p>
        </header>

        <div className="filter-bar" role="group" aria-label="筛选作品">
          {filters.map((item) => (
            <button
              key={item.key}
              className={filter === item.key ? "active" : ""}
              type="button"
              onClick={() => setFilter(item.key)}
              aria-pressed={filter === item.key}
            >
              {item.label}
              <span>
                {item.key === "all"
                  ? projects.length
                  : projects.filter((project) => project.category === item.key)
                      .length}
              </span>
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filteredProjects.map((project, projectIndex) => (
            <article
              key={project.id}
              className={`project-card project-card-${projectIndex % 3}`}
              style={{ "--accent": project.accent } as React.CSSProperties}
              data-reveal
            >
              <button
                className="project-cover"
                type="button"
                onClick={() => openProject(project)}
                aria-label={`查看${project.title}项目详情`}
              >
                <img
                  src={project.images[0].thumb}
                  alt={project.images[0].alt}
                  loading="lazy"
                />
                <span className="cover-shade" aria-hidden="true" />
                <span className="view-project">
                  VIEW
                  <i aria-hidden="true">↗</i>
                </span>
                <span className="image-count">
                  {String(project.images.length).padStart(2, "0")} IMAGES
                </span>
              </button>
              <div className="project-meta">
                <span className="project-number">{project.number}</span>
                <div>
                  <p>{project.categoryLabel}</p>
                  <h3>{project.title}</h3>
                  <span>{project.english}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="process-section">
        <div className="process-shell section-shell">
          <header className="section-heading light" data-reveal>
            <div>
              <span className="section-index">02 / DESIGN METHOD</span>
              <h2>设计不是结果，<br />而是一套判断。</h2>
            </div>
            <p>
              将 AI 作为研究、发散与验证工具，
              <br />
              最终回到真实语境与视觉系统。
            </p>
          </header>

          <div className="process-grid">
            {[
              ["01", "需求解构", "Brief Analysis", "拆解受众、场景与传播目标，先找到问题，再寻找形式。"],
              ["02", "视觉方向", "Art Direction", "建立关键词、情绪板与形式边界，保证创意具有明确指向。"],
              ["03", "生成与校验", "AI Iteration", "用生成式工具扩展可能性，并通过审美判断、事实与版权意识逐轮筛选。"],
              ["04", "系统化落地", "System Delivery", "统一字体、色彩、版式与触点，让概念成为可持续使用的设计系统。"],
            ].map(([number, title, english, body]) => (
              <article key={number} className="process-card" data-reveal>
                <span>{number}</span>
                <div className="process-line" aria-hidden="true" />
                <p>{english}</p>
                <h3>{title}</h3>
                <div>{body}</div>
              </article>
            ))}
          </div>

          <div className="process-note" data-reveal>
            <span>AIGC POSITION</span>
            <p>
              AI 提升的是探索密度，不替代创作者的观察、判断与责任。
              我关注从提示策略、图像生成到版式落地的完整链路，
              并持续验证每一次生成是否真正服务于设计目标。
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="about-section section-shell">
        <div className="about-mark" aria-hidden="true">
          M<span>C</span>
        </div>
        <div className="about-content" data-reveal>
          <span className="section-index">03 / ABOUT</span>
          <h2>
            保持手的温度，
            <br />
            也拥抱工具的速度。
          </h2>
          <div className="about-columns">
            <p>
              我是牟成露，一名数字媒体艺术设计专业学生。我的创作横跨品牌视觉、
              公益海报与手绘表达，关注传统文化、情感体验和新技术之间的连接。
            </p>
            <p>
              我把 AIGC 视作设计流程中的协作者：用它加速资料研究与视觉发散，
              再以设计判断完成筛选、修正与系统化表达。
            </p>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-top section-shell">
          <span>AVAILABLE FOR INTERNSHIP & COLLABORATION</span>
          <h2>让我们一起<br />创造新的视觉叙事。</h2>
          <a href="#top">
            VIEW FROM TOP <i aria-hidden="true">↑</i>
          </a>
        </div>
        <div className="footer-bottom section-shell">
          <span>© 2026 牟成露 · MOU CHENGLU</span>
          <span>VISUAL DESIGN PORTFOLIO</span>
          <span>DESIGNED WITH CARE</span>
        </div>
      </footer>

      {activeProject && (
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title}项目详情`}
        >
          <button
            className="modal-backdrop"
            type="button"
            onClick={closeProject}
            aria-label="关闭项目详情"
          />
          <div className="modal-panel">
            <header className="modal-header">
              <div>
                <span>
                  {activeProject.number} / {activeProject.categoryLabel}
                </span>
                <h2>{activeProject.title}</h2>
                <p>{activeProject.english}</p>
              </div>
              <button type="button" onClick={closeProject} aria-label="关闭">
                <span>CLOSE</span> ×
              </button>
            </header>

            <div className="modal-content">
              <div className="modal-visual">
                <img
                  key={activeProject.images[activeImage].src}
                  src={activeProject.images[activeImage].src}
                  alt={activeProject.images[activeImage].alt}
                />
                {activeProject.images.length > 1 && (
                  <>
                    <button
                      className="modal-arrow prev"
                      type="button"
                      onClick={() => moveImage(-1)}
                      aria-label="上一张"
                    >
                      ←
                    </button>
                    <button
                      className="modal-arrow next"
                      type="button"
                      onClick={() => moveImage(1)}
                      aria-label="下一张"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              <aside className="modal-info">
                <p>{activeProject.summary}</p>
                <div className="modal-tags">
                  {activeProject.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="modal-thumbs">
                  {activeProject.images.map((item, index) => (
                    <button
                      key={item.src}
                      type="button"
                      className={index === activeImage ? "active" : ""}
                      onClick={() => setActiveImage(index)}
                      aria-label={`查看第${index + 1}张作品`}
                    >
                      <img src={item.thumb} alt="" />
                    </button>
                  ))}
                </div>
                <span className="modal-counter">
                  {String(activeImage + 1).padStart(2, "0")} /{" "}
                  {String(activeProject.images.length).padStart(2, "0")}
                </span>
              </aside>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
