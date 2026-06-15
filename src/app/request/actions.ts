"use server";

import { redirect } from "next/navigation";
import { saveLocalRequest } from "@/lib/request-store";
import { supabaseServer } from "@/lib/supabase-server";

function getRequiredText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function safeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
}

export async function submitRequest(formData: FormData) {
  const requestPayload = {
    customer_name: getRequiredText(formData, "customer_name"),
    phone: getRequiredText(formData, "phone"),
    area: getRequiredText(formData, "area"),
    address_detail: getRequiredText(formData, "address_detail"),
    category: getRequiredText(formData, "category"),
    description: getRequiredText(formData, "description"),
    preferred_timing: getRequiredText(formData, "preferred_timing"),
    contact_method: getRequiredText(formData, "contact_method"),
    photo_urls: [] as string[],
    status: "未対応",
  };

  if (!supabaseServer) {
    await saveLocalRequest(requestPayload);
    redirect("/request/complete");
  }

  const files = formData.getAll("photos").filter((file): file is File => file instanceof File && file.size > 0).slice(0, 3);

  for (const file of files) {
    const path = `requests/${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.name)}`;
    const { error: uploadError } = await supabaseServer.storage.from("request-photos").upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

    if (uploadError) {
      throw new Error(`写真の保存に失敗しました: ${uploadError.message}`);
    }

    const { data } = supabaseServer.storage.from("request-photos").getPublicUrl(path);
    requestPayload.photo_urls.push(data.publicUrl);
  }

  const { error } = await supabaseServer.from("requests").insert(requestPayload);

  if (error) {
    throw new Error(`依頼の保存に失敗しました: ${error.message}`);
  }

  redirect("/request/complete");
}
