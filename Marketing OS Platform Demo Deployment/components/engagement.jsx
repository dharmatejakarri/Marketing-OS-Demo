// Engagement Hub — consolidated view of likes/comments/mentions/sentiment per post across platforms.

const ENG_POSTS = [
  {
    id: 'eg1', title: '5 signs you\'re ready for EB1A self-petition', platform: 'linkedin',
    publishedAt: 'Today · 9:15 AM', author: 'EB1A Experts',
    stats: { likes: 1842, comments: 124, shares: 287, saves: 412, impressions: 48200, reach: 31500, ctr: 4.8 },
    sentiment: { positive: 78, neutral: 18, negative: 4 },
    deltaVs7d: { likes: 38, comments: 24, shares: 52 },
    unread: 12, flagged: 2,
    comments: [
      { id: 'c1', author: 'Priya Menon', handle: '@priya.codes', avatar: 'PM', time: '12m', verified: true, sentiment: 'positive', text: 'This framework is gold. The "consistent media coverage" criterion is the one most clients underestimate. Sharing with my network.', likes: 24, replies: 3 },
      { id: 'c2', author: 'Wei Zhang', handle: '@faang.staffeng', avatar: 'WZ', time: '24m', sentiment: 'positive', text: 'Just hit criterion 3 last week (judging at NeurIPS). Filing in Q2 — wish I had this checklist 6 months ago.', likes: 18, replies: 1 },
      { id: 'c3', author: 'Anonymous Reviewer', handle: '@thr0waway', avatar: 'AR', time: '48m', sentiment: 'negative', text: 'This is misleading. The bar for EB1A is much higher than this post suggests. Most petitions get RFEs even when "all 5 are met".', likes: 4, replies: 8, flagged: true },
      { id: 'c4', author: 'Dr. Neha Rao', handle: '@drneha.ai', avatar: 'NR', time: '1h', verified: true, sentiment: 'positive', text: 'Excellent point on the original contributions criterion — citations alone don\'t move the needle without context.', likes: 31, replies: 2 },
      { id: 'c5', author: 'Marcus T.', handle: '@marcus_t', avatar: 'MT', time: '1h', sentiment: 'neutral', text: 'Are these the same criteria for O-1A? Curious how they translate.', likes: 7, replies: 4 },
      { id: 'c6', author: 'James Patel', handle: '@sydney.code', avatar: 'JP', time: '2h', sentiment: 'positive', text: 'Saved this. Doing my Australia-to-US transition next year and this maps cleanly to my evidence.', likes: 12, replies: 0 },
      { id: 'c7', author: 'Hiring Manager', handle: '@bigtech_hm', avatar: 'HM', time: '2h', sentiment: 'positive', text: 'Sharing internally — we get this question from our IC4+ engineers constantly.', likes: 22, replies: 1 },
    ],
    mentions: [
      { who: '@stripe.engineering', context: 'reposted with commentary', time: '1h', impact: 'high' },
      { who: '@migrationmonthly', context: 'quoted in newsletter', time: '3h', impact: 'med' },
    ],
  },
  {
    id: 'eg2', title: 'AI researchers — your NIW pathway is broken', platform: 'x',
    publishedAt: 'Yesterday · 6:42 PM', author: '@eb1aexperts',
    stats: { likes: 847, comments: 142, shares: 312, saves: 0, impressions: 24800, reach: 18200, ctr: 5.7 },
    sentiment: { positive: 64, neutral: 22, negative: 14 },
    deltaVs7d: { likes: 18, comments: -4, shares: 28 },
    unread: 8, flagged: 0,
    comments: [
      { id: 'c1', author: 'Felix Weber', handle: '@berlin.ml', avatar: 'FW', time: '14h', sentiment: 'positive', text: 'This thread saved me $3k in attorney fees. The premium-processing distinction alone is worth the read.', likes: 42, replies: 5 },
      { id: 'c2', author: 'Anonymous', handle: '@anon_phd', avatar: 'AN', time: '16h', sentiment: 'negative', text: 'Disagree on point 4. NIW is still the right path for most pre-tenure researchers. EB1A bar is unreasonable.', likes: 18, replies: 12 },
      { id: 'c3', author: 'Dr. Sebastian Müller', handle: '@mlpaper.daily', avatar: 'SM', time: '18h', verified: true, sentiment: 'positive', text: 'Strongly agree. NIW response times have ballooned. EB1A with proper evidence packaging is faster end-to-end now.', likes: 67, replies: 4 },
      { id: 'c4', author: 'Ravi K.', handle: '@deeplearning.io', avatar: 'RK', time: '20h', sentiment: 'positive', text: 'Bookmarking. Filing my I-140 next month and this changes my approach.', likes: 14, replies: 1 },
    ],
    mentions: [
      { who: '@aiimmigration', context: 'quote-retweeted', time: '12h', impact: 'high' },
    ],
  },
  {
    id: 'eg3', title: 'O-1 vs EB1A — when each makes sense', platform: 'linkedin',
    publishedAt: '2 days ago', author: 'EB1A Experts',
    stats: { likes: 612, comments: 84, shares: 142, saves: 198, impressions: 22400, reach: 16800, ctr: 3.4 },
    sentiment: { positive: 82, neutral: 14, negative: 4 },
    deltaVs7d: { likes: 12, comments: 8, shares: 14 },
    unread: 4, flagged: 0,
    comments: [
      { id: 'c1', author: 'Sana Ahmed', handle: '@londonvisa', avatar: 'SA', time: '1d', verified: true, sentiment: 'positive', text: 'The portability section is the most underrated part of EB1A. Most attorneys don\'t emphasize this.', likes: 28, replies: 3 },
      { id: 'c2', author: 'Luis Ortega', handle: '@foundervisa', avatar: 'LO', time: '1d', sentiment: 'positive', text: 'For founders specifically, doing O-1 → EB1A is the cleanest pathway. Great breakdown.', likes: 19, replies: 2 },
      { id: 'c3', author: 'Curious PM', handle: '@curious_pm', avatar: 'CP', time: '2d', sentiment: 'neutral', text: 'What about cost? An O-1 is half the price for the same effective outcome short-term.', likes: 8, replies: 6 },
    ],
    mentions: [],
  },
  {
    id: 'eg4', title: '"Premium processing delays" — what to actually do', platform: 'linkedin',
    publishedAt: '3 days ago', author: 'EB1A Experts',
    stats: { likes: 421, comments: 38, shares: 64, saves: 88, impressions: 14200, reach: 9800, ctr: 2.9 },
    sentiment: { positive: 58, neutral: 30, negative: 12 },
    deltaVs7d: { likes: -8, comments: 4, shares: 0 },
    unread: 2, flagged: 1,
    comments: [
      { id: 'c1', author: 'Frustrated Filer', handle: '@frust_filer', avatar: 'FF', time: '2d', sentiment: 'negative', text: 'Premium processing has been a joke for 3 months. USCIS needs accountability, not workarounds.', likes: 14, replies: 4, flagged: true },
      { id: 'c2', author: 'Aoife Walsh', handle: '@dublinvisa', avatar: 'AW', time: '2d', sentiment: 'neutral', text: 'Useful tactical advice. The Form I-907 escalation path most people don\'t know about.', likes: 11, replies: 1 },
    ],
    mentions: [],
  },
  {
    id: 'eg5', title: 'Reel: Day-in-the-life of an EB1A applicant', platform: 'instagram',
    publishedAt: '4 days ago', author: 'eb1aexperts',
    stats: { likes: 3240, comments: 218, shares: 412, saves: 1820, impressions: 84200, reach: 62100, ctr: 6.2 },
    sentiment: { positive: 88, neutral: 10, negative: 2 },
    deltaVs7d: { likes: 124, comments: 88, shares: 142 },
    unread: 18, flagged: 0,
    comments: [
      { id: 'c1', author: 'camila.reyes', handle: '@eb1a.stories', avatar: 'CR', time: '3d', verified: true, sentiment: 'positive', text: 'This is exactly the kind of content the community needs. Demystifies the process. 🔥', likes: 89, replies: 7 },
      { id: 'c2', author: 'Tomás B.', handle: '@visawins', avatar: 'TB', time: '3d', verified: true, sentiment: 'positive', text: 'Reposting to my story. The timeline visualization especially.', likes: 64, replies: 2 },
      { id: 'c3', author: 'New Filer', handle: '@new_filer_24', avatar: 'NF', time: '3d', sentiment: 'positive', text: 'Bookmarked. Exactly what I needed before my consult tomorrow!!', likes: 18, replies: 1 },
    ],
    mentions: [
      { who: '@eb1a.stories', context: 'reposted to story', time: '2d', impact: 'high' },
      { who: '@visawins', context: 'reposted to feed', time: '2d', impact: 'high' },
      { who: '@migrationdigest', context: 'tagged in roundup', time: '1d', impact: 'med' },
    ],
  },
];

