// All site content lives here. Edit text in this file and rebuild.

export const CONTACT = {
  email: 'madan@papersipcompany.com',
  phone: '+91 99587 97259',
  tel: '+919958797259',
  wa: '919958797259',
  address: 'A-2617, Green Field, Faridabad, Haryana — 121003',
  addressShort: 'A-2617, Green Field, Faridabad',
  hours: 'Monday – Saturday, 9:30am – 6:30pm',
};

const UP = 'https://papersipcompany.com/wp-content/uploads/';
export const img24 = (f) => UP + '2024/06/' + f;

export const PROCESS = [
  ['Discovery', 'We confirm your audience for this channel and set a realistic budget range.'],
  ['Build & launch', "Creative is built to the channel's format and placements go live on schedule."],
  ['Track & refine', 'We report results weekly and adjust placements toward what performs.'],
];

export const SERVICES = [
  {
    k: 'tv', slug: 'tv-advertising', name: 'TV Advertising', short: 'TV', acc: 'y', h1: ['TV', 'Advertising'],
    line: 'TV commercials built to earn trust, not just attention.',
    intro: 'TV commercials built to earn trust, not just attention — because people do business with brands they believe.',
    h2: "If people like you, they'll listen — if they trust you, they'll do business with you.",
    body: ['A TV commercial should be good enough to make the viewer feel they can trust your brand. We plan and produce spots built to earn that trust, not just fill airtime.'],
    feats: [['reach', 'National & regional reach', 'Air across the networks that fit your audience.'], ['shield', 'Trust-first creative', 'Built to make viewers believe in the brand, not just notice it.'], ['camera', 'Full production', 'Scripts, shoots, and edits handled end to end.'], ['repeat', 'Frequency planning', 'Capped spend, controlled repetition.']],
    rel: ['radio', 'print', 'ooh', 'digital'], work: 'tv',
  },
  {
    k: 'radio', slug: 'radio-advertising', name: 'Radio Advertising', short: 'Radio', acc: 'c', h1: ['Radio', 'Advertising'],
    line: 'Audio that stays in memory long after visuals fade.',
    intro: 'Audio that stays in memory long after visuals fade, with the emotional pull only sound can carry.',
    h2: 'Audio remains in the memory much longer than visuals.',
    body: ['Sound has the power to evoke emotions, which further reinforces memory. We buy FM and digital audio inventory timed to when your audience is actually listening.'],
    feats: [['clock', 'Drive-time slots', 'Booked around commute patterns.'], ['wave', 'FM + digital audio', 'Traditional radio and streaming inventory.'], ['bolt', 'Fast turnaround', 'Spots recorded and live within days.'], ['pen', 'Emotional creative', 'Written for sound, not repurposed from print.']],
    rel: ['tv', 'print', 'ooh', 'digital'], work: 'radio',
  },
  {
    k: 'print', slug: 'print-advertising', name: 'Print Advertising', short: 'Print', acc: 'm', h1: ['Print', 'Advertising'],
    line: 'A written confirmation to your consumer.',
    intro: 'A written confirmation to your consumer — still one of the best ways to earn trust with impactful creativity.',
    h2: 'Print gives your brand a written confirmation to consumers.',
    body: ["It's one of the best ways to earn consumer trust with impactful creativity.", 'We place and design ads that hold up on the page, in newspapers and magazines your audience already reads.'],
    feats: [['news', 'Newspaper placement', 'Daily and weekend editions.'], ['book', 'Magazine features', 'Category and lifestyle titles.'], ['layout', 'Design included', 'Ads built for print, not resized from digital.'], ['pin', 'Regional editions', 'Target by city or language edition.']],
    rel: ['tv', 'radio', 'ooh', 'digital'], work: 'print',
  },
  {
    k: 'ooh', slug: 'ooh-advertising', name: 'OOH Advertising', short: 'OOH', acc: 'v', h1: ['OOH', 'Advertising'],
    line: 'Total market coverage in a short span of time.',
    intro: 'Total market coverage in a short span of time, hitting commuters and passersby multiple times a day.',
    h2: 'OOH gives you total market coverage in a short span of time.',
    body: ['A single advertisement on a bus or metro train for a four-week period makes sure your brand is seen in every corner of the route. OOH hits consumers multiple times throughout the day.'],
    feats: [['people', 'High-traffic sites', 'Selected by footfall and drive-by volume.'], ['board', 'Billboards & hoardings', 'Standard and digital formats.'], ['bus', 'Transit coverage', 'Buses, metro trains, and commuter routes.'], ['tools', 'Production included', 'Print, mount, and maintain.']],
    rel: ['tv', 'radio', 'print', 'digital'], work: 'ooh', faq: true,
  },
  {
    k: 'digital', slug: 'digital-advertising', name: 'Digital Advertising', short: 'Digital', acc: 'c', h1: ['Digital', 'Advertising'],
    line: 'Research-led targeting that reaches prospects who buy.',
    intro: 'Research-led targeting that identifies your buyer personas and refines strategy to reach prospects who buy.',
    h2: 'Precision targeting, built on research.',
    body: ['Digital marketing helps conduct the research necessary to identify your buyer personas and refine your strategy, so you’re reaching the prospects most likely to buy.'],
    feats: [['search', 'Search & social', 'Google, Meta, and programmatic display.'], ['persona', 'Buyer persona research', 'Targeting built on who’s actually likely to buy.'], ['sliders', 'Always-on optimization', 'Budgets shift toward what converts.'], ['report', 'Clear reporting', 'Straightforward performance dashboards.']],
    rel: ['tv', 'radio', 'print', 'ooh'], work: null,
  },
  {
    k: 'signage', slug: 'visibility-signage', name: 'Visibility Signage', short: 'Signage', acc: 'y', h1: ['Visibility', 'Signage'],
    line: 'Wayfinding systems, retail signage, and murals.',
    intro: 'Wayfinding systems, retail signage, and wall art/murals that put your brand in physical space.',
    h2: 'Your brand, built into the physical space people move through.',
    body: ["Wayfinding systems, retail signage, and wall art or murals put your brand where people already are — not just where they're looking for ads."],
    feats: [['signpost', 'Wayfinding systems', 'Signage that guides and brands at once.'], ['store', 'Retail solutions', 'In-store and storefront signage.'], ['brush', 'Wall art & murals', 'Large-format brand presence.'], ['eye', 'Site surveys', 'Checked for visibility before install.']],
    rel: ['tv', 'radio', 'print', 'ooh'], work: 'signage',
  },
  {
    k: 'plan', slug: 'media-buying-planning', name: 'Media Buying & Planning', short: 'Media planning', acc: 'm', h1: ['Media buying', '& planning'],
    line: 'A media plan and campaign proposal, adjusted as feedback comes in.',
    intro: 'Identifying the target market and building a media plan and campaign proposal around it — then adjusting as feedback comes in.',
    h2: 'A plan built around your target market, not a channel list.',
    body: ['We identify the target market, build a marketing plan around your product or service, and propose a campaign to reach it — then track customer feedback and adjust the strategy as needed.'],
    feats: [['target', 'Target market ID', 'Defined before any channel is chosen.'], ['doc', 'Campaign proposal', 'A plan built around your product or service.'], ['people', 'Feedback tracking', 'Customer response monitored throughout.'], ['loop', 'Ongoing adjustment', 'Strategy refined as results come in.']],
    rel: ['tv', 'radio', 'print', 'ooh'], work: null,
  },
  {
    k: 'strat', slug: 'strategy', name: 'Strategy', short: 'Strategy', acc: 'v', h1: ['Strategy'],
    line: 'Targeting the markets most likely to buy.',
    intro: 'Identifying and targeting the markets most likely to buy, then building the creative and media mix to reach them.',
    h2: 'Identify who’s most likely to buy, then build toward them.',
    body: ['We identify and target the markets most likely to buy your product or service, then develop creative and effective marketing plans to reach them.'],
    feats: [['target', 'Market targeting', 'Focused on who’s most likely to convert.'], ['pen', 'Creative development', 'Built to match the strategy, not the other way round.'], ['mix', 'Traditional + non-traditional', 'A mix suited to your audience.'], ['report', 'Effective planning', 'Plans built to reach real markets, not vanity metrics.']],
    rel: ['tv', 'radio', 'print', 'ooh'], work: null,
  },
];
SERVICES.forEach((s, i) => { s.i = i; });
export const BYK = Object.fromEntries(SERVICES.map((s) => [s.k, s]));
export const BYSLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

