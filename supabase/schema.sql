-- Run this entire file in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.licenses (
  id uuid primary key default gen_random_uuid(),
  license_key_hash text not null unique,
  customer_label text not null default '',
  status text not null default 'active' check (status in ('active','suspended','revoked')),
  device_token_hash text unique,
  completed_lessons jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  activated_at timestamptz,
  updated_at timestamptz not null default now()
);

-- The application server uses the service-role key. Browser clients must never
-- receive that key. RLS is enabled and no public policies are created.
alter table public.licenses enable row level security;
revoke all on public.licenses from anon, authenticated;
grant usage on schema public to service_role;
grant select, insert, update, delete on public.licenses to service_role;
