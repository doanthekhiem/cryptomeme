import dayjs from "dayjs";

export interface IMenu {
  id: string;
  name: string;
  url: string;
}

export interface IMenuFooter {
  id: string;
  name: string;
  url?: string;
}
export interface I_TOGGLE_DATE {
  id: string;
  name: string;
}
export interface ChartPoint {
  usdValue: number;
}

export interface ChartData {
  date: string;
  usdValue: number | string;
}

export interface ChartComponentProps {
  data: number[];
  updateTime: string;
}

export interface IChartColor {
  id: string;
  color: string;
  bg: string;
}

export interface ApiResponse {
  current_coin_balances: CoinBalance[];
}

export interface CoinBalance {
  amount: number;
  last_transaction_timestamp: string;
  coin_info: CoinInfo | null;
}

export interface CoinInfo {
  symbol: string;
  name: string;
  decimals: number;
  creator_address: string;
}

export interface ICoins {
  owner_address: string;
  coin_type_hash: string;
  coin_type: string;
  amount: number;
  last_transaction_version: number;
  last_transaction_timestamp: string;
  coin_name: string;
  coin_symbol: string;
  coin_decimals: number;
}

export interface IPriceCoin {
  coin_type: string;
  current_price: number;
  decimals: number;
  logo_url: string;
  name: string;
  project_url: string;
  symbol: string;
}