export const FAQ = [
  ['How does outdoor advertising work?', 'Outdoor advertising involves placing ads in high-traffic public areas to maximize visibility and reach a wide audience. It includes both static and digital formats.'],
  ['What are the benefits of outdoor advertising?', 'Outdoor advertising offers high visibility, reaches a broad audience, creates brand awareness, and provides constant exposure as it is always on display.'],
  ['How long should my outdoor ad campaign run?', 'The duration of an outdoor ad campaign depends on your specific goals and budget. Campaigns typically run from a few weeks to several months.'],
  ['Do you handle creative production too?', 'Yes — as a 360° solution provider, we handle creative production across TV, print, radio, and more, all under one roof.'],
];

export const OOH_IMG = ['ooh-1-1.png', 'ooh-2-1.png', 'ooh-3.png', 'ooh-4.png', 'ooh-10.png', 'ooh-9.png', 'ooh-8.png', 'ooh-6.png', 'ooh-5-1.png', 'ooh-12.png', 'ooh-13.png', 'ooh-17.jpg', 'ooh-18.jpeg', 'ooh-19-1.jpeg', 'ooh-20.jpeg', 'ooh-21-1.jpeg'].map(img24);
export const SIGN_IMG = ['marks.png', 'merdien-1.png', 'pepsi-1.jpg', 'radisson.png', 'sign3.png', 'sign9.jpeg', 'sign8.png', 'sign8.jpeg', 'sign7.png', 'sign4.png', 'sign10.jpeg', 'sign11.jpeg', 'sign12-1.jpeg', 'sign13-1.jpg', 'tanishq.png', 'uspolo.png'].map(img24);
export const PRINT_IMG = ['print-1.jpeg', 'print-2.jpeg', 'print-3.png', '9-2.jpg', '8-2.jpg', '7-2.jpg', '6-2.jpg', '5-2.jpg', 'vendor-15-1.jpg', '1-2.jpg', '2-2.jpg', '3-2.jpg', '4-2.jpg', 'vendor-14-1.jpg', 'vendor-13-1.png', 'vendor-12-1.png', 'vendor-11-1.png', 'vendor-10-1.jpg', 'vendor-6-1.jpg', 'vendor-6-1.png', 'vendor-7-1.jpg', 'vendor-8-1.jpg', 'vendor-9-1.jpg', 'vendor-5-1.jpg', 'vendor-4-1.jpg', 'vendor-3-1.jpg', 'vendor-2-1.jpg', 'vendor-1-1.png'].map(img24);
export const TV_VID = [
  'https://cariotauto.in/demo/wp-content/uploads/2024/06/TV-Campaign-1.mp4',
  'https://cariotauto.in/demo/wp-content/uploads/2024/06/TV-Campaign-2.mp4',
  'https://cariotauto.in/demo/wp-content/uploads/2024/06/TV-Campaign-4.mp4',
];
export const RADIO = ['1857304761', '1857304737', '1857304716', '1857304689', '1857304674', '1857304635', '1857304593', '1857304560'];
export const WORK_IMAGES = { ooh: OOH_IMG, print: PRINT_IMG, signage: SIGN_IMG };

