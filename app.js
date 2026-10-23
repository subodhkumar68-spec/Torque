// app.js - Torque Client-Side Router & Page Interactions
if (typeof window === 'undefined') {
    global.window = global;
}

// Mock Data
const coursesData = {
    'ug-bba': [
        { title: "BBA Entrance Masterclass", duration: "3 Months", image: "images/bba_masterclass.jpg" },
        { title: "IPMAT Strategy & Prep", duration: "4 Months", image: "images/ipmat_prep.jpg" },
        { title: "Business Foundations 101", duration: "1 Month", image: "images/business_foundations.jpg" }
    ],
    'mba': [
        { title: "CAT / GMAT Elite Prep", duration: "6 Months", image: "images/cat_gmat.jpg" },
        { title: "Executive MBA Primer", duration: "2 Months", image: "images/mba_girl.jpg" },
        { title: "Case Interview Training", duration: "6 Weeks", image: "images/case_interview.jpg" }
    ],
    'others': [
        { title: "Product Management Bootcamp", duration: "10 Weeks", image: "images/product_mgmt.jpg" },
        { title: "Data Analytics with SQL & BI", duration: "8 Weeks", image: "images/data_analytics.jpg" },
        { title: "Tech Recruiting Accelerator", duration: "4 Weeks", image: "images/tech_recruiting.jpg" }
    ]
};

const jobsData = [
    { role: "Product Manager Intern", company: "AeroTech", location: "Remote", type: "Internship", focus: "MBA Focus", icon: "🚀" },
    { role: "Frontend Developer (React)", company: "Synergy Corp", location: "Hybrid / NY", type: "Full-Time", focus: "UG Focus", icon: "💻" },
    { role: "Business Analyst", company: "Deloitte", location: "On-site / SF", type: "Full-Time", focus: "MBA Focus", icon: "📈" },
    { role: "Growth Marketing Manager", company: "FlowState", location: "Remote", type: "Internship", focus: "UG Focus", icon: "📣" },
    { role: "Associate Consultant", company: "McKinsey", location: "On-site / Delhi", type: "Full-Time", focus: "MBA Focus", icon: "💼" },
    { role: "HR Operations Associate", company: "TalentGlow", location: "Remote", type: "Full-Time", focus: "UG Focus", icon: "👥" }
];

const vocabWords = [
    { word: "Alacrity", phonetic: "/əˈlakrədē/", definition: "Brisk and cheerful readiness.", example: "She accepted the invitation with alacrity." },
    { word: "Capricious", phonetic: "/kəˈpriSHəs/", definition: "Given to sudden and unaccountable changes of mood or behavior.", example: "The administration of justice is capricious." },
    { word: "Ephemeral", phonetic: "/əˈfemərəl/", definition: "Lasting for a very short time.", example: "Fashions are ephemeral; true style is eternal." },
    { word: "Pernicious", phonetic: "/pərˈniSHəs/", definition: "Having a harmful effect, especially in a gradual or subtle way.", example: "The pernicious influence of social media on youths." },
    { word: "Abnegate", phonetic: "/ˈabnəˌɡāt/", definition: "To renounce, reject, or surrender a right or privilege.", example: "He chose to abnegate his responsibilities for a simple life." },
    { word: "Acerbic", phonetic: "/əˈsərbik/", definition: "Sour or bitter in taste; harsh or sharp in temper or expression.", example: "Her acerbic wit made her both feared and respected." },
    { word: "Anachronism", phonetic: "/əˈnakrəˌnizəm/", definition: "A thing belonging or appropriate to a period other than that in which it exists.", example: "The use of rotary phones in modern offices is an anachronism." },
    { word: "Bellicose", phonetic: "/ˈbeləˌkōs/", definition: "Demonstrating aggression or willingness to fight.", example: "The nation's bellicose rhetoric worried its neighbors." },
    { word: "Cacophony", phonetic: "/kəˈkäfənē/", definition: "A harsh, discordant mixture of sounds.", example: "The traffic in Mumbai created a loud cacophony." },
    { word: "Chicanery", phonetic: "/SHəˈkānərē/", definition: "The use of trickery or deception to achieve a political, financial, or legal purpose.", example: "The politician resorted to financial chicanery to fund his campaign." },
    { word: "Cogent", phonetic: "/ˈkōjənt/", definition: "Clear, logical, and convincing.", example: "She presented a cogent argument in favor of solar energy." },
    { word: "Dearth", phonetic: "/dərTH/", definition: "A scarcity or lack of something.", example: "There is a dearth of qualified software architects in the region." },
    { word: "Decorum", phonetic: "/dəˈkôrəm/", definition: "Behavior in keeping with good taste and propriety.", example: "He exhibited perfect decorum during the formal dinner." },
    { word: "Desultory", phonetic: "/ˈdesəlˌtôrē/", definition: "Lacking a plan, purpose, or enthusiasm; jumping from one thing to another.", example: "He read the book in a desultory fashion, skipping pages." },
    { word: "Didactic", phonetic: "/dīˈdaktik/", definition: "Intended to teach, particularly in having moral instruction.", example: "The novel was didactic, aiming to instill value structures in children." },
    { word: "Diffident", phonetic: "/ˈdifədənt/", definition: "Modest or shy because of a lack of self-confidence.", example: "She spoke in a diffident whisper, unsure of her answer." },
    { word: "Dilatory", phonetic: "/ˈdiləˌtôrē/", definition: "Slow to act; intended to cause delay.", example: "The lawyer used dilatory tactics to postpone the court hearing." },
    { word: "Equivocal", phonetic: "/əˈkwivəkəl/", definition: "Open to more than one interpretation; ambiguous or double-sided.", example: "The candidate's response to the tax proposal was equivocal." },
    { word: "Erudite", phonetic: "/ˈer(y)əˌdīt/", definition: "Having or showing great knowledge or learning.", example: "The professor delivered an erudite lecture on Roman law." },
    { word: "Esoteric", phonetic: "/ˌesəˈterik/", definition: "Intended for or likely to be understood by only a small number of people.", example: "Quantum field theory is an esoteric subject." },
    { word: "Furtive", phonetic: "/ˈfərdiv/", definition: "Attempting to avoid notice or attention, typically because of guilt.", example: "He cast a furtive glance at the test paper next to him." },
    { word: "Garrulous", phonetic: "/ˈɡerələs/", definition: "Excessively talkative, especially on trivial matters.", example: "The garrulous shopkeeper told stories to anyone who would listen." },
    { word: "Harangue", phonetic: "/həˈraNG/", definition: "A lengthy and aggressive speech.", example: "The coach delivered a loud harangue to the players at halftime." },
    { word: "Iconoclast", phonetic: "/īˈkänəˌklast/", definition: "A person who attacks or criticizes cherished beliefs or institutions.", example: "The artist was an iconoclast, breaking all classic rules." },
    { word: "Implacable", phonetic: "/imˈplakəbəl/", definition: "Unable to be appeased, placated, or stopped.", example: "The march of technological progress is implacable." },
    { word: "Inchoate", phonetic: "/inˈkōət/", definition: "Just begun and so not fully formed or developed; rudimentary.", example: "Her business ideas are still inchoate and need structure." },
    { word: "Inimical", phonetic: "/iˈniməkəl/", definition: "Tending to obstruct or harm; unfriendly or hostile.", example: "Excessive stress is inimical to a healthy lifestyle." },
    { word: "Intransigent", phonetic: "/inˈtransəjənt/", definition: "Uncompromising; refusing to agree or compromise.", example: "The unions remained intransigent, rejecting the pay cuts." },
    { word: "Laconic", phonetic: "/ləˈkänik/", definition: "Using very few words in speech or writing.", example: "His laconic reply of 'No' closed the negotiation." },
    { word: "Loquacious", phonetic: "/lōˈkwāSHəs/", definition: "Talkative; tending to talk a great deal.", example: "She is loquacious when excited, speaking rapidly for hours." },
    { word: "Misanthrope", phonetic: "/ˈmisənˌTHrōp/", definition: "A person who dislikes humankind and avoids human society.", example: "The old hermit lived as a misanthrope in the hills." },
    { word: "Mitigate", phonetic: "/ˈmidəˌɡāt/", definition: "Make less severe, serious, or painful.", example: "Good preparation will help mitigate exam anxiety." },
    { word: "Obdurate", phonetic: "/ˈäbdərət/", definition: "Stubbornly refusing to change one's opinion or course of action.", example: "The president remained obdurate, refusing to resign." },
    { word: "Obsequious", phonetic: "/əbˈsēkwēəs/", definition: "Obedient or attentive to an excessive or servile degree.", example: "The waiters were obsequious, constantly refilling glasses." },
    { word: "Onerous", phonetic: "/ˈänərəs/", definition: "Involving an amount of effort and difficulty that is burdensomely heavy.", example: "Preparing the balance sheet was an onerous task." },
    { word: "Pedantic", phonetic: "/pəˈdantik/", definition: "Excessively concerned with minor details, rules, or learning.", example: "The editor's pedantic corrections annoyed the author." },
    { word: "Penury", phonetic: "/ˈpenyərē/", definition: "Extreme poverty; destitution.", example: "The war forced thousands of citizens into sudden penury." },
    { word: "Pragmatic", phonetic: "/praɡˈmadik/", definition: "Dealing with things sensibly and realistically based on practical terms.", example: "He took a pragmatic approach to solving the budget deficit." },
    { word: "Prevaricate", phonetic: "/prəˈverəˌkāt/", definition: "Speak or act in an evasive way; avoid telling the truth.", example: "The witness began to prevaricate under cross-examination." },
    { word: "Prodigal", phonetic: "/ˈprädəɡəl/", definition: "Wastefully extravagant; spending money or resources freely.", example: "The prodigal heir spent his inheritance on sports cars." },
    { word: "Querulous", phonetic: "/ˈkwer(y)ələs/", definition: "Complaining in a petulant or whining manner.", example: "The sick child spoke in a querulous voice all evening." },
    { word: "Recondite", phonetic: "/ˈrekənˌdīt/", definition: "Little known; abstruse; obscure; deep.", example: "He specializes in the recondite grammar of dead languages." },
    { word: "Reticent", phonetic: "/ˈredəsənt/", definition: "Not revealing one's thoughts or feelings readily; reserved.", example: "He was reticent to share his thoughts on the project." },
    { word: "Soporific", phonetic: "/ˌsäpəˈrifik/", definition: "Tending to induce drowsiness or sleep.", example: "The professor's monotonous voice had a soporific effect." },
    { word: "Specious", phonetic: "/ˈspēSHəs/", definition: "Superficially plausible, but actually incorrect or wrong.", example: "The defense lawyer presented a specious argument." },
    { word: "Taciturn", phonetic: "/ˈtasəˌtərn/", definition: "Reserved or uncommunicative in speech; saying little.", example: "He was a quiet, taciturn man who preferred books to people." },
    { word: "Vacillate", phonetic: "/ˈvasəˌlāt/", definition: "Alternate or waver between different opinions or actions.", example: "She began to vacillate between going to college or starting a business." },
    { word: "Venerate", phonetic: "/ˈvenəˌrāt/", definition: "Regard with great respect; revere.", example: "Many cultures venerate their elders as guides of wisdom." },
    { word: "Veracity", phonetic: "/vəˈrasədē/", definition: "Conformity to facts; accuracy; truthfulness.", example: "The jury doubted the veracity of the suspect's alibi." },
    { word: "Zealot", phonetic: "/ˈzelət/", definition: "A person who is fanatical and uncompromising in pursuit of their ideals.", example: "He was an environmental zealot, protesting against all development." }
];

const newsData = [
    { 
        title: "Germany Study Opportunities: Record International Enrollment Confirmed", 
        category: "The PIE News Update", 
        subline: "International Education News",
        desc: "Germany hits an all-time record of over 402,000 international students. Tuition-free public university models, English-taught Master's degrees, and favorable post-study job seeker visa regulations are driving massive growth.", 
        badge: "badge-primary", 
        link: "https://thepienews.com/news/germany-international-student-numbers-record-high/" 
    },
    { 
        title: "Corporate Placement Surge: Tech Consulting Firms Eye MBA Grads", 
        category: "The Economic Times Update", 
        subline: "News for BBA & MBA Students",
        desc: "Management consulting and digital tech firms report a major spike in MBA hiring. Industry experts emphasize the critical role of structural case interviews and highlight double-digit growth in starting salary packages.", 
        badge: "badge-magenta", 
        link: "https://economictimes.indiatimes.com/?from=mdr" 
    },
    { 
        title: "BBA Internships: Noida & Bangalore FinTech Hubs Lead Hiring Surge", 
        category: "The Economic Times Update", 
        subline: "News for BBA & MBA Students",
        desc: "FinTech companies in key corporate clusters are seeking undergraduate students for summer internships. Digital finance, quantitative analysis, and client operations roles dominate the vacancy listings.", 
        badge: "badge-primary", 
        link: "https://economictimes.indiatimes.com/?from=mdr" 
    },
    { 
        title: "CAT & GMAT Focus 2026: Verbal Reasoning Syllabus Breakdown & Prep Schedules", 
        category: "The Economic Times Update", 
        subline: "News for BBA & MBA Students",
        desc: "Comprehensive review of the updated verbal and analytical logic formats. Academic directors outline structured study maps, core logical reasoning patterns, and weekly mock pacing routines.", 
        badge: "badge-secondary", 
        link: "https://economictimes.indiatimes.com/?from=mdr" 
    },
    { 
        title: "Why Top B-Schools Are Adding Prompt Engineering to MBA Entrance Criteria", 
        category: "The Economic Times Update", 
        subline: "News for BBA & MBA Students",
        desc: "Leading international business schools introduce practical generative AI directives into their application cycles to test strategic structuring, operational planning, and problem-solving behaviors.", 
        badge: "badge-secondary", 
        link: "https://economictimes.indiatimes.com/?from=mdr" 
    }
];

