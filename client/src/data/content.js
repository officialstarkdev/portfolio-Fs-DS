/* All copy and content in one place so the site is easy to make your own. */

export const profile = {
  name: "Talha Shahid",
  role: "Full-Stack Engineer × Data Scientist",
  tagline: "I build production web systems and the models behind them.",
  email: "official.starkdev@gmail.com",
  location: "Lahore, PK — working worldwide",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Kaggle", href: "https://kaggle.com/" },
    { label: "X / Twitter", href: "https://x.com/" },
  ],
};

export const stats = [
  { value: 2, suffix: "+", label: "Years shipping" },
  { value: 20, suffix: "+", label: "Projects delivered" },
  { value: 7, suffix: "", label: "ML models in production" },
  { value: 99.9, suffix: "%", label: "Avg. uptime maintained", decimals: 1 },
];

export const skills = {
  web: {
    title: "Web Engineering",
    note: "Interfaces, APIs, and the infrastructure that keeps them fast.",
    items: [
      { name: "React / Next.js", level: 95 },
      { name: "Node.js / Express", level: 92 },
      { name: "MongoDB / Mongoose", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "GSAP / WebGL / R3F", level: 85 },
      { name: "REST / GraphQL / WebSockets", level: 87 },
    ],
  },
  data: {
    title: "Data Science & ML",
    note: "From raw data to models that earn their keep in production.",
    items: [
      { name: "Python", level: 94 },
      { name: "Pandas / NumPy", level: 92 },
      { name: "scikit-learn", level: 90 },
      { name: "TensorFlow / PyTorch", level: 82 },
      { name: "SQL / Data Pipelines", level: 88 },
      { name: "Visualization (Matplotlib, D3)", level: 86 },
    ],
  },
};

