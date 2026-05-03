// Command Center — main dashboard (hero screen)

function Sparkline({ data, color = 'var(--accent)', height = 34, width = 80, filled = true }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${height - ((v - min) / range) * (height - 4) - 2}`).join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {filled && <polygon points={areaPoints} fill={color} opacity="0.12" />}
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LineChart({ series, height = 200, showGrid = true }) {
  const width = 560;
  const padding = { top: 12, right: 12, bottom: 22, left: 34 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;
  const all = series.flatMap(s => s.data);
  const max = Math.max(...all) * 1.1;
  const min = 0;
  const range = max - min || 1;
  const len = series[0].data.length;
  const step = w / (len - 1);

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {showGrid && [0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = padding.top + h * t;
        const label = Math.round(max - max * t);
        return (
          <g key={i}>
            <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="var(--line-1)" strokeDasharray={i === 4 ? '' : '2 4'} />
            <text x={padding.left - 6} y={y + 3} textAnchor="end" fontSize="10" fill="var(--text-3)" fontFamily="var(--font-mono)">{label}</text>
          </g>
        );
      })}
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
        <text key={i} x={padding.left + step * i} y={height - 6} textAnchor="middle" fontSize="10" fill="var(--text-3)" fontFamily="var(--font-mono)">{d}</text>
      ))}
      {series.map((s, si) => {
        const pts = s.data.map((v, i) => `${padding.left + i * step},${padding.top + h - ((v - min) / range) * h}`).join(' ');
        const area = `${padding.left},${padding.top + h} ${pts} ${padding.left + w},${padding.top + h}`;
        return (
          <g key={si}>
            {s.fill && <polygon points={area} fill={s.color} opacity="0.1" />}
            <polyline points={pts} fill="none" stroke={s.color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            {s.data.map((v, i) => (
              <circle key={i} cx={padding.left + i * step} cy={padding.top + h - ((v - min) / range) * h} r="2.5" fill="var(--bg-0)" stroke={s.color} strokeWidth="1.5" />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

const DASHBOARD_RANGE = {
  '24h': {
    sub: 'Last 24 hours',
    stats: [
      { label: 'Posts in pipeline', value: '14', delta: '+8 today', icon: 'Sparkles', spark: [1,2,1,3,2,4,5] },
      { label: 'Pending approval', value: '4', delta: '2 urgent', deltaClass: 'down', icon: 'Shield', spark: [1,1,2,2,3,4,4] },
      { label: 'Scheduled today', value: '6', delta: '+2 vs yesterday', icon: 'Calendar', spark: [1,2,1,2,3,2,3], color: 'var(--teal)' },
      { label: 'Total reach (24h)', value: '32.1K', delta: '+18.2%', icon: 'Eye', spark: [2,4,3,5,4,6,8], color: 'var(--teal)' },
      { label: 'Avg engagement', value: '5.1%', delta: '+0.3pt', icon: 'Heart', spark: [4.2,4.4,4.6,4.7,4.9,5.0,5.1] },
      { label: 'Agent runs today', value: '312', delta: '24 running', icon: 'Bot', spark: [40,52,48,60,58,72,80], color: 'var(--teal)' },
    ],
    chart: { sub: 'Last 24 hours', series: [
      { color: 'var(--accent)', data: [8, 12, 9, 14, 11, 16, 21], fill: true },
      { color: 'var(--teal)', data: [5, 7, 8, 6, 9, 11, 14], fill: false },
      { color: 'var(--cyan)', data: [3, 4, 3, 5, 4, 6, 8], fill: false },
    ]},
  },
  '7d': {
    sub: 'Last 7 days',
    stats: [
      { label: 'Posts in pipeline', value: '42', delta: '+8 today', icon: 'Sparkles', spark: [3,5,4,7,6,8,10] },
      { label: 'Pending approval', value: '4', delta: '2 urgent', deltaClass: 'down', icon: 'Shield', spark: [2,3,2,4,3,4,4] },
      { label: 'Scheduled this week', value: '28', delta: '+12% vs last', icon: 'Calendar', spark: [4,5,6,5,7,6,8], color: 'var(--teal)' },
      { label: 'Total reach (7d)', value: '184.2K', delta: '+22.4%', icon: 'Eye', spark: [12,18,14,22,19,28,31], color: 'var(--teal)' },
      { label: 'Avg engagement', value: '4.8%', delta: '+0.6pt', icon: 'Heart', spark: [3.8,4.1,4.2,4.0,4.5,4.6,4.8] },
      { label: 'Agent runs today', value: '312', delta: '24 running', icon: 'Bot', spark: [40,52,48,60,58,72,80], color: 'var(--teal)' },
    ],
    chart: { sub: 'Last 7 days', series: [
      { color: 'var(--accent)', data: [42, 58, 51, 72, 68, 84, 91], fill: true },
      { color: 'var(--teal)', data: [28, 34, 42, 38, 51, 48, 62], fill: false },
      { color: 'var(--cyan)', data: [18, 22, 19, 28, 26, 34, 42], fill: false },
    ]},
  },
  '30d': {
    sub: 'Last 30 days',
    stats: [
      { label: 'Posts in pipeline', value: '184', delta: '+24 this week', icon: 'Sparkles', spark: [12,18,22,28,24,32,38] },
      { label: 'Pending approval', value: '11', delta: '4 urgent', deltaClass: 'down', icon: 'Shield', spark: [4,6,5,8,7,9,11] },
      { label: 'Scheduled this month', value: '124', delta: '+18% vs last', icon: 'Calendar', spark: [14,18,20,22,24,26,28], color: 'var(--teal)' },
      { label: 'Total reach (30d)', value: '842.4K', delta: '+34.2%', icon: 'Eye', spark: [40,52,60,72,84,98,112], color: 'var(--teal)' },
      { label: 'Avg engagement', value: '4.82%', delta: '+0.8pt', icon: 'Heart', spark: [3.4,3.8,4.1,4.3,4.5,4.7,4.82] },
      { label: 'Agent runs (30d)', value: '8,412', delta: '+42% vs last', icon: 'Bot', spark: [220,280,340,420,510,620,748], color: 'var(--teal)' },
    ],
    chart: { sub: 'Last 30 days', series: [
      { color: 'var(--accent)', data: [148, 196, 248, 312, 388, 452, 518], fill: true },
      { color: 'var(--teal)', data: [98, 142, 184, 228, 272, 318, 372], fill: false },
      { color: 'var(--cyan)', data: [58, 84, 118, 152, 188, 224, 268], fill: false },
    ]},
  },
  '90d': {
    sub: 'Last 90 days',
    stats: [
      { label: 'Posts in pipeline', value: '524', delta: '+62 this month', icon: 'Sparkles', spark: [42,68,98,142,198,268,342] },
      { label: 'Avg pending', value: '8', delta: 'Down from 14', icon: 'Shield', spark: [14,12,11,10,9,8,8] },
      { label: 'Scheduled (90d)', value: '362', delta: '+28% vs prev', icon: 'Calendar', spark: [42,58,72,88,104,122,142], color: 'var(--teal)' },
      { label: 'Total reach (90d)', value: '2.41M', delta: '+58.6%', icon: 'Eye', spark: [120,168,232,308,398,498,612], color: 'var(--teal)' },
      { label: 'Avg engagement', value: '4.31%', delta: '+1.2pt', icon: 'Heart', spark: [2.8,3.2,3.5,3.8,4.0,4.2,4.31] },
      { label: 'Agent runs (90d)', value: '24.2K', delta: '+88% vs prev', icon: 'Bot', spark: [620,920,1240,1620,2080,2580,3120], color: 'var(--teal)' },
    ],
    chart: { sub: 'Last 90 days', series: [
      { color: 'var(--accent)', data: [320, 488, 668, 884, 1142, 1432, 1748], fill: true },
      { color: 'var(--teal)', data: [212, 332, 468, 612, 778, 964, 1182], fill: false },
      { color: 'var(--cyan)', data: [122, 198, 296, 412, 548, 712, 902], fill: false },
    ]},
  },
};

function Dashboard({ onNavigate }) {
  const state = useStore();
  const posts = state.posts;
  const pendingCount = posts.filter(p => p.status === 'pending_review').length;
  const approvedCount = posts.filter(p => p.status === 'approved').length;
  const [range, setRange] = React.useState('7d');
  const data = DASHBOARD_RANGE[range] || DASHBOARD_RANGE['7d'];
  const stats = data.stats;

  return (
    <div className="page">
      <div className="page-h">
        <div>
          <div className="eyebrow">Command Center</div>
          <h1>Good afternoon, Dharma.</h1>
          <p>Your agents generated 14 posts overnight, caught 3 trending topics, and flagged 2 compliance issues. 4 posts are waiting for your review.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <div className="segmented">
            {['24h', '7d', '30d', '90d'].map(r => (
              <button key={r} className={range === r ? 'active' : ''} onClick={() => { setRange(r); Store.toast('Range changed', DASHBOARD_RANGE[r].sub, 'info'); }}>{r}</button>
            ))}
          </div>
          <button className="btn" onClick={() => Store.toast('Export started', 'CSV will download shortly', 'ok')}><I.Download size={12} /> Export</button>
          <button className="btn primary" onClick={() => Store.openModal({ type: 'generate' })}><I.Sparkles size={12} /> Generate posts</button>
        </div>
      </div>

      <div className="stat-grid">
        {stats.map((s, i) => {
          const IconC = I[s.icon];
          return (
            <div key={i} className="stat">
              <div className="label"><IconC size={11} /> {s.label}</div>
              <div className="value num">{s.value}</div>
              <div className={'delta ' + (s.deltaClass || '')}>{s.delta}</div>
              <div className="spark"><Sparkline data={s.spark} color={s.color || 'var(--accent)'} /></div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="card">
          <div className="card-h">
            <div>
              <h3>Reach across platforms <span className="subtitle">{data.chart.sub}</span></h3>
            </div>
            <div className="row" style={{ gap: 12 }}>
              <span style={{ fontSize: 11, color: 'var(--text-2)' }}><span className="pdot" style={{ background: 'var(--accent)' }}></span>LinkedIn</span>
              <span style={{ fontSize: 11, color: 'var(--text-2)' }}><span className="pdot" style={{ background: 'var(--teal)' }}></span>Instagram</span>
              <span style={{ fontSize: 11, color: 'var(--text-2)' }}><span className="pdot" style={{ background: 'var(--cyan)' }}></span>X</span>
            </div>
          </div>
          <div className="card-b">
            <LineChart series={data.chart.series} />
          </div>
        </div>

        <div className="card">
          <div className="card-h">
            <h3>Agent throughput</h3>
            <span className="badge teal dot">Healthy</span>
          </div>
          <div className="card-b col">
            {[
              { name: 'Research & Trends', runs: 84, color: 'var(--accent)', icon: 'Search' },
              { name: 'Copy Generator', runs: 62, color: 'var(--teal)', icon: 'Edit' },
              { name: 'Creative Engine', runs: 48, color: 'var(--cyan)', icon: 'Image' },
              { name: 'Reviewer Stack', runs: 71, color: 'var(--magenta)', icon: 'Shield' },
              { name: 'Publisher', runs: 28, color: 'var(--lime)', icon: 'Send' },
              { name: 'Influencer Scout', runs: 19, color: 'var(--amber)', icon: 'Users' },
            ].map((a, i) => {
              const IconC = I[a.icon];
              return (
                <div key={i}>
                  <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                    <span className="row" style={{ gap: 6 }}><IconC size={12} style={{ color: a.color }} /> {a.name}</span>
                    <span className="mono muted">{a.runs}</span>
                  </div>
                  <div className="progress" style={{ height: 3 }}>
                    <div style={{ width: `${a.runs}%`, background: a.color }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="card">
          <div className="card-h">
            <h3>Needs your review</h3>
            <button className="btn sm ghost" onClick={() => onNavigate && onNavigate('approval')}>Open queue <I.ChevronRight size={11} /></button>
          </div>
          <div className="card-b flush">
            {posts.filter(p => p.status === 'pending_review').slice(0, 3).map(p => {
              const Plat = Platforms[p.platform];
              return (
                <div key={p.id} style={{ padding: 12, borderBottom: '1px solid var(--line-1)', display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => onNavigate && onNavigate('approval')}>
                  <Plat />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="row" style={{ gap: 6, marginBottom: 3 }}>
                      <span style={{ fontSize: 12, color: 'var(--text-0)', fontWeight: 500 }}>{p.title}</span>
                    </div>
                    <div className="row" style={{ gap: 8, fontSize: 11, color: 'var(--text-3)' }}>
                      <span className="mono">{p.type}</span>
                      <span>·</span>
                      <span>{p.generated}</span>
                      <span>·</span>
                      <span>Score {p.score}</span>
                      <span>·</span>
                      <span>{p.reach_est} est. reach</span>
                    </div>
                  </div>
                  <button className="btn sm" onClick={(e) => { e.stopPropagation(); onNavigate && onNavigate('approval'); }}><I.Eye size={11} /> Review</button>
                </div>
              );
            })}
            {!posts.filter(p => p.status === 'pending_review').length && (
              <div style={{ padding: 28, textAlign: 'center', color: 'var(--text-3)', fontSize: 12 }}>Nothing pending — queue is clear.</div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-h">
            <h3>Trending now <span className="subtitle">Opportunity signals</span></h3>
            <button className="btn sm ghost" onClick={() => onNavigate && onNavigate('trends')}>All trends <I.ChevronRight size={11} /></button>
          </div>
          <div className="card-b flush">
            {TRENDS.slice(0, 4).map(t => (
              <div key={t.id} style={{ padding: 12, borderBottom: '1px solid var(--line-1)', cursor: 'pointer' }} onClick={() => Store.openModal({ type: 'generate', prefill: { trend: t.topic, platform: t.platforms[0] } })}>
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                  <div className="row" style={{ gap: 8 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-0)', fontWeight: 500 }}>{t.topic}</span>
                    {t.opportunity === 'high' && <span className="badge accent dot">High</span>}
                  </div>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--ok)' }}>{t.change}</span>
                </div>
                <div className="row" style={{ gap: 8, fontSize: 11, color: 'var(--text-3)' }}>
                  <div className="row" style={{ gap: 3 }}>
                    {t.platforms.map(p => {
                      const Pc = Platforms[p];
                      return <span key={p} style={{ transform: 'scale(0.75)', transformOrigin: 'left' }}><Pc /></span>;
                    })}
                  </div>
                  <span style={{ marginLeft: 'auto' }}>velocity {t.velocity}</span>
                  <span>·</span>
                  <span>{t.window}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-h">
          <h3>Connected accounts</h3>
          <button className="btn sm ghost" onClick={() => Store.toast('Add account', 'Pick a platform from the list below', 'info')}><I.Plus size={11} /> Add account</button>
        </div>
        <div className="card-b flush">
          <table className="tbl">
            <thead>
              <tr>
                <th>Platform</th><th>Handle</th><th>Followers</th><th>7d growth</th><th>Posts (7d)</th><th>Engagement</th><th>Health</th><th></th>
              </tr>
            </thead>
            <tbody>
              {ACCOUNTS.map(a => {
                const Pc = Platforms[a.id];
                return (
                  <tr key={a.id}>
                    <td><div className="row" style={{ gap: 8 }}><Pc /><span className="text-0" style={{ fontWeight: 500 }}>{a.label}</span></div></td>
                    <td className="muted mono">{a.handle}</td>
                    <td className="num">{a.followers.toLocaleString()}</td>
                    <td><span style={{ color: 'var(--ok)' }}>{a.growth}</span></td>
                    <td className="num">{Math.floor(Math.random() * 10) + 3}</td>
                    <td className="num">{(Math.random() * 4 + 2).toFixed(1)}%</td>
                    <td><span className="badge ok dot">Connected</span></td>
                    <td><button className="btn ghost icon-only sm" onClick={() => Store.openModal({ type: 'account-connect', account: a })}><I.MoreH size={12} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard, Sparkline, LineChart });
