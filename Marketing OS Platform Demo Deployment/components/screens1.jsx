// Calendar, Trends, Influencers, Analytics, Daily Brief, Settings, Onboarding

function Calendar() {
  const state = useStore();
  const [viewMode, setViewMode] = React.useState('week');
  const [weekOffset, setWeekOffset] = React.useState(0);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];

  // View-specific data
  const VIEW_META = {
    day: {
      eyebrow: 'Schedule · Thursday, April 24',
      desc: '6 posts scheduled today across 5 platforms. Next publish in 2h 14m. Agents have already drafted tomorrow\'s slot recommendations.',
      stats: [
        { i: 'Send', l: 'Scheduled today', v: '6', d: '+2 vs yesterday' },
        { i: 'Clock', l: 'Next publish', v: '6:00 PM', d: 'Instagram · "5 signs"', big: true },
        { i: 'Zap', l: 'Auto-scheduled', v: '5/6', d: '83% autonomy' },
      ],
    },
    week: {
      eyebrow: 'Schedule · Week of April 27 – May 3',
      desc: '28 posts scheduled this week. Times shown in your local timezone (EST). Agents optimize slots based on platform-specific audience windows.',
      stats: [
        { i: 'Send', l: 'Scheduled', v: '28', d: '+5 vs last week' },
        { i: 'Clock', l: 'Next publish', v: 'Today, 6:00 PM', d: 'Instagram · "5 signs"', big: true },
        { i: 'Zap', l: 'Auto-scheduled', v: '24/28', d: '86% autonomy' },
      ],
    },
    month: {
      eyebrow: 'Schedule · April 2026',
      desc: '124 posts scheduled this month across 8 platforms. Average of 4.1 posts/day. Agents adapt cadence to performance windows.',
      stats: [
        { i: 'Send', l: 'Scheduled this month', v: '124', d: '+18 vs March' },
        { i: 'Clock', l: 'Avg cadence', v: '4.1/day', d: 'Peak: Tue–Thu', big: true },
        { i: 'Zap', l: 'Auto-scheduled', v: '108/124', d: '87% autonomy' },
      ],
    },
  };
  const meta = VIEW_META[viewMode];

  // Build events from scheduled + approved posts, pad with defaults
  const scheduledPosts = state.posts.filter(p => p.status === 'approved');
  const events = [
    { day: 0, hour: 1, plat: 'linkedin', title: '3 pillars of EB1A', type: 'carousel', post: state.posts.find(p => p.id === 'p_04') },
    { day: 0, hour: 4, plat: 'instagram', title: '5 signs you\'re ready', type: 'carousel', post: state.posts.find(p => p.id === 'p_05') },
    { day: 1, hour: 2, plat: 'x', title: '7 criteria ranked', type: 'thread' },
    { day: 1, hour: 3, plat: 'linkedin', title: 'Letter audit case', type: 'single' },
    { day: 2, hour: 1, plat: 'facebook', title: 'Testimonial: Priya', type: 'single' },
    { day: 2, hour: 4, plat: 'instagram', title: 'PM reel', type: 'reel' },
    { day: 3, hour: 0, plat: 'linkedin', title: 'Monday memo', type: 'single' },
    { day: 3, hour: 2, plat: 'youtube', title: 'Case study video', type: 'video' },
    { day: 4, hour: 3, plat: 'x', title: 'Weekend thread', type: 'thread' },
    { day: 4, hour: 4, plat: 'instagram', title: 'Q&A reel', type: 'reel' },
    { day: 5, hour: 2, plat: 'linkedin', title: 'Saturday digest', type: 'single' },
    { day: 6, hour: 1, plat: 'medium', title: 'Long-form essay', type: 'article' },
  ];

  return (
    <div className="page" style={{ maxWidth: 'none' }}>
      <div className="page-h">
        <div>
          <div className="eyebrow">{meta.eyebrow}</div>
          <h1>Calendar</h1>
          <p>{meta.desc}</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <div className="segmented">
            {['Day', 'Week', 'Month'].map(m => (
              <button key={m} className={viewMode === m.toLowerCase() ? 'active' : ''} onClick={() => { setViewMode(m.toLowerCase()); Store.toast(`${m} view`, VIEW_META[m.toLowerCase()].eyebrow, 'info'); }}>{m}</button>
            ))}
          </div>
          <button className="btn" onClick={() => setWeekOffset(o => o - 1)}><I.ChevronLeft size={12} /></button>
          <button className="btn" onClick={() => setWeekOffset(0)}>Today</button>
          <button className="btn" onClick={() => setWeekOffset(o => o + 1)}><I.ChevronRight size={12} /></button>
          <button className="btn primary" onClick={() => Store.openModal({ type: 'new-event', date: 'Today' })}><I.Plus size={12} /> Manual post</button>
        </div>
      </div>

      {viewMode === 'day' && <CalendarDayView hours={hours} events={events.filter(e => e.day === 0)} />}
      {viewMode === 'week' && <CalendarWeekView days={days} hours={hours} events={events} state={state} />}
      {viewMode === 'month' && <CalendarMonthView />}

      <div className="grid-3" style={{ marginTop: 16 }}>
        {meta.stats.map((s, i) => {
          const IconC = I[s.i];
          return (
            <div key={i} className="stat">
              <div className="label"><IconC size={11} /> {s.l}</div>
              <div className="value" style={s.big ? { fontSize: 16 } : {}}>{!s.big && <span className="num">{s.v}</span>}{s.big && s.v}</div>
              <div className="delta">{s.d}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarDayView({ hours, events }) {
  const dayHours = ['6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'];
  const dayEvents = [
    { hour: 0, plat: 'linkedin', title: 'Morning memo: Q1 USCIS update', type: 'single', meta: '6:00 AM · 240 words' },
    { hour: 2, plat: 'x', title: '7 criteria ranked by approval rate', type: 'thread', meta: '10:00 AM · 8 tweets' },
    { hour: 3, plat: 'linkedin', title: '3 pillars of an approvable petition', type: 'carousel', meta: '12:30 PM · 7 slides' },
    { hour: 5, plat: 'instagram', title: '5 signs you\'re ready for EB1A', type: 'carousel', meta: '6:00 PM · 8 slides' },
    { hour: 6, plat: 'x', title: 'Evening hot take: rec letters', type: 'single', meta: '8:00 PM' },
    { hour: 8, plat: 'medium', title: 'Long-form: choosing your category', type: 'article', meta: '10:30 PM · 1,200 words' },
  ];
  return (
    <div className="card">
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-1)', fontSize: 11, color: 'var(--text-3)' }}>
        Today · 6 posts · all auto-scheduled · Optimal windows highlighted
      </div>
      {dayHours.map((h, hi) => {
        const ev = dayEvents.find(e => e.hour === hi);
        const optimal = hi === 1 || hi === 5;
        return (
          <div key={h} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', borderBottom: hi === dayHours.length - 1 ? 0 : '1px solid var(--line-1)', minHeight: 64, background: optimal ? 'rgba(124,92,255,0.03)' : 'transparent' }}>
            <div style={{ padding: '10px 12px', fontSize: 11, color: 'var(--text-4)', fontFamily: 'var(--font-mono)', borderRight: '1px solid var(--line-1)' }}>
              {h}
              {optimal && <div style={{ fontSize: 9, color: 'var(--accent-1)', fontWeight: 600, marginTop: 2 }}>OPTIMAL</div>}
            </div>
            <div style={{ padding: 8, cursor: ev ? 'pointer' : 'default' }} onClick={() => ev && Store.toast(ev.title, ev.meta, 'info')}>
              {ev && (() => {
                const Pc = Platforms[ev.plat];
                return (
                  <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderLeft: '2px solid var(--accent)', borderRadius: 4, padding: '8px 10px' }}>
                    <div className="row" style={{ gap: 8, marginBottom: 4 }}>
                      <Pc />
                      <span className="mono muted" style={{ fontSize: 10 }}>{ev.type}</span>
                      <span style={{ flex: 1 }}></span>
                      <span style={{ fontSize: 10, color: 'var(--text-4)' }}>{ev.meta}</span>
                    </div>
                    <div style={{ color: 'var(--text-1)', fontWeight: 500, fontSize: 13 }}>{ev.title}</div>
                  </div>
                );
              })()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CalendarWeekView({ days, hours, events, state }) {
  return (
    <div className="card">
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-1)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div className="row" style={{ gap: 8, fontSize: 11 }}>
          <span className="text-3">Optimal windows</span>
          {[
            { label: 'LinkedIn peak', time: '9–11 AM weekdays', color: 'var(--p-linkedin)' },
            { label: 'Instagram peak', time: '11 AM / 7–9 PM', color: '#e1306c' },
            { label: 'X peak', time: '8 AM / 8 PM', color: 'white' },
          ].map(w => (
            <span key={w.label} className="badge" style={{ borderColor: 'var(--line-2)' }}>
              <span className="pdot" style={{ background: w.color }}></span>
              {w.label}: {w.time}
            </span>
          ))}
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="row" style={{ gap: 6 }}>
          <span className="text-3" style={{ fontSize: 11 }}>Filter:</span>
          {ACCOUNTS.slice(0, 6).map(a => {
            const Pc = Platforms[a.id];
            return <span key={a.id} style={{ transform: 'scale(0.9)' }}><Pc /></span>;
          })}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', borderBottom: '1px solid var(--line-1)' }}>
        <div></div>
        {days.map((d, i) => (
          <div key={d} style={{ padding: '10px 12px', borderLeft: '1px solid var(--line-1)', fontSize: 11, fontWeight: 600, color: i === 0 ? 'var(--accent-1)' : 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {d} <span style={{ color: 'var(--text-4)', marginLeft: 4 }}>{27 + i}</span>
            {i === 0 && <span className="badge accent" style={{ marginLeft: 6, fontSize: 10 }}>Today</span>}
          </div>
        ))}
      </div>
      {hours.map((h, hi) => (
        <div key={h} style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', borderBottom: hi === hours.length - 1 ? 0 : '1px solid var(--line-1)', minHeight: 72 }}>
          <div style={{ padding: '6px 8px', fontSize: 10, color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>{h}</div>
          {days.map((d, di) => {
            const ev = events.find(e => e.day === di && e.hour === hi);
            const optimal = (di < 5 && hi === 1) || (di < 5 && hi === 4);
            return (
              <div key={d} style={{ borderLeft: '1px solid var(--line-1)', padding: 4, background: optimal ? 'rgba(124,92,255,0.03)' : 'transparent', position: 'relative', cursor: ev ? 'pointer' : 'default' }}
                   onClick={() => {
                     if (ev) {
                       const p = ev.post || state.posts.find(pp => pp.platform === ev.plat) || state.posts[0];
                       Store.openModal({ type: 'event-detail', post: { ...p, title: ev.title, platform: ev.plat } });
                     } else if (optimal) {
                       Store.openModal({ type: 'new-event', date: `${days[di]}, ${hours[hi]}` });
                     }
                   }}>
                {optimal && !ev && <div style={{ position: 'absolute', top: 4, right: 4, fontSize: 9, color: 'var(--accent-1)', fontWeight: 600 }}>OPTIMAL</div>}
                {ev && (() => {
                  const Pc = Platforms[ev.plat];
                  return (
                    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderLeft: '2px solid var(--accent)', borderRadius: 4, padding: 6, fontSize: 11, transition: 'border-color 150ms' }}
                         onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                         onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}>
                      <div className="row" style={{ gap: 6, marginBottom: 2 }}>
                        <Pc />
                        <span className="mono muted" style={{ fontSize: 10 }}>{ev.type}</span>
                      </div>
                      <div style={{ color: 'var(--text-1)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</div>
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function CalendarMonthView() {
  // April 2026: 1st = Wednesday, 30 days
  const monthDays = [];
  // Leading empty cells (Mon=0, so April 1 Wed = 2 empty)
  for (let i = 0; i < 2; i++) monthDays.push(null);
  for (let d = 1; d <= 30; d++) monthDays.push(d);
  // Distribution: more on Tue-Thu
  const dayPostCount = (d) => {
    if (!d) return 0;
    const dow = (d + 1) % 7; // April 1 = Wed = 2
    if (dow >= 1 && dow <= 3) return 5 + (d % 3);
    if (dow === 0 || dow === 4) return 3 + (d % 2);
    return 1 + (d % 2);
  };
  const platformsForDay = (d) => {
    if (!d) return [];
    const all = ['linkedin', 'instagram', 'x', 'facebook', 'youtube', 'medium'];
    const n = Math.min(dayPostCount(d), 4);
    return all.slice(d % 3, d % 3 + n);
  };
  const today = 24;
  return (
    <div className="card">
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-1)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div className="row" style={{ gap: 14, fontSize: 11 }}>
          <span className="text-3">April 2026</span>
          <span className="badge" style={{ borderColor: 'var(--line-2)' }}><span className="pdot" style={{ background: 'var(--accent)' }}></span>1–3 posts</span>
          <span className="badge" style={{ borderColor: 'var(--line-2)' }}><span className="pdot" style={{ background: 'var(--teal)' }}></span>4–5 posts</span>
          <span className="badge" style={{ borderColor: 'var(--line-2)' }}><span className="pdot" style={{ background: 'var(--cyan)' }}></span>6+ posts</span>
        </div>
        <div style={{ flex: 1 }}></div>
        <span className="mono muted" style={{ fontSize: 11 }}>124 posts · 8 platforms · 4.1/day avg</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--line-1)' }}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
          <div key={d} style={{ padding: '10px 12px', borderLeft: i > 0 ? '1px solid var(--line-1)' : 0, fontSize: 11, fontWeight: 600, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {monthDays.map((d, i) => {
          const count = dayPostCount(d);
          const intensity = count >= 6 ? 'var(--cyan)' : count >= 4 ? 'var(--teal)' : count > 0 ? 'var(--accent)' : 'transparent';
          const isToday = d === today;
          return (
            <div key={i} style={{
              borderLeft: (i % 7) > 0 ? '1px solid var(--line-1)' : 0,
              borderTop: i >= 7 ? '1px solid var(--line-1)' : 0,
              minHeight: 100, padding: 8,
              background: isToday ? 'rgba(124,92,255,0.06)' : 'transparent',
              cursor: d ? 'pointer' : 'default',
              opacity: d ? 1 : 0.3,
            }}
            onClick={() => d && Store.toast(`April ${d}`, `${count} posts scheduled · ${platformsForDay(d).length} platforms`, 'info')}>
              {d && (
                <>
                  <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: isToday ? 700 : 500, color: isToday ? 'var(--accent-1)' : 'var(--text-1)' }}>{d}</span>
                    {count > 0 && <span style={{ fontSize: 10, color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>{count}</span>}
                  </div>
                  {count > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {platformsForDay(d).slice(0, 3).map((p, pi) => {
                        const Pc = Platforms[p];
                        return (
                          <div key={pi} style={{ background: 'var(--bg-2)', borderLeft: `2px solid ${intensity}`, borderRadius: 3, padding: '3px 5px', fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Pc />
                            <span style={{ color: 'var(--text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {pi === 0 ? 'AM post' : pi === 1 ? 'Midday' : 'PM post'}
                            </span>
                          </div>
                        );
                      })}
                      {count > 3 && <div style={{ fontSize: 10, color: 'var(--text-4)', paddingLeft: 5 }}>+{count - 3} more</div>}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Trends() {
  const [platformFilter, setPlatformFilter] = React.useState('all');
  const [selectedKeyword, setSelectedKeyword] = React.useState(null);
  const state = useStore();

  return (
    <div className="page" style={{ maxWidth: 'none' }}>
      <div className="page-h">
        <div>
          <div className="eyebrow">Intelligence</div>
          <h1>Trends & Competitor Intelligence</h1>
          <p>Live scan of 1,847 posts across your competitive set in the last 24 hours. Trending topics, keyword shifts, content gaps.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn" onClick={() => Store.toast('Refreshing', 'Rescanning 1,847 posts…', 'info')}><I.Refresh size={12} /> Refresh</button>
          <button className="btn primary" onClick={() => Store.openModal({ type: 'generate', prefill: { trend: window.TRENDS[0].topic } })}><I.Sparkles size={12} /> Generate from trend</button>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 16 }}>
        <div className="stat"><div className="label"><I.TrendingUp size={11} /> Topics trending now</div><div className="value num">12</div><div className="delta">3 high-opportunity</div></div>
        <div className="stat"><div className="label"><I.Target size={11} /> Content gaps</div><div className="value num">7</div><div className="delta">Covered by 0 competitors</div></div>
        <div className="stat"><div className="label"><I.Hash size={11} /> Rising hashtags</div><div className="value num">23</div><div className="delta">+15 vs yesterday</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="card">
          <div className="card-h">
            <h3>Trending topics <span className="subtitle">Velocity-ranked · 24h</span></h3>
            <div className="segmented sm">
              {['all', 'linkedin', 'instagram', 'x'].map(p => (
                <button key={p} className={platformFilter === p ? 'active' : ''} onClick={() => setPlatformFilter(p)}>{p === 'all' ? 'All' : p === 'linkedin' ? 'LinkedIn' : p === 'instagram' ? 'IG' : 'X'}</button>
              ))}
            </div>
          </div>
          <div className="card-b flush">
            {TRENDS.filter(t => platformFilter === 'all' || t.platforms.includes(platformFilter)).map((t, i) => (
              <div key={t.id} style={{ padding: 14, borderBottom: '1px solid var(--line-1)', display: 'flex', gap: 14, alignItems: 'flex-start', cursor: 'pointer', transition: 'background 150ms' }}
                   onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-2)'}
                   onMouseLeave={(e) => e.currentTarget.style.background = ''}
                   onClick={() => Store.openModal({ type: 'generate', prefill: { trend: t.topic, platform: t.platforms[0] } })}>
                <div style={{ width: 32, textAlign: 'center', color: 'var(--text-3)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>#{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row" style={{ gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 13.5, color: 'var(--text-0)', fontWeight: 500 }}>{t.topic}</span>
                    {t.opportunity === 'high' && <span className="badge accent dot">High opportunity</span>}
                    {t.opportunity === 'med' && <span className="badge warn dot">Medium</span>}
                    {t.opportunity === 'low' && <span className="badge">Low</span>}
                  </div>
                  <div className="row" style={{ gap: 10, fontSize: 11, color: 'var(--text-3)' }}>
                    <div className="row" style={{ gap: 3 }}>{t.platforms.map(p => {
                      const Pc = Platforms[p];
                      return <span key={p} style={{ transform: 'scale(0.8)', transformOrigin: 'left' }}><Pc /></span>;
                    })}</div>
                    <span>Window: {t.window}</span>
                    <span>·</span>
                    <span>Velocity {t.velocity}/100</span>
                  </div>
                  <div style={{ marginTop: 6, height: 3, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${t.velocity}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--teal))' }}></div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ok)' }}>{t.change}</div>
                  <button className="btn sm" style={{ marginTop: 6 }} onClick={(e) => { e.stopPropagation(); Store.openModal({ type: 'generate', prefill: { trend: t.topic, platform: t.platforms[0] } }); }}><I.Sparkles size={10} /> Draft</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-h">
            <h3>Keyword intelligence</h3>
            <span className="badge teal dot">42 ranked</span>
          </div>
          <div className="card-b flush">
            {[
              { kw: 'EB1A criteria', score: 91, vol: '14.2K', diff: 'Low', trend: '+18%' },
              { kw: 'extraordinary ability visa', score: 87, vol: '8.4K', diff: 'Low', trend: '+12%' },
              { kw: 'self petition green card', score: 84, vol: '6.1K', diff: 'Med', trend: '+28%' },
              { kw: 'O1 to EB1A', score: 82, vol: '4.8K', diff: 'Low', trend: '+24%' },
              { kw: 'EB1A approval rate 2026', score: 78, vol: '3.2K', diff: 'Low', trend: '+44%' },
              { kw: 'recommendation letter EB1A', score: 76, vol: '2.9K', diff: 'Low', trend: '+8%' },
              { kw: 'EB1A vs NIW', score: 73, vol: '5.1K', diff: 'Med', trend: '+6%' },
            ].map((k, i) => (
              <div key={i} className="row" style={{ padding: '10px 14px', gap: 10, borderBottom: '1px solid var(--line-1)', cursor: 'pointer', background: selectedKeyword === k.kw ? 'var(--accent-bg)' : '' }}
                   onClick={() => { setSelectedKeyword(k.kw); Store.toast('Keyword tracked', `Agents will prioritize "${k.kw}"`, 'ok'); }}>
                <div style={{ width: 28, height: 20, background: 'var(--accent-bg)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--accent-1)', flex: '0 0 28px' }}>{k.score}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.kw}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{k.vol}/mo · {k.diff} diff</div>
                </div>
                <span className="mono" style={{ fontSize: 11, color: 'var(--ok)' }}>{k.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-h">
          <h3>Competitor pulse <span className="subtitle">{state.trackedCompetitors.length} tracked accounts · 7-day snapshot</span></h3>
          <button className="btn sm ghost" onClick={() => Store.openModal({ type: 'add-competitor' })}><I.Plus size={11} /> Add competitor</button>
        </div>
        <div className="card-b flush">
          <table className="tbl">
            <thead>
              <tr><th>Competitor</th><th>Followers</th><th>Posts (7d)</th><th>Engagement</th><th>Trend</th><th>Top topic</th><th>Signal</th><th></th></tr>
            </thead>
            <tbody>
              {state.trackedCompetitors.map(c => (
                <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => Store.toast(c.name, `Full analysis: ${c.posts_7d} posts in 7d, top topic "${c.top_topic}"`, 'info')}>
                  <td><div className="row" style={{ gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--text-1)' }}>{c.name.slice(0, 2).toUpperCase()}</div>
                    <div><div className="text-0" style={{ fontSize: 12.5, fontWeight: 500 }}>{c.name}</div><div className="muted mono" style={{ fontSize: 10.5 }}>{c.handle}</div></div>
                  </div></td>
                  <td className="num">{c.followers.toLocaleString()}</td>
                  <td className="num">{c.posts_7d}</td>
                  <td className="num">{c.engagement}%</td>
                  <td className={c.trend.startsWith('+') ? 'num' : 'num'}><span style={{ color: c.trend.startsWith('+') ? 'var(--ok)' : 'var(--err)' }}>{c.trend}</span></td>
                  <td className="muted">{c.top_topic}</td>
                  <td>
                    {c.flag === 'accelerating' && <span className="badge err dot">Accelerating</span>}
                    {c.flag === 'rising' && <span className="badge warn dot">Rising</span>}
                    {c.flag === 'flat' && <span className="badge">Flat</span>}
                  </td>
                  <td><button className="btn sm ghost" onClick={(e) => { e.stopPropagation(); Store.toast('Opening details', c.name, 'info'); }}><I.ArrowRight size={11} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Influencers() {
  const state = useStore();
  const selected = state.selectedInfluencers;
  const toggle = (id) => Store.toggleInfluencer(id);
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('alignment');
  const [minFollowers, setMinFollowers] = React.useState(10000);
  const [minAuth, setMinAuth] = React.useState(90);
  const [nicheFilters, setNicheFilters] = React.useState(new Set(['faang', 'ml', 'tech', 'ai', 'phd', 'eb1a']));
  const [platformFilters, setPlatformFilters] = React.useState(new Set(['linkedin', 'instagram', 'x']));
  const [locFilters, setLocFilters] = React.useState(new Set(['us']));

  // Map filter id -> exact niche string used in INFLUENCERS data
  const nicheMap = {
    faang: 'FAANG engineers',
    ml: 'ML engineers',
    eb1a: 'EB1A/O-1A creators',
    tech: 'Tech immigration',
    ai: 'AI research + visas',
    founder: 'Startup founder visa',
    phd: 'PhD pathway',
    pm: 'PM / leadership',
    edu: 'Immigration education',
    design: 'Designer IC',
    gc: 'Green card journey',
  };

  let list = INFLUENCERS.filter(i => i.followers >= minFollowers && i.authenticity >= minAuth);
  if (nicheFilters.size > 0) {
    const allowed = new Set([...nicheFilters].map(id => nicheMap[id]).filter(Boolean));
    list = list.filter(i => allowed.has(i.niche));
  }
  if (platformFilters.size > 0) list = list.filter(i => platformFilters.has(i.platform));
  if (locFilters.size > 0) list = list.filter(i => locFilters.has(i.country));
  if (search) list = list.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.handle.toLowerCase().includes(search.toLowerCase()) || i.niche.toLowerCase().includes(search.toLowerCase()) || i.location.toLowerCase().includes(search.toLowerCase()));
  if (sort === 'alignment') list = [...list].sort((a, b) => b.alignment - a.alignment);
  if (sort === 'followers') list = [...list].sort((a, b) => b.followers - a.followers);
  if (sort === 'engagement') list = [...list].sort((a, b) => b.engagement - a.engagement);

  const togSet = (setter, set, id) => {
    const s = new Set(set);
    if (s.has(id)) s.delete(id); else s.add(id);
    setter(s);
  };

  const resetFilters = () => {
    setMinFollowers(1000); setMinAuth(0);
    setNicheFilters(new Set(Object.keys(nicheMap))); setPlatformFilters(new Set(['linkedin', 'instagram', 'x', 'youtube'])); setLocFilters(new Set());
    Store.toast('Filters reset', '', 'info');
  };

  return (
    <div className="page" style={{ maxWidth: 'none' }}>
      <div className="page-h">
        <div>
          <div className="eyebrow">Intelligence · Influencer Engine</div>
          <h1>Influencer Discovery</h1>
          <p>2,140 influencers scanned across your niche. Filtered by authenticity score, brand alignment, and engagement health.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn" onClick={() => Store.openModal({ type: 'shortlist-export' })}><I.Download size={12} /> Export shortlist</button>
          <button className="btn primary" disabled={!selected.length} onClick={() => Store.openModal({ type: 'shortlist-export' })}><I.Send size={12} /> Outreach ({selected.length})</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16 }}>
        <div className="card" style={{ alignSelf: 'start' }}>
          <div className="card-h"><h3>Filters</h3><button className="btn sm ghost" onClick={resetFilters}>Reset</button></div>
          <div className="card-b col" style={{ gap: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Niche</div>
              <div className="col" style={{ gap: 4 }}>
                {[
                  { id: 'faang', label: 'FAANG engineers', count: 1240, hot: true },
                  { id: 'ml', label: 'ML engineers / researchers', count: 718, hot: true },
                  { id: 'eb1a', label: 'EB1A / O-1A creators', count: 94, badge: 'adjacent' },
                  { id: 'tech', label: 'Tech immigration', count: 842 },
                  { id: 'ai', label: 'AI research + visas', count: 318 },
                  { id: 'founder', label: 'Startup founders', count: 289 },
                  { id: 'phd', label: 'PhD pathway', count: 196 },
                  { id: 'pm', label: 'PM / leadership', count: 412 },
                  { id: 'edu', label: 'Immigration education', count: 168 },
                  { id: 'gc', label: 'Green card journey', count: 224 },
                  { id: 'design', label: 'Designer IC', count: 86 },
                ].map(o => {
                  const isOn = nicheFilters.has(o.id);
                  return (
                    <label key={o.id} className="row" style={{ gap: 8, fontSize: 12, cursor: 'pointer', padding: '2px 0' }} onClick={() => togSet(setNicheFilters, nicheFilters, o.id)}>
                      <input type="checkbox" checked={isOn} onChange={() => {}} style={{ accentColor: 'var(--accent)' }} />
                      <span style={{ color: isOn ? 'var(--text-0)' : 'var(--text-2)' }}>{o.label}</span>
                      {o.hot && <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--warn)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>· hot</span>}
                      {o.badge && <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--teal-1)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>· {o.badge}</span>}
                      <span style={{ marginLeft: 'auto', color: 'var(--text-4)', fontSize: 11 }} className="mono">{o.count}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Platform</div>
              <div className="col" style={{ gap: 4 }}>
                {[
                  { id: 'linkedin', label: 'LinkedIn', count: 1024 },
                  { id: 'instagram', label: 'Instagram', count: 612 },
                  { id: 'x', label: 'X', count: 384 },
                  { id: 'youtube', label: 'YouTube', count: 142 },
                ].map(o => {
                  const isOn = platformFilters.has(o.id);
                  return (
                    <label key={o.id} className="row" style={{ gap: 8, fontSize: 12, cursor: 'pointer', padding: '2px 0' }} onClick={() => togSet(setPlatformFilters, platformFilters, o.id)}>
                      <input type="checkbox" checked={isOn} onChange={() => {}} style={{ accentColor: 'var(--accent)' }} />
                      <span style={{ color: isOn ? 'var(--text-0)' : 'var(--text-2)' }}>{o.label}</span>
                      <span style={{ marginLeft: 'auto', color: 'var(--text-4)', fontSize: 11 }} className="mono">{o.count}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Min followers</div>
              <input type="range" min="1000" max="500000" value={minFollowers} onChange={(e) => setMinFollowers(+e.target.value)} style={{ width: '100%', accentColor: 'var(--accent)' }} />
              <div className="row" style={{ justifyContent: 'space-between', fontSize: 10.5, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginTop: 2 }}><span>≥ {(minFollowers / 1000).toFixed(0)}K</span><span>500K</span></div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Min authenticity</div>
              <input type="range" min="0" max="100" value={minAuth} onChange={(e) => setMinAuth(+e.target.value)} style={{ width: '100%', accentColor: 'var(--accent)' }} />
              <div className="mono muted" style={{ fontSize: 10.5, textAlign: 'right' }}>≥ {minAuth}%</div>
            </div>
            <div>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Country / region</div>
                {locFilters.size > 0 && <button className="btn sm ghost" style={{ padding: '2px 6px', fontSize: 10 }} onClick={() => setLocFilters(new Set())}>Clear</button>}
              </div>
              <div className="col" style={{ gap: 4 }}>
                {COUNTRIES.map(c => {
                  const count = INFLUENCERS.filter(i => i.country === c.id).length;
                  const isOn = locFilters.has(c.id);
                  return (
                    <label key={c.id} className="row" style={{ gap: 8, fontSize: 12, cursor: 'pointer', padding: '2px 0' }} onClick={() => togSet(setLocFilters, locFilters, c.id)}>
                      <input type="checkbox" checked={isOn} onChange={() => {}} style={{ accentColor: 'var(--accent)' }} />
                      <span style={{ fontSize: 13, lineHeight: 1, width: 14 }}>{c.flag}</span>
                      <span style={{ color: isOn ? 'var(--text-0)' : 'var(--text-2)' }}>{c.label}</span>
                      <span style={{ marginLeft: 'auto', color: 'var(--text-4)', fontSize: 11 }} className="mono">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="col" style={{ gap: 12 }}>
          <div className="row" style={{ gap: 8 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <I.Search size={13} style={{ position: 'absolute', left: 10, top: 8, color: 'var(--text-3)' }} />
              <input placeholder="Search influencers or niche keywords…" value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', height: 30, background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 6, padding: '0 10px 0 30px', color: 'var(--text-1)', fontSize: 12, outline: 'none' }} />
            </div>
            <div className="segmented">
              {[{ v: 'alignment', l: 'Alignment ↓' }, { v: 'followers', l: 'Followers' }, { v: 'engagement', l: 'Engagement' }].map(o => (
                <button key={o.v} className={sort === o.v ? 'active' : ''} onClick={() => setSort(o.v)}>{o.l}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
            {list.map(inf => {
              const Pc = Platforms[inf.platform];
              const isSelected = selected.includes(inf.id);
              return (
                <div key={inf.id} className="card" style={{ borderColor: isSelected ? 'var(--accent)' : '', background: isSelected ? 'rgba(124,92,255,0.04)' : '', cursor: 'pointer' }} onClick={() => Store.openModal({ type: 'influencer-outreach', influencer: inf })}>
                  <div className="card-b">
                    <div className="row" style={{ gap: 10, marginBottom: 12 }}>
                      <div className="avatar lg">{inf.name.split(' ').map(s => s[0]).join('')}</div>
                      <div style={{ flex: 1 }}>
                        <div className="row" style={{ gap: 6 }}>
                          <span style={{ fontSize: 13.5, color: 'var(--text-0)', fontWeight: 600 }}>{inf.name}</span>
                          <Pc />
                        </div>
                        <div className="muted mono" style={{ fontSize: 11 }}>{inf.handle}</div>
                      </div>
                      <button className={'btn icon-only ' + (isSelected ? 'primary' : '')} onClick={(e) => { e.stopPropagation(); toggle(inf.id); }} title={isSelected ? 'Remove from shortlist' : 'Add to shortlist'}>
                        {isSelected ? <I.Check size={12} /> : <I.Plus size={12} />}
                      </button>
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-2)', marginBottom: 10 }}>
                      <span className="badge" style={{ marginRight: 4 }}><I.MapPin size={9} /> {inf.location}</span>
                      <span className="badge accent">{inf.niche}</span>
                    </div>
                    <div className="grid-3" style={{ gap: 8 }}>
                      <Metric label="Followers" value={(inf.followers / 1000).toFixed(0) + 'K'} />
                      <Metric label="Engage" value={inf.engagement + '%'} accent />
                      <Metric label="Rate" value={inf.rate} />
                    </div>
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line-1)' }}>
                      <ScoreBar label="Authenticity" value={inf.authenticity} />
                      <ScoreBar label="Brand alignment" value={inf.alignment} />
                    </div>
                  </div>
                </div>
              );
            })}
            {!list.length && <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-3)', fontSize: 13, gridColumn: '1/-1', border: '1px dashed var(--line-2)', borderRadius: 8 }}>No matches — try loosening filters.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, options }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{label}</div>
      <div className="col" style={{ gap: 4 }}>
        {options.map(o => (
          <label key={o.id} className="row" style={{ gap: 8, fontSize: 12, cursor: 'default', padding: '2px 0' }}>
            <input type="checkbox" defaultChecked={o.active} style={{ accentColor: 'var(--accent)' }} />
            <span style={{ color: o.active ? 'var(--text-0)' : 'var(--text-2)' }}>{o.label}</span>
            <span style={{ marginLeft: 'auto', color: 'var(--text-4)', fontSize: 11 }} className="mono">{o.count}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value, accent }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{label}</div>
      <div className="num" style={{ fontSize: 14, fontWeight: 600, color: accent ? 'var(--teal-1)' : 'var(--text-0)', marginTop: 2 }}>{value}</div>
    </div>
  );
}

function ScoreBar({ label, value }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div className="row" style={{ justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
        <span style={{ color: 'var(--text-2)' }}>{label}</span>
        <span className="num" style={{ color: 'var(--text-0)', fontWeight: 500 }}>{value}</span>
      </div>
      <div className="progress" style={{ height: 3 }}><div style={{ width: `${value}%`, background: value > 90 ? 'var(--teal)' : 'var(--accent)' }}></div></div>
    </div>
  );
}

Object.assign(window, { Calendar, Trends, Influencers });
