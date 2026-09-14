import './style.css';
import { content, profile, projects, type Category, type Content, type Lang, type TermLine, type TimelineItem } from './data';

const app = document.querySelector<HTMLDivElement>('#app')!;
const LANG_KEY = 'portfolio-lang';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lang: Lang = initialLang();
let activeFilter: 'all' | Category = 'all';
let terminalRun = 0;

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* storage no disponible */
  }
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es';
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const icons = {
  github:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 6h18v12H3zM3 7l9 6 9-6"/></svg>',
  download:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0-5-5m5 5 5-5M4 21h16"/></svg>',
  external:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 4h6v6m0-6L10 14M18 14v6H4V6h6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  trophy:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H4v1a4 4 0 0 0 4 4m8-5h4v1a4 4 0 0 1-4 4m-4 2v4m-4 3h8"/></svg>',
  lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>',
};

const categoryGlyph: Record<Category, string> = { web: '&lt;/&gt;', mobile: '[▯]', game: '(◉)' };

function sectionTitle(index: number, id: string, title: string): string {
  return `
    <header class="section-head reveal">
      <span class="section-index">0${index}.</span>
      <h2 id="${id}-title">${title}</h2>
      <span class="section-rule" aria-hidden="true"></span>
    </header>`;
}

function renderNav(t: Content): string {
  const links = (['about', 'awards', 'projects', 'skills', 'experience', 'contact'] as const)
    .map((key) => `<li><a href="#${key}" data-nav="${key}"><span class="accent">./</span>${t.nav[key]}</a></li>`)
    .join('');
  return `
    <nav class="nav" aria-label="Principal">
      <div class="container nav-inner">
        <a class="brand" href="#top"><span class="accent">~/</span>diego-zurita<span class="caret">_</span></a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Menú">${icons.menu}</button>
        <ul class="nav-links" id="nav-links">${links}</ul>
        <button class="lang-toggle" type="button" aria-label="${t.toggleLabel}">
          <span class="${lang === 'es' ? 'on' : ''}">ES</span><span class="sep">/</span><span class="${lang === 'en' ? 'on' : ''}">EN</span>
        </button>
      </div>
    </nav>`;
}

function renderHero(t: Content): string {
  return `
    <section class="hero container" id="top">
      <div class="hero-text">
        <p class="status"><span class="dot" aria-hidden="true"></span>${t.hero.status}</p>
        <p class="hero-greeting mono">${t.hero.greeting}</p>
        <h1>${profile.shortName}<span class="accent">.</span></h1>
        <p class="hero-role mono"><span class="accent">&gt;</span> ${t.hero.role}</p>
        <p class="hero-tagline">${t.hero.tagline}</p>
        <p class="hero-location mono">${icons.pin}${profile.location}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#projects">${t.hero.ctaProjects}</a>
          <a class="btn" href="${profile.cv}" download>${icons.download}${t.hero.ctaCv}</a>
          <a class="btn btn-icon" href="${profile.github}" target="_blank" rel="noopener" aria-label="GitHub">${icons.github}</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="photo-frame">
          <img src="${profile.photo}" alt="${profile.name}" width="560" height="560" />
        </div>
        <div class="terminal" role="img" aria-label="${t.hero.terminal.map((l) => l.text).join('. ')}">
          <div class="terminal-bar" aria-hidden="true">
            <span></span><span></span><span></span>
            <p>diego@portfolio: ~</p>
          </div>
          <div class="terminal-body mono" id="terminal-body" aria-hidden="true"></div>
        </div>
      </div>
    </section>`;
}

function renderAbout(t: Content): string {
  const stats = t.about.stats
    .map((s) => `<li class="stat"><span class="stat-value mono">${s.value}</span><span class="stat-label">${s.label}</span></li>`)
    .join('');
  return `
    <section class="section container" id="about" aria-labelledby="about-title">
      ${sectionTitle(1, 'about', t.about.title)}
      <div class="about-grid">
        <div class="about-text reveal">${t.about.paragraphs.map((p) => `<p>${p}</p>`).join('')}</div>
        <ul class="stats reveal">${stats}</ul>
      </div>
    </section>`;
}

