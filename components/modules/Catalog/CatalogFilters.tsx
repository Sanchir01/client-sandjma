import { useMediaQuery } from '@/hooks/useMediaquery'
import { ICatalogFilterDesktopProps } from '@/types/Catalog.interface'
import CatalogFiltersDesktop from './CatalogfiltersDesctop'
import { useState } from 'react'

const CatalogFilters = ({
	setIsPriceRangeChanged,
	priceRange,
	setPriceRange,
   resetFilterBTNDisabled
}: ICatalogFilterDesktopProps) => {
	const isMobile = useMediaQuery(820)
   const [spinner,setSpinner] = useState(false)
	return (
		<div>
			{isMobile ? (
				<div />
			) : (
				<CatalogFiltersDesktop
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					setIsPriceRangeChanged={setIsPriceRangeChanged}
               resetFilterBTNDisabled={resetFilterBTNDisabled}
               spinner={spinner}
				/>
			)}
		</div>
	)
}

export default CatalogFilters
