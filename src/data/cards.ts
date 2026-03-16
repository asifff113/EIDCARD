export interface EidCard {
  id: number;
  title: string;
  ar: string;
  verse: string;
  tag: string;
  grad: string;
  accent: string;
  glow: string;
  type: string;
  emoji: string;
  desc: string;
}

export const CARDS: EidCard[] = [
  // MOSQUE
  {id:1,title:"Golden Mosque",ar:"المسجد الذهبي",verse:"Peace on this blessed day",
   tag:"Sacred",grad:"linear-gradient(145deg,#0e0c20,#1a1030,#281800)",accent:"#d4af37",glow:"rgba(212,175,55,.55)",type:"mosque1",emoji:"🕌",
   desc:"The golden minarets rise at dawn — the call to prayer echoing as Eid morning unfolds."},
  {id:2,title:"Emerald Sanctuary",ar:"الحرم الأخضر",verse:"A house of peace",
   tag:"Sacred",grad:"linear-gradient(145deg,#001810,#003020,#001008)",accent:"#2ecc71",glow:"rgba(46,204,113,.45)",type:"mosque2",emoji:"🕌",
   desc:"Twin emerald domes rising serenely under the crescent moon — a sanctuary of peace."},
  {id:3,title:"Cobalt Shrine",ar:"المقام الأزرق",verse:"Rise in gratitude",
   tag:"Sacred",grad:"linear-gradient(145deg,#000e22,#001840,#00060e)",accent:"#60b4ff",glow:"rgba(96,180,255,.45)",type:"mosque1",emoji:"🕌",
   desc:"The cobalt shrine at moonrise — minarets piercing the velvet night sky."},
  // LANTERNS
  {id:4,title:"Ramadan Lantern",ar:"فانوس رمضان",verse:"Light upon light",
   tag:"Festive",grad:"linear-gradient(145deg,#0e0800,#281400,#0a0400)",accent:"#ff9f43",glow:"rgba(255,159,67,.5)",type:"lantern",emoji:"🏮",
   desc:"The iconic Ramadan lantern — its warm glow carrying the joy of Eid into every home."},
  {id:5,title:"Amethyst Lantern",ar:"الفانوس البنفسجي",verse:"Illuminate your path",
   tag:"Festive",grad:"linear-gradient(145deg,#0c0820,#180f38,#0a0618)",accent:"#a78bfa",glow:"rgba(167,139,250,.45)",type:"lantern",emoji:"🏮",
   desc:"A lantern of deep amethyst — casting violet light through the holy night."},
  {id:6,title:"Rose Lantern",ar:"فانوس الورد",verse:"Warm as Eid itself",
   tag:"Festive",grad:"linear-gradient(145deg,#180006,#2e0010,#0c0004)",accent:"#f472b6",glow:"rgba(244,114,182,.45)",type:"lantern",emoji:"🏮",
   desc:"Rose-pink lantern light dancing across smiling faces on the night of Eid."},
  // MANDALAS
  {id:7,title:"Sacred Mandala",ar:"المندالا المقدسة",verse:"In perfect harmony",
   tag:"Spiritual",grad:"linear-gradient(145deg,#0c0820,#180f38,#0a0618)",accent:"#a855f7",glow:"rgba(168,85,247,.45)",type:"mandala",emoji:"✨",
   desc:"Infinite geometry — each line a prayer, each circle a breath of gratitude."},
  {id:8,title:"Golden Mandala",ar:"المندالا الذهبية",verse:"Infinite blessings",
   tag:"Spiritual",grad:"linear-gradient(145deg,#100c00,#201800,#080600)",accent:"#ffd32a",glow:"rgba(255,211,42,.5)",type:"mandala",emoji:"✨",
   desc:"Gold woven into infinite geometric patterns — the art of Islamic tessellation."},
  {id:9,title:"Teal Mandala",ar:"المندالا الفيروزية",verse:"Harmony in every petal",
   tag:"Spiritual",grad:"linear-gradient(145deg,#001416,#002c30,#000a0c)",accent:"#2dd4bf",glow:"rgba(45,212,191,.42)",type:"mandala",emoji:"✨",
   desc:"Turquoise and teal spiraling inward — a mandala as calm as deep ocean."},
  // CALLIGRAPHY
  {id:10,title:"Bismillah",ar:"بسم الله الرحمن الرحيم",verse:"In the name of Allah",
   tag:"Calligraphy",grad:"linear-gradient(145deg,#080010,#120018,#040008)",accent:"#e8c070",glow:"rgba(232,192,112,.45)",type:"calli1",emoji:"✍️",
   desc:"The most beautiful phrase — Bismillah — flowing in gold calligraphy."},
  {id:11,title:"Taqabbal Allahu",ar:"تقبل الله منا ومنكم",verse:"May Allah accept from us",
   tag:"Calligraphy",grad:"linear-gradient(145deg,#001012,#002020,#000810)",accent:"#26d0ce",glow:"rgba(38,208,206,.45)",type:"calli2",emoji:"✍️",
   desc:"The traditional Eid greeting — may Allah accept from us and from you."},
  {id:12,title:"Subhanallah",ar:"سبحان الله وبحمده",verse:"Glory be to Allah",
   tag:"Calligraphy",grad:"linear-gradient(145deg,#0e0400,#1e0c00,#080200)",accent:"#fb923c",glow:"rgba(251,146,60,.45)",type:"calli1",emoji:"✍️",
   desc:"Glory and praise to Allah — rendered in flowing orange calligraphy."},
  // STAR & CRESCENT
  {id:13,title:"Star & Crescent",ar:"النجم والهلال",verse:"Guide me to your light",
   tag:"Classic",grad:"linear-gradient(145deg,#04060e,#080e20,#020408)",accent:"#e8e0ff",glow:"rgba(232,224,255,.35)",type:"star",emoji:"☪️",
   desc:"The eternal symbols of faith — crescent and star against the infinite night."},
  {id:14,title:"Ruby Crescent",ar:"الهلال الياقوتي",verse:"A blessed celebration",
   tag:"Classic",grad:"linear-gradient(145deg,#180004,#300008,#0c0002)",accent:"#ff4560",glow:"rgba(255,69,96,.45)",type:"star",emoji:"☪️",
   desc:"The crescent in ruby red — passionate and vibrant as Eid itself."},
  {id:15,title:"Jade Crescent",ar:"هلال اليشم",verse:"Serenity and peace",
   tag:"Classic",grad:"linear-gradient(145deg,#001a10,#003820,#000c08)",accent:"#34d399",glow:"rgba(52,211,153,.42)",type:"star",emoji:"☪️",
   desc:"Jade green — the crescent moon as serene as a garden in paradise."},
  // COSMIC
  {id:16,title:"Cosmic Eid",ar:"عيد الكون",verse:"Written in the stars",
   tag:"Celestial",grad:"linear-gradient(145deg,#02040c,#04081c,#020408)",accent:"#7ec8ff",glow:"rgba(126,200,255,.4)",type:"cosmic",emoji:"🌌",
   desc:"The cosmos itself celebrates — galaxies spiral around the holy night."},
  {id:17,title:"Nebula Blessing",ar:"سديم البركة",verse:"From the heavens above",
   tag:"Celestial",grad:"linear-gradient(145deg,#080018,#100028,#040010)",accent:"#d080ff",glow:"rgba(208,128,255,.45)",type:"cosmic",emoji:"🌌",
   desc:"A nebula of purple and violet — the universe painted in colours of prayer."},
  {id:18,title:"Aurora Night",ar:"ليلة الشفق",verse:"Colours of the sacred sky",
   tag:"Celestial",grad:"linear-gradient(145deg,#000818,#001530,#000410)",accent:"#22d3ee",glow:"rgba(34,211,238,.4)",type:"aurora",emoji:"🌌",
   desc:"Northern lights shimmer above as families rise for the Eid prayer."},
  // HOLY
  {id:19,title:"Kaaba Night",ar:"الكعبة المشرفة",verse:"Heart of the world",
   tag:"Holy",grad:"linear-gradient(145deg,#060608,#0c0c10,#040406)",accent:"#d4a030",glow:"rgba(212,160,48,.5)",type:"kaaba",emoji:"🕋",
   desc:"The Kaaba — black draped in golden calligraphy — the spiritual centre of 1.8 billion hearts."},
  {id:20,title:"Prayer Beads",ar:"السبحة",verse:"Subhanallah · Alhamdulillah",
   tag:"Spiritual",grad:"linear-gradient(145deg,#100800,#201000,#080400)",accent:"#e8a060",glow:"rgba(232,160,96,.45)",type:"tasbih",emoji:"📿",
   desc:"Ninety-nine amber beads — each one a name of Allah, each one a blessing."},
  {id:21,title:"Dua Scroll",ar:"دعاء العيد",verse:"Ya Allah accept our prayers",
   tag:"Holy",grad:"linear-gradient(145deg,#06040e,#0e0818,#040208)",accent:"#c084fc",glow:"rgba(192,132,252,.42)",type:"dua",emoji:"🤲",
   desc:"Hands raised in dua on the morning of Eid — every prayer heard, every tear seen."},
  // NATURE & DREAMY
  {id:22,title:"Date Palm",ar:"نخلة التمر",verse:"Sweet as Eid itself",
   tag:"Nature",grad:"linear-gradient(145deg,#0c1000,#181e00,#080a00)",accent:"#86efac",glow:"rgba(134,239,172,.4)",type:"palm",emoji:"🌴",
   desc:"Beneath the shade of the date palm, families gather on the sweetest of mornings."},
  {id:23,title:"Rose Rain",ar:"مطر الورد",verse:"Mercy falls like petals",
   tag:"Dreamy",grad:"linear-gradient(145deg,#1a0010,#2e0020,#100008)",accent:"#f472b6",glow:"rgba(244,114,182,.45)",type:"rain",emoji:"🌸",
   desc:"Rose petals raining from the sky — each one a mercy, each one a blessing."},
  {id:24,title:"Onyx & Gold",ar:"العقيق والذهب",verse:"Simply blessed",
   tag:"Minimal",grad:"linear-gradient(145deg,#060606,#0e0e0e,#040404)",accent:"#d4af37",glow:"rgba(212,175,55,.45)",type:"minimal",emoji:"⭐",
   desc:"Maximum restraint, maximum impact. Pure black and pure gold — nothing more needed."},
  // GEOMETRIC
  {id:25,title:"Arabesque Window",ar:"النافذة العربية",verse:"Beauty in every pattern",
   tag:"Geometric",grad:"linear-gradient(145deg,#08060e,#100c1e,#060408)",accent:"#e8c070",glow:"rgba(232,192,112,.45)",type:"arabesque",emoji:"🔷",
   desc:"Inspired by centuries of Islamic architecture — arched windows framing infinite geometry."},
  {id:26,title:"Zellige Blue",ar:"الزليج الأزرق",verse:"Pattern without end",
   tag:"Geometric",grad:"linear-gradient(145deg,#040c16,#081828,#020810)",accent:"#60b4ff",glow:"rgba(96,180,255,.42)",type:"zellige",emoji:"🔷",
   desc:"Moroccan zellige tilework — intricate interlocking patterns adorning holy spaces."},
  {id:27,title:"Desert Bloom",ar:"زهر الصحراء",verse:"Life blooms from the sand",
   tag:"Nature",grad:"linear-gradient(145deg,#180a00,#301400,#0c0600)",accent:"#fbbf24",glow:"rgba(251,191,36,.45)",type:"bloom",emoji:"🌺",
   desc:"The desert bloom — a flower rising from golden sand on the blessed morning."},
  {id:28,title:"Silver Moonline",ar:"خط القمر الفضي",verse:"Less is sacred",
   tag:"Minimal",grad:"linear-gradient(145deg,#04040e,#08081a,#020208)",accent:"#9090c0",glow:"rgba(144,144,192,.35)",type:"moonline",emoji:"🌙",
   desc:"A single graceful arc — the crescent reduced to its purest, most elegant form."},
  {id:29,title:"Golden Rain",ar:"المطر الذهبي",verse:"Blessings pour from above",
   tag:"Dreamy",grad:"linear-gradient(145deg,#0e0800,#1e1000,#060400)",accent:"#fcd34d",glow:"rgba(252,211,77,.45)",type:"rain2",emoji:"✨",
   desc:"Golden streaks descending like rain — each drop a blessing from the heavens."},
  {id:30,title:"Emerald Star",ar:"النجم الزمردي",verse:"A guiding light",
   tag:"Classic",grad:"linear-gradient(145deg,#001208,#002816,#000a06)",accent:"#10b981",glow:"rgba(16,185,129,.42)",type:"star",emoji:"☪️",
   desc:"The emerald star — a beacon of hope and faith shining through the blessed night."},
];

export const TAGS = ["All", ...Array.from(new Set(CARDS.map((c) => c.tag)))];