// Entrance Exam Mock Quiz Questions
const mockExamQuestions = {
    CAT: [
        { q: "If worker A takes 10 days to complete a task and worker B takes 15 days, how long will they take working together?", o: ["5 days", "6 days", "7.5 days", "8 days"], a: 1, e: "A's rate = 1/10, B's rate = 1/15. Combined rate = 1/10 + 1/15 = 5/30 = 1/6. Thus, they take 6 days working together." },
        { q: "Choose the word most synonymously aligned with 'Obsequious'.", o: ["Assertive", "Domineering", "Servile", "Rebellious"], a: 2, e: "'Obsequious' means obedient or attentive to an excessive or servile degree." },
        { q: "Find the next number in the sequence: 3, 7, 15, 31, 63, ...", o: ["95", "127", "128", "143"], a: 1, e: "The pattern is 2n + 1. 63 * 2 + 1 = 127." },
        { q: "Identify the grammatically correct sentence.", o: ["The group of students were arguing.", "Either of the plans are acceptable.", "The criteria for evaluation was updated.", "Each of the participants was given a form."], a: 3, e: "'Each' is a singular pronoun and correctly takes the singular verb 'was'." },
        { q: "In a class of 60, 40% study Math, 30% study Science, and 10% study both. How many students study neither?", o: ["24", "18", "20", "12"], a: 0, e: "Total studying Math or Science = 40% + 30% - 10% = 60%. Remaining 40% study neither. 40% of 60 = 24." }
    ],
    GMAT: [
        { q: "A business revenues increased by 20% in Q1 and decreased by 10% in Q2. What is the net percentage change in revenues?", o: ["+10%", "+8%", "+12%", "+5%"], a: 1, e: "Let initial revenue be 100. Q1: 100 * 1.20 = 120. Q2: 120 * 0.90 = 108. Net change = +8%." },
        { q: "If 2^(x+3) = 32, what is the value of x?", o: ["1", "2", "3", "5"], a: 1, e: "32 is 2^5. So x + 3 = 5, which means x = 2." },
        { q: "What is the average (arithmetic mean) of the first five prime numbers?", o: ["5.0", "5.6", "5.8", "6.2"], a: 1, e: "The first five prime numbers are 2, 3, 5, 7, and 11. Sum = 28. Average = 28 / 5 = 5.6." },
        { q: "A retail shelf contains 4 red balls and 6 blue balls. If two are drawn without replacement, what is the probability that both are red?", o: ["2/15", "4/25", "1/6", "3/10"], a: 0, e: "Prob(1st Red) = 4/10. Prob(2nd Red) = 3/9. Product = (4/10) * (3/9) = 12/90 = 2/15." },
        { q: "Identify the critical assumption: 'Since company profits grew by 30% after implementing automated emails, the software caused the profit growth.'", o: ["Automated emails are the cheapest channel.", "No other significant operational or market changes occurred.", "Customers prefer emails to phone calls.", "The software was easy to integrate."], a: 1, e: "To establish a causal relationship, the argument assumes no other external factor was responsible." }
    ],
    GRE: [
        { q: "If x^2 - y^2 = 24 and x - y = 4, what is the value of x + y?", o: ["4", "6", "8", "12"], a: 1, e: "Since x^2 - y^2 = (x - y)(x + y), we have 24 = 4 * (x + y), so x + y = 6." },
        { q: "The manager's genial demeanor was actually ________, masking a strict, demanding leadership style.", o: ["permanent", "sincere", "deceptive", "hostile"], a: 2, e: "'Deceptive' fits because the pleasant (genial) appearance was a mask for a demanding style." },
        { q: "What is the length of the diagonal of a rectangle with length 8 and width 6?", o: ["10", "12", "14", "16"], a: 0, e: "Diagonal^2 = 8^2 + 6^2 = 64 + 36 = 100. Diagonal = 10." },
        { q: "Synonym of 'Capricious':", o: ["Resolute", "Fickle", "Pensive", "Indolent"], a: 1, e: "'Capricious' means impulsive, unpredictable, or fickle." },
        { q: "In a triangle, two sides have lengths 5 and 12. Which of the following could be the length of the third side?", o: ["6", "7", "13", "18"], a: 2, e: "The third side x must satisfy 12 - 5 < x < 12 + 5, so 7 < x < 17. Only 13 fits." }
    ],
    IPMAT: [
        { q: "If log_10(x) + log_10(x-3) = 1, find the value of x.", o: ["2", "5", "10", "15"], a: 1, e: "log_10(x(x-3)) = 1 => x^2 - 3x = 10 => x^2 - 3x - 10 = 0 => (x-5)(x+2) = 0. Since x must be positive for log, x = 5." },
        { q: "In how many ways can the letters of the word 'IPMAT' be arranged?", o: ["60", "120", "240", "720"], a: 1, e: "IPMAT has 5 distinct letters. Number of arrangements = 5! = 120." },
        { q: "A shopkeeper sells an item at 20% profit. If he had bought it at 10% less and sold it for Rs 18 less, he would have gained 30%. Find the cost price.", o: ["Rs 500", "Rs 600", "Rs 800", "Rs 1000"], a: 1, e: "Let CP be x. SP = 1.2x. New CP = 0.9x. New SP = 1.2x - 18. Gain = 30% => 1.2x - 18 = 1.3 * 0.9x = 1.17x => 0.03x = 18 => x = 600." },
        { q: "Choose the word most opposite in meaning to 'Transient'.", o: ["Temporal", "Ephemeral", "Perpetual", "Fleeting"], a: 2, e: "'Transient' means lasting only for a short time. 'Perpetual' means never ending or changing, which is the opposite." },
        { q: "If a + b + c = 0, find the value of (a^3 + b^3 + c^3) / (abc).", o: ["0", "1", "3", "9"], a: 2, e: "Since a + b + c = 0, we know a^3 + b^3 + c^3 = 3abc. Thus, dividing by abc gives 3." }
    ],
    CLAT: [
        { q: "Legal Principle: A person is liable for negligence if they breach a duty of care owed to another. Fact: A driver looks at their phone for 5 seconds and hits a pedestrian on the crossing.", o: ["Driver is not liable since it was only 5 seconds.", "Driver is liable for breaching the duty of care to road users.", "Driver is not liable if the pedestrian was walking slowly.", "Driver is liable only if they were driving over the speed limit."], a: 1, e: "Looking at a phone while driving is a clear breach of the duty of care, constituting negligence." },
        { q: "Which article of the Indian Constitution guarantees the Right to Equality?", o: ["Article 14", "Article 19", "Article 21", "Article 32"], a: 0, e: "Article 14 guarantees equality before the law and equal protection of the laws." },
        { q: "Identify the logical fallacy: 'Nobody has proven that ghosts don't exist; therefore, ghosts exist.'", o: ["Ad Hominem", "Appeal to Ignorance", "Circular Reasoning", "Slippery Slope"], a: 1, e: "Appeal to ignorance argues that a proposition is true simply because it has not yet been proven false." },
        { q: "Find the synonym of 'Abrogate'.", o: ["Create", "Repeal", "Ratify", "Postpone"], a: 1, e: "'Abrogate' means to repeal or do away with a law, right, or formal agreement." },
        { q: "Fact: All lawyers are graduates. Some graduates are authors. Conclusion: Therefore, some lawyers are authors. Is this deduction valid?", o: ["Yes, absolutely valid", "No, invalid deduction", "Valid only if authors are graduates", "Valid only if lawyers write books"], a: 1, e: "The graduates who are authors might not overlap with the graduates who are lawyers. Thus, the conclusion is invalid." }
    ],
    CUET: [
        { q: "If A is B's sister, C is B's mother, and D is C's father, how is A related to D?", o: ["Granddaughter", "Mother", "Aunt", "Daughter"], a: 0, e: "A is sister of B, C is mother of both. D is father of mother C. Thus, A is D's granddaughter." },
        { q: "The capital of India was shifted from Calcutta to Delhi in which year?", o: ["1905", "1911", "1919", "1931"], a: 1, e: "The transfer of capital from Calcutta to Delhi was announced during the Delhi Durbar of 1911." },
        { q: "Calculate the simple interest on Rs 5000 at 8% per annum for 3 years.", o: ["Rs 800", "Rs 1000", "Rs 1200", "Rs 1500"], a: 2, e: "SI = P*R*T/100 = 5000 * 8 * 3 / 100 = 1200." },
        { q: "Complete the analogy: Book is to Publisher as Film is to ________.", o: ["Director", "Actor", "Producer", "Screenwriter"], a: 2, e: "A publisher finances and prints a book; a producer finances and handles production of a film." },
        { q: "Which gas is most abundant in the Earth's atmosphere?", o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"], a: 1, e: "Nitrogen makes up approximately 78% of the Earth's atmosphere." }
    ],
    NMAT: [
        { q: "If the word 'NMAT' is coded as 'OLBU', how is 'TEST' coded?", o: ["UFTU", "SFSU", "SDRS", "UFUT"], a: 0, e: "Each letter is shifted by +1 in the alphabet. T->U, E->F, S->T, T->U." },
        { q: "What is the unit digit of 7^105?", o: ["1", "3", "7", "9"], a: 2, e: "Unit digit cycle for 7 is 7, 9, 3, 1 (length 4). 105 mod 4 = 1. So unit digit is 7." },
        { q: "If x is an even integer, which of the following must be an odd integer?", o: ["3x + 2", "x^2", "5x - 3", "2x + 4"], a: 2, e: "Even * Odd = Even. Even - Odd = Odd. 5(even) - 3 = even - 3 = odd." },
        { q: "Antonym of 'Lethargic':", o: ["Sluggish", "Passive", "Energetic", "Somber"], a: 2, e: "'Lethargic' means sluggish or lacking energy. 'Energetic' is the opposite." },
        { q: "Statement: Some A are B. All B are C. Does it follow that some A are C?", o: ["Yes, definitely", "No", "Only if all B are A", "Only if some C are B"], a: 0, e: "Since some A are B and all B are C, the portion of A that is B must also be C. Thus, some A are C." }
    ],
    UCEED: [
        { q: "Which color model is primarily used in commercial digital print publishing?", o: ["RGB", "CMYK", "HSB", "HEX"], a: 1, e: "CMYK (Cyan, Magenta, Yellow, Key/Black) is the standard subtractive color model used in printing." },
        { q: "If a 3D cube is sliced with a single straight plane cuts, what is the maximum number of sides the resulting cross-section polygon can have?", o: ["4", "5", "6", "8"], a: 2, e: "A plane can intersect up to 6 faces of a cube, producing a hexagon (6 sides)." },
        { q: "Which design principle refers to the relative visual weight of elements in a composition?", o: ["Contrast", "Balance", "Unity", "Rhythm"], a: 1, e: "Balance deals with the distribution of visual weight in a design." },
        { q: "Identify the complementary color of Blue in standard artistic color wheels.", o: ["Green", "Orange", "Purple", "Yellow"], a: 1, e: "Orange is the complementary color directly opposite to Blue on the color wheel." },
        { q: "Which file format preserves vector paths and layers for scalability?", o: ["JPEG", "PNG", "SVG", "GIF"], a: 2, e: "SVG (Scalable Vector Graphics) is an XML-based vector image format." }
    ]
};

// Vocabulary Quiz Questions
const vocabQuizQuestions = [
    { q: "What is the meaning of 'Alacrity'?", o: ["Brisk and cheerful readiness", "A state of profound confusion", "Harmful and subtle effect", "Unpredictable changes of mood"], a: 0, e: "'Alacrity' denotes promptness, quickness, or eager readiness." },
    { q: "Choose the correct meaning of 'Capricious':", o: ["Highly focused and analytical", "Unpredictable, volatile, or impulsive", "Extremely fragile or brief", "Respected and dignified"], a: 1, e: "'Capricious' refers to sudden, unaccountable changes of mood or behavior." },
    { q: "What does 'Ephemeral' mean?", o: ["Beautiful and delicate", "Lasting a very short time", "Eternally persistent", "Difficult to explain"], a: 1, e: "'Ephemeral' describes anything short-lived, transient, or passing." },
    { q: "Identify the correct meaning of 'Pernicious':", o: ["Having a subtle, gradual, and harmful impact", "Extremely generous and giving", "Quick-witted and argumentative", "Loud, clamorous, and chaotic"], a: 0, e: "'Pernicious' means having a harmful effect, especially in a gradual or subtle way." },
    { q: "Which of the following describes a person who is 'obsequious'?", o: ["Overly submissive, servile, and fawning", "Proud, independent, and stubborn", "Highly intelligent and creative", "Sloppy and disorganized"], a: 0, e: "'Obsequious' indicates obedient or attentive to an excessive or servile degree." }
];

// GD & Interview Simulator dialogue trees
const interviewTree = {
    mba: [
        {
            q: "Welcome to the MBA Admission Panel. Let's start: 'Why do you want to pursue an MBA at this stage of your career?'",
            o: [
                { text: "To gain structured business frameworks, lead high-impact teams, and pivot to strategy.", type: "Analytical", f: "Excellent choice. Demonstrates growth mindset and leadership orientation." },
                { text: "I've hit a growth plateau in my tech engineering role and want to pivot to business.", type: "Narrative", f: "Good narrative arc, explaining your background context. Let's make sure it links to strategy." },
                { text: "To secure a high-paying corporate role and expand my professional network.", type: "Transactional", f: "Honest, but too transactional. Highlight leadership and skills development for the panel." }
            ]
        },
        {
            q: "Describe a time when you managed a significant team conflict under pressure.",
            o: [
                { text: "I separated personal biases, analyzed data objectively, and formulated a compromise protocol.", type: "Analytical", f: "Highly analytical. Solves conflict systematically, which panels love." },
                { text: "I sat down with both members to listen, align their goals, and re-establish empathy.", type: "Narrative", f: "Strong EQ and narrative style. Shows team building and communication." },
                { text: "I took over their duties and escalated the issue to our director to ensure timelines were met.", type: "Defensive", f: "Escalating is risky. Show you can resolve peers' conflict independently first." }
            ]
        },
        {
            q: "Where do you see yourself five years post-graduation?",
            o: [
                { text: "Leading corporate strategy or product teams in a high-growth tech organization.", type: "Analytical", f: "Clear, structured long-term objective. Shows strategic focus." },
                { text: "Pivoting my venture idea into a venture-backed sustainable startup.", type: "Narrative", f: "Entrepreneurial spirit. Show how an MBA helps scale that specific idea." },
                { text: "In a stable executive role with high decision-making power.", type: "Transactional", f: "A bit broad. Frame your goals in terms of specific industry impact." }
            ]
        }
    ],
    consulting: [
        {
            q: "Our client, a telecom giant, has seen a 15% drop in EBITDA. How do you analyze this problem?",
            o: [
                { text: "I'll break EBITDA down into revenue and costs, examining subscriber base, ARPU, and SG&A.", type: "Analytical", f: "Solid. You isolated variables using standard McKinsey profitability structures." },
                { text: "I would speak with their marketing lead to launch a new, fresh pricing campaign.", type: "Creative", f: "Jumping to recommendations too fast. Structure your diagnosis first." },
                { text: "I will research their top competitors to see if they are also experiencing decline.", type: "Broad", f: "Helpful external context, but first look at internal cost and revenue structures." }
            ]
        },
        {
            q: "Good. EBITDA cost analysis shows SG&A expenses surged 30%. How do you proceed?",
            o: [
                { text: "Audit SG&A structures: split into office rents, sales incentives, and corporate overhead.", type: "Analytical", f: "High precision. Breaking down SG&A is the exact next step." },
                { text: "Implement headcount freeze and reduce office utility bills.", type: "Operational", f: "Cutting costs without research is risky. First understand cost drivers." },
                { text: "Suggest switching consulting teams to cut administrative costs.", type: "Transactional", f: "Too granular and defensive. Look at large executive travel or sales team costs." }
            ]
        },
        {
            q: "We identified that corporate rents and executive travel drove the spike. What is your final proposal?",
            o: [
                { text: "Enact zero-based travel budgeting, sub-lease extra office space, and link bonuses to EBITDA.", type: "Analytical", f: "Superb strategy. Actionable, structured, and highly commercial." },
                { text: "Reduce office spaces immediately and mandate economy flights for managers.", type: "Operational", f: "Practical advice. Structure it as corporate travel policy for impact." },
                { text: "Write off office equipment to make immediate paper savings.", type: "Tactical", f: "Paper savings won't address underlying cash burn. Think structurally." }
            ]
        }
    ],
    "tech-pm": [
        {
            q: "How would you design an automated smart trash disposal system for a municipality?",
            o: [
                { text: "I'll identify user cohorts (residents, sanitation crews) and their pain points before proposing IoT bins.", type: "User-Centric", f: "Excellent PM behavior. Identifying user personas first is essential." },
                { text: "I will design self-driving trucks with AI computer-vision sorting arms.", type: "Tech-First", f: "Impressive tech vision, but validate user needs and city budget first." },
                { text: "I'll purchase 500 normal metal bins and distribute them evenly in hotspots.", type: "Simple", f: "Effective, but lacks product innovation and data optimization for smart cities." }
            ]
        },
        {
            q: "We need to prioritize features: IoT fill sensors, resident rewards gamification, or automated sorting. MVP?",
            o: [
                { text: "IoT fill sensors. Directly optimizes sanitation truck routes, cutting fuel cost by 20%.", type: "Prioritized", f: "Superb. ROI-driven prioritization focused on core city value." },
                { text: "Gamification app. Incentivizes resident sorting behavior which reduces waste at source.", type: "Engagement", f: "Very creative, but app adoption has high friction. Focus on bins first." },
                { text: "We should release all three to offer a complete, premium ecosystem.", type: "Scope-Creep", f: "Avoid scope-creep. Build, measure, learn on the core IoT bin first." }
            ]
        },
        {
            q: "Engineering says IoT sensors will delay launch by 3 months. What is your response?",
            o: [
                { text: "Negotiate a phased launch: v1.0 with static optimized routes, v1.1 with dynamic IoT sensors.", type: "Collaborative", f: "Great. Flexes scope to preserve launch timeline and gather early data." },
                { text: "Delay launch to ensure we release the complete smart sensor value proposition.", type: "Rigid", f: "Rigid timeline delay. Ensure you don't lose municipal momentum." },
                { text: "Ask developers to work overtime to hit the target date regardless.", type: "Aggressive", f: "Creates team burnout. PMs must negotiate scope and maintain morale." }
            ]
        }
    ],
    gd: [
        {
            q: "Topic: 'Is remote work destroying corporate culture?' How do you open the discussion?",
            o: [
                { text: "Define corporate culture and frame both sides: flexibility vs. organic interaction. Let's debate.", type: "Analytical", f: "Excellent opening. Structures the debate and invites cooperation." },
                { text: "Yes, face-to-face interaction is critical. Remote work is ruining teamwork.", type: "One-Sided", f: "A bit too assertive. Leaves less space for inclusive discussion." },
                { text: "I'll let the others open and then agree with the best opinion.", type: "Passive", f: "GDs evaluate leadership. You need to present structured viewpoints." }
            ]
        },
        {
            q: "A group participant is dominating the session, interrupting others. How do you intervene?",
            o: [
                { text: "Summarize their point and pivot: 'Valid point on tools, let's hear what Sarah thinks on mentorship.'", type: "Inclusive", f: "Stellar leadership. Facilitates inclusion without creating group friction." },
                { text: "Please stop talking, you are taking up everyone's time.", type: "Confrontational", f: "Confrontational. Assessors prefer diplomacy and positive facilitation." },
                { text: "Keep silent and hope the moderator steps in soon.", type: "Passive", f: "Shows lack of initiative. Group self-management is heavily weighted." }
            ]
        },
        {
            q: "We are reaching the final minute of the discussion. How do you summarize?",
            o: [
                { text: "Synthesize both views: remote work challenges culture, but hybrid policies with structured meetups bridge the gap.", type: "Synthesis", f: "Outstanding synthesis. Demonstrates listening skills and consensus building." },
                { text: "In conclusion, remote work is bad and we should all return to office full-time.", type: "One-Sided", f: "Biased. A summary must represent the collective viewpoints of the group." },
                { text: "Thank you everyone, that was a wonderful discussion.", type: "Brief", f: "Too short. Misses the opportunity to demonstrate your capability to summarize insights." }
            ]
        }
    ]
};

// Global App State
const state = {
    // Resume Builder State
    resume: {
        name: "Subodh Kumar",
        title: "Senior Product Designer",
        email: "subodh.kumar@example.com",
        phone: "+91 98765 43210",
        location: "New Delhi, India",
        summary: "Results-driven design leader with 6+ years of creating premium enterprise user experiences. Specializes in building accessible, lightning-fast interfaces using modern visual frameworks.",
        experience: [
            {
                company: "Torque Technologies",
                role: "Senior Lead Interaction Architect",
                date: "2023 - Present",
                desc: "Spearheaded the redesign of Torque's main dashboard module, achieving a 34% increase in user retention. Supervised a cohort of 5 junior UX specialists."
            }
        ],
        education: [
            {
                school: "Indian Institute of Technology, Delhi",
                degree: "B.Tech in Computer Science",
                date: "2016 - 2020",
                desc: "Graduated with Honors. Specialized in Human-Computer Interaction."
            }
        ],
        skills: "Figma, UI/UX Design, CSS Grid, Responsive Architecture, Interaction Prototype, Print Style Sheets",
        theme: "theme-classic-dark"
    },
    // LinkedIn Optimizer State
    linkedin: {
        headline: "Senior Product Designer | Designing Premium High-Scale Products | Figma, React, CSS",
        about: "I am a Senior Product Designer with 6+ years of experience. I have designed platforms that increased user metrics by 40% and generated over $5M in enterprise value. Let's connect!",
        checks: {
            headshot: true,
            customUrl: true,
            headlineCheck: true,
            aboutCheck: true,
            featured: false,
            skillsCheck: true
        }
    },
    // Vocab State
    vocab: {
        currentWordIndex: 0,
        flashcardFlipped: false,
        quizScore: 0,
        quizStep: 0,
        quizUserAnswers: [],
        quizCompleted: false
    },
    // Mock Test State
    mockTest: {
        selectedExam: "CAT",
        currentQuestionIndex: 0,
        score: 0,
        answers: [],
        timeLeft: 60,
        timerInterval: null,
        completed: false
    },
    // Chat simulator state
    chat: {
        mode: "mba",
        step: 0,
        history: [],
        completed: false
    },
    // Job board state
    jobs: {
        searchQuery: "",
        activeCategory: "All"
    },
    // News state
    news: {
        searchQuery: "",
        activeCategory: "All"
    },
    // IELTS Estimator State
    ielts: {
        fluency: "7",
        grammar: "7",
        pronunciation: "7",
        reading: "7",
        estimatedBand: null,
        calculated: false
    },
    // Career Guidance Assessment State
    careerQuiz: {
        activeQuestionIndex: 0,
        answers: {},
        calculated: false,
        dimensionScores: null,
        suggestedCareers: []
    },
    // Resource Hub State
    resources: {
        searchQuery: "",
        activeCategory: "ALL"
    }
};

// Home Page Modular Rendering Components (Mindler-inspired)
function renderHomeHero() {
    return `
        <div class="hero-split">
            <div class="hero-content">
                <span class="badge badge-primary" style="margin-bottom: 1rem;"><i class="fa-solid fa-compass"></i> India's Premier Career Guidance Cockpit</span>
                <h1>Propel Your Career <br>Into <span class="typewriter">Overdrive</span></h1>
                <p class="hero-subtitle">Discover your true path with scientific 5-dimensional career assessments, structured counselling programs, Virtual Internships (VIP), and elite mentor networks.</p>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <a href="#career-guidance" class="btn btn-primary">Take Free 5-D Assessment <i class="fa-solid fa-arrow-right"></i></a>
                    <a href="#resume-builder" class="btn btn-secondary">Build Recruiter-Ready Resume</a>
                </div>
            </div>
            
            <div class="hero-slider-container" style="position: relative;">
                <div class="hero-slider">
                    <div class="hero-slide active" style="background-image: url('images/hero_girl_joy.jpg')"></div>
                    <div class="hero-slide" style="background-image: url('images/hero_group.jpg')"></div>
                    <div class="hero-slide" style="background-image: url('images/hero_presentation.jpg')"></div>
                </div>
                <div class="hero-carousel-overlay">
                    <p>Ready to apply? Speak with our academic counselor.</p>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSey3lHZfMU2pysNcv0YFBhKs718XK_xbuV3BwNBUzgC-LsL5Q/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="width: 100%;"><i class="fa-brands fa-google"></i> Fill Admission & Inquiry Form</a>
                </div>
            </div>
        </div>
    `;
}

function getGradeTabHtml(grade) {
    if (grade === '8-9') {
        return `
            <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 2.5rem; align-items: center; animation: fadeIn 0.4s ease;">
                <div>
                    <h3 style="font-size: 1.4rem; margin-bottom: 1rem; color: var(--text-header);"><i class="fa-solid fa-graduation-cap" style="color: var(--accent-primary); margin-right: 0.5rem;"></i> Early Stream Mapping & Discovery</h3>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                        Lay a strong foundation for high school. Early stream exploration helps identify natural inclinations, orientation styles, and strengths before choosing subjects in later years.
                    </p>
                    <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
                        <li style="color: var(--text-primary); font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 0.5rem;"></i> Orientation style analysis to map study profiles</li>
                        <li style="color: var(--text-primary); font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 0.5rem;"></i> Early interest assessment covering 30+ streams</li>
                        <li style="color: var(--text-primary); font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 0.5rem;"></i> Custom grade-specific roadmap blueprints</li>
                    </ul>
                    <a href="#career-guidance" class="btn btn-primary btn-sm">Start Orientation Assessment</a>
                </div>
                <div style="text-align: center;">
                    <img src="images/hero_girl_joy.jpg" alt="Class 8-9 Counseling" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); box-shadow: var(--shadow-card);">
                </div>
            </div>
        `;
    } else if (grade === '10') {
        return `
            <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 2.5rem; align-items: center; animation: fadeIn 0.4s ease;">
                <div>
                    <h3 style="font-size: 1.4rem; margin-bottom: 1rem; color: var(--text-header);"><i class="fa-solid fa-shuffle" style="color: var(--accent-primary); margin-right: 0.5rem;"></i> Stream Selection & Subjects Decider</h3>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                        Make the most critical decision of your school life. Align your stream selection (Science, Commerce, Humanities) with psychometric aptitude scores and logical motivators.
                    </p>
                    <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
                        <li style="color: var(--text-primary); font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 0.5rem;"></i> Multi-dimensional stream match analytics</li>
                        <li style="color: var(--text-primary); font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 0.5rem;"></i> 1-on-1 counseling options for stream conflicts</li>
                        <li style="color: var(--text-primary); font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 0.5rem;"></i> Subjects combination advisor dashboards</li>
                    </ul>
                    <a href="#career-guidance" class="btn btn-primary btn-sm">Choose Your Ideal Stream</a>
                </div>
                <div style="text-align: center;">
                    <img src="images/hero_group.jpg" alt="Class 10 Stream Selection" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); box-shadow: var(--shadow-card);">
                </div>
            </div>
        `;
    } else if (grade === '11-12') {
        return `
            <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 2.5rem; align-items: center; animation: fadeIn 0.4s ease;">
                <div>
                    <h3 style="font-size: 1.4rem; margin-bottom: 1rem; color: var(--text-header);"><i class="fa-solid fa-school" style="color: var(--accent-primary); margin-right: 0.5rem;"></i> University Planning & Competitive Entrance</h3>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                        Secure admission to top institutions. Track domestic application timelines (IPMAT, Delhi University, IIM integrated channels) and global admissions criteria (SAT, essays, profiles).
                    </p>
                    <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
                        <li style="color: var(--text-primary); font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 0.5rem;"></i> Timed Mock tests drills for IPMAT, CUET, GMAT</li>
                        <li style="color: var(--text-primary); font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 0.5rem;"></i> University shortlists based on aptitude profiles</li>
                        <li style="color: var(--text-primary); font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 0.5rem;"></i> Overseas essays guidelines & profile building checklists</li>
                    </ul>
                    <a href="#exams" class="btn btn-primary btn-sm">Enter Exam Prep Hub</a>
                </div>
                <div style="text-align: center;">
                    <img src="images/hero_presentation.jpg" alt="University planning" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); box-shadow: var(--shadow-card);">
                </div>
            </div>
        `;
    } else {
        return `
            <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 2.5rem; align-items: center; animation: fadeIn 0.4s ease;">
                <div>
                    <h3 style="font-size: 1.4rem; margin-bottom: 1rem; color: var(--text-header);"><i class="fa-solid fa-briefcase" style="color: var(--accent-primary); margin-right: 0.5rem;"></i> Placements Prep, CV Architecture & PG Lounge</h3>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                        Transition seamlessly from university to corporate. Optimize your CV via interactive tools, evaluate profile strengths for CAT/GMAT MBA entrance, and search target job boards.
                    </p>
                    <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
                        <li style="color: var(--text-primary); font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 0.5rem;"></i> Resume Builder with custom themes & PDF print export</li>
                        <li style="color: var(--text-primary); font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 0.5rem;"></i> Mock interview simulator panel (Analytical / Consulting / Tech PM)</li>
                        <li style="color: var(--text-primary); font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 0.5rem;"></i> Startup accelerator validation blueprints</li>
                    </ul>
                    <a href="#resume-builder" class="btn btn-primary btn-sm" style="margin-right: 0.5rem;">Build Resume</a>
                    <a href="#gd-interview" class="btn btn-secondary btn-sm">Simulate Interview</a>
                </div>
                <div style="text-align: center;">
                    <img src="images/hero_presentation.jpg" alt="College Graduates Counselling" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); box-shadow: var(--shadow-card);">
                </div>
            </div>
        `;
    }
}

function renderHomeGradeTabs() {
    return `
        <div style="margin-top: 6rem;">
            <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">Grade-Specific Counselling Milestones</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Select your current academic stage to view custom guidance pathways.</p>
            
            <div class="glass-card" style="padding: 2.5rem; max-width: 900px; margin: 0 auto;">
                <div class="modal-tabs" style="display: flex; justify-content: space-around; border-bottom: 2px solid var(--border-color); margin-bottom: 2rem; flex-wrap: wrap; gap: 0.5rem;">
                    <button class="modal-tab-btn active" id="btn-grade-tab-8-9" onclick="switchGradeTab('8-9')" style="flex: 1; min-width: 120px; padding: 1rem; border: none; font-weight: bold; background: none; color: var(--text-secondary); cursor: pointer; transition: 0.3s;">Classes 8 - 9</button>
                    <button class="modal-tab-btn" id="btn-grade-tab-10" onclick="switchGradeTab('10')" style="flex: 1; min-width: 120px; padding: 1rem; border: none; font-weight: bold; background: none; color: var(--text-secondary); cursor: pointer; transition: 0.3s;">Class 10 Choice</button>
                    <button class="modal-tab-btn" id="btn-grade-tab-11-12" onclick="switchGradeTab('11-12')" style="flex: 1; min-width: 120px; padding: 1rem; border: none; font-weight: bold; background: none; color: var(--text-secondary); cursor: pointer; transition: 0.3s;">Classes 11 - 12</button>
                    <button class="modal-tab-btn" id="btn-grade-tab-grad" onclick="switchGradeTab('grad')" style="flex: 1; min-width: 120px; padding: 1rem; border: none; font-weight: bold; background: none; color: var(--text-secondary); cursor: pointer; transition: 0.3s;">Graduates / College</button>
                </div>
                
                <div id="grade-tab-content-container" style="min-height: 200px;">
                    ${getGradeTabHtml('8-9')}
                </div>
            </div>
        </div>
    `;
}

window.switchGradeTab = function(grade) {
    if (typeof document === 'undefined') return;
    const btns = document.querySelectorAll('.modal-tab-btn');
    btns.forEach(btn => {
        if (btn.id === `btn-grade-tab-${grade}`) {
            btn.classList.add('active');
            btn.style.borderBottom = '3px solid var(--accent-primary)';
            btn.style.color = 'var(--accent-primary)';
        } else if (btn.id.startsWith('btn-grade-tab-')) {
            btn.classList.remove('active');
            btn.style.borderBottom = 'none';
            btn.style.color = 'var(--text-secondary)';
        }
    });

    const container = document.getElementById('grade-tab-content-container');
    if (!container) return;
    container.innerHTML = getGradeTabHtml(grade);
};

function renderHomeAdvantage() {
    return `
        <div style="margin-top: 6rem;">
            <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">Interactive Career Toolkit</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Precision-built tools to accelerate your learning and placement readiness.</p>
            
            <div class="grid-courses">
                <div class="glass-card" onclick="window.location.hash='#resume-builder'" style="cursor: pointer; padding: 2rem;">
                    <span class="badge badge-primary" style="margin-bottom: 1rem;"><i class="fa-solid fa-file-invoice"></i> Resume</span>
                    <h3 style="color: var(--text-header);">Interactive Resume Builder</h3>
                    <p style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">Build, preview, and print a premium recruiter-ready CV with optimized custom layouts and themes.</p>
                </div>
                <div class="glass-card" onclick="window.location.hash='#gd-interview'" style="cursor: pointer; padding: 2rem;">
                    <span class="badge badge-secondary" style="margin-bottom: 1rem;"><i class="fa-solid fa-comments"></i> AI Simulator</span>
                    <h3 style="color: var(--text-header);">GD & Interview Simulator</h3>
                    <p style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">Engage in real-time chat with custom interview tracks and receive direct strategic feedback.</p>
                </div>
                <div class="glass-card" onclick="window.location.hash='#linkedin-optimizer'" style="cursor: pointer; padding: 2rem;">
                    <span class="badge badge-magenta" style="margin-bottom: 1rem;"><i class="fa-brands fa-linkedin"></i> Profile Review</span>
                    <h3 style="color: var(--text-header);">LinkedIn Blueprint</h3>
                    <p style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">Analyze profile strength in real-time and review structured optimizations for recruiters.</p>
                </div>
            </div>
        </div>
    `;
}

function renderHomeDimensions() {
    return `
        <div style="margin-top: 6rem;">
            <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">Scientific 5-Dimensional Career Assessment</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Modelled on global research frameworks, Torque maps candidate metrics across five core pillars.</p>
            
            <div class="grid-courses">
                <div class="glass-card" style="padding: 1.5rem;">
                    <div style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 0.75rem;"><i class="fa-solid fa-compass"></i></div>
                    <h4 style="color: var(--text-header);">Orientation Style</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-top: 0.5rem;">Measures your preferred work environments and cognitive problem solving approaches.</p>
                </div>
                <div class="glass-card" style="padding: 1.5rem;">
                    <div style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 0.75rem;"><i class="fa-solid fa-heart"></i></div>
                    <h4 style="color: var(--text-header);">Interest Areas</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-top: 0.5rem;">Identifies core career domains (Tech, Business, Finance, Creative) that keep you engaged.</p>
                </div>
                <div class="glass-card" style="padding: 1.5rem;">
                    <div style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 0.75rem;"><i class="fa-solid fa-user-gear"></i></div>
                    <h4 style="color: var(--text-header);">Personality Profile</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-top: 0.5rem;">Maps your leadership, collaboration traits, execution styles, and social motivators.</p>
                </div>
                <div class="glass-card" style="padding: 1.5rem;">
                    <div style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 0.75rem;"><i class="fa-solid fa-brain"></i></div>
                    <h4 style="color: var(--text-header);">Aptitude Strengths</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-top: 0.5rem;">Quantifies your natural verbal reasoning, quantitative, logical, and design abilities.</p>
                </div>
                <div class="glass-card" style="padding: 1.5rem;">
                    <div style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 0.75rem;"><i class="fa-solid fa-gem"></i></div>
                    <h4 style="color: var(--text-header);">Work Values</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-top: 0.5rem;">Defines what drives your dedication - autonomy, community impact, or status growth.</p>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 2.5rem;">
                <a href="#career-guidance" class="btn btn-primary">Take 5-D Career Match Assessment</a>
            </div>
        </div>
    `;
}

function renderHomeVIP() {
    return `
        <div style="margin-top: 6rem;">
            <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">Virtual Internship Programs (VIP)</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Experience real job workflows virtually before choosing your university or pg career track.</p>
            
            <div class="grid-courses">
                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <span class="badge badge-primary" style="margin-bottom: 1rem;">Simulation</span>
                        <h3 style="margin-bottom: 0.75rem; color: var(--text-header);">Product Management VIP</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem;">Work on simulated PRD structures, target segment wireframes, and design features prioritizing algorithms.</p>
                    </div>
                    <a href="#others" class="btn btn-secondary btn-sm" style="width: 100%;">Launch Simulation</a>
                </div>
                
                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <span class="badge badge-secondary" style="margin-bottom: 1rem;">Simulation</span>
                        <h3 style="margin-bottom: 0.75rem; color: var(--text-header);">Management Consulting VIP</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem;">Apply Porter's 5 Forces and the Minto Pyramid Principle to resolve mock technology strategy cases.</p>
                    </div>
                    <a href="#mba" class="btn btn-secondary btn-sm" style="width: 100%;">Launch Simulation</a>
                </div>

                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <span class="badge badge-magenta" style="margin-bottom: 1rem;">Simulation</span>
                        <h3 style="margin-bottom: 0.75rem; color: var(--text-header);">Investment Banking VIP</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem;">Evaluate simulated corporate balance sheets, DCF models, and compute enterprise value ratios.</p>
                    </div>
                    <a href="#career-guidance" class="btn btn-secondary btn-sm" style="width: 100%;">Launch Simulation</a>
                </div>
            </div>
        </div>
    `;
}

function renderHomeCareerLibrary() {
    return `
        <div style="margin-top: 6rem;">
            <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">Interactive Career Library</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Explore curated streams, required entrance pathways, and national placement salary benchmarks.</p>
            
            <div class="glass-card" style="padding: 2.5rem; max-width: 800px; margin: 0 auto;">
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    
                    <!-- Panel 1: Business & Tech Management -->
                    <div class="accordion-item" id="accordion-lib-mgmt">
                        <div class="accordion-header" onclick="toggleAccordion('accordion-lib-mgmt')">
                            <span style="font-weight: 600; color: var(--text-header);"><i class="fa-solid fa-briefcase" style="color: var(--accent-primary); margin-right: 0.75rem;"></i> Business & Tech Management</span>
                            <i class="fa-solid fa-chevron-down" style="color: var(--text-secondary);"></i>
                        </div>
                        <div class="accordion-content">
                            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">Careers include Product Managers, Strategy Consultants, and HR Operations directors.</p>
                            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                                <strong>Entrance:</strong> CAT, GMAT, IPMAT | <strong>Avg. Placements:</strong> ₹12L - ₹28L per annum.
                            </div>
                            
                            <!-- Nested Dropdowns for Mgmt Resources -->
                            <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: 1rem;">
                                <h4 style="font-size: 0.85rem; color: var(--accent-primary); margin-bottom: 0.75rem;"><i class="fa-solid fa-book-open"></i> Best Resources & Readings to Go Through:</h4>
                                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                    
                                    <!-- Books Sub-Dropdown -->
                                    <div class="nested-accordion">
                                        <div class="nested-header" onclick="toggleNestedAccordion('nested-mgmt-books')" style="cursor: pointer; display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; color: var(--text-primary); padding: 0.5rem 0.75rem; background: var(--bg-primary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
                                            <span><i class="fa-solid fa-book" style="margin-right: 0.4rem; color: var(--accent-secondary);"></i> Recommended Reading Materials</span>
                                            <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem;"></i>
                                        </div>
                                        <div id="nested-mgmt-books" style="display: none; padding: 0.75rem; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; border-left: 2px solid var(--accent-primary); margin-left: 0.5rem; margin-top: 0.25rem;">
                                            <ul style="padding-left: 1.2rem; list-style-type: disc; margin: 0;">
                                                <li><strong>"The McKinsey Way"</strong> by Ethan M. Rasiel - Master structured business problem-solving frameworks.</li>
                                                <li><strong>"Inspired: How to Create Tech Products Customers Love"</strong> by Marty Cagan - The holy grail guide for modern Tech Product Managers.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <!-- Portals Sub-Dropdown -->
                                    <div class="nested-accordion">
                                        <div class="nested-header" onclick="toggleNestedAccordion('nested-mgmt-webs')" style="cursor: pointer; display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; color: var(--text-primary); padding: 0.5rem 0.75rem; background: var(--bg-primary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
                                            <span><i class="fa-solid fa-globe" style="margin-right: 0.4rem; color: var(--accent-secondary);"></i> Interactive Learning Portals</span>
                                            <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem;"></i>
                                        </div>
                                        <div id="nested-mgmt-webs" style="display: none; padding: 0.75rem; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; border-left: 2px solid var(--accent-primary); margin-left: 0.5rem; margin-top: 0.25rem;">
                                            <ul style="padding-left: 1.2rem; list-style-type: disc; margin: 0; display: flex; flex-direction: column; gap: 0.4rem;">
                                                <li><strong>Mindler Career Blog:</strong> Essential resource for stream selection and career roadmap reviews. <a href="https://www.mindler.com/blog/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; font-weight: 600;">Visit Blog <i class="fa-solid fa-up-right-from-square"></i></a></li>
                                                <li><strong>Harvard Business Review (HBR):</strong> Premium business case studies, case-cracking tutorials, and industry reports. <a href="https://hbr.org/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; font-weight: 600;">Open HBR <i class="fa-solid fa-up-right-from-square"></i></a></li>
                                                <li><strong>Strategy+Business:</strong> Highly recommended for reading management trends and corporate strategy notes. <a href="https://www.strategy-business.com/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; font-weight: 600;">Explore Portal <i class="fa-solid fa-up-right-from-square"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Panel 2: Banking, Finance & Accounts -->
                    <div class="accordion-item" id="accordion-lib-fin">
                        <div class="accordion-header" onclick="toggleAccordion('accordion-lib-fin')">
                            <span style="font-weight: 600; color: var(--text-header);"><i class="fa-solid fa-coins" style="color: var(--accent-secondary); margin-right: 0.75rem;"></i> Banking, Finance & Accounts</span>
                            <i class="fa-solid fa-chevron-down" style="color: var(--text-secondary);"></i>
                        </div>
                        <div class="accordion-content">
                            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">Careers include Investment Bankers, Wealth Managers, Actuaries, and Treasury Officers.</p>
                            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                                <strong>Entrance:</strong> CAT, GMAT, IPMAT | <strong>Avg. Placements:</strong> ₹10L - ₹32L per annum.
                            </div>
                            
                            <!-- Nested Dropdowns for Fin Resources -->
                            <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: 1rem;">
                                <h4 style="font-size: 0.85rem; color: var(--accent-primary); margin-bottom: 0.75rem;"><i class="fa-solid fa-book-open"></i> Best Resources & Readings to Go Through:</h4>
                                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                    
                                    <!-- Books Sub-Dropdown -->
                                    <div class="nested-accordion">
                                        <div class="nested-header" onclick="toggleNestedAccordion('nested-fin-books')" style="cursor: pointer; display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; color: var(--text-primary); padding: 0.5rem 0.75rem; background: var(--bg-primary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
                                            <span><i class="fa-solid fa-book" style="margin-right: 0.4rem; color: var(--accent-secondary);"></i> Recommended Reading Materials</span>
                                            <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem;"></i>
                                        </div>
                                        <div id="nested-fin-books" style="display: none; padding: 0.75rem; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; border-left: 2px solid var(--accent-primary); margin-left: 0.5rem; margin-top: 0.25rem;">
                                            <ul style="padding-left: 1.2rem; list-style-type: disc; margin: 0;">
                                                <li><strong>"Investment Banking: Valuation, LBOs, M&A"</strong> by Joshua Rosenbaum & Joshua Pearl - The foundational textbook for financial analysis & modeling.</li>
                                                <li><strong>"The Intelligent Investor"</strong> by Benjamin Graham - The definitive book on value investing and asset allocation.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <!-- Portals Sub-Dropdown -->
                                    <div class="nested-accordion">
                                        <div class="nested-header" onclick="toggleNestedAccordion('nested-fin-webs')" style="cursor: pointer; display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; color: var(--text-primary); padding: 0.5rem 0.75rem; background: var(--bg-primary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
                                            <span><i class="fa-solid fa-globe" style="margin-right: 0.4rem; color: var(--accent-secondary);"></i> Interactive Learning Portals</span>
                                            <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem;"></i>
                                        </div>
                                        <div id="nested-fin-webs" style="display: none; padding: 0.75rem; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; border-left: 2px solid var(--accent-primary); margin-left: 0.5rem; margin-top: 0.25rem;">
                                            <ul style="padding-left: 1.2rem; list-style-type: disc; margin: 0; display: flex; flex-direction: column; gap: 0.4rem;">
                                                <li><strong>Corporate Finance Institute (CFI):</strong> Great resource for free templates, modeling sheets, and finance lessons. <a href="https://corporatefinanceinstitute.com/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; font-weight: 600;">Visit CFI <i class="fa-solid fa-up-right-from-square"></i></a></li>
                                                <li><strong>Investopedia:</strong> The most comprehensive interactive dictionary for financial concepts, ratios, and tutorials. <a href="https://www.investopedia.com/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; font-weight: 600;">Open Investopedia <i class="fa-solid fa-up-right-from-square"></i></a></li>
                                                <li><strong>Bloomberg Markets:</strong> Real-time macro analysis, market briefings, and global financial reviews. <a href="https://www.bloomberg.com/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; font-weight: 600;">Open Bloomberg <i class="fa-solid fa-up-right-from-square"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Panel 3: Computer Science & AI Analytics -->
                    <div class="accordion-item" id="accordion-lib-tech">
                        <div class="accordion-header" onclick="toggleAccordion('accordion-lib-tech')">
                            <span style="font-weight: 600; color: var(--text-header);"><i class="fa-solid fa-laptop-code" style="color: var(--accent-magenta); margin-right: 0.75rem;"></i> Computer Science & AI Analytics</span>
                            <i class="fa-solid fa-chevron-down" style="color: var(--text-secondary);"></i>
                        </div>
                        <div class="accordion-content">
                            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">Careers include Data Scientists, Software Architects, and Prompt Engineers.</p>
                            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                                <strong>Target Skills:</strong> Python, LLMs, SQL, Agile | <strong>Avg. Placements:</strong> ₹14L - ₹35L per annum.
                            </div>
                            
                            <!-- Nested Dropdowns for Tech Resources -->
                            <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: 1rem;">
                                <h4 style="font-size: 0.85rem; color: var(--accent-primary); margin-bottom: 0.75rem;"><i class="fa-solid fa-book-open"></i> Best Resources & Readings to Go Through:</h4>
                                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                    
                                    <!-- Books Sub-Dropdown -->
                                    <div class="nested-accordion">
                                        <div class="nested-header" onclick="toggleNestedAccordion('nested-tech-books')" style="cursor: pointer; display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; color: var(--text-primary); padding: 0.5rem 0.75rem; background: var(--bg-primary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
                                            <span><i class="fa-solid fa-book" style="margin-right: 0.4rem; color: var(--accent-secondary);"></i> Recommended Reading Materials</span>
                                            <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem;"></i>
                                        </div>
                                        <div id="nested-tech-books" style="display: none; padding: 0.75rem; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; border-left: 2px solid var(--accent-primary); margin-left: 0.5rem; margin-top: 0.25rem;">
                                            <ul style="padding-left: 1.2rem; list-style-type: disc; margin: 0;">
                                                <li><strong>"Clean Code: A Handbook of Agile Software Craftsmanship"</strong> by Robert C. Martin - Essential principles of writing clean, maintainable engineering code.</li>
                                                <li><strong>"Designing Data-Intensive Applications"</strong> by Martin Kleppmann - The industry benchmark guide for learning system design, databases, and scaling.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <!-- Portals Sub-Dropdown -->
                                    <div class="nested-accordion">
                                        <div class="nested-header" onclick="toggleNestedAccordion('nested-tech-webs')" style="cursor: pointer; display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; color: var(--text-primary); padding: 0.5rem 0.75rem; background: var(--bg-primary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
                                            <span><i class="fa-solid fa-globe" style="margin-right: 0.4rem; color: var(--accent-secondary);"></i> Interactive Learning Portals</span>
                                            <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem;"></i>
                                        </div>
                                        <div id="nested-tech-webs" style="display: none; padding: 0.75rem; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; border-left: 2px solid var(--accent-primary); margin-left: 0.5rem; margin-top: 0.25rem;">
                                            <ul style="padding-left: 1.2rem; list-style-type: disc; margin: 0; display: flex; flex-direction: column; gap: 0.4rem;">
                                                <li><strong>Kaggle:</strong> Curated machine learning datasets, data science competitions, and interactive notebooks. <a href="https://www.kaggle.com/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; font-weight: 600;">Visit Kaggle <i class="fa-solid fa-up-right-from-square"></i></a></li>
                                                <li><strong>GitHub Explore:</strong> Great for discovering trending codebases, open-source libraries, and prompt repos. <a href="https://github.com/explore" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; font-weight: 600;">Open GitHub Explore <i class="fa-solid fa-up-right-from-square"></i></a></li>
                                                <li><strong>DeepLearning.AI:</strong> Leading courses in machine learning, LLM fine-tuning, and prompt engineering by Andrew Ng. <a href="https://www.deeplearning.ai/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; font-weight: 600;">Explore DeepLearning <i class="fa-solid fa-up-right-from-square"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderHomeMentors() {
    return `
        <div style="margin-top: 6rem;">
            <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">Certified Academic Mentors</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Our panel features certified admissions & career counselors with elite international backgrounds.</p>
            
            <div class="grid-courses">
                <div class="glass-card" style="padding: 2rem; text-align: center;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--bg-tertiary); border: 2px solid var(--accent-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                        <i class="fa-solid fa-user-doctor" style="font-size: 2.5rem; color: var(--accent-primary);"></i>
                    </div>
                    <h3 style="color: var(--text-header);">Dr. Anjali Mehta</h3>
                    <p style="color: var(--accent-secondary); font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem;">Counseling & Psychology Lead</p>
                    <p style="color: var(--text-muted); font-size: 0.8rem; line-height: 1.5;">PhD in Child Psychology, ex-IIM Advisory panelist. Expert in stream selection conflicts.</p>
                </div>
                
                <div class="glass-card" style="padding: 2rem; text-align: center;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--bg-tertiary); border: 2px solid var(--accent-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                        <i class="fa-solid fa-user-tie" style="font-size: 2.5rem; color: var(--accent-primary);"></i>
                    </div>
                    <h3 style="color: var(--text-header);">Vikram Malhotra</h3>
                    <p style="color: var(--accent-secondary); font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem;">MBA Placement Strategy Advisor</p>
                    <p style="color: var(--text-muted); font-size: 0.8rem; line-height: 1.5;">Wharton Alum, ex-McKinsey Strategic Analyst. Expert in corporate case studies coaching.</p>
                </div>

                <div class="glass-card" style="padding: 2rem; text-align: center;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--bg-tertiary); border: 2px solid var(--accent-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                        <i class="fa-solid fa-graduation-cap" style="font-size: 2.5rem; color: var(--accent-primary);"></i>
                    </div>
                    <h3 style="color: var(--text-header);">Sarah Jenkins</h3>
                    <p style="color: var(--accent-secondary); font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem;">Global Admissions Coach</p>
                    <p style="color: var(--text-muted); font-size: 0.8rem; line-height: 1.5;">Oxford Alum, ex-Ivy League admissions auditor. Expert in Statement of Purpose (SOP) structures.</p>
                </div>
            </div>
        </div>
    `;
}

function renderHomeTestimonials() {
    return `
        <div style="margin-top: 6rem;">
            <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">Student Success Testimonials</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Hear from students and parents who found career direction through Torque.</p>
            
            <div class="grid-courses">
                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--accent-primary);">
                    <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; font-style: italic; margin-bottom: 1.5rem;">
                        "The 5-dimensional career assessment was an eye-opener. I was completely confused between Humanities and Commerce, but my profile report mapped my aptitude directly to Corporate Economics. Highly recommended!"
                    </p>
                    <div>
                        <strong style="color: var(--text-header); display: block; font-size: 0.95rem;">Rohan Sen</strong>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">Class 10 Student, Delhi NCR</span>
                    </div>
                </div>

                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--accent-primary);">
                    <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; font-style: italic; margin-bottom: 1.5rem;">
                        "As parents, we wanted our daughter to pursue engineering, but the Torque advisor showed her quantitative aptitude was highly correlated with product design. She is now happily studying at a top UX design institute."
                    </p>
                    <div>
                        <strong style="color: var(--text-header); display: block; font-size: 0.95rem;">Mr. & Mrs. Sharma</strong>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">Parents of Class 12 candidate, Mumbai</span>
                    </div>
                </div>

                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--accent-primary);">
                    <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; font-style: italic; margin-bottom: 1.5rem;">
                        "The consulting virtual internship simulation was extremely helpful. Getting to apply Minto's principle and present strategy options prepared me for McKinsey case interviews. I got the job!"
                    </p>
                    <div>
                        <strong style="color: var(--text-header); display: block; font-size: 0.95rem;">Priya Iyer</strong>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">MBA Candidate, IIM Indore Alumna</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderHomeAcademicHubs() {
    return `
        <!-- Academic Hubs -->
        <div style="margin-top: 6rem;">
            <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">Specialized Academic Hubs</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Accelerate your education and prep with courses designed for placements and entrance excellence.</p>
            
            <div class="grid-courses">
                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <div style="font-size: 2.5rem; color: var(--accent-primary); margin-bottom: 1rem;"><i class="fa-solid fa-graduation-cap"></i></div>
                        <h3 style="margin-bottom: 0.75rem; color: var(--text-header);">Undergrad & BBA Prep</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">Foundational management modules, corporate internship bootcamps, and essential communication guides.</p>
                    </div>
                    <a href="#ug-bba" class="btn btn-secondary btn-sm" style="width: 100%;">Explore BBA Hub <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                
                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <div style="font-size: 2.5rem; color: var(--accent-primary); margin-bottom: 1rem;"><i class="fa-solid fa-briefcase"></i></div>
                        <h3 style="margin-bottom: 0.75rem; color: var(--text-header);">Postgrad & MBA Lounge</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">Advanced placement prep, strategy checklists, Porter's 5 Forces framework tools, and case study masterclasses.</p>
                    </div>
                    <a href="#mba" class="btn btn-secondary btn-sm" style="width: 100%;">Explore MBA Hub <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <div style="font-size: 2.5rem; color: var(--accent-primary); margin-bottom: 1rem;"><i class="fa-solid fa-rocket"></i></div>
                        <h3 style="margin-bottom: 0.75rem; color: var(--text-header);">Startup Accelerator</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">12-Week Incubator Program for student founders. Features an interactive Pitch Deck Readiness Auditor widget.</p>
                    </div>
                    <a href="#startup-accelerator" class="btn btn-secondary btn-sm" style="width: 100%;">Launch Accelerator <i class="fa-solid fa-arrow-right"></i></a>
                </div>

                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <div style="font-size: 2.5rem; color: var(--accent-primary); margin-bottom: 1rem;"><i class="fa-solid fa-language"></i></div>
                        <h3 style="margin-bottom: 0.75rem; color: var(--text-header);">Soft Skills & Language Academy</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">Corporate email templates, spoken English guides, TESOL training, and our interactive IELTS Band Estimator.</p>
                    </div>
                    <a href="#soft-skills" class="btn btn-secondary btn-sm" style="width: 100%;">Improve Communication <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    `;
}

