import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const FARMS = [
  { id: "f-01", name: "Putah Creek Family Farm", steward: "Maria & David Soto", county: "Yolo", acres: 28, years_farming: 22, certifications: ["USDA Organic", "CCOF"], practices: ["No-till", "Cover cropping"], top_crops: ["Carrots", "Beets", "Radish"], weekly_capacity_lb: 240, joined_year: 2023, distance_mi: 8 },
  { id: "f-02", name: "Cache Creek Organics", steward: "Lin Zhao", county: "Yolo", acres: 14, years_farming: 9, certifications: ["USDA Organic"], practices: ["Drip irrigation", "Compost"], top_crops: ["Lettuce", "Kale", "Chard"], weekly_capacity_lb: 180, joined_year: 2024, distance_mi: 16 },
  { id: "f-03", name: "Capay Hills Garden", steward: "The Vargas Family", county: "Yolo", acres: 35, years_farming: 31, certifications: ["USDA Organic", "Real Organic"], practices: ["Hedgerows", "Polyculture"], top_crops: ["Tomatoes", "Peppers", "Squash"], weekly_capacity_lb: 320, joined_year: 2023, distance_mi: 24 },
  { id: "f-04", name: "Solano Heritage Farm", steward: "James Whitfield", county: "Solano", acres: 42, years_farming: 18, certifications: ["GAP"], practices: ["Integrated pest mgmt"], top_crops: ["Apples", "Pears", "Stone fruit"], weekly_capacity_lb: 410, joined_year: 2024, distance_mi: 19 },
  { id: "f-05", name: "Coyote Hill Produce", steward: "Ana Mendez", county: "Solano", acres: 11, years_farming: 6, certifications: ["Certified Naturally Grown"], practices: ["No-spray", "Hand-harvest"], top_crops: ["Strawberries", "Herbs"], weekly_capacity_lb: 90, joined_year: 2025, distance_mi: 22 },
  { id: "f-06", name: "Clarksburg Sun Farm", steward: "Tom & Ellie Park", county: "Sacramento", acres: 19, years_farming: 14, certifications: ["USDA Organic"], practices: ["Cover cropping"], top_crops: ["Sweet corn", "Melons"], weekly_capacity_lb: 220, joined_year: 2023, distance_mi: 28 },
  { id: "f-07", name: "Yolo Greenway Acres", steward: "Priya Patel", county: "Yolo", acres: 8, years_farming: 4, certifications: ["CCOF"], practices: ["Drip irrigation"], top_crops: ["Greens", "Herbs"], weekly_capacity_lb: 110, joined_year: 2025, distance_mi: 7 },
  { id: "f-08", name: "Knight's Landing Growers", steward: "The Nguyen Family", county: "Yolo", acres: 24, years_farming: 12, certifications: ["GAP"], practices: ["Crop rotation"], top_crops: ["Onions", "Garlic", "Leeks"], weekly_capacity_lb: 260, joined_year: 2024, distance_mi: 18 },
  { id: "f-09", name: "Suisun Marsh Gardens", steward: "Dorothy Chen", county: "Solano", acres: 6, years_farming: 3, certifications: ["Certified Naturally Grown"], practices: ["Pollinator strips"], top_crops: ["Microgreens", "Edible flowers"], weekly_capacity_lb: 60, joined_year: 2025, distance_mi: 26 },
  { id: "f-10", name: "Winters Mesa Farm", steward: "Carlos Reyes", county: "Yolo", acres: 31, years_farming: 21, certifications: ["USDA Organic", "CCOF"], practices: ["Dry farming", "Hedgerows"], top_crops: ["Winter squash", "Pumpkins"], weekly_capacity_lb: 350, joined_year: 2023, distance_mi: 21 },
  { id: "f-11", name: "Esparto Hill Orchards", steward: "Jane Albrecht", county: "Yolo", acres: 18, years_farming: 16, certifications: ["GAP"], practices: ["Integrated pest mgmt"], top_crops: ["Apples", "Plums"], weekly_capacity_lb: 240, joined_year: 2024, distance_mi: 30 },
  { id: "f-12", name: "Vacaville Valley Farm", steward: "Hannah & Eli Brooks", county: "Solano", acres: 22, years_farming: 8, certifications: ["USDA Organic"], practices: ["No-till", "Compost"], top_crops: ["Broccoli", "Cauliflower", "Cabbage"], weekly_capacity_lb: 290, joined_year: 2024, distance_mi: 23 },
  { id: "f-13", name: "River Bend Produce", steward: "Wei Lin", county: "Sacramento", acres: 16, years_farming: 11, certifications: ["CCOF"], practices: ["Cover cropping"], top_crops: ["Asian greens", "Bok choy"], weekly_capacity_lb: 170, joined_year: 2024, distance_mi: 27 },
  { id: "f-14", name: "Madison Acre Farm", steward: "Sarah Johnston", county: "Yolo", acres: 9, years_farming: 5, certifications: ["Certified Naturally Grown"], practices: ["Hand-harvest"], top_crops: ["Carrots", "Beets"], weekly_capacity_lb: 95, joined_year: 2025, distance_mi: 14 },
  { id: "f-15", name: "Dixon Sunrise Farm", steward: "Robert & Lisa Hall", county: "Solano", acres: 38, years_farming: 26, certifications: ["GAP"], practices: ["Crop rotation"], top_crops: ["Sweet corn", "Tomatoes"], weekly_capacity_lb: 380, joined_year: 2023, distance_mi: 17 },
  { id: "f-16", name: "Three Sisters Heritage", steward: "The Yazzie Family", county: "Yolo", acres: 12, years_farming: 7, certifications: ["USDA Organic"], practices: ["Polyculture", "Indigenous methods"], top_crops: ["Beans", "Corn", "Squash"], weekly_capacity_lb: 130, joined_year: 2024, distance_mi: 12 },
  { id: "f-17", name: "Plainfield Pasture", steward: "Marcus Hill", county: "Yolo", acres: 27, years_farming: 13, certifications: ["GAP"], practices: ["Silvopasture"], top_crops: ["Eggs", "Pasture greens"], weekly_capacity_lb: 200, joined_year: 2024, distance_mi: 11 },
  { id: "f-18", name: "Russell Boulevard Greens", steward: "Davis Co-op", county: "Yolo", acres: 5, years_farming: 3, certifications: ["Certified Naturally Grown"], practices: ["Urban agriculture"], top_crops: ["Salad mix", "Microgreens"], weekly_capacity_lb: 75, joined_year: 2025, distance_mi: 4 },
  { id: "f-19", name: "Pleasant Valley Farm", steward: "Tomás Ortega", county: "Solano", acres: 20, years_farming: 17, certifications: ["USDA Organic"], practices: ["Compost", "Drip irrigation"], top_crops: ["Peppers", "Eggplant"], weekly_capacity_lb: 220, joined_year: 2024, distance_mi: 25 },
  { id: "f-20", name: "Buckhorn Ranch", steward: "Helen & Frank Lopez", county: "Yolo", acres: 33, years_farming: 24, certifications: ["GAP", "CCOF"], practices: ["Hedgerows"], top_crops: ["Apples", "Pears"], weekly_capacity_lb: 340, joined_year: 2023, distance_mi: 20 },
  { id: "f-21", name: "West Plainfield Co-op", steward: "Co-op of 4 farms", county: "Yolo", acres: 17, years_farming: 10, certifications: ["USDA Organic"], practices: ["Cooperative", "Cover cropping"], top_crops: ["Mixed vegetables"], weekly_capacity_lb: 180, joined_year: 2024, distance_mi: 9 },
  { id: "f-22", name: "Sycamore Slough Farms", steward: "The Adeyemi Family", county: "Sacramento", acres: 21, years_farming: 9, certifications: ["CCOF"], practices: ["No-till"], top_crops: ["Sweet potatoes", "Okra"], weekly_capacity_lb: 200, joined_year: 2024, distance_mi: 29 },
];

