export interface address {
  id?: number | string;
  nickname?: string | null;
  cep: string;
  street: string;
  number: string;
  complement?: string | null;
  district: string;
  state: string;
  city: string;
  created_at?: Date;
  updated_at?: Date;
}
