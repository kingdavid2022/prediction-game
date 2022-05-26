export type PredictionCardProps = {
   logo:string,
   token:string,
   timeLeft:string | number,
   price:number,
   date:string,
   onclick:any
}
export type PredictionPageProps = {
    onclick:any
 }
 

export type ListProps = {
    index:number,
    price:number | string,
    owner:boolean

}

export type Tabs = 'contest' | 'Your Predictions'

export type PredictionDetailsProps = {
    logo:string,
    token:string,
    price:number,
    date:string,
    Fee:number,
    predictedValue:string | number,
    reward:string | number,
    frequency: number
 }