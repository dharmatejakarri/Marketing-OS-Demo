// Modals, Toasts, Command Palette overlay
// Mounted once at App root level.

function Modal({ children, onClose, width = 520, title, subtitle }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ width }} onClick={(e) => e.stopPropagation()}>
        {(title || subtitle) && (
          <div className="modal-header">
            <div>
              {title && <div className="modal-title">{title}</div>}
              {subtitle && <div className="modal-sub">{subtitle}</div>}
            </div>
            <button className="btn ghost icon-only" onClick={onClose}><I.X size={14} /></button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// ---------- Toasts ----------
function Toasts() {
  const state = useStore();
  return (
    <div className="toast-stack">
      {state.toasts.map(t => (
        <div key={t.id} className={'toast ' + (t.kind || 'info')}>
          <div className="toast-ic">
            {t.kind === 'ok' && <I.Check size={12} />}
            {t.kind === 'warn' && <I.AlertTriangle size={12} />}
            {t.kind === 'info' && <I.Info size={12} />}
          </div>
          <div>
            <div className="toast-title">{t.title}</div>
            {t.body && <div className="toast-body">{t.body}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Command Palette ----------
function CommandPalette({ onNavigate }) {
  const state = useStore();
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);
  React.useEffect(() => { if (state.commandOpen) setTimeout(() => inputRef.current?.focus(), 10); }, [state.commandOpen]);

  const commands = React.useMemo(() => ([
    { id: 'nav-dashboard', group: 'Navigate', label: 'Go to Command Center', kbd: '⌘1', run: () => onNavigate('dashboard'), icon: 'Dashboard' },
    { id: 'nav-queue', group: 'Navigate', label: 'Go to Content Queue', kbd: '⌘2', run: () => onNavigate('queue'), icon: 'Sparkles' },
    { id: 'nav-approval', group: 'Navigate', label: 'Go to Review & Approve', kbd: '⌘3', run: () => onNavigate('approval'), icon: 'Shield' },
    { id: 'nav-calendar', group: 'Navigate', label: 'Go to Calendar', kbd: '⌘4', run: () => onNavigate('calendar'), icon: 'Calendar' },
    { id: 'nav-analytics', group: 'Navigate', label: 'Go to Analytics', kbd: '⌘5', run: () => onNavigate('analytics'), icon: 'BarChart' },
    { id: 'nav-trends', group: 'Navigate', label: 'Go to Trends & Competitors', run: () => onNavigate('trends'), icon: 'TrendingUp' },
    { id: 'nav-influencers', group: 'Navigate', label: 'Go to Influencer Engine', run: () => onNavigate('influencers'), icon: 'Users' },
    { id: 'nav-daily', group: 'Navigate', label: 'Go to Daily Brief', run: () => onNavigate('daily'), icon: 'Mail' },
    { id: 'nav-knowledge', group: 'Navigate', label: 'Go to Knowledge Base', run: () => onNavigate('onboarding'), icon: 'Book' },
    { id: 'nav-settings', group: 'Navigate', label: 'Go to Settings', run: () => onNavigate('settings'), icon: 'Settings' },
    { id: 'act-generate', group: 'Actions', label: 'Generate new post…', run: () => Store.openModal({ type: 'generate' }), icon: 'Sparkles' },
    { id: 'act-upload', group: 'Actions', label: 'Upload document', run: () => Store.openModal({ type: 'upload' }), icon: 'Upload' },
    { id: 'act-competitor', group: 'Actions', label: 'Track new competitor', run: () => Store.openModal({ type: 'add-competitor' }), icon: 'Target' },
    { id: 'act-invite', group: 'Actions', label: 'Invite teammate', run: () => Store.openModal({ type: 'invite' }), icon: 'Users' },
    { id: 'act-brief', group: 'Actions', label: 'Send daily brief now', run: () => { Store.toast('Brief dispatched', 'Sent to owner@eb1aexperts.com', 'ok'); }, icon: 'Mail' },
    { id: 'act-pause', group: 'Actions', label: 'Pause all agents', run: () => Store.toast('Agents paused', 'Generation + publishing halted', 'warn'), icon: 'Pause' },
  ]), [onNavigate]);

  const filtered = commands.filter(c => c.label.toLowerCase().includes(q.toLowerCase()));
  const grouped = filtered.reduce((acc, c) => { (acc[c.group] = acc[c.group] || []).push(c); return acc; }, {});

  if (!state.commandOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => Store.toggleCommand(false)} style={{ alignItems: 'flex-start', paddingTop: '10vh' }}>
      <div className="modal cmdk" onClick={(e) => e.stopPropagation()} style={{ width: 560, padding: 0 }}>
        <div className="cmdk-input">
          <I.Search size={14} style={{ color: 'var(--text-3)' }} />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Type a command or search…"
          />
          <span className="kbd">Esc</span>
        </div>
        <div className="cmdk-list">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group}>
              <div className="cmdk-group">{group}</div>
              {items.map(c => {
                const Ic = I[c.icon] || I.ChevronRight;
                return (
                  <div key={c.id} className="cmdk-item" onClick={() => { c.run(); Store.toggleCommand(false); setQ(''); }}>
                    <Ic size={14} style={{ color: 'var(--text-2)' }} />
                    <span>{c.label}</span>
                    {c.kbd && <span className="kbd" style={{ marginLeft: 'auto' }}>{c.kbd}</span>}
                  </div>
                );
              })}
            </div>
          ))}
          {!filtered.length && <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-3)', fontSize: 12 }}>No results</div>}
        </div>
      </div>
    </div>
  );
}

// ---------- Modal Router ----------
function ModalRoot({ onNavigate }) {
  const state = useStore();
  const m = state.modal;
  if (!m) return null;

  if (m.type === 'generate') return <GenerateWizard onClose={Store.closeModal} onDone={(post) => { Store.closeModal(); onNavigate('approval'); Store.toggleCommand(false); }} prefill={m.prefill} />;
  if (m.type === 'upload') return <UploadDocsModal onClose={Store.closeModal} />;
  if (m.type === 'add-competitor') return <AddCompetitorModal onClose={Store.closeModal} />;
  if (m.type === 'invite') return <InviteModal onClose={Store.closeModal} />;
  if (m.type === 'reject-reason') return <RejectModal postId={m.postId} onClose={Store.closeModal} />;
  if (m.type === 'revise-note') return <ReviseModal postId={m.postId} onClose={Store.closeModal} />;
  if (m.type === 'schedule') return <ScheduleModal postId={m.postId} onClose={Store.closeModal} />;
  if (m.type === 'persona-edit') return <PersonaEditModal persona={m.persona} onClose={Store.closeModal} />;
  if (m.type === 'doc-preview') return <DocPreviewModal doc={m.doc} onClose={Store.closeModal} />;
  if (m.type === 'influencer-outreach') return <OutreachModal influencer={m.influencer} onClose={Store.closeModal} />;
  if (m.type === 'shortlist-export') return <ShortlistExportModal onClose={Store.closeModal} />;
  if (m.type === 'new-event') return <NewEventModal onClose={Store.closeModal} date={m.date} />;
  if (m.type === 'event-detail') return <EventDetailModal onClose={Store.closeModal} post={m.post} onOpen={() => { Store.closeModal(); onNavigate('approval'); }} />;
  if (m.type === 'notifications') return <NotificationsPanel onClose={Store.closeModal} onNavigate={onNavigate} />;
  if (m.type === 'account-connect') return <AccountConnectModal onClose={Store.closeModal} account={m.account} />;
  if (m.type === 'compose-email') return <ComposeEmailModal onClose={Store.closeModal} manual={m.manual} template={m.template} />;
  if (m.type === 'preview-email') return <PreviewEmailModal onClose={Store.closeModal} email={m.email} report={m.report} />;
  if (m.type === 'edit-report') return <EditReportModal onClose={Store.closeModal} report={m.report} />;
  if (m.type === 'add-integration') return <AddIntegrationModal onClose={Store.closeModal} />;
  if (m.type === 'integration-detail') return <IntegrationDetailModal onClose={Store.closeModal} integration={m.integration} />;
  return null;
}

// ---------- Individual modals ----------

function GenerateWizard({ onClose, onDone, prefill }) {
  const [step, setStep] = React.useState(1);
  const [config, setConfig] = React.useState({
    platform: prefill?.platform || 'linkedin',
    type: prefill?.type || 'single',
    persona: prefill?.persona || 'Senior tech IC considering self-petition',
    trend: prefill?.trend || null,
    tone: 'authoritative',
    goal: 'lead-gen',
  });
  const [generating, setGenerating] = React.useState(false);
  const [agentSteps, setAgentSteps] = React.useState([]);

  const startGen = () => {
    setStep(3);
    setGenerating(true);
    const stepsList = [
      { label: 'Research agent scanning trend context', duration: 700 },
      { label: 'Copy agent drafting hook variants', duration: 900 },
      { label: 'Compliance agent validating claims', duration: 600 },
      { label: 'Creative agent rendering visuals', duration: 800 },
      { label: 'Review agent scoring engagement', duration: 500 },
    ];
    let acc = 0;
    stepsList.forEach((s, i) => {
      setTimeout(() => setAgentSteps(prev => [...prev, { ...s, i, done: false }]), acc);
      acc += s.duration;
      setTimeout(() => setAgentSteps(prev => prev.map(p => p.i === i ? { ...p, done: true } : p)), acc);
    });
    setTimeout(() => {
      const title = config.trend
        ? `Hot take: ${config.trend} — what it means for EB-1A candidates`
        : 'The signal most petitions miss (and how to surface it)';
      const post = Store.createPost({
        platform: config.platform,
        type: config.type,
        persona: config.persona,
        trend: config.trend,
        title,
        body: 'Every approved EB-1A we\'ve worked on has one non-obvious common thread: evidence that forces the officer to say yes. Here\'s how we surface it.\n\nThe trick isn\'t adding more evidence — it\'s removing ambiguity. Three moves we run on every petition →',
        hashtags: ['#EB1A', '#GreenCard', '#ExtraordinaryAbility', '#USCIS'],
        cta: 'Book a free 20-min eligibility call',
      });
      setGenerating(false);
      setTimeout(() => onDone(post), 400);
    }, acc + 200);
  };

  return (
    <Modal onClose={onClose} width={560} title={step === 3 ? 'Generating your post' : 'New post'} subtitle={step === 3 ? 'Agents are working' : `Step ${step} of 2`}>
      {step === 1 && (
        <div className="modal-body">
          <div className="field-group">
            <label>Platform</label>
            <div className="pill-row">
              {['linkedin', 'instagram', 'x', 'facebook'].map(p => (
                <button key={p} className={'pill' + (config.platform === p ? ' active' : '')} onClick={() => setConfig({ ...config, platform: p })}>
                  <I.Globe size={11} /> {p}
                </button>
              ))}
            </div>
          </div>
          <div className="field-group">
            <label>Format</label>
            <div className="pill-row">
              {['single', 'carousel', 'reel', 'thread', 'story'].map(t => (
                <button key={t} className={'pill' + (config.type === t ? ' active' : '')} onClick={() => setConfig({ ...config, type: t })}>{t}</button>
              ))}
            </div>
          </div>
          <div className="field-group">
            <label>Audience persona</label>
            <select value={config.persona} onChange={e => setConfig({ ...config, persona: e.target.value })}>
              <option>Senior tech IC considering self-petition</option>
              <option>Mid-career PM, 7-10y, US-based</option>
              <option>Researcher/PhD audience</option>
              <option>O-1 holders considering upgrade</option>
              <option>Startup founder on E-2 looking to upgrade</option>
            </select>
          </div>
          <div className="field-group">
            <label>Anchor on a trend (optional)</label>
            <select value={config.trend || ''} onChange={e => setConfig({ ...config, trend: e.target.value || null })}>
              <option value="">— No trend anchor —</option>
              {window.TRENDS.map(t => <option key={t.id}>{t.topic}</option>)}
            </select>
          </div>
          <div className="modal-footer">
            <button className="btn ghost" onClick={onClose}>Cancel</button>
            <button className="btn primary" onClick={() => setStep(2)}>Continue <I.ArrowRight size={12} /></button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="modal-body">
          <div className="field-group">
            <label>Tone</label>
            <div className="pill-row">
              {['authoritative', 'empathetic', 'contrarian', 'educational', 'story-driven'].map(t => (
                <button key={t} className={'pill' + (config.tone === t ? ' active' : '')} onClick={() => setConfig({ ...config, tone: t })}>{t}</button>
              ))}
            </div>
          </div>
          <div className="field-group">
            <label>Primary goal</label>
            <div className="pill-row">
              {[{ v: 'lead-gen', l: 'Lead gen' }, { v: 'authority', l: 'Thought leadership' }, { v: 'awareness', l: 'Awareness' }, { v: 'engagement', l: 'Engagement' }].map(o => (
                <button key={o.v} className={'pill' + (config.goal === o.v ? ' active' : '')} onClick={() => setConfig({ ...config, goal: o.v })}>{o.l}</button>
              ))}
            </div>
          </div>
          <div className="hint-card">
            <div className="row" style={{ gap: 6, marginBottom: 6 }}>
              <I.Sparkles size={12} style={{ color: 'var(--accent-1)' }} />
              <span style={{ fontWeight: 600, fontSize: 12 }}>What happens next</span>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
              5 agents will run in sequence: research → copy → compliance → creative → review. The draft lands in <b>Review & Approve</b> with a quality score and 6-layer compliance trace.
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn ghost" onClick={() => setStep(1)}><I.ArrowLeft size={12} /> Back</button>
            <button className="btn primary" onClick={startGen}><I.Sparkles size={12} /> Generate</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="modal-body">
          <div className="agent-steps">
            {agentSteps.map((s, i) => (
              <div key={i} className={'agent-step' + (s.done ? ' done' : ' running')}>
                <div className="step-ic">
                  {s.done ? <I.Check size={12} /> : <div className="dot"></div>}
                </div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          {!generating && (
            <div className="row" style={{ gap: 8, marginTop: 12, justifyContent: 'center' }}>
              <div className="badge" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}>
                <I.Check size={11} /> Draft ready — opening review…
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

function UploadDocsModal({ onClose }) {
  const [uploading, setUploading] = React.useState(false);
  const [uploaded, setUploaded] = React.useState(false);
  const [files, setFiles] = React.useState(['Brand-Guidelines.pdf', 'ICP-Worksheet.docx']);

  const handle = () => {
    setUploading(true);
    setTimeout(() => {
      setFiles([...files, 'Q1-2026-Strategy.pdf']);
      setUploading(false);
      setUploaded(true);
      Store.toast('Documents uploaded', 'Analysis will run in the background', 'ok');
      setTimeout(onClose, 900);
    }, 1400);
  };

  return (
    <Modal onClose={onClose} title="Upload documents" subtitle="Service inputs, brand docs, personas, positioning" width={520}>
      <div className="modal-body">
        <div className="dropzone">
          <I.Upload size={18} style={{ color: 'var(--text-3)' }} />
          <div style={{ fontSize: 13, fontWeight: 500, marginTop: 8 }}>Drop files here or click to browse</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>PDF, DOCX, Markdown · up to 50MB each</div>
        </div>
        <div className="field-group">
          <label>Already uploaded ({files.length})</label>
          {files.map((f, i) => (
            <div key={i} className="doc-row">
              <I.FileText size={13} style={{ color: 'var(--accent-1)' }} />
              <span>{f}</span>
              <span style={{ color: 'var(--text-3)', fontSize: 11, marginLeft: 'auto' }}>Analyzed</span>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Close</button>
          <button className="btn primary" onClick={handle} disabled={uploading || uploaded}>
            {uploading ? <><div className="spin"></div> Uploading…</> : uploaded ? <><I.Check size={12} /> Uploaded</> : <><I.Upload size={12} /> Upload Q1 strategy</>}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function AddCompetitorModal({ onClose }) {
  const [name, setName] = React.useState('');
  const [handle, setHandle] = React.useState('');
  const submit = () => {
    if (!name.trim()) return;
    Store.addCompetitor(name, handle || '@' + name.toLowerCase().replace(/\s+/g, ''));
    onClose();
  };
  return (
    <Modal onClose={onClose} title="Track a new competitor" subtitle="Agents will begin scanning in 60 seconds" width={440}>
      <div className="modal-body">
        <div className="field-group">
          <label>Company name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Visa Partners LLC" autoFocus />
        </div>
        <div className="field-group">
          <label>Social handle (optional)</label>
          <input value={handle} onChange={e => setHandle(e.target.value)} placeholder="@visapartners" />
        </div>
        <div className="hint-card">
          <div style={{ fontSize: 11.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
            We'll scan their LinkedIn, Instagram, X, and any blog. You'll see 7-day activity in <b>Trends & Competitors</b>.
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={submit}>Add competitor</button>
        </div>
      </div>
    </Modal>
  );
}

function InviteModal({ onClose }) {
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('reviewer');
  const submit = () => {
    if (!email.includes('@')) { Store.toast('Invalid email', '', 'warn'); return; }
    Store.toast('Invite sent', `${email} · ${role}`, 'ok');
    onClose();
  };
  return (
    <Modal onClose={onClose} title="Invite teammate" width={440}>
      <div className="modal-body">
        <div className="field-group">
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="name@eb1aexperts.com" autoFocus />
        </div>
        <div className="field-group">
          <label>Role</label>
          <div className="pill-row">
            {[{ v: 'reviewer', l: 'Reviewer' }, { v: 'editor', l: 'Editor' }, { v: 'admin', l: 'Admin' }].map(o => (
              <button key={o.v} className={'pill' + (role === o.v ? ' active' : '')} onClick={() => setRole(o.v)}>{o.l}</button>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={submit}>Send invite</button>
        </div>
      </div>
    </Modal>
  );
}

function RejectModal({ postId, onClose }) {
  const [reason, setReason] = React.useState('');
  const quick = [
    'Claim too specific — soften with ranges',
    'Hook is weak, lead with stronger stat',
    'CTA should drive to quiz not consult',
    'Off-brand tone — make warmer',
  ];
  return (
    <Modal onClose={onClose} title="Reject & regenerate" subtitle="Agents will use your note to redraft" width={460}>
      <div className="modal-body">
        <div className="field-group">
          <label>Quick reasons</label>
          <div className="pill-col">
            {quick.map((q, i) => (
              <button key={i} className="pill" style={{ textAlign: 'left', justifyContent: 'flex-start' }} onClick={() => setReason(q)}>{q}</button>
            ))}
          </div>
        </div>
        <div className="field-group">
          <label>Or write your own</label>
          <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="What should the regeneration fix?" rows={3} />
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={() => { Store.rejectPost(postId, reason); onClose(); }} disabled={!reason.trim()}>Reject & regenerate</button>
        </div>
      </div>
    </Modal>
  );
}

function ReviseModal({ postId, onClose }) {
  const [note, setNote] = React.useState('');
  return (
    <Modal onClose={onClose} title="Request a revision" subtitle="Keep the direction, tweak the execution" width={460}>
      <div className="modal-body">
        <div className="field-group">
          <label>What to change</label>
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Shorten the hook to 7 words and swap hashtag #ImmigrationLaw for #Visa" rows={4} autoFocus />
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={() => { Store.requestRevision(postId, note); onClose(); }} disabled={!note.trim()}>Send to agents</button>
        </div>
      </div>
    </Modal>
  );
}

function ScheduleModal({ postId, onClose }) {
  const [date, setDate] = React.useState('tomorrow');
  const [time, setTime] = React.useState('09:15');
  const submit = () => {
    const dLabel = date === 'today' ? 'Today' : date === 'tomorrow' ? 'Tomorrow' : 'Next Monday';
    const hh = parseInt(time.split(':')[0]);
    const mm = time.split(':')[1];
    const ampm = hh >= 12 ? 'PM' : 'AM';
    const h12 = hh === 0 ? 12 : hh > 12 ? hh - 12 : hh;
    Store.approvePost(postId, `${dLabel}, ${h12}:${mm} ${ampm}`);
    onClose();
  };
  return (
    <Modal onClose={onClose} title="Schedule post" subtitle="Pick optimal timing" width={440}>
      <div className="modal-body">
        <div className="field-group">
          <label>Day</label>
          <div className="pill-row">
            {[{ v: 'today', l: 'Today' }, { v: 'tomorrow', l: 'Tomorrow' }, { v: 'monday', l: 'Next Monday' }].map(o => (
              <button key={o.v} className={'pill' + (date === o.v ? ' active' : '')} onClick={() => setDate(o.v)}>{o.l}</button>
            ))}
          </div>
        </div>
        <div className="field-group">
          <label>Time (your timezone: EST)</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        </div>
        <div className="hint-card">
          <div className="row" style={{ gap: 6, marginBottom: 4 }}>
            <I.Zap size={12} style={{ color: 'var(--accent-1)' }} />
            <span style={{ fontWeight: 600, fontSize: 12 }}>Optimal window</span>
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
            For your audience persona, LinkedIn engagement peaks between <b>7:30–9:30 AM EST</b> on weekdays.
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={submit}><I.Check size={12} /> Approve & schedule</button>
        </div>
      </div>
    </Modal>
  );
}

function PersonaEditModal({ persona, onClose }) {
  const [name, setName] = React.useState(persona?.name || '');
  const [traits, setTraits] = React.useState(persona?.traits?.join(', ') || '');
  return (
    <Modal onClose={onClose} title="Edit persona" width={480}>
      <div className="modal-body">
        <div className="field-group">
          <label>Persona name</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="field-group">
          <label>Traits (comma separated)</label>
          <textarea value={traits} onChange={e => setTraits(e.target.value)} rows={3} />
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={() => { Store.toast('Persona updated', name, 'ok'); onClose(); }}>Save</button>
        </div>
      </div>
    </Modal>
  );
}

function DocPreviewModal({ doc, onClose }) {
  return (
    <Modal onClose={onClose} title={doc?.name || 'Document'} subtitle="Analyzed & indexed" width={600}>
      <div className="modal-body">
        <div className="doc-meta">
          <div><span>Pages</span><b>{doc?.pages || 14}</b></div>
          <div><span>Analyzed</span><b>{doc?.analyzed || '2h ago'}</b></div>
          <div><span>Topics extracted</span><b>{doc?.topics || 23}</b></div>
          <div><span>Entities</span><b>{doc?.entities || 47}</b></div>
        </div>
        <div className="field-group">
          <label>Key findings</label>
          <ul className="find-list">
            <li>Core service positioning: evidence-architecture for EB-1A petitions</li>
            <li>3 primary ICPs identified (tech IC, PhD researcher, founder)</li>
            <li>Brand voice: authoritative but warm, data-forward, pro-immigrant</li>
            <li>Compliance constraints: no timeline guarantees, no success rates over 90%</li>
          </ul>
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Close</button>
          <button className="btn primary" onClick={() => { Store.toast('Re-analysis queued', '', 'info'); onClose(); }}><I.RefreshCw size={12} /> Re-analyze</button>
        </div>
      </div>
    </Modal>
  );
}

function OutreachModal({ influencer, onClose }) {
  const [message, setMessage] = React.useState(`Hi ${influencer?.name?.split(' ')[0] || 'there'},\n\nWe work with EB-1A candidates and loved your recent content on ${influencer?.niche || 'immigration'}. Would you be open to a paid collaboration next month?\n\n— Aditya @ EB1A Experts`);
  return (
    <Modal onClose={onClose} title={`Outreach to ${influencer?.name}`} subtitle={`${influencer?.handle} · ${influencer?.followers?.toLocaleString()} followers`} width={540}>
      <div className="modal-body">
        <div className="influencer-meta">
          <div><span>Authenticity</span><b>{influencer?.authenticity}</b></div>
          <div><span>Brand alignment</span><b>{influencer?.alignment}</b></div>
          <div><span>Est. rate</span><b>{influencer?.rate}</b></div>
          <div><span>Engagement</span><b>{influencer?.engagement}%</b></div>
        </div>
        <div className="field-group">
          <label>Message (AI-drafted)</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={6} />
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={() => { Store.toast('Draft saved', '', 'info'); onClose(); }}>Save draft</button>
          <button className="btn primary" onClick={() => { Store.toast('Outreach sent', `To ${influencer?.handle}`, 'ok'); onClose(); }}><I.Send size={12} /> Send DM</button>
        </div>
      </div>
    </Modal>
  );
}

function ShortlistExportModal({ onClose }) {
  const state = useStore();
  const picks = window.INFLUENCERS.filter(i => state.selectedInfluencers.includes(i.id));
  return (
    <Modal onClose={onClose} title="Export shortlist" subtitle={`${picks.length} influencer${picks.length === 1 ? '' : 's'} selected`} width={520}>
      <div className="modal-body">
        {picks.length === 0 && <div style={{ padding: 20, color: 'var(--text-3)', textAlign: 'center', fontSize: 12 }}>No influencers selected yet. Tap any card to add.</div>}
        {picks.map(p => (
          <div key={p.id} className="doc-row">
            <div className="avatar sm" style={{ background: 'var(--accent-bg)', color: 'var(--accent-1)' }}>{p.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 500 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{p.handle} · {p.niche}</div>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{p.rate}</span>
          </div>
        ))}
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Close</button>
          <button className="btn ghost" onClick={() => { Store.toast('CSV downloaded', '', 'ok'); onClose(); }}><I.Download size={12} /> Download CSV</button>
          <button className="btn primary" onClick={() => { Store.toast('Outreach campaign started', `${picks.length} recipients`, 'ok'); onClose(); }} disabled={!picks.length}><I.Send size={12} /> Send bulk outreach</button>
        </div>
      </div>
    </Modal>
  );
}

function NewEventModal({ onClose, date }) {
  return (
    <Modal onClose={onClose} title={`New post · ${date || 'Today'}`} width={440}>
      <div className="modal-body">
        <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 10 }}>Choose how to fill this slot:</div>
        <div className="action-stack">
          <button className="action-row" onClick={() => { onClose(); Store.openModal({ type: 'generate' }); }}>
            <div className="ar-ic"><I.Sparkles size={14} /></div>
            <div>
              <div className="ar-title">Generate with agents</div>
              <div className="ar-sub">5 agents will draft, review, and prepare the post for approval</div>
            </div>
          </button>
          <button className="action-row" onClick={() => { Store.toast('Imported from queue', '', 'info'); onClose(); }}>
            <div className="ar-ic"><I.Inbox size={14} /></div>
            <div>
              <div className="ar-title">Pull from queue</div>
              <div className="ar-sub">Use an approved draft sitting in the content queue</div>
            </div>
          </button>
          <button className="action-row" onClick={() => { Store.toast('Blank draft created', '', 'info'); onClose(); }}>
            <div className="ar-ic"><I.Edit size={14} /></div>
            <div>
              <div className="ar-title">Compose from scratch</div>
              <div className="ar-sub">Open the editor and write it yourself</div>
            </div>
          </button>
        </div>
      </div>
    </Modal>
  );
}

function EventDetailModal({ onClose, post, onOpen }) {
  return (
    <Modal onClose={onClose} title={post?.title} subtitle={`${post?.platform} · ${post?.scheduled || 'unscheduled'}`} width={520}>
      <div className="modal-body">
        <div style={{ padding: '8px 0', borderBottom: '1px solid var(--line-1)', marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-2)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{post?.body?.slice(0, 220) + '…'}</div>
        </div>
        <div className="doc-meta">
          <div><span>Est. reach</span><b>{post?.reach_est}</b></div>
          <div><span>Est. engagement</span><b>{post?.engage_est}</b></div>
          <div><span>Quality score</span><b>{post?.score}</b></div>
          <div><span>Persona</span><b style={{ fontSize: 11 }}>{post?.persona}</b></div>
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={() => { Store.regeneratePost(post.id); onClose(); }}><I.RefreshCw size={12} /> Regenerate</button>
          <button className="btn ghost" onClick={() => { Store.openModal({ type: 'schedule', postId: post.id }); }}><I.Calendar size={12} /> Reschedule</button>
          <button className="btn primary" onClick={onOpen}>Open in review <I.ArrowRight size={12} /></button>
        </div>
      </div>
    </Modal>
  );
}

function NotificationsPanel({ onClose, onNavigate }) {
  const state = useStore();
  return (
    <Modal onClose={onClose} title="Notifications" subtitle={`${state.notifications.filter(n => n.unread).length} unread`} width={440}>
      <div className="modal-body" style={{ padding: 0 }}>
        <div style={{ padding: '0 16px 10px', borderBottom: '1px solid var(--line-1)' }}>
          <button className="btn ghost sm" onClick={() => Store.markAllRead()} style={{ fontSize: 11 }}>Mark all read</button>
        </div>
        <div className="notif-list">
          {state.notifications.map(n => (
            <div key={n.id} className={'notif-item' + (n.unread ? ' unread' : '')} onClick={() => {
              Store.markNotifRead(n.id);
              if (n.kind === 'approval') { onClose(); onNavigate('approval'); }
              if (n.kind === 'trend') { onClose(); onNavigate('trends'); }
              if (n.kind === 'competitor') { onClose(); onNavigate('trends'); }
              if (n.kind === 'publish') { onClose(); onNavigate('analytics'); }
              if (n.kind === 'system') { onClose(); onNavigate('daily'); }
            }}>
              <div className={'notif-dot ' + n.kind}></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-0)' }}>{n.title}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{n.ts}</div>
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--text-2)', marginTop: 2 }}>{n.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

function AccountConnectModal({ onClose, account }) {
  const label = account?.label || account?.n || 'Account';
  const handle = account?.handle || account?.tag || '';
  const [connecting, setConnecting] = React.useState(false);
  const go = () => {
    setConnecting(true);
    setTimeout(() => {
      Store.toast('Account connected', `${label} · OAuth complete`, 'ok');
      onClose();
    }, 1200);
  };
  return (
    <Modal onClose={onClose} title={`Connect ${label}`} subtitle="OAuth handshake" width={420}>
      <div className="modal-body">
        <div className="oauth-box">
          <I.Globe size={16} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{label}{handle ? ` · ${handle}` : ''}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>We'll request: posting, analytics read, engagement read</div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={go} disabled={connecting}>
            {connecting ? <><div className="spin"></div> Connecting…</> : 'Authorize'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ---------- Email & Integrations modals ----------

function ComposeEmailModal({ onClose, manual, template }) {
  const [to, setTo] = React.useState(template ? 'team@eb1aexperts.com' : 'owner@eb1aexperts.com');
  const [subject, setSubject] = React.useState(template?.n || '');
  const [body, setBody] = React.useState(template ? `Here's your ${template.n.toLowerCase()}.\n\n— Sent via EB1A Marketing OS` : '');
  const [kind, setKind] = React.useState(template ? 'custom' : 'daily');
  const [schedule, setSchedule] = React.useState('now');
  const [sending, setSending] = React.useState(false);

  const send = () => {
    setSending(true);
    setTimeout(() => {
      Store.toast(schedule === 'now' ? 'Email dispatched' : 'Report scheduled', schedule === 'now' ? `Delivered to ${to}` : `Next run: ${schedule}`, 'ok');
      onClose();
    }, 900);
  };

  return (
    <Modal onClose={onClose} title={manual ? 'Compose manual email' : template ? `Use template · ${template.n}` : 'New scheduled report'} subtitle={manual ? 'One-off dispatch' : 'Recurring intelligence email'} width={620}>
      <div className="modal-body">
        <div className="form-grid">
          <div className="field">
            <label>To</label>
            <input className="input" value={to} onChange={e => setTo(e.target.value)} placeholder="owner@eb1aexperts.com, team@..." />
          </div>
          {!manual && (
            <div className="field">
              <label>Report kind</label>
              <div className="seg">
                {['daily', 'weekly', 'monthly', 'alert'].map(k => (
                  <button key={k} className={kind === k ? 'active' : ''} onClick={() => setKind(k)}>{k}</button>
                ))}
              </div>
            </div>
          )}
          <div className="field">
            <label>Subject</label>
            <input className="input" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Morning Brief — …" />
          </div>
          <div className="field">
            <label>Body</label>
            <textarea className="input" rows={7} value={body} onChange={e => setBody(e.target.value)} placeholder="Lead with the biggest insight…" />
          </div>
          {!manual && (
            <div className="field">
              <label>Schedule</label>
              <div className="seg">
                {['Daily 7:00 AM', 'Weekly Mon 9:00', 'Monthly 1st 8:00', 'Send now'].map(s => (
                  <button key={s} className={schedule === s ? 'active' : ''} onClick={() => setSchedule(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={() => { Store.toast('Preview opened', subject || 'Untitled', 'info'); Store.openModal({ type: 'preview-email', email: { subject, preview: body, to, sent: 'Preview' } }); }}><I.Eye size={11} /> Preview</button>
          <button className="btn primary" onClick={send} disabled={sending || !subject}>
            {sending ? <><div className="spin"></div> Sending…</> : manual ? <><I.Send size={11} /> Send now</> : <><I.Check size={11} /> Save report</>}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function PreviewEmailModal({ onClose, email, report }) {
  const e = email || { subject: report?.name || 'Report preview', to: (report?.recipients || ['owner@eb1aexperts.com']).join(', '), sent: 'Preview', preview: report?.sections?.join(' · ') || 'Preview of the latest content for this report.' };
  return (
    <Modal onClose={onClose} title="Email preview" subtitle={e.sent} width={640}>
      <div className="modal-body" style={{ padding: 0 }}>
        <div style={{ background: 'var(--bg-2)', padding: '14px 18px', borderBottom: '1px solid var(--line-1)', fontSize: 12 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-3)' }}>From</span>
            <span className="mono" style={{ color: 'var(--text-1)' }}>marketing-os@eb1aexperts.com</span>
          </div>
          <div className="row" style={{ justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ color: 'var(--text-3)' }}>To</span>
            <span className="mono" style={{ color: 'var(--text-1)' }}>{e.to}</span>
          </div>
          <div className="row" style={{ justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ color: 'var(--text-3)' }}>Subject</span>
            <span style={{ color: 'var(--text-0)', fontWeight: 600 }}>{e.subject}</span>
          </div>
        </div>
        <div style={{ background: '#fafafa', color: '#111', padding: '28px 32px', maxHeight: 480, overflowY: 'auto' }}>
          <div style={{ fontSize: 13, lineHeight: 1.7, fontFamily: 'Georgia, serif' }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#000' }}>{e.subject}</div>
            <div style={{ fontSize: 11, color: '#888', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>EB1A Experts · Marketing Intelligence</div>
            <div style={{ fontSize: 14, color: '#333', marginBottom: 16 }}>{e.preview}</div>
            {report?.sections?.map((s, i) => (
              <div key={i} style={{ padding: '12px 14px', background: '#fff', borderLeft: '3px solid #7c5cff', marginBottom: 10 }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#7c5cff', fontWeight: 600, marginBottom: 4 }}>Section {i + 1}</div>
                <div style={{ fontSize: 13, color: '#222' }}>{s}</div>
              </div>
            ))}
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #ddd', fontSize: 11, color: '#999' }}>You're receiving this because you configured a recurring report in EB1A Marketing OS · <a style={{ color: '#7c5cff' }}>Manage preferences</a></div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Close</button>
          <button className="btn" onClick={() => Store.toast('Link copied', 'Permalink to archived email', 'ok')}><I.Copy size={11} /> Copy link</button>
          <button className="btn primary" onClick={() => { Store.toast('Resent', `Delivered to ${e.to}`, 'ok'); onClose(); }}><I.Send size={11} /> Resend</button>
        </div>
      </div>
    </Modal>
  );
}

function EditReportModal({ onClose, report }) {
  const [name, setName] = React.useState(report?.name || '');
  const [recipients, setRecipients] = React.useState((report?.recipients || []).join(', '));
  const [cadence, setCadence] = React.useState(report?.cadence || 'Daily 7:00 AM');
  const [enabled, setEnabled] = React.useState(report?.enabled ?? true);
  return (
    <Modal onClose={onClose} title={`Configure · ${report?.name || 'Report'}`} subtitle="Recipients, cadence, sections" width={560}>
      <div className="modal-body">
        <div className="form-grid">
          <div className="field"><label>Report name</label><input className="input" value={name} onChange={e => setName(e.target.value)} /></div>
          <div className="field"><label>Recipients (comma-separated)</label><textarea className="input" rows={2} value={recipients} onChange={e => setRecipients(e.target.value)} /></div>
          <div className="field">
            <label>Cadence</label>
            <div className="seg">
              {['Daily 7:00 AM', 'Weekly Mon 9:00', 'Monthly 1st 8:00', 'On trigger'].map(c => (
                <button key={c} className={cadence === c ? 'active' : ''} onClick={() => setCadence(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Sections included</label>
            <div style={{ display: 'grid', gap: 6 }}>
              {(report?.sections || ['Trends', 'Keywords', 'Competitor activity', 'Suggested themes']).map((s, i) => (
                <div key={i} className="row" style={{ padding: '6px 10px', background: 'var(--bg-2)', borderRadius: 4, fontSize: 12, justifyContent: 'space-between' }}>
                  <span><I.Check size={10} style={{ color: 'var(--ok)', marginRight: 6 }} />{s}</span>
                  <button className="btn sm ghost" onClick={() => Store.toast('Removed', s, 'info')}><I.X size={10} /></button>
                </div>
              ))}
            </div>
          </div>
          <div className="row" style={{ justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-2)', borderRadius: 6 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Report enabled</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Paused reports won't send, even on schedule</div>
            </div>
            <div onClick={() => setEnabled(!enabled)} style={{ width: 32, height: 18, borderRadius: 9, background: enabled ? 'var(--accent)' : 'var(--bg-4)', position: 'relative', cursor: 'pointer', transition: 'background 150ms' }}>
              <div style={{ position: 'absolute', top: 2, left: enabled ? 16 : 2, width: 14, height: 14, borderRadius: '50%', background: 'white', transition: 'left 150ms' }}></div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn ghost danger" onClick={() => { Store.toast('Report deleted', name, 'warn'); onClose(); }}><I.Trash size={11} /> Delete</button>
          <div style={{ flex: 1 }}></div>
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={() => { Store.toast('Saved', name, 'ok'); onClose(); }}>Save changes</button>
        </div>
      </div>
    </Modal>
  );
}

function AddIntegrationModal({ onClose }) {
  const available = [
    { id: 'gsc', name: 'Google Search Console', tag: 'Search performance', glyph: 'G', color: '#4285f4' },
    { id: 'ga4', name: 'Google Analytics 4', tag: 'Web analytics', glyph: 'A', color: '#e37400' },
    { id: 'hubspot', name: 'HubSpot', tag: 'CRM + marketing', glyph: 'H', color: '#ff7a59' },
    { id: 'mailchimp', name: 'Mailchimp', tag: 'Email marketing', glyph: 'M', color: '#ffe01b' },
    { id: 'salesforce', name: 'Salesforce', tag: 'Enterprise CRM', glyph: 'S', color: '#00a1e0' },
    { id: 'mixpanel', name: 'Mixpanel', tag: 'Product analytics', glyph: 'M', color: '#7856ff' },
    { id: 'brandwatch', name: 'Brandwatch', tag: 'Social listening', glyph: 'B', color: '#00d4aa' },
    { id: 'buzzsumo', name: 'BuzzSumo', tag: 'Content insights', glyph: 'B', color: '#ff5050' },
  ];
  const [q, setQ] = React.useState('');
  const filtered = available.filter(a => a.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Modal onClose={onClose} title="Add integration" subtitle="Connect new data sources" width={620}>
      <div className="modal-body">
        <input className="input" placeholder="Search integrations…" value={q} onChange={e => setQ(e.target.value)} style={{ marginBottom: 14 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, maxHeight: 420, overflowY: 'auto' }}>
          {filtered.map(a => (
            <div key={a.id} className="card" style={{ cursor: 'pointer' }} onClick={() => { Store.openModal({ type: 'account-connect', account: { label: a.name, handle: a.tag } }); }}>
              <div className="card-b">
                <div className="row" style={{ gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: a.color + '22', color: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{a.glyph}</div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-0)' }}>{a.name}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{a.tag}</div>
                  </div>
                </div>
                <button className="btn sm primary" onClick={(e) => { e.stopPropagation(); Store.openModal({ type: 'account-connect', account: { label: a.name, handle: a.tag } }); }}>Connect</button>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose}>Close</button>
          <button className="btn" onClick={() => Store.toast('Request sent', 'Our team will review your integration request', 'info')}><I.Mail size={11} /> Request new</button>
        </div>
      </div>
    </Modal>
  );
}

function IntegrationDetailModal({ onClose, integration }) {
  const g = integration || {};
  const [autoSync, setAutoSync] = React.useState(true);
  return (
    <Modal onClose={onClose} title={`${g.name || 'Integration'} · ${g.connected ? 'Connected' : 'Not connected'}`} subtitle={g.tag} width={560}>
      <div className="modal-body">
        <div className="row" style={{ gap: 12, padding: '14px 16px', background: 'var(--bg-2)', borderRadius: 6, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: (g.color || '#7c5cff') + '22', color: g.color || '#7c5cff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>{g.glyph || '?'}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-0)' }}>{g.name}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{g.meta || 'No metadata'}</div>
          </div>
          <div className="pill" style={{ background: g.connected ? 'var(--ok-bg)' : 'var(--bg-3)', color: g.connected ? 'var(--ok)' : 'var(--text-3)' }}>{g.connected ? '● Live' : '○ Idle'}</div>
        </div>

        <div className="form-grid">
          <div className="field"><label>Sync status</label><div className="mono" style={{ fontSize: 12, color: 'var(--text-1)' }}>{g.status || 'Not syncing'}</div></div>
          <div className="field">
            <label>Actions</label>
            <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
              <button className="btn sm" onClick={() => Store.toast('Syncing', `${g.name} · started`, 'info')}><I.Refresh size={11} /> Sync now</button>
              <button className="btn sm ghost" onClick={() => Store.toast('Logs opened', 'Last 100 events', 'info')}><I.FileText size={11} /> View logs</button>
              <button className="btn sm ghost" onClick={() => Store.toast('Keys rotated', 'API credentials refreshed', 'ok')}><I.Shield size={11} /> Rotate keys</button>
              <button className="btn sm ghost" onClick={() => window.open('#', '_blank')}><I.ExternalLink size={11} /> Open dashboard</button>
            </div>
          </div>
          <div className="row" style={{ justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-2)', borderRadius: 6 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Auto-sync</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Pull fresh data on the configured schedule</div>
            </div>
            <div onClick={() => setAutoSync(!autoSync)} style={{ width: 32, height: 18, borderRadius: 9, background: autoSync ? 'var(--accent)' : 'var(--bg-4)', position: 'relative', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', top: 2, left: autoSync ? 16 : 2, width: 14, height: 14, borderRadius: '50%', background: 'white', transition: 'left 150ms' }}></div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn ghost danger" onClick={() => { Store.toast('Disconnected', g.name, 'warn'); onClose(); }}><I.Trash size={11} /> Disconnect</button>
          <div style={{ flex: 1 }}></div>
          <button className="btn ghost" onClick={onClose}>Close</button>
          <button className="btn primary" onClick={() => { Store.toast('Saved', g.name, 'ok'); onClose(); }}>Save</button>
        </div>
      </div>
    </Modal>
  );
}

Object.assign(window, { Modal, Toasts, CommandPalette, ModalRoot, ComposeEmailModal, PreviewEmailModal, EditReportModal, AddIntegrationModal, IntegrationDetailModal });
