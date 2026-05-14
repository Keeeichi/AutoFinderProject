export type AggregatedRow = {
  id: string;
  title: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  mileage_km: number | null;
  price_rub: string | number | null;
  city: string | null;
  image_urls: string[] | null;
  fetched_at?: string;
};

export type ListingRow = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage_km: number | null;
  price_rub: string | number;
  city: string | null;
  status: string;
  created_at: string;
  images: string[];
};

export type StatsResponse = {
  aggregated: number;
  publishedListings: number;
  queuePending: number;
};

export type PlatformRow = {
  id: number;
  code: string;
  name: string;
  base_url: string | null;
  is_active: boolean;
};