function renderHomeMockTeaser() {
    return `
        <!-- Mock Test Arena Teaser -->
        <div style="margin-top: 6rem; background: var(--bg-tertiary); padding: 3.5rem 2.5rem; border-radius: var(--border-radius-md); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; gap: 3rem; flex-wrap: wrap;">
            <div style="flex: 1.5; min-width: 300px;">
                <span class="badge badge-primary" style="margin-bottom: 1rem;"><i class="fa-solid fa-stopwatch"></i> Competitive Exams</span>
                <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--text-header);">Are You Ready for CAT, GMAT, or GRE?</h2>
                <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6; margin-bottom: 0;">Step into our <strong>Timed Mock Test Arena</strong> to evaluate your verbal and quantitative reasoning skills. Get real-time scores, countdown timer drills, and detailed breakdowns of answer explanations.</p>
            </div>
            <div style="flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 0.75rem; justify-content: center; align-items: flex-start;">
                <div style="color: var(--text-primary); font-size: 0.95rem;"><i class="fa-solid fa-check" style="color: #10b981; margin-right: 0.5rem;"></i> CAT verbal & quant focus</div>
                <div style="color: var(--text-primary); font-size: 0.95rem;"><i class="fa-solid fa-check" style="color: #10b981; margin-right: 0.5rem;"></i> GMAT Focus syllabus drills</div>
                <div style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: #10b981; margin-right: 0.5rem;"></i> Explanations by top percentile experts</div>
                <a href="#exams" class="btn btn-primary" style="width: 100%;">Enter Timed Test Arena <i class="fa-solid fa-gamepad"></i></a>
            </div>
        </div>
    `;
}

function renderHomePlacementNews() {
    return `
        <!-- Careers & News Teaser -->
        <div style="margin-top: 6rem;">
            <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">Latest Careers & Industry Updates</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Stay ahead of corporate recruiting, exam alerts, and curriculum revisions.</p>
            
            <div class="grid-courses" style="margin-top: 2rem;">
                <div class="glass-card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; border-left: 4px solid var(--accent-primary);">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                            <span class="badge badge-magenta" style="font-size: 0.75rem; padding: 0.2rem 0.6rem; margin: 0;">Economic Times Update</span>
                            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">News for BBA & MBA Students</span>
                        </div>
                        <h4 style="margin: 0.5rem 0; font-size: 1.15rem; line-height: 1.4; color: var(--text-header);">Corporate Placement Surge: Tech Consulting Firms Eye MBA Grads</h4>
                        <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.5rem;">Management consulting and digital tech firms report a major spike in MBA hiring. Industry experts emphasize the critical role of structural case interviews and highlight double-digit growth in starting salary packages.</p>
                    </div>
                    <a href="https://economictimes.indiatimes.com/?from=mdr" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); font-size: 0.9rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">Read Full Story <i class="fa-solid fa-angle-right"></i></a>
                </div>
                
                <div class="glass-card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; border-left: 4px solid var(--accent-primary);">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                            <span class="badge badge-primary" style="font-size: 0.75rem; padding: 0.2rem 0.6rem; margin: 0;">Economic Times Update</span>
                            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">News for BBA & MBA Students</span>
                        </div>
                        <h4 style="margin: 0.5rem 0; font-size: 1.15rem; line-height: 1.4; color: var(--text-header);">BBA Internships: Noida & Bangalore FinTech Hubs Lead Hiring Surge</h4>
                        <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.5rem;">FinTech companies in key corporate clusters are seeking undergraduate students for summer internships. Digital finance, quantitative analysis, and client operations roles dominate the vacancy listings.</p>
                    </div>
                    <a href="https://economictimes.indiatimes.com/?from=mdr" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); font-size: 0.9rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">Read Full Story <i class="fa-solid fa-angle-right"></i></a>
                </div>
            </div>
        </div>
    `;
}

