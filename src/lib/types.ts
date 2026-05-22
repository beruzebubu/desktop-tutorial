export type RequestRow = {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  area: string;
  address_detail: string;
  category: string;
  description: string;
  preferred_timing: string;
  contact_method: string;
  photo_urls: string[];
  status: string;
  admin_memo: string | null;
  assigned_craftsman_id: string | null;
};

export type CraftsmanRow = {
  id: string;
  created_at: string;
  name: string;
  business_name: string;
  phone: string;
  areas: string[];
  categories: string[];
  memo: string | null;
  availability_status: string;
};
