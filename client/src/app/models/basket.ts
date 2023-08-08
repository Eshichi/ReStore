export interface Basket {
    id: number
    buyerId: string
    itemDtos: ItemDto[]
  }
  
  export interface ItemDto {
    productId: number
    name: string
    price: number
    pictureUrl: string
    brand: string
    type: any
    quantity: number
  }