export const CLIENT_LOGOS = [
  ['91wheels', '2026/09/91wheels-logo-primary-300x86.png'], ['Amrita Hospital', '2026/09/amrita-hospital-client-logo.svg'],
  ['Auto Expo 2014', '2026/09/client-auto-expo-2014.png'], ['AVS Infra', '2026/09/client-avs-infra.png'], ['Billu', '2026/09/client-billu.png'],
  ['BGRE', '2026/09/BGRELogo-300x83.jpg'], ['Canwinn', '2026/09/canwinn-client-logo.svg'], ['Centre for Sight', '2026/09/Centre_for_Sight_Logo.png'],
  ['Chandigarh University', '2026/09/Chandigarh_University_Seal-189x300.png'], ['Delta', '2026/09/client-delta-300x175.png'], ['DLF', '2026/09/DLF.NS_BIG-9ecd4c66-300x105.png'],
  ['E1 Trucks', '2026/09/client-e1trucks-300x113.png'], ['Emaar India', '2026/09/emaar-india-client-logo.svg'], ['Grand Arch', '2026/09/client-grand-arch-300x125.png'],
  ['IID', '2026/09/client-iid-300x130.png'], ['Ireo', '2026/09/client-ireo.png'], ['JIMS Noida', '2026/09/client-jims-noida-300x136.png'], ['L26T', '2026/09/L26T-300x300.png'],
  ['M3M', '2026/09/m3m-logo.png'], ['Manipal Hospitals', '2026/09/Manipal_Hospitals-300x59.webp'], ['Moov', '2026/09/moov-logo.jpg'], ['Navraj', '2026/09/client-navraj-300x69.png'],
  ['Nextra Developers', '2026/09/client-nextra-developers.png'], ['Nike', '2026/09/NKE-0c8add60-300x108.png'], ['PC Jeweller', '2026/09/PC_Jeweller_logo.jpg'],
  ['Samadhan', '2026/09/client-samadhan.png'], ['Silver Stone Realty', '2026/09/client-silver-stone-realty-300x99.png'],
].map(([n, p]) => [n, UP + p]);
export const CLIENTS = CLIENT_LOGOS.map((c) => c[0]);

