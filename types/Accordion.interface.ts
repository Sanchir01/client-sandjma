export interface IAccordion {
   children:React.ReactNode
   title: string | false
   titleClass: string 
   arrowOpenClass: string
   isMobileForFilters?:boolean
   hideArrowClass?:string
}