function renderAwards(t: Content): string {
  const cards = t.awards.items
    .map(
      (a, i) => `
      <article class="card award reveal">
        <button class="award-image" type="button" data-cert="${i}" aria-label="${t.awards.view}: ${a.title}">
          <img src="${a.image}" alt="" loading="lazy" width="1100" height="750" />
          <span class="award-zoom mono">${t.awards.view} ↗</span>
        </button>
        <div class="award-body">
          <p class="award-icon">${icons.trophy}<span class="mono">${a.date}</span></p>
          <h3>${a.title}</h3>
          <p class="muted">${a.detail}</p>
          <p class="award-issuer">${t.awards.issuer}</p>
        </div>
      </article>`,
    )
    .join('');
  return `
    <section class="section container" id="awards" aria-labelledby="awards-title">
      ${sectionTitle(2, 'awards', t.awards.title)}
      <p class="section-intro reveal">${t.awards.intro}</p>
      <div class="awards-grid">${cards}</div>
      <div class="events">${t.awards.events
        .map(
          (e) => `
        <article class="card event reveal">
          <span class="event-icon" aria-hidden="true">🎮</span>
          <div>
            <p class="event-place mono">${e.place}</p>
            <h3>${e.title}</h3>
            <p class="muted">${e.role} <a class="event-link" href="#project-${e.projectSlug}">${e.projectName} ↓</a></p>
          </div>
        </article>`,
        )
        .join('')}</div>
      <dialog class="lightbox" id="lightbox">
        <form method="dialog"><button class="lightbox-close" aria-label="Cerrar">✕</button></form>
        <img src="" alt="" />
      </dialog>
    </section>`;
}

