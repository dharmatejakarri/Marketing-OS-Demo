// Shell — topbar (search, bell, avatar all wired), sidenav, activity feed (filterable + 3-dot menu)

const NAV = [
  { group: 'Workspace' },
  { id: 'dashboard', label: 'Command Center', icon: 'Dashboard', kbd: '⌘1' },
  { id: 'queue', label: 'Content Queue', icon: 'Sparkles', kbd: '⌘2', badge: 12 },
  { id: 'approval', label: 'Review & Approve', icon: 'Shield', kbd: '⌘3', badge: 4 },
  { id: 'calendar', label: 'Calendar', icon: 'Calendar', kbd: '⌘4' },
  { id: 'engagement', label: 'Engagement Hub', icon: 'MessageCircle', kbd: '⌘5', badge: 28 },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart', kbd: '⌘6' },
  { group: 'Intelligence' },
  { id: 'trends', label: 'Trends & Competitors', icon: 'TrendingUp' },
  { id: 'influencers', label: 'Influencer Engine', icon: 'Users' },
  { id: 'daily', label: 'Daily Brief', icon: 'Mail' },
  { id: 'reports', label: 'Email Reports', icon: 'Send' },
  { group: 'Setup' },
  { id: 'onboarding', label: 'Knowledge Base', icon: 'Book' },
  { id: 'integrations', label: 'Integrations', icon: 'Link' },
  { id: 'settings', label: 'Brand Kit & Settings', icon: 'Settings' },
];

// Searchable index for the top-bar search
const SEARCH_INDEX = [
  // Pages
  { kind: 'page', id: 'dashboard', label: 'Command Center', meta: 'Workspace · Dashboard', icon: 'Dashboard' },
  { kind: 'page', id: 'queue', label: 'Content Queue', meta: 'Workspace · 12 drafts', icon: 'Sparkles' },
  { kind: 'page', id: 'approval', label: 'Review & Approve', meta: 'Workspace · 4 pending', icon: 'Shield' },
  { kind: 'page', id: 'calendar', label: 'Calendar', meta: 'Workspace · Schedule', icon: 'Calendar' },
  { kind: 'page', id: 'engagement', label: 'Engagement Hub', meta: 'Workspace · 28 unread', icon: 'MessageCircle' },
  { kind: 'page', id: 'analytics', label: 'Analytics', meta: 'Workspace · Performance', icon: 'BarChart' },
  { kind: 'page', id: 'trends', label: 'Trends & Competitors', meta: 'Intelligence', icon: 'TrendingUp' },
  { kind: 'page', id: 'influencers', label: 'Influencer Engine', meta: 'Intelligence · 2,140 scanned', icon: 'Users' },
  { kind: 'page', id: 'daily', label: 'Daily Brief', meta: 'Intelligence · 06:00 EST', icon: 'Mail' },
  { kind: 'page', id: 'reports', label: 'Email Reports', meta: 'Intelligence · 8 templates', icon: 'Send' },
  { kind: 'page', id: 'onboarding', label: 'Knowledge Base', meta: 'Setup', icon: 'Book' },
  { kind: 'page', id: 'integrations', label: 'Integrations', meta: 'Setup · GA4, Semrush, Ahrefs', icon: 'Link' },
  { kind: 'page', id: 'settings', label: 'Brand Kit & Settings', meta: 'Setup', icon: 'Settings' },
  // Actions
  { kind: 'action', id: 'generate', label: 'Generate new draft…', meta: 'Action · ⌘N', icon: 'Sparkles' },
  { kind: 'action', id: 'upload', label: 'Upload knowledge document', meta: 'Action', icon: 'Upload' },
  { kind: 'action', id: 'invite', label: 'Invite teammate', meta: 'Action', icon: 'UserPlus' },
  { kind: 'action', id: 'compose-email', label: 'Compose email blast', meta: 'Action', icon: 'Send' },
  // People
  { kind: 'person', id: 'p1', label: 'Priya Menon', meta: '@priya.codes · LinkedIn · 87.3K', icon: 'User', target: 'influencers' },
  { kind: 'person', id: 'p2', label: 'Wei Zhang', meta: '@faang.staffeng · LinkedIn · 78.4K', icon: 'User', target: 'influencers' },
  { kind: 'person', id: 'p3', label: 'Dr. Sebastian Müller', meta: '@mlpaper.daily · X · 94.2K', icon: 'User', target: 'influencers' },
  { kind: 'person', id: 'p4', label: 'Camila Reyes', meta: '@eb1a.stories · IG · 41.8K · 99 align', icon: 'User', target: 'influencers' },
  // Posts
  { kind: 'post', id: 'po1', label: 'EB1A self-petition framework', meta: 'LinkedIn · pending review', icon: 'FileText', target: 'approval' },
  { kind: 'post', id: 'po2', label: 'AI researcher NIW pathway', meta: 'X thread · scheduled tomorrow 9:15 AM', icon: 'FileText', target: 'queue' },
  { kind: 'post', id: 'po3', label: 'O-1 vs EB1A — when each makes sense', meta: 'Carousel · LinkedIn · approved', icon: 'FileText', target: 'queue' },
  { kind: 'post', id: 'po4', label: 'Premium processing delays — what to do', meta: 'LinkedIn · draft', icon: 'FileText', target: 'queue' },
  // Trends
  { kind: 'trend', id: 'tr1', label: 'EB1A vs O-1A self-petition', meta: 'Trend · velocity 92 · +47%', icon: 'TrendingUp', target: 'trends' },
  { kind: 'trend', id: 'tr2', label: '#greencardjourney', meta: 'Trend · velocity 78 · +38%', icon: 'TrendingUp', target: 'trends' },
];