const ORDER = {
  week_of: "Week of May 11, 2026",
  buyer: "UC Davis Dining Services",
  buyer_logo: "UCD",
  delivery: "Tuesday, 6:00 AM · Dining Commons Loading Dock",
  total_lb: 2840,
  line_count: 14,
  contributing_farms: 18,
  status: "Ready for dispatch",
  invoice_id: "AL-2026-W19-UCD",
};

const ORDER_LINES = [
  { crop: "Carrots", category: "Roots", amount_lb: 320, packed_as: "20 lb cases", contributors: [{ farmId: "f-01", lb: 140 }, { farmId: "f-14", lb: 95 }, { farmId: "f-16", lb: 50 }, { farmId: "f-21", lb: 35 }] },
  { crop: "Lettuce (Romaine)", category: "Greens", amount_lb: 260, packed_as: "24-count cases", contributors: [{ farmId: "f-02", lb: 110 }, { farmId: "f-07", lb: 70 }, { farmId: "f-18", lb: 50 }, { farmId: "f-21", lb: 30 }] },
  { crop: "Kale (Lacinato)", category: "Greens", amount_lb: 180, packed_as: "12-bunch cases", contributors: [{ farmId: "f-02", lb: 70 }, { farmId: "f-07", lb: 60 }, { farmId: "f-13", lb: 50 }] },
  { crop: "Broccoli", category: "Brassicas", amount_lb: 240, packed_as: "20 lb cases", contributors: [{ farmId: "f-12", lb: 180 }, { farmId: "f-21", lb: 60 }] },
  { crop: "Cabbage", category: "Brassicas", amount_lb: 200, packed_as: "40 lb bins", contributors: [{ farmId: "f-12", lb: 110 }, { farmId: "f-15", lb: 90 }] },
  { crop: "Yellow Onions", category: "Alliums", amount_lb: 280, packed_as: "50 lb bags", contributors: [{ farmId: "f-08", lb: 200 }, { farmId: "f-21", lb: 80 }] },
  { crop: "Garlic", category: "Alliums", amount_lb: 60, packed_as: "10 lb cases", contributors: [{ farmId: "f-08", lb: 60 }] },
  { crop: "Roma Tomatoes", category: "Nightshades", amount_lb: 220, packed_as: "20 lb flats", contributors: [{ farmId: "f-03", lb: 140 }, { farmId: "f-15", lb: 80 }] },
  { crop: "Bell Peppers", category: "Nightshades", amount_lb: 140, packed_as: "15 lb cases", contributors: [{ farmId: "f-03", lb: 80 }, { farmId: "f-19", lb: 60 }] },
  { crop: "Zucchini", category: "Squash", amount_lb: 200, packed_as: "20 lb cases", contributors: [{ farmId: "f-03", lb: 110 }, { farmId: "f-10", lb: 90 }] },
  { crop: "Apples (Gala)", category: "Fruit", amount_lb: 360, packed_as: "40 lb cases", contributors: [{ farmId: "f-04", lb: 180 }, { farmId: "f-11", lb: 100 }, { farmId: "f-20", lb: 80 }] },
  { crop: "Strawberries", category: "Fruit", amount_lb: 80, packed_as: "8 lb flats", contributors: [{ farmId: "f-05", lb: 80 }] },
  { crop: "Beets", category: "Roots", amount_lb: 160, packed_as: "25 lb cases", contributors: [{ farmId: "f-01", lb: 80 }, { farmId: "f-14", lb: 50 }, { farmId: "f-16", lb: 30 }] },
  { crop: "Mixed Salad Greens", category: "Greens", amount_lb: 140, packed_as: "3 lb bags", contributors: [{ farmId: "f-09", lb: 40 }, { farmId: "f-13", lb: 50 }, { farmId: "f-18", lb: 50 }] },
];

