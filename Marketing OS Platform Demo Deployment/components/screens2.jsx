// Analytics, Daily Brief, Onboarding, Settings

const ANALYTICS_DATA = {
  '7d': {
    sub: 'Last 7 days · April 18 – April 24',
    stats: [
      { l: 'Total reach', v: '184.2K', d: '+22.4%', i: 'Eye', s: [12,18,14,22,19,28,31] },
      { l: 'Impressions', v: '486K', d: '+18.7%', i: 'Globe', s: [42,58,51,68,62,82,94] },
      { l: 'Engagement rate', v: '5.12%', d: '+0.4pt', i: 'Heart', s: [4.1,4.3,4.6,4.8,4.9,5.0,5.12], c: 'var(--teal)' },
      { l: 'New followers', v: '742', d: '+34.2%', i: 'Users', s: [62,84,71,98,104,118,142], c: 'var(--teal)' },
      { l: 'Conversions', v: '38', d: '+44.0%', i: 'Target', s: [3,4,5,4,6,7,9] },
      { l: 'Cost per lead', v: '$12.80', d: '-18%', i: 'TrendingUp', s: [16,15.5,14.8,14.2,13.6,13.1,12.8] },
    ],
    chart: {
      platform: [
        { color: 'var(--accent)', data: [42, 58, 51, 72, 68, 84, 91], fill: true },
        { color: 'var(--teal)', data: [28, 34, 42, 38, 51, 48, 62], fill: false },
        { color: 'var(--cyan)', data: [18, 22, 19, 28, 26, 34, 42], fill: false },
        { color: 'var(--magenta)', data: [8, 12, 14, 18, 22, 24, 31], fill: false },
      ],
      type: [
        { color: 'var(--accent)', data: [52, 64, 71, 68, 82, 94, 108], fill: true },
        { color: 'var(--teal)', data: [31, 38, 41, 48, 52, 61, 72], fill: false },
        { color: 'var(--cyan)', data: [12, 18, 24, 28, 36, 42, 54], fill: false },
      ],
    },
    audience: [
      { l: 'Senior tech ICs', v: 36, c: 'var(--accent)' },
      { l: 'Product managers', v: 24, c: 'var(--teal)' },
      { l: 'PhD / researchers', v: 16, c: 'var(--cyan)' },
      { l: 'Founders', v: 12, c: 'var(--magenta)' },
      { l: 'Designers', v: 8, c: 'var(--lime)' },
      { l: 'Other', v: 4, c: 'var(--text-4)' },
    ],
    mix: [
      { l: 'Carousels', v: '38%', r: '6.4%', c: 'var(--accent)' },
      { l: 'Single image', v: '22%', r: '4.2%', c: 'var(--teal)' },
      { l: 'Reels', v: '20%', r: '8.8%', c: 'var(--cyan)' },
      { l: 'Threads', v: '12%', r: '3.4%', c: 'var(--magenta)' },
      { l: 'Articles', v: '8%', r: '2.6%', c: 'var(--lime)' },
    ],
  },
  '30d': {
    sub: 'Last 30 days · March 26 – April 24',
    stats: [
      { l: 'Total reach', v: '842.4K', d: '+34.2%', i: 'Eye', s: [40,52,48,60,58,72,80,88,94,102] },
      { l: 'Impressions', v: '2.14M', d: '+28.1%', i: 'Globe', s: [100,118,124,138,142,158,174,182,198,214] },
      { l: 'Engagement rate', v: '4.82%', d: '+0.8pt', i: 'Heart', s: [3.2,3.4,3.8,4.1,4.0,4.3,4.5,4.6,4.7,4.82], c: 'var(--teal)' },
      { l: 'New followers', v: '3,241', d: '+42.1%', i: 'Users', s: [180,220,240,280,320,340,380,410,420,480], c: 'var(--teal)' },
      { l: 'Conversions', v: '184', d: '+62.4%', i: 'Target', s: [8,12,14,16,18,20,22,24,26,28] },
      { l: 'Cost per lead', v: '$14.20', d: '-22%', i: 'TrendingUp', s: [22,21,19,18,17,16,15,15,14.5,14.2] },
    ],
    chart: {
      platform: [
        { color: 'var(--accent)', data: [38, 48, 56, 62, 71, 82, 94], fill: true },
        { color: 'var(--teal)', data: [22, 28, 36, 42, 48, 54, 68], fill: false },
        { color: 'var(--cyan)', data: [14, 18, 24, 28, 34, 38, 46], fill: false },
        { color: 'var(--magenta)', data: [6, 10, 12, 16, 20, 26, 34], fill: false },
      ],
      type: [
        { color: 'var(--accent)', data: [48, 60, 68, 74, 88, 102, 118], fill: true },
        { color: 'var(--teal)', data: [28, 34, 42, 48, 56, 64, 76], fill: false },
        { color: 'var(--cyan)', data: [10, 16, 22, 28, 36, 44, 58], fill: false },
      ],
    },
    audience: [
      { l: 'Senior tech ICs', v: 34, c: 'var(--accent)' },
      { l: 'Product managers', v: 22, c: 'var(--teal)' },
      { l: 'PhD / researchers', v: 18, c: 'var(--cyan)' },
      { l: 'Founders', v: 14, c: 'var(--magenta)' },
      { l: 'Designers', v: 8, c: 'var(--lime)' },
      { l: 'Other', v: 4, c: 'var(--text-4)' },
    ],
    mix: [
      { l: 'Carousels', v: '34%', r: '6.2%', c: 'var(--accent)' },
      { l: 'Single image', v: '24%', r: '4.1%', c: 'var(--teal)' },
      { l: 'Reels', v: '18%', r: '8.4%', c: 'var(--cyan)' },
      { l: 'Threads', v: '14%', r: '3.2%', c: 'var(--magenta)' },
      { l: 'Articles', v: '10%', r: '2.8%', c: 'var(--lime)' },
    ],
  },
  '90d': {
    sub: 'Last 90 days · January 25 – April 24',
    stats: [
      { l: 'Total reach', v: '2.41M', d: '+58.6%', i: 'Eye', s: [120,148,162,184,212,248,284,322,358,402] },
      { l: 'Impressions', v: '6.82M', d: '+44.2%', i: 'Globe', s: [280,332,378,418,468,524,592,648,712,786] },
      { l: 'Engagement rate', v: '4.31%', d: '+1.2pt', i: 'Heart', s: [2.8,3.1,3.4,3.6,3.8,4.0,4.1,4.2,4.28,4.31], c: 'var(--teal)' },
      { l: 'New followers', v: '8,924', d: '+71.4%', i: 'Users', s: [420,580,620,720,820,920,1020,1180,1280,1420], c: 'var(--teal)' },
      { l: 'Conversions', v: '512', d: '+88.2%', i: 'Target', s: [22,28,34,42,48,54,62,71,82,98] },
      { l: 'Cost per lead', v: '$16.40', d: '-31%', i: 'TrendingUp', s: [28,26,24,22,20,19,18,17,16.8,16.4] },
    ],
    chart: {
      platform: [
        { color: 'var(--accent)', data: [120, 168, 218, 276, 348, 412, 488], fill: true },
        { color: 'var(--teal)', data: [82, 124, 168, 212, 248, 296, 358], fill: false },
        { color: 'var(--cyan)', data: [42, 68, 96, 128, 162, 198, 248], fill: false },
        { color: 'var(--magenta)', data: [22, 38, 58, 84, 118, 152, 196], fill: false },
      ],
      type: [
        { color: 'var(--accent)', data: [148, 198, 264, 326, 398, 478, 568], fill: true },
        { color: 'var(--teal)', data: [82, 118, 162, 208, 256, 308, 372], fill: false },
        { color: 'var(--cyan)', data: [38, 64, 96, 132, 174, 224, 286], fill: false },
      ],
    },
    audience: [
      { l: 'Senior tech ICs', v: 30, c: 'var(--accent)' },
      { l: 'Product managers', v: 21, c: 'var(--teal)' },
      { l: 'PhD / researchers', v: 20, c: 'var(--cyan)' },
      { l: 'Founders', v: 15, c: 'var(--magenta)' },
      { l: 'Designers', v: 9, c: 'var(--lime)' },
      { l: 'Other', v: 5, c: 'var(--text-4)' },
    ],
    mix: [
      { l: 'Carousels', v: '32%', r: '5.8%', c: 'var(--accent)' },
      { l: 'Single image', v: '26%', r: '3.9%', c: 'var(--teal)' },
      { l: 'Reels', v: '17%', r: '7.6%', c: 'var(--cyan)' },
      { l: 'Threads', v: '15%', r: '3.0%', c: 'var(--magenta)' },
      { l: 'Articles', v: '10%', r: '2.4%', c: 'var(--lime)' },
    ],
  },
  'YTD': {
    sub: 'Year to date · January 1 – April 24',
    stats: [
      { l: 'Total reach', v: '3.18M', d: '+124.8%', i: 'Eye', s: [80,124,168,214,268,324,388,462,548,642] },
      { l: 'Impressions', v: '9.42M', d: '+98.4%', i: 'Globe', s: [220,318,418,512,624,742,884,1024,1182,1342] },
      { l: 'Engagement rate', v: '4.18%', d: '+1.6pt', i: 'Heart', s: [2.4,2.8,3.1,3.4,3.6,3.8,3.9,4.0,4.12,4.18], c: 'var(--teal)' },
      { l: 'New followers', v: '11,642', d: '+98.2%', i: 'Users', s: [380,548,680,820,968,1120,1284,1462,1648,1854], c: 'var(--teal)' },
      { l: 'Conversions', v: '684', d: '+118.4%', i: 'Target', s: [18,28,38,48,62,78,94,118,148,184] },
      { l: 'Cost per lead', v: '$17.80', d: '-38%', i: 'TrendingUp', s: [32,30,28,26,24,22,20,19,18.4,17.8] },
    ],
    chart: {
      platform: [
        { color: 'var(--accent)', data: [80, 142, 218, 312, 418, 532, 658], fill: true },
        { color: 'var(--teal)', data: [54, 102, 156, 218, 286, 358, 442], fill: false },
        { color: 'var(--cyan)', data: [28, 58, 96, 142, 196, 256, 328], fill: false },
        { color: 'var(--magenta)', data: [12, 32, 64, 102, 152, 212, 282], fill: false },
      ],
      type: [
        { color: 'var(--accent)', data: [98, 168, 252, 348, 458, 582, 718], fill: true },
        { color: 'var(--teal)', data: [58, 102, 158, 224, 296, 376, 468], fill: false },
        { color: 'var(--cyan)', data: [22, 52, 92, 142, 198, 264, 342], fill: false },
      ],
    },
    audience: [
      { l: 'Senior tech ICs', v: 28, c: 'var(--accent)' },
      { l: 'Product managers', v: 20, c: 'var(--teal)' },
      { l: 'PhD / researchers', v: 22, c: 'var(--cyan)' },
      { l: 'Founders', v: 14, c: 'var(--magenta)' },
      { l: 'Designers', v: 10, c: 'var(--lime)' },
      { l: 'Other', v: 6, c: 'var(--text-4)' },
    ],
    mix: [
      { l: 'Carousels', v: '30%', r: '5.4%', c: 'var(--accent)' },
      { l: 'Single image', v: '28%', r: '3.6%', c: 'var(--teal)' },
      { l: 'Reels', v: '16%', r: '7.2%', c: 'var(--cyan)' },
      { l: 'Threads', v: '16%', r: '2.8%', c: 'var(--magenta)' },
      { l: 'Articles', v: '10%', r: '2.2%', c: 'var(--lime)' },
    ],
  },
};

