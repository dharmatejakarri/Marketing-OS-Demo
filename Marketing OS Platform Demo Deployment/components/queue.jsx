// Content Queue — AI drafts pipeline with agent steps

function AgentStep({ label, status, meta, icon }) {
  const IconC = I[icon];
  const color = status === 'done' ? 'var(--ok)' : status === 'running' ? 'var(--accent-1)' : status === 'fail' ? 'var(--err)' : 'var(--text-4)';
  return (
    <div className="row" style={{ gap: 10, padding: '8px 12px', borderBottom: '1px solid var(--line-1)' }}>
      <div style={{ width: 20, height: 20, borderRadius: 4, background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color, flex: '0 0 20px' }}>
        {status === 'done' ? <I.Check size={12} /> : status === 'running' ? <I.Refresh size={12} /> : IconC ? <IconC size={12} /> : <I.Clock size={12} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{label}</div>
        {meta && <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{meta}</div>}
      </div>
      {status === 'running' && <div className="badge accent dot">Running</div>}
      {status === 'done' && <span className="mono muted" style={{ fontSize: 11 }}>2.4s</span>}
    </div>
  );
}

function ContentQueue({ onOpenPost }) {
  const state = useStore();
  const posts = state.posts;
  const [filter, setFilter] = React.useState('all');
  const [view, setView] = React.useState('grid');
  const [search, setSearch] = React.useState('');
  const [platformFilter, setPlatformFilter] = React.useState(null);

  const counts = {
    all: posts.length,
    generating: 3,
    pending_review: posts.filter(p => p.status === 'pending_review').length,
    approved: posts.filter(p => p.status === 'approved').length,
    rejected: posts.filter(p => p.status === 'rejected').length,
  };

  let filtered = filter === 'all' ? posts : posts.filter(p => p.status === filter);
  if (platformFilter) filtered = filtered.filter(p => p.platform === platformFilter);
  if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page">
      <div className="page-h">
        <div>
          <div className="eyebrow">Content</div>
          <h1>Content Queue</h1>
          <p>AI-drafted posts across all platforms. Agents are continuously generating based on live trends, keyword intelligence, and your brand voice.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <I.Search size={11} style={{ position: 'absolute', left: 9, top: 8, color: 'var(--text-3)' }} />
            <input placeholder="Search drafts" value={search} onChange={e => setSearch(e.target.value)} style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 6, padding: '6px 10px 6px 26px', fontSize: 12, color: 'var(--text-1)', outline: 'none', width: 160 }} />
          </div>
          <select value={platformFilter || ''} onChange={e => setPlatformFilter(e.target.value || null)} className="btn" style={{ paddingRight: 28 }}>
            <option value="">All platforms</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
            <option value="x">X</option>
            <option value="facebook">Facebook</option>
          </select>
          <button className="btn" onClick={() => { posts.forEach(p => p.status === 'pending_review' && Store.regeneratePost(p.id)); }}><I.Refresh size={12} /> Regenerate all</button>
          <button className="btn primary" onClick={() => Store.openModal({ type: 'generate' })}><I.Sparkles size={12} /> New draft</button>
        </div>
      </div>

      <div className="row" style={{ gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: 'All drafts' },
          { id: 'generating', label: 'Generating' },
          { id: 'pending_review', label: 'Pending review' },
          { id: 'approved', label: 'Approved' },
          { id: 'rejected', label: 'Rejected' },
        ].map(t => (
          <button key={t.id}
                  onClick={() => setFilter(t.id)}
                  className={'btn sm' + (filter === t.id ? ' primary' : '')}>
            {t.label}
            <span style={{
              background: filter === t.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-3)',
              padding: '0 5px', borderRadius: 8, fontSize: 10, marginLeft: 4,
              color: filter === t.id ? 'white' : 'var(--text-3)',
            }}>{counts[t.id]}</span>
          </button>
        ))}
        <div style={{ flex: 1 }}></div>
        <div className="segmented">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><I.Grid size={11} /></button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><I.List size={11} /></button>
        </div>
      </div>

      {/* Live generation card */}
      <div className="card" style={{ marginBottom: 16, background: 'linear-gradient(135deg, var(--bg-1), var(--violet-bg))', borderColor: 'var(--violet-ring)' }}>
        <div className="card-h" style={{ borderBottom: '1px solid var(--line-1)' }}>
          <h3>
            <I.Sparkles size={13} style={{ color: 'var(--accent-1)', marginRight: 6 }} />
            Currently generating
            <span className="badge live" style={{ marginLeft: 8 }}>3 in progress</span>
          </h3>
          <span className="mono muted" style={{ fontSize: 11 }}>Trend: USCIS Q1 policy memo · +312%</span>
        </div>
        <div className="card-b flush">
          <AgentStep icon="Search" label="Scanning trend cluster — USCIS Q1 policy memo" status="done" meta="1,847 posts analyzed across LinkedIn, X, Medium · 42 keyword candidates" />
          <AgentStep icon="Target" label="Competitor snapshot — how 6 competitors covered this topic" status="done" meta="Petition Pro (3 posts, 4.8% eng), GreenCard.io (2 posts, 3.4% eng)…" />
          <AgentStep icon="Users" label="Mapping to personas — best fit: Senior IC, PM, Researcher" status="done" meta="Top persona: Senior tech IC considering self-petition (engagement probability 0.84)" />
          <AgentStep icon="Edit" label="Drafting copy for LinkedIn, Instagram, X" status="running" meta="LinkedIn carousel (234w) complete · Instagram reel script writing · X thread queued" />
          <AgentStep icon="Image" label="Rendering creatives — static + reel + carousel" status="queued" meta="Brand kit v2 · 9:16, 1:1, 1080×1350 · 3 variants per format" />
          <AgentStep icon="Shield" label="Multi-layer review — editorial, brand, compliance, design, format, engagement" status="queued" meta="Runs automatically after all creatives complete" />
        </div>
      </div>

      {view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
          {filtered.map(p => <PostCard key={p.id} post={p} onClick={() => onOpenPost && onOpenPost(p.id)} />)}
          {!filtered.length && <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-3)', fontSize: 13, gridColumn: '1/-1', border: '1px dashed var(--line-2)', borderRadius: 8 }}>No drafts match. <button className="btn sm primary" style={{ marginLeft: 8 }} onClick={() => Store.openModal({ type: 'generate' })}>Generate one</button></div>}
        </div>
      ) : (
        <div className="card"><div className="card-b flush">
          <table className="tbl">
            <thead>
              <tr><th>Status</th><th>Platform</th><th>Title</th><th>Type</th><th>Score</th><th>Est. reach</th><th>Generated</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const Pc = Platforms[p.platform];
                return (
                  <tr key={p.id} onClick={() => onOpenPost && onOpenPost(p.id)} style={{ cursor: 'default' }}>
                    <td><StatusBadge status={p.status} /></td>
                    <td><div className="row" style={{ gap: 6 }}><Pc /></div></td>
                    <td className="text-0">{p.title}</td>
                    <td className="muted mono">{p.type}</td>
                    <td className="num">{p.score}</td>
                    <td className="num">{p.reach_est}</td>
                    <td className="muted">{p.generated}</td>
                    <td><button className="btn sm ghost" onClick={(e) => { e.stopPropagation(); onOpenPost && onOpenPost(p.id); }}><I.ChevronRight size={11} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div></div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === 'pending_review') return <span className="badge warn dot">Pending</span>;
  if (status === 'approved') return <span className="badge ok dot">Approved</span>;
  if (status === 'rejected') return <span className="badge err dot">Rejected</span>;
  if (status === 'generating') return <span className="badge accent dot">Generating</span>;
  return <span className="badge">{status}</span>;
}