function renderHomeContactEmbed() {
    return `
        <!-- Front Page Contact & Google Form Embed -->
        <div id="front-contact-section" style="margin-top: 6rem; margin-bottom: 2rem;">
            <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">Get in Touch</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Ready to propel your career? Speak with our academic advisors or submit your inquiry below.</p>
            
            <div class="front-contact-grid">
                <!-- Left Side: Contact details card -->
                <div class="glass-card" style="padding: 2.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-header);"><i class="fa-solid fa-user-tie" style="color: var(--accent-primary);"></i> Academic Counselling</h3>
                        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem;">
                            Our admissions and corporate placement team is here to guide BBA, MBA, and working professionals. Get help on custom curriculum paths, soft skills coaching, and startup incubator applications.
                        </p>
                        
                        <div class="contact-coordinate-list" style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.95rem; margin-bottom: 2rem;">
                            <div style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-primary);">
                                <i class="fa-solid fa-envelope" style="color: var(--accent-primary); width: 20px; font-size: 1.1rem;"></i>
                                <div>
                                    <strong style="display: block; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Email Us</strong>
                                    <a href="mailto:subodh.kumar68@gmail.com" style="color: var(--accent-primary); text-decoration: underline; font-weight: 600;">subodh.kumar68@gmail.com</a>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-primary);">
                                <i class="fa-solid fa-phone" style="color: var(--accent-primary); width: 20px; font-size: 1.1rem;"></i>
                                <div>
                                    <strong style="display: block; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Call Us</strong>
                                    <a href="tel:9824413735" style="color: var(--accent-primary); text-decoration: underline; font-weight: 600;">+91 98244 13735</a>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-primary);">
                                <i class="fa-solid fa-location-dot" style="color: var(--accent-primary); width: 20px; font-size: 1.1rem;"></i>
                                <div>
                                    <strong style="display: block; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Headquarters</strong>
                                    <span style="font-weight: 600; color: var(--text-primary);">India</span>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-primary);">
                                <i class="fa-brands fa-linkedin" style="color: var(--accent-primary); width: 20px; font-size: 1.1rem;"></i>
                                <div>
                                    <strong style="display: block; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">LinkedIn</strong>
                                    <a href="https://www.linkedin.com/in/subodh-kumar-1a91822/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; font-weight: 600;">Subodh Kumar Profile</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fa-solid fa-shield-halved" style="color: #10b981;"></i>
                        <span>Secure transmission: Your details will only be used for academic counseling support.</span>
                    </div>
                </div>
                
                <!-- Right Side: Google Form Iframe embed -->
                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <h3 style="font-size: 1.5rem; margin: 0; color: var(--text-header);"><i class="fa-solid fa-file-invoice" style="color: var(--accent-primary);"></i> General Contact Form</h3>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSey3lHZfMU2pysNcv0YFBhKs718XK_xbuV3BwNBUzgC-LsL5Q/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem; color: var(--accent-primary); text-decoration: underline; font-weight: 600;"><i class="fa-solid fa-up-right-from-square"></i> Open Form in New Tab</a>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">Fill out this form and we'll process your request instantly.</p>
                    <div class="front-google-form-wrapper" style="flex: 1; border-radius: var(--border-radius-sm); overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow-neon-glow); min-height: 400px; background: #ffffff;">
                        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSey3lHZfMU2pysNcv0YFBhKs718XK_xbuV3BwNBUzgC-LsL5Q/viewform?embedded=true" width="100%" height="450" frameborder="0" marginheight="0" marginwidth="0" style="border: none; width: 100%; height: 100%; min-height: 400px; display: block;">Loading…</iframe>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Data for TORQUE Resource Hub
const resourcesData = {
    cbse: [
        {
            title: "Previous Years' Question Papers",
            desc: "Official CBSE archive of past examination question papers for Class 10 & 12 subjects.",
            url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
            icon: "fa-file-signature",
            category: "CBSE",
            officialBadge: "Official CBSE Resource"
        },
        {
            title: "Sample Question Papers",
            desc: "Official model sample papers with marking patterns issued by CBSE Academic.",
            url: "https://www.cbse.gov.in/cbsenew/samplepaper.html",
            icon: "fa-file-lines",
            category: "CBSE",
            officialBadge: "Official CBSE Resource"
        },
        {
            title: "Question Bank",
            desc: "Subject-wise exemplar question banks and competency-based practice questions.",
            url: "https://www.cbse.gov.in/cbsenew/question_bank.html",
            icon: "fa-boxes-stacked",
            category: "CBSE",
            officialBadge: "Official CBSE Resource"
        },
        {
            title: "Marking Schemes",
            desc: "Official answer keys and step-by-step marking schemes for self-evaluation.",
            url: "https://www.cbse.gov.in/cbsenew/marking-scheme.html",
            icon: "fa-list-check",
            category: "CBSE",
            officialBadge: "Official CBSE Resource"
        },
        {
            title: "CBSE Main Website",
            desc: "Primary portal for announcements, board exam results, notifications and circulars.",
            url: "https://www.cbse.gov.in/",
            icon: "fa-building-columns",
            category: "CBSE",
            officialBadge: "Official CBSE Resource"
        },
        {
            title: "CBSE Academic Website",
            desc: "Official academic repository, curriculum updates, teacher manuals and e-content.",
            url: "https://cbseacademic.nic.in/",
            icon: "fa-graduation-cap",
            category: "CBSE",
            officialBadge: "Official CBSE Resource"
        },
        {
            title: "Curriculum & Syllabus",
            desc: "Official subject curriculum breakdowns for Secondary & Senior Secondary classes.",
            url: "https://cbseacademic.nic.in/curriculum_2027.html",
            icon: "fa-book-open",
            category: "CBSE",
            officialBadge: "Official CBSE Resource"
        },
        {
            title: "CBSE E-Resources / E-Books",
            desc: "Official digital textbooks, e-content learning materials and interactive student guides.",
            url: "https://cbseacademic.nic.in/e-content.html",
            icon: "fa-laptop-code",
            category: "CBSE",
            officialBadge: "Official CBSE Resource"
        },
        {
            title: "CBSE Circulars",
            desc: "Official administrative and academic circulars issued by CBSE Academic.",
            url: "https://cbseacademic.nic.in/circulars.html",
            icon: "fa-bullhorn",
            category: "CBSE",
            officialBadge: "Official CBSE Resource"
        },
        {
            title: "CBSE Affiliation",
            desc: "Official guidelines, bylaws, and portal for school affiliation information (SARAS).",
            url: "https://www.cbse.gov.in/cbsenew/aboutaff.html",
            icon: "fa-certificate",
            category: "CBSE",
            officialBadge: "Official CBSE Resource"
        }
    ],
    entranceExams: [
        {
            title: "IPMAT Indore",
            stream: "MANAGEMENT",
            desc: "Five-year Integrated Programme in Management entrance test conducted by IIM Indore.",
            url: "https://www.iimidr.ac.in/",
            icon: "fa-briefcase",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: true,
            torqueRoute: "#exams"
        },
        {
            title: "IPMAT Rohtak",
            stream: "MANAGEMENT",
            desc: "Integrated Programme in Management admission test conducted by IIM Rohtak.",
            url: "https://www.iimrohtak.ac.in/",
            icon: "fa-briefcase",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: true,
            torqueRoute: "#exams"
        },
        {
            title: "JIPMAT",
            stream: "MANAGEMENT",
            desc: "Joint Integrated Programme in Management Admission Test for IIM Jammu & Bodh Gaya.",
            url: "https://jipmat.nta.ac.in/",
            icon: "fa-briefcase",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: true,
            torqueRoute: "#exams"
        },
        {
            title: "NPAT",
            stream: "MANAGEMENT",
            desc: "NMIMS Programs After Higher Secondary for BBA, B.Sc Finance & Commerce degrees.",
            url: "https://www.npat.in/",
            icon: "fa-briefcase",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: false
        },
        {
            title: "SET",
            stream: "MANAGEMENT",
            desc: "Symbiosis Entrance Test for undergraduate management, economics & computer studies.",
            url: "https://www.set-test.org/",
            icon: "fa-briefcase",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: true,
            torqueRoute: "#exams"
        },
        {
            title: "CUET",
            stream: "MANAGEMENT",
            desc: "Common University Entrance Test for central and partner university undergraduate admissions.",
            url: "https://exams.nta.ac.in/CUET-UG/",
            icon: "fa-graduation-cap",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: true,
            torqueRoute: "#exams"
        },
        {
            title: "CLAT",
            stream: "LAW",
            desc: "Common Law Admission Test for 24+ National Law Universities (NLUs) across India.",
            url: "https://consortiumofnlus.ac.in/",
            icon: "fa-scale-balanced",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: true,
            torqueRoute: "#exams"
        },
        {
            title: "AILET",
            stream: "LAW",
            desc: "All India Law Entrance Test conducted by National Law University Delhi.",
            url: "https://nationallawuniversitydelhi.in/",
            icon: "fa-scale-balanced",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: false
        },
        {
            title: "SLAT",
            stream: "LAW",
            desc: "Symbiosis Law Admission Test for Symbiosis Law Schools (BA LLB & BBA LLB).",
            url: "https://www.set-test.org/",
            icon: "fa-scale-balanced",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: false
        },
        {
            title: "NID DAT",
            stream: "DESIGN",
            desc: "National Institute of Design Design Aptitude Test for B.Des & M.Des programs.",
            url: "https://admissions.nid.edu/",
            icon: "fa-palette",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: true,
            torqueRoute: "#exams"
        },
        {
            title: "UCEED",
            stream: "DESIGN",
            desc: "Undergraduate Common Entrance Examination for Design by IIT Bombay.",
            url: "https://www.uceed.iitb.ac.in/",
            icon: "fa-pen-nib",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: true,
            torqueRoute: "#exams"
        },
        {
            title: "NIFT",
            stream: "DESIGN",
            desc: "National Institute of Fashion Technology entrance test for design & technology courses.",
            url: "https://nift.ac.in/",
            icon: "fa-shirt",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: false
        },
        {
            title: "JEE Main",
            stream: "ENGINEERING",
            desc: "Joint Entrance Examination for NITs, IIITs & CFTIs conducted by National Testing Agency.",
            url: "https://jeemain.nta.ac.in/",
            icon: "fa-atom",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: false
        },
        {
            title: "BITSAT",
            stream: "ENGINEERING",
            desc: "Birla Institute of Technology & Science Admission Test for B.E. programs at BITS campuses.",
            url: "https://www.bitsadmission.com/",
            icon: "fa-gear",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: false
        },
        {
            title: "NDA & NA",
            stream: "DEFENCE",
            desc: "National Defence Academy & Naval Academy entrance examination conducted by UPSC.",
            url: "https://upsc.gov.in/",
            icon: "fa-shield-halved",
            category: "ENTRANCE EXAMS",
            hasTorqueGuide: false
        }
    ],
    careers: [
        {
            title: "Management & BBA",
            desc: "Corporate leadership, brand strategy, digital consulting, and financial management.",
            icon: "fa-chart-pie",
            category: "CAREER",
            torqueRoute: "#ug-bba"
        },
        {
            title: "Law",
            desc: "Corporate law, litigation, intellectual property, international arbitration, and legal tech.",
            icon: "fa-scale-balanced",
            category: "CAREER",
            torqueRoute: "#exams"
        },
        {
            title: "Design",
            desc: "User experience (UX/UI), product design, communication design, and industrial innovation.",
            icon: "fa-palette",
            category: "CAREER",
            torqueRoute: "#exams"
        },
        {
            title: "Engineering",
            desc: "Software architecture, AI & machine learning, cloud infrastructure, and robotics.",
            icon: "fa-code",
            category: "CAREER",
            torqueRoute: "#others"
        },
        {
            title: "Defence",
            desc: "Strategic leadership, military operations, aerospace engineering, and national security.",
            icon: "fa-shield-halved",
            category: "CAREER",
            torqueRoute: "#exams"
        },
        {
            title: "Liberal Arts",
            desc: "Interdisciplinary research, economics, public policy, psychology, and media studies.",
            icon: "fa-landmark",
            category: "CAREER",
            torqueRoute: "#career-guidance"
        },
        {
            title: "Commerce & Finance",
            desc: "Investment banking, chartered accountancy, wealth management, and FinTech operations.",
            icon: "fa-coins",
            category: "CAREER",
            torqueRoute: "#mba"
        },
        {
            title: "Computer Science & Technology",
            desc: "Full-stack software development, data analytics, cybersecurity, and cloud systems.",
            icon: "fa-laptop-code",
            category: "CAREER",
            torqueRoute: "#others"
        },
        {
            title: "Study Abroad",
            desc: "Global university admissions, IELTS/GRE/GMAT prep, scholarship maps, and visa guidance.",
            icon: "fa-plane-departure",
            category: "CAREER",
            torqueRoute: "#soft-skills"
        },
        {
            title: "Future Skills",
            desc: "Prompt engineering, executive communications, agile management, and AI fluency.",
            icon: "fa-wand-magic-sparkles",
            category: "CAREER",
            torqueRoute: "#soft-skills"
        }
    ],
    tools: [
        {
            title: "Career Discovery",
            desc: "Scientific 5-dimensional career assessment mapping orientation, interest, and aptitude.",
            icon: "fa-compass",
            category: "TORQUE TOOLS",
            status: "Live Tool",
            torqueRoute: "#career-guidance"
        },
        {
            title: "Entrance Exam Planner",
            desc: "Custom timeline tracker and countdown planner for upcoming entrance tests.",
            icon: "fa-calendar-check",
            category: "TORQUE TOOLS",
            status: "Coming Soon",
            torqueRoute: null
        },
        {
            title: "College Selection Guide",
            desc: "Data-driven college comparison matrix based on cutoffs, fees, and placement ROI.",
            icon: "fa-school",
            category: "TORQUE TOOLS",
            status: "Coming Soon",
            torqueRoute: null
        },
        {
            title: "Interview Preparation",
            desc: "Interactive dialogue simulator with custom tracks (MBA, Consulting, Tech PM).",
            icon: "fa-user-tie",
            category: "TORQUE TOOLS",
            status: "Live Tool",
            torqueRoute: "#gd-interview"
        },
        {
            title: "GD Preparation",
            desc: "Group discussion consensus builder, opener strategy, and real-time scenario drills.",
            icon: "fa-comments",
            category: "TORQUE TOOLS",
            status: "Live Tool",
            torqueRoute: "#gd-interview"
        },
        {
            title: "Application & Personal Statement Guidance",
            desc: "SOP architectural guidelines, essay structuring blueprints, and reviewer checklists.",
            icon: "fa-file-signature",
            category: "TORQUE TOOLS",
            status: "Coming Soon",
            torqueRoute: null
        },
        {
            title: "AI Tools for Students",
            desc: "Interactive prompt playground for cover letters, executive summaries, and case studies.",
            icon: "fa-robot",
            category: "TORQUE TOOLS",
            status: "Live Tool",
            torqueRoute: "#others"
        },
        {
            title: "Resume & LinkedIn Guidance",
            desc: "Dynamic recruiter-ready resume builder with PDF export and live LinkedIn profile auditor.",
            icon: "fa-file-invoice",
            category: "TORQUE TOOLS",
            status: "Live Tool",
            torqueRoute: "#resume-builder"
        },
        {
            title: "Future Skills",
            desc: "Daily vocabulary flashcards, GRE/GMAT drills, soft skills, and IELTS band estimator.",
            icon: "fa-brain",
            category: "TORQUE TOOLS",
            status: "Live Tool",
            torqueRoute: "#vocab-builder"
        }
    ]
};

function renderResourcesPage() {
    return `
        <div class="resource-hub-container" style="max-width: 1200px; margin: 0 auto; padding: 1rem 0 3rem;">
            
            <!-- Header Section -->
            <div class="resource-hub-header">
                <div class="resource-hub-notice">
                    <i class="fa-solid fa-arrows-rotate"></i> Updated regularly | Official sources wherever applicable
                </div>
                <h1 style="font-size: 2.8rem; font-weight: 800; color: var(--text-header); margin-bottom: 0.5rem; letter-spacing: -0.5px;">
                    TORQUE RESOURCE HUB
                </h1>
                <h2 style="font-size: 1.25rem; font-weight: 600; color: var(--accent-primary); margin-bottom: 1rem;">
                    "Your Gateway to Learning, Preparation & Career Information"
                </h2>
                <p style="max-width: 780px; margin: 0 auto 2.5rem; color: var(--text-secondary); font-size: 1rem; line-height: 1.6;">
                    Curated resources for students, parents and educators — from CBSE preparation and entrance examinations to career exploration and future-ready skills.
                </p>
            </div>

            <!-- Search & Filter Controls -->
            <div class="resource-hub-search-container" style="max-width: 650px; margin: 0 auto 1.5rem; position: relative;">
                <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 1.1rem;"></i>
                <input type="text" id="resource-search-input" class="form-control" placeholder="Search Resources (e.g. CBSE Papers, IPMAT, CLAT, Engineering, Resume)..." oninput="filterResources()" style="padding-left: 3rem; padding-right: 2.5rem; height: 52px; border-radius: 30px; font-size: 1rem; box-shadow: var(--shadow-card);">
                <button id="resource-search-clear" onclick="clearResourceSearch()" aria-label="Clear Search" style="position: absolute; right: 1.25rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; display: none;"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <div class="resource-hub-filters" style="display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 3rem;">
                <button class="resource-filter-btn active" data-category="ALL" onclick="setResourceCategory('ALL')">ALL</button>
                <button class="resource-filter-btn" data-category="CBSE" onclick="setResourceCategory('CBSE')">CBSE</button>
                <button class="resource-filter-btn" data-category="ENTRANCE EXAMS" onclick="setResourceCategory('ENTRANCE EXAMS')">ENTRANCE EXAMS</button>
                <button class="resource-filter-btn" data-category="CAREER" onclick="setResourceCategory('CAREER')">CAREER</button>
                <button class="resource-filter-btn" data-category="TORQUE TOOLS" onclick="setResourceCategory('TORQUE TOOLS')">TORQUE TOOLS</button>
            </div>

            <!-- SECTION 1: CBSE BOARD RESOURCES -->
            <div id="resource-section-cbse" class="resource-section">
                <div class="resource-section-title">
                    <i class="fa-solid fa-graduation-cap" style="color: var(--accent-primary);"></i> CBSE BOARD RESOURCES
                </div>
                <div class="resource-section-subtitle">
                    Essential official resources for students, parents and schools.
                </div>
                <div id="resource-grid-cbse" class="resource-grid">
                    ${resourcesData.cbse.map(item => `
                        <div class="resource-card" data-title="${item.title.toLowerCase()}" data-desc="${item.desc.toLowerCase()}" data-tag="cbse official board">
                            <div>
                                <span class="resource-official-badge">
                                    <i class="fa-solid fa-shield-check"></i> ${item.officialBadge}
                                </span>
                                <div class="resource-card-icon">
                                    <i class="fa-solid ${item.icon}"></i>
                                </div>
                                <h3 class="resource-card-title">${item.title}</h3>
                                <p class="resource-card-desc">${item.desc}</p>
                            </div>
                            <div class="resource-card-action">
                                <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="width: 100%; text-align: center; justify-content: center;" aria-label="Access official ${item.title}">
                                    Access Official Resource <i class="fa-solid fa-arrow-up-right-from-square" style="margin-left: 0.4rem; font-size: 0.8rem;"></i>
                                </a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- SECTION 2: ENTRANCE EXAM RESOURCES -->
            <div id="resource-section-entrance-exams" class="resource-section">
                <div class="resource-section-title">
                    <i class="fa-solid fa-award" style="color: var(--accent-primary);"></i> ENTRANCE EXAM RESOURCES
                </div>
                <div class="resource-section-subtitle">
                    Verified official portals for national entrance examinations across competitive pathways.
                </div>
                <div id="resource-grid-entrance-exams" class="resource-grid">
                    ${resourcesData.entranceExams.map(item => `
                        <div class="resource-card" data-title="${item.title.toLowerCase()}" data-desc="${item.desc.toLowerCase()}" data-tag="entrance exam ${item.stream.toLowerCase()}">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                                    <span class="badge badge-primary" style="font-size: 0.75rem;">${item.stream}</span>
                                    ${item.hasTorqueGuide ? '<span class="badge badge-secondary" style="font-size: 0.7rem;"><i class="fa-solid fa-bolt"></i> TORQUE Prep</span>' : '<span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Coming Soon</span>'}
                                </div>
                                <div class="resource-card-icon">
                                    <i class="fa-solid ${item.icon}"></i>
                                </div>
                                <h3 class="resource-card-title">${item.title}</h3>
                                <p class="resource-card-desc">${item.desc}</p>
                            </div>
                            <div class="resource-card-action" style="display: flex; gap: 0.5rem; flex-direction: column;">
                                <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="width: 100%; text-align: center; justify-content: center;" aria-label="Visit official website for ${item.title}">
                                    Official Website <i class="fa-solid fa-arrow-up-right-from-square" style="margin-left: 0.4rem; font-size: 0.8rem;"></i>
                                </a>
                                ${item.hasTorqueGuide ? `<a href="${item.torqueRoute}" class="btn btn-primary btn-sm" style="width: 100%; text-align: center; justify-content: center;"><i class="fa-solid fa-pen-to-square"></i> Explore TORQUE Prep</a>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- SECTION 3: CAREER PATHWAYS -->
            <div id="resource-section-career" class="resource-section">
                <div class="resource-section-title">
                    <i class="fa-solid fa-compass" style="color: var(--accent-primary);"></i> CAREER PATHWAYS
                </div>
                <div class="resource-section-subtitle">
                    Structured intelligence on high-growth sectors, entrance maps and skill demands.
                </div>
                <div id="resource-grid-career" class="resource-grid">
                    ${resourcesData.careers.map(item => `
                        <div class="resource-card" data-title="${item.title.toLowerCase()}" data-desc="${item.desc.toLowerCase()}" data-tag="career pathway ${item.title.toLowerCase()}">
                            <div>
                                <div class="resource-card-icon">
                                    <i class="fa-solid ${item.icon}"></i>
                                </div>
                                <h3 class="resource-card-title">${item.title}</h3>
                                <p class="resource-card-desc">${item.desc}</p>
                            </div>
                            <div class="resource-card-action">
                                <a href="${item.torqueRoute}" class="btn btn-primary btn-sm" style="width: 100%; text-align: center; justify-content: center;" aria-label="Explore ${item.title} career pathway">
                                    Explore Career <i class="fa-solid fa-arrow-right" style="margin-left: 0.4rem; font-size: 0.8rem;"></i>
                                </a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- SECTION 4: TORQUE STUDENT TOOLS -->
            <div id="resource-section-torque-tools" class="resource-section">
                <div class="resource-section-title">
                    <i class="fa-solid fa-toolbox" style="color: var(--accent-primary);"></i> TORQUE STUDENT TOOLS
                </div>
                <div class="resource-section-subtitle">
                    Interactive digital tools to assess, practice, and optimize your career trajectory.
                </div>
                <div id="resource-grid-torque-tools" class="resource-grid">
                    ${resourcesData.tools.map(item => `
                        <div class="resource-card" data-title="${item.title.toLowerCase()}" data-desc="${item.desc.toLowerCase()}" data-tag="torque tools ${item.status.toLowerCase()}">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                                    <span class="badge ${item.status === 'Live Tool' ? 'badge-primary' : 'badge-secondary'}" style="font-size: 0.75rem;">
                                        ${item.status === 'Live Tool' ? '<i class="fa-solid fa-circle-play"></i> Live Tool' : '<i class="fa-solid fa-hourglass-half"></i> Coming Soon'}
                                    </span>
                                </div>
                                <div class="resource-card-icon">
                                    <i class="fa-solid ${item.icon}"></i>
                                </div>
                                <h3 class="resource-card-title">${item.title}</h3>
                                <p class="resource-card-desc">${item.desc}</p>
                            </div>
                            <div class="resource-card-action">
                                ${item.status === 'Live Tool' && item.torqueRoute ? `
                                    <a href="${item.torqueRoute}" class="btn btn-primary btn-sm" style="width: 100%; text-align: center; justify-content: center;" aria-label="Launch ${item.title} tool">
                                        Launch Tool <i class="fa-solid fa-rocket" style="margin-left: 0.4rem; font-size: 0.8rem;"></i>
                                    </a>
                                ` : `
                                    <button class="btn btn-secondary btn-sm" disabled style="width: 100%; text-align: center; justify-content: center; opacity: 0.7; cursor: not-allowed;">
                                        Coming Soon
                                    </button>
                                `}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- SECTION 5: STRONG CTA BANNER -->
            <div class="resource-cta-banner glass-card">
                <span class="badge badge-primary" style="margin-bottom: 1rem;"><i class="fa-solid fa-user-gear"></i> Personalised Career Advisory</span>
                <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-header); margin-bottom: 0.75rem;">
                    Not Sure Which Path Is Right for You?
                </h2>
                <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 650px; margin: 0 auto 2rem; line-height: 1.6;">
                    Get personalised guidance on courses, entrance exams, colleges and career pathways.
                </p>
                <button onclick="openLeadModal('Free Career Counselling')" class="btn btn-primary btn-lg" style="padding: 0.85rem 2rem; font-size: 1rem;" aria-label="Book a free career counselling session">
                    <i class="fa-solid fa-calendar-check" style="margin-right: 0.5rem;"></i> BOOK A FREE CAREER COUNSELLING SESSION
                </button>
            </div>

            <!-- SECTION 6: DISCLAIMER -->
            <div class="resource-disclaimer-box">
                <strong style="color: var(--text-header); display: block; margin-bottom: 0.35rem;"><i class="fa-solid fa-triangle-exclamation" style="color: var(--accent-primary); margin-right: 0.4rem;"></i> Disclaimer & Verification Notice:</strong>
                TORQUE curates these resources for educational convenience. External websites and examination portals are independently operated by their respective organisations. Students should verify dates, eligibility, fees and official notifications directly with the relevant authority.
            </div>

        </div>
    `;
}

window.setResourceCategory = function(cat) {
    state.resources.activeCategory = cat;
    const btns = document.querySelectorAll('.resource-filter-btn');
    btns.forEach(btn => {
        if (btn.getAttribute('data-category') === cat) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    filterResources();
};

window.filterResources = function() {
    const searchInput = document.getElementById('resource-search-input');
    const clearBtn = document.getElementById('resource-search-clear');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    state.resources.searchQuery = query;

    if (clearBtn) {
        clearBtn.style.display = query ? 'block' : 'none';
    }

    const activeCat = state.resources.activeCategory;
    const sections = ['cbse', 'entrance-exams', 'career', 'torque-tools'];

    sections.forEach(secKey => {
        const sectionElem = document.getElementById(`resource-section-${secKey}`);
        const cardsGrid = document.getElementById(`resource-grid-${secKey}`);
        if (!cardsGrid || !sectionElem) return;

        let categoryMatch = false;
        if (activeCat === 'ALL') {
            categoryMatch = true;
        } else if (activeCat === 'CBSE' && secKey === 'cbse') {
            categoryMatch = true;
        } else if (activeCat === 'ENTRANCE EXAMS' && secKey === 'entrance-exams') {
            categoryMatch = true;
        } else if (activeCat === 'CAREER' && secKey === 'career') {
            categoryMatch = true;
        } else if (activeCat === 'TORQUE TOOLS' && secKey === 'torque-tools') {
            categoryMatch = true;
        }

        if (!categoryMatch) {
            sectionElem.style.display = 'none';
            return;
        }

        const cards = cardsGrid.querySelectorAll('.resource-card');
        let visibleInGrid = 0;

        cards.forEach(card => {
            const title = card.getAttribute('data-title') || '';
            const desc = card.getAttribute('data-desc') || '';
            const tag = card.getAttribute('data-tag') || '';
            
            if (!query || title.includes(query) || desc.includes(query) || tag.includes(query)) {
                card.style.display = 'flex';
                visibleInGrid++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleInGrid > 0) {
            sectionElem.style.display = 'block';
        } else {
            sectionElem.style.display = 'none';
        }
    });
};

window.clearResourceSearch = function() {
    const searchInput = document.getElementById('resource-search-input');
    if (searchInput) {
        searchInput.value = '';
        filterResources();
    }
};

// Router Configuration
const routes = {
    'career-guidance': () => renderCareerGuidancePage(),
    'resources': () => renderResourcesPage(),
    about: () => `
        <div style="max-width: 1100px; margin: 0 auto; padding: 1rem 0 3rem;">
            <div style="text-align: center; margin-bottom: 3.5rem;">
                <span class="badge badge-primary" style="margin-bottom: 1rem;"><i class="fa-solid fa-compass"></i> About TORQUE</span>
                <h1 style="font-size: 2.8rem; font-weight: 800; color: var(--text-header); margin-bottom: 0.75rem;">Career Intelligence for the Next Generation</h1>
                <p style="max-width: 760px; margin: 0 auto; color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6;">
                    TORQUE is an elite career intelligence ecosystem bridging secondary education, competitive entrance preparation, university admissions, and corporate placement.
                </p>
            </div>
            
            <div class="glass-card" style="padding: 2.5rem; margin-bottom: 4rem;">
                <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: var(--text-header);"><i class="fa-solid fa-bullseye" style="color: var(--accent-primary); margin-right: 0.5rem;"></i> Our Mission & Vision</h2>
                <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1rem; margin-bottom: 1.5rem;">
                    We believe career paths should not be determined by guesswork, parental pressure, or outdated advice. By blending psychometric 5-dimensional assessments, curated CBSE academic archives, national entrance portals, hands-on simulation environments, and advisory from Wharton, McKinsey, and IIM alumni, TORQUE equips students and professionals with decisive clarity.
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    <div style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
                        <div style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 0.5rem;"><i class="fa-solid fa-microscope"></i></div>
                        <h4 style="color: var(--text-header); margin-bottom: 0.35rem;">Scientific 5-D Profiling</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Orientation style, interests, personality, aptitude, and work values mapping.</p>
                    </div>
                    <div style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
                        <div style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 0.5rem;"><i class="fa-solid fa-laptop-code"></i></div>
                        <h4 style="color: var(--text-header); margin-bottom: 0.35rem;">AI Career Tools</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Interactive Resume Builder, LinkedIn Optimizer, Vocab Drills, and Interview Simulator.</p>
                    </div>
                    <div style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
                        <div style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 0.5rem;"><i class="fa-solid fa-award"></i></div>
                        <h4 style="color: var(--text-header); margin-bottom: 0.35rem;">Elite Mentorship</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Personalized career counselling and corporate case coaching from industry veterans.</p>
                    </div>
                </div>
            </div>

            ${renderHomeMentors()}
            ${renderHomeTestimonials()}

            <div style="text-align: center; margin-top: 4rem;">
                <a href="#career-guidance" class="btn btn-primary" style="margin-right: 1rem;">Take 5-D Assessment <i class="fa-solid fa-arrow-right"></i></a>
                <button class="btn btn-secondary" onclick="openLeadModal('General Inquiry')">Contact Advisory Board</button>
            </div>
        </div>
    `,
    home: () => `
        ${renderHomeHero()}
        ${renderHomeGradeTabs()}
        ${renderHomeAdvantage()}
        ${renderHomeDimensions()}
        ${renderHomeVIP()}
        ${renderHomeCareerLibrary()}
        ${renderHomeMentors()}
        ${renderHomeTestimonials()}
        ${renderHomeAcademicHubs()}
        ${renderHomeMockTeaser()}
        ${renderHomePlacementNews()}
        ${renderHomeContactEmbed()}
    `,
    'ug-bba': () => `
        <div>
            ${renderCourseCatalog('UG & BBA Prep', 'ug-bba')}
            
            <div style="margin-top: 5rem;">
                <h2 style="text-align: center; margin-bottom: 0.5rem;">Interactive Soft Skills Playbook</h2>
                <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem;">Master crucial interview and corporate soft skills via micro-builders.</p>
                
                <div class="accordion-item" id="accordion-pres">
                    <div class="accordion-header" onclick="toggleAccordion('accordion-pres')">
                        <span><i class="fa-solid fa-chalkboard-user" style="color: var(--accent-primary); margin-right: 0.5rem;"></i> Master Presentation Skills</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="accordion-content">
                        <p style="margin-bottom: 1rem;">Build your presentation outline dynamically. Select a section to view pro tips:</p>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                            <button class="btn btn-secondary btn-sm" onclick="showSoftSkillTip('pres-hook')">The Hook</button>
                            <button class="btn btn-secondary btn-sm" onclick="showSoftSkillTip('pres-body')">Core Message</button>
                            <button class="btn btn-secondary btn-sm" onclick="showSoftSkillTip('pres-cta')">Call To Action</button>
                        </div>
                        <div id="pres-tip-box" style="padding: 1.2rem; background: rgba(255,255,255,0.03); border-radius: 4px; font-style: italic; border-left: 4px solid var(--accent-primary);">
                            Click a section above to see outline tips...
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="accordion-email">
                    <div class="accordion-header" onclick="toggleAccordion('accordion-email')">
                        <span><i class="fa-solid fa-envelope-open-text" style="color: var(--accent-secondary); margin-right: 0.5rem;"></i> Email Etiquette Templates</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="accordion-content">
                        <p style="margin-bottom: 1rem;">Select a scenario to load a recruiter-approved email template:</p>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                            <button class="btn btn-secondary btn-sm" onclick="loadEmailTemplate('referral')">Internship Referral</button>
                            <button class="btn btn-secondary btn-sm" onclick="loadEmailTemplate('followup')">Interview Follow-Up</button>
                            <button class="btn btn-secondary btn-sm" onclick="loadEmailTemplate('networking')">Networking Request</button>
                        </div>
                        <div id="email-template-box" style="display: none; padding: 1.2rem; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 4px; position: relative;">
                            <h5 id="email-template-subject" style="margin-bottom: 0.5rem; color: var(--accent-secondary);"></h5>
                            <pre id="email-template-body" style="white-space: pre-wrap; font-family: inherit; font-size: 0.9rem; color: var(--text-primary); margin-bottom: 1rem;"></pre>
                            <button class="btn btn-primary btn-sm" onclick="copyEmailTemplate()"><i class="fa-solid fa-copy"></i> Copy Template</button>
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="accordion-team">
                    <div class="accordion-header" onclick="toggleAccordion('accordion-team')">
                        <span><i class="fa-solid fa-people-group" style="color: var(--accent-magenta); margin-right: 0.5rem;"></i> Teamwork Conflict Simulator</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="accordion-content">
                        <p style="margin-bottom: 1.5rem;"><strong>Scenario:</strong> Your project partner has missed two intermediate progress checks. How do you resolve this?</p>
                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            <button class="btn btn-secondary btn-sm" style="text-align: left; justify-content: flex-start;" onclick="answerTeamworkScenario('a')">A) File an official complaint with the course coordinator to get them removed.</button>
                            <button class="btn btn-secondary btn-sm" style="text-align: left; justify-content: flex-start;" onclick="answerTeamworkScenario('b')">B) Connect with them privately to understand if there is a roadblock or personal emergency.</button>
                            <button class="btn btn-secondary btn-sm" style="text-align: left; justify-content: flex-start;" onclick="answerTeamworkScenario('c')">C) Silence is gold. Do their share of work yourself and ignore them going forward.</button>
                        </div>
                        <div id="teamwork-outcome-box" style="margin-top: 1.5rem; padding: 1.2rem; background: rgba(255,255,255,0.03); border-radius: 4px; display: none; border-left: 4px solid var(--accent-magenta);"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    'mba': () => `
        <div>
            ${renderCourseCatalog('MBA Strategy Catalog', 'mba')}
            
            <div style="margin-top: 5rem; display: grid; grid-template-columns: 1.2fr 1fr; gap: 2.5rem; align-items: start; flex-wrap: wrap;">
                <!-- Strategy Checklist -->
                <div class="glass-card">
                    <h3 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-square-check" style="color: var(--accent-primary);"></i> Strategy Builder Checklist</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">Verify crucial management deliverables to assess business plan readiness:</p>
                    <div style="display: flex; flex-direction: column; gap: 1rem;" id="mba-checklist-container">
                        <label style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;">
                            <input type="checkbox" onchange="updateMbaScore()" style="width: 18px; height: 18px; accent-color: var(--accent-primary);">
                            <span>Conduct SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats)</span>
                        </label>
                        <label style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;">
                            <input type="checkbox" onchange="updateMbaScore()" style="width: 18px; height: 18px; accent-color: var(--accent-primary);">
                            <span>Define Porter's Five Forces (Competitive rivalry, supplier/buyer power)</span>
                        </label>
                        <label style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;">
                            <input type="checkbox" onchange="updateMbaScore()" style="width: 18px; height: 18px; accent-color: var(--accent-primary);">
                            <span>Perform PESTLE Assessment (Macro-environmental elements)</span>
                        </label>
                        <label style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;">
                            <input type="checkbox" onchange="updateMbaScore()" style="width: 18px; height: 18px; accent-color: var(--accent-primary);">
                            <span>Conduct Competitor Benchmarking (Product, pricing, GTM comparisons)</span>
                        </label>
                        <label style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;">
                            <input type="checkbox" onchange="updateMbaScore()" style="width: 18px; height: 18px; accent-color: var(--accent-primary);">
                            <span>Establish North Star Metric & KPIs (Clear success variables)</span>
                        </label>
                        <label style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;">
                            <input type="checkbox" onchange="updateMbaScore()" style="width: 18px; height: 18px; accent-color: var(--accent-primary);">
                            <span>Draft Actionable Implementation Roadmap (Gantt milestones, budgets)</span>
                        </label>
                    </div>
                </div>

                <!-- Strategy Score Display -->
                <div class="glass-card" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 280px;">
                    <h4>Strategy Readiness Score</h4>
                    <div style="font-size: 3.5rem; font-weight: 800; color: var(--accent-primary); margin: 1rem 0;" id="mba-score-text">0%</div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; margin-bottom: 1.5rem;">
                        <div id="mba-score-bar" style="width: 0%; height: 100%; background: var(--gradient-primary); transition: width 0.3s;"></div>
                    </div>
                    <p id="mba-score-critique" style="font-size: 0.9rem; color: var(--text-secondary);">Select strategy checkpoints to evaluate your plan.</p>
                </div>
            </div>

            <!-- Case Interview guidelines -->
            <div style="margin-top: 5rem;">
                <h2 style="text-align: center; margin-bottom: 0.5rem;">Case Interview Guidelines</h2>
                <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem;">Master management consulting frameworks dynamically.</p>
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-secondary btn-sm" onclick="showMbaFramework('profit')">Profitability Framework</button>
                    <button class="btn btn-secondary btn-sm" onclick="showMbaFramework('market')">Market Entry Framework</button>
                    <button class="btn btn-secondary btn-sm" onclick="showMbaFramework('ma')">M&A Framework</button>
                </div>
                <div class="glass-card" id="mba-framework-box" style="padding: 2rem; min-height: 200px;">
                    <h3 id="framework-title" style="color: var(--accent-secondary); margin-bottom: 1rem;">Select a Framework</h3>
                    <p id="framework-desc" style="color: var(--text-secondary); margin-bottom: 1.5rem;">Click one of the framework buttons above to load detailed case interview guidelines and structures.</p>
                    <div id="framework-structure" style="background: rgba(0,0,0,0.25); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-color); display: none; font-family: monospace; line-height: 1.6; white-space: pre-wrap; font-size: 0.95rem;"></div>
                </div>
            </div>
        </div>
    `,
    'others': () => `
        <div>
            ${renderCourseCatalog('Upskilling & Executive Hub', 'others')}
            
            <div style="margin-top: 5rem;" class="glass-card">
                <h2 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-terminal" style="color: var(--accent-magenta);"></i> Interactive AI Prompt Playground</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2.5rem;">Draft custom, recruiter-optimized AI prompts based on your target role and skills.</p>
                
                <div class="prompt-playground">
                    <div class="form-group">
                        <label>Select Target Goal</label>
                        <select id="prompt-goal" class="form-control" onchange="generatePlaygroundPrompt()">
                            <option value="summary">Draft Metrics-Driven Professional Summary</option>
                            <option value="cover-letter">Generate Cover Letter Outline</option>
                            <option value="interview">Simulate Specific Role Interviewer</option>
                            <option value="linkedin">Optimize LinkedIn Headline for SEO</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Target Job Role</label>
                        <input type="text" id="prompt-role" class="form-control" placeholder="e.g. Associate Product Manager" value="Associate Product Manager" oninput="generatePlaygroundPrompt()">
                    </div>
                    <div class="form-group">
                        <label>Key Skills / Metrics (comma separated)</label>
                        <input type="text" id="prompt-skills" class="form-control" placeholder="e.g. SQL, A/B Testing, increased conversions by 12%" value="SQL, A/B Testing, roadmaps, launched 2 apps" oninput="generatePlaygroundPrompt()">
                    </div>
                    <div class="form-group">
                        <label>Constructed System Prompt Template</label>
                        <div class="playground-template-box" id="prompt-output-box">Constructing prompt template...</div>
                    </div>
                    <button class="btn btn-primary" onclick="copyPlaygroundPrompt()"><i class="fa-solid fa-copy"></i> Copy Prompt Template</button>
                </div>
            </div>
        </div>
    `,
    'exams': () => `
        <div>
            <div class="glass-card">
                <h2 style="margin-bottom: 1rem;"><i class="fa-solid fa-graduation-cap" style="color: var(--accent-primary);"></i> Entrance Exam Roadmap</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">Syllabus breakdowns and key information for leading entrance examinations.</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    <!-- Category 1: PG Management (MBA) -->
                    <div class="glass-card" style="padding: 1.5rem; background: var(--bg-tertiary); display: flex; flex-direction: column;">
                        <h3 style="font-size: 1.15rem; margin-bottom: 1rem; color: var(--accent-primary); border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem;"><i class="fa-solid fa-user-tie"></i> PG Management (MBA)</h3>
                        <div style="display: flex; flex-direction: column; gap: 1.25rem; max-height: 400px; overflow-y: auto; padding-right: 0.5rem;">
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">CAT (Common Admission Test)</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">VARC, DILR, Quant. The prime pathway for admissions into 20+ Indian Institutes of Management (IIMs).</p>
                            </div>
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">GMAT Focus Edition</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">Quantitative, Verbal, and Data Insights. Required for executive programs and global MBA pathways.</p>
                            </div>
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">GRE General Test</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">Verbal Reasoning, Quant Reasoning, and Analytical Writing. Accepted for global MS/MBA programs.</p>
                            </div>
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">NMAT by GMAC</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">Language, Quantitative, and Logical Skills. Custom entrance for NMIMS Mumbai and leading private business schools.</p>
                            </div>
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">IIM Bangalore DBE</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">Specialized digital transformation, entrepreneurship, product management, and analytics entrance metrics.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Category 2: UG Management & University Entrance -->
                    <div class="glass-card" style="padding: 1.5rem; background: var(--bg-tertiary); display: flex; flex-direction: column;">
                        <h3 style="font-size: 1.15rem; margin-bottom: 1rem; color: var(--accent-secondary); border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem;"><i class="fa-solid fa-graduation-cap"></i> UG Admissions (BBA/CUET)</h3>
                        <div style="display: flex; flex-direction: column; gap: 1.25rem; max-height: 400px; overflow-y: auto; padding-right: 0.5rem;">
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">IPMAT (IIM Indore & Rohtak)</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">Integrated Program in Management Aptitude Test. Direct pathway to the prestigious 5-year BBA+MBA integrated program.</p>
                            </div>
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">JIPMAT (IIM Jammu & Bodh Gaya)</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">Joint Integrated Programme in Management Admission Test. Joint evaluation on QA, DILR, and Verbal.</p>
                            </div>
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">SET (Symbiosis Entrance Test)</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">Evaluates English, Quantitative, GK, and analytical reasoning for Symbiosis undergraduate BBA admissions.</p>
                            </div>
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">Christ University ET</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">Entrance test testing English, GK, Math, Logic, and Data Analysis for Christ University BBA/B.Com.</p>
                            </div>
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">CUET (Common UG Test)</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">National-level single window entrance for central university undergraduate admissions (DU, BHU, JNU, etc.).</p>
                            </div>
                        </div>
                    </div>

                    <!-- Category 3: Design & Law Specialties -->
                    <div class="glass-card" style="padding: 1.5rem; background: var(--bg-tertiary); display: flex; flex-direction: column;">
                        <h3 style="font-size: 1.15rem; margin-bottom: 1rem; color: var(--accent-magenta); border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem;"><i class="fa-solid fa-pen-nib"></i> Design & Law Specialties</h3>
                        <div style="display: flex; flex-direction: column; gap: 1.25rem; max-height: 400px; overflow-y: auto; padding-right: 0.5rem;">
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">UCEED (IIT Design Pathway)</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">Undergraduate Common Entrance Examination for Design. Pathway for B.Des at IIT Bombay, Guwahati, Hyderabad.</p>
                            </div>
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">DAT (Design Aptitude Test)</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">National Institute of Design (NID) entrance. Evaluates color theory, sketching ability, and visual thinking.</p>
                            </div>
                            <div>
                                <strong style="color: var(--text-header); font-size: 0.9rem;">CLAT (Common Law Test)</strong>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">Pathway for India's National Law Universities (NLUs). Evaluates comprehension, legal logic, and current affairs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mock Test Arena -->
            <div style="margin-top: 5rem;" class="glass-card" id="mock-test-container">
                <h2><i class="fa-solid fa-award" style="color: var(--accent-magenta);"></i> Mock Test Arena</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">Assess your speed and aptitude in a 5-question timed mock test.</p>
                
                <!-- Selector screen -->
                <div id="test-selector-screen">
                    <div class="form-group">
                        <label>Select Entrance Exam Track</label>
                        <select id="test-exam-select" class="form-control">
                            <optgroup label="Postgraduate Management / Executive">
                                <option value="CAT">CAT (Common Admission Test - IIM Pathway)</option>
                                <option value="GMAT">GMAT Focus Edition (Global MBA Pathway)</option>
                                <option value="GRE">GRE General Test (MS / MBA Pathway)</option>
                                <option value="NMAT">NMAT by GMAC (NMIMS Pathway)</option>
                                <option value="IIMB_DBE">IIM Bangalore DBE (Digital Business & Exec)</option>
                            </optgroup>
                            <optgroup label="Undergraduate Management & Aptitude">
                                <option value="IPMAT">IPMAT (IIM Indore/Rohtak Integrated Path)</option>
                                <option value="SET">SET (Symbiosis Entrance Test - BBA Path)</option>
                                <option value="JIPMAT">JIPMAT (IIM Jammu/Bodh Gaya Integrated Path)</option>
                                <option value="Christ">Christ University Entrance Test (BBA/B.Com)</option>
                                <option value="CUET">CUET (Common University Entrance Test - UG)</option>
                            </optgroup>
                            <optgroup label="Specialized Pathways (Design & Law)">
                                <option value="UCEED">UCEED (IIT B.Des Design Pathway)</option>
                                <option value="DAT">NID DAT (Design Aptitude Test)</option>
                                <option value="CLAT">CLAT (Common Law Admission Test - NLU Path)</option>
                            </optgroup>
                        </select>
                    </div>
                    <button class="btn btn-accent" onclick="startMockTest()">Start 60s Timed Mock Test <i class="fa-solid fa-play"></i></button>
                </div>

                <!-- Active Test screen -->
                <div id="test-active-screen" style="display: none;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <span id="test-progress-text" style="font-weight: 600;">Question 1 of 5</span>
                        <span class="badge badge-magenta" id="test-timer" style="font-size: 1rem; padding: 0.5rem 1rem;"><i class="fa-solid fa-clock"></i> 60s</span>
                    </div>
                    <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; margin-bottom: 2rem;">
                        <div id="test-progress-bar" style="width: 20%; height: 100%; background: var(--gradient-magenta); transition: width 0.3s;"></div>
                    </div>
                    
                    <div class="glass-card" style="margin-bottom: 2rem; background: rgba(255,255,255,0.01);">
                        <h3 id="test-question-text" style="margin-bottom: 1.5rem; font-size: 1.25rem;">Question text</h3>
                        <div id="test-options-container">
                            <!-- options go here -->
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between;">
                        <button class="btn btn-secondary" id="test-prev-btn" onclick="prevQuestion()" disabled>Previous</button>
                        <button class="btn btn-primary" id="test-next-btn" onclick="nextQuestion()">Next</button>
                    </div>
                </div>

                <!-- Score Screen -->
                <div id="test-score-screen" style="display: none;">
                    <div style="text-align: center; margin-bottom: 3rem;">
                        <h3 style="font-size: 2.2rem; margin-bottom: 1rem;">Mock Test Completed!</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Your Performance Breakdown:</p>
                        <div style="font-size: 4rem; font-weight: 800; color: var(--accent-secondary); margin-bottom: 1.5rem;" id="test-score-badge">0 / 5</div>
                        <button class="btn btn-primary btn-sm" onclick="resetMockTest()"><i class="fa-solid fa-rotate-left"></i> Retake Test</button>
                    </div>
                    <h4 style="margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">Detailed Solutions Review</h4>
                    <div id="test-explanations-list" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <!-- review list here -->
                    </div>
                </div>
            </div>
        </div>
    `,
    'resume-builder': () => `
        <div class="resume-builder-grid">
            <!-- Form Input Side -->
            <div class="resume-form-container glass-card">
                <h2 style="margin-bottom: 1rem;"><i class="fa-solid fa-pen-to-square" style="color: var(--accent-primary)"></i> CV Architect</h2>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2rem;">Construct your resume. Input updates bind to the preview canvas immediately. Choose a visual theme below.</p>
                
                <div class="form-group">
                    <label>Resume Styling Theme</label>
                    <select id="cv-theme" class="form-control" onchange="changeResumeTheme(this.value)">
                        <option value="theme-classic-dark">Classic Dark (Serif, High Contrast Corporate)</option>
                        <option value="theme-indigo-modern">Indigo Modern (Asymmetric Sidebar, Indigo Accents)</option>
                        <option value="theme-emerald-creative">Emerald Creative (Emerald Accents, Creative Badges)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="cv-name" class="form-control" oninput="updateResumeState('name', this.value)">
                </div>
                <div class="form-group">
                    <label>Target Title</label>
                    <input type="text" id="cv-title" class="form-control" oninput="updateResumeState('title', this.value)">
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="cv-email" class="form-control" oninput="updateResumeState('email', this.value)">
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="text" id="cv-phone" class="form-control" oninput="updateResumeState('phone', this.value)">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" id="cv-location" class="form-control" oninput="updateResumeState('location', this.value)">
                </div>
                <div class="form-group">
                    <label>Professional Summary</label>
                    <textarea id="cv-summary" class="form-control" oninput="updateResumeState('summary', this.value)"></textarea>
                </div>
                
                <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 2rem 0;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
                    <h3>Professional Experience</h3>
                    <button class="btn btn-secondary btn-sm" onclick="addExperienceField()"><i class="fa-solid fa-plus"></i> Add</button>
                </div>
                <div id="experience-inputs-container"></div>

                <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 2rem 0;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
                    <h3>Education History</h3>
                    <button class="btn btn-secondary btn-sm" onclick="addEducationField()"><i class="fa-solid fa-plus"></i> Add</button>
                </div>
                <div id="education-inputs-container"></div>

                <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 2rem 0;">
                
                <div class="form-group">
                    <label>Key Skills (comma separated)</label>
                    <input type="text" id="cv-skills" class="form-control" oninput="updateResumeState('skills', this.value)">
                </div>
            </div>

            <!-- Sticky Preview Side -->
            <div class="resume-preview-sticky">
                <div class="resume-actions-bar">
                    <button class="btn btn-secondary btn-sm" onclick="triggerResumePrint()"><i class="fa-solid fa-print"></i> Print CV / PDF</button>
                </div>
                <!-- Interactive Sheet -->
                <div class="resume-sheet" id="resume-sheet"></div>
            </div>
        </div>
    `,
    'linkedin-optimizer': () => `
        <div class="glass-card" style="max-width: 900px; margin: 0 auto;">
            <h2 style="margin-bottom: 1.5rem; text-align: center;"><i class="fa-brands fa-linkedin" style="color: #0077b5;"></i> Profile Optimizer Blueprint</h2>
            <p style="color: var(--text-secondary); text-align: center; margin-bottom: 3rem;">Audit your LinkedIn page structure against our professional checklist to maximize outreach from elite company recruiters.</p>
            
            <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; align-items: start; flex-wrap: wrap;">
                <!-- Checklist + Inputs -->
                <div>
                    <h3 style="margin-bottom: 1.25rem;">LinkedIn Blueprint Checklist</h3>
                    <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
                        <label style="display: flex; gap: 1rem; align-items: flex-start; cursor: pointer; padding: 0.4rem 0;">
                            <input type="checkbox" id="li-check-headshot" onchange="auditLinkedInProfile()" style="width: 20px; height: 20px; accent-color: var(--accent-primary); margin-top: 0.2rem;">
                            <div>
                                <strong>Premium High-Res Headshot</strong>
                                <p style="font-size: 0.85rem; color: var(--text-secondary);">Wear business-casual, ensure clear lighting, and keep backgrounds neutral or slightly blurred.</p>
                            </div>
                        </label>
                        <label style="display: flex; gap: 1rem; align-items: flex-start; cursor: pointer; padding: 0.4rem 0;">
                            <input type="checkbox" id="li-check-url" onchange="auditLinkedInProfile()" style="width: 20px; height: 20px; accent-color: var(--accent-primary); margin-top: 0.2rem;">
                            <div>
                                <strong>Custom Profile URL</strong>
                                <p style="font-size: 0.85rem; color: var(--text-secondary);">Edit your profile handle to read: linkedin.com/in/first-last, removing default numbers.</p>
                            </div>
                        </label>
                        <label style="display: flex; gap: 1rem; align-items: flex-start; cursor: pointer; padding: 0.4rem 0;">
                            <input type="checkbox" id="li-check-headline" onchange="auditLinkedInProfile()" style="width: 20px; height: 20px; accent-color: var(--accent-primary); margin-top: 0.2rem;">
                            <div>
                                <strong>Value-Driven Headline</strong>
                                <p style="font-size: 0.85rem; color: var(--text-secondary);">Include target roles, expertise keywords, and direct quantitative impact.</p>
                            </div>
                        </label>
                        <label style="display: flex; gap: 1rem; align-items: flex-start; cursor: pointer; padding: 0.4rem 0;">
                            <input type="checkbox" id="li-check-about" onchange="auditLinkedInProfile()" style="width: 20px; height: 20px; accent-color: var(--accent-primary); margin-top: 0.2rem;">
                            <div>
                                <strong>The "About" Narrative Pitch</strong>
                                <p style="font-size: 0.85rem; color: var(--text-secondary);">1st person story detailing major problems solved, technical stack, and a clear email call-to-action.</p>
                            </div>
                        </label>
                        <label style="display: flex; gap: 1rem; align-items: flex-start; cursor: pointer; padding: 0.4rem 0;">
                            <input type="checkbox" id="li-check-featured" onchange="auditLinkedInProfile()" style="width: 20px; height: 20px; accent-color: var(--accent-primary); margin-top: 0.2rem;">
                            <div>
                                <strong>Featured Section Highlights</strong>
                                <p style="font-size: 0.85rem; color: var(--text-secondary);">Attach links to portfolios, resume PDFs, or high-performing LinkedIn posts.</p>
                            </div>
                        </label>
                        <label style="display: flex; gap: 1rem; align-items: flex-start; cursor: pointer; padding: 0.4rem 0;">
                            <input type="checkbox" id="li-check-skills" onchange="auditLinkedInProfile()" style="width: 20px; height: 20px; accent-color: var(--accent-primary); margin-top: 0.2rem;">
                            <div>
                                <strong>Skills & Endorsements</strong>
                                <p style="font-size: 0.85rem; color: var(--text-secondary);">Add at least 15 key skills. Pin your top three critical skills to receive validation.</p>
                            </div>
                        </label>
                    </div>
                    
                    <h3 style="margin-bottom: 1.25rem;">Live Audit Inputs</h3>
                    <div class="form-group">
                        <label>LinkedIn Headline</label>
                        <input type="text" id="li-headline" class="form-control" oninput="auditLinkedInProfile()" placeholder="e.g. Senior Software Engineer | Building Scalable Cloud Apps | React, Node.js, AWS">
                    </div>
                    <div class="form-group">
                        <label>LinkedIn "About" Narrative Summary</label>
                        <textarea id="li-about" class="form-control" oninput="auditLinkedInProfile()" placeholder="e.g. I am a passionate engineer with 5+ years of experience in..."></textarea>
                    </div>
                </div>

                <!-- Real-time Audit & Circular Progress Ring -->
                <div class="glass-card" style="position: sticky; top: calc(var(--header-height) + 20px); text-align: center; display: flex; flex-direction: column; align-items: center; width: 100%;">
                    <h3 style="margin-bottom: 1.5rem;">Profile Strength</h3>
                    
                    <div class="progress-ring-container">
                        <svg class="progress-ring" width="120" height="120">
                            <circle class="progress-ring__circle-bg" stroke-width="8" fill="transparent" r="52" cx="60" cy="60"/>
                            <circle class="progress-ring__circle" id="linkedin-progress-circle" stroke-width="8" fill="transparent" r="52" cx="60" cy="60"/>
                        </svg>
                        <div class="progress-ring-text" id="linkedin-score-text">0%</div>
                    </div>
                    
                    <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 1.5rem;" id="linkedin-strength-rating">Beginner</div>
                    
                    <div style="text-align: left; width: 100%; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                        <h4 style="margin-bottom: 1rem; color: var(--accent-secondary);"><i class="fa-solid fa-list-check"></i> Real-time Critique</h4>
                        <ul id="linkedin-critique-list" style="list-style-type: none; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.75rem; color: var(--text-secondary);">
                            <!-- critiques go here -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `,
    'vocab-builder': () => `
        <div class="glass-card" style="max-width: 800px; margin: 0 auto;">
            <h2 style="text-align: center; margin-bottom: 0.5rem;"><i class="fa-solid fa-spell-check" style="color: var(--accent-secondary);"></i> Vocab Builder Hub</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">Master Barron's high-frequency words for CAT, GMAT, and GRE exam preparation.</p>
            
            <!-- Open Source Practice Integrations -->
            <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 2.5rem; flex-wrap: wrap;">
                <a href="https://www.vocabulary.com/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.5rem; border: 1px solid var(--border-color); font-size: 0.8rem; padding: 0.4rem 0.75rem;">
                    <i class="fa-solid fa-circle-nodes" style="color: var(--accent-primary);"></i> Practice on Vocabulary.com <i class="fa-solid fa-up-right-from-square" style="font-size: 0.7rem;"></i>
                </a>
                <a href="https://archive.org/details/barronsessential00geer" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.5rem; border: 1px solid var(--border-color); font-size: 0.8rem; padding: 0.4rem 0.75rem;">
                    <i class="fa-solid fa-book" style="color: var(--accent-secondary);"></i> Barron's Word Lists <i class="fa-solid fa-up-right-from-square" style="font-size: 0.7rem;"></i>
                </a>
            </div>

            <!-- Word Carousel -->
            <div class="glass-card" style="position: relative; padding: 2.5rem; text-align: center; margin-bottom: 3rem;">
                <span class="badge badge-secondary" style="margin-bottom: 1rem;">Daily Word Carousel</span>
                <div class="word-highlight" id="carousel-word">Alacrity</div>
                <div class="word-phonetic" id="carousel-phonetic">/əˈlakrədē/</div>
                <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 1rem;" id="carousel-definition">"Brisk and cheerful readiness."</p>
                <p style="font-size: 0.95rem; color: var(--text-muted); font-style: italic; margin-bottom: 2rem;" id="carousel-example">Example: She accepted the invitation with alacrity.</p>
                
                <div style="display: flex; justify-content: center; gap: 1rem;">
                    <button class="btn btn-secondary btn-sm" onclick="rotateCarousel(-1)"><i class="fa-solid fa-chevron-left"></i> Previous</button>
                    <button class="btn btn-secondary btn-sm" onclick="rotateCarousel(1)">Next <i class="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>

            <!-- Flashcards Segment -->
            <h3 style="margin-bottom: 0.5rem; text-align: center;">Interactive Study Flashcards</h3>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.9rem;">Click on any card to flip and reveal definitions and examples (3D rotation).</p>
            
            <!-- Search filtration -->
            <div style="margin-bottom: 2rem;">
                <div class="form-group" style="max-width: 400px; margin: 0 auto;">
                    <input type="text" id="vocab-card-search" placeholder="🔍 Search words or definitions..." class="form-control" onkeyup="filterVocabCards()" style="text-align: center; font-size: 0.9rem; padding: 0.5rem;">
                </div>
            </div>

            <!-- Scrollable Dynamic Grid -->
            <div id="vocab-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 4rem; max-height: 480px; overflow-y: auto; padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--border-radius-sm); background: var(--bg-primary);">
                <!-- Loaded dynamically by renderVocabCards() -->
            </div>

            <!-- Vocab Quiz Arena -->
            <h3 style="margin-bottom: 1rem; text-align: center;"><i class="fa-solid fa-graduation-cap"></i> Vocabulary Challenge Quiz</h3>
            <div class="glass-card" id="vocab-quiz-container"></div>
        </div>
    `,
    'gd-interview': () => `
        <div class="glass-card gd-container" style="max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; height: 650px;">
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                    <h2>GD & Mock Interview Simulator</h2>
                    <p style="color: var(--text-secondary); font-size: 0.85rem;">Select your track and interact with a virtual hiring mentor.</p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <select id="chat-mode-select" class="form-control" style="width: 200px; padding: 0.4rem 0.8rem;" onchange="changeInterviewMode(this.value)">
                        <option value="mba">MBA Admission Panel</option>
                        <option value="consulting">Consulting Case Study</option>
                        <option value="tech-pm">Tech PM Product Design</option>
                        <option value="gd">Group Discussion Prep</option>
                    </select>
                    <button class="btn btn-secondary btn-sm" onclick="restartInterview()"><i class="fa-solid fa-rotate-left"></i> Reset</button>
                </div>
            </div>
            
            <div class="chat-box" id="chat-box" style="flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem;">
                <!-- bubbles -->
            </div>

            <div style="padding: 1rem 1.5rem; border-top: 1px solid var(--border-color); background: rgba(0,0,0,0.15);">
                <div id="chat-mc-options-container" style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
                    <!-- Multiple choice buttons -->
                </div>
                <div class="chat-input-area" style="display: flex; gap: 1rem; padding: 0;">
                    <input type="text" id="chat-input" class="form-control" placeholder="Or type your custom structured answer here...">
                    <button class="btn btn-primary" id="btn-send-chat" onclick="submitCustomChatAnswer()"><i class="fa-solid fa-paper-plane"></i> Send</button>
                </div>
            </div>
        </div>
    `,
    'job-board': () => `
        <div class="glass-card">
            <h2 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-briefcase" style="color: var(--accent-secondary);"></i> Torque Job Board</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Curated corporate roles. Filter by focus or search keywords.</p>
            
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                <!-- Category Tabs -->
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="job-category-tabs">
                    <button class="btn btn-secondary btn-sm" onclick="filterJobs('All')">All</button>
                    <button class="btn btn-secondary btn-sm" onclick="filterJobs('Internships')">Internships</button>
                    <button class="btn btn-secondary btn-sm" onclick="filterJobs('Full-Time')">Full-Time</button>
                    <button class="btn btn-secondary btn-sm" onclick="filterJobs('UG Focus')">UG Focus</button>
                    <button class="btn btn-secondary btn-sm" onclick="filterJobs('MBA Focus')">MBA Focus</button>
                </div>
                <!-- Search -->
                <input type="text" id="job-search" class="form-control" style="width: 250px;" placeholder="Search companies/roles..." oninput="searchJobs(this.value)">
            </div>

            <div class="job-list" id="jobs-list-container">
                <!-- listings -->
            </div>
        </div>

        <!-- Application Modal -->
        <div class="modal" id="apply-modal">
            <div class="modal-content">
                <span class="modal-close" onclick="closeApplyModal()">&times;</span>
                <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-file-signature" style="color: var(--accent-secondary);"></i> Apply for <span id="modal-role-title">Role</span></h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;" id="modal-company-name">Company</p>
                
                <div id="modal-form-segment">
                    <div class="form-group">
                        <label>Full Applicant Name</label>
                        <input type="text" id="apply-name" class="form-control" placeholder="Enter your full name">
                    </div>
                    <p id="modal-resume-notice" style="font-size: 0.85rem; color: var(--accent-primary); font-style: italic; margin-bottom: 1.5rem;"></p>
                    <button class="btn btn-primary" style="width: 100%;" onclick="submitApplication()"><i class="fa-solid fa-paper-plane"></i> Submit Application</button>
                </div>

                <div id="modal-success-segment" style="display: none; text-align: center; padding: 1rem 0;">
                    <i class="fa-regular fa-circle-check" style="font-size: 3.5rem; color: #10b981; margin-bottom: 1rem;"></i>
                    <h4 style="margin-bottom: 0.5rem;">Application Sent!</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;" id="success-message">Your application has been received.</p>
                </div>
            </div>
        </div>
    `,
    'news': () => `
        <div>
            <h2 style="font-size: 2rem; margin-bottom: 0.5rem; text-align: center;">Torque Newsroom</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem;">Recent market updates on entrance exams, hiring metrics, and AI technology integrations.</p>
            
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 2.5rem; flex-wrap: wrap;">
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <button class="btn btn-secondary btn-sm" onclick="filterNews('All')">All</button>
                    <button class="btn btn-secondary btn-sm" onclick="filterNews('Entrance Exams')">Entrance Exams</button>
                    <button class="btn btn-secondary btn-sm" onclick="filterNews('Tech/Hiring Trends')">Tech/Hiring Trends</button>
                </div>
                <input type="text" id="news-search" class="form-control" style="width: 250px;" placeholder="Search news stories..." oninput="searchNews(this.value)">
            </div>

            <div class="grid-courses" id="news-list-container">
                <!-- news cards -->
            </div>
        </div>
    `,
    'startup-accelerator': () => `
        <div class="startup-accelerator-container">
            <div class="glass-card" style="margin-bottom: 3rem; text-align: center; padding: 3rem 2rem;">
                <span class="badge badge-accent" style="margin-bottom: 1.5rem; background-color: rgba(217, 70, 239, 0.1); color: var(--accent-magenta); border-color: rgba(217, 70, 239, 0.2); padding: 0.4rem 1.2rem; font-size: 0.85rem;"><i class="fa-solid fa-bolt"></i> Torque Launchpad</span>
                <h1 style="font-size: 2.75rem; margin-bottom: 1rem; background: var(--gradient-neon); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Torque Launchpad: Startup Accelerator</h1>
                <p style="color: var(--text-secondary); max-width: 750px; margin: 0 auto 2rem; font-size: 1.1rem; line-height: 1.6;">
                    Turn your bold startup vision into a venture-backed reality. Access equity funding, structured industry mentorship, and rapid MVP engineering.
                </p>
                <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="scrollToApplication()">Apply to Incubator</button>
                    <button class="btn btn-secondary" onclick="scrollToAuditor()">Audit Pitch Deck</button>
                </div>
            </div>

            <!-- 12-Week Incubator Program details -->
            <div style="margin-top: 4rem; margin-bottom: 4rem;">
                <h2 style="text-align: center; margin-bottom: 0.5rem; font-size: 2rem;">12-Week Incubator Program</h2>
                <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem;">A structured sprint designed to evolve ideas from validation to venture funding.</p>
                
                <div class="grid-courses" style="margin-top: 1rem;">
                    <div class="glass-card" style="border-top: 4px solid var(--accent-primary);">
                        <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-primary); margin-bottom: 0.5rem;">Weeks 1 - 4</div>
                        <h4 style="margin-bottom: 0.75rem;"><i class="fa-solid fa-magnifying-glass-chart"></i> Phase 1: Problem & Idea Validation</h4>
                        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
                            Formulate hypothesis, run customer validation discovery calls, calculate TAM/SAM sizing models, and build initial value propositions.
                        </p>
                    </div>
                    <div class="glass-card" style="border-top: 4px solid var(--accent-secondary);">
                        <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-secondary); margin-bottom: 0.5rem;">Weeks 5 - 8</div>
                        <h4 style="margin-bottom: 0.75rem;"><i class="fa-solid fa-laptop-code"></i> Phase 2: MVP Sprint & GTM</h4>
                        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
                            Design low-code product architectures, run usability tests, define critical KPIs, and launch your initial organic go-to-market channels.
                        </p>
                    </div>
                    <div class="glass-card" style="border-top: 4px solid var(--accent-magenta);">
                        <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-magenta); margin-bottom: 0.5rem;">Weeks 9 - 12</div>
                        <h4 style="margin-bottom: 0.75rem;"><i class="fa-solid fa-handshake"></i> Phase 3: Pitch Preparation & Funding</h4>
                        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
                            Create high-converting pitch decks, model detailed unit economics, refine founder narrative arcs, and present live at Demo Day.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Pitch Deck Checklist Auditor -->
            <div style="margin-top: 5rem; display: grid; grid-template-columns: 1.2fr 1fr; gap: 2.5rem; align-items: start; flex-wrap: wrap;" id="startup-pitch-auditor">
                <div class="glass-card">
                    <h3 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-clipboard-check" style="color: var(--accent-secondary);"></i> Interactive Pitch Deck Checklist Auditor</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">Check off pitch slides to assess your readiness for venture capital pitches:</p>
                    <div style="display: flex; flex-direction: column; gap: 1rem;" id="pitch-checklist-container">
                        <label style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;">
                            <input type="checkbox" onchange="updatePitchScore()" style="width: 18px; height: 18px; accent-color: var(--accent-secondary);">
                            <span><strong>Problem Slide:</strong> Clearly states the customer pain point and its costs.</span>
                        </label>
                        <label style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;">
                            <input type="checkbox" onchange="updatePitchScore()" style="width: 18px; height: 18px; accent-color: var(--accent-secondary);">
                            <span><strong>Solution Slide:</strong> Demonstrates product value proposition and IP.</span>
                        </label>
                        <label style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;">
                            <input type="checkbox" onchange="updatePitchScore()" style="width: 18px; height: 18px; accent-color: var(--accent-secondary);">
                            <span><strong>TAM / SAM (Market Size):</strong> Sourced bottom-up total addressable market analysis.</span>
                        </label>
                        <label style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;">
                            <input type="checkbox" onchange="updatePitchScore()" style="width: 18px; height: 18px; accent-color: var(--accent-secondary);">
                            <span><strong>Business Model:</strong> Clear pricing structure, LTV/CAC ratio, and sales channels.</span>
                        </label>
                        <label style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;">
                            <input type="checkbox" onchange="updatePitchScore()" style="width: 18px; height: 18px; accent-color: var(--accent-secondary);">
                            <span><strong>Competition Slide:</strong> Compares feature matrix and distinct defensible moats.</span>
                        </label>
                        <label style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;">
                            <input type="checkbox" onchange="updatePitchScore()" style="width: 18px; height: 18px; accent-color: var(--accent-secondary);">
                            <span><strong>Team Slide:</strong> Outlines founder synergy, background, and domain expertise.</span>
                        </label>
                    </div>
                </div>

                <div class="glass-card" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
                    <h4>Pitch Deck Readiness</h4>
                    <div class="progress-ring-container" style="margin-top: 1.5rem;">
                        <svg class="progress-ring" width="120" height="120">
                            <circle class="progress-ring__circle-bg" stroke-width="8" fill="transparent" r="52" cx="60" cy="60" />
                            <circle id="pitch-progress-circle" class="progress-ring__circle" stroke-width="8" fill="transparent" r="52" cx="60" cy="60" style="stroke: var(--accent-secondary);" />
                        </svg>
                        <div class="progress-ring-text" id="pitch-score-text">0%</div>
                    </div>
                    <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-secondary); margin-bottom: 0.5rem;" id="pitch-strength-rating">Drafting</div>
                    <p id="pitch-score-critique" style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">Check key slides to calculate pitch deck readiness.</p>
                </div>
            </div>

            <!-- Incubator Application Form (Data Capture) -->
            <div class="glass-card" style="margin-top: 5rem; max-width: 700px; margin-left: auto; margin-right: auto;" id="startup-accelerator-application">
                <h3 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-rocket" style="color: var(--accent-magenta);"></i> Startup Incubator Application</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2rem;">Apply to join the next cohort. Submitting validates details and schedules advisor interviews.</p>
                
                <div id="incubator-form-segment">
                    <form onsubmit="event.preventDefault(); submitIncubatorApp();">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; flex-wrap: wrap;">
                            <div class="form-group">
                                <label for="inc-founder-name">Founder Name</label>
                                <input type="text" id="inc-founder-name" class="form-control" placeholder="Founder's Name">
                                <span class="error-text" id="inc-founder-name-error" style="color: var(--accent-magenta); font-size: 0.8rem; display: none; margin-top: 0.25rem;">Founder name is required.</span>
                            </div>
                            <div class="form-group">
                                <label for="inc-email">Email Address</label>
                                <input type="email" id="inc-email" class="form-control" placeholder="name@college.edu">
                                <span class="error-text" id="inc-email-error" style="color: var(--accent-magenta); font-size: 0.8rem; display: none; margin-top: 0.25rem;">Valid email is required.</span>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; flex-wrap: wrap;">
                            <div class="form-group">
                                <label for="inc-affiliation">College / Affiliation</label>
                                <input type="text" id="inc-affiliation" class="form-control" placeholder="e.g. IIT Delhi, BITS Pilani">
                                <span class="error-text" id="inc-affiliation-error" style="color: var(--accent-magenta); font-size: 0.8rem; display: none; margin-top: 0.25rem;">College affiliation is required.</span>
                            </div>
                            <div class="form-group">
                                <label for="inc-startup-name">Startup Name</label>
                                <input type="text" id="inc-startup-name" class="form-control" placeholder="e.g. AeroTech">
                                <span class="error-text" id="inc-startup-name-error" style="color: var(--accent-magenta); font-size: 0.8rem; display: none; margin-top: 0.25rem;">Startup name is required.</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inc-idea">Core Idea & Value Proposition</label>
                            <textarea id="inc-idea" class="form-control" style="min-height: 80px;" placeholder="Briefly describe what problem you are solving..."></textarea>
                            <span class="error-text" id="inc-idea-error" style="color: var(--accent-magenta); font-size: 0.8rem; display: none; margin-top: 0.25rem;">Please describe your core idea.</span>
                        </div>
                        <div class="form-group">
                            <label for="inc-stage">Startup Stage</label>
                            <select id="inc-stage" class="form-control">
                                <option value="Ideation">Ideation / Hypothesis Phase</option>
                                <option value="Validation">Customer Validation / Prototyping</option>
                                <option value="MVP">MVP Live / Pre-revenue</option>
                                <option value="Traction">Early Traction / Generating Revenue</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-accent" style="width: 100%; margin-top: 1rem;"><i class="fa-solid fa-paper-plane"></i> Submit Incubator Application</button>
                    </form>
                </div>
                
                <div id="incubator-success-segment" style="display: none; text-align: center; padding: 2rem 0;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(217, 70, 239, 0.1); border: 2px solid var(--accent-magenta); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                        <i class="fa-solid fa-rocket" style="font-size: 2.2rem; color: var(--accent-magenta);"></i>
                    </div>
                    <h3 style="font-size: 1.75rem; margin-bottom: 0.75rem;">Application Success!</h3>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                        Thank you for applying to Torque Launchpad. We have registered <strong id="inc-success-startup" style="color: var(--text-primary);"></strong> under founder <strong id="inc-success-name" style="color: var(--text-primary);"></strong>. An investment analyst will email you at <strong id="inc-success-email" style="color: var(--text-primary);"></strong> within 48 hours to schedule a screen call.
                    </p>
                    <button class="btn btn-secondary btn-sm" onclick="resetIncubatorForm()">Submit Another Idea</button>
                </div>
            </div>
        </div>
    `,
    'soft-skills': () => `
        <div>
            <!-- Header Banner -->
            <div class="glass-card" style="margin-bottom: 3rem; text-align: center; padding: 3rem 2rem;">
                <span class="badge badge-primary" style="margin-bottom: 1.5rem; padding: 0.4rem 1.2rem; font-size: 0.85rem;"><i class="fa-solid fa-comment-dots"></i> Communication & Leadership</span>
                <h1 style="font-size: 2.75rem; margin-bottom: 1rem; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Soft Skills & Language Hub</h1>
                <p style="color: var(--text-secondary); max-width: 750px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6;">
                    Elevate your professional impact. Master international language standards, executive presence, and business negotiations.
                </p>
            </div>

            <!-- Language Certifications Grid -->
            <div style="margin-top: 4rem;">
                <h2 style="text-align: center; margin-bottom: 0.5rem;">Language Certifications</h2>
                <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem;">Premium global certification programs with live expert evaluations.</p>
                
                <div class="grid-courses">
                    <div class="glass-card course-card" style="display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--accent-primary);"><i class="fa-solid fa-microphone-lines"></i></div>
                            <h3>Spoken English & Corporate Communication</h3>
                            <p style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">
                                Develop confidence in high-stakes corporate conversations. Focus areas:
                            </p>
                            <ul style="margin-top: 0.75rem; padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.85rem; line-height: 1.6; list-style-type: disc;">
                                <li>Public speaking confidence & voice modulation</li>
                                <li>Pronunciation drills & phonetics basics</li>
                                <li>Active workspace vocabulary & expressions</li>
                            </ul>
                        </div>
                        <button class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;" onclick="openLeadModal('Spoken English & Corporate Communication')">Request Syllabus & Info</button>
                    </div>

                    <div class="glass-card course-card" style="display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--accent-secondary);"><i class="fa-solid fa-language"></i></div>
                            <h3>IELTS Training (Academic & General)</h3>
                            <p style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">
                                Comprehensive preparation targeting a high Band score. Features:
                            </p>
                            <ul style="margin-top: 0.75rem; padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.85rem; line-height: 1.6; list-style-type: disc;">
                                <li>Detailed structure of Band 1-9 scoring criteria</li>
                                <li>Intensive Speaking, Reading, Writing, Listening drills</li>
                                <li>Custom prep schedules & mock evaluation feedback</li>
                            </ul>
                        </div>
                        <button class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;" onclick="openLeadModal('IELTS Training')">Request Syllabus & Info</button>
                    </div>

                    <div class="glass-card course-card" style="display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--accent-magenta);"><i class="fa-solid fa-chalkboard-user"></i></div>
                            <h3>TESOL Certification</h3>
                            <p style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">
                                International teaching credential for aspiring ESL educators.
                            </p>
                            <ul style="margin-top: 0.75rem; padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.85rem; line-height: 1.6; list-style-type: disc;">
                                <li>120-Hour globally recognized TEFL/TESOL curriculum</li>
                                <li>Practical teaching methods & classroom management</li>
                                <li>Global job board access & ESL career pathways</li>
                            </ul>
                        </div>
                        <button class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;" onclick="openLeadModal('TESOL Certification')">Request Syllabus & Info</button>
                    </div>
                </div>
            </div>

            <!-- Soft Skills Segments -->
            <div style="margin-top: 5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: start;">
                <!-- BBA Soft Skills Section -->
                <div class="glass-card">
                    <h2 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-graduation-cap" style="color: var(--accent-primary);"></i> BBA Soft Skills</h2>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2rem;">Essential foundation modules for career readiness.</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div class="accordion-item" id="accordion-ss-email">
                            <div class="accordion-header" onclick="toggleAccordion('accordion-ss-email')">
                                <span><i class="fa-solid fa-envelope-open-text" style="color: var(--accent-primary); margin-right: 0.5rem;"></i> Professional Email Etiquette</span>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                            <div class="accordion-content">
                                <p style="margin-bottom: 1rem; font-size: 0.9rem;">Select a business email scenario to copy its template:</p>
                                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                                    <button class="btn btn-secondary btn-sm" onclick="loadSSEmailTemplate('update')">Project Status Update</button>
                                    <button class="btn btn-secondary btn-sm" onclick="loadSSEmailTemplate('meeting')">Schedule Brief Alignment</button>
                                    <button class="btn btn-secondary btn-sm" onclick="loadSSEmailTemplate('apology')">Deadline Postponement</button>
                                </div>
                                <div id="ss-email-template-box" style="display: none; padding: 1.2rem; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 4px; position: relative;">
                                    <h5 id="ss-email-template-subject" style="margin-bottom: 0.5rem; color: var(--accent-primary);"></h5>
                                    <pre id="ss-email-template-body" style="white-space: pre-wrap; font-family: inherit; font-size: 0.85rem; color: var(--text-primary); margin-bottom: 1rem;"></pre>
                                    <button class="btn btn-primary btn-sm" onclick="copySSEmailTemplate()"><i class="fa-solid fa-copy"></i> Copy Template</button>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item" id="accordion-ss-peer">
                            <div class="accordion-header" onclick="toggleAccordion('accordion-ss-peer')">
                                <span><i class="fa-solid fa-people-arrows" style="color: var(--accent-secondary); margin-right: 0.5rem;"></i> Peer Group Work & Listening</span>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                            <div class="accordion-content">
                                <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
                                    Effective collaboration thrives on active listening. Master the <strong>3-Second Pause rule</strong>: before responding to a peer in group work, pause for 3 seconds to ensure they have finished explaining their point. It reduces interruptions by 40% and builds respect.
                                </p>
                            </div>
                        </div>

                        <div class="accordion-item" id="accordion-ss-delivery">
                            <div class="accordion-header" onclick="toggleAccordion('accordion-ss-delivery')">
                                <span><i class="fa-solid fa-display" style="color: var(--accent-magenta); margin-right: 0.5rem;"></i> Executive Presentation Delivery</span>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                            <div class="accordion-content">
                                <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
                                    Deliver high-impact presentations using the <strong>10-20-30 Rule</strong>: 
                                    <br>&bull; Maximum of <strong>10 slides</strong>
                                    <br>&bull; Delivery in under <strong>20 minutes</strong>
                                    <br>&bull; Font size no smaller than <strong>30 points</strong> for high readability.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MBA Soft Skills Section -->
                <div class="glass-card">
                    <h2 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-briefcase" style="color: var(--accent-secondary);"></i> MBA Soft Skills</h2>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2rem;">Advanced corporate leadership and communication modules.</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div class="accordion-item" id="accordion-ss-minto">
                            <div class="accordion-header" onclick="toggleAccordion('accordion-ss-minto')">
                                <span><i class="fa-solid fa-sitemap" style="color: var(--accent-primary); margin-right: 0.5rem;"></i> Minto Pyramid Principle</span>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                            <div class="accordion-content">
                                <p style="font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem; color: var(--text-secondary);">
                                    Structured executive communication: state your conclusion first, then group your supporting arguments logically, and finally present the underlying data.
                                </p>
                                <div style="background: rgba(0,0,0,0.25); padding: 1rem; border-radius: 4px; font-family: monospace; font-size: 0.8rem; border: 1px solid var(--border-color); color: var(--text-secondary);">
  [Conclusion / Recommendation]
         ▲
         │ (Why? / How?)
  [Argument A] ── [Argument B] ── [Argument C]
         ▲
         │ (Supported by)
  [Data Pillar] ── [Data Pillar] ── [Data Pillar]
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item" id="accordion-ss-gd">
                            <div class="accordion-header" onclick="toggleAccordion('accordion-ss-gd')">
                                <span><i class="fa-solid fa-comments" style="color: var(--accent-secondary); margin-right: 0.5rem;"></i> B-School GD Consensus Building</span>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                            <div class="accordion-content">
                                <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
                                    Group Discussions (GD) are crucial for business school admissions. Stand out by playing the <strong>Synthesizer role</strong>: instead of repeating your arguments, summarize conflicting views and suggest a consensus framework (e.g., "Since we disagree on marketing channels, let's allocate 60% to digital and test offline in v2.0").
                                </p>
                            </div>
                        </div>

                        <div class="accordion-item" id="accordion-ss-negotiation">
                            <div class="accordion-header" onclick="toggleAccordion('accordion-ss-negotiation')">
                                <span><i class="fa-solid fa-handshake" style="color: var(--accent-magenta); margin-right: 0.5rem;"></i> Advanced Business Negotiation</span>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                            <div class="accordion-content">
                                <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
                                    Always establish your <strong>BATNA</strong> (Best Alternative to a Negotiated Agreement) and <strong>Reservation Price</strong> before entering a meeting. Leverage collaborative variable packaging: trade terms of lower value to you but higher value to them (e.g. payment terms vs unit price) to achieve win-win deals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Interactive IELTS Band Estimator Widget -->
            <div style="margin-top: 5rem;" class="glass-card" id="ielts-estimator-container">
                <h2 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-chart-line" style="color: var(--accent-secondary);"></i> Interactive IELTS Band Estimator</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2.5rem;">Select your self-assessed proficiency levels to estimate your IELTS Band score and view a custom roadmap.</p>
                
                <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 2.5rem; align-items: start;">
                    <!-- Questionnaire Form -->
                    <div>
                        <div class="form-group">
                            <label for="ielts-fluency">Fluency & Coherence</label>
                            <select id="ielts-fluency" class="form-control">
                                <option value="9">Band 9: Speaks fluently with rare repetition or self-correction</option>
                                <option value="8">Band 8: Speaks fluently; occasional repetition or self-correction</option>
                                <option value="7">Band 7: Speaks at length without effort; occasional hesitation</option>
                                <option value="6">Band 6: Speaks at length; some hesitation or slow pacing</option>
                                <option value="5">Band 5: Speaks slowly; frequent repetition or hesitation</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="ielts-grammar">Lexical Resource & Grammar</label>
                            <select id="ielts-grammar" class="form-control">
                                <option value="9">Band 9: Uses wide vocabulary and advanced structures naturally</option>
                                <option value="8">Band 8: Wide vocabulary; very few grammatical errors</option>
                                <option value="7">Band 7: Good range of words; minor grammatical errors</option>
                                <option value="6">Band 6: Adequate vocabulary; mixed simple and complex structures</option>
                                <option value="5">Band 5: Limited vocabulary; frequent grammatical errors</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="ielts-pronunciation">Pronunciation & Accent Clarity</label>
                            <select id="ielts-pronunciation" class="form-control">
                                <option value="9">Band 9: Effortless to understand; full range of features</option>
                                <option value="8">Band 8: Easy to understand; minor lapses in accent</option>
                                <option value="7">Band 7: Generally easy to understand; some mispronunciations</option>
                                <option value="6">Band 6: Can be understood; pronunciation errors cause lapses</option>
                                <option value="5">Band 5: Hard to follow; frequent mispronunciations</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="ielts-reading">Reading & Listening Comprehension</label>
                            <select id="ielts-reading" class="form-control">
                                <option value="9">Band 9: Easily understands complex texts and native speaker audios</option>
                                <option value="8">Band 8: Understands complex texts; minor lapses in abstract topics</option>
                                <option value="7">Band 7: Understands most factual and abstract information</option>
                                <option value="6">Band 6: Understands general meanings; lapses in complex logic</option>
                                <option value="5">Band 5: Understands basic instructions; struggles with long arguments</option>
                            </select>
                        </div>

                        <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="calculateIeltsBand()"><i class="fa-solid fa-calculator"></i> Calculate Estimated Band</button>
                    </div>

                    <!-- Score Display & Roadmap -->
                    <div class="glass-card" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 320px;">
                        <h4>Estimated IELTS Band</h4>
                        <div style="font-size: 4rem; font-weight: 800; color: var(--accent-secondary); margin: 1rem 0;" id="ielts-score-text">--</div>
                        
                        <div id="ielts-roadmap-box" style="text-align: left; width: 100%; border-top: 1px solid var(--border-color); padding-top: 1.5rem; display: none;">
                            <h4 style="margin-bottom: 0.75rem; color: var(--accent-secondary);"><i class="fa-solid fa-route"></i> Preparation Roadmap</h4>
                            <p id="ielts-roadmap-text" style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1.5rem;"></p>
                            
                            <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="openLeadModal('IELTS Training')">Consult with IELTS Coach</button>
                        </div>
                        <div id="ielts-placeholder-text" style="color: var(--text-secondary); font-size: 0.9rem;">
                            Calculate your estimated IELTS band score to generate a customized preparation roadmap.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};

// Course rendering helper
function renderCourseCatalog(title, category) {
    const courses = coursesData[category];
    return `
        <div>
            <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; text-align: center;">${title}</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem;">Premium resources developed with industry experts.</p>
            
            <div class="grid-courses">
                ${courses.map(course => `
                    <div class="glass-card course-card">
                        <div class="course-img" style="background-image: url('${course.image}')"></div>
                        <h3>${course.title}</h3>
                        <p>Complete learning package featuring quizzes, live cohort drills, and feedback reports.</p>
                        <div class="course-meta">
                            <span style="font-size: 0.85rem; color: var(--text-muted);"><i class="fa-regular fa-clock"></i> ${course.duration}</span>
                        </div>
                        <button class="btn btn-primary" style="width: 100%; margin-top: 1.25rem;" onclick="openLeadModal('${course.title.replace(/'/g, "\\'")}')">Request Syllabus & Info</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Router main function
function handleRoute() {
    if (typeof window === 'undefined') return;
    const container = document.getElementById('app-container');
    if (!container) return;

    // Detect route from hash or clean pathname
    let routeKey = window.location.hash.substring(1);
    if (!routeKey) {
        const cleanPath = window.location.pathname.replace(/^\/|\/$/g, '').replace(/\.html$/, '');
        if (cleanPath && (routes[cleanPath] || cleanPath === 'resource' || cleanPath === 'resource-hub')) {
            routeKey = cleanPath;
        } else {
            routeKey = 'home';
        }
    }
    
    // Normalize hash routes
    if (routeKey === 'ug') routeKey = 'ug-bba';
    else if (routeKey === 'resume') routeKey = 'resume-builder';
    else if (routeKey === 'vocab') routeKey = 'vocab-builder';
    else if (routeKey === 'linkedin') routeKey = 'linkedin-optimizer';
    else if (routeKey === 'gd-prep') routeKey = 'gd-interview';
    else if (routeKey === 'startup-accelerator') routeKey = 'startup-accelerator';
    else if (routeKey === 'resource-hub' || routeKey === 'resource') routeKey = 'resources';

    closeMobileMenu();

    // SEO Title & Description Management
    const seoTitles = {
        'home': "TORQUE - Career Intelligence for the Next Generation",
        'about': "About TORQUE | Career Intelligence for the Next Generation",
        'resources': "TORQUE Resource Hub | CBSE, Entrance Exams & Career Resources",
        'exams': "Entrance Exams & Mock Test Arena | TORQUE EdTech",
        'ug-bba': "Undergraduate & BBA Entrance Masterclasses | TORQUE",
        'mba': "MBA Preparation & Strategic Case Interview Training | TORQUE",
        'others': "Executive Programs & AI Prompt Playground | TORQUE",
        'startup-accelerator': "Torque Launchpad: Startup Accelerator & Pitch Deck Auditor",
        'soft-skills': "Interactive Soft Skills Playbook & IELTS Band Estimator | TORQUE",
        'career-guidance': "5-Dimensional Scientific Career Guidance & Stream Assessment | TORQUE",
        'linkedin-optimizer': "LinkedIn Profile Optimizer & Recruiter Score Audit | TORQUE",
        'vocab-builder': "Daily Vocabulary Builder & Verbal Reasoning Drills | TORQUE",
        'job-board': "Curated Career & Internship Job Board | TORQUE",
        'news': "BBA & MBA EdTech Placement News & Hiring Trends | TORQUE",
        'resume-builder': "Interactive AI Resume Builder & PDF Print Studio | TORQUE",
        'gd-interview': "AI Mock Interview & Group Discussion Simulator | TORQUE"
    };

    if (seoTitles[routeKey]) {
        document.title = seoTitles[routeKey];
    } else {
        document.title = "TORQUE - Career Intelligence for the Next Generation";
    }

    // Check if the container is already pre-rendered with this route's content (Hydration)
    const currentRenderedRoute = container.getAttribute('data-rendered-route');
    const isAlreadyPrerendered = (currentRenderedRoute === routeKey) || 
        (!currentRenderedRoute && routeKey === 'home' && container.children.length > 0 && container.querySelector('.hero-split'));

    if (isAlreadyPrerendered) {
        container.setAttribute('data-rendered-route', routeKey);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Fade effect out/in
        container.classList.remove('fade-in');
        void container.offsetWidth; // Trigger reflow to restart animation
        
        if (routes[routeKey]) {
            container.innerHTML = routes[routeKey]();
            container.setAttribute('data-rendered-route', routeKey);
            container.classList.add('fade-in');
        } else {
            container.innerHTML = `
                <div class="glass-card" style="text-align: center; max-width: 500px; margin: 5rem auto;">
                    <h2 style="font-size: 3rem; margin-bottom: 1rem; color: var(--accent-magenta);">404</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">Page route not found. Return to Home Dashboard.</p>
                    <a href="#home" class="btn btn-primary">Go Home</a>
                </div>
            `;
            container.setAttribute('data-rendered-route', '404');
            container.classList.add('fade-in');
        }
    }

    updateActiveNav(routeKey);

    // Context-dependent page bindings
    if (routeKey === 'resources') {
        setResourceCategory(state.resources.activeCategory || 'ALL');
    } else if (routeKey === 'home') {
        startHeroSlider();
        switchGradeTab('8-9');
    } else if (routeKey === 'resume-builder') {
        bindResumeInputs();
    } else if (routeKey === 'linkedin-optimizer') {
        bindLinkedInEvents();
    } else if (routeKey === 'vocab-builder') {
        bindVocabEvents();
    } else if (routeKey === 'gd-interview') {
        restartInterview();
    } else if (routeKey === 'job-board') {
        renderJobsList();
    } else if (routeKey === 'news') {
        renderNewsList();
    } else if (routeKey === 'ug-bba') {
        showSoftSkillTip('pres-hook');
    } else if (routeKey === 'mba') {
        updateMbaScore();
    } else if (routeKey === 'others') {
        generatePlaygroundPrompt();
    } else if (routeKey === 'startup-accelerator') {
        updatePitchScore();
        resetIncubatorForm();
    } else if (routeKey === 'soft-skills') {
        bindSoftSkillsEvents();
    } else if (routeKey === 'career-guidance') {
        bindCareerGuidanceEvents();
    }
}

// Update Active Class in Header Links
function updateActiveNav(activeRoute) {
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-content a');
    navLinks.forEach(link => {
        const routeAttr = link.getAttribute('data-route');
        if (routeAttr === activeRoute) {
            link.classList.add('active');
            const parentDropdown = link.closest('.nav-dropdown');
            if (parentDropdown) {
                parentDropdown.querySelector('.nav-link').classList.add('active');
            }
        } else {
            link.classList.remove('active');
        }
    });

    // Handle dropdown main highlight if sublink is active
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dd => {
        const subLinks = dd.querySelectorAll('.dropdown-content a');
        const hasActiveSub = Array.from(subLinks).some(sub => sub.getAttribute('data-route') === activeRoute);
        if (hasActiveSub) {
            dd.querySelector('.nav-link').classList.add('active');
        } else {
            // Only remove if not the main link itself
            const mainLink = dd.querySelector('.nav-link');
            if (mainLink.getAttribute('data-route') !== activeRoute) {
                mainLink.classList.remove('active');
            }
        }
    });
}

// Mobile Burger Navigation Menu
function initBurgerMenu() {
    if (typeof document === 'undefined') return;
    const burgerBtn = document.getElementById('burger-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            const isActive = burgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (!isActive) {
                document.querySelectorAll('.nav-dropdown.open').forEach(dd => dd.classList.remove('open'));
            }
        });
    }

    // Toggle dropdowns on touch/mobile viewports
    const dropdownTriggers = document.querySelectorAll('.nav-dropdown > .dropdown-trigger, .nav-dropdown > .nav-link');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (typeof window !== 'undefined' && window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                const parent = trigger.closest('.nav-dropdown');
                if (parent) {
                    const isAlreadyOpen = parent.classList.contains('open');
                    document.querySelectorAll('.nav-dropdown.open').forEach(dd => {
                        if (dd !== parent) dd.classList.remove('open');
                    });
                    parent.classList.toggle('open', !isAlreadyOpen);
                }
            }
        });
    });

    // Close menu when clicking destination links or CTAs
    const actionLinks = document.querySelectorAll('.nav-menu a[data-route], .dropdown-content a, .mobile-menu-ctas a');
    actionLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close open dropdowns if user clicks outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown.open').forEach(dd => dd.classList.remove('open'));
        }
    });
}

