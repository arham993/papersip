// All site content lives here. Edit text in this file and rebuild.

export const CONTACT = {
  email: 'madan@papersipcompany.com',
  phone: '+91 99587 97259',
  tel: '+919958797259',
  wa: '919958797259',
  address: 'A-2617, Green Field, Faridabad, Haryana 121003',
  addressShort: 'A-2617, Green Field, Faridabad',
  hours: 'Mon – Sat, 9:30am – 6:30pm',
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
    intro: 'People do business with brands they believe in. We plan and produce TV spots that earn that trust, then place them where your buyers are watching.',
    h2: "If people like you, they'll listen. If they trust you, they'll do business with you.",
    body: ['A good TV spot should leave viewers trusting the brand. We plan and produce commercials to earn that trust, not just to fill airtime.', 'Sight, sound and motion in the living room, on networks chosen for your audience and repeated often enough to stick.'],
    feats: [['reach', 'National & regional reach', 'Airing on networks that match your target audience.'], ['shield', 'Trust-first creative', 'Ads designed to make viewers believe in the brand.'], ['camera', 'Full production', 'Scripts, filming and editing handled end to end.'], ['repeat', 'Frequency planning', 'Controlled repetition with capped spend.']],
    rel: ['radio', 'print', 'ooh', 'digital'], work: 'tv',
  },
  {
    k: 'radio', slug: 'radio-advertising', name: 'Radio Advertising', short: 'Radio', acc: 'c', h1: ['Radio', 'Advertising'],
    line: 'Audio that stays in memory long after visuals fade.',
    intro: 'Audio that stays in memory long after visuals fade, with the emotional pull only sound can carry.',
    h2: 'Audio remains in the memory much longer than visuals.',
    body: ['Sound evokes emotion, and emotion reinforces memory. One voice talking to one listener, often on the drive home.', 'We buy FM and digital audio inventory scheduled for the hours your audience is actually listening.'],
    feats: [['clock', 'Drive-time slots', 'Booked around commute patterns.'], ['wave', 'FM + digital audio', 'Traditional radio and streaming inventory.'], ['bolt', 'Fast turnaround', 'Spots recorded and live within days.'], ['pen', 'Emotional creative', 'Written for sound, not repurposed from print.']],
    rel: ['tv', 'print', 'ooh', 'digital'], work: 'radio',
  },
  {
    k: 'print', slug: 'print-advertising', name: 'Print Advertising', short: 'Print', acc: 'm', h1: ['Print', 'Advertising'],
    line: 'A written confirmation to your consumer.',
    intro: 'A written confirmation to your consumer, and still one of the best ways to earn trust with impactful creativity.',
    h2: 'Print gives your brand a written confirmation to consumers.',
    body: ["It's one of the best ways to earn consumer trust with impactful creativity. Something people can hold, read twice and keep on the table.", 'We place and design ads that hold up on the page, in the newspapers and magazines your audience already reads.'],
    feats: [['news', 'Newspaper placement', 'Daily and weekend editions.'], ['book', 'Magazine features', 'Category and lifestyle titles.'], ['layout', 'Design included', 'Ads built for print, not resized from digital.'], ['pin', 'Regional editions', 'Target by city or language edition.']],
    rel: ['tv', 'radio', 'ooh', 'digital'], work: 'print',
  },
  {
    k: 'ooh', slug: 'ooh-advertising', name: 'OOH Advertising', short: 'OOH', acc: 'v', h1: ['OOH', 'Advertising'],
    line: 'Total market coverage in a short span of time.',
    intro: 'Total market coverage in a short span of time, hitting commuters and passersby multiple times a day.',
    h2: 'Your brand on the whole route, seen many times a day.',
    body: ['Out-of-home covers a market fast. A four-week run on a bus or metro train reaches the same commuters several times a day.', 'We choose sites by pedestrian and vehicle volume, then take care of printing, mounting and ongoing maintenance.'],
    feats: [['board', 'Billboards & hoardings', 'Standard and digital formats.'], ['bus', 'Transit advertising', 'Buses and metro trains.'], ['people', 'High-traffic sites', 'Chosen by footfall and vehicle volume.'], ['tools', 'Production support', 'Printing, mounting and ongoing maintenance.']],
    rel: ['tv', 'radio', 'print', 'digital'], work: 'ooh', faq: true,
  },
  {
    k: 'digital', slug: 'digital-advertising', name: 'Digital Advertising', short: 'Digital', acc: 'c', h1: ['Digital', 'Advertising'],
    line: 'Research-led targeting that reaches prospects who buy.',
    intro: 'Research-led targeting that identifies buyer personas and refines the strategy to reach the prospects most likely to buy.',
    h2: 'Precision targeting, built on research.',
    body: ['Digital lets us study who your buyers are and sharpen the plan as the data comes in.', 'Budgets move toward the ads and audiences that convert, and you see it all in plain reporting.'],
    feats: [['search', 'Search & social', 'Google, Meta and programmatic display.'], ['persona', 'Buyer persona research', 'Targeting built on who is likely to buy.'], ['sliders', 'Always-on optimisation', 'Budgets shift toward what converts.'], ['report', 'Clear reporting', 'Straightforward performance dashboards.']],
    rel: ['tv', 'radio', 'print', 'ooh'], work: null,
  },
  {
    k: 'signage', slug: 'visibility-signage', name: 'Visibility Signage', short: 'Signage', acc: 'y', h1: ['Visibility', 'Signage'],
    line: 'Wayfinding systems, retail signage, and murals.',
    intro: 'Wayfinding systems, retail signage, and wall art and murals that build your brand into the places people move through.',
    h2: 'Your brand, built into the physical space people move through.',
    body: ['Signage puts your brand where people already are, not only where they look for ads.', 'From a full wayfinding system to a single storefront or a wall-sized mural, we survey the site, design, produce and install.'],
    feats: [['signpost', 'Wayfinding systems', 'Signage that guides people and promotes the brand.'], ['store', 'Retail solutions', 'In-store and storefront signage.'], ['brush', 'Wall art & murals', 'Large-format brand presence.'], ['eye', 'Site surveys', 'Visibility checked before installation.']],
    rel: ['ooh', 'print', 'tv', 'radio'], work: 'signage',
  },
  {
    k: 'plan', slug: 'media-buying-planning', name: 'Media Buying & Planning', short: 'Media planning', acc: 'm', h1: ['Media buying', '& planning'],
    line: 'A media plan and campaign proposal, adjusted as feedback comes in.',
    intro: 'We identify the target market and build a media plan and campaign proposal around it, then adjust as feedback comes in.',
    h2: 'A plan built around your target market, not a channel list.',
    body: ['We identify the target market, build a marketing plan around your product or service and propose a campaign to reach it.', 'Then we track customer feedback and adjust the strategy as needed, so the budget keeps working.'],
    feats: [['target', 'Target market ID', 'Defined before any channel is chosen.'], ['doc', 'Campaign proposal', 'A plan built around your product or service.'], ['people', 'Feedback tracking', 'Customer response monitored throughout.'], ['loop', 'Ongoing adjustment', 'Strategy refined as results come in.']],
    rel: ['strat', 'digital', 'ooh', 'tv'], work: null,
  },
  {
    k: 'strat', slug: 'strategy', name: 'Strategy', short: 'Strategy', acc: 'v', h1: ['Strategy'],
    line: 'Targeting the markets most likely to buy.',
    intro: 'Identify and target the markets most likely to buy, then build the creative and media mix to reach them.',
    h2: "Identify who's most likely to buy, then build toward them.",
    body: ['We identify and target the markets most likely to buy your product or service, then develop the creative and marketing plans to reach them.', 'The mix is usually traditional and non-traditional media together, chosen for the audience rather than habit.'],
    feats: [['target', 'Market targeting', 'Focused on who is most likely to convert.'], ['pen', 'Creative development', 'Creative built to match the strategy.'], ['mix', 'Traditional + non-traditional', 'A media mix suited to the audience.'], ['report', 'Effective planning', 'Plans aimed at real markets, not vanity metrics.']],
    rel: ['plan', 'digital', 'tv', 'ooh'], work: null,
  },
];
SERVICES.forEach((s, i) => { s.i = i; });
export const BYK = Object.fromEntries(SERVICES.map((s) => [s.k, s]));
export const BYSLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

