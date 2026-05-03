// Shared data — personas, posts, competitors, etc.

const BRAND = {
  name: 'EB1A Experts',
  tagline: 'AI-powered EB1A strategy & narrative development',
  url: 'eb1aexperts.com',
};

const ACCOUNTS = [
  { id: 'linkedin', label: 'LinkedIn', handle: 'eb1a-experts', followers: 12840, growth: '+8.4%' },
  { id: 'instagram', label: 'Instagram', handle: 'eb1aexperts', followers: 8420, growth: '+12.1%' },
  { id: 'facebook', label: 'Facebook', handle: 'EB1A-Experts', followers: 3210, growth: '+3.2%' },
  { id: 'x', label: 'X', handle: '@eb1aexperts', followers: 5640, growth: '+6.8%' },
  { id: 'youtube', label: 'YouTube', handle: '@eb1aexperts', followers: 2180, growth: '+14.2%' },
  { id: 'medium', label: 'Medium', handle: '@eb1aexperts', followers: 1420, growth: '+4.1%' },
];

const POST_DRAFTS = [
  {
    id: 'p_01',
    platform: 'linkedin',
    type: 'carousel',
    status: 'pending_review',
    generated: '2m ago',
    title: 'The 3 pillars of an approvable EB-1A petition',
    body: 'USCIS officers aren\'t looking for perfection — they\'re looking for evidence architecture. Here\'s the 3-pillar framework our team uses for 94% of approved petitions →\n\n1. Documented extraordinary ability (3+ criteria minimum)\n2. Sustained acclaim with quantified impact\n3. A forward-looking plan of continued work',
    hashtags: ['#EB1A', '#GreenCard', '#ImmigrationLaw', '#O1Visa', '#USCIS'],
    cta: 'Book a free eligibility review →',
    trend: 'USCIS Q1 2026 policy memo',
    score: 94,
    persona: 'Senior tech IC considering self-petition',
    reach_est: '18.4K',
    engage_est: '4.2%',
    scheduled: null,
    reviews: { editorial: 'pass', brand: 'pass', compliance: 'pass', design: 'pass', format: 'pass', engagement: 'pass' },
  },
  {
    id: 'p_02',
    platform: 'instagram',
    type: 'reel',
    status: 'pending_review',
    generated: '4m ago',
    title: '"Can a product manager qualify for EB1A?" — 60s answer',
    body: 'A PM at a Series-C just got approved with 2 patents and a TechCrunch feature. Here\'s the evidence ladder we built with her →',
    hashtags: ['#EB1A', '#greencardjourney', '#productmanager', '#techvisa', '#immigrantfounder'],
    cta: 'DM "PM" for the evidence checklist',
    trend: 'Rising: #greencardjourney (+38% this week)',
    score: 87,
    persona: 'Mid-career PM, 7-10y, US-based',
    reach_est: '9.1K',
    engage_est: '6.8%',
    scheduled: null,
    reviews: { editorial: 'pass', brand: 'pass', compliance: 'pass', design: 'warn', format: 'pass', engagement: 'pass' },
  },
  {
    id: 'p_03',
    platform: 'x',
    type: 'thread',
    status: 'pending_review',
    generated: '6m ago',
    title: 'Thread: 7 EB1A criteria ranked by approval rate',
    body: 'Been reviewing 300+ approved petitions for the last 18 months. Here\'s what the data actually shows about which criteria USCIS officers weight most heavily 🧵\n\n1/ Authorship of scholarly articles — by far the highest-weighted criterion when paired with citation metrics.',
    hashtags: [],
    cta: 'Follow for more petition strategy',
    trend: 'EB1A policy discussion spike',
    score: 91,
    persona: 'Researcher/PhD audience',
    reach_est: '24.8K',
    engage_est: '3.1%',
    scheduled: null,
    reviews: { editorial: 'pass', brand: 'pass', compliance: 'pass', design: 'pass', format: 'pass', engagement: 'warn' },
  },
  {
    id: 'p_04',
    platform: 'linkedin',
    type: 'single',
    status: 'approved',
    generated: '1h ago',
    title: '300+ EB1A approvals. Here\'s what never changes.',
    body: 'Across 300+ approvals, one thing stays constant: the strength of your recommendation letters ceiling-tests your entire petition.',
    hashtags: ['#EB1A', '#GreenCard'],
    cta: 'Get a free letter audit',
    trend: null,
    score: 89,
    persona: 'Senior technical leaders',
    reach_est: '16.2K',
    engage_est: '4.6%',
    scheduled: 'Tomorrow, 9:15 AM',
    reviews: { editorial: 'pass', brand: 'pass', compliance: 'pass', design: 'pass', format: 'pass', engagement: 'pass' },
  },
  {
    id: 'p_05',
    platform: 'instagram',
    type: 'carousel',
    status: 'approved',
    generated: '3h ago',
    title: '5 signs you\'re ready for an EB1A (not O-1)',
    body: 'If 3 of these 5 apply, you\'re likely stronger on EB1A than O-1.',
    hashtags: ['#EB1A', '#O1Visa', '#immigration', '#greencard'],
    cta: 'Free eligibility quiz — link in bio',
    trend: 'O-1 vs EB1A searches up 24%',
    score: 92,
    persona: 'O-1 holders considering upgrade',
    reach_est: '11.4K',
    engage_est: '7.2%',
    scheduled: 'Today, 6:00 PM',
    reviews: { editorial: 'pass', brand: 'pass', compliance: 'pass', design: 'pass', format: 'pass', engagement: 'pass' },
  },
  {
    id: 'p_06',
    platform: 'facebook',
    type: 'single',
    status: 'rejected',
    generated: '4h ago',
    title: 'Testimonial reframe: Priya\'s 89-day approval',
    body: 'Priya came to us after a PM denial. 89 days later, she had her EB1A approval.',
    hashtags: [],
    cta: 'Read the full case study',
    trend: null,
    score: 71,
    persona: 'Past denial audience',
    reach_est: '4.2K',
    engage_est: '2.1%',
    scheduled: null,
    rejection: 'Avoid naming specific approval timelines — compliance flag. Regenerate with ranges.',
    reviews: { editorial: 'pass', brand: 'pass', compliance: 'fail', design: 'pass', format: 'pass', engagement: 'pass' },
  },
];

