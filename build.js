// build.js - Static Site Generator (SSG) & SEO Prerendering Compiler for TORQUE EdTech
const fs = require('fs');
const path = require('path');

// Ensure browser-like global environment in Node before requiring app.js
global.window = global;
global.document = {
    addEventListener: () => {},
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => []
};
global.localStorage = {
    getItem: () => null,
    setItem: () => {}
};

const app = require('./app.js');
const routes = app.routes;

const SITE_URL = 'https://torquee.netlify.app';

// Comprehensive SEO Metadata Dictionary for every route
const routesMeta = {
    home: {
        title: "TORQUE - Career Intelligence for the Next Generation",
        description: "TORQUE: Career Intelligence for the Next Generation. Scientific 5-D career assessments, CBSE board question papers & sample papers, entrance exam masterclasses (IPMAT, CAT, CLAT, CUET), AI resume builder, and mock interviews.",
        keywords: "career intelligence, career guidance, edtech, CBSE question papers, IPMAT prep, CAT coaching, MBA admissions, AI resume builder, mock interview simulator, stream decider",
        canonical: `${SITE_URL}/`,
        navRoute: 'home',
        priority: '1.0'
    },
    resources: {
        title: "TORQUE Resource Hub | CBSE, Entrance Exams & Career Resources",
        description: "Curated resources for students, parents and educators — official CBSE question papers, marking schemes, syllabi, entrance exam portals (IPMAT, CLAT, UCEED, JEE, NDA), career pathways, and student tools.",
        keywords: "CBSE resources, CBSE question paper, CBSE sample paper, marking schemes, IPMAT portal, CLAT portal, entrance exams India, career pathways, student resources",
        canonical: `${SITE_URL}/resources/`,
        navRoute: 'resources',
        priority: '0.9'
    },
    exams: {
        title: "Entrance Exams & Mock Test Arena | CAT, GMAT, IPMAT, CUET, CLAT | TORQUE",
        description: "Ace competitive entrance exams with TORQUE. Access syllabus breakdowns, speed strategies, and take a 60-second timed Mock Test for CAT, GMAT, GRE, IPMAT, SET, CUET, UCEED, and CLAT.",
        keywords: "entrance exams, CAT mock test, GMAT exam, IPMAT practice, CUET test, CLAT mock, UCEED prep, competitive exam arena",
        canonical: `${SITE_URL}/exams/`,
        navRoute: 'exams',
        priority: '0.9'
    },
    'ug-bba': {
        title: "Undergraduate & BBA Entrance Masterclasses | TORQUE EdTech",
        description: "Premier preparation for BBA entrance exams including IPMAT, DU JAT, SET, and NPAT. Master corporate communication, presentation frameworks, and email etiquette.",
        keywords: "BBA entrance, IPMAT Indore, IPMAT Rohtak, BBA admissions, business foundations, soft skills for undergrads",
        canonical: `${SITE_URL}/ug-bba/`,
        navRoute: 'ug-bba',
        priority: '0.8'
    },
    mba: {
        title: "MBA Preparation & Management Strategy Catalog | TORQUE EdTech",
        description: "Accelerate your MBA journey with CAT/GMAT elite prep, executive primer courses, structured case interview coaching, and interactive strategy checklists (SWOT, Porter's 5 Forces).",
        keywords: "MBA preparation, CAT prep, GMAT focus, case interview, strategy builder, management consulting, executive MBA",
        canonical: `${SITE_URL}/mba/`,
        navRoute: 'mba',
        priority: '0.8'
    },
    others: {
        title: "Executive Programs & AI Prompt Playground | TORQUE EdTech",
        description: "High-impact bootcamps for working professionals: Product Management, Data Analytics with SQL, and an Interactive AI Prompt Playground for executive communication and resume crafting.",
        keywords: "product management bootcamp, data analytics SQL, AI prompt playground, executive upskilling, prompt engineering",
        canonical: `${SITE_URL}/others/`,
        navRoute: 'others',
        priority: '0.7'
    },
    'startup-accelerator': {
        title: "Torque Launchpad: Startup Accelerator & Pitch Deck Auditor | TORQUE",
        description: "A 12-week venture incubation curriculum. Audit your pitch deck readiness with an interactive slide checklist and submit your incubator application directly to academic mentors.",
        keywords: "startup accelerator, student incubator, pitch deck auditor, startup pitch checklist, founder application",
        canonical: `${SITE_URL}/startup-accelerator/`,
        navRoute: 'startup-accelerator',
        priority: '0.8'
    },
    'soft-skills': {
        title: "Interactive Soft Skills Playbook & IELTS Band Estimator | TORQUE",
        description: "Master essential workplace competencies: Minto Pyramid executive communication, GD consensus building, negotiation strategies, and calculate your estimated IELTS band score.",
        keywords: "soft skills training, IELTS band calculator, IELTS preparation roadmap, Minto pyramid, group discussion skills, negotiation",
        canonical: `${SITE_URL}/soft-skills/`,
        navRoute: 'soft-skills',
        priority: '0.8'
    },
    'career-guidance': {
        title: "5-Dimensional Scientific Career Assessment & Stream Selection | TORQUE",
        description: "Discover your optimal career domain with our scientific 5-D Career Match Assessment covering Orientation Style, Interests, Personality, Aptitude, and Work Values.",
        keywords: "career assessment, 5D career test, stream selection class 10, psychometric test, career counseling India",
        canonical: `${SITE_URL}/career-guidance/`,
        navRoute: 'career-guidance',
        priority: '0.9'
    },
    'linkedin-optimizer': {
        title: "LinkedIn Profile Optimizer & Recruiter Score Audit | TORQUE",
        description: "Boost your recruiter visibility. Live profile score calculator, keyword headline auditor, and structured checklists to optimize your LinkedIn presence for corporate recruiters.",
        keywords: "LinkedIn optimizer, LinkedIn profile score, recruiter headline audit, professional branding",
        canonical: `${SITE_URL}/linkedin-optimizer/`,
        navRoute: 'linkedin-optimizer',
        priority: '0.7'
    },
    'vocab-builder': {
        title: "Daily Vocabulary Builder & Flashcard Challenge | TORQUE",
        description: "Build an elite lexicon for CAT, GRE, GMAT, and IPMAT. 3D flip-card flashcards, daily word carousels, and 5-question multiple-choice verbal challenges.",
        keywords: "vocabulary builder, GRE vocabulary, CAT verbal ability, flashcards, word of the day",
        canonical: `${SITE_URL}/vocab-builder/`,
        navRoute: 'vocab-builder',
        priority: '0.7'
    },
    'job-board': {
        title: "Curated Career & Internship Job Board | TORQUE",
        description: "Explore curated full-time and internship openings for undergraduates, MBA candidates, and early professionals across top consulting, tech, and finance firms.",
        keywords: "job board, internships India, BBA internships, MBA jobs, tech roles, entry level corporate openings",
        canonical: `${SITE_URL}/job-board/`,
        navRoute: 'job-board',
        priority: '0.7'
    },
    news: {
        title: "EdTech Placement News & Hiring Trends | TORQUE",
        description: "Latest insights on management consulting hiring surges, undergraduate FinTech internship booms, Germany study opportunities, and CAT/GMAT exam updates.",
        keywords: "edtech news, MBA placement news, BBA hiring trends, German study opportunities, CAT exam updates",
        canonical: `${SITE_URL}/news/`,
        navRoute: 'news',
        priority: '0.7'
    },
    'resume-builder': {
        title: "Interactive AI Resume Builder & PDF Print Studio | TORQUE",
        description: "Craft a recruiter-approved CV in minutes. Dynamic experience items, education history, customizable visual themes, and dedicated clean print-to-PDF formatting.",
        keywords: "resume builder, CV maker, print to PDF resume, ATS resume template, student CV",
        canonical: `${SITE_URL}/resume-builder/`,
        navRoute: 'resume-builder',
        priority: '0.8'
    },
    'gd-interview': {
        title: "AI Mock Interview & Group Discussion Simulator | TORQUE",
        description: "Practice real-time panel dialogue for MBA admissions, consulting case studies, and tech product management interviews with instant strategic evaluation.",
        keywords: "mock interview, interview simulator, GD preparation, MBA interview questions, case interview practice",
        canonical: `${SITE_URL}/gd-interview/`,
        navRoute: 'gd-interview',
        priority: '0.8'
    }
};

