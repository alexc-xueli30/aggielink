import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error } = await supabase.from("demand_posts").insert({
      buyer: body.buyer,
      crop: body.crop,
      quantity_lb: body.quantity_lb,
      needed_by: body.needed_by,
      certification_requirements: body.certification_requirements ?? [],
      delivery_schedule: body.delivery_schedule ?? "",
      notes: body.notes ?? "",
      status: "open",
    });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