const COMPETITORS = [
  { id: 'c1', name: 'GreenCard.io', handle: '@greencardio', followers: 42100, posts_7d: 18, engagement: 3.4, trend: '+12%', top_topic: 'EB-1A policy changes', flag: 'accelerating' },
  { id: 'c2', name: 'Visa Counsel Group', handle: '@visacounselgrp', followers: 28400, posts_7d: 11, engagement: 2.1, trend: '-4%', top_topic: 'Employment-based options', flag: 'flat' },
  { id: 'c3', name: 'Petition Pro', handle: '@petitionpro', followers: 67200, posts_7d: 24, engagement: 4.8, trend: '+18%', top_topic: 'Case studies', flag: 'accelerating' },
  { id: 'c4', name: 'Harbor Immigration', handle: '@harborimm', followers: 19800, posts_7d: 8, engagement: 1.8, trend: '+2%', top_topic: 'News commentary', flag: 'flat' },
  { id: 'c5', name: 'Talent Visa Co.', handle: '@talentvisaco', followers: 54300, posts_7d: 21, engagement: 3.9, trend: '+9%', top_topic: 'O-1 conversions', flag: 'accelerating' },
  { id: 'c6', name: 'Acclaim Legal', handle: '@acclaimlegal', followers: 12400, posts_7d: 6, engagement: 5.2, trend: '+24%', top_topic: 'Client wins', flag: 'rising' },
];

