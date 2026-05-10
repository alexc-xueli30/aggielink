-- Run this in the Supabase SQL editor to create the tables.

create table farms (
  id                  text primary key,
  name                text not null,
  steward             text not null,
  county              text not null,
  acres               integer not null,
  years_farming       integer not null,
  certifications      jsonb not null default '[]',
  practices           jsonb not null default '[]',
  top_crops           jsonb not null default '[]',
  weekly_capacity_lb  integer not null,
  joined_year         integer not null,
  distance_mi         integer not null
);

create table orders (
  id                  serial primary key,
  week_of             text not null,
  buyer               text not null,
  buyer_logo          text,
  delivery            text not null,
  total_lb            integer not null,
  line_count          integer not null,
  contributing_farms  integer not null,
  status              text not null,
  invoice_id          text not null
);

create table order_lines (
  id            serial primary key,
  order_id      integer not null references orders(id) on delete cascade,
  crop          text not null,
  category      text not null,
  amount_lb     integer not null,
  packed_as     text not null,
  contributors  jsonb not null default '[]'
);

create table impact (
  id                    serial primary key,
  pounds_this_season    integer not null,
  farms_supported       integer not null,
  institutions_served   integer not null,
  acres_in_network      integer not null,
  average_farm_size     integer not null,
  farms_under_30_acres  integer not null,
  highlights            jsonb not null default '[]',
  weekly_trend          jsonb not null default '[]',
  by_category           jsonb not null default '[]',
  by_county             jsonb not null default '[]',
  institutions          jsonb not null default '[]'
);

create table demand_posts (
  id                          serial primary key,
  buyer                       text not null,
  crop                        text not null,
  quantity_lb                 integer not null,
  needed_by                   date not null,
  certification_requirements  jsonb not null default '[]',
  delivery_schedule           text,
  notes                       text,
  status                      text not null default 'open'
);