function PostCard({ post, onClick }) {
  const Pc = Platforms[post.platform];
  return (
    <div className="card" onClick={onClick} style={{ cursor: 'default', transition: 'border-color 150ms' }}
         onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--line-3)'}
         onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}>
      <div style={{ padding: 12, borderBottom: '1px solid var(--line-1)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Pc />
        <span className="mono muted" style={{ fontSize: 11 }}>{post.type}</span>
        <div style={{ flex: 1 }}></div>
        <StatusBadge status={post.status} />
      </div>

      {/* Preview thumbnail */}
      <div style={{
        aspectRatio: post.type === 'reel' ? '9/16' : post.type === 'carousel' && post.platform === 'instagram' ? '4/5' : '16/9',
        maxHeight: 180,
        background: 'linear-gradient(135deg, var(--bg-2), var(--bg-3))',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid var(--line-1)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 20% 30%, var(--violet-bg), transparent 60%), radial-gradient(circle at 80% 70%, var(--teal-bg), transparent 60%)`,
        }}></div>
        <div style={{
          position: 'absolute', inset: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-1)' }}>
            EB1A EXPERTS
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-0)', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
            {post.title}
          </div>
        </div>
        {post.type === 'reel' && (
          <div style={{ position: 'absolute', bottom: 8, right: 8, width: 22, height: 22, background: 'rgba(0,0,0,0.6)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <I.Play size={10} style={{ color: 'white', marginLeft: 1 }} />
          </div>
        )}
      </div>

      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 12, color: 'var(--text-1)', marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
          {post.body}
        </div>
        <div className="row" style={{ gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
          {post.hashtags.slice(0, 3).map(h => (
            <span key={h} className="mono" style={{ fontSize: 10.5, color: 'var(--teal-1)' }}>{h}</span>
          ))}
        </div>
        <div className="row" style={{ justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--line-1)', fontSize: 11, color: 'var(--text-3)' }}>
          <div className="row" style={{ gap: 10 }}>
            <span><I.Target size={10} style={{ marginRight: 3, verticalAlign: '-1px' }} />{post.score}</span>
            <span><I.Eye size={10} style={{ marginRight: 3, verticalAlign: '-1px' }} />{post.reach_est}</span>
            <span><I.Heart size={10} style={{ marginRight: 3, verticalAlign: '-1px' }} />{post.engage_est}</span>
          </div>
          <span>{post.generated}</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ContentQueue, PostCard, StatusBadge, AgentStep });