const TRENDS = [
  { id: 't1', topic: 'USCIS Q1 policy memo', platforms: ['linkedin', 'x'], velocity: 94, change: '+312%', window: '18h', opportunity: 'high' },
  { id: 't2', topic: '#greencardjourney', platforms: ['instagram'], velocity: 78, change: '+38%', window: '3d', opportunity: 'high' },
  { id: 't3', topic: 'O-1 vs EB1A comparison', platforms: ['x', 'linkedin', 'youtube'], velocity: 71, change: '+24%', window: '5d', opportunity: 'med' },
  { id: 't4', topic: 'Premium processing delays', platforms: ['linkedin', 'facebook'], velocity: 66, change: '+18%', window: '2d', opportunity: 'med' },
  { id: 't5', topic: 'AI researchers NIW pathway', platforms: ['x', 'linkedin'], velocity: 58, change: '+14%', window: '4d', opportunity: 'low' },
];

const INFLUENCERS = [
  { id: 'i1', handle: '@priya.codes', name: 'Priya Menon', platform: 'linkedin', followers: 87300, engagement: 6.2, niche: 'Tech immigration', location: 'SF Bay Area', country: 'us', authenticity: 96, alignment: 92, rate: '$2.4k/post' },
  { id: 'i2', handle: '@visadiaries', name: 'Marcus Chen', platform: 'instagram', followers: 124000, engagement: 4.8, niche: 'Green card journey', location: 'New York', country: 'us', authenticity: 94, alignment: 88, rate: '$3.1k/post' },
  { id: 'i3', handle: '@drneha.ai', name: 'Dr. Neha Rao', platform: 'x', followers: 58900, engagement: 3.4, niche: 'AI research + visas', location: 'Seattle', country: 'us', authenticity: 98, alignment: 96, rate: '$1.8k/post' },
  { id: 'i4', handle: '@foundervisa', name: 'Luis Ortega', platform: 'linkedin', followers: 42100, engagement: 7.1, niche: 'Startup founder visa', location: 'Austin', country: 'us', authenticity: 91, alignment: 94, rate: '$2.1k/post' },
  { id: 'i5', handle: '@yasminspeaks', name: 'Yasmin Haidar', platform: 'youtube', followers: 218000, engagement: 5.2, niche: 'Immigration education', location: 'Toronto', country: 'ca', authenticity: 95, alignment: 82, rate: '$4.6k/video' },
  { id: 'i6', handle: '@techphd', name: 'Arjun Kapoor', platform: 'linkedin', followers: 34200, engagement: 8.2, niche: 'PhD pathway', location: 'Boston', country: 'us', authenticity: 97, alignment: 98, rate: '$1.6k/post' },
  { id: 'i7', handle: '@londonvisa', name: 'Sana Ahmed', platform: 'linkedin', followers: 54800, engagement: 5.4, niche: 'Tech immigration', location: 'London', country: 'uk', authenticity: 93, alignment: 86, rate: '£1.9k/post' },
  { id: 'i8', handle: '@mumbaifounder', name: 'Rohan Desai', platform: 'instagram', followers: 96400, engagement: 6.8, niche: 'Startup founder visa', location: 'Mumbai', country: 'in', authenticity: 92, alignment: 90, rate: '₹81k/post' },
  { id: 'i9', handle: '@toronto.tech', name: 'Emma Laurent', platform: 'x', followers: 31200, engagement: 4.1, niche: 'PhD pathway', location: 'Toronto', country: 'ca', authenticity: 95, alignment: 88, rate: '$1.4k/post' },
  { id: 'i10', handle: '@berlin.ml', name: 'Felix Weber', platform: 'linkedin', followers: 47800, engagement: 5.9, niche: 'AI research + visas', location: 'Berlin', country: 'de', authenticity: 96, alignment: 84, rate: '€1.6k/post' },
  { id: 'i11', handle: '@bangaloredev', name: 'Kavya Reddy', platform: 'youtube', followers: 142000, engagement: 4.4, niche: 'Immigration education', location: 'Bangalore', country: 'in', authenticity: 94, alignment: 91, rate: '₹1.2L/video' },
  { id: 'i12', handle: '@sydney.code', name: 'James Patel', platform: 'linkedin', followers: 28600, engagement: 6.1, niche: 'PM / leadership', location: 'Sydney', country: 'au', authenticity: 97, alignment: 89, rate: 'AU$1.8k/post' },
  { id: 'i13', handle: '@dublinvisa', name: 'Aoife Walsh', platform: 'x', followers: 18400, engagement: 7.8, niche: 'Tech immigration', location: 'Dublin', country: 'ie', authenticity: 98, alignment: 87, rate: '€1.1k/post' },
  { id: 'i14', handle: '@sfdesigner', name: 'Jordan Park', platform: 'instagram', followers: 68900, engagement: 5.6, niche: 'Designer IC', location: 'San Francisco', country: 'us', authenticity: 94, alignment: 85, rate: '$2.2k/post' },
  // High-tech FAANG / ML engineer niches — primary EB1A target
  { id: 'i15', handle: '@faang.staffeng', name: 'Wei Zhang', platform: 'linkedin', followers: 78400, engagement: 7.4, niche: 'FAANG engineers', location: 'Mountain View', country: 'us', authenticity: 97, alignment: 95, rate: '$2.8k/post' },
  { id: 'i16', handle: '@bigtech.career', name: 'Anjali Sharma', platform: 'linkedin', followers: 112000, engagement: 5.8, niche: 'FAANG engineers', location: 'Seattle', country: 'us', authenticity: 95, alignment: 93, rate: '$3.4k/post' },
  { id: 'i17', handle: '@mlpaper.daily', name: 'Dr. Sebastian Müller', platform: 'x', followers: 94200, engagement: 4.2, niche: 'ML engineers', location: 'San Francisco', country: 'us', authenticity: 99, alignment: 97, rate: '$2.6k/post' },
  { id: 'i18', handle: '@deeplearning.io', name: 'Ravi Krishnan', platform: 'linkedin', followers: 64500, engagement: 8.1, niche: 'ML engineers', location: 'Palo Alto', country: 'us', authenticity: 96, alignment: 94, rate: '$2.3k/post' },
  // Adjacent / outside niche — EB1A & O-1A creators (audience is direct ICP)
  { id: 'i19', handle: '@eb1a.stories', name: 'Camila Reyes', platform: 'instagram', followers: 41800, engagement: 9.2, niche: 'EB1A/O-1A creators', location: 'Miami', country: 'us', authenticity: 98, alignment: 99, rate: '$1.9k/post' },
  { id: 'i20', handle: '@visawins', name: 'Tomás Becker', platform: 'youtube', followers: 87600, engagement: 6.4, niche: 'EB1A/O-1A creators', location: 'Los Angeles', country: 'us', authenticity: 97, alignment: 98, rate: '$3.2k/video' },
];

