export interface TourItem {
  id: number;
  id_type: number;
  id_group: number;
  cost: number;
  name: string;
  description: string;
  multiplier: number;
  unlock_count: number;
  is_buy: boolean;
  is_group_update: boolean;
  avilable: boolean;
}

export enum Pending {
  LOADING,
  DONE,
  FAILED,
  CLEAR,
  EMPTY,
}