function renderProjects(t: Content): string {
  const filters = (['all', 'web', 'mobile', 'game'] as const)
    .map(
      (f) =>
        `<button type="button" class="filter ${f === activeFilter ? 'active' : ''}" data-filter="${f}" aria-pressed="${f === activeFilter}">${t.projects.filters[f]}</button>`,
    )
    .join('');
  const cards = projects
    .map(
      (p) => `
      <article class="card project reveal" id="project-${p.slug}" data-category="${p.category}" ${activeFilter !== 'all' && activeFilter !== p.category ? 'hidden' : ''}>
        <div class="project-top">
          <span class="project-glyph mono" aria-hidden="true">${categoryGlyph[p.category]}</span>
          <span class="project-path mono">~/${t.projects.filters[p.category].toLowerCase()}/${p.slug}</span>
        </div>
        ${p.badge ? `<p class="project-badge mono">★ ${p.badge[lang]}</p>` : ''}
        <h3>${p.name}${p.team ? `<span class="team-tag mono">${t.projects.team}</span>` : ''}</h3>
        <p class="project-desc">${p.description[lang]}</p>
        <ul class="tags">${p.tech.map((tech) => `<li>${tech}</li>`).join('')}</ul>
        <div class="project-links">
          ${
            p.privateRepo
              ? `<span class="private-repo">${icons.lock}${t.projects.privateRepo}</span>`
              : `<a href="${p.repo}" target="_blank" rel="noopener">${icons.github}${t.projects.code}</a>`
          }
          ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">${icons.external}${t.projects.demo}</a>` : ''}
        </div>
      </article>`,
    )
    .join('');
  return `
    <section class="section container" id="projects" aria-labelledby="projects-title">
      ${sectionTitle(3, 'projects', t.projects.title)}
      <p class="section-intro reveal">${t.projects.intro}</p>
      <div class="filters reveal" role="group" aria-label="Filtros">${filters}</div>
      <div class="projects-grid">${cards}</div>
      <p class="more reveal"><a class="btn" href="${profile.github}?tab=repositories" target="_blank" rel="noopener">${icons.github}${t.projects.more}</a></p>
    </section>`;
}

function renderSkills(t: Content): string {
  const groups = t.skills.groups
    .map(
      (g) => `
      <div class="card skill-group reveal">
        <h3 class="mono"><span class="accent">$</span> ls ${g.label.toLowerCase()}/</h3>
        <ul class="tags">${g.items.map((i) => `<li>${i}</li>`).join('')}</ul>
      </div>`,
    )
    .join('');
  return `
    <section class="section container" id="skills" aria-labelledby="skills-title">
      ${sectionTitle(4, 'skills', t.skills.title)}
      <div class="skills-grid">${groups}</div>
      <div class="skills-extra">
        <div class="card skill-group reveal">
          <h3 class="mono"><span class="accent">#</span> ${t.skills.softTitle}</h3>
          <ul class="tags soft">${t.skills.soft.map((s) => `<li>${s}</li>`).join('')}</ul>
        </div>
        <div class="card skill-group reveal">
          <h3 class="mono"><span class="accent">#</span> ${t.skills.langTitle}</h3>
          <ul class="tags soft">${t.skills.languages.map((s) => `<li>${s}</li>`).join('')}</ul>
        </div>
      </div>
    </section>`;
}

function timeline(items: TimelineItem[]): string {
  return `<ol class="timeline">${items
    .map(
      (i) => `
      <li class="timeline-item reveal ${i.kind}">
        <span class="timeline-dot" aria-hidden="true"></span>
        <p class="timeline-period mono">${i.period}</p>
        <h3>${i.title}</h3>
        <p class="timeline-role">${i.role}</p>
        ${i.description ? `<p class="muted">${i.description}</p>` : ''}
      </li>`,
    )
    .join('')}</ol>`;
}

function renderExperience(t: Content): string {
  return `
    <section class="section container" id="experience" aria-labelledby="experience-title">
      ${sectionTitle(5, 'experience', t.experience.title)}
      <div class="experience-grid">
        <div>${timeline(t.experience.items)}</div>
        <div>
          <h3 class="subhead mono reveal"><span class="accent">//</span> ${t.experience.eduTitle}</h3>
          ${timeline(t.experience.education)}
        </div>
      </div>
    </section>`;
}

function renderContact(t: Content): string {
  return `
    <section class="section container contact" id="contact" aria-labelledby="contact-title">
      ${sectionTitle(6, 'contact', t.contact.title)}
      <div class="card contact-card reveal">
        <p class="contact-cmd mono"><span class="accent">diego@portfolio:~$</span> echo "hola"</p>
        <p class="contact-text">${t.contact.text}</p>
        <div class="contact-actions">
          <a class="btn btn-primary" href="mailto:${profile.email}">${icons.mail}${profile.email}</a>
          <button class="btn copy-email" type="button">${t.contact.copy}</button>
          <a class="btn" href="${profile.github}" target="_blank" rel="noopener">${icons.github}${profile.githubUser}</a>
        </div>
      </div>
    </section>`;
}

function render(): void {
  const t = content[lang];
  document.documentElement.lang = lang;
  document.title = t.meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);

  app.innerHTML = `
    <a class="skip-link" href="#about">Skip</a>
    ${renderNav(t)}
    <main>
      ${renderHero(t)}
      ${renderAbout(t)}
      ${renderAwards(t)}
      ${renderProjects(t)}
      ${renderSkills(t)}
      ${renderExperience(t)}
      ${renderContact(t)}
    </main>
    <footer class="footer container mono">
      <p><span class="accent">&lt;/&gt;</span> ${t.footer} · ${new Date().getFullYear()}</p>
    </footer>`;

  bindEvents(t);
  observeReveal();
  observeSections();
  void typeTerminal(t.hero.terminal);
}

function bindEvents(t: Content): void {
  app.querySelector('.lang-toggle')?.addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es';
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* storage no disponible */
    }
    render();
  });

  const navToggle = app.querySelector<HTMLButtonElement>('.nav-toggle')!;
  const navLinks = app.querySelector<HTMLUListElement>('.nav-links')!;
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  app.querySelectorAll<HTMLButtonElement>('.filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter as typeof activeFilter;
      app.querySelectorAll<HTMLButtonElement>('.filter').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      app.querySelectorAll<HTMLElement>('.project').forEach((card) => {
        card.hidden = activeFilter !== 'all' && card.dataset.category !== activeFilter;
      });
    });
  });

  const lightbox = app.querySelector<HTMLDialogElement>('#lightbox')!;
  const lightboxImg = lightbox.querySelector('img')!;
  app.querySelectorAll<HTMLButtonElement>('[data-cert]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const award = t.awards.items[Number(btn.dataset.cert)];
      lightboxImg.src = award.image;
      lightboxImg.alt = award.title;
      lightbox.showModal();
    });
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });

  const copyBtn = app.querySelector<HTMLButtonElement>('.copy-email')!;
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      copyBtn.textContent = t.contact.copied;
      setTimeout(() => (copyBtn.textContent = t.contact.copy), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  });
}

async function typeTerminal(lines: TermLine[]): Promise<void> {
  const run = ++terminalRun;
  const body = app.querySelector<HTMLDivElement>('#terminal-body');
  if (!body) return;

  for (const line of lines) {
    if (run !== terminalRun) return;
    const row = document.createElement('div');
    row.className = `term-line ${line.kind}`;
    body.appendChild(row);

    if (line.kind === 'cmd') {
      row.innerHTML = '<span class="term-prompt">$</span> <span class="term-text"></span>';
      const text = row.querySelector('.term-text')!;
      if (reducedMotion) {
        text.textContent = line.text;
        continue;
      }
      for (const char of line.text) {
        if (run !== terminalRun) return;
        text.textContent += char;
        await sleep(55);
      }
      await sleep(300);
    } else {
      row.textContent = line.text;
      if (!reducedMotion) await sleep(450);
    }
  }
  if (run !== terminalRun) return;
  const cursor = document.createElement('div');
  cursor.className = 'term-line cmd';
  cursor.innerHTML = '<span class="term-prompt">$</span> <span class="term-cursor"></span>';
  body.appendChild(cursor);
}

let revealObserver: IntersectionObserver | undefined;
function observeReveal(): void {
  revealObserver?.disconnect();
  const els = app.querySelectorAll<HTMLElement>('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver?.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  els.forEach((el) => revealObserver!.observe(el));
}

let sectionObserver: IntersectionObserver | undefined;
function observeSections(): void {
  sectionObserver?.disconnect();
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        app.querySelectorAll('[data-nav]').forEach((a) => {
          a.classList.toggle('current', a.getAttribute('data-nav') === entry.target.id);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  app.querySelectorAll('main section[id]').forEach((s) => sectionObserver!.observe(s));
}

render();
