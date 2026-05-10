import { supabase } from "./supabase";
import type { Farm, OrderLine } from "./mockData";

export type { Farm, OrderLine };

export type AggregatedOrderData = {
  weekOf: string;
  buyer: string;
  buyerLogo: string;
  delivery: string;
  totalLb: number;
  lineCount: number;
  contributingFarms: number;
  status: string;
  invoiceId: string;
  lines: OrderLine[];
};

export type ImpactData = {
  poundsThisSeason: number;
  farmsSupported: number;
  institutionsServed: number;
  acresInNetwork: number;
  averageFarmSize: number;
  farmsUnder30Acres: number;
  highlights: string[];
  weeklyTrend: { week: string; lb: number }[];
  byCategory: { category: string; lb: number; color: string }[];
  byCounty: { county: string; farms: number }[];
  institutions: { name: string; since: number }[];
};

export type DemandPost = {
  id: number;
  buyer: string;
  crop: string;
  quantityLb: number;
  neededBy: string;
  certificationRequirements: string[];
  deliverySchedule: string;
  notes: string;
  status: "open" | "filled";
};

const MOCK_DEMAND_POSTS: DemandPost[] = [
  { id: 1, buyer: "UC Davis Dining Services", crop: "Kale (Lacinato)", quantityLb: 200, neededBy: "2026-05-18", certificationRequirements: ["USDA Organic"], deliverySchedule: "Tuesday 6:00 AM", notes: "Lacinato variety preferred", status: "open" },
  { id: 2, buyer: "UC Davis Dining Services", crop: "Carrots", quantityLb: 300, neededBy: "2026-05-18", certificationRequirements: [], deliverySchedule: "Tuesday 6:00 AM", notes: "Any variety, 20 lb cases", status: "open" },
  { id: 3, buyer: "Sutter Davis Hospital", crop: "Salad Mix", quantityLb: 80, neededBy: "2026-05-20", certificationRequirements: ["Certified Naturally Grown"], deliverySchedule: "Wednesday 7:00 AM", notes: "Pre-washed preferred", status: "open" },
  { id: 4, buyer: "Davis Joint Unified School District", crop: "Apples", quantityLb: 400, neededBy: "2026-05-22", certificationRequirements: ["GAP"], deliverySchedule: "Friday 8:00 AM", notes: "Gala or Fuji variety", status: "open" },
  { id: 5, buyer: "Woodland Memorial Hospital", crop: "Broccoli", quantityLb: 150, neededBy: "2026-05-25", certificationRequirements: ["USDA Organic"], deliverySchedule: "Monday 6:00 AM", notes: "", status: "open" },
];

export async function getFarms(): Promise<Farm[]> {
  const { data, error } = await supabase.from("farms").select("*").order("name");
  if (error || !data || data.length === 0) {
    const { farms } = await import("./mockData");
    return farms;
  }
  return data.map((r) => ({
    id: r.id,
    name: r.name,
    steward: r.steward,
    county: r.county,
    acres: r.acres,
    yearsFarming: r.years_farming,
    certifications: r.certifications,
    practices: r.practices,
    topCrops: r.top_crops,
    weeklyCapacityLb: r.weekly_capacity_lb,
    joinedYear: r.joined_year,
    distanceMi: r.distance_mi,
  }));
}

export async function getLatestOrder(): Promise<AggregatedOrderData> {
  const { data: orderRow, error: oErr } = await supabase
    .from("orders")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single();
  if (oErr) {
    const { aggregatedOrder } = await import("./mockData");
    return aggregatedOrder as unknown as AggregatedOrderData;
  }

  const { data: lines, error: lErr } = await supabase
    .from("order_lines")
    .select("*")
    .eq("order_id", orderRow.id)
    .order("id");
  if (lErr) throw new Error(`getOrderLines: ${lErr.message}`);

  return {
    weekOf: orderRow.week_of,
    buyer: orderRow.buyer,
    buyerLogo: orderRow.buyer_logo ?? "",
    delivery: orderRow.delivery,
    totalLb: orderRow.total_lb,
    lineCount: orderRow.line_count,
    contributingFarms: orderRow.contributing_farms,
    status: orderRow.status,
    invoiceId: orderRow.invoice_id,
    lines: lines.map((l) => ({
      crop: l.crop,
      category: l.category,
      amountLb: l.amount_lb,
      packedAs: l.packed_as,
      contributors: l.contributors,
    })),
  };
}

export async function getImpact(): Promise<ImpactData> {
  const { data, error } = await supabase
    .from("impact")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single();
  if (error) {
    const { impact } = await import("./mockData");
    return impact as unknown as ImpactData;
  }

  return {
    poundsThisSeason: data.pounds_this_season,
    farmsSupported: data.farms_supported,
    institutionsServed: data.institutions_served,
    acresInNetwork: data.acres_in_network,
    averageFarmSize: data.average_farm_size,
    farmsUnder30Acres: data.farms_under_30_acres,
    highlights: data.highlights,
    weeklyTrend: data.weekly_trend,
    byCategory: data.by_category,
    byCounty: data.by_county,
    institutions: data.institutions,
  };
}

export async function getDemandPosts(): Promise<DemandPost[]> {
  const { data, error } = await supabase
    .from("demand_posts")
    .select("*")
    .order("needed_by");
  if (error || !data || data.length === 0) return MOCK_DEMAND_POSTS;
  return data.map((r) => ({
    id: r.id,
    buyer: r.buyer,
    crop: r.crop,
    quantityLb: r.quantity_lb,
    neededBy: r.needed_by,
    certificationRequirements: r.certification_requirements,
    deliverySchedule: r.delivery_schedule ?? "",
    notes: r.notes ?? "",
    status: r.status,
  }));
}
