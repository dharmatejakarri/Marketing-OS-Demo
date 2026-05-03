// Approval workflow — full preview with side-by-side platform mockups + approve/reject/revise

function ApprovalWorkflow({ variant = 'sidebyside', onVariantChange }) {
  const state = useStore();
  const pending = state.posts.filter(p => p.status === 'pending_review' || p.status === 'rejected');
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const post = pending[currentIdx] || pending[0] || state.posts[0];

  React.useEffect(() => {
    if (currentIdx >= pending.length && pending.length > 0) setCurrentIdx(pending.length - 1);
  }, [pending.length]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'a' || e.key === 'A') { e.preventDefault(); if (post) Store.openModal({ type: 'schedule', postId: post.id }); }
      if (e.key === 'r' || e.key === 'R') { e.preventDefault(); if (post) Store.openModal({ type: 'reject-reason', postId: post.id }); }
      if (e.key === 'e' || e.key === 'E') { e.preventDefault(); if (post) Store.openModal({ type: 'revise-note', postId: post.id }); }
      if (e.key === 'ArrowRight') setCurrentIdx(i => Math.min(pending.length - 1, i + 1));
      if (e.key === 'ArrowLeft') setCurrentIdx(i => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [post, pending.length]);

  if (!post) {
    return (
      <div className="page">
        <div className="page-h">
          <div>
            <div className="eyebrow">Approval Queue</div>
            <h1>All clear</h1>
            <p>Nothing waiting for review. Agents are still generating in the background.</p>
          </div>
          <button className="btn primary" onClick={() => Store.openModal({ type: 'generate' })}><I.Sparkles size={12} /> Generate a draft</button>
        </div>
      </div>
    );
  }

  const Pc = Platforms[post.platform];

  return (
    <div className="page" style={{ maxWidth: 1600 }}>
      <div className="page-h">
        <div>
          <div className="eyebrow">Approval Queue · {currentIdx + 1} of {pending.length}</div>
          <h1>Review & Approve</h1>
          <p>All 6 automated review layers passed. Final human approval triggers publishing. Rejection re-runs the creative loop.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <div className="row" style={{ gap: 4 }}>
            <button className="btn icon-only" onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}><I.ChevronLeft size={13} /></button>
            <button className="btn icon-only" onClick={() => setCurrentIdx(Math.min(pending.length - 1, currentIdx + 1))}><I.ChevronRight size={13} /></button>
          </div>
          <div className="segmented">
            {['sidebyside', 'stack', 'mobile'].map(v => (
              <button key={v} className={variant === v ? 'active' : ''} onClick={() => onVariantChange && onVariantChange(v)}>{v === 'sidebyside' ? 'Side-by-side' : v === 'stack' ? 'Stack' : 'Mobile'}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        display: variant === 'mobile' ? 'flex' : 'grid',
        flexDirection: variant === 'mobile' ? 'column' : undefined,
        alignItems: variant === 'mobile' ? 'stretch' : undefined,
        gridTemplateColumns: variant === 'sidebyside' ? '1.4fr 1fr' : variant === 'stack' ? '1fr' : undefined,
        maxWidth: variant === 'mobile' ? 460 : undefined,
        margin: variant === 'mobile' ? '0 auto' : undefined,
        gap: 16,
      }}>
        {/* LEFT — platform preview */}
        <div>
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="card-h">
              <div className="row" style={{ gap: 10 }}>
                <Pc />
                <div>
                  <div style={{ fontSize: 13, color: 'var(--text-0)', fontWeight: 500 }}>{post.title}</div>
                  <div className="row" style={{ gap: 6, fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                    <span className="mono">{post.type}</span>
                    <span>·</span>
                    <span>Generated {post.generated}</span>
                    <span>·</span>
                    <span>Persona: {post.persona}</span>
                  </div>
                </div>
              </div>
              <div className="row" style={{ gap: 6 }}>
                <button className="btn sm" onClick={() => Store.toast('Preview link copied', 'eb1a.co/p/' + post.id, 'ok')}><I.Link size={11} /> Copy preview link</button>
                <button className="btn sm ghost icon-only" onClick={() => Store.regeneratePost(post.id)}><I.Refresh size={12} /></button>
              </div>
            </div>
            <div style={{ padding: 16, background: 'var(--bg-2)', display: 'flex', justifyContent: 'center' }}>
              <PlatformMock post={post} />
            </div>
          </div>

          {/* Copy block */}
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="card-h">
              <h3>Copy <span className="subtitle">Generated by Writer agent</span></h3>
              <button className="btn sm ghost" onClick={() => Store.regeneratePost(post.id)}><I.Refresh size={11} /> Regenerate</button>
            </div>
            <div className="card-b">
              <div style={{ fontSize: 13, color: 'var(--text-1)', whiteSpace: 'pre-wrap', lineHeight: 1.55, marginBottom: 12 }}>
                {post.body}
              </div>
              {post.hashtags.length > 0 && (
                <div className="row" style={{ gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
                  {post.hashtags.map(h => (
                    <span key={h} className="mono" style={{ fontSize: 11, color: 'var(--teal-1)', background: 'var(--teal-bg)', padding: '2px 6px', borderRadius: 3 }}>{h}</span>
                  ))}
                </div>
              )}
              <div style={{ padding: 10, background: 'var(--bg-2)', borderRadius: 6, border: '1px solid var(--line-1)' }}>
                <div className="row" style={{ gap: 6, marginBottom: 4 }}>
                  <I.Zap size={11} style={{ color: 'var(--accent-1)' }} />
                  <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>CTA</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-0)' }}>{post.cta}</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — review panel */}
        <div className="col">
          {/* Decision controls */}
          <div className="card">
            <div className="card-b">
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 2 }}>AGENT SCORE</div>
                  <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--text-0)', lineHeight: 1 }} className="num">{post.score}<span style={{ fontSize: 14, color: 'var(--text-3)' }}>/100</span></div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 2 }}>EST. REACH</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-0)' }} className="num">{post.reach_est}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 2 }}>ENGAGEMENT</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--teal-1)' }} className="num">{post.engage_est}</div>
                </div>
              </div>

              {post.status === 'approved' && (
                <div className="card-b" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                  <div className="row" style={{ gap: 8 }}>
                    <I.CheckCircle size={14} style={{ color: 'var(--ok)' }} />
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ok)' }}>Approved — sent to scheduler</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-2)', marginTop: 4 }}>Scheduled: {post.scheduled}</div>
                </div>
              )}

              {post.status === 'rejected' && (
                <div className="card-b" style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                  <div className="row" style={{ gap: 8 }}>
                    <I.Refresh size={14} style={{ color: 'var(--err)' }} />
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--err)' }}>Rejected — regenerating</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-2)', marginTop: 4 }}>Agents are drafting a new version. ETA 2–3 min.</div>
                </div>
              )}

              <div className="row" style={{ gap: 6 }}>
                <button className="btn danger lg" style={{ flex: 1 }} onClick={() => Store.openModal({ type: 'reject-reason', postId: post.id })}><I.ThumbsDown size={13} /> Reject & regenerate</button>
                <button className="btn lg" style={{ flex: 1 }} onClick={() => Store.openModal({ type: 'revise-note', postId: post.id })}><I.Edit size={13} /> Request revision</button>
                <button className="btn primary lg" style={{ flex: 1.2 }} onClick={() => Store.openModal({ type: 'schedule', postId: post.id })}><I.Check size={13} /> Approve & schedule</button>
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--text-4)', marginTop: 8, textAlign: 'center' }}>
                <kbd>A</kbd> approve · <kbd>R</kbd> reject · <kbd>E</kbd> edit · <kbd>→</kbd> next
              </div>
            </div>
          </div>

          {/* Review checks */}
          <div className="card">
            <div className="card-h">
              <h3>Automated review <span className="subtitle">6 of 6 layers</span></h3>
              <span className="badge ok dot">All passed</span>
            </div>
            <div className="card-b flush">
              {[
                { label: 'Editorial review', meta: 'Tone, grammar, hook strength', status: post.reviews.editorial, agent: 'GPT-4 + custom fine-tune' },
                { label: 'Brand consistency', meta: 'Voice profile, banned phrases, style guide', status: post.reviews.brand, agent: 'Brand Guardian v2.1' },
                { label: 'Content compliance', meta: 'Legal, immigration claims, outcome promises', status: post.reviews.compliance, agent: 'Compliance Shield' },
                { label: 'Design quality', meta: 'Visual hierarchy, contrast, readability', status: post.reviews.design, agent: 'Design Critic' },
                { label: 'Platform formatting', meta: 'Char count, aspect ratio, hashtag cap', status: post.reviews.format, agent: 'Format Validator' },
                { label: 'Engagement optimization', meta: 'CTA position, hook score, scroll-stop prediction', status: post.reviews.engagement, agent: 'Engagement Predictor' },
              ].map((r, i) => (
                <div key={i} className="row" style={{ padding: '10px 14px', borderBottom: '1px solid var(--line-1)', gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 9, background: r.status === 'pass' ? 'rgba(74,222,128,0.15)' : r.status === 'warn' ? 'rgba(251,191,36,0.15)' : 'rgba(248,113,113,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 18px' }}>
                    {r.status === 'pass' ? <I.Check size={11} style={{ color: 'var(--ok)' }} /> : r.status === 'warn' ? <I.AlertTriangle size={10} style={{ color: 'var(--warn)' }} /> : <I.X size={11} style={{ color: 'var(--err)' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{r.meta}</div>
                  </div>
                  <span className="mono muted" style={{ fontSize: 10 }}>{r.agent}</span>
                </div>
              ))}
            </div>
          </div>

          {post.rejection && (
            <div className="card" style={{ borderColor: 'rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.04)' }}>
              <div className="card-b">
                <div className="row" style={{ gap: 8, marginBottom: 6 }}>
                  <I.AlertTriangle size={14} style={{ color: 'var(--err)' }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--err)' }}>Compliance blocker</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-1)', lineHeight: 1.5 }}>{post.rejection}</div>
              </div>
            </div>
          )}

          {/* Trend + why */}
          <div className="card">
            <div className="card-h"><h3>Why this post?</h3></div>
            <div className="card-b col" style={{ gap: 10 }}>
              <div className="row" style={{ gap: 10 }}>
                <I.TrendingUp size={14} style={{ color: 'var(--accent-1)', marginTop: 2, flex: '0 0 14px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{post.trend || 'Content gap — no competitor post this week'}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Velocity +312% in last 18h. Only 2 competitors have posted on this topic.</div>
                </div>
              </div>
              <div className="row" style={{ gap: 10 }}>
                <I.Users size={14} style={{ color: 'var(--teal-1)', marginTop: 2, flex: '0 0 14px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>Target: {post.persona}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Matches 4 of 5 primary ICPs · 0.84 engagement probability</div>
                </div>
              </div>
              <div className="row" style={{ gap: 10 }}>
                <I.Clock size={14} style={{ color: 'var(--text-2)', marginTop: 2, flex: '0 0 14px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>Optimal publish time: Tomorrow 9:15 AM EST</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>LinkedIn audience peak for your followers' timezone cluster</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Renders a realistic platform preview
function PlatformMock({ post }) {
  if (post.platform === 'linkedin') return <LinkedInMock post={post} />;
  if (post.platform === 'instagram') return <InstagramMock post={post} />;
  if (post.platform === 'x') return <XMock post={post} />;
  if (post.platform === 'facebook') return <FacebookMock post={post} />;
  return <LinkedInMock post={post} />;
}

function LinkedInMock({ post }) {
  return (
    <div style={{ width: 440, background: 'white', color: '#000', borderRadius: 8, overflow: 'hidden', fontFamily: 'system-ui, sans-serif', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: 12, display: 'flex', gap: 10 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #7c5cff, #2dd4bf)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>EB</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>EB1A Experts</div>
          <div style={{ fontSize: 12, color: '#666' }}>AI-powered EB1A strategy · 12,840 followers</div>
          <div style={{ fontSize: 11, color: '#666' }}>2m · 🌐</div>
        </div>
      </div>
      <div style={{ padding: '0 12px 10px', fontSize: 13.5, whiteSpace: 'pre-wrap', lineHeight: 1.45 }}>{post.body}</div>
      <div style={{ padding: '0 12px 12px', fontSize: 12.5, color: '#0a66c2' }}>
        {post.hashtags.map(h => <span key={h} style={{ marginRight: 6 }}>{h}</span>)}
      </div>
      <div style={{ aspectRatio: '1.91/1', background: 'linear-gradient(135deg, #0f0f17 0%, #2a1a5e 50%, #0a3a3a 100%)', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9b82ff', letterSpacing: '0.1em' }}>EB1A EXPERTS · CARD 1 / 5</div>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 8 }}>{post.title}</div>
          <div style={{ fontSize: 13, color: '#c4c4d0' }}>Swipe to see the framework →</div>
        </div>
      </div>
      <div style={{ padding: '6px 12px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', fontSize: 12, color: '#666' }}>
        <span>👍❤️💡 542</span>
        <span>38 comments · 12 reposts</span>
      </div>
      <div style={{ display: 'flex', padding: 6, borderTop: '1px solid #eee' }}>
        {['👍 Like', '💬 Comment', '↻ Repost', '📤 Send'].map(a => (
          <div key={a} style={{ flex: 1, textAlign: 'center', padding: 6, fontSize: 12, color: '#666', fontWeight: 600 }}>{a}</div>
        ))}
      </div>
    </div>
  );
}

function InstagramMock({ post }) {
  return (
    <div style={{ width: 360, background: 'white', color: '#000', borderRadius: 8, overflow: 'hidden', fontFamily: 'system-ui, sans-serif', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #7c5cff, #2dd4bf)', padding: 2 }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'white', padding: 2 }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #7c5cff, #2dd4bf)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700 }}>EB</div>
          </div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>eb1aexperts <span style={{ color: '#666', fontWeight: 400 }}>· Sponsored</span></div>
        <div style={{ fontSize: 16 }}>⋯</div>
      </div>
      <div style={{ aspectRatio: post.type === 'reel' ? '9/16' : '4/5', maxHeight: 420, background: 'linear-gradient(135deg, #0f0f17, #2a1a5e 40%, #0a3a3a)', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#2dd4bf', letterSpacing: '0.08em' }}>EB1A EXPERTS</div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'white', lineHeight: 1.15, letterSpacing: '-0.02em' }}>{post.title}</div>
          {post.type === 'reel' && <div style={{ fontSize: 13, color: '#c4c4d0', marginTop: 8 }}>▶ Tap to watch · 0:58</div>}
        </div>
        {post.type === 'carousel' && (
          <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 11, padding: '3px 8px', borderRadius: 10 }}>1/5</div>
        )}
      </div>
      <div style={{ padding: '8px 12px', display: 'flex', gap: 14, fontSize: 22 }}>
        <span>♡</span><span>💬</span><span>↗</span><div style={{ flex: 1 }}></div><span>⊟</span>
      </div>
      <div style={{ padding: '0 12px 4px', fontSize: 12.5, fontWeight: 600 }}>4,218 likes</div>
      <div style={{ padding: '0 12px 8px', fontSize: 12.5 }}>
        <span style={{ fontWeight: 600 }}>eb1aexperts</span> {post.body.slice(0, 80)}…
      </div>
      <div style={{ padding: '0 12px 10px', fontSize: 12, color: '#00376b' }}>
        {post.hashtags.slice(0, 4).map(h => <span key={h} style={{ marginRight: 4 }}>{h}</span>)}
      </div>
    </div>
  );
}

function XMock({ post }) {
  return (
    <div style={{ width: 440, background: 'black', color: 'white', borderRadius: 12, overflow: 'hidden', fontFamily: 'system-ui, sans-serif', border: '1px solid #2f3336', boxShadow: '0 4px 24px rgba(0,0,0,0.6)' }}>
      <div style={{ padding: 14, display: 'flex', gap: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #7c5cff, #2dd4bf)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, flex: '0 0 40px' }}>EB</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14 }}>
            <span style={{ fontWeight: 700 }}>EB1A Experts</span>
            <span style={{ color: '#71767b', fontWeight: 400 }}> @eb1aexperts · 2m</span>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.4, marginTop: 4, whiteSpace: 'pre-wrap' }}>{post.body}</div>
          <div style={{ fontSize: 14, color: '#1d9bf0', marginTop: 6 }}>Show this thread</div>
          <div style={{ display: 'flex', marginTop: 14, color: '#71767b', fontSize: 13 }}>
            <div style={{ flex: 1 }}>💬 42</div>
            <div style={{ flex: 1 }}>↻ 128</div>
            <div style={{ flex: 1 }}>♡ 847</div>
            <div style={{ flex: 1 }}>📊 24.8K</div>
            <div>↗</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FacebookMock({ post }) {
  return (
    <div style={{ width: 440, background: 'white', color: '#000', borderRadius: 8, overflow: 'hidden', fontFamily: 'system-ui, sans-serif', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: 12, display: 'flex', gap: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #7c5cff, #2dd4bf)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>EB</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600 }}>EB1A Experts</div>
          <div style={{ fontSize: 11, color: '#65676b' }}>2m · 🌐</div>
        </div>
      </div>
      <div style={{ padding: '0 12px 12px', fontSize: 14, whiteSpace: 'pre-wrap' }}>{post.body}</div>
      <div style={{ aspectRatio: '1.91/1', background: 'linear-gradient(135deg, #0f0f17, #2a1a5e 50%, #0a3a3a)', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>{post.title}</div>
      </div>
      <div style={{ padding: '8px 12px', background: '#f0f2f5', fontSize: 11, color: '#65676b' }}>
        EB1AEXPERTS.COM
        <div style={{ fontSize: 14, color: '#050505', fontWeight: 600, marginTop: 2 }}>Get Your Free Eligibility Review</div>
      </div>
    </div>
  );
}

Object.assign(window, { ApprovalWorkflow });