function closeMobileMenu() {
    if (typeof document === 'undefined') return;
    const burgerBtn = document.getElementById('burger-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (burgerBtn && burgerBtn.classList.contains('active')) {
        burgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
    }
    document.querySelectorAll('.nav-dropdown.open').forEach(dd => dd.classList.remove('open'));
}

/* ==========================================
   RESUME BUILDER BINDINGS & OPERATIONS
   ========================================== */
function bindResumeInputs() {
    const nameInput = document.getElementById('cv-name');
    if (nameInput) nameInput.value = state.resume.name;
    
    const titleInput = document.getElementById('cv-title');
    if (titleInput) titleInput.value = state.resume.title;
    
    const emailInput = document.getElementById('cv-email');
    if (emailInput) emailInput.value = state.resume.email;
    
    const phoneInput = document.getElementById('cv-phone');
    if (phoneInput) phoneInput.value = state.resume.phone;
    
    const locInput = document.getElementById('cv-location');
    if (locInput) locInput.value = state.resume.location;
    
    const summInput = document.getElementById('cv-summary');
    if (summInput) summInput.value = state.resume.summary;
    
    const skillsInput = document.getElementById('cv-skills');
    if (skillsInput) skillsInput.value = state.resume.skills;

    const themeSelect = document.getElementById('cv-theme');
    if (themeSelect) themeSelect.value = state.resume.theme;

    renderExperienceInputs();
    renderEducationInputs();
    updateResumePreview();
}

