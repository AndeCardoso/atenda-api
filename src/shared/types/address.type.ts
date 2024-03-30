export interface CreateAddress {
  nickname?: string | null;
  cep: string;
  street: string;
  number: string;
  complement?: string | null;
  district: string;
  state: string;
  city: string;
}

export interface UpdateAddress {
  nickname?: string | null;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string | null;
  district?: string;
  state?: string;
  city?: string;
}