const IMPACT = {
  pounds_this_season: 38420,
  farms_supported: 22,
  institutions_served: 4,
  acres_in_network: 456,
  average_farm_size: 21,
  farms_under_30_acres: 18,
  highlights: [
    "Your network supplied 38,420 lb of food across 22 small farms this season — without any single farm needing to scale beyond what it can responsibly produce.",
    "82% of contributing farms operate on fewer than 30 acres. AggieLink's pooled fulfillment is what made them eligible to bid.",
    "Dollars spent in the network return to growers in the same three counties they came from.",
  ],
  weekly_trend: [
    { week: "W1", lb: 1840 }, { week: "W2", lb: 2120 }, { week: "W3", lb: 2010 },
    { week: "W4", lb: 2380 }, { week: "W5", lb: 2470 }, { week: "W6", lb: 2290 },
    { week: "W7", lb: 2540 }, { week: "W8", lb: 2680 }, { week: "W9", lb: 2510 },
    { week: "W10", lb: 2740 }, { week: "W11", lb: 2620 }, { week: "W12", lb: 2840 },
  ],
  by_category: [
    { category: "Fruit", lb: 9200, color: "#b86244" },
    { category: "Greens", lb: 6800, color: "#458c55" },
    { category: "Roots", lb: 5400, color: "#9c7327" },
    { category: "Brassicas", lb: 4900, color: "#286c3c" },
    { category: "Nightshades", lb: 4400, color: "#cd7d5e" },
    { category: "Alliums", lb: 3700, color: "#74ad7e" },
    { category: "Squash", lb: 2700, color: "#dbab5d" },
    { category: "Other", lb: 1320, color: "#a9ccae" },
  ],
  by_county: [
    { county: "Yolo", farms: 12 },
    { county: "Solano", farms: 7 },
    { county: "Sacramento", farms: 3 },
  ],
  institutions: [
    { name: "UC Davis Dining Services", since: 2023 },
    { name: "Sutter Davis Hospital", since: 2024 },
    { name: "Davis Joint Unified School District", since: 2024 },
    { name: "Woodland Memorial Hospital", since: 2025 },
  ],
};