// Channel photos shown on the "Advertising streams" cards (from the current papersipcompany.com media library)
export const STREAM_IMG = {
  tv: import.meta.env.BASE_URL + 'streams/tv.webp',
  radio: UP + '2026/09/Radio-Pillar-image.jpg',
  print: UP + '2026/09/Print-Pillar-image.jpg',
  ooh: UP + '2026/09/OOH-Pillar-image.jpg',
};

export const TICKER = ['TV', 'Radio', 'Print', 'Out-of-home', 'Digital', 'Signage', 'Media planning', 'Strategy'];

export const ROUTES = ['/', '/about/', '/services/', ...SERVICES.map((s) => `/services/${s.slug}/`), '/clients/', '/our-work/', '/contact/'];

// "Our media partners" logo rows on the home page.
// src: a local file in public/partners, or a Wikimedia file (loaded from Wikimedia).
// Any logo that fails to load shows as a name tile instead. dark: logo is designed for a dark background.
const WM = (f, w = 320) => `https://commons.wikimedia.org/wiki/Special:FilePath/${f}?width=${w}`;
const WP = (f, w = 320) => `https://en.wikipedia.org/wiki/Special:FilePath/${f}?width=${w}`;
const LOCAL = (f) => import.meta.env.BASE_URL + 'partners/' + f;
export const MEDIA_PARTNERS = {
  radio: [
    { name: 'Radio Mirchi', src: WM('Mirchi_logo_-_Copy.png') },
    { name: 'Big FM', src: WM('BIGFM_NEW_LOGO_2019.png') },
    { name: 'Fever FM', src: WP('Fever-104-FM-Logo.png') },
    { name: 'Radio City', src: null },
    { name: 'Red FM', src: WM('RedFM_logo.svg') },
  ],
  tv: [
    { name: 'Aaj Tak', src: LOCAL('aajtak.webp') },
    { name: 'TV9', src: LOCAL('tv9.webp') },
    { name: 'India TV', src: LOCAL('indiatv.webp'), dark: true },
    { name: 'Zee News', src: LOCAL('zeenews.webp') },
    { name: 'Network18', src: WM('Network_18_Logo.svg') },
    { name: 'Hotstar', src: WM('Hotstar_logo.svg') },
    { name: 'ZEE5', src: WM('ZEE5_2025.svg') },
    { name: 'SonyLIV', src: WM('SonyLIV_2020.png') },
  ],
};