function Analytics({ onNavigate }) {
  const [range, setRange] = React.useState('30d');
  const [chartMode, setChartMode] = React.useState('platform');
  const data = ANALYTICS_DATA[range] || ANALYTICS_DATA['30d'];
  return (
    <div className="page" style={{ maxWidth: 'none' }}>
      <div className="page-h">
        <div>
          <div className="eyebrow">Analytics</div>
          <h1>Performance</h1>
          <p>Cross-platform performance, attribution, and audience intelligence. {data.sub}.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <div className="segmented">
            {['7d', '30d', '90d', 'YTD'].map(r => (
              <button key={r} className={range === r ? 'active' : ''} onClick={() => { setRange(r); Store.toast('Range updated', ANALYTICS_DATA[r].sub, 'info'); }}>{r}</button>
            ))}
          </div>
          <button className="btn" onClick={() => Store.toast('Exporting', `Analytics CSV (${range}) is downloading…`, 'info')}><I.Download size={12} /> Export</button>
        </div>
      </div>

      <div className="stat-grid">
        {data.stats.map((s, i) => {
          const IconC = I[s.i];
          return (
            <div key={i} className="stat">
              <div className="label"><IconC size={11} /> {s.l}</div>
              <div className="value num">{s.v}</div>
              <div className={'delta ' + (s.d.startsWith('-') && s.l !== 'Cost per lead' ? 'down' : '')}>{s.d}</div>
              <div className="spark"><Sparkline data={s.s} color={s.c || 'var(--accent)'} /></div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="card">
          <div className="card-h">
            <h3>Reach & engagement over time</h3>
            <div className="segmented sm">
              <button className={chartMode === 'platform' ? 'active' : ''} onClick={() => setChartMode('platform')}>By platform</button>
              <button className={chartMode === 'type' ? 'active' : ''} onClick={() => setChartMode('type')}>By content type</button>
            </div>
          </div>
          <div className="card-b">
            <LineChart height={260} series={data.chart[chartMode]} />
          </div>
        </div>

        <div className="card">
          <div className="card-h"><h3>Top performing posts</h3></div>
          <div className="card-b flush">
            {POST_DRAFTS.slice(0, 5).map((p, i) => {
              const Pc = Platforms[p.platform];
              return (
                <div key={p.id} style={{ padding: 10, borderBottom: '1px solid var(--line-1)', display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }} onClick={() => Store.toast(p.title, `Reach ${p.reach_est} · Engagement ${p.engage_est}`, 'info')}>
                  <span className="mono muted" style={{ fontSize: 10, width: 16 }}>#{i + 1}</span>
                  <Pc />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{p.title}</div>
                    <div className="muted" style={{ fontSize: 10.5 }}>{p.reach_est} · {p.engage_est}</div>
                  </div>
                  <Sparkline data={[2,3,4,3,5,6,8,10,12]} width={40} height={18} color="var(--teal)" filled={false} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="card-h"><h3>Audience by persona</h3></div>
          <div className="card-b col" style={{ gap: 10 }}>
            {data.audience.map((s, i) => (
              <div key={i}>
                <div className="row" style={{ justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                  <span>{s.l}</span><span className="num muted">{s.v}%</span>
                </div>
                <div className="progress" style={{ height: 4 }}><div style={{ width: `${s.v * 2.5}%`, background: s.c }}></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-h"><h3>Best posting windows</h3></div>
          <div className="card-b">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(24, 1fr)', gridTemplateRows: 'repeat(7, 14px)', gap: 2 }}>
              {Array.from({ length: 7 * 24 }).map((_, i) => {
                const hour = i % 24;
                const intensity = (Math.sin(hour / 3) + 1) / 2 * (Math.random() * 0.5 + 0.5);
                return <div key={i} style={{ background: `rgba(124,92,255,${intensity * 0.9})`, borderRadius: 1 }}></div>;
              })}
            </div>
            <div className="row" style={{ justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}><span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>11 PM</span></div>
          </div>
        </div>
        <div className="card">
          <div className="card-h"><h3>Content mix</h3></div>
          <div className="card-b">
            <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', marginBottom: 14 }}>
              {data.mix.map((m, i) => (
                <div key={i} style={{ flex: parseInt(m.v), background: m.c }}></div>
              ))}
            </div>
            {data.mix.map((m, i) => (
              <div key={i} className="row" style={{ fontSize: 11.5, padding: '4px 0' }}>
                <span className="pdot" style={{ background: m.c }}></span>
                <span style={{ flex: 1 }}>{m.l}</span>
                <span className="num muted" style={{ width: 40, textAlign: 'right' }}>{m.v}</span>
                <span className="num" style={{ width: 44, textAlign: 'right', color: 'var(--teal-1)' }}>{m.r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DailyBrief({ onNavigate }) {
  return (
    <div className="page" style={{ maxWidth: 920 }}>
      <div className="page-h">
        <div>
          <div className="eyebrow">Daily Intelligence · Thursday, April 24</div>
          <h1>Morning Brief</h1>
          <p>Auto-delivered to owner@eb1aexperts.com at 7:00 AM EST. Everything that matters from the last 24 hours.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn" onClick={() => Store.toast('Email preview', 'Opening test send to owner@eb1aexperts.com', 'info')}><I.Mail size={12} /> Email preview</button>
          <button className="btn" onClick={() => Store.toast('Brief settings', 'Configure delivery time & scope', 'info')}><I.Settings size={12} /> Configure</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ padding: 24, background: 'linear-gradient(135deg, var(--bg-1), var(--violet-bg))', borderBottom: '1px solid var(--line-1)' }}>
          <div className="row" style={{ gap: 10, marginBottom: 12 }}>
            <div className="logo-mark"></div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-0)' }}>EB1A Experts — Morning Brief</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Thursday, April 24 · Generated in 3.2s · 47 signals analyzed</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-1)', lineHeight: 1.6 }}>
            One big thing: <span style={{ color: 'var(--accent-1)', fontWeight: 500 }}>USCIS released a Q1 2026 policy memo on EB1A evidence standards overnight.</span> Velocity is +312% — highest we've tracked this quarter. 2 competitors have posted; you have a 6–12 hour window to establish authority before the topic saturates.
          </div>
        </div>

        <div style={{ padding: 20 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>▸ Top 3 trends</div>
          {TRENDS.slice(0, 3).map((t, i) => (
            <div key={t.id} style={{ padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--line-1)' : '0', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 6, background: 'var(--accent-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-1)', fontSize: 13, fontWeight: 700, flex: '0 0 36px' }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, color: 'var(--text-0)', fontWeight: 500 }}>{t.topic}</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>Velocity +{t.change} · {t.window} window · {t.platforms.length} platforms</div>
              </div>
              <button className="btn sm" onClick={() => Store.openModal({ type: 'generate', prefill: { trend: t.topic, platform: t.platforms[0] } })}><I.Sparkles size={10} /> Draft</button>
            </div>
          ))}

          <div className="eyebrow" style={{ marginTop: 24, marginBottom: 10 }}>▸ Viral opportunity alerts</div>
          <div style={{ padding: 12, background: 'var(--bg-2)', borderRadius: 6, border: '1px solid var(--line-2)', marginBottom: 8 }}>
            <div className="row" style={{ gap: 8, marginBottom: 4 }}>
              <I.Zap size={12} style={{ color: 'var(--lime)' }} />
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>@priya.codes just hit 87.3K followers on LinkedIn</span>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-2)' }}>Her recent EB1A post got 2.4K reactions. 96% brand alignment, 92% audience overlap. Window is open — reach out within 48h.</div>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-2)', borderRadius: 6, border: '1px solid var(--line-2)' }}>
            <div className="row" style={{ gap: 8, marginBottom: 4 }}>
              <I.AlertTriangle size={12} style={{ color: 'var(--warn)' }} />
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>Petition Pro published 3 competing posts yesterday</span>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-2)' }}>All 3 on the "self-petition" topic we own. They're up to 4.8% engagement (+18%). Consider a response piece today.</div>
          </div>

          <div className="eyebrow" style={{ marginTop: 24, marginBottom: 10 }}>▸ Suggested content themes</div>
          <div className="grid-2">
            {[
              { h: 'Evidence architecture 101', w: 'Claim territory before Petition Pro does', fit: 94 },
              { h: 'USCIS Q1 memo — what changed', w: 'First-mover window: 6–12h', fit: 97 },
              { h: 'O-1 → EB1A decision tree', w: '+24% search volume this week', fit: 88 },
              { h: 'PM petition case study', w: 'Matches rising persona (@priya.codes)', fit: 91 },
            ].map((c, i) => (
              <div key={i} style={{ padding: 12, background: 'var(--bg-1)', border: '1px solid var(--line-1)', borderRadius: 6 }}>
                <div style={{ fontSize: 12.5, color: 'var(--text-0)', fontWeight: 500, marginBottom: 4 }}>{c.h}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 8 }}>{c.w}</div>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span className="badge accent">Fit {c.fit}</span>
                  <button className="btn sm ghost" onClick={() => Store.openModal({ type: 'generate', prefill: { trend: c.h } })}>Generate <I.ChevronRight size={10} /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="eyebrow" style={{ marginTop: 24, marginBottom: 10 }}>▸ Engagement pulse</div>
          <div style={{ padding: 14, background: 'var(--bg-2)', borderRadius: 6, border: '1px solid var(--line-2)', fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
            Your <span className="text-0">"3 pillars" LinkedIn post</span> from Tuesday crossed 18K impressions overnight — now your #2 lifetime post. The comment section has 8 high-intent queries we've drafted replies for (awaiting your approval).
            Facebook engagement is flat this week; consider pausing paid promotion there and reallocating to Instagram.
          </div>

          <div style={{ marginTop: 24, padding: 14, background: 'linear-gradient(135deg, var(--violet-bg), var(--teal-bg))', border: '1px solid var(--accent-ring)', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 12.5, color: 'var(--text-1)', marginBottom: 8 }}>The platform has already drafted 6 posts responding to today's signals. 4 are ready for your review.</div>
            <button className="btn primary" onClick={() => onNavigate && onNavigate('approval')}><I.Shield size={12} /> Open approval queue</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Onboarding() {
  const state = useStore();
  return (
    <div className="page" style={{ maxWidth: 1100 }}>
      <div className="page-h">
        <div>
          <div className="eyebrow">Knowledge Base</div>
          <h1>What the agents know about you</h1>
          <p>Uploaded once, updated continuously. Everything below feeds every draft, trend analysis, and influencer match.</p>
        </div>
        <button className="btn primary" onClick={() => Store.openModal({ type: 'upload' })}><I.Upload size={12} /> Upload documents</button>
      </div>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-h">
            <h3>Documents <span className="subtitle">14 indexed</span></h3>
            <button className="btn sm ghost" onClick={() => Store.openModal({ type: 'upload' })}><I.Plus size={11} /> Add</button>
          </div>
          <div className="card-b flush">
            {[
              { n: 'Brand_Guide_v4.2.pdf', s: '8.2 MB', t: '2 days ago', ok: true },
              { n: 'Service_Offerings_2026.docx', s: '412 KB', t: '1 week ago', ok: true },
              { n: 'ICP_Research_Q1.pdf', s: '2.1 MB', t: '1 week ago', ok: true },
              { n: 'Mission_Vision.md', s: '14 KB', t: '3 weeks ago', ok: true },
              { n: 'Case_Studies_Approved.pdf', s: '4.6 MB', t: '3 weeks ago', ok: true },
              { n: 'Competitor_Research.xlsx', s: '812 KB', t: '1 month ago', ok: true },
              { n: 'Legal_Compliance_Rules.pdf', s: '1.4 MB', t: '1 month ago', ok: true },
              { n: 'Past_Successful_Posts.csv', s: '284 KB', t: '1 month ago', ok: true },
            ].map((f, i) => (
              <div key={i} className="row" style={{ padding: '10px 14px', borderBottom: '1px solid var(--line-1)', gap: 10, cursor: 'pointer' }} onClick={() => Store.openModal({ type: 'doc-preview', doc: f })}>
                <I.FileText size={14} style={{ color: 'var(--text-3)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, color: 'var(--text-1)' }}>{f.n}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-4)' }} className="mono">{f.s} · {f.t}</div>
                </div>
                <span className="badge ok dot">Indexed</span>
              </div>
            ))}
          </div>
          <div style={{ padding: 14, borderTop: '1px solid var(--line-1)', textAlign: 'center', background: 'var(--bg-2)' }}>
            <div style={{ border: '1.5px dashed var(--line-3)', borderRadius: 8, padding: 20, color: 'var(--text-3)', fontSize: 12, cursor: 'pointer' }} onClick={() => Store.openModal({ type: 'upload' })}>
              <I.Upload size={16} style={{ marginBottom: 6 }} />
              <div>Drop PDF, DOCX, MD, or URLs here</div>
            </div>
          </div>
        </div>

        <div className="col" style={{ gap: 12 }}>
          <div className="card">
            <div className="card-h"><h3>Mission & Vision</h3><button className="btn sm ghost" onClick={() => Store.toast('Editing mission', 'Open your brand doc to edit', 'info')}><I.Edit size={11} /></button></div>
            <div className="card-b" style={{ fontSize: 12.5, color: 'var(--text-1)', lineHeight: 1.55 }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4 }}>Mission</div>
              <div style={{ marginBottom: 12 }}>Guide extraordinary professionals through evidence-based EB1A strategy and narrative development — with a 94%+ approval rate.</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4 }}>Vision</div>
              <div>Make self-petition the default, not the exception, for top-tier tech talent in the US.</div>
            </div>
          </div>

          <div className="card">
            <div className="card-h"><h3>Target personas</h3><span className="badge teal">5 active</span></div>
            <div className="card-b flush">
              {[
                { n: 'Senior Tech IC', d: 'L6-L7 engineers, 8-15y experience, considering self-petition', s: 34 },
                { n: 'Product Manager', d: 'Senior PM at Series B-D, considering O-1 → EB1A', s: 22 },
                { n: 'PhD Researcher', d: 'Recent PhD in AI/ML, industry or academic track', s: 18 },
                { n: 'Immigrant Founder', d: 'Seed-Series A founders, H-1B or O-1 holders', s: 14 },
                { n: 'Designer IC', d: 'Senior/Staff product designers with public work', s: 12 },
              ].map((p, i) => (
                <div key={i} className="row" style={{ padding: '10px 14px', gap: 10, borderBottom: '1px solid var(--line-1)', cursor: 'pointer' }} onClick={() => Store.openModal({ type: 'persona-edit', persona: p })}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 10, fontWeight: 700 }}>{p.n.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{p.n}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{p.d}</div>
                  </div>
                  <span className="mono muted" style={{ fontSize: 11 }}>{p.s}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-h"><h3>Analysis progress</h3><span className="badge ok dot">Complete</span></div>
            <div className="card-b col" style={{ gap: 8 }}>
              {[
                { l: 'Document ingestion', v: 100, m: '14 files · 2.8M tokens' },
                { l: 'Service mapping', v: 100, m: '12 offerings identified' },
                { l: 'Audience segmentation', v: 100, m: '5 personas · 94% coverage' },
                { l: 'Competitor baseline', v: 100, m: '6 accounts scraped · 12mo history' },
                { l: 'Voice profile training', v: 100, m: '284 past posts analyzed' },
                { l: 'Continuous research', v: 42, m: 'Daily scan · next 04:00 EST' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="row" style={{ justifyContent: 'space-between', fontSize: 11.5, marginBottom: 3 }}>
                    <span>{s.l}</span>
                    <span className="muted num">{s.v < 100 ? s.v + '% today' : 'Complete'}</span>
                  </div>
                  <div className="progress" style={{ height: 3 }}><div style={{ width: `${s.v}%`, background: s.v === 100 ? 'var(--teal)' : 'var(--accent)' }}></div></div>
                  <div className="muted" style={{ fontSize: 10.5, marginTop: 2 }}>{s.m}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Settings() {
  const state = useStore();
  const s = state.settings;
  const rules = [
    { k: 'requireApproval', l: 'Require approval for all posts' },
    { k: 'skipApprovalX', l: 'Skip approval for threads on X' },
    { k: 'autoReply', l: 'Auto-respond to high-intent comments' },
    { k: 'pauseOnDrop', l: 'Pause if engagement drops >20%' },
    { k: 'sundayPosting', l: 'Sunday posting' },
  ];
  return (
    <div className="page" style={{ maxWidth: 1000 }}>
      <div className="page-h">
        <div>
          <div className="eyebrow">Configuration</div>
          <h1>Brand Kit & Settings</h1>
          <p>Visual identity the agents use for every creative, plus guardrails for compliance and publishing.</p>
        </div>
        <button className="btn primary" onClick={() => Store.toast('Saved', 'Settings have been saved', 'ok')}>Save changes</button>
      </div>

      <div className="grid-2">
        <div className="col" style={{ gap: 12 }}>
          <div className="card">
            <div className="card-h"><h3>Color palette</h3></div>
            <div className="card-b">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>
                {[
                  { n: 'Primary', v: s.primaryColor },
                  { n: 'Teal', v: s.tealColor },
                  { n: 'Ink', v: '#0a0a0f' },
                  { n: 'Accent', v: '#c4f542' },
                ].map(c => (
                  <div key={c.n} style={{ cursor: 'pointer' }} onClick={() => Store.toast('Color', `${c.n} — open the Tweaks panel to swap the accent`, 'info')}>
                    <div style={{ aspectRatio: '1', background: c.v, borderRadius: 6, border: '1px solid var(--line-2)' }}></div>
                    <div style={{ fontSize: 11, color: 'var(--text-1)', marginTop: 4, fontWeight: 500 }}>{c.n}</div>
                    <div className="mono muted" style={{ fontSize: 10.5 }}>{c.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-h"><h3>Typography</h3></div>
            <div className="card-b col" style={{ gap: 10 }}>
              <div style={{ padding: 12, background: 'var(--bg-2)', borderRadius: 6 }}>
                <div style={{ fontSize: 10.5, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Display · Inter Tight Bold</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-0)', letterSpacing: '-0.02em' }}>The 3 pillars of EB1A</div>
              </div>
              <div style={{ padding: 12, background: 'var(--bg-2)', borderRadius: 6 }}>
                <div style={{ fontSize: 10.5, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Body · Inter Regular</div>
                <div style={{ fontSize: 14, color: 'var(--text-1)' }}>USCIS officers aren't looking for perfection. They're looking for evidence architecture.</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-h"><h3>Voice profile</h3><span className="badge teal">Trained</span></div>
            <div className="card-b col" style={{ gap: 10 }}>
              {[
                { l: 'Expert', v: 'Always' },
                { l: 'Conversational', v: 'Often' },
                { l: 'Data-driven', v: 'Always' },
                { l: 'Urgent / salesy', v: 'Never' },
                { l: 'Emoji in body', v: 'Never' },
                { l: 'Specific timelines', v: 'Never (compliance)' },
              ].map((r, i) => (
                <div key={i} className="row" style={{ justifyContent: 'space-between', fontSize: 12 }}>
                  <span>{r.l}</span>
                  <span className={r.v === 'Never' || r.v.startsWith('Never') ? 'text-3' : r.v === 'Always' ? 'teal' : 'text-1'} style={{ fontSize: 11 }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col" style={{ gap: 12 }}>
          <div className="card">
            <div className="card-h"><h3>Publishing rules</h3></div>
            <div className="card-b col" style={{ gap: 10 }}>
              {rules.map((r, i) => {
                const on = !!s[r.k];
                return (
                  <div key={i} className="row" style={{ justifyContent: 'space-between', fontSize: 12.5, cursor: 'pointer' }} onClick={() => Store.setSetting(r.k, !on)}>
                    <span>{r.l}</span>
                    <div style={{ width: 32, height: 18, borderRadius: 9, background: on ? 'var(--accent)' : 'var(--bg-4)', position: 'relative', transition: 'background 150ms' }}>
                      <div style={{ position: 'absolute', top: 2, left: on ? 16 : 2, width: 14, height: 14, borderRadius: '50%', background: 'white', transition: 'left 150ms' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="card-h"><h3>Connected integrations</h3></div>
            <div className="card-b flush">
              {[
                { n: 'LinkedIn', s: 'Company page · eb1a-experts', ok: true, i: 'linkedin' },
                { n: 'Instagram', s: '@eb1aexperts · Business', ok: true, i: 'instagram' },
                { n: 'Facebook', s: 'Page connected', ok: true, i: 'facebook' },
                { n: 'X (Twitter)', s: '@eb1aexperts · API v2', ok: true, i: 'x' },
                { n: 'YouTube', s: '@eb1aexperts · Studio', ok: true, i: 'youtube' },
                { n: 'Medium', s: 'Auth needed', ok: false, i: 'medium' },
                { n: 'Figma', s: 'Brand library · auto-sync', ok: true },
                { n: 'Slack', s: 'Notifications to #marketing', ok: true },
              ].map((c, i) => {
                const Pc = c.i ? Platforms[c.i] : null;
                return (
                  <div key={i} className="row" style={{ padding: '10px 14px', borderBottom: '1px solid var(--line-1)', gap: 10 }}>
                    {Pc ? <Pc /> : <div style={{ width: 22, height: 22, borderRadius: 4, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 22px' }}><I.Link size={11} /></div>}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 500 }}>{c.n}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{c.s}</div>
                    </div>
                    {c.ok ? <span className="badge ok dot">Connected</span> : <button className="btn sm" onClick={() => Store.openModal({ type: 'account-connect', account: c })}>Connect</button>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="card-h"><h3>Team</h3><button className="btn sm ghost" onClick={() => Store.openModal({ type: 'invite' })}><I.Plus size={11} /> Invite</button></div>
            <div className="card-b flush">
              {[
                { n: 'Dharma Teja', r: 'Owner · Final approver', e: 'dharma@eb1aexperts.com' },
                { n: 'John', r: 'Design & Marketing Lead', e: 'john@eb1aexperts.com' },
                { n: 'Shalini', r: 'Content Manager · Reviewer', e: 'shalini@eb1aexperts.com' },
              ].map((m, i) => (
                <div key={i} className="row" style={{ padding: '10px 14px', borderBottom: '1px solid var(--line-1)', gap: 10 }}>
                  <div className="avatar">{m.n.split(' ').map(s => s[0]).join('')}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{m.n}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{m.r} · {m.e}</div>
                  </div>
                  <button className="btn ghost icon-only sm" onClick={() => Store.toast(m.n, 'Open team-member actions', 'info')}><I.MoreH size={12} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Analytics, DailyBrief, Onboarding, Settings });
