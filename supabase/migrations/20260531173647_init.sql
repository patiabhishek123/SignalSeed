-- Enable UUID generation extension
create extension if not exists "uuid-ossp";

-- 1. Create categories table
create table if not exists public.categories (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    slug text not null unique,
    created_at timestamptz not null default now()
);

-- Enable RLS for categories
alter table public.categories enable row level security;

-- RLS Policies for categories (Allow read for all, write for authenticated users)
create policy "Allow public read-only access to categories" 
on public.categories for select 
using (true);

create policy "Allow authenticated users to modify categories" 
on public.categories for all 
using (auth.role() = 'authenticated');


-- 2. Create startups table
create table if not exists public.startups (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    description text,
    website text,
    category_id uuid references public.categories(id) on delete set null,
    logo_url text,
    stage text not null default 'SEED',
    valuation numeric(15, 2) default 0.00,
    funding numeric(15, 2) default 0.00,
    location text,
    github_stars integer default 0,
    github_stars_wk integer default 0,
    hn_mentions_wk integer default 0,
    product_hunt_rank integer,
    trends_score numeric(5, 2) default 0.00,
    momentum_score numeric(5, 2) default 0.00,
    momentum_status text not null default 'NEUTRAL',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Enable RLS for startups
alter table public.startups enable row level security;

-- RLS Policies for startups (Allow read for all, write for authenticated users)
create policy "Allow public read-only access to startups" 
on public.startups for select 
using (true);

create policy "Allow authenticated users to modify startups" 
on public.startups for all 
using (auth.role() = 'authenticated');


-- 3. Create signals table
create table if not exists public.signals (
    id uuid primary key default gen_random_uuid(),
    startup_id uuid not null references public.startups(id) on delete cascade,
    source text not null check (source in ('github', 'hackernews', 'reddit', 'google_trends', 'techcrunch')),
    title text not null,
    description text,
    score numeric(5, 2) not null default 0.00,
    timestamp timestamptz not null default now(),
    created_at timestamptz not null default now()
);

-- Enable RLS for signals
alter table public.signals enable row level security;

-- RLS Policies for signals (Allow read for all, write for authenticated users)
create policy "Allow public read-only access to signals" 
on public.signals for select 
using (true);

create policy "Allow authenticated users to modify signals" 
on public.signals for all 
using (auth.role() = 'authenticated');


-- 4. Create momentum_snapshots table
create table if not exists public.momentum_snapshots (
    id uuid primary key default gen_random_uuid(),
    startup_id uuid not null references public.startups(id) on delete cascade,
    score numeric(5, 2) not null,
    stars integer default 0,
    mentions integer default 0,
    recorded_at timestamptz not null default now()
);

-- Enable RLS for momentum_snapshots
alter table public.momentum_snapshots enable row level security;

-- RLS Policies for momentum_snapshots (Allow read for all, write for authenticated users)
create policy "Allow public read-only access to momentum_snapshots" 
on public.momentum_snapshots for select 
using (true);

create policy "Allow authenticated users to modify momentum_snapshots" 
on public.momentum_snapshots for all 
using (auth.role() = 'authenticated');


-- Indexes for optimization
create index if not exists startups_category_id_idx on public.startups(category_id);
create index if not exists startups_momentum_score_idx on public.startups(momentum_score desc);
create index if not exists signals_startup_id_idx on public.signals(startup_id);
create index if not exists signals_timestamp_idx on public.signals(timestamp desc);
create index if not exists momentum_snapshots_startup_id_idx on public.momentum_snapshots(startup_id);
create index if not exists momentum_snapshots_recorded_at_idx on public.momentum_snapshots(recorded_at desc);


-- Auto-update updated_at helper function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger trigger_update_startups_updated_at
before update on public.startups
for each row
execute function update_updated_at_column();
