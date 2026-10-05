-- ============================================================================
--  Stakey's Cycles - Shop / ecommerce
--  Products, orders and order lines for the website shop. Staff manage the
--  catalogue from the loyalty app; customers order on the website and pay via
--  a payment link / bank transfer arranged afterwards.
--
--  Run once in the Supabase SQL editor for project lhojocpygcnkxvkrcuxh.
--  Safe to re-run (idempotent).
--
--  NOTE: row level security follows the same open anon-key style already used
--  by service_bookings / profiles in this project. The staff app gates access
--  with its own login screen rather than RLS.
-- ============================================================================

-- ---------------------------------------------------------------- products --
create table if not exists public.products (
  id            text primary key,
  name          text not null,
  description   text,
  category      text,
  price         numeric(10, 2) not null default 0,
  was_price     numeric(10, 2),
  stock         integer not null default 0,
  image_url     text,
  condition     text default 'Used',
  sku           text,
  published     boolean not null default false,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists products_published_idx
  on public.products (published, sort_order, created_at desc);

-- ------------------------------------------------------------------ orders --
create table if not exists public.orders (
  id                text primary key,
  customer_name     text not null,
  customer_phone    text not null,
  customer_email    text,
  fulfilment        text not null default 'collection',
  address           text,
  postcode          text,
  notes             text,
  subtotal          numeric(10, 2) not null default 0,
  status            text not null default 'pending',
  payment_method    text not null default 'payment_link',
  payment_reference text,
  created_at        timestamptz not null default now()
);

create index if not exists orders_created_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);

-- ------------------------------------------------------------- order_items --
create table if not exists public.order_items (
  id         text primary key,
  order_id   text not null references public.orders (id) on delete cascade,
  product_id text,
  name       text not null,
  unit_price numeric(10, 2) not null default 0,
  quantity   integer not null default 1,
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_idx on public.order_items (order_id);

-- -------------------------------------------------------------------- RLS ---
alter table public.products    enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Products public read"   on public.products;
drop policy if exists "Products staff insert"  on public.products;
drop policy if exists "Products staff update"  on public.products;
drop policy if exists "Products staff delete"  on public.products;
create policy "Products public read"  on public.products for select using (true);
create policy "Products staff insert" on public.products for insert with check (true);
create policy "Products staff update" on public.products for update using (true);
create policy "Products staff delete" on public.products for delete using (true);

drop policy if exists "Orders public insert"  on public.orders;
drop policy if exists "Orders staff read"     on public.orders;
drop policy if exists "Orders staff update"   on public.orders;
drop policy if exists "Orders staff delete"   on public.orders;
create policy "Orders public insert" on public.orders for insert with check (true);
create policy "Orders staff read"    on public.orders for select using (true);
create policy "Orders staff update"  on public.orders for update using (true);
create policy "Orders staff delete"  on public.orders for delete using (true);

drop policy if exists "Order items public insert" on public.order_items;
drop policy if exists "Order items staff read"    on public.order_items;
drop policy if exists "Order items staff delete"  on public.order_items;
create policy "Order items public insert" on public.order_items for insert with check (true);
create policy "Order items staff read"    on public.order_items for select using (true);
create policy "Order items staff delete"  on public.order_items for delete using (true);

-- -------------------------------------------------------- storage bucket ---
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Product images public read"  on storage.objects;
drop policy if exists "Product images staff upload" on storage.objects;
drop policy if exists "Product images staff update" on storage.objects;
drop policy if exists "Product images staff delete" on storage.objects;
create policy "Product images public read"  on storage.objects
  for select using (bucket_id = 'product-images');
create policy "Product images staff upload" on storage.objects
  for insert with check (bucket_id = 'product-images');
create policy "Product images staff update" on storage.objects
  for update using (bucket_id = 'product-images');
create policy "Product images staff delete" on storage.objects
  for delete using (bucket_id = 'product-images');
