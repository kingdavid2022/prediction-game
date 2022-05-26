export type PredictionCardProps = {
  logo: string;
  token: string;
  time:Date
  price: number;
  date: string;
  onclick: any;
};
export type PredictionPageProps = {
  predictButtonStatus:string;
  onclick: any;
  currentPrice: string | number;
  nextContextTime: string | Date;
  time:Date
  predictPrice:any,
};

export type ListProps = {
  index: number;
  price: number | string;
  owner: boolean;
};

export type Tabs = "contest" | "Your Predictions";

export type PredictionDetailsProps = {
  logo: string;
  token: string;
  price: number;
  date: string;
  Fee: number;
  predictedValue: string | number;
  reward: string | number;
  frequency: number;
};
