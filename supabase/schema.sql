create extension if not exists "pgcrypto";

create table if not exists craftsmen (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business_name text not null,
  phone text not null,
  areas text[] not null default '{}',
  categories text[] not null default '{}',
  memo text,
  availability_status text not null default '対応可'
);

create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  phone text not null,
  area text not null,
  address_detail text not null,
  category text not null,
  description text not null,
  preferred_timing text not null,
  contact_method text not null,
  photo_urls text[] not null default '{}',
  status text not null default '未対応',
  admin_memo text,
  assigned_craftsman_id uuid references craftsmen(id) on delete set null
);
