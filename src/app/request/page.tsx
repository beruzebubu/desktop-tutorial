import { AREAS, CONTACT_METHODS, REQUEST_CATEGORIES, TIMINGS } from "@/lib/constants";

export default function RequestPage() {
  return (
    <form className="card grid" action="/api/requests" method="post" encType="multipart/form-data">
      {[["名前", "customer_name"], ["電話番号", "phone"], ["詳細住所または目印", "address_detail"]].map(([label, name]) => (
        <label key={name}>{label}<input name={name} required /></label>
      ))}
      <label>住所エリア<select name="area">{AREAS.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>依頼カテゴリ<select name="category">{REQUEST_CATEGORIES.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>依頼内容<textarea name="description" rows={4} required /></label>
      <label>希望時期<select name="preferred_timing">{TIMINGS.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>写真アップロード（最大3枚）<input type="file" name="photos" accept="image/*" multiple /></label>
      <label>連絡方法<select name="contact_method">{CONTACT_METHODS.map((value) => <option key={value}>{value}</option>)}</select></label>
      <button className="btn" type="submit">送信する</button>
    </form>
  );
}
