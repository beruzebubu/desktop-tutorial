"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AREAS, CONTACT_METHODS, REQUEST_CATEGORIES, TIMINGS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

export default function RequestPage() {
  const r = useRouter();
  const [loading, setLoading] = useState(false);
  async function onSubmit(formData: FormData) {
    setLoading(true);
    const files = formData.getAll("photos") as File[];
    const urls: string[] = [];
    if (supabase) {
      for (const f of files.slice(0, 3)) {
        if (!f || f.size === 0) continue;
        const path = `requests/${Date.now()}-${f.name}`;
        const { error } = await supabase.storage.from("request-photos").upload(path, f);
        if (!error) {
          const { data } = supabase.storage.from("request-photos").getPublicUrl(path);
          urls.push(data.publicUrl);
        }
      }
      await supabase.from("requests").insert({
        customer_name: formData.get("customer_name"), phone: formData.get("phone"), area: formData.get("area"),
        address_detail: formData.get("address_detail"), category: formData.get("category"), description: formData.get("description"),
        preferred_timing: formData.get("preferred_timing"), contact_method: formData.get("contact_method"), photo_urls: urls, status: "未対応"
      });
    }
    r.push("/request/complete");
  }
  return <form className="card grid" action={onSubmit}>{[["名前","customer_name"],["電話番号","phone"],["詳細住所または目印","address_detail"]].map(([l,n])=><label key={n}>{l}<input name={n} required/></label>)}
  <label>住所エリア<select name="area">{AREAS.map(v=><option key={v}>{v}</option>)}</select></label>
  <label>依頼カテゴリ<select name="category">{REQUEST_CATEGORIES.map(v=><option key={v}>{v}</option>)}</select></label>
  <label>依頼内容<textarea name="description" rows={4} required/></label>
  <label>希望時期<select name="preferred_timing">{TIMINGS.map(v=><option key={v}>{v}</option>)}</select></label>
  <label>写真アップロード（最大3枚）<input type="file" name="photos" accept="image/*" multiple/></label>
  <label>連絡方法<select name="contact_method">{CONTACT_METHODS.map(v=><option key={v}>{v}</option>)}</select></label>
  <button className="btn" disabled={loading}>{loading?"送信中...":"送信する"}</button></form>;
}
