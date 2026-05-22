import { redirect } from "next/navigation";
import { AREAS, AVAILABILITY, CRAFTSMAN_CATEGORIES } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

async function createCraftsman(formData: FormData) {
  "use server";
  if (!supabase) return;
  await supabase.from("craftsmen").insert({
    name: formData.get("name"), business_name: formData.get("business_name"), phone: formData.get("phone"),
    areas: formData.getAll("areas"), categories: formData.getAll("categories"), memo: formData.get("memo"), availability_status: formData.get("availability_status")
  });
  redirect("/admin/craftsmen");
}

export default function NewCraftsman(){return <form className="card grid" action={createCraftsman}><h1>職人登録</h1><label>職人名<input name="name" required/></label><label>屋号<input name="business_name" required/></label><label>電話番号<input name="phone" required/></label><fieldset><legend>対応エリア</legend>{AREAS.map(a=><label key={a}><input type="checkbox" name="areas" value={a}/>{a}</label>)}</fieldset><fieldset><legend>対応カテゴリ</legend>{CRAFTSMAN_CATEGORIES.map(c=><label key={c}><input type="checkbox" name="categories" value={c}/>{c}</label>)}</fieldset><label>メモ<textarea name="memo" rows={3}/></label><label>稼働状況<select name="availability_status">{AVAILABILITY.map(v=><option key={v}>{v}</option>)}</select></label><button className="btn">登録</button></form>}