function renderExperienceInputs() {
    const container = document.getElementById('experience-inputs-container');
    if (!container) return;
    container.innerHTML = state.resume.experience.map((exp, idx) => `
        <div style="border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--border-radius-sm); margin-bottom: 1rem; position: relative;">
            <button class="btn btn-secondary btn-sm" style="position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.25rem 0.5rem;" onclick="removeExperienceField(${idx})">
                <i class="fa-solid fa-trash-can" style="color: var(--accent-magenta);"></i>
            </button>
            <div class="form-group">
                <label>Company Name</label>
                <input type="text" class="form-control" value="${exp.company}" oninput="updateExpField(${idx}, 'company', this.value)">
            </div>
            <div class="form-group">
                <label>Role / Position</label>
                <input type="text" class="form-control" value="${exp.role}" oninput="updateExpField(${idx}, 'role', this.value)">
            </div>
            <div class="form-group">
                <label>Date Range (e.g. 2023 - Present)</label>
                <input type="text" class="form-control" value="${exp.date}" oninput="updateExpField(${idx}, 'date', this.value)">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
                <label>Description / Core Achievements</label>
                <textarea class="form-control" oninput="updateExpField(${idx}, 'desc', this.value)">${exp.desc}</textarea>
            </div>
        </div>
    `).join('');
}

function renderEducationInputs() {
    const container = document.getElementById('education-inputs-container');
    if (!container) return;
    container.innerHTML = state.resume.education.map((edu, idx) => `
        <div style="border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--border-radius-sm); margin-bottom: 1rem; position: relative;">
            <button class="btn btn-secondary btn-sm" style="position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.25rem 0.5rem;" onclick="removeEducationField(${idx})">
                <i class="fa-solid fa-trash-can" style="color: var(--accent-magenta);"></i>
            </button>
            <div class="form-group">
                <label>School / University</label>
                <input type="text" class="form-control" value="${edu.school}" oninput="updateEduField(${idx}, 'school', this.value)">
            </div>
            <div class="form-group">
                <label>Degree / Specialization</label>
                <input type="text" class="form-control" value="${edu.degree}" oninput="updateEduField(${idx}, 'degree', this.value)">
            </div>
            <div class="form-group">
                <label>Date Range (e.g. 2018 - 2022)</label>
                <input type="text" class="form-control" value="${edu.date}" oninput="updateEduField(${idx}, 'date', this.value)">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
                <label>Description / GPA</label>
                <input type="text" class="form-control" value="${edu.desc}" oninput="updateEduField(${idx}, 'desc', this.value)">
            </div>
        </div>
    `).join('');
}

function updateResumePreview() {
    const sheet = document.getElementById('resume-sheet');
    if (!sheet) return;
    
    sheet.className = `resume-sheet ${state.resume.theme}`;
    
    const expHTML = state.resume.experience.map(exp => `
        <div class="resume-item">
            <div class="resume-item-header">
                <span>${exp.company || 'Company Name'}</span>
                <span>${exp.date || 'Date'}</span>
            </div>
            <div class="resume-item-sub">${exp.role || 'Role Title'}</div>
            <p>${exp.desc || 'Responsibilities & achievements.'}</p>
        </div>
    `).join('');

    const eduHTML = state.resume.education.map(edu => `
        <div class="resume-item">
            <div class="resume-item-header">
                <span>${edu.school || 'School/University'}</span>
                <span>${edu.date || 'Date'}</span>
            </div>
            <div class="resume-item-sub">${edu.degree || 'Degree'}</div>
            <p>${edu.desc || 'Additional achievements or GPA.'}</p>
        </div>
    `).join('');

    const skillsTags = state.resume.skills.split(',').map(skill => {
        const trimmed = skill.trim();
        if (trimmed) return `<span class="resume-skill-tag">${trimmed}</span>`;
        return '';
    }).join('');

    sheet.innerHTML = `
        <div class="resume-header">
            <h1>${state.resume.name || 'Your Name'}</h1>
            <p style="font-weight: 600; color: var(--accent-primary); letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 0.5rem;">${state.resume.title || 'Target Job Title'}</p>
            <div class="resume-contact">
                <span><i class="fa-solid fa-envelope"></i> <span>${state.resume.email || 'email@example.com'}</span></span>
                <span><i class="fa-solid fa-phone"></i> <span>${state.resume.phone || 'Phone Number'}</span></span>
                <span><i class="fa-solid fa-location-dot"></i> <span>${state.resume.location || 'City, Country'}</span></span>
            </div>
        </div>
        
        <div class="resume-section">
            <div class="resume-section-title">Professional Summary</div>
            <p style="font-size: 0.9rem; line-height: 1.5; color: inherit;">${state.resume.summary || 'Write a brief professional summary.'}</p>
        </div>
        
        <div class="resume-section">
            <div class="resume-section-title">Professional Experience</div>
            ${expHTML || '<p>No experience entries added yet.</p>'}
        </div>

        <div class="resume-section">
            <div class="resume-section-title">Education</div>
            ${eduHTML || '<p>No education entries added yet.</p>'}
        </div>
        
        <div class="resume-section">
            <div class="resume-section-title">Skills & Proficiencies</div>
            <div class="resume-skills-list">
                ${skillsTags || '<p>No skills added.</p>'}
            </div>
        </div>
    `;
}

window.updateResumeState = function(key, val) {
    state.resume[key] = val;
    updateResumePreview();
};
window.updateExpField = function(idx, key, val) {
    state.resume.experience[idx][key] = val;
    updateResumePreview();
};
window.updateEduField = function(idx, key, val) {
    state.resume.education[idx][key] = val;
    updateResumePreview();
};
window.addExperienceField = function() {
    state.resume.experience.push({ company: "", role: "", date: "", desc: "" });
    renderExperienceInputs();
    updateResumePreview();
};
window.removeExperienceField = function(idx) {
    state.resume.experience.splice(idx, 1);
    renderExperienceInputs();
    updateResumePreview();
};
window.addEducationField = function() {
    state.resume.education.push({ school: "", degree: "", date: "", desc: "" });
    renderEducationInputs();
    updateResumePreview();
};
window.removeEducationField = function(idx) {
    state.resume.education.splice(idx, 1);
    renderEducationInputs();
    updateResumePreview();
};
window.changeResumeTheme = function(theme) {
    state.resume.theme = theme;
    updateResumePreview();
};
window.triggerResumePrint = function() {
    window.print();
};

/* ==========================================
   LINKEDIN OPTIMIZER OPERATIONS
   ========================================== */
function bindLinkedInEvents() {
    const head = document.getElementById('li-headline');
    if (head) head.value = state.linkedin.headline;
    const ab = document.getElementById('li-about');
    if (ab) ab.value = state.linkedin.about;

    const checks = ['headshot', 'url', 'headline', 'about', 'featured', 'skills'];
    checks.forEach(c => {
        const el = document.getElementById(`li-check-${c}`);
        if (el) {
            const stateKey = c === 'url' ? 'customUrl' : (c === 'headline' ? 'headlineCheck' : (c === 'about' ? 'aboutCheck' : (c === 'skills' ? 'skillsCheck' : c)));
            el.checked = state.linkedin.checks[stateKey];
        }
    });

    auditLinkedInProfile();
}

