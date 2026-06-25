export interface Merek {
  id: string;
  name: string;
  isActive: boolean;
  tipeCount?: number;
}

export interface Tipe {
  id: string;
  name: string;
  isActive: boolean;
  merekId?: string;
}

export interface Vendor {
  id: string;
  name: string;
  address?: string | null;
  phone?: string | null;
  isActive: boolean;
}

export interface BranchImage {
  id: string;
  url?: string | null;
}

export interface Branch {
  id: string;
  nama: string;
  code: string;
  lokasi?: string | null;
  longlat?: string | null;
  kontak?: string | null;
  picId?: string | null;
  images?: BranchImage[];
}

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
}
