// Global Store — mutable state + actions with React hook subscription
// Single source of truth for posts, filters, selection, toasts, modal, notifications.

(function () {
  const listeners = new Set();
  let id = 1000;
  const nextId = () => `p_${++id}`;

  const state = {
    posts: [], // populated from POST_DRAFTS after data.jsx loads
    toasts: [],
    modal: null, // { type, ...data }
    commandOpen: false,
    notifications: [
      { id: 'n1', ts: '2m ago', title: '4 posts need approval', body: 'Agents have queued 4 drafts. Tap to review.', kind: 'approval', unread: true },
      { id: 'n2', ts: '18m ago', title: 'Trend spike detected', body: 'USCIS Q1 policy memo +312% velocity', kind: 'trend', unread: true },
      { id: 'n3', ts: '1h ago', title: 'Petition Pro posted 3 new items', body: 'Overlapping with your topic coverage', kind: 'competitor', unread: true },
      { id: 'n4', ts: '2h ago', title: 'Morning brief delivered', body: 'Sent to owner@eb1aexperts.com', kind: 'system', unread: false },
      { id: 'n5', ts: 'Yesterday', title: 'Instagram post went live', body: '"5 signs you\'re ready for EB1A"', kind: 'publish', unread: false },
    ],
    settings: {
      requireApproval: true,
      skipApprovalX: false,
      autoReply: true,
      pauseOnDrop: true,
      sundayPosting: false,
      primaryColor: '#7c5cff',
      tealColor: '#2dd4bf',
      brandFont: 'Inter Tight',
    },
    trackedCompetitors: [], // populated
    selectedInfluencers: ['i3', 'i6'],
    searchQuery: '',
    activeFilters: { niche: ['tech', 'ai', 'phd'], platform: ['linkedin', 'instagram', 'x'], location: ['us'] },
  };

  function emit() { listeners.forEach(l => l()); }

  const Store = {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

    init() {
      if (window.POST_DRAFTS && !state.posts.length) {
        state.posts = window.POST_DRAFTS.map(p => ({ ...p }));
      }
      if (window.COMPETITORS && !state.trackedCompetitors.length) {
        state.trackedCompetitors = window.COMPETITORS.map(c => ({ ...c }));
      }
      emit();
    },

    // Toasts
    toast(title, body, kind = 'info', duration = 3400) {
      const tid = 't_' + (++id);
      state.toasts = [...state.toasts, { id: tid, title, body, kind }];
      emit();
      setTimeout(() => {
        state.toasts = state.toasts.filter(t => t.id !== tid);
        emit();
      }, duration);
    },

    // Modal
    openModal(modal) { state.modal = modal; emit(); },
    closeModal() { state.modal = null; emit(); },

    // Command palette
    toggleCommand(v) { state.commandOpen = v ?? !state.commandOpen; emit(); },

    // Posts
    approvePost(postId, schedule) {
      const p = state.posts.find(x => x.id === postId);
      if (!p) return;
      p.status = 'approved';
      p.scheduled = schedule || 'Tomorrow, 9:15 AM';
      emit();
      Store.toast('Post approved', `Scheduled for ${p.scheduled}`, 'ok');
    },
    rejectPost(postId, reason) {
      const p = state.posts.find(x => x.id === postId);
      if (!p) return;
      p.status = 'rejected';
      p.rejection = reason || 'Regenerating with feedback';
      emit();
      Store.toast('Post rejected', 'Agents are regenerating…', 'warn');
      // Simulate regen — move back to pending after delay
      setTimeout(() => {
        p.status = 'pending_review';
        p.rejection = null;
        p.score = Math.min(100, (p.score || 80) + 3);
        p.generated = 'just now';
        emit();
        Store.toast('Regenerated', `"${p.title.slice(0, 32)}…" is back in review`, 'info');
      }, 4000);
    },
    requestRevision(postId, note) {
      Store.toast('Revision requested', note || 'Rewriting with your note…', 'info');
      Store.rejectPost(postId, note);
    },
    schedulePost(postId, when) {
      const p = state.posts.find(x => x.id === postId);
      if (!p) return;
      p.scheduled = when;
      emit();
      Store.toast('Rescheduled', `Now posting ${when}`, 'ok');
    },
    createPost(data) {
      const newPost = {
        id: nextId(),
        platform: data.platform || 'linkedin',
        type: data.type || 'single',
        status: 'pending_review',
        generated: 'just now',
        title: data.title || 'Untitled draft',
        body: data.body || 'Generated copy will appear here.',
        hashtags: data.hashtags || ['#EB1A', '#GreenCard'],
        cta: data.cta || 'Book a free consult',
        trend: data.trend || null,
        score: Math.floor(Math.random() * 15) + 82,
        persona: data.persona || 'Senior tech IC',
        reach_est: (Math.random() * 15 + 5).toFixed(1) + 'K',
        engage_est: (Math.random() * 4 + 3).toFixed(1) + '%',
        scheduled: null,
        reviews: { editorial: 'pass', brand: 'pass', compliance: 'pass', design: 'pass', format: 'pass', engagement: 'pass' },
      };
      state.posts = [newPost, ...state.posts];
      emit();
      Store.toast('Draft created', `"${newPost.title}" is in the review queue`, 'ok');
      return newPost;
    },
    regeneratePost(postId) {
      const p = state.posts.find(x => x.id === postId);
      if (!p) return;
      Store.toast('Regenerating', 'Agents are drafting a new version…', 'info');
      setTimeout(() => {
        p.generated = 'just now';
        p.score = Math.min(100, p.score + Math.floor(Math.random() * 5) + 2);
        emit();
        Store.toast('Regeneration complete', `New score: ${p.score}`, 'ok');
      }, 2500);
    },

    // Settings
    setSetting(key, val) {
      state.settings[key] = val;
      emit();
      Store.toast('Setting updated', key, 'ok');
    },

    // Influencers
    toggleInfluencer(id) {
      state.selectedInfluencers = state.selectedInfluencers.includes(id)
        ? state.selectedInfluencers.filter(x => x !== id)
        : [...state.selectedInfluencers, id];
      emit();
    },

    // Filters
    toggleFilter(group, val) {
      const cur = state.activeFilters[group] || [];
      state.activeFilters[group] = cur.includes(val) ? cur.filter(x => x !== val) : [...cur, val];
      emit();
    },

    // Notifications
    markNotifRead(nid) {
      const n = state.notifications.find(x => x.id === nid);
      if (n) { n.unread = false; emit(); }
    },
    markAllRead() {
      state.notifications.forEach(n => n.unread = false);
      emit();
    },

    // Competitors
    addCompetitor(name, handle) {
      state.trackedCompetitors.push({
        id: 'c_' + (++id), name, handle,
        followers: Math.floor(Math.random() * 30000) + 5000,
        posts_7d: Math.floor(Math.random() * 15) + 3,
        engagement: +(Math.random() * 3 + 1.5).toFixed(1),
        trend: '+' + Math.floor(Math.random() * 20) + '%',
        top_topic: 'Just added',
        flag: 'flat',
      });
      emit();
      Store.toast('Competitor tracked', name, 'ok');
    },
  };

  window.Store = Store;

  // React hook
  window.useStore = function () {
    const [, tick] = React.useReducer(x => x + 1, 0);
    React.useEffect(() => Store.subscribe(tick), []);
    return state;
  };
})();