function generatePageHtml(baseTemplate, routeKey, isSubdir = false) {
    const meta = routesMeta[routeKey] || routesMeta.home;
    const renderFn = routes[routeKey] || routes.home;
    const routeHtml = renderFn();

    const assetPrefix = isSubdir ? '../' : './';

    let pageHtml = baseTemplate;

    // 1. Replace <title>
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);

    // 2. Insert or replace meta description, keywords, canonical, and Open Graph tags in <head>
    const seoBlock = `
    <!-- Primary SEO Meta Tags -->
    <meta name="description" content="${meta.description}">
    <meta name="keywords" content="${meta.keywords}">
    <meta name="author" content="TORQUE EdTech">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${meta.canonical}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${meta.canonical}">
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:image" content="${SITE_URL}/images/hero_girl_joy.jpg">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${meta.canonical}">
    <meta property="twitter:title" content="${meta.title}">
    <meta property="twitter:description" content="${meta.description}">
    <meta property="twitter:image" content="${SITE_URL}/images/hero_girl_joy.jpg">

    <!-- Structured Data JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "TORQUE",
      "url": "${SITE_URL}/",
      "logo": "${SITE_URL}/images/hero_girl_joy.jpg",
      "description": "Career Intelligence for the Next Generation. Scientific 5-D career assessment, entrance examination masterclasses, and AI student tools.",
      "telephone": "+91 98244 13735",
      "email": "subodh.kumar68@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    }
    </script>
    `;

    // Remove any pre-existing meta tags that might conflict
    pageHtml = pageHtml.replace(/<meta\s+name=["']description["'][\s\S]*?>/gi, '');
    pageHtml = pageHtml.replace(/<meta\s+name=["']keywords["'][\s\S]*?>/gi, '');
    pageHtml = pageHtml.replace(/<meta\s+name=["']robots["'][\s\S]*?>/gi, '');
    pageHtml = pageHtml.replace(/<link\s+rel=["']canonical["'][\s\S]*?>/gi, '');
    pageHtml = pageHtml.replace(/<meta\s+property=["']og:[\s\S]*?>/gi, '');
    pageHtml = pageHtml.replace(/<meta\s+property=["']twitter:[\s\S]*?>/gi, '');

    pageHtml = pageHtml.replace('</head>', `${seoBlock}\n</head>`);

    // 3. Update asset paths if generating in a subdirectory
    if (isSubdir) {
        pageHtml = pageHtml.replace(/href="style\.css\?v=2\.8"/g, `href="${assetPrefix}style.css?v=2.8"`);
        pageHtml = pageHtml.replace(/src="app\.js\?v=2\.8"/g, `src="${assetPrefix}app.js?v=2.8"`);
    }

    // 4. Update Navigation active links
    // First remove 'active' from all nav-links
    pageHtml = pageHtml.replace(/class="nav-link active"/g, 'class="nav-link"');
    pageHtml = pageHtml.replace(/class="active"/g, '');

    // Now add active to the matching route
    if (meta.navRoute) {
        const regex1 = new RegExp(`(<a\\s+href="[^"]*"\\s+class="nav-link)("\\s+data-route="${meta.navRoute}")`, 'i');
        pageHtml = pageHtml.replace(regex1, `$1 active$2`);
    }

    // 5. Injected pre-rendered route content directly inside <main id="app-container">
    const prerenderedMain = `<!-- Pre-rendered Static SSR Content for ${routeKey} -->
    <main id="app-container" class="fade-in" data-rendered-route="${routeKey}">
${routeHtml}
    </main>`;

    pageHtml = pageHtml.replace(/<main\s+id="app-container"[\s\S]*?<\/main>/i, prerenderedMain);

    return pageHtml;
}

function build() {
    console.log("🚀 Starting TORQUE Static Site Generation (SSG) & SEO Prerendering Build...");

    const templatePath = path.join(__dirname, 'index.html');
    if (!fs.existsSync(templatePath)) {
        console.error("❌ index.html not found!");
        process.exit(1);
    }

    // Read the pristine template (without old pre-rendered main if any)
    let baseTemplate = fs.readFileSync(templatePath, 'utf8');

    // Strip out any previous pre-rendered main content so we have a clean template
    baseTemplate = baseTemplate.replace(
        /<main\s+id="app-container"[\s\S]*?<\/main>/i,
        `<main id="app-container" class="fade-in">\n        <!-- Content will be injected dynamically by app.js -->\n    </main>`
    );

    const generatedRoutes = [];

    // 1. Build index.html (Home page pre-rendered)
    const homeHtml = generatePageHtml(baseTemplate, 'home', false);
    fs.writeFileSync(templatePath, homeHtml, 'utf8');
    console.log(`✅ [SSG] Generated pre-rendered index.html (Route: home, Size: ${(homeHtml.length / 1024).toFixed(1)} KB)`);
    generatedRoutes.push({ route: 'home', file: 'index.html', url: `${SITE_URL}/`, priority: routesMeta.home.priority });

    // 2. Build all other routes (both flat [route].html and directory [route]/index.html)
    Object.keys(routesMeta).forEach(routeKey => {
        if (routeKey === 'home') return;

        // Flat file: e.g. resources.html
        const flatHtml = generatePageHtml(baseTemplate, routeKey, false);
        const flatPath = path.join(__dirname, `${routeKey}.html`);
        fs.writeFileSync(flatPath, flatHtml, 'utf8');

        // Directory-based file: e.g. resources/index.html (for clean URLs on static hosts)
        const dirPath = path.join(__dirname, routeKey);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        const dirHtml = generatePageHtml(baseTemplate, routeKey, true);
        const dirIndexPath = path.join(dirPath, 'index.html');
        fs.writeFileSync(dirIndexPath, dirHtml, 'utf8');

        console.log(`✅ [SSG] Pre-rendered: ${routeKey}.html & ${routeKey}/index.html (${(flatHtml.length / 1024).toFixed(1)} KB)`);
        generatedRoutes.push({
            route: routeKey,
            file: `${routeKey}/index.html`,
            url: `${SITE_URL}/${routeKey}/`,
            priority: routesMeta[routeKey].priority || '0.7'
        });
    });

    // 3. Generate sitemap.xml
    const today = new Date().toISOString().split('T')[0];
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${generatedRoutes.map(item => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapContent.trim(), 'utf8');
    console.log(`✅ [SEO] Generated sitemap.xml with ${generatedRoutes.length} canonical URLs`);

    // 4. Generate robots.txt
    const robotsContent = `# robots.txt for TORQUE EdTech Platform
User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`;
    fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsContent.trim(), 'utf8');
    console.log(`✅ [SEO] Generated robots.txt pointing to sitemap.xml`);

    console.log(`\n🎉 SSG Build Finished Successfully! All 15 routes are server-side/statically pre-rendered for crawlers.\n`);
}

build();