export const FAQ = [
  ['How does outdoor advertising work?', 'Your ad is placed in busy public areas such as roadsides, transit and high-footfall sites, in static or digital formats, so it is seen by everyone passing through.'],
  ['What are the benefits of outdoor advertising?', 'High visibility, broad audience reach, stronger brand awareness and constant exposure, day and night, for as long as the campaign runs.'],
  ['How long should my outdoor ad campaign run?', 'It depends on your goals and budget. Most campaigns run from a few weeks to several months; we recommend a duration during discovery.'],
  ['Do you handle creative production too?', 'Yes. As a 360° provider we take care of creative and production for TV, print, radio, outdoor and more, all under one roof.'],
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
  tv: UP + '2026/09/TV-Ad-Pillar-image.jpg',
  radio: UP + '2026/09/Radio-Pillar-image.jpg',
  print: UP + '2026/09/Print-Pillar-image.jpg',
  ooh: UP + '2026/09/OOH-Pillar-image.jpg',
};

export const TICKER = ['TV', 'Radio', 'Print', 'Out-of-home', 'Digital', 'Signage', 'Media planning', 'Strategy'];

export const ROUTES = ['/', '/about/', '/services/', ...SERVICES.map((s) => `/services/${s.slug}/`), '/clients/', '/our-work/', '/contact/'];