function EngagementHub() {
  const [selectedId, setSelectedId] = React.useState('eg1');
  const [search, setSearch] = React.useState('');
  const [platformFilter, setPlatformFilter] = React.useState('all');
  const [sentimentFilter, setSentimentFilter] = React.useState('all');
  const [sort, setSort] = React.useState('recent');

  const list = React.useMemo(() => {
    let l = ENG_POSTS;
    if (search) l = l.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (platformFilter !== 'all') l = l.filter(p => p.platform === platformFilter);
    if (sentimentFilter === 'flagged') l = l.filter(p => p.flagged > 0);
    if (sentimentFilter === 'unread') l = l.filter(p => p.unread > 0);
    if (sort === 'engagement') l = [...l].sort((a, b) => (b.stats.likes + b.stats.comments) - (a.stats.likes + a.stats.comments));
    if (sort === 'unread') l = [...l].sort((a, b) => b.unread - a.unread);
    return l;
  }, [search, platformFilter, sentimentFilter, sort]);

  const post = ENG_POSTS.find(p => p.id === selectedId) || list[0] || ENG_POSTS[0];
  const Pc = Platforms[post.platform];

  // Aggregate header stats
  const totalUnread = ENG_POSTS.reduce((s, p) => s + p.unread, 0);
  const totalFlagged = ENG_POSTS.reduce((s, p) => s + p.flagged, 0);
  const totalEngagement = ENG_POSTS.reduce((s, p) => s + p.stats.likes + p.stats.comments + p.stats.shares, 0);
  const aggSentiment = ENG_POSTS.reduce((s, p) => ({
    positive: s.positive + p.sentiment.positive,
    neutral: s.neutral + p.sentiment.neutral,
    negative: s.negative + p.sentiment.negative,
  }), { positive: 0, neutral: 0, negative: 0 });
  const sentTotal = aggSentiment.positive + aggSentiment.neutral + aggSentiment.negative;
  const posPct = Math.round((aggSentiment.positive / sentTotal) * 100);
  const negPct = Math.round((aggSentiment.negative / sentTotal) * 100);
  const neuPct = 100 - posPct - negPct;

  return (
    <div className="page" style={{ maxWidth: 'none' }}>
      <div className="page-h">
        <div>
          <div className="eyebrow">Workspace · Listening</div>
          <h1>Engagement Hub</h1>
          <p>Every comment, mention, and reaction across LinkedIn, Instagram, X, and YouTube — sentiment-classified and prioritized for response.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn" onClick={() => Store.toast('Bulk reply', 'Drafting AI replies for 12 unanswered comments…', 'info')}><I.Sparkles size={12} /> AI bulk reply</button>
          <button className="btn primary" onClick={() => Store.toast('Mark all read', 'All conversations marked read.', 'ok')}><I.Check size={12} /> Mark all read</button>
        </div>
      </div>

      {/* Aggregate strip */}
      <div className="eng-stat-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: 16 }}>
        <div className="eng-stat">
          <div className="lbl">Unread</div>
          <div className="val" style={{ color: 'var(--accent-1)' }}>{totalUnread}</div>
          <div className="sub">Across {ENG_POSTS.length} active posts</div>
        </div>
        <div className="eng-stat">
          <div className="lbl">Flagged</div>
          <div className="val" style={{ color: 'var(--err)' }}>{totalFlagged}</div>
          <div className="sub">Need a human reply</div>
        </div>
        <div className="eng-stat">
          <div className="lbl">Total engagement (7d)</div>
          <div className="val">{(totalEngagement / 1000).toFixed(1)}K</div>
          <div className="sub up">+34% vs prior 7d</div>
        </div>
        <div className="eng-stat">
          <div className="lbl">Mentions</div>
          <div className="val">42</div>
          <div className="sub">7 from {'>'}10K accounts</div>
        </div>
        <div className="eng-stat">
          <div className="lbl">Sentiment mix</div>
          <div className="row" style={{ gap: 8, fontSize: 12, marginTop: 6, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--ok)' }}>{posPct}%</span>
            <span style={{ color: 'var(--text-3)' }}>{neuPct}%</span>
            <span style={{ color: 'var(--err)' }}>{negPct}%</span>
          </div>
          <div className="sentiment-bar" style={{ marginTop: 6 }}>
            <div className="pos" style={{ width: posPct + '%' }}></div>
            <div className="neu" style={{ width: neuPct + '%' }}></div>
            <div className="neg" style={{ width: negPct + '%' }}></div>
          </div>
        </div>
      </div>

      <div className="eng-shell">
        {/* LEFT — post list */}
        <div className="eng-list">
          <div className="eng-list-h">
            <div style={{ position: 'relative' }}>
              <I.Search size={13} style={{ position: 'absolute', left: 9, top: 8, color: 'var(--text-3)' }} />
              <input placeholder="Search posts…" value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', height: 28, background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 6, padding: '0 10px 0 28px', color: 'var(--text-1)', fontSize: 12, outline: 'none' }} />
            </div>
            <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
              <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}
                style={{ height: 26, background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 5, padding: '0 6px', fontSize: 11, color: 'var(--text-1)', outline: 'none' }}>
                <option value="all">All platforms</option>
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
                <option value="x">X / Twitter</option>
              </select>
              <select value={sentimentFilter} onChange={(e) => setSentimentFilter(e.target.value)}
                style={{ height: 26, background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 5, padding: '0 6px', fontSize: 11, color: 'var(--text-1)', outline: 'none' }}>
                <option value="all">All</option>
                <option value="unread">Has unread</option>
                <option value="flagged">Flagged only</option>
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                style={{ height: 26, background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 5, padding: '0 6px', fontSize: 11, color: 'var(--text-1)', outline: 'none' }}>
                <option value="recent">Recent</option>
                <option value="engagement">Top engagement</option>
                <option value="unread">Most unread</option>
              </select>
            </div>
          </div>
          <div className="eng-list-body">
            {list.map(p => {
              const PIc = Platforms[p.platform];
              const total = p.sentiment.positive + p.sentiment.neutral + p.sentiment.negative;
              return (
                <div key={p.id} className={'eng-row' + (p.id === selectedId ? ' active' : '') + (p.unread > 0 ? ' unread' : '')} onClick={() => setSelectedId(p.id)}>
                  <PIc />
                  <div style={{ minWidth: 0 }}>
                    <div className="er-title">{p.title}</div>
                    <div className="er-meta">
                      <span>{p.publishedAt}</span>
                      {p.unread > 0 && <span style={{ color: 'var(--accent-1)', fontWeight: 600 }}>· {p.unread} unread</span>}
                      {p.flagged > 0 && <span style={{ color: 'var(--err)', fontWeight: 600 }}>· {p.flagged} flagged</span>}
                    </div>
                    <div className="er-stats">
                      <span>♥ {p.stats.likes.toLocaleString()}</span>
                      <span>💬 {p.stats.comments}</span>
                      <span>↗ {p.stats.shares}</span>
                    </div>
                    <div className="sentiment-bar" style={{ marginTop: 6, height: 4 }}>
                      <div className="pos" style={{ width: (p.sentiment.positive / total * 100) + '%' }}></div>
                      <div className="neu" style={{ width: (p.sentiment.neutral / total * 100) + '%' }}></div>
                      <div className="neg" style={{ width: (p.sentiment.negative / total * 100) + '%' }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
            {list.length === 0 && (
              <div style={{ padding: 30, textAlign: 'center', color: 'var(--text-3)', fontSize: 12 }}>No matches.</div>
            )}
          </div>
        </div>

        {/* RIGHT — detail */}
        <div className="eng-detail-shell">
          {/* Post header card */}
          <div className="card">
            <div className="card-h">
              <div className="row" style={{ gap: 10 }}>
                <Pc />
                <div>
                  <div style={{ fontSize: 13.5, color: 'var(--text-0)', fontWeight: 600 }}>{post.title}</div>
                  <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>{post.publishedAt} · {post.author}</div>
                </div>
              </div>
              <div className="row" style={{ gap: 6 }}>
                <button className="btn sm" onClick={() => Store.toast('Opened on platform', 'New tab', 'info')}><I.ExternalLink size={11} /> View on platform</button>
                <button className="btn sm" onClick={() => Store.toast('Boosted', 'Promotion request submitted to ad team.', 'ok')}><I.TrendingUp size={11} /> Boost</button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="eng-stat-grid">
            <div className="eng-stat">
              <div className="lbl">Likes</div>
              <div className="val">{post.stats.likes.toLocaleString()}</div>
              <div className={'sub ' + (post.deltaVs7d.likes >= 0 ? 'up' : 'down')}>{post.deltaVs7d.likes >= 0 ? '+' : ''}{post.deltaVs7d.likes}% vs avg</div>
            </div>
            <div className="eng-stat">
              <div className="lbl">Comments</div>
              <div className="val">{post.stats.comments}</div>
              <div className={'sub ' + (post.deltaVs7d.comments >= 0 ? 'up' : 'down')}>{post.deltaVs7d.comments >= 0 ? '+' : ''}{post.deltaVs7d.comments}% vs avg</div>
            </div>
            <div className="eng-stat">
              <div className="lbl">Shares / Reposts</div>
              <div className="val">{post.stats.shares}</div>
              <div className={'sub ' + (post.deltaVs7d.shares >= 0 ? 'up' : 'down')}>{post.deltaVs7d.shares >= 0 ? '+' : ''}{post.deltaVs7d.shares}% vs avg</div>
            </div>
            <div className="eng-stat">
              <div className="lbl">Impressions</div>
              <div className="val">{(post.stats.impressions / 1000).toFixed(1)}K</div>
              <div className="sub">CTR {post.stats.ctr}%</div>
            </div>
          </div>

          {/* Sentiment + reaction breakdown */}
          <div className="grid-2" style={{ gap: 12 }}>
            <div className="card">
              <div className="card-h"><h3>Sentiment</h3><span className="subtitle">AI-classified</span></div>
              <div className="card-b">
                <div className="sentiment-bar" style={{ height: 10 }}>
                  <div className="pos" style={{ width: post.sentiment.positive + '%' }}></div>
                  <div className="neu" style={{ width: post.sentiment.neutral + '%' }}></div>
                  <div className="neg" style={{ width: post.sentiment.negative + '%' }}></div>
                </div>
                <div className="row" style={{ gap: 16, marginTop: 12, fontSize: 12 }}>
                  <div className="row" style={{ gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--ok)' }}></span><span style={{ color: 'var(--text-1)' }}>Positive</span><span className="mono" style={{ color: 'var(--ok)', fontWeight: 600 }}>{post.sentiment.positive}%</span></div>
                  <div className="row" style={{ gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--text-4)' }}></span><span style={{ color: 'var(--text-1)' }}>Neutral</span><span className="mono" style={{ color: 'var(--text-3)', fontWeight: 600 }}>{post.sentiment.neutral}%</span></div>
                  <div className="row" style={{ gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--err)' }}></span><span style={{ color: 'var(--text-1)' }}>Negative</span><span className="mono" style={{ color: 'var(--err)', fontWeight: 600 }}>{post.sentiment.negative}%</span></div>
                </div>
                {post.sentiment.negative > 10 && (
                  <div style={{ marginTop: 12, padding: 10, background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 6, fontSize: 11.5, color: 'var(--text-1)' }}>
                    <div className="row" style={{ gap: 6, marginBottom: 4 }}>
                      <I.AlertTriangle size={11} style={{ color: 'var(--warn)' }} />
                      <span style={{ fontWeight: 600 }}>Negative pocket detected</span>
                    </div>
                    <span style={{ color: 'var(--text-2)' }}>{post.sentiment.negative}% negative — mostly around {post.platform === 'x' ? 'NIW vs EB1A debate' : 'compliance bar concerns'}. Consider a follow-up clarification post.</span>
                  </div>
                )}
              </div>
            </div>
            <div className="card">
              <div className="card-h"><h3>Mentions & reposts</h3><span className="subtitle">{post.mentions.length} this week</span></div>
              <div className="card-b flush">
                {post.mentions.length === 0 && (
                  <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-3)', fontSize: 12 }}>No mentions yet.</div>
                )}
                {post.mentions.map((m, i) => (
                  <div key={i} className="row" style={{ padding: '10px 14px', borderBottom: i === post.mentions.length - 1 ? 'none' : '1px solid var(--line-1)', gap: 10 }}>
                    <I.AtSign size={12} style={{ color: 'var(--accent-1)', flex: '0 0 12px' }} />
                    <div style={{ flex: 1 }}>
                      <div className="row" style={{ gap: 6, fontSize: 12 }}>
                        <span className="mono" style={{ color: 'var(--text-0)', fontWeight: 600 }}>{m.who}</span>
                        <span style={{ color: 'var(--text-3)' }}>· {m.context}</span>
                      </div>
                      <div style={{ fontSize: 10.5, color: 'var(--text-4)', marginTop: 1 }}>{m.time} ago</div>
                    </div>
                    <span className={'badge ' + (m.impact === 'high' ? 'accent' : '')} style={{ fontSize: 10 }}>{m.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="card">
            <div className="card-h">
              <h3>Conversation <span className="subtitle">{post.comments.length} comments · {post.unread} unread</span></h3>
              <div className="row" style={{ gap: 6 }}>
                <button className="btn sm ghost" onClick={() => Store.toast('AI suggesting replies', 'Drafts ready in 4-6 seconds.', 'info')}><I.Sparkles size={11} /> Suggest replies</button>
                <button className="btn sm ghost"><I.Filter size={11} /> Filter</button>
              </div>
            </div>
            <div className="card-b flush">
              {post.comments.map(c => (
                <div key={c.id} className="eng-comment">
                  <div className="ec-avatar">{c.avatar}</div>
                  <div className="ec-body">
                    <div className="ec-head">
                      <span className="ec-author">{c.author}</span>
                      {c.verified && <I.CheckCircle size={11} style={{ color: 'var(--accent-1)' }} />}
                      <span className="ec-handle">{c.handle}</span>
                      {c.flagged && <span className="badge" style={{ background: 'rgba(248,113,113,0.12)', color: 'var(--err)', fontSize: 9 }}>flagged</span>}
                      <span className={'badge'} style={{
                        fontSize: 9,
                        background: c.sentiment === 'positive' ? 'rgba(74,222,128,0.12)' : c.sentiment === 'negative' ? 'rgba(248,113,113,0.12)' : 'rgba(255,255,255,0.04)',
                        color: c.sentiment === 'positive' ? 'var(--ok)' : c.sentiment === 'negative' ? 'var(--err)' : 'var(--text-3)',
                      }}>
                        {c.sentiment === 'positive' ? '+' : c.sentiment === 'negative' ? '−' : '·'} {c.sentiment}
                      </span>
                      <span className="ec-time">{c.time}</span>
                    </div>
                    <div className="ec-text">{c.text}</div>
                    <div className="ec-actions">
                      <span onClick={() => Store.toast('Reply', 'Reply composer opened.', 'info')}><I.Reply size={10} /> Reply{c.replies > 0 ? ` (${c.replies})` : ''}</span>
                      <span onClick={() => Store.toast('Liked', '', 'ok')}><I.Heart size={10} /> Like ({c.likes})</span>
                      <span onClick={() => Store.toast('AI draft ready', 'Suggested reply: "Thanks for the thoughtful note…"', 'ok')}><I.Sparkles size={10} /> AI draft</span>
                      {c.sentiment === 'negative' && <span onClick={() => Store.toast('Escalated', 'Routed to founder for personal response.', 'warn')}><I.Flag size={10} /> Escalate</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: 12, borderTop: '1px solid var(--line-1)', background: 'var(--bg-0)' }}>
              <div style={{ position: 'relative' }}>
                <textarea placeholder="Reply as @eb1aexperts… (⏎ to send, ⇧⏎ for newline)" rows={2}
                  style={{ width: '100%', background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 6, padding: '8px 10px', paddingRight: 80, color: 'var(--text-1)', fontSize: 12, resize: 'none', outline: 'none', fontFamily: 'inherit' }} />
                <button className="btn primary sm" style={{ position: 'absolute', right: 6, bottom: 6 }}
                  onClick={() => Store.toast('Reply queued', 'Will publish after compliance review.', 'ok')}>
                  <I.Send size={11} /> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { EngagementHub });
