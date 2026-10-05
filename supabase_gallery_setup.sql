-- ============================================================================
--  Stakey's Cycles - "Jobs we're proud of" gallery
--  Adds the public.gallery_items table plus a public storage bucket that the
--  staff loyalty app uploads job photos into. The marketing website reads
--  published rows and renders them on the "Our work" page.
--
--  Run this once in the Supabase SQL editor for project
--  lhojocpygcnkxvkrcuxh. Safe to re-run (idempotent).
-- ============================================================================

create table if not exists public.gallery_items (
  id            text primary key,
  image_url     text not null,
  title         text,
  caption       text,
  vehicle_type  text,
  sort_order    integer default 0,
  published     boolean default true,
  created_at    timestamptz default now()
);

create index if not exists gallery_items_published_idx
  on public.gallery_items (published, sort_order, created_at desc);

alter table public.gallery_items enable row level security;

drop policy if exists "Gallery public read"    on public.gallery_items;
drop policy if exists "Gallery staff insert"   on public.gallery_items;
drop policy if exists "Gallery staff update"   on public.gallery_items;
drop policy if exists "Gallery staff delete"   on public.gallery_items;

create policy "Gallery public read"  on public.gallery_items for select using (true);
create policy "Gallery staff insert" on public.gallery_items for insert with check (true);
create policy "Gallery staff update" on public.gallery_items for update using (true);
create policy "Gallery staff delete" on public.gallery_items for delete using (true);

-- Public bucket for the job photos themselves.
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do update set public = true;

drop policy if exists "Gallery images public read"   on storage.objects;
drop policy if exists "Gallery images staff upload"  on storage.objects;
drop policy if exists "Gallery images staff update"  on storage.objects;
drop policy if exists "Gallery images staff delete"  on storage.objects;

create policy "Gallery images public read"  on storage.objects
  for select using (bucket_id = 'gallery');
create policy "Gallery images staff upload" on storage.objects
  for insert with check (bucket_id = 'gallery');
create policy "Gallery images staff update" on storage.objects
  for update using (bucket_id = 'gallery');
create policy "Gallery images staff delete" on storage.objects
  for delete using (bucket_id = 'gallery');
