// Email Reports page + Integrations subsection

function Reports({ onNavigate }) {
  const [tab, setTab] = React.useState('configured');
  const [expandedId, setExpandedId] = React.useState(null);
  const [reports, setReports] = React.useState(() => EMAIL_REPORTS.map(r => ({ ...r })));
  const [sent, setSent] = React.useState(() => SENT_EMAILS.map(s => ({ ...s })));

  const toggle = (id) => {
    const next = reports.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r);
    setReports(next);
    const r = next.find(x => x.id === id);
    Store.toast(r.enabled ? 'Report enabled' : 'Report paused', r.name, r.enabled ? 'ok' : 'warn');
  };

  const sendNow = (id) => {
    const r = reports.find(x => x.id === id);
    if (!r) return;
    Store.toast('Sending…', `"${r.name}" being dispatched to ${r.recipients.length} recipient${r.recipients.length > 1 ? 's' : ''}`, 'info');
    setTimeout(() => {
      const newEmail = {
        id: 'e_' + Date.now(),
        subject: r.name + ' — manual send',
        type: r.kind,
        to: r.recipients.length === 1 ? r.recipients[0] : `${r.recipients.length} recipients`,
        sent: 'Just now',
        opened: false,
        clicked: 0,
        preview: r.desc,
      };
      setSent([newEmail, ...sent]);
      Store.toast('Email dispatched', 'Delivered in 1.4s', 'ok');
    }, 1400);
  };

  const openCompose = () => Store.openModal({ type: 'compose-email' });

  return (
    <div className="page" style={{ maxWidth: 1200 }}>
      <div className="page-h">
        <div>
          <div className="eyebrow">Intelligence Delivery</div>
          <h1>Email Reports</h1>
          <p>Every insight the platform surfaces is auto-delivered. You can also compose and send manually.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn" onClick={() => Store.openModal({ type: 'compose-email', manual: true })}><I.Mail size={12} /> Compose manual email</button>
          <button className="btn primary" onClick={openCompose}><I.Plus size={12} /> New report</button>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 16 }}>
        {[
          { l: 'Active reports', v: reports.filter(r => r.enabled).length + '/' + reports.length, d: 'Delivering now', i: 'Mail' },
          { l: 'Emails sent (30d)', v: '284', d: '+18% vs. last month', i: 'Send' },
          { l: 'Open rate', v: '89%', d: 'Above industry avg', i: 'Eye' },
        ].map((s, i) => {
          const IconC = I[s.i];
          return (
            <div key={i} className="stat">
              <div className="label"><IconC size={11} /> {s.l}</div>
              <div className="value num">{s.v}</div>
              <div className="delta">{s.d}</div>
            </div>
          );
        })}
      </div>

      <div className="segmented" style={{ marginBottom: 14 }}>
        <button className={tab === 'configured' ? 'active' : ''} onClick={() => setTab('configured')}>Configured ({reports.length})</button>
        <button className={tab === 'history' ? 'active' : ''} onClick={() => setTab('history')}>Sent history ({sent.length})</button>
        <button className={tab === 'templates' ? 'active' : ''} onClick={() => setTab('templates')}>Templates</button>
      </div>

      {tab === 'configured' && (
        <div className="col" style={{ gap: 10 }}>
          {reports.map(r => {
            const isOpen = expandedId === r.id;
            const iconMap = { daily: 'Sunrise', weekly: 'Calendar', monthly: 'BarChart', approval: 'Shield', competitor: 'Users', alert: 'Zap', seo: 'TrendingUp' };
            const IconC = I[iconMap[r.kind]] || I.Mail;
            return (
              <div key={r.id} className="card">
                <div className="row" style={{ padding: '14px 16px', gap: 14, cursor: 'pointer' }} onClick={() => setExpandedId(isOpen ? null : r.id)}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: r.enabled ? 'var(--accent-bg)' : 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.enabled ? 'var(--accent-1)' : 'var(--text-3)', flex: '0 0 36px' }}>
                    <IconC size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="row" style={{ gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-0)' }}>{r.name}</span>
                      {r.enabled ? <span className="badge ok dot">Active</span> : <span className="badge warn">Paused</span>}
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{r.desc} · <span className="mono">{r.schedule}</span></div>
                  </div>
                  <div className="row" style={{ gap: 6 }}>
                    <button className="btn sm" onClick={(e) => { e.stopPropagation(); sendNow(r.id); }} disabled={!r.enabled}><I.Send size={11} /> Send now</button>
                    <button className="btn sm ghost" onClick={(e) => { e.stopPropagation(); Store.openModal({ type: 'edit-report', report: r }); }}><I.Edit size={11} /></button>
                    <div onClick={(e) => { e.stopPropagation(); toggle(r.id); }} style={{ width: 32, height: 18, borderRadius: 9, background: r.enabled ? 'var(--accent)' : 'var(--bg-4)', position: 'relative', transition: 'background 150ms', cursor: 'pointer', flexShrink: 0 }}>
                      <div style={{ position: 'absolute', top: 2, left: r.enabled ? 16 : 2, width: 14, height: 14, borderRadius: '50%', background: 'white', transition: 'left 150ms' }}></div>
                    </div>
                    <I.ChevronRight size={14} style={{ color: 'var(--text-4)', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 200ms' }} />
                  </div>
                </div>
                {isOpen && (
                  <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--line-1)' }}>
                    <div className="grid-3" style={{ gap: 12, marginTop: 12 }}>
                      <div>
                        <div className="eyebrow" style={{ marginBottom: 6 }}>Recipients</div>
                        <div className="col" style={{ gap: 4 }}>
                          {r.recipients.map((e, i) => (
                            <div key={i} className="row" style={{ gap: 6, fontSize: 12 }}>
                              <I.User size={11} style={{ color: 'var(--text-3)' }} />
                              <span className="mono" style={{ color: 'var(--text-1)' }}>{e}</span>
                            </div>
                          ))}
                          <button className="btn sm ghost" style={{ alignSelf: 'flex-start', marginTop: 4 }} onClick={() => Store.openModal({ type: 'edit-report', report: r })}><I.Plus size={10} /> Add recipient</button>
                        </div>
                      </div>
                      <div>
                        <div className="eyebrow" style={{ marginBottom: 6 }}>Schedule</div>
                        <div style={{ fontSize: 12, color: 'var(--text-1)', marginBottom: 3 }}>{r.schedule}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Last: <span className="mono">{r.lastSent}</span></div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Next: <span className="mono">{r.nextSend}</span></div>
                      </div>
                      <div>
                        <div className="eyebrow" style={{ marginBottom: 6 }}>Performance</div>
                        <div className="row" style={{ justifyContent: 'space-between', fontSize: 12 }}>
                          <span className="muted">Open rate</span>
                          <span className="num" style={{ color: 'var(--teal-1)' }}>{r.opens}%</span>
                        </div>
                        <div className="progress" style={{ height: 3, marginTop: 3 }}><div style={{ width: `${r.opens}%`, background: 'var(--teal)' }}></div></div>
                        <div className="row" style={{ justifyContent: 'space-between', fontSize: 12, marginTop: 6 }}>
                          <span className="muted">Click rate</span>
                          <span className="num" style={{ color: 'var(--accent-1)' }}>{r.clicks}%</span>
                        </div>
                        <div className="progress" style={{ height: 3, marginTop: 3 }}><div style={{ width: `${r.clicks}%`, background: 'var(--accent)' }}></div></div>
                      </div>
                    </div>
                    <div className="row" style={{ gap: 8, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line-1)' }}>
                      <button className="btn sm" onClick={() => Store.openModal({ type: 'preview-email', report: r })}><I.Eye size={11} /> Preview email</button>
                      <button className="btn sm ghost" onClick={() => Store.openModal({ type: 'edit-report', report: r })}><I.Settings size={11} /> Configure</button>
                      <button className="btn sm ghost" onClick={() => Store.toast('Duplicated', `"${r.name}" copy created`, 'ok')}><I.Copy size={11} /> Duplicate</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'history' && (
        <div className="card">
          <div className="card-b flush">
            {sent.map(e => (
              <div key={e.id} className="row" style={{ padding: '12px 14px', gap: 12, borderBottom: '1px solid var(--line-1)', cursor: 'pointer', transition: 'background 150ms' }}
                   onClick={() => Store.openModal({ type: 'preview-email', email: e })}
                   onMouseEnter={(ev) => ev.currentTarget.style.background = 'var(--bg-2)'}
                   onMouseLeave={(ev) => ev.currentTarget.style.background = ''}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: e.opened ? 'var(--ok)' : 'var(--warn)', flexShrink: 0 }}></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 500, marginBottom: 2 }}>{e.subject}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.preview}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-2)' }} className="mono">{e.sent}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{e.to} · {e.clicked} clicks</div>
                </div>
                <button className="btn sm ghost" onClick={(ev) => { ev.stopPropagation(); Store.openModal({ type: 'preview-email', email: e }); }}><I.ArrowRight size={11} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'templates' && (
        <div className="grid-3">
          {[
            { n: 'Daily trend briefing', d: 'Hero insight + 3 trends + viral alerts', i: 'Sunrise' },
            { n: 'Weekly performance', d: 'KPI grid + top posts + recommendations', i: 'BarChart' },
            { n: 'Monthly executive', d: 'Full KPI scorecard + narrative + next month plan', i: 'FileText' },
            { n: 'Approval digest', d: 'Drafts waiting + 1-click approve links', i: 'Shield' },
            { n: 'Competitor pulse', d: 'What they posted + how it performed', i: 'Users' },
            { n: 'Real-time viral alert', d: 'Instant alert on threshold breach', i: 'Zap' },
            { n: 'SEO movement', d: 'Keyword gains, losses, new backlinks', i: 'TrendingUp' },
            { n: 'Influencer outreach', d: 'Shortlist + auto-generated outreach copy', i: 'Send' },
            { n: 'Client case study', d: 'New success story + social-ready copy', i: 'Award' },
          ].map((t, i) => {
            const IconC = I[t.i];
            return (
              <div key={i} className="card" style={{ cursor: 'pointer' }} onClick={() => Store.openModal({ type: 'compose-email', template: t })}>
                <div className="card-b">
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--accent-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-1)', marginBottom: 10 }}><IconC size={15} /></div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-0)', marginBottom: 3 }}>{t.n}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 12 }}>{t.d}</div>
                  <button className="btn sm" onClick={(e) => { e.stopPropagation(); Store.openModal({ type: 'compose-email', template: t }); }}><I.Mail size={10} /> Use template</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ----- SEO & Integrations screen -----
function SEOIntegrations({ onNavigate }) {
  const [tab, setTab] = React.useState('overview');

  return (
    <div className="page" style={{ maxWidth: 'none' }}>
      <div className="page-h">
        <div>
          <div className="eyebrow">SEO & Analytics</div>
          <h1>Search intelligence</h1>
          <p>Semrush, Ahrefs, GA4, and Search Console feed the platform. Every draft is informed by real keyword data.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn" onClick={() => Store.toast('Syncing all', 'Fetching fresh data from 5 providers…', 'info')}><I.Refresh size={12} /> Sync all</button>
          <button className="btn primary" onClick={() => Store.openModal({ type: 'add-integration' })}><I.Plus size={12} /> Add integration</button>
        </div>
      </div>

      <div className="segmented" style={{ marginBottom: 14 }}>
        <button className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}>Overview</button>
        <button className={tab === 'keywords' ? 'active' : ''} onClick={() => setTab('keywords')}>Keywords ({SEO_KEYWORDS.length})</button>
        <button className={tab === 'alerts' ? 'active' : ''} onClick={() => setTab('alerts')}>Alerts ({SEO_ALERTS.length})</button>
        <button className={tab === 'integrations' ? 'active' : ''} onClick={() => setTab('integrations')}>Integrations</button>
      </div>

      {tab === 'overview' && (
        <>
          <div className="grid-3" style={{ marginBottom: 16 }}>
            {[
              { l: 'Keywords tracked', v: '284', d: '+12 this week', i: 'Search' },
              { l: 'Avg search position', v: '4.8', d: 'Improved 1.2 spots', i: 'TrendingUp' },
              { l: 'Domain Rating (Ahrefs)', v: '48', d: '+3 this month', i: 'Shield' },
              { l: 'Organic traffic', v: '14.2K', d: '+28% MoM', i: 'Users' },
              { l: 'New backlinks (7d)', v: '124', d: '12 high-authority', i: 'Link' },
              { l: 'Click-through rate', v: '6.8%', d: '+0.4pt vs last month', i: 'Target' },
            ].map((s, i) => {
              const IconC = I[s.i];
              return (
                <div key={i} className="stat">
                  <div className="label"><IconC size={11} /> {s.l}</div>
                  <div className="value num">{s.v}</div>
                  <div className="delta">{s.d}</div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div className="card">
              <div className="card-h">
                <h3>Keyword position trends</h3>
                <div className="segmented sm"><button className="active">30d</button><button>90d</button></div>
              </div>
              <div className="card-b">
                <LineChart height={220} series={[
                  { color: 'var(--accent)', data: [8, 7, 7, 6, 6, 5, 4.8], fill: true },
                  { color: 'var(--teal)', data: [12, 11, 10, 9, 9, 8, 7], fill: false },
                ]} />
                <div className="row" style={{ gap: 14, marginTop: 8, fontSize: 11 }}>
                  <span className="row" style={{ gap: 6 }}><span className="pdot" style={{ background: 'var(--accent)' }}></span>Avg position (lower = better)</span>
                  <span className="row" style={{ gap: 6 }}><span className="pdot" style={{ background: 'var(--teal)' }}></span>Competitor avg</span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-h"><h3>Top alerts</h3><button className="btn sm ghost" onClick={() => setTab('alerts')}>All</button></div>
              <div className="card-b flush">
                {SEO_ALERTS.slice(0, 4).map(a => {
                  const colorMap = { high: 'var(--ok)', med: 'var(--warn)', low: 'var(--text-3)' };
                  return (
                    <div key={a.id} style={{ padding: 10, borderBottom: '1px solid var(--line-1)' }}>
                      <div className="row" style={{ gap: 6, marginBottom: 2 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: colorMap[a.impact] }}></div>
                        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-0)' }}>{a.kw}</span>
                        <span className="badge" style={{ marginLeft: 'auto', fontSize: 9 }}>{a.src}</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-2)' }}>{a.msg}</div>
                      <div className="mono muted" style={{ fontSize: 10.5 }}>{a.ts}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {tab === 'keywords' && (
        <div className="card">
          <div className="card-h">
            <h3>Tracked keywords <span className="subtitle">Ranked by volume</span></h3>
            <button className="btn sm" onClick={() => Store.toast('Exported', 'Keywords CSV downloaded', 'ok')}><I.Download size={11} /> Export</button>
          </div>
          <div className="card-b" style={{ padding: 0, overflowX: 'auto' }}>
            <table className="tbl">
              <thead><tr><th>Keyword</th><th>Volume</th><th>Difficulty</th><th>Position</th><th>Δ 7d</th><th>Intent</th><th>CTR</th><th>Source</th><th></th></tr></thead>
              <tbody>
                {SEO_KEYWORDS.map((k, i) => {
                  const chg = parseInt(k.change, 10);
                  return (
                    <tr key={i} style={{ cursor: 'pointer' }} onClick={() => Store.openModal({ type: 'generate', prefill: { trend: k.kw } })}>
                      <td style={{ color: 'var(--text-0)', fontWeight: 500 }}>{k.kw}</td>
                      <td className="mono">{k.vol.toLocaleString()}</td>
                      <td>
                        <div className="row" style={{ gap: 6 }}>
                          <div style={{ width: 28, height: 4, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}><div style={{ height: '100%', width: k.diff + '%', background: k.diff < 40 ? 'var(--teal)' : k.diff < 60 ? 'var(--warn)' : 'var(--err)' }}></div></div>
                          <span className="mono muted" style={{ fontSize: 11 }}>{k.diff}</span>
                        </div>
                      </td>
                      <td className="mono" style={{ color: 'var(--text-0)' }}>#{k.pos}</td>
                      <td style={{ color: chg > 0 ? 'var(--ok)' : chg < 0 ? 'var(--err)' : 'var(--text-3)' }} className="mono">{chg > 0 ? '↑' : chg < 0 ? '↓' : '—'} {chg !== 0 ? Math.abs(chg) : ''}</td>
                      <td><span className="badge" style={{ fontSize: 10 }}>{k.intent}</span></td>
                      <td className="mono">{k.ctr}</td>
                      <td><span className="badge" style={{ fontSize: 10 }}>{k.src}</span></td>
                      <td><button className="btn sm ghost" onClick={(e) => { e.stopPropagation(); Store.openModal({ type: 'generate', prefill: { trend: k.kw } }); }}><I.Sparkles size={11} /></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'alerts' && (
        <div className="card">
          <div className="card-b flush">
            {SEO_ALERTS.map(a => {
              const colorMap = { high: 'var(--ok)', med: 'var(--warn)', low: 'var(--text-3)' };
              const iconMap = { 'keyword-gain': 'TrendingUp', 'backlink': 'Link', 'competitor': 'Users', 'query-spike': 'Zap', 'conversion': 'Target' };
              const IconC = I[iconMap[a.kind]] || I.AlertTriangle;
              return (
                <div key={a.id} style={{ padding: 14, borderBottom: '1px solid var(--line-1)', cursor: 'pointer' }} onClick={() => Store.toast(a.kw, a.msg, 'info')}>
                  <div className="row" style={{ gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--bg-2)', border: `1px solid ${colorMap[a.impact]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colorMap[a.impact], flex: '0 0 32px' }}><IconC size={14} /></div>
                    <div style={{ flex: 1 }}>
                      <div className="row" style={{ gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-0)' }}>{a.kw}</span>
                        <span className="badge" style={{ fontSize: 10 }}>{a.src}</span>
                        <span className="mono muted" style={{ fontSize: 10.5, marginLeft: 'auto' }}>{a.ts}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{a.msg}</div>
                    </div>
                    <button className="btn sm" onClick={(e) => { e.stopPropagation(); Store.openModal({ type: 'generate', prefill: { trend: a.kw } }); }}><I.Sparkles size={10} /> Draft</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'integrations' && (
        <div className="grid-3">
          {SEO_INTEGRATIONS.map(g => (
            <div key={g.id} className="card" style={{ cursor: 'pointer' }} onClick={() => Store.openModal({ type: 'integration-detail', integration: g })}>
              <div className="card-b">
                <div className="row" style={{ gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: g.color + '22', border: `1px solid ${g.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: g.color, fontSize: 18, fontWeight: 700, flex: '0 0 40px' }}>{g.glyph}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-0)' }}>{g.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{g.tag}</div>
                  </div>
                  {g.connected ? <span className="badge ok dot">Connected</span> : <span className="badge">Off</span>}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--text-2)', marginBottom: 10, minHeight: 30 }}>{g.meta}</div>
                <div className="row" style={{ justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--line-1)' }}>
                  <span className="mono muted" style={{ fontSize: 10.5 }}>{g.status}</span>
                  {g.connected ? (
                    <button className="btn sm ghost" onClick={(e) => { e.stopPropagation(); Store.openModal({ type: 'integration-detail', integration: g }); }}>Configure</button>
                  ) : (
                    <button className="btn sm primary" onClick={(e) => { e.stopPropagation(); Store.openModal({ type: 'account-connect', account: { n: g.name, i: null } }); }}>Connect</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Reports, SEOIntegrations });
