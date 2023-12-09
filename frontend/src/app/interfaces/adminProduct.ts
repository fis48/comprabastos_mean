export interface IProduct {
  id?: string
  name: string
  prices: [{
    timestamp: number,
    value: number
  }]
  avgPrice?: number
}