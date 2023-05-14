export interface IClothParts {
   id:number
   cloth_manufacturer:string
   price:number
   cloth_size:string
   vendor_code:string
   name:string
   description:string
   images:string
   in_stock:number
   bestsellers:boolean
   new:boolean
   popular:number
   compatibility:string
}

export interface IDashBoardSlider {
   items:IClothParts[]
   spinner:boolean
   goToClothPage?:boolean
}
export interface IClothPartsRows {
  count:number
  rows:IClothParts[]
}