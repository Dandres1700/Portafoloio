// Todo el contenido del portafolio vive aquí.
// Para actualizar textos, proyectos o habilidades, edita solo este archivo.

export type Lang = 'es' | 'en';
export type Category = 'web' | 'mobile' | 'game';
type Text = Record<Lang, string>;

const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`;

export const profile = {
  name: 'Diego Andres Zurita Flores',
  shortName: 'Diego Zurita',
  email: 'dandreszurtaf23@gmail.com',
  githubUser: 'Dandres1700',
  github: 'https://github.com/Dandres1700',
  location: 'Quito, Ecuador',
  photo: asset('foto.webp'),
  cv: asset('CV_Diego_Zurita.pdf'),
};

export interface Project {
  name: string;
  slug: string;
  category: Category;
  tech: string[];
  repo: string;
  demo?: string;
  /** Repositorio privado: se muestra sin enlace al código. */
  privateRepo?: boolean;
  /** Proyecto desarrollado en equipo. */
  team?: boolean;
  badge?: Text;
  description: Text;
}

const repo = (name: string) => `${profile.github}/${name}`;

export const projects: Project[] = [
  {
    name: 'RUMI',
    slug: 'rumi',
    category: 'game',
    tech: ['Godot 4', 'GDScript', '3D'],
    repo: 'https://github.com/sistemas-it/RUMI',
    privateRepo: true,
    team: true,
    badge: { es: 'Game Jam Ecuador 2026', en: 'Game Jam Ecuador 2026' },
    description: {
      es: 'Aventura 3D de suspenso y gestión del tiempo inspirada en la leyenda quiteña de Cantuña. Durante una sola noche hay que construir el atrio de San Francisco recogiendo y colocando sillares, decidir si aceptar un pacto infernal y llegar a uno de sus tres finales.',
      en: 'A 3D suspense and time-management adventure inspired by the Quito legend of Cantuña. In a single night you must build the atrium of San Francisco by carrying and placing stone blocks, decide whether to accept an infernal pact and reach one of three endings.',
    },
  },
  {
    name: 'Ride App',
    slug: 'ride-app',
    category: 'mobile',
    tech: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'Realtime'],
    repo: 'https://github.com/betzabxscobar/APPRIDE',
    team: true,
    description: {
      es: 'App móvil de transporte de pasajeros hecha en equipo, donde soy el principal contribuidor. Tiene paneles de pasajero, conductor y administración, mapa y buscador de direcciones, tarifas, pagos, cuota mensual para choferes y notificaciones, todo sobre Supabase con permisos por rol.',
      en: 'Team-built ride-hailing mobile app where I am the main contributor. It has passenger, driver and admin panels, a map with address search, fares, payments, a monthly driver fee and notifications, all on Supabase with role-based permissions.',
    },
  },
  {
    name: 'Ride Web',
    slug: 'ride-web',
    category: 'web',
    tech: ['React', 'TypeScript', 'Vite', 'Supabase'],
    repo: 'https://github.com/betzabxscobar/WEB-RIDE',
    team: true,
    description: {
      es: 'Versión web de Ride. Replica los paneles de pasajero, conductor y administración de la app móvil sobre la misma base de datos y con las mismas reglas: registro, recuperación de contraseña, roles y gestión de viajes.',
      en: 'Web version of Ride. It mirrors the passenger, driver and admin panels of the mobile app on the same database and with the same rules: sign-up, password recovery, roles and trip management.',
    },
  },
  {
    name: 'MondongoGames',
    slug: 'mondongo-games',
    category: 'web',
    tech: ['Django', 'Python', 'Supabase', 'PostgreSQL', 'JavaScript'],
    repo: repo('MondongoGames'),
    description: {
      es: 'Proyecto integrador de segundo semestre. Aplicación web full-stack en Django conectada a Supabase (PostgreSQL + Storage), con perfiles de usuario, módulo de soporte con subida de capturas y audios de interfaz. Lista para desplegar en Render.',
      en: 'Second-semester capstone project. Full-stack Django web app backed by Supabase (PostgreSQL + Storage), with user profiles, a support module with screenshot uploads and UI audio. Ready to deploy on Render.',
    },
  },
  {
    name: 'Intesud Fighter',
    slug: 'intesud-fighter',
    category: 'game',
    tech: ['Unity', 'C#', '2D', 'Pixel art'],
    repo: repo('Intesud_Fighter'),
    description: {
      es: 'Juego de lucha 2D local hecho en Unity. Modos Jugador vs Jugador, Jugador vs CPU y CPU vs CPU, con selección de dificultad, personajes y escenarios, doble salto, ataques cuerpo a cuerpo y combates a dos rondas.',
      en: 'Local 2D fighting game built in Unity. Player vs Player, Player vs CPU and CPU vs CPU modes, with difficulty, character and stage selection, double jump, melee attacks and best-of-three rounds.',
    },
  },
  {
    name: 'VoltEnvíos',
    slug: 'volt-envios',
    category: 'mobile',
    tech: ['Flutter', 'Dart', 'REST API', 'SHA-256'],
    repo: repo('Practica_Conectividad-y-consumo-de-servicios'),
    description: {
      es: 'App móvil de envíos de productos electrónicos. Registro e inicio de sesión con contraseñas cifradas (SHA-256), catálogo consumido desde un servicio web, detección de conectividad, programación de envíos y perfil con foto desde la cámara.',
      en: 'Mobile app for shipping electronics. Sign-up and login with hashed passwords (SHA-256), catalog loaded from a web service, connectivity detection, shipment scheduling and a profile with a camera photo.',
    },
  },
  {
    name: 'GoadVerse',
    slug: 'goadverse',
    category: 'game',
    tech: ['Unity', 'C#', '3D', 'URP'],
    repo: repo('GoadVerse'),
    description: {
      es: 'Juego 3D en Unity con menú animado, secuencia narrativa en video, lobby en tercera persona y un portal que lleva a un minijuego de fútbol con física de balón. Compatible con teclado y mando.',
      en: '3D Unity game with an animated menu, a video story sequence, a third-person lobby and a portal into a football mini-game with ball physics. Works with keyboard and gamepad.',
    },
  },
  {
    name: 'App del Clima',
    slug: 'app-clima',
    category: 'mobile',
    tech: ['Flutter', 'Dart', 'Open-Meteo API', 'GPS'],
    repo: repo('Practica_API_Clima'),
    description: {
      es: 'Aplicación móvil que consulta el clima consumiendo la API REST de Open-Meteo, con detección automática de ubicación e interfaz en negro y rojo.',
      en: 'Mobile weather app that consumes the Open-Meteo REST API, with automatic location detection and a black-and-red interface.',
    },
  },
  {
    name: 'Buscador de Universidades',
    slug: 'buscador-universidades',
    category: 'web',
    tech: ['JavaScript', 'Fetch API', 'LocalStorage'],
    repo: repo('Laboratorio-Consumo-de-una-API-p-blica'),
    demo: 'https://dandres1700.github.io/Laboratorio-Consumo-de-una-API-p-blica/',
    description: {
      es: 'Aplicación web modular que busca universidades del mundo por país consumiendo datos públicos en JSON con async/await. Permite guardar favoritas que se mantienen al recargar la página.',
      en: 'Modular web app that searches universities worldwide by country using public JSON data with async/await. Favorites are saved and persist across page reloads.',
    },
  },
  {
    name: 'Componentes Reutilizables',
    slug: 'componentes-reutilizables',
    category: 'web',
    tech: ['TypeScript', 'Vite', 'CSS'],
    repo: repo('Laboratorio-Desarrollo-de-componentes-reutilizables-para-una-interfaz-web-interactiva'),
    description: {
      es: 'Laboratorio de desarrollo de componentes reutilizables para construir una interfaz web interactiva con TypeScript.',
      en: 'Lab on building reusable components for an interactive web interface with TypeScript.',
    },
  },
];

export interface TermLine {
  kind: 'cmd' | 'out';
  text: string;
}

export interface TimelineItem {
  title: string;
  role: string;
  period: string;
  description: string;
  kind: 'tech' | 'work' | 'edu';
}

export interface Content {
  meta: { title: string; description: string };
  nav: { about: string; awards: string; projects: string; skills: string; experience: string; contact: string };
  hero: {
    status: string;
    greeting: string;
    role: string;
    tagline: string;
    ctaProjects: string;
    ctaCv: string;
    terminal: TermLine[];
  };
  about: { title: string; paragraphs: string[]; stats: { value: string; label: string }[] };
  awards: {
    title: string;
    intro: string;
    issuer: string;
    view: string;
    items: { title: string; detail: string; image: string; date: string }[];
    events: { title: string; role: string; place: string; projectSlug: string; projectName: string }[];
  };
  projects: {
    title: string;
    intro: string;
    filters: Record<'all' | Category, string>;
    code: string;
    demo: string;
    more: string;
    team: string;
    privateRepo: string;
  };
  skills: {
    title: string;
    groups: { label: string; items: string[] }[];
    softTitle: string;
    soft: string[];
    langTitle: string;
    languages: string[];
  };
  experience: { title: string; items: TimelineItem[]; eduTitle: string; education: TimelineItem[] };
  contact: { title: string; text: string; copy: string; copied: string };
  footer: string;
  toggleLabel: string;
}

export const content: Record<Lang, Content> = {
  es: {
    meta: {
      title: 'Diego Zurita · Desarrollador de Software',
      description:
        'Portafolio de Diego Andres Zurita Flores, estudiante de Desarrollo de Software en Quito, Ecuador. Proyectos web, móviles y videojuegos.',
    },
    nav: {
      about: 'sobre-mí',
      awards: 'logros',
      projects: 'proyectos',
      skills: 'skills',
      experience: 'experiencia',
      contact: 'contacto',
    },
    hero: {
      status: 'Disponible para prácticas y empleo',
      greeting: 'Hola, soy',
      role: 'Desarrollador de Software',
      tagline:
        'Estudiante de Tecnología en Desarrollo de Software, con interés en el desarrollo de aplicaciones web, móviles y videojuegos. Cuento con experiencia en soporte técnico y mantenimiento de equipos.',
      ctaProjects: 'Ver proyectos',
      ctaCv: 'Descargar CV',
      terminal: [
        { kind: 'cmd', text: 'whoami' },
        { kind: 'out', text: 'Diego Andres Zurita Flores' },
        { kind: 'cmd', text: 'cat stack.txt' },
        { kind: 'out', text: 'Python · TypeScript · Django · Flutter · Unity' },
        { kind: 'cmd', text: 'ls logros/' },
        { kind: 'out', text: '🏆 mejor-proyecto-integrador (x2)' },
        { kind: 'out', text: '🎮 game-jam-ecuador-2026' },
      ],
    },
    about: {
      title: 'Sobre mí',
      paragraphs: [
        'Estudiante de Tecnología en Desarrollo de Software en el Instituto Superior Tecnológico Sudamericano (Quito). Tercer semestre culminado y avanzando hacia el cuarto nivel de formación académica.',
        'Desarrollo aplicaciones web, móviles y videojuegos que convierten ideas en soluciones funcionales. Mi principal objetivo es generar ideas competitivas y aplicables. Cuento con experiencia en soporte técnico, mantenimiento de equipos y proyectos desarrollados en equipo.',
        'El ámbito laboral me ha permitido trabajar bajo presión, desarrollando responsabilidad, objetividad y comunicación asertiva en los proyectos encomendados.',
      ],
      stats: [
        { value: '2', label: 'premios al mejor proyecto integrador' },
        { value: '15+', label: 'repositorios en GitHub' },
        { value: '3.º', label: 'semestre culminado' },
        { value: '2+', label: 'años de experiencia laboral' },
      ],
    },
    awards: {
      title: 'Reconocimientos',
      intro:
        'La Escuela de Desarrollo de Software me premió dos veces por el mejor proyecto integrador del nivel. Participé además en la Game Jam Ecuador 2026.',
      issuer: 'Escuela de Desarrollo de Software · Instituto Superior Tecnológico Sudamericano',
      view: 'Ver certificado',
      items: [
        {
          title: 'Mejor Proyecto Integrador del Nivel',
          detail: 'Periodo académico 2025',
          image: asset('cert-proyecto-integrador.webp'),
          date: '11 sep 2025',
        },
        {
          title: 'Mejor Proyecto Integrador · Estructura de Datos',
          detail: 'Estructura de Datos 2025',
          image: asset('cert-estructura-datos.webp'),
          date: '11 sep 2025',
        },
      ],
      events: [
        {
          title: 'Game Jam Ecuador 2026',
          role: 'Participante con el videojuego',
          place: 'Quito, Ecuador · 2026',
          projectSlug: 'rumi',
          projectName: 'RUMI',
        },
      ],
    },
    projects: {
      title: 'Proyectos',
      intro: 'Una selección de proyectos académicos, personales y en equipo: web, móvil y videojuegos.',
      filters: { all: 'Todos', web: 'Web', mobile: 'Móvil', game: 'Videojuegos' },
      code: 'Código',
      demo: 'Demo',
      more: 'Ver todos mis repositorios',
      team: 'En equipo',
      privateRepo: 'Repositorio privado',
    },
    skills: {
      title: 'Habilidades',
      groups: [
        { label: 'Lenguajes', items: ['Python', 'JavaScript', 'TypeScript', 'Dart', 'C#', 'SQL', 'Java (básico)'] },
        { label: 'Web y móvil', items: ['HTML', 'CSS', 'React', 'Django', 'Flask', 'Vite', 'Flutter'] },
        { label: 'Videojuegos', items: ['Unity 2D', 'Unity 3D', 'Godot 4', 'GDScript'] },
        { label: 'Bases de datos', items: ['PostgreSQL', 'MariaDB', 'Supabase', 'XAMPP'] },
        { label: 'Herramientas', items: ['Git', 'GitHub', 'GitHub Pages'] },
        {
          label: 'Soporte técnico',
          items: ['Mantenimiento preventivo y correctivo', 'Ensamblaje de PC', 'Diagnóstico de hardware y software', 'Instalación de sistemas operativos'],
        },
      ],
      softTitle: 'Habilidades blandas',
      soft: ['Responsabilidad y compromiso', 'Organización del trabajo', 'Adaptabilidad', 'Resolución de problemas', 'Orientación al servicio', 'Coordinación de equipos'],
      langTitle: 'Idiomas',
      languages: ['Español · Nativo', 'Inglés · A1'],
    },
    experience: {
      title: 'Experiencia',
      items: [
        {
          title: 'Instituto Superior Tecnológico Sudamericano',
          role: 'Pasantías · Soporte técnico y mantenimiento',
          period: 'Pasantía profesional',
          description:
            'Mantenimiento preventivo y correctivo de equipos, diagnóstico y solución de problemas de hardware y software, instalación y configuración de sistemas operativos y programas, y soporte técnico a usuarios.',
          kind: 'tech',
        },
        {
          title: 'Servicio técnico',
          role: 'Laptops, celulares y computadoras de escritorio',
          period: 'Experiencia independiente',
          description: 'Mantenimiento y reparación de equipos, ensamblaje de PC, revisión de componentes y diagnóstico de fallas.',
          kind: 'tech',
        },
        {
          title: 'Holstein Grill',
          role: 'Parrillero → Polifuncional',
          period: '15 dic 2022 - 25 dic 2024',
          description:
            'Parrillero desde el 15 de abril de 2023 hasta el 25 de diciembre de 2024, con responsabilidades en preparación de alimentos, organización del área y cumplimiento de tiempos. Polifuncional durante los 4 primeros meses (15 dic 2022 - 14 abr 2023), con funciones de atención al cliente y ventas.',
          kind: 'work',
        },
        {
          title: 'La Tablita del Tártaro',
          role: 'Polifuncional',
          period: '6 meses',
          description: 'Ventas y atención al cliente en distintas áreas de servicio al público de la cadena de restaurantes.',
          kind: 'work',
        },
      ],
      eduTitle: 'Educación',
      education: [
        {
          title: 'Instituto Superior Tecnológico Sudamericano',
          role: 'Tecnología en Desarrollo de Software',
          period: 'En curso',
          description: 'Tercer semestre culminado y avanzando hacia el cuarto nivel de formación académica.',
          kind: 'edu',
        },
        {
          title: 'Unidad Educativa Fiscal "Santiago de Guayaquil"',
          role: 'Bachiller en Ciencias',
          period: 'Finalizado',
          description: '',
          kind: 'edu',
        },
      ],
    },
    contact: {
      title: 'Contacto',
      text: '¿Tienes una vacante, una práctica o un proyecto en mente? Escríbeme y lo conversamos.',
      copy: 'Copiar correo',
      copied: '¡Copiado!',
    },
    footer: 'Diseñado y desarrollado por Diego Zurita con Vite + TypeScript',
    toggleLabel: 'Cambiar idioma a inglés',
  },

  en: {
    meta: {
      title: 'Diego Zurita · Software Developer',
      description:
        'Portfolio of Diego Andres Zurita Flores, Software Development student in Quito, Ecuador. Web, mobile and game projects.',
    },
    nav: {
      about: 'about',
      awards: 'awards',
      projects: 'projects',
      skills: 'skills',
      experience: 'experience',
      contact: 'contact',
    },
    hero: {
      status: 'Open to internships and jobs',
      greeting: "Hi, I'm",
      role: 'Software Developer',
      tagline:
        'Software Development Technology student. I build web apps, mobile apps and video games, and I also have hands-on experience in IT support and hardware maintenance.',
      ctaProjects: 'View projects',
      ctaCv: 'Download CV',
      terminal: [
        { kind: 'cmd', text: 'whoami' },
        { kind: 'out', text: 'Diego Andres Zurita Flores' },
        { kind: 'cmd', text: 'cat stack.txt' },
        { kind: 'out', text: 'Python · TypeScript · Django · Flutter · Unity' },
        { kind: 'cmd', text: 'ls awards/' },
        { kind: 'out', text: '🏆 best-capstone-project (x2)' },
        { kind: 'out', text: '🎮 game-jam-ecuador-2026' },
      ],
    },
    about: {
      title: 'About me',
      paragraphs: [
        "I'm a Software Development Technology student at Instituto Superior Tecnológico Sudamericano (Quito), about to start my fourth and final semester.",
        'I enjoy turning ideas into things that work, from a team-built ride-hailing app in Flutter and React to RUMI, the game we presented at Game Jam Ecuador 2026 in Quito. My internship was in IT support, so I understand both software and hardware.',
        'I also spent over two years in customer-facing jobs under pressure. That is where my sense of responsibility, communication skills and teamwork come from.',
      ],
      stats: [
        { value: '2', label: 'best capstone project awards' },
        { value: '15+', label: 'repositories on GitHub' },
        { value: '4th', label: 'and final semester ahead' },
        { value: '2+', label: 'years of work experience' },
      ],
    },
    awards: {
      title: 'Awards',
      intro:
        'The School of Software Development awarded me twice for the best capstone project of the level. I also took part in Game Jam Ecuador 2026.',
      issuer: 'School of Software Development · Instituto Superior Tecnológico Sudamericano',
      view: 'View certificate',
      items: [
        {
          title: 'Best Capstone Project of the Level',
          detail: 'Academic period 2025',
          image: asset('cert-proyecto-integrador.webp'),
          date: 'Sep 11, 2025',
        },
        {
          title: 'Best Capstone Project · Data Structures',
          detail: 'Data Structures 2025',
          image: asset('cert-estructura-datos.webp'),
          date: 'Sep 11, 2025',
        },
      ],
      events: [
        {
          title: 'Game Jam Ecuador 2026',
          role: 'Participant with the game',
          place: 'Quito, Ecuador · 2026',
          projectSlug: 'rumi',
          projectName: 'RUMI',
        },
      ],
    },
    projects: {
      title: 'Projects',
      intro: 'A selection of academic, personal and team projects: web, mobile and games.',
      filters: { all: 'All', web: 'Web', mobile: 'Mobile', game: 'Games' },
      code: 'Code',
      demo: 'Demo',
      more: 'See all my repositories',
      team: 'Team project',
      privateRepo: 'Private repository',
    },
    skills: {
      title: 'Skills',
      groups: [
        { label: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Dart', 'C#', 'SQL', 'Java (basic)'] },
        { label: 'Web & mobile', items: ['HTML', 'CSS', 'React', 'Django', 'Flask', 'Vite', 'Flutter'] },
        { label: 'Game dev', items: ['Unity 2D', 'Unity 3D', 'Godot 4', 'GDScript'] },
        { label: 'Databases', items: ['PostgreSQL', 'MariaDB', 'Supabase', 'XAMPP'] },
        { label: 'Tools', items: ['Git', 'GitHub', 'GitHub Pages'] },
        {
          label: 'IT support',
          items: ['Preventive & corrective maintenance', 'PC assembly', 'Hardware & software troubleshooting', 'OS installation'],
        },
      ],
      softTitle: 'Soft skills',
      soft: ['Fast learner', 'Communication', 'Teamwork', 'Decision making', 'Time management', 'Working under pressure'],
      langTitle: 'Languages',
      languages: ['Spanish · Native', 'English · A1'],
    },
    experience: {
      title: 'Experience',
      items: [
        {
          title: 'Instituto Superior Tecnológico Sudamericano',
          role: 'Internship · IT support & maintenance',
          period: 'Professional internship',
          description:
            'Preventive and corrective maintenance of computers, hardware and software troubleshooting, operating system and software installation, and end-user support.',
          kind: 'tech',
        },
        {
          title: 'Technical service',
          role: 'Laptops, phones and desktop computers',
          period: 'Freelance experience',
          description: 'Device maintenance and repair, PC assembly, component inspection and fault diagnosis.',
          kind: 'tech',
        },
        {
          title: 'Holstein Grill',
          role: 'Multi-role staff → Grill cook',
          period: '2 years',
          description:
            'Started in customer service and sales and was promoted to grill cook after 4 months. There I handled area organization, service timing and high-pressure work.',
          kind: 'work',
        },
        {
          title: 'La Tablita del Tártaro',
          role: 'Multi-role staff',
          period: '6 months',
          description: 'Sales and customer service across different public-facing areas of the restaurant chain.',
          kind: 'work',
        },
      ],
      eduTitle: 'Education',
      education: [
        {
          title: 'Instituto Superior Tecnológico Sudamericano',
          role: 'Software Development Technology',
          period: 'In progress',
          description: 'About to start the fourth and final semester.',
          kind: 'edu',
        },
        {
          title: 'Unidad Educativa Fiscal "Santiago de Guayaquil"',
          role: 'High school diploma in Sciences',
          period: 'Completed',
          description: '',
          kind: 'edu',
        },
      ],
    },
    contact: {
      title: 'Contact',
      text: 'Have a job opening, an internship or a project in mind? Send me a message and let’s talk.',
      copy: 'Copy email',
      copied: 'Copied!',
    },
    footer: 'Designed and built by Diego Zurita with Vite + TypeScript',
    toggleLabel: 'Switch language to Spanish',
  },
};