function TopBar({ route, onNavigate, onToggleFeed, feedOn }) {
  const state = useStore();
  const [searchQ, setSearchQ] = React.useState('');
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [accountOpen, setAccountOpen] = React.useState(false);
  const searchRef = React.useRef(null);
  const accountRef = React.useRef(null);

  // Close on outside click
  React.useEffect(() => {
    const onDoc = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
      if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const results = React.useMemo(() => {
    const q = searchQ.trim().toLowerCase();
    if (!q) return SEARCH_INDEX.slice(0, 8);
    return SEARCH_INDEX.filter(r => r.label.toLowerCase().includes(q) || r.meta.toLowerCase().includes(q)).slice(0, 12);
  }, [searchQ]);

  const grouped = React.useMemo(() => {
    const g = {};
    for (const r of results) { (g[r.kind] = g[r.kind] || []).push(r); }
    return g;
  }, [results]);

  const labelFor = (k) => ({ page: 'Pages', action: 'Actions', person: 'People', post: 'Posts', trend: 'Trends' }[k] || k);

  const goto = (r) => {
    setSearchOpen(false); setSearchQ('');
    if (r.kind === 'action') {
      if (r.id === 'generate') Store.openModal({ type: 'generate' });
      else if (r.id === 'upload') Store.openModal({ type: 'upload' });
      else if (r.id === 'invite') Store.openModal({ type: 'invite' });
      else if (r.id === 'compose-email') Store.openModal({ type: 'compose-email', manual: true });
      return;
    }
    onNavigate(r.target || r.id);
  };

  const unread = (state.notifications || []).filter(n => n.unread).length;

  return (
    <div className="topbar">
      <div className="logo" style={{ cursor: 'pointer' }} onClick={() => onNavigate('dashboard')}>
        <div className="logo-mark"></div>
        <span>EB1A Experts</span>
        <span style={{ color: 'var(--text-4)', fontWeight: 400, fontSize: 11, marginLeft: 6 }}>/ Marketing OS</span>
      </div>

      <div className="topbar-search" ref={searchRef} style={{ position: 'relative' }}>
        <I.Search size={14} className="s-icon" style={{ position: 'absolute', left: 9, top: 7, color: 'var(--text-3)', pointerEvents: 'none' }} />
        <input
          placeholder="Search posts, people, trends, actions…"
          value={searchQ}
          onChange={(e) => { setSearchQ(e.target.value); setSearchOpen(true); }}
          onFocus={() => setSearchOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') { setSearchOpen(false); e.target.blur(); }
            if (e.key === 'Enter' && results[0]) { goto(results[0]); e.target.blur(); }
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); Store.toggleCommand(true); setSearchOpen(false); }
          }}
        />
        <span className="s-kbd">⌘K</span>

        {searchOpen && (
          <div className="search-dropdown">
            {results.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-3)', fontSize: 12.5 }}>
                No matches for "{searchQ}". Try the command palette (⌘K) for fuzzy search.
              </div>
            )}
            {Object.keys(grouped).map(k => (
              <div key={k}>
                <div className="search-group-label">{labelFor(k)}</div>
                {grouped[k].map(r => {
                  const Ic = I[r.icon] || I.FileText;
                  return (
                    <div key={r.kind + r.id} className="search-result" onClick={() => goto(r)}>
                      <Ic size={13} style={{ color: 'var(--text-3)', flex: '0 0 13px' }} />
                      <span className="sr-label">{r.label}</span>
                      <span className="sr-meta">{r.meta}</span>
                    </div>
                  );
                })}
              </div>
            ))}
            <div className="search-foot">
              <span><kbd>↵</kbd> select</span>
              <span><kbd>esc</kbd> close</span>
              <span style={{ marginLeft: 'auto' }} onClick={() => { setSearchOpen(false); Store.toggleCommand(true); }}><kbd>⌘K</kbd> open command palette</span>
            </div>
          </div>
        )}
      </div>

      <div className="row" style={{ gap: 8 }}>
        <div className="badge live" style={{ whiteSpace: 'nowrap' }}>Agents live</div>
        <button className="btn ghost icon-only" title="Notifications" onClick={() => Store.openModal({ type: 'notifications' })} style={{ position: 'relative' }}>
          <I.Bell size={14} />
          {unread > 0 && <span style={{ position: 'absolute', top: 2, right: 2, minWidth: 14, height: 14, padding: '0 3px', borderRadius: 7, background: 'var(--err)', color: 'white', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>{unread}</span>}
        </button>
        <button className={'btn ghost icon-only'} onClick={onToggleFeed} title="Toggle activity feed" style={feedOn ? { color: 'var(--accent-1)' } : {}}>
          <I.Activity size={14} />
        </button>
        <div ref={accountRef} style={{ position: 'relative' }}>
          <div className="avatar sm" style={{ cursor: 'pointer' }} onClick={() => setAccountOpen(!accountOpen)}>DT</div>
          {accountOpen && (
            <div className="account-menu">
              <div className="am-head">
                <div className="avatar md">DT</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="am-name">Dharma Teja</div>
                  <div className="am-handle">dharma@eb1aexperts.com</div>
                  <div className="row" style={{ gap: 6, marginTop: 4 }}>
                    <span className="badge accent" style={{ fontSize: 10 }}>Admin</span>
                    <span className="badge" style={{ fontSize: 10 }}>EB1A Experts · Pro</span>
                  </div>
                </div>
              </div>
              <div className="am-section">
                <div className="am-item" onClick={() => { setAccountOpen(false); onNavigate('settings'); }}><I.Settings size={13} /> Brand kit & settings</div>
                <div className="am-item" onClick={() => { setAccountOpen(false); onNavigate('onboarding'); }}><I.Book size={13} /> Knowledge base</div>
                <div className="am-item" onClick={() => { setAccountOpen(false); onNavigate('integrations'); }}><I.Link size={13} /> Integrations</div>
                <div className="am-item" onClick={() => { setAccountOpen(false); Store.openModal({ type: 'invite' }); }}><I.UserPlus size={13} /> Invite teammate <span className="kbd" style={{ marginLeft: 'auto' }}>⌘I</span></div>
              </div>
              <div className="am-section">
                <div className="am-item" onClick={() => { setAccountOpen(false); Store.toast('Theme switched', 'Light mode coming soon', 'info'); }}><I.Sun size={13} /> Appearance: Dark</div>
                <div className="am-item" onClick={() => { setAccountOpen(false); Store.toast('Help', 'Docs at help.eb1aexperts.com', 'info'); }}><I.HelpCircle size={13} /> Help & docs</div>
                <div className="am-item" onClick={() => { setAccountOpen(false); Store.toast('Keyboard shortcuts', 'Press ? anywhere', 'info'); }}><I.Command size={13} /> Keyboard shortcuts <span className="kbd" style={{ marginLeft: 'auto' }}>?</span></div>
              </div>
              <div className="am-section am-foot">
                <div className="am-item" onClick={() => { setAccountOpen(false); Store.toast('Workspace switcher', 'Only 1 workspace on this plan', 'info'); }}><I.Refresh size={13} /> Switch workspace</div>
                <div className="am-item danger" onClick={() => { setAccountOpen(false); Store.toast('Signed out', 'See you tomorrow.', 'ok'); }}><I.LogOut size={13} /> Sign out</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SideNav({ route, onNavigate, collapsed }) {
  return (
    <div className="sidenav">
      {NAV.map((item, i) => {
        if (item.group) {
          return collapsed ? <div key={i} style={{ height: 10 }}></div> : <div key={i} className="nav-group">{item.group}</div>;
        }
        const IconComp = I[item.icon];
        const active = route === item.id;
        return (
          <div key={item.id}
               className={'nav-item' + (active ? ' active' : '')}
               onClick={() => onNavigate(item.id)}
               title={collapsed ? item.label : undefined}
               style={collapsed ? { justifyContent: 'center', padding: '6px' } : undefined}>
            {IconComp && <IconComp size={15} className="icon" />}
            {!collapsed && <span>{item.label}</span>}
            {!collapsed && (item.badge ? <span className="badge">{item.badge}</span> : item.kbd ? <span className="kbd">{item.kbd}</span> : null)}
          </div>
        );
      })}
      <div style={{ flex: 1 }}></div>
      {!collapsed && <div style={{
        margin: '10px 4px 4px', padding: 10,
        background: 'linear-gradient(135deg, var(--violet-bg), var(--teal-bg))',
        border: '1px solid var(--line-2)', borderRadius: 8, fontSize: 11.5,
      }}>
        <div className="row" style={{ gap: 6, marginBottom: 6 }}>
          <I.Zap size={12} style={{ color: 'var(--accent-1)' }} />
          <span style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 12 }}>Agent usage</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 6 }}>4,231 / 10,000 runs</div>
        <div className="progress"><div style={{ width: '42%' }}></div></div>
      </div>}
    </div>
  );
}