export const getImageUrl = (folder, imageName) => {
  if (!folder || !imageName) return ''
  const cleanFolder = folder.replace(/^\//, '').replace(/\/$/, '')
  const encodedFolder = cleanFolder
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/')
  const encodedImage = encodeURIComponent(imageName)
  return `/${encodedFolder}/${encodedImage}`
}

export const projects = {
  web: [
    {
      id: "w1",
      title: "Trueman Sailor",
      kind: "MERN · APPOINTMENT BOOKING PLATFORM",
      year: "2025",
      liveUrl: "https://trueman-sailor.vercel.app/",
      folder: "/trueman",
      defaultImage: "Main.png",
      images: [
        "Main.png",
        "Screenshot 2026-08-18 003044.png",
        "Screenshot 2026-08-18 003102.png",
        "Screenshot 2026-08-18 003132.png",
        "Screenshot 2026-08-18 003152.png",
        "Screenshot 2026-08-18 003200.png",
        "Screenshot 2026-08-18 003209.png",
        "Screenshot 2026-08-18 003227.png",
        "Screenshot 2026-08-18 003501.png",
        "Screenshot 2026-08-18 003514.png",
      ],
      summary:
        "Full-stack MERN clothing & fashion e-commerce storefront with dynamic catalog browsing, interactive cart, and responsive UI.",
      detail:
        "Trueman Sailor is a modern fashion e-commerce web application built on the MERN stack. Features comprehensive product showcases, seamless navigation, responsive design for all screen sizes, and optimized asset delivery.",
      tech: ["React", "Express", "Node.js", "MongoDB", "Tailwind CSS"],
      tone: 0,
    },
    {
      id: "w2",
      title: "Zaiqa",
      kind: "MERN · Food Ordering Platform",
      year: "2025",
      liveUrl: "https://zaiqa-u3wl.onrender.com/",
      folder: "/zaiqa",
      defaultImage: "Main.png",
      images: [
        "Main.png",
        "Screenshot 2026-08-18 001834.png",
        "Screenshot 2026-08-18 001851.png",
        "Screenshot 2026-08-18 002204.png",
        "Screenshot 2026-08-18 002221.png",
        "Screenshot 2026-08-18 002243.png",
        "Screenshot 2026-08-18 002330.png",
        "Screenshot 2026-08-18 002408.png",
        "Screenshot 2026-08-18 002418.png",
        "Screenshot 2026-08-18 002429.png",
      ],
      summary:
        "Feature-rich culinary & restaurant ordering platform with interactive menus, order processing, and dynamic food category filtering.",
      detail:
        "Zaiqa provides a full-featured online food ordering experience. Built with MongoDB, Express, React, and Node.js, it offers smooth item filtering, real-time cart updates, and a responsive interface designed for culinary businesses.",
      tech: ["React", "Express", "Node.js", "MongoDB", "REST API"],
      tone: 1,
    },
    {
      id: "w3",
      title: "Real State Agent",
      kind: "MERN · Real Estate Portal",
      year: "2025",
      liveUrl: "https://real-state-agent-b1mc.onrender.com/",
      folder: "/real-state agent",
      defaultImage: "Main.png",
      images: [
        "Main.png",
        "Screenshot 2026-08-18 001102.png",
        "Screenshot 2026-08-18 001145.png",
        "real-state-agent-b1mc.onrender.com_contact.png",
      ],
      summary:
        "Real estate web platform enabling clients to explore property listings, filter by criteria, and connect with property agents directly.",
      detail:
        "Real State Agent is a full-stack property management and real estate portal. Built using the MERN stack, it includes property listing management, agent contact integration, detailed property cards, and location-based filtering.",
      tech: ["React", "Express", "Node.js", "MongoDB", "Tailwind CSS"],
      tone: 2,
    },
  ],
  data: [
    {
      id: "d1",
      title: "Churn Horizon",
      kind: "ML · Customer retention",
      year: "2025",
      summary:
        "Gradient-boosted churn model (scikit-learn) that lifted retention-campaign precision from 31% to 74% for a SaaS client.",
      detail:
        "Feature engineering over 18 months of event data with Pandas, class-imbalance handling via focal weighting, SHAP-based explanations surfaced to the CRM, and a FastAPI scoring service the MERN app calls in real time.",
      tech: ["Python", "scikit-learn", "Pandas", "SHAP", "FastAPI"],
      tone: 3,
    },
    {
      id: "d2",
      title: "Freightcast",
      kind: "ML · Demand forecasting",
      year: "2024",
      summary:
        "Time-series forecasting for a logistics fleet — 22% reduction in idle vehicle hours across three cities.",
      detail:
        "NumPy-vectorized feature windows, ensembled gradient boosting with seasonal decomposition, backtested on 3 years of dispatch logs. Forecasts feed a Node.js scheduling service through a nightly batch pipeline.",
      tech: ["Python", "NumPy", "Pandas", "XGBoost"],
      tone: 4,
    },
    {
      id: "d3",
      title: "Signal & Noise",
      kind: "NLP · Review intelligence",
      year: "2023",
      summary:
        "NLP pipeline that clusters 2M+ product reviews into actionable themes, with sentiment drift tracking per release.",
      detail:
        "TF-IDF and embedding-based clustering, topic labeling with a lightweight classifier, and a React dashboard for the insights team. Cut manual review triage from days to under an hour.",
      tech: ["Python", "scikit-learn", "spaCy", "React"],
      tone: 5,
    },
  ],
};

export const timeline = [
  {
    period: "2024 — Present",
    role: "Senior Full-Stack & ML Engineer",
    org: "Independent / Consulting",
    text: "End-to-end delivery for product teams: MERN platforms with embedded ML services — forecasting, scoring, and search.",
  },
  {
    period: "2022 — 2024",
    role: "Data Scientist",
    org: "Northline Analytics",
    text: "Owned churn, demand, and pricing models from notebook to production. Built the internal feature store and model-monitoring stack.",
  },
  {
    period: "2020 — 2022",
    role: "Full-Stack Developer",
    org: "Studio Meridian",
    text: "Shipped client platforms on the MERN stack — e-commerce, dashboards, and realtime tools — with a focus on performance budgets.",
  },
  {
    period: "2024",
    role: "BS Computer Science",
    org: "Graduated with distinction",
    text: "Thesis on applied machine learning for time-series problems. Fell for the overlap of interfaces and inference; never looked back.",
  },
];
