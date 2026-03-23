create extension if not exists pgcrypto;

create table if not exists public.shared_cards (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  user_id uuid not null references auth.users (id) on delete cascade,
  template_id integer not null,
  customization jsonb not null,
  overrides jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.shared_cards enable row level security;

create policy "shared_cards_public_read"
on public.shared_cards
for select
to public
using (true);

create policy "shared_cards_insert_own"
on public.shared_cards
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "shared_cards_update_own"
on public.shared_cards
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "shared_cards_delete_own"
on public.shared_cards
for delete
to authenticated
using (auth.uid() = user_id);
