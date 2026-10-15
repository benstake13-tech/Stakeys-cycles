import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSupabaseClient } from '../lib/supabase';
import { Container } from '../components/ui';

type Category = 'bicycle' | 'ebike' | 'escooter' | 'parts' | 'accessories';
type Listing = { id: string; seller_id?: string; title: string; category: Category; subcategory?: string | null; make_model: string; condition: string; description: string; asking_price: number; images: string[]; status: string; created_at: string; ai_inspection?: any };
const supabase = getSupabaseClient();
const categories: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All listings' }, { value: 'commuter', label: 'Commuter bikes' }, { value: 'hardtail_mtb', label: 'Hardtail MTB' },
  { value: 'road', label: 'Road bikes' }, { value: 'other', label: 'Other bicycles' }, { value: 'ebike', label: 'E-bikes' },
  { value: 'escooter', label: 'E-scooters' }, { value: 'parts', label: 'Parts' }, { value: 'accessories', label: 'Accessories' },
];
const formatPrice = (value: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);
const fileToInlineData = async (file: File) => {
  const dataUrl = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); });
  return { mimeType: file.type, data: dataUrl.split(',')[1] };
};

export default function MarketplacePage() {
  const [rows, setRows] = useState<Listing[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [user, setUser] = useState<any>(null);
  const [verified, setVerified] = useState(false);
  const [authMode, setAuthMode] = useState<'in' | 'up'>('in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Listing | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [serialPhoto, setSerialPhoto] = useState<File | null>(null);
  const [form, setForm] = useState({ title: '', category: 'bicycle' as Category, subcategory: 'commuter', make_model: '', condition: 'good', description: '', asking_price: '', frame_serial_number: '' });
  const [inspection, setInspection] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [identifying, setIdentifying] = useState(false);
  const [thread, setThread] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [offer, setOffer] = useState('');
  const [deal, setDeal] = useState<any>(null);
  const isVehicle = !['parts', 'accessories'].includes(form.category);

  const load = useCallback(async () => {
    setBusy(true); setError('');
    const { data, error: loadError } = await supabase.from('marketplace_listings').select('id,title,category,subcategory,make_model,condition,description,asking_price,images,status,created_at,ai_inspection').eq('status', 'active').order('created_at', { ascending: false });
    if (loadError) { setError('Listings are temporarily unavailable. Please refresh in a moment.'); setRows([]); setBusy(false); return; }
    const source = (data || []) as Listing[];
    const paths = source.flatMap((row) => row.images || []);
    const signed = paths.length ? await supabase.storage.from('marketplace-images').createSignedUrls(paths, 3600) : { data: [] as any[] };
    const byPath = new Map((signed.data || []).map((item: any) => [item.path, item.signedUrl]));
    setRows(source.map((row) => ({ ...row, image_paths: [...(row.images || [])], images: (row.images || []).map((path) => byPath.get(path) || '').filter(Boolean) })));
    setBusy(false);
  }, []);

  const loadMine = useCallback(async (uid: string) => {
    const { data } = await supabase.from('marketplace_listings').select('id,seller_id,title,category,subcategory,make_model,condition,description,asking_price,images,status,created_at,ai_inspection').eq('seller_id', uid).order('created_at', { ascending: false });
    const mine = (data || []) as Listing[];
    const checks = mine.length ? await supabase.from('marketplace_serial_checks').select('listing_id,frame_serial_number,serial_number_photo_path').in('listing_id', mine.map((row) => row.id)) : { data: [] as any[] };
    const checkByListing = new Map((checks.data || []).map((check: any) => [check.listing_id, check]));
    const paths = [...mine.flatMap((row) => row.images || []), ...(checks.data || []).map((check: any) => check.serial_number_photo_path)];
    const signed = paths.length ? await supabase.storage.from('marketplace-images').createSignedUrls(paths, 3600) : { data: [] as any[] };
    const byPath = new Map((signed.data || []).map((item: any) => [item.path, item.signedUrl]));
    setRows((current) => [...current.filter((row) => row.status === 'active'), ...mine.map((row) => { const check: any = checkByListing.get(row.id); return { ...row, image_paths: [...(row.images || [])], images: (row.images || []).map((path) => byPath.get(path) || '').filter(Boolean), serial_path: check?.serial_number_photo_path || '', frame_serial_number: check?.frame_serial_number || '' }; })].filter((row, index, list) => list.findIndex((other) => other.id === row.id) === index));
  }, []);

  useEffect(() => {
    void load();
    void supabase.auth.getUser().then(({ data }) => { const current = data.user; setUser(current); setVerified(Boolean(current?.email_confirmed_at)); if (current) void loadMine(current.id); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => { const current = session?.user || null; setUser(current); setVerified(Boolean(current?.email_confirmed_at)); if (current) void loadMine(current.id); else void load(); });
    return () => listener.subscription.unsubscribe();
  }, [load, loadMine]);

  const visible = useMemo(() => rows.filter((row) => {
    const term = query.trim().toLowerCase();
    const matchesText = !term || `${row.title} ${row.make_model} ${row.description} ${row.category}`.toLowerCase().includes(term);
    const matchesCategory = category === 'all' || (['commuter', 'hardtail_mtb', 'road', 'other'].includes(category) ? row.category === 'bicycle' && (row.subcategory || 'other') === category : row.category === category);
    return matchesText && matchesCategory;
  }), [rows, query, category]);

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault(); setNotice('');
    const result = authMode === 'in' ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/marketplace` } });
    if (result.error) setNotice(result.error.message);
    else if (authMode === 'up' && !result.data.session) setNotice('Check your email and verify your address, then sign in to create listings.');
  };

  const openCreate = () => { setEditing(null); setPhotos([]); setSerialPhoto(null); setInspection(null); setForm({ title: '', category: 'bicycle', subcategory: 'commuter', make_model: '', condition: 'good', description: '', asking_price: '', frame_serial_number: '' }); setFormOpen(true); };
  const openEdit = (item: Listing) => { setEditing(item); setPhotos([]); setSerialPhoto(null); setInspection(item.ai_inspection || null); setForm({ title: item.title, category: item.category, subcategory: item.subcategory || 'commuter', make_model: item.make_model, condition: item.condition, description: item.description, asking_price: String(item.asking_price), frame_serial_number: (item as any).frame_serial_number || '', }); setFormOpen(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const identify = async () => {
    if (!photos.length) { setNotice('Add a clear bike photo before running identification.'); return; }
    setIdentifying(true); setNotice('');
    try {
      const inline = await Promise.all(photos.slice(0, 10).map(fileToInlineData));
      const prompt = `Identify this bicycle or scooter from the seller photos and return ONLY JSON with keys make, model, year, type, confidence (0-1), coverage (0-100), summary, mainSpecs (array of {componentName,currentPart,condition,confidence}), obviousProblems (array of {issue,severity}), photoRequests (array of {area,instruction,reason}), notVisible (array). Be cautious: use Unknown / To Be Inspected for uncertain make/model, do not invent specs, and clearly label visible issues. The seller will review and can correct make/model.`;
      const { data, error: invokeError } = await supabase.functions.invoke('gemini-gateway', { body: { contents: [{ role: 'user', parts: [...inline.map(({ mimeType, data }) => ({ inlineData: { mimeType, data } })), { text: prompt }] }], config: { responseMimeType: 'application/json', temperature: 0.2 } } });
      if (invokeError) throw invokeError;
      const result = JSON.parse(data?.text || '{}');
      if (!result.make || !result.model || !Array.isArray(result.mainSpecs)) throw new Error('The identifier returned an incomplete assessment. Try clearer photos.');
      setInspection(result); setForm((value) => ({ ...value, make_model: `${result.make} ${result.model}`.trim() }));
    } catch (reason: any) { setNotice(reason?.message || 'Bike identification could not run. Please try again.'); }
    finally { setIdentifying(false); }
  };

  const submitListing = async (event: React.FormEvent) => {
    event.preventDefault(); setNotice('');
    if (!user || !verified) { setNotice('Sign in with an email-verified account to list an item.'); return; }
    if (photos.length + (editing?.images.length || 0) < 1 || photos.length + (editing?.images.length || 0) > 5) { setNotice('Keep one to five listing photos in total.'); return; }
    if (isVehicle && (!inspection || !form.frame_serial_number.trim())) { setNotice('Run the bike identifier and enter the frame serial number.'); return; }
    setSaving(true);
    const id = editing?.id || crypto.randomUUID();
    const paths = editing ? ((editing as any).image_paths || []) : [];
    const uploaded: string[] = [];
    try {
      for (const file of photos) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 8 * 1024 * 1024) throw new Error('Use JPG, PNG or WebP images under 8 MB.');
        const extension = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
        const path = `${user.id}/${id}/photo-${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from('marketplace-images').upload(path, file, { contentType: file.type });
        if (uploadError) throw uploadError;
        uploaded.push(path);
      }
      const allPaths = [...paths, ...uploaded];
      let serialPath = (editing as any)?.serial_path || '';
      if (isVehicle && serialPhoto) {
        const extension = serialPhoto.type === 'image/png' ? 'png' : serialPhoto.type === 'image/webp' ? 'webp' : 'jpg';
        serialPath = `${user.id}/${id}/serial-number.${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from('marketplace-images').upload(serialPath, serialPhoto, { contentType: serialPhoto.type });
        if (uploadError) throw uploadError;
      }
      const { data, error: invokeError } = await supabase.functions.invoke('marketplace-listings', { body: { action: editing ? 'update' : 'create', listing: { id, seller_id: user.id, title: form.title, category: form.category, subcategory: form.category === 'bicycle' ? form.subcategory : null, make_model: form.make_model, condition: form.condition, description: form.description, asking_price: Number(form.asking_price), images: allPaths, ai_inspection: isVehicle ? inspection : null }, frame_serial_number: isVehicle ? form.frame_serial_number : '', serial_number_photo_path: serialPath } });
      if (invokeError) throw invokeError;
      if (data?.status === 'rejected_stolen') throw new Error(data.message || 'This serial number needs staff review.');
      setNotice('Listing submitted. It will appear publicly after staff approval.'); setFormOpen(false); await load(); await loadMine(user.id);
    } catch (reason: any) {
      setNotice(reason?.message || 'The listing could not be submitted. Please check your details and try again.');
      if (uploaded.length) console.warn('Uploaded photos are retained in the seller-owned listing folder for retry.');
    } finally { setSaving(false); }
  };

  const beginChat = async (item: Listing) => {
    if (!user || !verified) { setNotice('Sign in with a verified email to message the seller.'); return; }
    const { data, error: chatError } = await supabase.rpc('start_marketplace_conversation', { p_listing_id: item.id });
    if (chatError) { setNotice(chatError.message); return; }
    setThread(data); setDeal(null);
    const [{ data: dealRow }, { data: messages }] = await Promise.all([
      supabase.from('marketplace_deal_terms').select('proposed_price,proposed_by,agreed_price,accepted_by,location_method,location_details,buyer_location_confirmed_at,seller_location_confirmed_at').eq('conversation_id', data).maybeSingle(),
      supabase.from('marketplace_messages').select('id,sender_id,body,created_at').eq('conversation_id', data).order('created_at').limit(100),
    ]);
    setDeal({ terms: dealRow, messages: messages || [] });
  };
  const refreshChat = async () => { if (!thread) return; const [{ data: terms }, { data: messages }] = await Promise.all([supabase.from('marketplace_deal_terms').select('proposed_price,proposed_by,agreed_price,accepted_by,location_method,location_details,buyer_location_confirmed_at,seller_location_confirmed_at').eq('conversation_id', thread).maybeSingle(), supabase.from('marketplace_messages').select('id,sender_id,body,created_at').eq('conversation_id', thread).order('created_at').limit(100)]); setDeal({ terms, messages: messages || [] }); };
  const sendMessage = async (event: React.FormEvent) => { event.preventDefault(); if (!thread || !user || !message.trim()) return; const { error: sendError } = await supabase.from('marketplace_messages').insert({ conversation_id: thread, sender_id: user.id, body: message.trim() }); if (sendError) setNotice(sendError.message); else { setMessage(''); await refreshChat(); } };
  const proposePrice = async () => { if (!thread) return; const { error: priceError } = await supabase.rpc('propose_marketplace_price', { p_conversation_id: thread, p_price: Number(offer) }); if (priceError) setNotice(priceError.message); else { setOffer(''); await refreshChat(); } };
  const acceptPrice = async () => { if (!thread) return; const { error: priceError } = await supabase.rpc('accept_marketplace_price', { p_conversation_id: thread }); if (priceError) setNotice(priceError.message); else await refreshChat(); };
  const saveMeeting = async () => { if (!thread) return; const location = window.prompt('Enter the agreed public meeting place or contact plan'); if (!location) return; const { error: meetingError } = await supabase.rpc('set_marketplace_handover_location', { p_conversation_id: thread, p_method: 'manual', p_details: location }); if (meetingError) setNotice(meetingError.message); else await refreshChat(); };
  const confirmMeeting = async () => { if (!thread) return; const { error: meetingError } = await supabase.rpc('confirm_marketplace_handover_location', { p_conversation_id: thread }); if (meetingError) setNotice(meetingError.message); else await refreshChat(); };


  return <Container className="py-10 sm:py-14">
    <div className="mb-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-9">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-400">Stakey’s Cycles · community listings</p>
      <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Local bikes, parts and accessories</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Browse real seller listings. Every new or edited listing waits for staff approval. Bike serials are checked through Bike Index before review.</p>
      <button onClick={openCreate} className="mt-5 rounded-xl bg-brand-500 px-5 py-3 font-bold text-ink-950">Create a listing</button>
    </div>

    {notice && <p role="status" className="mb-5 rounded-xl border border-amber-400/30 bg-amber-950/30 p-4 text-sm text-amber-100">{notice}</p>}
    {!user && <form onSubmit={signIn} className="mb-6 grid gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
      <label className="text-xs text-slate-300">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 block w-full rounded-lg bg-slate-950 px-3 py-2 text-sm text-white" /></label>
      <label className="text-xs text-slate-300">Password<input required type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 block w-full rounded-lg bg-slate-950 px-3 py-2 text-sm text-white" /></label>
      <button className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-bold text-ink-950">{authMode === 'in' ? 'Sign in' : 'Create account'}</button>
      <button type="button" onClick={() => setAuthMode(authMode === 'in' ? 'up' : 'in')} className="text-sm text-brand-300">{authMode === 'in' ? 'Register' : 'I have an account'}</button>
    </form>}
    {user && <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-200"><span>{user.email}{verified ? ' · email verified' : ' · verify your email before listing'}</span><button onClick={() => void supabase.auth.signOut()} className="text-brand-300">Sign out</button></div>}

    {formOpen && <form onSubmit={submitListing} className="mb-8 grid gap-4 rounded-2xl border border-brand-400/30 bg-slate-900 p-5 sm:grid-cols-2" data-testid="marketplace-listing-form">
      <h2 className="text-xl font-bold text-white sm:col-span-2">{editing ? 'Edit your listing' : 'New listing'}</h2>
      <label className="text-xs text-slate-300">Title<input required maxLength={120} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-1 block w-full rounded-lg bg-slate-950 px-3 py-3 text-sm text-white" /></label>
      <label className="text-xs text-slate-300">Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as Category })} className="mt-1 block w-full rounded-lg bg-slate-950 px-3 py-3 text-sm text-white">{[['bicycle','Bicycle'],['ebike','E-bike'],['escooter','E-scooter'],['parts','Parts'],['accessories','Accessory']].map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      {form.category === 'bicycle' && <label className="text-xs text-slate-300">Bicycle type<select value={form.subcategory} onChange={(event) => setForm({ ...form, subcategory: event.target.value })} className="mt-1 block w-full rounded-lg bg-slate-950 px-3 py-3 text-sm text-white"><option value="commuter">Commuter</option><option value="hardtail_mtb">Hardtail MTB</option><option value="road">Road bike</option><option value="other">Other bicycle</option></select></label>}
      <label className="text-xs text-slate-300">Make and model / item name<input required value={form.make_model} onChange={(event) => setForm({ ...form, make_model: event.target.value })} className="mt-1 block w-full rounded-lg bg-slate-950 px-3 py-3 text-sm text-white" /></label>
      <label className="text-xs text-slate-300">Condition<select value={form.condition} onChange={(event) => setForm({ ...form, condition: event.target.value })} className="mt-1 block w-full rounded-lg bg-slate-950 px-3 py-3 text-sm text-white">{['new','excellent','good','fair','spares'].map((value) => <option key={value}>{value}</option>)}</select></label>
      <label className="text-xs text-slate-300">Asking price (£)<input required type="number" min="1" max="50000" step="0.01" value={form.asking_price} onChange={(event) => setForm({ ...form, asking_price: event.target.value })} className="mt-1 block w-full rounded-lg bg-slate-950 px-3 py-3 text-sm text-white" /></label>
      <label className="text-xs text-slate-300 sm:col-span-2">Description<textarea maxLength={2000} rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="mt-1 block w-full rounded-lg bg-slate-950 px-3 py-3 text-sm text-white" /></label>
      <label className="text-xs text-slate-300 sm:col-span-2">Photos (JPG, PNG or WebP, up to five total)<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => setPhotos(Array.from(event.target.files || []))} className="mt-2 block w-full text-sm" />{editing && <span className="mt-1 block text-slate-400">Current approved photos stay attached; newly selected photos will be added.</span>}</label>
      {isVehicle && <>
        <div className="sm:col-span-2 rounded-xl border border-white/10 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><strong className="text-white">Bike photo identifier</strong><p className="mt-1 text-xs text-slate-400">Uses Stakey’s shared Gemini gateway. Review and correct its suggestion before submission.</p></div><button type="button" disabled={identifying} onClick={() => void identify()} className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-bold text-ink-950">{identifying ? 'Identifying…' : 'Identify from photos'}</button></div>
          {inspection && <div className="mt-3 text-sm text-slate-200"><p>AI suggests <b>{inspection.make} {inspection.model}</b> · {Math.round(Number(inspection.confidence) * 100)}% identity confidence</p><p className="mt-1 text-xs text-slate-400">{inspection.mainSpecs?.length || 0} component records · {inspection.coverage || 0}% spec coverage. {Number(inspection.confidence) < .65 ? 'Low confidence: check and correct make/model before submission.' : 'Check the suggestion before submitting.'}</p>{inspection.summary && <p className="mt-2 text-xs">{inspection.summary}</p>}</div>}
        </div>
        <label className="text-xs text-slate-300">Frame serial number<input required={isVehicle} value={form.frame_serial_number} onChange={(event) => setForm({ ...form, frame_serial_number: event.target.value })} placeholder="As stamped on the frame" className="mt-1 block w-full rounded-lg bg-slate-950 px-3 py-3 text-sm text-white" /></label>
        <label className="text-xs text-slate-300">Serial number photo<input required={!editing || !(editing as any).serial_path} type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setSerialPhoto(event.target.files?.[0] || null)} className="mt-2 block w-full text-sm" />{editing && <span>{(editing as any).serial_path ? 'Existing serial photo stays attached unless you upload a replacement.' : 'Add a clear serial photo.'}</span>}</label>
      </>}
      <div className="flex gap-3 sm:col-span-2"><button disabled={saving || !verified} className="rounded-lg bg-brand-500 px-5 py-3 font-bold text-ink-950 disabled:opacity-50">{saving ? 'Submitting…' : editing ? 'Resubmit for approval' : 'Submit for approval'}</button><button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border border-white/20 px-4 py-3 text-white">Cancel</button></div>
    </form>}

    <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_18rem]"><input aria-label="Search marketplace listings" placeholder="Search bikes, models, parts…" value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white" /><select aria-label="Filter marketplace category" value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white">{categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>
    {error && <p role="alert" className="rounded-xl border border-red-400/30 p-4 text-red-200">{error}</p>}
    {busy ? <p className="py-10 text-center text-slate-400">Loading live listings…</p> : visible.length === 0 ? <p className="rounded-2xl border border-white/10 p-8 text-center text-slate-300">No approved listings match that search yet.</p> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map((item) => {
      const mine = item.seller_id === user?.id;
      const canEdit = mine && ['pending_approval','pending_review','rejected','active'].includes(item.status);
      return <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
        {item.images[0] ? <img src={item.images[0]} alt={item.title} className="h-52 w-full object-cover" /> : <div className="grid h-52 place-items-center bg-slate-800 text-slate-500">Photo unavailable</div>}
        <div className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-xs uppercase tracking-wide text-brand-300">{item.category === 'bicycle' ? categories.find((cat) => cat.value === (item.subcategory || 'other'))?.label : item.category}</p><h2 className="mt-1 text-lg font-bold text-white">{item.title}</h2><p className="text-sm text-slate-300">{item.make_model}</p></div><strong className="whitespace-nowrap text-white">{formatPrice(Number(item.asking_price))}</strong></div>
          <p className="mt-3 line-clamp-3 text-sm text-slate-400">{item.description || item.condition}</p>
          {item.ai_inspection && <p className="mt-3 text-xs text-emerald-200">AI photo assessment · staff verification required</p>}
          {mine ? <div className="mt-4 flex flex-wrap items-center justify-between gap-2"><span className="text-xs text-amber-200">{item.status === 'active' ? 'Live · respond to buyer enquiries' : `Next: staff review (${item.status.replace('_',' ')})`}</span>{canEdit && <button onClick={() => openEdit(item)} className="rounded-lg border border-white/20 px-3 py-2 text-xs text-white">Edit</button>}</div> : <button onClick={() => void beginChat(item)} className="mt-4 w-full rounded-lg bg-brand-500 px-4 py-3 font-bold text-ink-950">Message seller and agree sale</button>}
        </div>
      </article>;
    })}</div>}

    {thread && <section className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4"><div role="dialog" aria-modal="true" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-slate-900 p-5"><div className="flex justify-between"><h2 className="text-xl font-bold text-white">Sale conversation</h2><button onClick={() => setThread(null)} className="text-white">Close</button></div><p className="my-3 text-sm text-emerald-200">Next action: agree a price, then confirm the public meeting plan with both parties.</p>
      <div className="max-h-52 space-y-2 overflow-y-auto rounded-xl bg-slate-950 p-3">{(deal?.messages || []).map((item: any) => <p key={item.id} className="text-sm text-slate-200">{item.sender_id === user?.id ? 'You' : 'Seller'}: {item.body}</p>)}</div>
      <form onSubmit={sendMessage} className="mt-3 flex gap-2"><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Message seller" className="min-w-0 flex-1 rounded-lg bg-slate-950 px-3 py-2 text-white" /><button className="rounded-lg bg-brand-500 px-4 font-bold text-ink-950">Send</button></form>
      {deal?.terms?.proposed_price && <div className="mt-4 rounded-xl border border-white/10 p-4 text-sm text-white"><p>Proposed price: {formatPrice(deal.terms.proposed_price)} {deal.terms.agreed_price ? `· agreed ${formatPrice(deal.terms.agreed_price)}` : `· proposed by ${deal.terms.proposed_by === user?.id ? 'you' : 'seller'}`}</p>{!deal.terms.agreed_price && deal.terms.proposed_by !== user?.id && <button onClick={() => void acceptPrice()} className="mt-2 rounded-lg bg-brand-500 px-3 py-2 font-bold text-ink-950">Accept price</button>}{deal.terms.agreed_price && <><button onClick={() => void saveMeeting()} className="mt-2 rounded-lg border border-white/20 px-3 py-2">Set meeting plan</button>{deal.terms.location_details && <p className="mt-2">Meeting plan: {deal.terms.location_details}<br />Buyer: {deal.terms.buyer_location_confirmed_at ? 'confirmed' : 'awaiting confirmation'} · Seller: {deal.terms.seller_location_confirmed_at ? 'confirmed' : 'awaiting confirmation'}<br /><b>Next action: each participant confirms this plan.</b></p>}<button onClick={() => void confirmMeeting()} className="mt-2 rounded-lg bg-brand-500 px-3 py-2 font-bold text-ink-950">Confirm meeting plan</button></>}</div>}
      <div className="mt-3 flex gap-2"><input type="number" min="1" max="50000" step="0.01" value={offer} onChange={(event) => setOffer(event.target.value)} placeholder="Offer (£)" className="min-w-0 flex-1 rounded-lg bg-slate-950 px-3 py-2 text-white" /><button onClick={() => void proposePrice()} className="rounded-lg border border-white/20 px-3 py-2 text-white">Propose price</button></div>
    </div></section>}
  </Container>;
}