const COUNTRIES = [
  { id: 'us', label: 'United States', flag: '🇺🇸' },
  { id: 'ca', label: 'Canada', flag: '🇨🇦' },
  { id: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
  { id: 'in', label: 'India (diaspora)', flag: '🇮🇳' },
  { id: 'de', label: 'Germany', flag: '🇩🇪' },
  { id: 'au', label: 'Australia', flag: '🇦🇺' },
  { id: 'ie', label: 'Ireland', flag: '🇮🇪' },
];

const SEO_INTEGRATIONS = [
  { id: 'semrush', name: 'Semrush', tag: 'SEO intelligence', connected: true, status: 'Syncing · every 4h', meta: 'Tracking 284 keywords · 12 competitors', color: '#ff642d', glyph: 'S' },
  { id: 'ahrefs', name: 'Ahrefs', tag: 'Backlink + SEO', connected: true, status: 'Syncing · every 6h', meta: '1,248 backlinks · Domain Rating 48', color: '#0075ff', glyph: 'A' },
  { id: 'ga4', name: 'Google Analytics 4', tag: 'Web analytics', connected: true, status: 'Live', meta: 'Property eb1aexperts.com · 14.2K users/mo', color: '#f9ab00', glyph: 'G' },
  { id: 'gsc', name: 'Google Search Console', tag: 'Search performance', connected: true, status: 'Live', meta: '48 queries tracked · avg pos 4.8', color: '#4285f4', glyph: 'S' },
  { id: 'ga-ads', name: 'Google Ads', tag: 'Paid performance', connected: false, status: 'Not connected', meta: 'Connect to enable cost-per-lead tracking', color: '#4285f4', glyph: 'A' },
  { id: 'metapixel', name: 'Meta Pixel', tag: 'Paid attribution', connected: true, status: 'Live', meta: 'Events flowing · conversion API healthy', color: '#0866ff', glyph: 'M' },
];

const SEO_KEYWORDS = [
  { kw: 'eb1a requirements', vol: 18100, diff: 42, pos: 3, change: '+2', intent: 'info', ctr: '12.8%', src: 'semrush' },
  { kw: 'eb1a vs o1', vol: 8800, diff: 38, pos: 5, change: '+1', intent: 'info', ctr: '8.4%', src: 'ahrefs' },
  { kw: 'self petition green card', vol: 6200, diff: 56, pos: 7, change: '+3', intent: 'commercial', ctr: '6.2%', src: 'gsc' },
  { kw: 'eb1a attorney near me', vol: 3400, diff: 68, pos: 9, change: '-1', intent: 'transactional', ctr: '4.1%', src: 'semrush' },
  { kw: 'eb1a evidence checklist', vol: 2900, diff: 34, pos: 2, change: '+4', intent: 'info', ctr: '18.2%', src: 'ahrefs' },
  { kw: 'how long does eb1a take', vol: 2400, diff: 22, pos: 4, change: '0', intent: 'info', ctr: '14.1%', src: 'gsc' },
  { kw: 'eb1a approval rate', vol: 1900, diff: 28, pos: 6, change: '+1', intent: 'info', ctr: '10.2%', src: 'semrush' },
  { kw: 'eb1a recommendation letters', vol: 1700, diff: 41, pos: 8, change: '+2', intent: 'info', ctr: '7.8%', src: 'ahrefs' },
];

const EMAIL_REPORTS = [
  {
    id: 'r1', kind: 'daily', name: 'Morning Intelligence Brief',
    desc: 'Trends, competitor activity, viral alerts, content themes',
    recipients: ['dharma@eb1aexperts.com', 'john@eb1aexperts.com'],
    schedule: 'Daily · 7:00 AM EST', lastSent: 'Today, 7:00 AM', nextSend: 'Tomorrow, 7:00 AM',
    enabled: true, opens: 98, clicks: 14,
  },
  {
    id: 'r2', kind: 'approval', name: 'Approval Queue Digest',
    desc: 'Drafts waiting for your review with 1-click approve links',
    recipients: ['dharma@eb1aexperts.com'],
    schedule: 'On-demand + 9:00 AM if pending', lastSent: 'Today, 9:00 AM', nextSend: 'When posts are queued',
    enabled: true, opens: 100, clicks: 92,
  },
  {
    id: 'r3', kind: 'weekly', name: 'Weekly Performance Recap',
    desc: 'Reach, engagement, conversions, top posts, CPL',
    recipients: ['dharma@eb1aexperts.com', 'john@eb1aexperts.com', 'shalini@eb1aexperts.com'],
    schedule: 'Monday · 8:00 AM EST', lastSent: 'Mon, Apr 21', nextSend: 'Mon, Apr 28',
    enabled: true, opens: 84, clicks: 48,
  },
  {
    id: 'r4', kind: 'competitor', name: 'Competitor Activity Digest',
    desc: 'What your tracked competitors published and how it performed',
    recipients: ['john@eb1aexperts.com'],
    schedule: 'Weekly · Friday 4:00 PM', lastSent: 'Fri, Apr 18', nextSend: 'Fri, Apr 25',
    enabled: true, opens: 72, clicks: 31,
  },
  {
    id: 'r5', kind: 'monthly', name: 'Monthly Executive Summary',
    desc: 'KPI scorecard, attribution, CAC, pipeline influence',
    recipients: ['dharma@eb1aexperts.com'],
    schedule: '1st of month · 7:00 AM', lastSent: 'Apr 1', nextSend: 'May 1',
    enabled: true, opens: 100, clicks: 68,
  },
  {
    id: 'r6', kind: 'alert', name: 'Real-time Viral Alerts',
    desc: 'Instant email when a post crosses engagement thresholds',
    recipients: ['dharma@eb1aexperts.com', 'john@eb1aexperts.com'],
    schedule: 'Triggered · Real-time', lastSent: 'Yesterday, 8:12 PM', nextSend: 'On threshold',
    enabled: true, opens: 100, clicks: 58,
  },
  {
    id: 'r7', kind: 'seo', name: 'SEO + Keyword Movement',
    desc: 'Ranking changes, new backlinks, GSC queries',
    recipients: ['john@eb1aexperts.com'],
    schedule: 'Weekly · Tuesday 9:00 AM', lastSent: 'Tue, Apr 22', nextSend: 'Tue, Apr 29',
    enabled: false, opens: 0, clicks: 0,
  },
];

const SENT_EMAILS = [
  { id: 'e1', subject: 'Morning Brief — USCIS Q1 memo alert', type: 'daily', to: 'dharma@eb1aexperts.com', sent: 'Today, 7:00 AM', opened: true, clicked: 2, preview: 'One big thing: USCIS released a Q1 2026 policy memo overnight. Velocity is +312%…' },
  { id: 'e2', subject: '4 drafts waiting for your approval', type: 'approval', to: 'dharma@eb1aexperts.com', sent: 'Today, 9:00 AM', opened: true, clicked: 3, preview: 'Your review queue has 4 drafts scored 87–94. Tap to approve in 1 click.' },
  { id: 'e3', subject: 'Weekly recap — 842K reach, +34% vs. last week', type: 'weekly', to: '3 recipients', sent: 'Mon, Apr 21', opened: true, clicked: 5, preview: 'Reach: 842,412 (+34.2%). Top post: "The 3 pillars…" at 18.4K impressions…' },
  { id: 'e4', subject: '🔥 "3 pillars" crossed 10K impressions', type: 'alert', to: '2 recipients', sent: 'Yesterday, 8:12 PM', opened: true, clicked: 4, preview: 'Viral alert — the LinkedIn post from Tuesday hit 10,247 impressions in 6 hours…' },
  { id: 'e5', subject: 'Competitor pulse — Petition Pro published 3', type: 'competitor', to: 'john@eb1aexperts.com', sent: 'Fri, Apr 18', opened: true, clicked: 1, preview: 'Petition Pro published 3 posts targeting "self-petition" — their highest volume…' },
  { id: 'e6', subject: 'Approval needed — "Priya\'s 89-day approval"', type: 'approval', to: 'dharma@eb1aexperts.com', sent: 'Yesterday, 4:22 PM', opened: false, clicked: 0, preview: 'Compliance flag — specific timeline claim. Agents regenerated with ranges…' },
];

const SEO_ALERTS = [
  { id: 'a1', kind: 'keyword-gain', kw: 'eb1a evidence checklist', msg: 'Moved from pos 6 → 2 in 7 days', src: 'ahrefs', ts: '2h ago', impact: 'high' },
  { id: 'a2', kind: 'backlink', kw: 'TechCrunch.com', msg: 'New DR 93 backlink to /self-petition-guide', src: 'ahrefs', ts: '5h ago', impact: 'high' },
  { id: 'a3', kind: 'competitor', kw: 'Petition Pro', msg: 'Gained 48 new referring domains this week', src: 'semrush', ts: 'Yesterday', impact: 'med' },
  { id: 'a4', kind: 'query-spike', kw: 'eb1a 2026 changes', msg: 'New query · 18 impressions · pos 12', src: 'gsc', ts: 'Yesterday', impact: 'med' },
  { id: 'a5', kind: 'conversion', kw: 'Book consult CTA', msg: '+24% conversion rate last 7d', src: 'ga4', ts: '2d ago', impact: 'high' },
];

const AGENT_FEED = [
  { ts: '14:22', tool: 'scheduler', running: true, who: 'Publisher', action: 'Queuing', target: '"5 signs you\'re ready for EB1A"', meta: 'Instagram · 6:00 PM EST' },
  { ts: '14:21', tool: 'reviewer', who: 'Compliance', action: 'Flagged', target: '"Priya\'s 89-day approval"', meta: 'Specific timeline claim — regenerating' },
  { ts: '14:20', tool: 'research', error: true, who: 'Trend Scout', action: 'API rate-limit error', target: 'X / Twitter scrape', meta: 'Retrying with backoff · attempt 2/3' },
  { ts: '14:19', tool: 'generator', who: 'Creative', action: 'Generated', target: '3 carousel designs', meta: 'Figma · 1080×1350 · Variant A/B/C' },
  { ts: '14:18', tool: 'writer', who: 'Copy Agent', action: 'Drafted', target: '"3 pillars of an approvable petition"', meta: 'LinkedIn · 234 words · hook score 94' },
  { ts: '14:17', tool: 'reviewer', running: true, who: 'Brand Guardian', action: 'Checking', target: '12 queued drafts', meta: 'Voice-profile pass · 8 of 12 done' },
  { ts: '14:16', tool: 'research', who: 'Trend Scout', action: 'Detected spike', target: 'USCIS Q1 memo', meta: '+312% velocity · 18h window' },
  { ts: '14:14', tool: 'competitor', who: 'Intelligence', action: 'Scanned', target: 'Petition Pro posts', meta: '24 posts in 7d · 4.8% engagement' },
  { ts: '14:12', tool: 'influencer', error: true, who: 'Discovery', action: 'Failed to enrich', target: '@ghosted.handle', meta: 'Profile deleted — removed from shortlist' },
  { ts: '14:11', tool: 'research', who: 'Trend Scout', action: 'Scraped', target: 'LinkedIn, X, Medium', meta: '1,847 posts analyzed' },
  { ts: '14:08', tool: 'influencer', who: 'Discovery', action: 'Enriched', target: '12 new profiles', meta: 'Authenticity + alignment scored' },
  { ts: '14:04', tool: 'research', who: 'Keyword', action: 'Ranked', target: '42 keywords', meta: 'Top: "EB1A criteria" (score 91)' },
  { ts: '14:00', tool: 'report', who: 'Daily Brief', action: 'Delivered', target: 'Morning intelligence email', meta: 'Sent to dharma@eb1aexperts.com' },
  { ts: '13:56', tool: 'research', who: 'Persona', action: 'Updated', target: 'Mid-career PM segment', meta: '+3.2% size · engagement +1.1pt' },
  { ts: '13:52', tool: 'generator', who: 'Creative', action: 'Rendered', target: '6 reel thumbnails', meta: 'Motion · 9:16 · brand kit v2' },
];

Object.assign(window, { BRAND, ACCOUNTS, POST_DRAFTS, COMPETITORS, TRENDS, INFLUENCERS, COUNTRIES, SEO_INTEGRATIONS, SEO_KEYWORDS, EMAIL_REPORTS, SENT_EMAILS, SEO_ALERTS, AGENT_FEED });
