import { redirect } from "next/navigation";
import { saveLocalRequest } from "@/lib/request-store";

function getRequiredText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();

  await saveLocalRequest({
    customer_name: getRequiredText(formData, "customer_name"),
    phone: getRequiredText(formData, "phone"),
    area: getRequiredText(formData, "area"),
    address_detail: getRequiredText(formData, "address_detail"),
    category: getRequiredText(formData, "category"),
    description: getRequiredText(formData, "description"),
    preferred_timing: getRequiredText(formData, "preferred_timing"),
    contact_method: getRequiredText(formData, "contact_method"),
    photo_urls: [],
    status: "未対応",
  });

  redirect("/request/complete");
}