window.auditLinkedInProfile = function() {
    const headlineVal = document.getElementById('li-headline') ? document.getElementById('li-headline').value : "";
    const aboutVal = document.getElementById('li-about') ? document.getElementById('li-about').value : "";
    
    const headshotChecked = document.getElementById('li-check-headshot') ? document.getElementById('li-check-headshot').checked : false;
    const urlChecked = document.getElementById('li-check-url') ? document.getElementById('li-check-url').checked : false;
    const headlineChecked = document.getElementById('li-check-headline') ? document.getElementById('li-check-headline').checked : false;
    const aboutChecked = document.getElementById('li-check-about') ? document.getElementById('li-check-about').checked : false;
    const featuredChecked = document.getElementById('li-check-featured') ? document.getElementById('li-check-featured').checked : false;
    const skillsChecked = document.getElementById('li-check-skills') ? document.getElementById('li-check-skills').checked : false;

    state.linkedin.headline = headlineVal;
    state.linkedin.about = aboutVal;
    state.linkedin.checks.headshot = headshotChecked;
    state.linkedin.checks.customUrl = urlChecked;
    state.linkedin.checks.headlineCheck = headlineChecked;
    state.linkedin.checks.aboutCheck = aboutChecked;
    state.linkedin.checks.featured = featuredChecked;
    state.linkedin.checks.skillsCheck = skillsChecked;

    let score = 0;
    if (headshotChecked) score += 10;
    if (urlChecked) score += 10;
    if (headlineChecked) score += 10;
    if (aboutChecked) score += 10;
    if (featuredChecked) score += 10;
    if (skillsChecked) score += 10;

    if (headlineVal.length > 0) {
        score += 10;
        if (headlineVal.length >= 40 && headlineVal.length <= 120) {
            score += 10;
        }
    }

    if (aboutVal.length > 0) {
        score += 10;
        if (aboutVal.length >= 100) {
            score += 10;
        }
    }

    const circle = document.getElementById('linkedin-progress-circle');
    const scoreText = document.getElementById('linkedin-score-text');
    const ratingText = document.getElementById('linkedin-strength-rating');
    
    if (circle) {
        const circumference = 326.7;
        const offset = circumference - (score / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
    
    if (scoreText) scoreText.innerText = `${score}%`;

    let rating = "Beginner";
    let ratingColor = "var(--text-muted)";
    if (score >= 80) {
        rating = "All-Star Profile";
        ratingColor = "var(--accent-secondary)";
    } else if (score >= 50) {
        rating = "Intermediate Pro";
        ratingColor = "var(--accent-primary)";
    } else if (score > 10) {
        rating = "Emerging Profile";
    }
    
    if (ratingText) {
        ratingText.innerText = rating;
        ratingText.style.color = ratingColor;
    }

    const critiquesList = document.getElementById('linkedin-critique-list');
    if (!critiquesList) return;
    
    critiquesList.innerHTML = '';
    
    if (!headlineVal) {
        critiquesList.innerHTML += `<li><i class="fa-solid fa-triangle-exclamation" style="color: var(--accent-magenta);"></i> <strong>Headline is empty:</strong> Add your target role.</li>`;
    } else {
        if (headlineVal.length < 30) {
            critiquesList.innerHTML += `<li><i class="fa-solid fa-triangle-exclamation" style="color: var(--accent-magenta);"></i> <strong>Headline is brief:</strong> Expand to 40+ characters to state target fields.</li>`;
        } else if (headlineVal.length > 130) {
            critiquesList.innerHTML += `<li><i class="fa-solid fa-circle-info" style="color: var(--accent-primary);"></i> <strong>Headline is long:</strong> Try to keep it under 120 chars for search result cards.</li>`;
        } else {
            critiquesList.innerHTML += `<li><i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <strong>Headline length is optimal.</strong></li>`;
        }

        const metricsTerms = ["%", "percent", "revenue", "dollar", "$", "led", "managed", "increased", "achieved", "growth", "saved", "million", "kpi"];
        const hasMetrics = metricsTerms.some(term => headlineVal.toLowerCase().includes(term));
        if (!hasMetrics) {
            critiquesList.innerHTML += `<li><i class="fa-solid fa-lightbulb" style="color: var(--accent-secondary);"></i> <strong>Tip:</strong> Incorporate metric-driven terms (e.g. 'achieved 30% growth', 'led team of 5') to raise trust.</li>`;
        } else {
            critiquesList.innerHTML += `<li><i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <strong>Headline contains metric variables.</strong></li>`;
        }
    }

    if (!aboutVal) {
        critiquesList.innerHTML += `<li><i class="fa-solid fa-triangle-exclamation" style="color: var(--accent-magenta);"></i> <strong>About is empty:</strong> Add a career summary in the 1st person.</li>`;
    } else {
        if (aboutVal.length < 100) {
            critiquesList.innerHTML += `<li><i class="fa-solid fa-circle-info" style="color: var(--accent-primary);"></i> <strong>About text is short:</strong> Expand to 100+ characters to highlight major wins.</li>`;
        } else {
            critiquesList.innerHTML += `<li><i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <strong>About summary is robust.</strong></li>`;
        }

        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        if (!emailRegex.test(aboutVal)) {
            critiquesList.innerHTML += `<li><i class="fa-solid fa-lightbulb" style="color: var(--accent-secondary);"></i> <strong>Tip:</strong> Include a CTA contact email address at the bottom.</li>`;
        } else {
            critiquesList.innerHTML += `<li><i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <strong>CTA details detected.</strong></li>`;
        }
    }
};

/* ==========================================
   VOCAB HUB CAROUSEL & QUIZ OPERATIONS
   ========================================== */
function bindVocabEvents() {
    state.vocab.currentWordIndex = 0;
    state.vocab.quizScore = 0;
    state.vocab.quizStep = 0;
    state.vocab.quizUserAnswers = [];
    state.vocab.quizCompleted = false;

    renderVocabCarousel();
    renderVocabCards();
    renderVocabQuiz();
}

function renderVocabCards(filter = '') {
    const grid = document.getElementById('vocab-cards-grid');
    if (!grid) return;
    
    const query = filter.toLowerCase().trim();
    const filtered = vocabWords.filter(w => w.word.toLowerCase().includes(query) || w.definition.toLowerCase().includes(query));
    
    grid.innerHTML = filtered.map(w => `
        <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
                <div class="flip-card-front" style="padding: 1rem; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
                    <span class="badge badge-primary" style="margin-bottom: 0.5rem; font-size: 0.7rem; padding: 0.2rem 0.5rem;">Click to Flip</span>
                    <h4 style="font-size: 1.15rem; margin-bottom: 0.25rem; color: var(--text-header);">${w.word}</h4>
                    <p style="color: var(--text-muted); font-size: 0.75rem; font-style: italic; margin: 0;">${w.phonetic}</p>
                </div>
                <div class="flip-card-back" style="padding: 1rem; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; border: 1px solid var(--border-color); border-radius: var(--border-radius-sm); background: var(--bg-secondary);">
                    <p style="font-weight: 600; font-size: 0.82rem; margin-bottom: 0.4rem; color: var(--accent-primary); line-height: 1.3;">${w.definition}</p>
                    <p style="font-size: 0.75rem; color: var(--text-muted); font-style: italic; margin: 0;">"${w.example}"</p>
                </div>
            </div>
        </div>
    `).join('');
    
    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">No vocabulary words found matching "${filter}"</div>`;
    }
}

window.filterVocabCards = function() {
    const input = document.getElementById('vocab-card-search');
    if (input) {
        renderVocabCards(input.value);
    }
};

function renderVocabCarousel() {
    const word = vocabWords[state.vocab.currentWordIndex];
    const elWord = document.getElementById('carousel-word');
    const elPhonetic = document.getElementById('carousel-phonetic');
    const elDefinition = document.getElementById('carousel-definition');
    const elExample = document.getElementById('carousel-example');
    
    if (elWord) elWord.innerText = word.word;
    if (elPhonetic) elPhonetic.innerText = word.phonetic;
    if (elDefinition) elDefinition.innerText = `"${word.definition}"`;
    if (elExample) elExample.innerText = `Example: ${word.example}`;
}

window.rotateCarousel = function(dir) {
    state.vocab.currentWordIndex = (state.vocab.currentWordIndex + dir + vocabWords.length) % vocabWords.length;
    renderVocabCarousel();
};

function renderVocabQuiz() {
    const container = document.getElementById('vocab-quiz-container');
    if (!container) return;

    if (state.vocab.quizCompleted) {
        const itemsHTML = vocabQuizQuestions.map((q, idx) => {
            const userAnsIdx = state.vocab.quizUserAnswers[idx];
            const isCorrect = userAnsIdx === q.a;
            return `
                <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1rem;">
                    <h5 style="margin-bottom: 0.5rem; font-size: 1.05rem;">Q${idx+1}: ${q.q}</h5>
                    <p style="font-size: 0.9rem; color: ${isCorrect ? '#10b981' : '#ef4444'}; margin-bottom: 0.25rem; font-weight: 600;">
                        <i class="fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}"></i> 
                        Your Answer: ${q.o[userAnsIdx] || 'Unanswered'}
                    </p>
                    ${!isCorrect ? `<p style="font-size: 0.9rem; color: #10b981; margin-bottom: 0.25rem;"><i class="fa-solid fa-circle-check"></i> Correct Answer: ${q.o[q.a]}</p>` : ''}
                    <p style="font-size: 0.85rem; color: var(--text-secondary); font-style: italic; margin-top: 0.25rem;">Explanation: ${q.e}</p>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h4>Vocabulary Quiz Complete!</h4>
                <div style="font-size: 3rem; font-weight: 800; color: var(--accent-secondary); margin: 1rem 0;">${state.vocab.quizScore} / ${vocabQuizQuestions.length}</div>
                <button class="btn btn-primary btn-sm" onclick="restartVocabQuiz()"><i class="fa-solid fa-rotate-left"></i> Retake Vocab Quiz</button>
            </div>
            <h4 style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">Review Answers</h4>
            ${itemsHTML}
        `;
        return;
    }

    const qIndex = state.vocab.quizStep;
    const question = vocabQuizQuestions[qIndex];
    
    const optionsHTML = question.o.map((opt, oIdx) => `
        <div class="quiz-option" onclick="answerVocabQuestion(${oIdx})">
            <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--text-secondary); font-size: 0.8rem; font-weight: bold; margin-right: 0.5rem;">
                ${String.fromCharCode(65 + oIdx)}
            </span>
            <span>${opt}</span>
        </div>
    `).join('');

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <span style="font-weight: 600;">Question ${qIndex + 1} of ${vocabQuizQuestions.length}</span>
            <span class="badge badge-secondary">Score: ${state.vocab.quizScore}</span>
        </div>
        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; margin-bottom: 1.5rem;">
            <div style="width: ${((qIndex) / vocabQuizQuestions.length) * 100}%; height: 100%; background: var(--gradient-neon); transition: width 0.3s;"></div>
        </div>
        <h4 style="margin-bottom: 1.5rem; font-size: 1.15rem;">${question.q}</h4>
        <div style="display: flex; flex-direction: column;">
            ${optionsHTML}
        </div>
    `;
}

window.answerVocabQuestion = function(selectedIdx) {
    const qIndex = state.vocab.quizStep;
    const question = vocabQuizQuestions[qIndex];
    
    state.vocab.quizUserAnswers.push(selectedIdx);
    
    if (selectedIdx === question.a) {
        state.vocab.quizScore += 1;
    }

    state.vocab.quizStep += 1;
    if (state.vocab.quizStep >= vocabQuizQuestions.length) {
        state.vocab.quizCompleted = true;
    }
    
    renderVocabQuiz();
};

window.restartVocabQuiz = function() {
    state.vocab.quizScore = 0;
    state.vocab.quizStep = 0;
    state.vocab.quizUserAnswers = [];
    state.vocab.quizCompleted = false;
    renderVocabQuiz();
};

/* ==========================================
   MOCK TEST ARENA (EXAMS HUB) OPERATIONS
   ========================================== */
window.startMockTest = function() {
    const examSelect = document.getElementById('test-exam-select');
    if (!examSelect) return;
    
    // Map individual exam keys to the matching mockExamQuestions database keys
    const examMapping = {
        CAT: 'CAT',
        GMAT: 'GMAT',
        GRE: 'GRE',
        IPMAT: 'IPMAT',
        SET: 'IPMAT',
        JIPMAT: 'IPMAT',
        NMAT: 'NMAT',
        UCEED: 'UCEED',
        DAT: 'UCEED',
        CLAT: 'CLAT',
        IIMB_DBE: 'CAT',
        Christ: 'CUET',
        CUET: 'CUET'
    };
    
    const selectedVal = examSelect.value;
    state.mockTest.selectedExam = examMapping[selectedVal] || selectedVal;
    state.mockTest.currentQuestionIndex = 0;
    state.mockTest.score = 0;
    state.mockTest.answers = Array(5).fill(null);
    state.mockTest.timeLeft = 60;
    state.mockTest.completed = false;

    document.getElementById('test-selector-screen').style.display = 'none';
    document.getElementById('test-active-screen').style.display = 'block';
    document.getElementById('test-score-screen').style.display = 'none';

    renderMockTestQuestion();

    if (state.mockTest.timerInterval) clearInterval(state.mockTest.timerInterval);
    
    state.mockTest.timerInterval = setInterval(() => {
        state.mockTest.timeLeft -= 1;
        const timerEl = document.getElementById('test-timer');
        if (timerEl) {
            timerEl.innerHTML = `<i class="fa-solid fa-clock"></i> ${state.mockTest.timeLeft}s`;
        }
        
        if (state.mockTest.timeLeft <= 0) {
            clearInterval(state.mockTest.timerInterval);
            submitMockTest();
        }
    }, 1000);
};

function renderMockTestQuestion() {
    const exam = state.mockTest.selectedExam;
    const qIndex = state.mockTest.currentQuestionIndex;
    const questions = mockExamQuestions[exam];
    const currentQ = questions[qIndex];

    const qTextEl = document.getElementById('test-question-text');
    const optionsContainer = document.getElementById('test-options-container');
    const progressText = document.getElementById('test-progress-text');
    const progressBar = document.getElementById('test-progress-bar');
    const prevBtn = document.getElementById('test-prev-btn');
    const nextBtn = document.getElementById('test-next-btn');

    if (qTextEl) qTextEl.innerText = currentQ.q;
    if (progressText) progressText.innerText = `Question ${qIndex + 1} of ${questions.length}`;
    if (progressBar) progressBar.style.width = `${((qIndex + 1) / questions.length) * 100}%`;

    if (prevBtn) prevBtn.disabled = qIndex === 0;
    if (nextBtn) {
        if (qIndex === questions.length - 1) {
            nextBtn.innerText = "Submit Test";
            nextBtn.className = "btn btn-accent";
        } else {
            nextBtn.innerText = "Next";
            nextBtn.className = "btn btn-primary";
        }
    }

    if (optionsContainer) {
        optionsContainer.innerHTML = currentQ.o.map((opt, oIdx) => {
            const isSelected = state.mockTest.answers[qIndex] === oIdx;
            return `
                <div class="quiz-option ${isSelected ? 'selected' : ''}" onclick="selectMockAnswer(${oIdx})">
                    <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; border: 2px solid ${isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)'}; font-size: 0.8rem; font-weight: bold; margin-right: 0.5rem;">
                        ${String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>${opt}</span>
                </div>
            `;
        }).join('');
    }
}

window.selectMockAnswer = function(optIdx) {
    const qIndex = state.mockTest.currentQuestionIndex;
    state.mockTest.answers[qIndex] = optIdx;
    renderMockTestQuestion();
};

window.prevQuestion = function() {
    if (state.mockTest.currentQuestionIndex > 0) {
        state.mockTest.currentQuestionIndex -= 1;
        renderMockTestQuestion();
    }
};

window.nextQuestion = function() {
    const exam = state.mockTest.selectedExam;
    const questions = mockExamQuestions[exam];
    const qIndex = state.mockTest.currentQuestionIndex;

    if (qIndex < questions.length - 1) {
        state.mockTest.currentQuestionIndex += 1;
        renderMockTestQuestion();
    } else {
        submitMockTest();
    }
};

window.submitMockTest = function() {
    if (state.mockTest.timerInterval) clearInterval(state.mockTest.timerInterval);
    state.mockTest.completed = true;

    const exam = state.mockTest.selectedExam;
    const questions = mockExamQuestions[exam];
    
    let finalScore = 0;
    questions.forEach((q, idx) => {
        if (state.mockTest.answers[idx] === q.a) {
            finalScore += 1;
        }
    });
    state.mockTest.score = finalScore;

    document.getElementById('test-active-screen').style.display = 'none';
    document.getElementById('test-score-screen').style.display = 'block';

    const scoreBadge = document.getElementById('test-score-badge');
    if (scoreBadge) scoreBadge.innerText = `${finalScore} / ${questions.length}`;

    const explanationsList = document.getElementById('test-explanations-list');
    if (explanationsList) {
        explanationsList.innerHTML = questions.map((q, idx) => {
            const userAnsIdx = state.mockTest.answers[idx];
            const isCorrect = userAnsIdx === q.a;
            return `
                <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                    <h5 style="margin-bottom: 0.5rem; font-size: 1.05rem;">Q${idx + 1}: ${q.q}</h5>
                    <p style="font-size: 0.9rem; color: ${isCorrect ? '#10b981' : '#ef4444'}; margin-bottom: 0.25rem; font-weight: 600;">
                        <i class="fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}"></i> 
                        Your Answer: ${userAnsIdx !== null ? q.o[userAnsIdx] : 'Unanswered'}
                    </p>
                    ${!isCorrect ? `<p style="font-size: 0.9rem; color: #10b981; margin-bottom: 0.25rem;"><i class="fa-solid fa-circle-check"></i> Correct Answer: ${q.o[q.a]}</p>` : ''}
                    <p style="font-size: 0.85rem; color: var(--text-secondary); font-style: italic; margin-top: 0.5rem;">Explanation: ${q.e}</p>
                </div>
            `;
        }).join('');
    }
};

window.resetMockTest = function() {
    document.getElementById('test-selector-screen').style.display = 'block';
    document.getElementById('test-active-screen').style.display = 'none';
    document.getElementById('test-score-screen').style.display = 'none';
};

/* ==========================================
   GD & INTERVIEW SIMULATOR OPERATIONS
   ========================================== */
window.changeInterviewMode = function(mode) {
    state.chat.mode = mode;
    restartInterview();
};

window.restartInterview = function() {
    state.chat.step = 0;
    state.chat.history = [];
    state.chat.completed = false;
    
    const firstQ = interviewTree[state.chat.mode][0].q;
    state.chat.history.push({
        sender: 'ai',
        author: 'Torque Mentor',
        text: firstQ
    });

    renderChat();
};

function renderChat() {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;

    chatBox.innerHTML = state.chat.history.map(msg => `
        <div class="chat-bubble ${msg.sender === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'}">
            <div class="chat-author ${msg.sender === 'ai' ? 'chat-author-ai' : 'chat-author-user'}">
                <i class="fa-solid ${msg.sender === 'ai' ? 'fa-robot' : 'fa-user'}"></i> ${msg.author}
            </div>
            <div>${msg.text}</div>
        </div>
    `).join('');

    chatBox.scrollTop = chatBox.scrollHeight;
    renderMcOptions();
}

function renderMcOptions() {
    const mcContainer = document.getElementById('chat-mc-options-container');
    const inputField = document.getElementById('chat-input');
    const sendBtn = document.getElementById('btn-send-chat');
    
    if (!mcContainer) return;
    
    if (state.chat.completed) {
        mcContainer.innerHTML = `
            <div style="background: rgba(16,185,129,0.1); border: 1px solid #10b981; border-radius: var(--border-radius-sm); padding: 1rem; text-align: center; color: #10b981; font-weight: 600;">
                <i class="fa-solid fa-circle-check"></i> Simulation completed! Toggle tracks or click reset to test other strategies.
            </div>
        `;
        if (inputField) inputField.disabled = true;
        if (sendBtn) sendBtn.disabled = true;
        return;
    }

    if (inputField) inputField.disabled = false;
    if (sendBtn) sendBtn.disabled = false;

    const step = state.chat.step;
    const mode = state.chat.mode;
    const currentQuestionNode = interviewTree[mode][step];

    if (!currentQuestionNode) return;

    mcContainer.innerHTML = currentQuestionNode.o.map((opt, oIdx) => `
        <button class="btn btn-secondary btn-sm" style="text-align: left; justify-content: flex-start; width: 100%;" onclick="submitMcChatAnswer(${oIdx})">
            <strong>[${opt.type}]</strong> ${opt.text}
        </button>
    `).join('');
}

window.submitMcChatAnswer = function(optIdx) {
    const step = state.chat.step;
    const mode = state.chat.mode;
    const currentQNode = interviewTree[mode][step];
    const choice = currentQNode.o[optIdx];

    state.chat.history.push({
        sender: 'user',
        author: 'You',
        text: choice.text
    });

    state.chat.history.push({
        sender: 'ai',
        author: 'Torque Mentor',
        text: `<em>Feedback: ${choice.f}</em>`
    });

    state.chat.step += 1;
    
    if (state.chat.step >= interviewTree[mode].length) {
        state.chat.completed = true;
        state.chat.history.push({
            sender: 'ai',
            author: 'Torque Mentor',
            text: `<strong>Final Assessment:</strong> You finalized the tracks demonstrating strong <strong>${choice.type}</strong> communication structures. Overall performance is high. Protip: Highlight key business metrics (e.g. ROI growth, conversion rates) during real interviews to fully convince case leaders.`
        });
    } else {
        const nextQ = interviewTree[mode][state.chat.step].q;
        state.chat.history.push({
            sender: 'ai',
            author: 'Torque Mentor',
            text: nextQ
        });
    }

    renderChat();
};

window.submitCustomChatAnswer = function() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    
    const text = input.value.trim();
    if (!text) return;

    input.value = '';

    state.chat.history.push({
        sender: 'user',
        author: 'You',
        text: text
    });

    let feedbackText = "";
    let matchingKeywords = [];
    const lowerText = text.toLowerCase();

    const kwMap = {
        mba: ["lead", "team", "framework", "manage", "growth", "career", "leadership", "impact"],
        consulting: ["revenue", "cost", "profit", "ebitda", "volume", "market", "competitor", "structure"],
        "tech-pm": ["user", "mvp", "feature", "prioritize", "metrics", "data", "customer", "product"],
        gd: ["culture", "collaborate", "remote", "hybrid", "synthesize", "opinion", "group", "discuss"]
    };

    kwMap[state.chat.mode].forEach(kw => {
        if (lowerText.includes(kw)) matchingKeywords.push(kw);
    });

    if (text.length < 25) {
        feedbackText = "Your response is relatively brief. Try expanding your frameworks using structured methods (such as the STAR structure) to outline details clearly.";
    } else if (matchingKeywords.length >= 2) {
        feedbackText = `Excellent contextual articulation! You logically leveraged key domain metrics: (${matchingKeywords.join(', ')}). Your answer is structured, direct, and displays industry maturity.`;
    } else {
        feedbackText = "Good baseline communication. Try injecting more explicit industry terms or quantitative metrics to improve depth.";
    }

    state.chat.history.push({
        sender: 'ai',
        author: 'Torque Mentor',
        text: `<em>Feedback: ${feedbackText}</em>`
    });

    state.chat.step += 1;
    const mode = state.chat.mode;

    if (state.chat.step >= interviewTree[mode].length) {
        state.chat.completed = true;
        state.chat.history.push({
            sender: 'ai',
            author: 'Torque Mentor',
            text: `<strong>Final Assessment:</strong> Simulator completes. You integrated custom reasoning effectively. Continue polishing key strategic terms via course catalog reviews.`
        });
    } else {
        const nextQ = interviewTree[mode][state.chat.step].q;
        state.chat.history.push({
            sender: 'ai',
            author: 'Torque Mentor',
            text: nextQ
        });
    }

    renderChat();
};

/* ==========================================
   JOB BOARD & APPLICATION MODAL OPERATIONS
   ========================================== */
window.filterJobs = function(category) {
    state.jobs.activeCategory = category;
    
    const tabs = document.querySelectorAll('#job-category-tabs button');
    tabs.forEach(tab => {
        if (tab.innerText === category) {
            tab.className = "btn btn-primary btn-sm";
        } else {
            tab.className = "btn btn-secondary btn-sm";
        }
    });

    renderJobsList();
};

window.searchJobs = function(query) {
    state.jobs.searchQuery = query;
    renderJobsList();
};

function renderJobsList() {
    const container = document.getElementById('jobs-list-container');
    if (!container) return;

    let filtered = jobsData.filter(job => {
        let matchesCat = true;
        if (state.jobs.activeCategory !== 'All') {
            if (state.jobs.activeCategory === 'Internships') {
                matchesCat = job.type === 'Internship';
            } else if (state.jobs.activeCategory === 'Full-Time') {
                matchesCat = job.type === 'Full-Time';
            } else if (state.jobs.activeCategory === 'UG Focus') {
                matchesCat = job.focus === 'UG Focus';
            } else if (state.jobs.activeCategory === 'MBA Focus') {
                matchesCat = job.focus === 'MBA Focus';
            }
        }
        
        let matchesSearch = true;
        if (state.jobs.searchQuery) {
            const q = state.jobs.searchQuery.toLowerCase();
            matchesSearch = job.role.toLowerCase().includes(q) || job.company.toLowerCase().includes(q) || job.location.toLowerCase().includes(q);
        }

        return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No job openings match search filters.</p>`;
        return;
    }

    container.innerHTML = filtered.map(job => `
        <div class="job-row" style="flex-wrap: wrap; gap: 1rem;">
            <div class="job-info">
                <div class="job-icon">${job.icon}</div>
                <div class="job-details">
                    <h4>${job.role}</h4>
                    <p>${job.company} &bull; ${job.location}</p>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem; margin-left: auto;">
                <span class="badge badge-secondary">${job.type}</span>
                <span class="badge badge-primary">${job.focus}</span>
                <button class="btn btn-primary btn-sm" onclick="openApplyModal('${job.role}', '${job.company}')">Apply Now</button>
            </div>
        </div>
    `).join('');
}

let currentAppRole = "";
let currentAppCompany = "";

window.openApplyModal = function(role, company) {
    currentAppRole = role;
    currentAppCompany = company;

    const modal = document.getElementById('apply-modal');
    const roleTitle = document.getElementById('modal-role-title');
    const companyName = document.getElementById('modal-company-name');
    const applyNameInput = document.getElementById('apply-name');
    const resumeNotice = document.getElementById('modal-resume-notice');
    
    const formSeg = document.getElementById('modal-form-segment');
    const successSeg = document.getElementById('modal-success-segment');

    if (roleTitle) roleTitle.innerText = role;
    if (companyName) companyName.innerText = company;

    if (formSeg) formSeg.style.display = 'block';
    if (successSeg) successSeg.style.display = 'none';

    if (state.resume.name) {
        if (applyNameInput) applyNameInput.value = state.resume.name;
        if (resumeNotice) resumeNotice.innerText = `Applying as ${state.resume.name} with built resume`;
    } else {
        if (applyNameInput) applyNameInput.value = '';
        if (resumeNotice) resumeNotice.innerText = '';
    }

    if (modal) modal.classList.add('active');
};

window.closeApplyModal = function() {
    const modal = document.getElementById('apply-modal');
    if (modal) modal.classList.remove('active');
};

window.submitApplication = function() {
    const applyNameInput = document.getElementById('apply-name');
    const name = applyNameInput ? applyNameInput.value.trim() : '';

    if (!name) {
        alert("Please input your name to finalize application.");
        return;
    }

    const formSeg = document.getElementById('modal-form-segment');
    const successSeg = document.getElementById('modal-success-segment');
    const successMsg = document.getElementById('success-message');

    if (formSeg) formSeg.style.display = 'none';
    if (successSeg) successSeg.style.display = 'block';
    if (successMsg) {
        successMsg.innerText = `Application submitted successfully for ${currentAppRole} at ${currentAppCompany} as ${name}. Recruiter confirmation has been logged.`;
    }
};

/* ==========================================
   EDTECH NEWS FILTRATION
   ========================================== */
window.filterNews = function(category) {
    state.news.activeCategory = category;
    renderNewsList();
};

window.searchNews = function(query) {
    state.news.searchQuery = query;
    renderNewsList();
};

function renderNewsList() {
    const container = document.getElementById('news-list-container');
    if (!container) return;

    let filtered = newsData.filter(news => {
        let matchesCat = true;
        if (state.news.activeCategory !== 'All') {
            matchesCat = news.category === state.news.activeCategory;
        }

        let matchesSearch = true;
        if (state.news.searchQuery) {
            const q = state.news.searchQuery.toLowerCase();
            matchesSearch = news.title.toLowerCase().includes(q) || news.desc.toLowerCase().includes(q);
        }

        return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No news articles match your criteria.</p>`;
        return;
    }

    container.innerHTML = filtered.map(news => `
        <div class="glass-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                <span class="badge ${news.badge}" style="margin: 0;">${news.category}</span>
                ${news.subline ? `<span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">${news.subline}</span>` : ''}
            </div>
            <h3>${news.title}</h3>
            <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">${news.desc}</p>
            <a href="${news.link}" ${news.link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} style="color: var(--accent-secondary); font-size: 0.85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem; margin-top: 1rem;">Read Full Story <i class="fa-solid fa-chevron-right"></i></a>
        </div>
    `).join('');
}

/* ==========================================
   UG/MBA ACCORDIONS & SPECIAL CLICKS
   ========================================== */
window.toggleAccordion = function(id) {
    const item = document.getElementById(id);
    if (!item) return;
    item.classList.toggle('active');
};

window.toggleNestedAccordion = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const header = el.previousElementSibling;
    const icon = header ? header.querySelector('.fa-chevron-down, .fa-chevron-up') : null;
    
    if (el.style.display === 'none' || !el.style.display) {
        el.style.display = 'block';
        if (icon) {
            icon.className = 'fa-solid fa-chevron-up';
        }
    } else {
        el.style.display = 'none';
        if (icon) {
            icon.className = 'fa-solid fa-chevron-down';
        }
    }
};

window.showSoftSkillTip = function(section) {
    const box = document.getElementById('pres-tip-box');
    if (!box) return;

    const tips = {
        'pres-hook': "<strong>The Hook:</strong> Start with a provocative question, a striking statistic, or a personal story. Do NOT start with 'Hello, my name is...'. E.g., 'What if we could double productivity in three minutes?'",
        'pres-body': "<strong>Core Message:</strong> Break down your body into exactly 3 key pillars. The human brain remembers groups of three. Support each pillar with one chart or visual block.",
        'pres-cta': "<strong>Call To Action:</strong> Close with a single, clear next step. Make it action-oriented: 'Download the app today' or 'Sign the proposal before Friday'."
    };

    box.innerHTML = tips[section];
};

window.loadEmailTemplate = function(tpl) {
    const box = document.getElementById('email-template-box');
    const subject = document.getElementById('email-template-subject');
    const body = document.getElementById('email-template-body');
    if (!box || !subject || !body) return;

    const templates = {
        referral: {
            subject: "Subject: Request for Internship Guidance - Product Management",
            body: "Dear [Name],\n\nI hope this email finds you well.\n\nI have been following your achievements at [Company Name] and was inspired by your recent release. I am a final-year BBA student at [University] specializing in Product Strategy, and I would love to ask for 10 minutes of your time to learn about your path.\n\nI have attached my resume, which details how I increased user engagement by 20% during my recent project. I would be incredibly grateful for any internship openings or recommendations you might share.\n\nBest regards,\n[Your Name]"
        },
        followup: {
            subject: "Subject: Thank You & Follow-up - [Job Title] Interview",
            body: "Dear [Name],\n\nThank you for taking the time to speak with me yesterday regarding the [Job Title] role. I thoroughly enjoyed learning about the team's goals and how you approach product iterations.\n\nOur conversation confirmed my enthusiasm for the role. Please let me know if you need any additional portfolio links or references. I look forward to hearing about the next steps.\n\nSincerely,\n[Your Name]"
        },
        networking: {
            subject: "Subject: Coffee Chat Request - Business Analyst Aspirant",
            body: "Dear [Name],\n\nI am a final year student specializing in Business Analysis. I noticed your background in consulting and would love to hear about your experience managing enterprise operations.\n\nIf your schedule allows, would you be open to a brief 15-minute virtual coffee chat next Tuesday? I appreciate your guidance.\n\nWarm regards,\n[Your Name]"
        }
    };

    subject.innerText = templates[tpl].subject;
    body.innerText = templates[tpl].body;
    box.style.display = 'block';
};

window.copyEmailTemplate = function() {
    const bodyText = document.getElementById('email-template-body').innerText;
    navigator.clipboard.writeText(bodyText).then(() => {
        alert("Email template copied to clipboard!");
    });
};

window.answerTeamworkScenario = function(opt) {
    const box = document.getElementById('teamwork-outcome-box');
    if (!box) return;

    const outcomes = {
        a: "❌ <strong>Outcome (Unconstructive):</strong> Filing a formal complaint immediately breaks peer trust and can lead to defensive behaviors, stalling the project. Try communicating first.",
        b: "✅ <strong>Outcome (Constructive!):</strong> Connecting privately allows you to uncover structural blockers (like sickness, lack of skills) and coordinate work sharing. Excellent leadership skill!",
        c: "⚠️ <strong>Outcome (Passive-Aggressive):</strong> Doing all the work creates resentment and doesn't scale in corporate team environments. Seek open communication."
    };

    box.innerHTML = outcomes[opt];
    box.style.display = 'block';
};

/* ==========================================
   MBA STRATEGY CHECKLIST & FRAMEWORKS
   ========================================== */
window.updateMbaScore = function() {
    const checklist = document.getElementById('mba-checklist-container');
    const scoreText = document.getElementById('mba-score-text');
    const scoreBar = document.getElementById('mba-score-bar');
    const critique = document.getElementById('mba-score-critique');
    if (!checklist || !scoreText || !scoreBar || !critique) return;

    const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
    let checkedCount = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) checkedCount++;
    });

    const score = Math.round((checkedCount / checkboxes.length) * 100);
    scoreText.innerText = `${score}%`;
    scoreBar.style.width = `${score}%`;

    let feedback = "";
    if (score === 0) {
        feedback = "Select checklist options to assess your strategy validation level.";
    } else if (score <= 33) {
        feedback = "🔴 <strong>Startup Ideation Phase:</strong> You have the absolute basics, but competitor metrics and roadmaps are completely unvalidated.";
    } else if (score <= 67) {
        feedback = "🟡 <strong>Mid-Market Execution Plan:</strong> Solid macro strategic foundations, but you need clear KPIs and Gantt roadmap metrics.";
    } else {
        feedback = "🟢 <strong>Enterprise Ready Strategy:</strong> Full stack strategic pillars validated. You are fully prepared to present this strategy in case interviews!";
    }
    critique.innerHTML = feedback;
};

window.showMbaFramework = function(fw) {
    const title = document.getElementById('framework-title');
    const desc = document.getElementById('framework-desc');
    const struct = document.getElementById('framework-structure');
    if (!title || !desc || !struct) return;

    const frameworks = {
        profit: {
            title: "Profitability Framework (Revenue vs Cost)",
            desc: "The standard tool to diagnose financial drops. Break the problem into volume and price components, then investigate variable and fixed cost structures.",
            structure: `Profitability Diagnostic Tree:
  Profit
  ├── Revenues
  │   ├── Price (Check competitor discount campaigns, pricing elasticity)
  │   └── Volume (Check channel performance, geographic demand, sales churn)
  └── Costs
      ├── Fixed Costs (Check lease overhead, administrative fees, tooling)
      └── Variable Costs (Check supplier COGS, sales commissions, freight fees)`
        },
        market: {
            title: "Market Entry Framework (Should client enter a new market?)",
            desc: "Evaluate if a client should launch a product or expand geography. Look at market metrics, competitor shares, client capabilities, and financial entry options.",
            structure: `Market Entry Strategy Pillars:
  1. Market Attractiveness
     ├── Size & growth rates
     └── Barriers to entry (regulations, capital requirements)
  2. Competitive Landscape
     ├── Number of players & market shares
     └── Competitor GTM models
  3. Client Capabilities
     ├── Synergy potentials
     └── Capital allocation resources
  4. Financial Feasibility
     ├── NPV & IRR metrics
     └── Payback period expectations`
        },
        ma: {
            title: "M&A (Mergers & Acquisitions) Framework",
            desc: "Analyze if a business should acquire a target company. Assess strategic synergy, target financial health, deal valuation, and post-merger culture alignment.",
            structure: `M&A Evaluation Checklist:
  1. Strategic Fit
     ├── Product mix complementarity
     └── Patent acquisitions & operational IP
  2. Target Quality Assessment
     ├── Earnings quality (EBITDA margins)
     └── Customer churn logs
  3. Deal Terms & Valuation
     ├── DCF models & comparable multiples
     └── Cash vs Equity payout structures
  4. Operational Integration
     ├── IT & database integrations
     └── Cultural alignment & leadership retention`
        }
    };

    title.innerText = frameworks[fw].title;
    desc.innerText = frameworks[fw].desc;
    struct.innerHTML = frameworks[fw].structure;
    struct.style.display = 'block';
};

/* ==========================================
   PLAYGROUND PROMPT BUILDER
   ========================================== */
window.generatePlaygroundPrompt = function() {
    const goalSelect = document.getElementById('prompt-goal');
    const roleInput = document.getElementById('prompt-role');
    const skillsInput = document.getElementById('prompt-skills');
    const outputBox = document.getElementById('prompt-output-box');
    if (!goalSelect || !roleInput || !skillsInput || !outputBox) return;

    const goal = goalSelect.value;
    const role = roleInput.value.trim() || "[Target Role]";
    const skills = skillsInput.value.trim() || "[Key Skills / Metrics]";

    let promptText = "";
    if (goal === 'summary') {
        promptText = `Act as an expert executive recruiter. Write a compelling, metrics-driven professional summary for a ${role} highlighting these key skills and achievements: ${skills}. The summary must be under 4 sentences, start with an active verb, and be highly optimized for ATS parsers. Include quantifiable metrics.`;
    } else if (goal === 'cover-letter') {
        promptText = `Act as an elite career coach. Write a customized cover letter outline for the position of ${role}. Highlight my capabilities in: ${skills}. Structure the letter with: 
1. The Hook (why I am excited about their team specifically)
2. The Body (2-3 proof points of metrics-driven success using Star framework)
3. Call to Action (polite closing offering to discuss insights in an interview)`;
    } else if (goal === 'interview') {
        promptText = `Act as a senior hiring manager conducting an interview for a ${role} role. Based on my skills: ${skills}, generate a list of 5 difficult situational behavior questions. For each question, outline what indicators you look for in a top-performing candidate answer.`;
    } else if (goal === 'linkedin') {
        promptText = `Act as a LinkedIn SEO Optimizer. Generate 3 variations of a compelling profile headline (under 120 characters) for a ${role}. Maximize search discoverability by leveraging these keywords and metrics: ${skills}. Use the vertical bar separator: | to structure the headline clearly.`;
    }

    outputBox.innerText = promptText;
};

window.copyPlaygroundPrompt = function() {
    const outputBox = document.getElementById('prompt-output-box');
    if (!outputBox) return;

    navigator.clipboard.writeText(outputBox.innerText).then(() => {
        alert("AI prompt template copied to clipboard!");
    });
};

/* ==========================================
   INITIALIZATION & EVENT ROUTING
   ========================================== */
/* ==========================================
   GLOBAL LEAD CAPTURE & STARTUP ACCELERATOR HELPERS
   ========================================== */
function ensureLeadModalExists() {
    let modal = document.getElementById('lead-capture-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lead-capture-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close" onclick="closeLeadModal()">&times;</span>
                
                <div class="modal-tabs">
                    <button class="modal-tab-btn active" onclick="switchModalTab('request')"><i class="fa-solid fa-paper-plane"></i> Quick Request</button>
                    <button class="modal-tab-btn" onclick="switchModalTab('direct')"><i class="fa-solid fa-envelope"></i> Contact & Google Form</button>
                </div>

                <!-- Tab 1: Local Lead Capture Form -->
                <div id="lead-form-segment">
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;"><i class="fa-solid fa-graduation-cap" style="color: var(--accent-primary);"></i> Request Syllabus & Info</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">Fill out the form below and our advisors will send you the curriculum details.</p>
                    
                    <form id="lead-capture-form" onsubmit="event.preventDefault(); submitLeadForm();">
                        <div class="form-group">
                            <label for="lead-name">Full Name</label>
                            <input type="text" id="lead-name" class="form-control" placeholder="Enter your full name">
                            <span class="error-text" id="lead-name-error" style="color: var(--accent-magenta); font-size: 0.8rem; display: none; margin-top: 0.25rem;">Full name is required.</span>
                        </div>
                        <div class="form-group">
                            <label for="lead-email">Email Address</label>
                            <input type="email" id="lead-email" class="form-control" placeholder="name@example.com">
                            <span class="error-text" id="lead-email-error" style="color: var(--accent-magenta); font-size: 0.8rem; display: none; margin-top: 0.25rem;">Valid email is required.</span>
                        </div>
                        <div class="form-group">
                            <label for="lead-phone">Phone Number</label>
                            <input type="tel" id="lead-phone" class="form-control" placeholder="e.g. +91 99999 99999">
                            <span class="error-text" id="lead-phone-error" style="color: var(--accent-magenta); font-size: 0.8rem; display: none; margin-top: 0.25rem;">Valid phone number is required.</span>
                        </div>
                        <div class="form-group">
                            <label for="lead-interest">Course / Interest Selection</label>
                            <select id="lead-interest" class="form-control">
                                <option value="BBA Entrance Masterclass">BBA Entrance Masterclass</option>
                                <option value="IPMAT Strategy & Prep">IPMAT Strategy & Prep</option>
                                <option value="Business Foundations 101">Business Foundations 101</option>
                                <option value="CAT / GMAT Elite Prep">CAT / GMAT Elite Prep</option>
                                <option value="Executive MBA Primer">Executive MBA Primer</option>
                                <option value="Case Interview Training">Case Interview Training</option>
                                <option value="Product Management Bootcamp">Product Management Bootcamp</option>
                                <option value="Data Analytics with SQL & BI">Data Analytics with SQL & BI</option>
                                <option value="Tech Recruiting Accelerator">Tech Recruiting Accelerator</option>
                                <option value="Startup Accelerator Incubator">Torque Launchpad: Startup Accelerator</option>
                                <option value="Spoken English & Corporate Communication">Spoken English & Corporate Communication</option>
                                <option value="IELTS Training">IELTS Training (Academic & General)</option>
                                <option value="TESOL Certification">TESOL Certification</option>
                                <option value="General Inquiry">General Career Advice</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="lead-message">Message Box (Optional)</label>
                            <textarea id="lead-message" class="form-control" placeholder="Tell us more about your career goals..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;"><i class="fa-solid fa-paper-plane"></i> Request Details</button>
                    </form>
                </div>

                <!-- Tab 2: Direct Details & Google Form Embed -->
                <div id="lead-direct-segment" style="display: none;">
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;"><i class="fa-solid fa-address-book" style="color: var(--accent-primary);"></i> Reach Out & Connect</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.25rem;">Have general questions or want to contact us directly? Use our coordinates or submit the form below.</p>
                    
                    <div class="modal-contact-grid" style="margin-bottom: 1.25rem; font-size: 0.9rem; border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--border-radius-sm); background: var(--bg-tertiary);">
                        <div class="modal-contact-item" style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary);">
                            <i class="fa-solid fa-envelope" style="color: var(--accent-primary); width: 16px;"></i>
                            <strong>Email:</strong> <a href="mailto:subodh.kumar68@gmail.com" style="color: var(--accent-primary); text-decoration: underline;">subodh.kumar68@gmail.com</a>
                        </div>
                        <div class="modal-contact-item" style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary);">
                            <i class="fa-solid fa-phone" style="color: var(--accent-primary); width: 16px;"></i>
                            <strong>Phone:</strong> <a href="tel:9824413735" style="color: var(--accent-primary); text-decoration: underline;">+91 98244 13735</a>
                        </div>
                        <div class="modal-contact-item" style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary);">
                            <i class="fa-solid fa-location-dot" style="color: var(--accent-primary); width: 16px;"></i>
                            <strong>Address:</strong> <span>India</span>
                        </div>
                        <div class="modal-contact-item" style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary);">
                            <i class="fa-brands fa-linkedin" style="color: var(--accent-primary); width: 16px;"></i>
                            <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/subodh-kumar-1a91822/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline;">Subodh Kumar Profile</a>
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                            <h4 style="margin: 0; font-size: 1rem; color: var(--text-header);"><i class="fa-brands fa-google" style="color: var(--accent-primary);"></i> Submit via Google Form:</h4>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSey3lHZfMU2pysNcv0YFBhKs718XK_xbuV3BwNBUzgC-LsL5Q/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem; color: var(--accent-primary); text-decoration: underline; font-weight: 600;"><i class="fa-solid fa-up-right-from-square"></i> Open Form in New Tab</a>
                        </div>
                        <div class="google-form-wrapper" style="overflow: hidden; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); box-shadow: var(--shadow-neon-glow);">
                            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSey3lHZfMU2pysNcv0YFBhKs718XK_xbuV3BwNBUzgC-LsL5Q/viewform?embedded=true" width="100%" height="320" frameborder="0" marginheight="0" marginwidth="0" style="border: none; background: #ffffff; display: block;">Loading…</iframe>
                        </div>
                    </div>
                </div>

                <div id="lead-success-segment" style="display: none; text-align: center; padding: 1.5rem 0;">
                    <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                        <i class="fa-solid fa-check" style="font-size: 2.2rem; color: #10b981;"></i>
                    </div>
                    <h3 style="font-size: 1.6rem; margin-bottom: 0.75rem; color: var(--text-header);">Details Requested!</h3>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                        Our academic advisors will reach out to you within 24 hours.
                    </p>
                    <button class="btn btn-secondary btn-sm" onclick="closeLeadModal()">Close Window</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLeadModal();
            }
        });
    }
}

window.switchModalTab = function(tabName) {
    const requestBtn = document.querySelector('.modal-tab-btn:nth-child(1)');
    const directBtn = document.querySelector('.modal-tab-btn:nth-child(2)');
    const requestSegment = document.getElementById('lead-form-segment');
    const directSegment = document.getElementById('lead-direct-segment');
    const successSegment = document.getElementById('lead-success-segment');
    
    if (tabName === 'request') {
        if (requestBtn) requestBtn.classList.add('active');
        if (directBtn) directBtn.classList.remove('active');
        if (requestSegment) requestSegment.style.display = 'block';
        if (directSegment) directSegment.style.display = 'none';
        if (successSegment) successSegment.style.display = 'none';
    } else {
        if (requestBtn) requestBtn.classList.remove('active');
        if (directBtn) directBtn.classList.add('active');
        if (requestSegment) requestSegment.style.display = 'none';
        if (directSegment) directSegment.style.display = 'block';
        if (successSegment) successSegment.style.display = 'none';
    }
};

window.openLeadModal = function(interest) {
    ensureLeadModalExists();
    
    // Reset form states
    document.getElementById('lead-form-segment').style.display = 'block';
    document.getElementById('lead-success-segment').style.display = 'none';
    
    // Reset validations
    const nameInput = document.getElementById('lead-name');
    const emailInput = document.getElementById('lead-email');
    const phoneInput = document.getElementById('lead-phone');
    const msgInput = document.getElementById('lead-message');
    
    [nameInput, emailInput, phoneInput].forEach(inp => {
        if (inp) {
            inp.value = '';
            inp.classList.remove('is-invalid');
        }
    });
    if (msgInput) msgInput.value = '';
    
    document.getElementById('lead-name-error').style.display = 'none';
    document.getElementById('lead-email-error').style.display = 'none';
    document.getElementById('lead-phone-error').style.display = 'none';
    
    // Set course preselection if valid
    if (interest) {
        const select = document.getElementById('lead-interest');
        if (select) {
            let matched = false;
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].value === interest || select.options[i].text.includes(interest)) {
                    select.selectedIndex = i;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                select.value = "General Inquiry";
            }
        }
    }
    
    // Set default tab based on whether interest is general contact or course request
    if (interest === 'General Inquiry' || interest === 'Contact Us' || interest === 'Contact') {
        switchModalTab('direct');
    } else {
        switchModalTab('request');
    }
    
    const modal = document.getElementById('lead-capture-modal');
    if (modal) {
        modal.classList.add('active');
    }
};

window.closeLeadModal = function() {
    const modal = document.getElementById('lead-capture-modal');
    if (modal) {
        modal.classList.remove('active');
    }
};

window.submitLeadForm = function() {
    const nameInput = document.getElementById('lead-name');
    const emailInput = document.getElementById('lead-email');
    const phoneInput = document.getElementById('lead-phone');
    
    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const interest = document.getElementById('lead-interest').value;
    const msg = document.getElementById('lead-message') ? document.getElementById('lead-message').value.trim() : '';
    
    // Validate
    let isValid = true;
    
    if (!name) {
        document.getElementById('lead-name-error').style.display = 'block';
        if (nameInput) nameInput.classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('lead-name-error').style.display = 'none';
        if (nameInput) nameInput.classList.remove('is-invalid');
    }
    
    if (!email || !email.includes('@')) {
        document.getElementById('lead-email-error').style.display = 'block';
        if (emailInput) emailInput.classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('lead-email-error').style.display = 'none';
        if (emailInput) emailInput.classList.remove('is-invalid');
    }
    
    if (!phone || phone.length < 8) {
        document.getElementById('lead-phone-error').style.display = 'block';
        if (phoneInput) phoneInput.classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('lead-phone-error').style.display = 'none';
        if (phoneInput) phoneInput.classList.remove('is-invalid');
    }
    
    if (!isValid) return;
    
    // Log details
    console.log("Lead captured:", { name, email, phone, interest, message: msg });
    
    // Show success screen
    document.getElementById('lead-form-segment').style.display = 'none';
    const successSeg = document.getElementById('lead-success-segment');
    successSeg.querySelector('p').innerHTML = `
        Details Requested! Our academic advisors will reach out within 24 hours to schedule a consultation regarding <strong>${interest}</strong>.
    `;
    successSeg.style.display = 'block';
};

window.scrollToApplication = function() {
    const el = document.getElementById('startup-accelerator-application');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

window.scrollToAuditor = function() {
    const el = document.getElementById('startup-pitch-auditor');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

window.updatePitchScore = function() {
    const checklist = document.getElementById('pitch-checklist-container');
    const scoreText = document.getElementById('pitch-score-text');
    const circle = document.getElementById('pitch-progress-circle');
    const ratingText = document.getElementById('pitch-strength-rating');
    const critique = document.getElementById('pitch-score-critique');
    if (!checklist || !scoreText || !circle || !ratingText || !critique) return;

    const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
    let checkedCount = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) checkedCount++;
    });

    const score = Math.round((checkedCount / checkboxes.length) * 100);
    scoreText.innerText = `${score}%`;

    const circumference = 326.7; // 2 * pi * r (r = 52)
    const offset = circumference - (score / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    let rating = "Drafting";
    let feedback = "";
    if (score === 0) {
        rating = "Drafting";
        feedback = "Check slides to assess pitch presentation preparedness.";
    } else if (score <= 33) {
        rating = "Pre-Seed Draft";
        feedback = "🔴 <strong>Basic Framework Ready:</strong> Core idea and problem statements defined, but market size metrics are unvalidated.";
    } else if (score <= 67) {
        rating = "Seed Ready";
        feedback = "🟡 <strong>Growth Story Solid:</strong> Defensible competitor analysis completed. Make sure unit economics are bottom-up and robust.";
    } else {
        rating = "Series A Premium";
        feedback = "🟢 <strong>Investor Approved Deck:</strong> All fundamental strategic, team, and financial variables validated. Fully ready for Demo Day.";
    }

    ratingText.innerText = rating;
    critique.innerHTML = feedback;
};

window.submitIncubatorApp = function() {
    // Inputs
    const founderInput = document.getElementById('inc-founder-name');
    const emailInput = document.getElementById('inc-email');
    const affInput = document.getElementById('inc-affiliation');
    const startupInput = document.getElementById('inc-startup-name');
    const ideaInput = document.getElementById('inc-idea');

    // Values
    const founder = founderInput ? founderInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const aff = affInput ? affInput.value.trim() : '';
    const startup = startupInput ? startupInput.value.trim() : '';
    const idea = ideaInput ? ideaInput.value.trim() : '';

    // Clear errors
    const errors = ['inc-founder-name-error', 'inc-email-error', 'inc-affiliation-error', 'inc-startup-name-error', 'inc-idea-error'];
    errors.forEach(errId => {
        const errEl = document.getElementById(errId);
        if (errEl) errEl.style.display = 'none';
    });
    [founderInput, emailInput, affInput, startupInput, ideaInput].forEach(inp => {
        if (inp) inp.classList.remove('is-invalid');
    });

    let isValid = true;
    if (!founder) {
        document.getElementById('inc-founder-name-error').style.display = 'block';
        if (founderInput) founderInput.classList.add('is-invalid');
        isValid = false;
    }
    if (!email || !email.includes('@')) {
        document.getElementById('inc-email-error').style.display = 'block';
        if (emailInput) emailInput.classList.add('is-invalid');
        isValid = false;
    }
    if (!aff) {
        document.getElementById('inc-affiliation-error').style.display = 'block';
        if (affInput) affInput.classList.add('is-invalid');
        isValid = false;
    }
    if (!startup) {
        document.getElementById('inc-startup-name-error').style.display = 'block';
        if (startupInput) startupInput.classList.add('is-invalid');
        isValid = false;
    }
    if (!idea) {
        document.getElementById('inc-idea-error').style.display = 'block';
        if (ideaInput) ideaInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!isValid) return;

    // Transition to success
    document.getElementById('incubator-form-segment').style.display = 'none';
    document.getElementById('incubator-success-segment').style.display = 'block';

    // Set success info
    document.getElementById('inc-success-startup').innerText = startup;
    document.getElementById('inc-success-name').innerText = founder;
    document.getElementById('inc-success-email').innerText = email;
};

window.resetIncubatorForm = function() {
    document.getElementById('incubator-form-segment').style.display = 'block';
    document.getElementById('incubator-success-segment').style.display = 'none';

    // Clear inputs
    const inputs = ['inc-founder-name', 'inc-email', 'inc-affiliation', 'inc-startup-name', 'inc-idea'];
    inputs.forEach(inpId => {
        const inp = document.getElementById(inpId);
        if (inp) inp.value = '';
    });
};

/* ==========================================
   SOFT SKILLS & LANGUAGE HUB OPERATIONS
   ========================================== */
function bindSoftSkillsEvents() {
    const fluency = document.getElementById('ielts-fluency');
    if (fluency) fluency.value = state.ielts.fluency;

    const grammar = document.getElementById('ielts-grammar');
    if (grammar) grammar.value = state.ielts.grammar;

    const pronunciation = document.getElementById('ielts-pronunciation');
    if (pronunciation) pronunciation.value = state.ielts.pronunciation;

    const reading = document.getElementById('ielts-reading');
    if (reading) reading.value = state.ielts.reading;

    if (state.ielts.calculated) {
        showIeltsResults();
    } else {
        const placeholder = document.getElementById('ielts-placeholder-text');
        const roadmap = document.getElementById('ielts-roadmap-box');
        const scoreText = document.getElementById('ielts-score-text');
        if (placeholder) placeholder.style.display = 'block';
        if (roadmap) roadmap.style.display = 'none';
        if (scoreText) scoreText.innerText = '--';
    }
}

window.calculateIeltsBand = function() {
    const fluencySelect = document.getElementById('ielts-fluency');
    const grammarSelect = document.getElementById('ielts-grammar');
    const pronunciationSelect = document.getElementById('ielts-pronunciation');
    const readingSelect = document.getElementById('ielts-reading');
    
    if (!fluencySelect || !grammarSelect || !pronunciationSelect || !readingSelect) return;

    const fluency = parseFloat(fluencySelect.value);
    const grammar = parseFloat(grammarSelect.value);
    const pronunciation = parseFloat(pronunciationSelect.value);
    const reading = parseFloat(readingSelect.value);

    // Save to state
    state.ielts.fluency = fluencySelect.value;
    state.ielts.grammar = grammarSelect.value;
    state.ielts.pronunciation = pronunciationSelect.value;
    state.ielts.reading = readingSelect.value;
    state.ielts.calculated = true;

    // Estimate band score: average of the 4 components, rounded to nearest 0.5
    const average = (fluency + grammar + pronunciation + reading) / 4;
    let estimated = Math.round(average * 2) / 2;
    if (estimated < 5.5) estimated = 5.5;
    if (estimated > 8.5) estimated = 8.5;

    state.ielts.estimatedBand = estimated.toFixed(1);
    
    showIeltsResults();
};

function showIeltsResults() {
    const placeholder = document.getElementById('ielts-placeholder-text');
    const roadmap = document.getElementById('ielts-roadmap-box');
    const scoreText = document.getElementById('ielts-score-text');
    const roadmapText = document.getElementById('ielts-roadmap-text');

    if (!placeholder || !roadmap || !scoreText || !roadmapText) return;

    placeholder.style.display = 'none';
    roadmap.style.display = 'block';

    const estimated = parseFloat(state.ielts.estimatedBand);
    scoreText.innerText = state.ielts.estimatedBand;

    let tip = "";
    if (estimated >= 8.0) {
        tip = "<strong>Your Profile: High Fluency & Advanced English.</strong> You are very close to a perfect score. Focus on fine-tuning details: write structured essays for Task 2, use vocabulary naturally without sounding academic or artificial, and practice timing in listening and reading comprehension mock tests.";
    } else if (estimated >= 7.0) {
        tip = "<strong>Your Profile: Professional English Competency.</strong> To cross into Band 8.0+, improve pronunciation clarity, expand your lexical range by using less common idioms and expressions, and work on sentence variety. Practice essay structures that clearly outline thesis statements and support them systematically.";
    } else if (estimated >= 6.0) {
        tip = "<strong>Your Profile: Moderate English Competency.</strong> Focus on eliminating grammatical errors in complex sentences and reducing hesitation in speech. Expand your vocabulary, practice skimming and scanning techniques for reading tasks, and learn standard templates for writing letter/essay tasks.";
    } else {
        tip = "<strong>Your Profile: Basic English Competency.</strong> Prioritize foundational grammar drills and active vocabulary building. Practice speaking daily with voice recording to improve fluency and pronunciation confidence. Focus on the core structures of the IELTS exam to avoid common errors.";
    }

    roadmapText.innerHTML = tip;
}

window.loadSSEmailTemplate = function(tpl) {
    const box = document.getElementById('ss-email-template-box');
    const subject = document.getElementById('ss-email-template-subject');
    const body = document.getElementById('ss-email-template-body');
    if (!box || !subject || !body) return;

    const templates = {
        update: {
            subject: "Subject: Project [Name] Status Update - [Week/Milestone]",
            body: "Dear [Manager/Team Name],\n\nI am writing to provide a status update on project [Name] as of this week.\n\nKey Achievements:\n- Completed [Deliverable A]\n- Validated [Pillar B] with the design team\n\nNext Steps:\n- Finalize the presentation deck by Thursday\n- Conduct team alignment on Friday\n\nPlease let me know if you have any questions or feedback.\n\nBest regards,\n[Your Name]"
        },
        meeting: {
            subject: "Subject: Alignment Request: [Topic] Discussion",
            body: "Dear [Name],\n\nI hope this email finds you well.\n\nI would like to schedule a brief 15-minute alignment meeting to discuss [Topic] and finalize our next steps.\n\nAre you available during either of these slots next week?\n- Monday, [Date] at 10:00 AM\n- Wednesday, [Date] at 2:00 PM\n\nIf not, please suggest a convenient time.\n\nWarm regards,\n[Your Name]"
        },
        apology: {
            subject: "Subject: Request for Extension: [Project Name] Deadline",
            body: "Dear [Name],\n\nI am writing to request a brief extension for the submission of [Deliverable], originally scheduled for [Original Date].\n\nDue to [Reason, e.g. delay in data gathering/technical blocker], we require an additional 48 hours to ensure the output meets our quality standards. Our revised target date is [New Date].\n\nThank you for your understanding and support.\n\nBest regards,\n[Your Name]"
        }
    };

    subject.innerText = templates[tpl].subject;
    body.innerText = templates[tpl].body;
    box.style.display = 'block';
};

window.copySSEmailTemplate = function() {
    const bodyEl = document.getElementById('ss-email-template-body');
    if (!bodyEl) return;
    const bodyText = bodyEl.innerText;
    navigator.clipboard.writeText(bodyText).then(() => {
        alert("Email template copied to clipboard!");
    });
};

// Career Guidance Hub Data & Methods
const careerQuestions = [
    {
        dimension: "Orientation Style",
        q: "In a collaborative team project, which role do you naturally fall into?",
        options: [
            { text: "Mapping the project timeline and key strategies", value: "Strategic" },
            { text: "Designing the look, layout, and visual flow", value: "Creative" },
            { text: "Reviewing metrics, calculations, and data sheets", value: "Analytical" },
            { text: "Helping team members communicate and stay aligned", value: "Social" }
        ]
    },
    {
        dimension: "Interest Areas",
        q: "What topic or category of work sounds most exciting to you?",
        options: [
            { text: "Building startups and launching corporate strategies", value: "Business & Strategy" },
            { text: "Writing code, modeling algorithms, and software analytics", value: "Tech & Coding" },
            { text: "Public speaking, copywriting, and marketing campaigns", value: "Marketing & PR" },
            { text: "Financial modelling, stock analysis, and portfolio investments", value: "Finance & Banking" }
        ]
    },
    {
        dimension: "Personality Profile",
        q: "How do you prefer to approach problem solving?",
        options: [
            { text: "Defining the big-picture goals and guiding the group", value: "Leader" },
            { text: "Diving deep into specific technical details and codes", value: "Expert Specialist" },
            { text: "Mediating different views to establish common ground", value: "Collaborator" },
            { text: "Presenting the slides and pitching ideas to stakeholders", value: "Communicator" }
        ]
    },
    {
        dimension: "Aptitude Strength",
        q: "Which skill comes most naturally to you?",
        options: [
            { text: "Spotting logic gaps, mathematical errors, or code bugs", value: "Logic & Quant" },
            { text: "Debating arguments, editing text, or learning languages", value: "Verbal & Writing" },
            { text: "Creating diagrams, website wireframes, or sketch maps", value: "Visual & Design" },
            { text: "Structuring budgets, resources, and milestone grids", value: "Planning & Operations" }
        ]
    },
    {
        dimension: "Work Value Motivator",
        q: "What drives you most in your professional career?",
        options: [
            { text: "Complete autonomy and freedom to test ideas", value: "Independence" },
            { text: "Making a direct positive impact on community success", value: "Purpose" },
            { text: "Gaining technical mastery in a high-skilled field", value: "Expertise" },
            { text: "Fast promotion, scale, and high industry recognition", value: "Status & Growth" }
        ]
    }
];

function renderCareerGuidancePage() {
    return `
        <div class="glass-card" style="margin-bottom: 3rem; text-align: center; padding: 3rem 2rem;">
            <span class="badge badge-primary" style="margin-bottom: 1.5rem; padding: 0.4rem 1.2rem; font-size: 0.85rem;"><i class="fa-solid fa-compass"></i> Career Counseling Hub</span>
            <h1 style="font-size: 2.75rem; margin-bottom: 1rem; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Navigating Your Academic Future</h1>
            <p style="color: var(--text-secondary); max-width: 750px; margin: 0 auto 2rem; font-size: 1.1rem; line-height: 1.6;">
                Modelled on the world's leading counselling blueprints, Torque provides advanced multi-dimensional psychometric tools, specialization mapping, and 1-on-1 advisor briefing tiers.
            </p>
            <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="document.getElementById('career-assessment-title').scrollIntoView({ behavior: 'smooth' })">Take Assessment Quiz</button>
                <button class="btn btn-secondary" onclick="document.getElementById('counseling-tiers-title').scrollIntoView({ behavior: 'smooth' })">Counselling Programs</button>
            </div>
        </div>

        <div style="margin-top: 5rem; margin-bottom: 5rem;">
            <h2 id="career-assessment-title" style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">5-Dimensional Psychometric Assessment</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Answer 5 brief questions on your situational work preferences to find your ideal career archetype.</p>
            
            <div id="career-quiz-container">
                <!-- Quiz will be rendered here dynamically -->
            </div>
        </div>

        <div style="margin-top: 6rem; margin-bottom: 6rem;">
            <h2 id="counseling-tiers-title" style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">Our Structured Guidance Tiers</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Select the level of guidance support tailored to your academic target.</p>
            
            <div class="grid-courses">
                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <span class="badge badge-secondary" style="margin-bottom: 1rem;">Tier 1</span>
                        <h3 style="margin-bottom: 0.75rem; color: var(--text-header);">Torque Learn Plan</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">Comprehensive 5-dimensional career assessment, 34-page analytical report, and detailed self-development roadmap profiles.</p>
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="openLeadModal('Counselling - Learn Plan')" style="width: 100%;">Request Brochure</button>
                </div>
                
                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%; border: 2px solid var(--accent-primary);">
                    <div>
                        <span class="badge badge-primary" style="margin-bottom: 1rem;">Tier 2 (Popular)</span>
                        <h3 style="margin-bottom: 0.75rem; color: var(--text-header);">Torque Explore Plan</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">Includes everything in Learn, plus face-to-face (online) interactive counseling reviews with certified academic experts.</p>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="openLeadModal('Counselling - Explore Plan')" style="width: 100%;">Request Counsel Call</button>
                </div>

                <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <span class="badge badge-magenta" style="margin-bottom: 1rem;">Tier 3 (Premium)</span>
                        <h3 style="margin-bottom: 0.75rem; color: var(--text-header);">Torque Realize Plan</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">Includes Learn + Explore + 24/7 continuous career support, executive mentor access, and corporate internship mapping reviews.</p>
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="openLeadModal('Counselling - Realize Plan')" style="width: 100%;">Schedule Advisor Call</button>
                </div>
            </div>
        </div>

        <div style="margin-top: 6rem; margin-bottom: 4rem;">
            <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-header);">Interactive Stream & Specialization Selector</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem; font-size: 0.95rem;">Select your current academic stream to discover high-value specializations and entrance pathways.</p>
            
            <div class="glass-card" style="padding: 2.5rem; max-width: 700px; margin: 0 auto;">
                <div class="form-group" style="margin-bottom: 1.5rem;">
                    <label for="guidance-stream-select" style="font-weight: 600; margin-bottom: 0.5rem; display: block; color: var(--text-primary);">Select Academic Level:</label>
                    <select id="guidance-stream-select" class="form-control" onchange="changeGuidanceSelectorStream(this.value)">
                        <option value="bba">Undergrad / BBA Pathways</option>
                        <option value="mba">Postgrad / MBA Pathways</option>
                        <option value="others">Professional & AI Pathways</option>
                    </select>
                </div>
                
                <h4 style="font-size: 1.1rem; margin-top: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; color: var(--text-header);">Recommended Specializations & Placements Trends:</h4>
                <div id="specialization-results-container">
                    <!-- Results rendered dynamically -->
                </div>
            </div>
        </div>
    `;
}

function renderCareerQuizWidget() {
    const idx = state.careerQuiz.activeQuestionIndex;
    const qData = careerQuestions[idx];
    const progressPercent = Math.round(((idx) / careerQuestions.length) * 100);
    const selectedVal = state.careerQuiz.answers[idx];

    return `
        <div class="glass-card quiz-card" style="padding: 2.5rem; max-width: 600px; margin: 0 auto; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <span class="badge badge-primary" style="margin: 0;">${qData.dimension}</span>
                <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Question ${idx + 1} of ${careerQuestions.length}</span>
            </div>
            
            <div class="quiz-progress-bar-wrapper" style="width: 100%; height: 6px; background: var(--bg-tertiary); border-radius: 3px; margin-bottom: 2rem; overflow: hidden;">
                <div class="quiz-progress-bar-fill" style="width: ${progressPercent}%; height: 100%; background: var(--accent-primary); transition: var(--transition-smooth);"></div>
            </div>

            <h3 style="font-size: 1.3rem; line-height: 1.5; margin-bottom: 1.5rem; color: var(--text-header);">${qData.q}</h3>
            
            <div class="quiz-options-list" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
                ${qData.options.map((opt, oIdx) => {
                    const isSelected = selectedVal === opt.value;
                    return `
                        <div class="quiz-option-item ${isSelected ? 'selected' : ''}" onclick="selectCareerQuizOption(${oIdx})">
                            <div class="quiz-option-radio" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${isSelected ? 'var(--accent-primary)' : 'var(--text-muted)'}; display: flex; align-items: center; justify-content: center; background: ${isSelected ? 'var(--accent-primary)' : 'transparent'};">
                                ${isSelected ? '<div style="width: 8px; height: 8px; border-radius: 50%; background: #ffffff;"></div>' : ''}
                            </div>
                            <span style="font-size: 0.95rem; font-weight: 500; color: var(--text-primary);">${opt.text}</span>
                        </div>
                    `;
                }).join('')}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button class="btn btn-secondary btn-sm" onclick="prevCareerQuizQuestion()" ${idx === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}><i class="fa-solid fa-arrow-left"></i> Back</button>
                
                ${idx === careerQuestions.length - 1 
                    ? `<button class="btn btn-primary" onclick="calculateCareerResults()" ${selectedVal ? '' : 'disabled style="opacity: 0.6; cursor: not-allowed;"'}><i class="fa-solid fa-square-poll-vertical"></i> Calculate Career Match</button>`
                    : `<button class="btn btn-secondary btn-sm" onclick="nextCareerQuizQuestion()" ${selectedVal ? '' : 'disabled style="opacity: 0.6; cursor: not-allowed;"'}>Next <i class="fa-solid fa-arrow-right"></i></button>`
                }
            </div>
        </div>
    `;
}

window.selectCareerQuizOption = function(optionIndex) {
    const idx = state.careerQuiz.activeQuestionIndex;
    const qData = careerQuestions[idx];
    state.careerQuiz.answers[idx] = qData.options[optionIndex].value;
    
    const container = document.getElementById('career-quiz-container');
    if (container) container.innerHTML = renderCareerQuizWidget();
};

window.prevCareerQuizQuestion = function() {
    if (state.careerQuiz.activeQuestionIndex > 0) {
        state.careerQuiz.activeQuestionIndex--;
        const container = document.getElementById('career-quiz-container');
        if (container) container.innerHTML = renderCareerQuizWidget();
    }
};

window.nextCareerQuizQuestion = function() {
    if (state.careerQuiz.activeQuestionIndex < careerQuestions.length - 1) {
        state.careerQuiz.activeQuestionIndex++;
        const container = document.getElementById('career-quiz-container');
        if (container) container.innerHTML = renderCareerQuizWidget();
    }
};

window.calculateCareerResults = function() {
    const answers = state.careerQuiz.answers;
    
    let scores = {
        consulting: 25,
        engineering: 25,
        finance: 25,
        product: 25
    };

    const q0 = answers[0];
    if (q0 === 'Strategic') { scores.consulting += 25; scores.product += 15; }
    else if (q0 === 'Creative') { scores.product += 25; }
    else if (q0 === 'Analytical') { scores.engineering += 25; scores.finance += 25; }
    else if (q0 === 'Social') { scores.consulting += 15; }

    const q1 = answers[1];
    if (q1 === 'Business & Strategy') { scores.consulting += 25; scores.product += 25; }
    else if (q1 === 'Tech & Coding') { scores.engineering += 25; scores.product += 15; }
    else if (q1 === 'Marketing & PR') { scores.product += 25; }
    else if (q1 === 'Finance & Banking') { scores.finance += 25; }

    const q2 = answers[2];
    if (q2 === 'Leader') { scores.consulting += 25; scores.product += 15; }
    else if (q2 === 'Expert Specialist') { scores.engineering += 25; scores.finance += 25; }
    else if (q2 === 'Collaborator') { scores.product += 20; }
    else if (q2 === 'Communicator') { scores.consulting += 15; }

    const q3 = answers[3];
    if (q3 === 'Logic & Quant') { scores.engineering += 25; scores.finance += 25; }
    else if (q3 === 'Verbal & Writing') { scores.consulting += 20; }
    else if (q3 === 'Visual & Design') { scores.product += 25; }
    else if (q3 === 'Planning & Operations') { scores.consulting += 25; }

    const q4 = answers[4];
    if (q4 === 'Independence') { scores.product += 25; }
    else if (q4 === 'Purpose') { scores.product += 15; }
    else if (q4 === 'Expertise') { scores.engineering += 25; }
    else if (q4 === 'Status & Growth') { scores.consulting += 25; scores.finance += 25; }

    for (let c in scores) {
        scores[c] = Math.min(100, Math.round((scores[c] / 125) * 100));
    }

    state.careerQuiz.calculated = true;
    state.careerQuiz.dimensionScores = scores;
    
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    state.careerQuiz.suggestedCareers = sorted;

    renderCareerQuizResult();
};

function renderCareerQuizResult() {
    const container = document.getElementById('career-quiz-container');
    if (!container) return;

    const scores = state.careerQuiz.dimensionScores;
    const suggested = state.careerQuiz.suggestedCareers;
    const topCareerName = getCareerFriendlyName(suggested[0][0]);

    container.innerHTML = `
        <div class="glass-card" style="padding: 2.5rem; max-width: 750px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                    <i class="fa-solid fa-chart-line" style="font-size: 2rem; color: #10b981;"></i>
                </div>
                <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--text-header);">Your Career Match Profile</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem;">Based on your orientation, interests, and drivers, your top match is:</p>
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-primary); margin: 1rem 0; padding: 0.5rem 1rem; background: var(--bg-tertiary); border-radius: var(--border-radius-sm); display: inline-block;">
                    ${topCareerName}
                </div>
            </div>

            <h4 style="font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; color: var(--text-header);">Score Breakdown Across Domains:</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2.5rem;">
                ${suggested.map(([careerKey, score]) => {
                    const friendlyName = getCareerFriendlyName(careerKey);
                    const barColor = getCareerBarColor(careerKey);
                    return `
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--text-primary);">
                                <span>${friendlyName}</span>
                                <span>${score}%</span>
                            </div>
                            <div style="width: 100%; height: 10px; background: var(--bg-tertiary); border-radius: 5px; overflow: hidden;">
                                <div style="width: ${score}%; height: 100%; background: ${barColor}; border-radius: 5px; transition: var(--transition-smooth);"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <div style="background: rgba(185, 28, 28, 0.04); border: 1px dashed var(--accent-primary); padding: 1.25rem; border-radius: var(--border-radius-sm); margin-bottom: 2rem;">
                <h4 style="color: var(--accent-primary); font-size: 1.05rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-lightbulb"></i> Counsel recommendation:</h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                    Your profile suggests high suitability for <strong>${topCareerName}</strong> roles. We recommend discussing these insights with a certified career counselor to build your college/internship strategic timeline.
                </p>
            </div>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="openLeadModal('Career Counselling')" style="flex: 1; min-width: 180px;"><i class="fa-solid fa-phone"></i> Schedule Advisory Briefing</button>
                <button class="btn btn-secondary" onclick="resetCareerQuiz()" style="flex: 1; min-width: 180px;"><i class="fa-solid fa-rotate-left"></i> Retake Assessment</button>
            </div>
        </div>
    `;
}

function getCareerFriendlyName(key) {
    const names = {
        consulting: "Strategic Management Consultant",
        engineering: "Software Engineer & Data Architect",
        finance: "Investment Banker & Treasurer",
        product: "Technical Product Manager & UX Lead"
    };
    return names[key] || key;
}

function getCareerBarColor(key) {
    const colors = {
        consulting: "var(--accent-primary)",
        engineering: "var(--accent-secondary)",
        finance: "var(--accent-magenta)",
        product: "var(--accent-primary)"
    };
    return colors[key] || "var(--accent-primary)";
}

window.resetCareerQuiz = function() {
    state.careerQuiz.answers = {};
    state.careerQuiz.calculated = false;
    state.careerQuiz.activeQuestionIndex = 0;
    state.careerQuiz.dimensionScores = null;
    state.careerQuiz.suggestedCareers = [];
    
    const container = document.getElementById('career-quiz-container');
    if (container) container.innerHTML = renderCareerQuizWidget();
};

window.changeGuidanceSelectorStream = function(stream) {
    const container = document.getElementById('specialization-results-container');
    if (!container) return;

    let html = "";
    if (stream === 'bba') {
        html = `
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
                <div class="glass-card" style="padding: 1.25rem; border-left: 4px solid var(--accent-primary);">
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem; color: var(--text-header);">Corporate FinTech & Operations</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.75rem; line-height: 1.5;">Noida and Bangalore clusters are experiencing an internship boom for undergraduates. Focus on active email communication and database analytics.</p>
                    <div style="font-size: 0.8rem; color: var(--text-muted);"><strong>Key Entrance:</strong> IPMAT, DU JAT | <strong>Placements:</strong> +25% Hiring Increase</div>
                </div>
                <div class="glass-card" style="padding: 1.25rem; border-left: 4px solid var(--accent-secondary);">
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem; color: var(--text-header);">Ad Advertising & Brand Management</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.75rem; line-height: 1.5;">Digital marketing operations, campaign design, and client servicing roles at premier marketing agencies.</p>
                    <div style="font-size: 0.8rem; color: var(--text-muted);"><strong>Key Entrance:</strong> NPAT, SET | <strong>Placements:</strong> Stable High Demand</div>
                </div>
            </div>
        `;
    } else if (stream === 'mba') {
        html = `
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
                <div class="glass-card" style="padding: 1.25rem; border-left: 4px solid var(--accent-primary);">
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem; color: var(--text-header);">Management Consulting & Technology Strategy</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.75rem; line-height: 1.5;">Consulting firms are prioritising candidates who have strategic framework mastery (SWOT, Porter's 5 Forces) and structured communications.</p>
                    <div style="font-size: 0.8rem; color: var(--text-muted);"><strong>Key Entrance:</strong> CAT, GMAT, GRE | <strong>Placements:</strong> Highest Initial Packages</div>
                </div>
                <div class="glass-card" style="padding: 1.25rem; border-left: 4px solid var(--accent-secondary);">
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem; color: var(--text-header);">Financial Advisory & Mergers & Acquisitions</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.75rem; line-height: 1.5;">Investment banking divisions are seeking specialists skilled in quantitative models, DCF valuation, and EBITDA analysis.</p>
                    <div style="font-size: 0.8rem; color: var(--text-muted);"><strong>Key Entrance:</strong> CAT, GMAT | <strong>Placements:</strong> Intense Competition, Premium Reward</div>
                </div>
            </div>
        `;
    } else {
        html = `
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
                <div class="glass-card" style="padding: 1.25rem; border-left: 4px solid var(--accent-primary);">
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem; color: var(--text-header);">Product Management & Prompt Engineering</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.75rem; line-height: 1.5;">Leading corporations are adding Generative AI and prompt engineering checkmarks to entrance criteria for tech managers.</p>
                    <div style="font-size: 0.8rem; color: var(--text-muted);"><strong>Required Skills:</strong> Agile, SQL, LLM Prompts | <strong>Placements:</strong> +35% Growth</div>
                </div>
                <div class="glass-card" style="padding: 1.25rem; border-left: 4px solid var(--accent-secondary);">
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem; color: var(--text-header);">Data Analytics with Business Intelligence</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.75rem; line-height: 1.5;">Database query formulation, visual dashboards, and analytics pipelines are high in demand for strategy divisions.</p>
                    <div style="font-size: 0.8rem; color: var(--text-muted);"><strong>Required Skills:</strong> Python, SQL, Tableau | <strong>Placements:</strong> Consistent Global Shortlist</div>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
};

function bindCareerGuidanceEvents() {
    const quizContainer = document.getElementById('career-quiz-container');
    if (quizContainer) {
        if (state.careerQuiz.calculated) {
            renderCareerQuizResult();
        } else {
            quizContainer.innerHTML = renderCareerQuizWidget();
        }
    }
    
    changeGuidanceSelectorStream('bba');
}

// Theme Toggle Logic
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    
    toggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        toggleBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });
}
// Hero Carousel Slider Logic
function startHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Clear any existing intervals to prevent acceleration
    if (window.heroSliderInterval) {
        clearInterval(window.heroSliderInterval);
    }
    
    window.heroSliderInterval = setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 3000);
}

if (typeof window !== 'undefined' && typeof window.addEventListener === 'function' && typeof document !== 'undefined') {
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('DOMContentLoaded', () => {
        initBurgerMenu();
        handleRoute();
        initTheme();
    });
}

// CommonJS export for static site generation (SSG / SSR build script)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        routes,
        coursesData,
        jobsData,
        vocabWords,
        newsData,
        mockExamQuestions,
        vocabQuizQuestions,
        interviewTree,
        resourcesData,
        state,
        renderCourseCatalog
    };
}