export async function GET() {
  try {
    // Upsert farms (safe to run multiple times)
    const { error: farmsErr } = await supabase
      .from("farms")
      .upsert(FARMS, { onConflict: "id" });
    if (farmsErr) return NextResponse.json({ ok: false, error: `farms: ${farmsErr.message}` }, { status: 500 });

    // Insert order only if table is empty
    const { count: orderCount } = await supabase.from("orders").select("*", { count: "exact", head: true });
    let orderId = 1;
    if (orderCount === 0) {
      const { data: newOrder, error: orderErr } = await supabase
        .from("orders")
        .insert(ORDER)
        .select("id")
        .single();
      if (orderErr) return NextResponse.json({ ok: false, error: `orders: ${orderErr.message}` }, { status: 500 });
      orderId = newOrder.id;

      const lines = ORDER_LINES.map((l) => ({ ...l, order_id: orderId }));
      const { error: linesErr } = await supabase.from("order_lines").insert(lines);
      if (linesErr) return NextResponse.json({ ok: false, error: `order_lines: ${linesErr.message}` }, { status: 500 });
    }

    // Insert impact only if table is empty
    const { count: impactCount } = await supabase.from("impact").select("*", { count: "exact", head: true });
    if (impactCount === 0) {
      const { error: impactErr } = await supabase.from("impact").insert(IMPACT);
      if (impactErr) return NextResponse.json({ ok: false, error: `impact: ${impactErr.message}` }, { status: 500 });
    }

    // Insert demand_posts only if table is empty
    const { count: demandCount } = await supabase.from("demand_posts").select("*", { count: "exact", head: true });
    if (demandCount === 0) {
      const { error: demandErr } = await supabase.from("demand_posts").insert([
        { buyer: "UC Davis Dining Services", crop: "Kale (Lacinato)", quantity_lb: 200, needed_by: "2026-05-18", certification_requirements: ["USDA Organic"], delivery_schedule: "Tuesday 6:00 AM", notes: "Lacinato variety preferred", status: "open" },
        { buyer: "UC Davis Dining Services", crop: "Carrots", quantity_lb: 300, needed_by: "2026-05-18", certification_requirements: [], delivery_schedule: "Tuesday 6:00 AM", notes: "Any variety, 20 lb cases", status: "open" },
        { buyer: "Sutter Davis Hospital", crop: "Salad Mix", quantity_lb: 80, needed_by: "2026-05-20", certification_requirements: ["Certified Naturally Grown"], delivery_schedule: "Wednesday 7:00 AM", notes: "Pre-washed preferred", status: "open" },
        { buyer: "Davis Joint Unified School District", crop: "Apples", quantity_lb: 400, needed_by: "2026-05-22", certification_requirements: ["GAP"], delivery_schedule: "Friday 8:00 AM", notes: "Gala or Fuji variety", status: "open" },
        { buyer: "Woodland Memorial Hospital", crop: "Broccoli", quantity_lb: 150, needed_by: "2026-05-25", certification_requirements: ["USDA Organic"], delivery_schedule: "Monday 6:00 AM", notes: "", status: "open" },
      ]);
      if (demandErr) return NextResponse.json({ ok: false, error: `demand_posts: ${demandErr.message}` }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      message: "Database seeded successfully. Refresh /dashboard or /farmer to see live data.",
      seeded: {
        farms: FARMS.length,
        orders: orderCount === 0 ? 1 : 0,
        order_lines: orderCount === 0 ? ORDER_LINES.length : 0,
        impact: impactCount === 0 ? 1 : 0,
        demand_posts: demandCount === 0 ? 5 : 0,
      },
    });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