function ActivityFeed() {
  const [filter, setFilter] = React.useState('all');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const iconFor = (tool) => {
    const map = {
      research: 'Search', generator: 'Sparkles', writer: 'Edit', reviewer: 'Shield',
      scheduler: 'Calendar', competitor: 'Target', report: 'Mail', influencer: 'Users',
    };
    const key = map[tool] || 'Bot';
    const C = I[key];
    return <C size={14} />;
  };

  const items = AGENT_FEED.filter(ev => {
    if (filter === 'all') return true;
    if (filter === 'running') return ev.running;
    if (filter === 'errors') return ev.error || ev.action.toLowerCase().includes('fail') || ev.action.toLowerCase().includes('error') || ev.action.toLowerCase().includes('blocked');
    return true;
  });

  const counts = {
    all: AGENT_FEED.length,
    running: AGENT_FEED.filter(ev => ev.running).length,
    errors: AGENT_FEED.filter(ev => ev.error || ev.action.toLowerCase().includes('fail') || ev.action.toLowerCase().includes('error') || ev.action.toLowerCase().includes('blocked')).length,
  };

  return (
    <div className="feed">
      <div className="feed-h">
        <h3>
          <I.Activity size={13} style={{ color: 'var(--accent-1)' }} />
          Agent Activity
          <span className="badge live" style={{ marginLeft: 4 }}>Live</span>
        </h3>
        <div ref={menuRef} style={{ position: 'relative' }}>
          <button className="btn ghost icon-only sm" onClick={() => setMenuOpen(!menuOpen)} title="Feed options"><I.MoreH size={12} /></button>
          {menuOpen && (
            <div className="feed-menu">
              <div className="am-item" onClick={() => { setMenuOpen(false); Store.toast('Feed paused', 'New events will not be auto-added.', 'info'); }}><I.Pause size={12} /> Pause live updates</div>
              <div className="am-item" onClick={() => { setMenuOpen(false); Store.toast('Feed cleared', 'Showing only new events from now.', 'ok'); }}><I.Trash size={12} /> Clear feed</div>
              <div className="am-item" onClick={() => { setMenuOpen(false); Store.toast('Export started', 'Sending CSV to your email.', 'ok'); }}><I.Download size={12} /> Export as CSV</div>
              <div className="am-item" onClick={() => { setMenuOpen(false); Store.toast('Settings', 'Configure event types & noise level.', 'info'); }}><I.Settings size={12} /> Feed settings</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '8px 14px 0', borderBottom: '1px solid var(--line-1)' }}>
        <div className="segmented" style={{ width: '100%', marginBottom: 10 }}>
          {[
            { id: 'all', l: 'All', n: counts.all },
            { id: 'running', l: 'Running', n: counts.running },
            { id: 'errors', l: 'Errors', n: counts.errors },
          ].map(o => (
            <button key={o.id} className={filter === o.id ? 'active' : ''} style={{ flex: 1 }} onClick={() => setFilter(o.id)}>
              {o.l} <span className="mono" style={{ opacity: 0.55, marginLeft: 4, fontSize: 10 }}>{o.n}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="feed-body">
        {items.length === 0 && (
          <div style={{ padding: 30, textAlign: 'center', color: 'var(--text-3)', fontSize: 12 }}>
            {filter === 'errors' ? 'No errors. Agents are healthy. ✓' : filter === 'running' ? 'No active runs right now.' : 'Feed is quiet.'}
          </div>
        )}
        {items.map((ev, i) => (
          <div key={i} className={'feed-item' + (ev.running ? ' running' : '') + (ev.error ? ' error' : '')}>
            <div className="ts">{ev.ts}</div>
            <div className="agent-ic">{iconFor(ev.tool)}</div>
            <div className="body">
              <div>
                <span className="who">{ev.who}</span>
                <span className="action"> {ev.action.toLowerCase()} </span>
                <span className="target">{ev.target}</span>
              </div>
              <div className="meta row" style={{ gap: 6, marginTop: 3 }}>
                <span className="tool">{ev.tool}</span>
                <span>{ev.meta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: 12, borderTop: '1px solid var(--line-1)', background: 'var(--bg-0)' }}>
        <div style={{ position: 'relative' }}>
          <textarea placeholder="Instruct the agents…" rows={2}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (e.target.value.trim()) { Store.toast('Instruction sent', 'Agents will respond shortly.', 'ok'); e.target.value = ''; } } }}
            style={{
              width: '100%', background: 'var(--bg-2)', border: '1px solid var(--line-2)',
              borderRadius: 6, padding: '8px 10px', paddingRight: 30, color: 'var(--text-1)', fontSize: 12, resize: 'none', outline: 'none', fontFamily: 'inherit',
            }} />
          <button className="btn primary icon-only sm" style={{ position: 'absolute', right: 6, bottom: 6 }}
            onClick={(e) => { const ta = e.currentTarget.parentElement.querySelector('textarea'); if (ta.value.trim()) { Store.toast('Instruction sent', 'Agents will respond shortly.', 'ok'); ta.value = ''; } }}>
            <I.Send size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TopBar, SideNav, ActivityFeed, NAV });
