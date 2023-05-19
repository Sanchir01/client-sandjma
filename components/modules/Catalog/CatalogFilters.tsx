import {
	$clothManufacturers,
	$clothSizeManufacturers,
	getBoilerPartsFx,
	setFilteredCloth
} from '@/effector/clothParts'
import { useMediaQuery } from '@/hooks/useMediaquery'
import { ICatalogFilterProps } from '@/types/Catalog.interface'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import CatalogFiltersDesktop from './CatalogfiltersDesctop'

const CatalogFilters = ({
	setIsPriceRangeChanged,
	priceRange,
	setPriceRange,
	resetFilterBTNDisabled,
	resetFilter,
	isPriceRangeChanged,
	currentPage,
	setIsFilterInQuery
}: ICatalogFilterProps) => {
	const isMobile = useMediaQuery(820)
	const [spinner, setSpinner] = useState(false)
	const router = useRouter()

	const clothManufacturers = useStore($clothManufacturers)
	const slothSize = useStore($clothSizeManufacturers)

	const applyFilters = async () => {
		setIsFilterInQuery(true)
		try {
			setSpinner(true)
			const priceFrom = Math.ceil(priceRange[0])
			const priceTo = Math.ceil(priceRange[1])
			const priceQuery = isPriceRangeChanged
				? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
				: ''
			const clothes = clothManufacturers
				.filter(item => item.checked)
				.map(item => item.title)
			const size = slothSize
				.filter(item => item.checked)
				.map(item => item.title)
			const encodedClothQuery = encodeURIComponent(JSON.stringify(clothes))
			const encodedSizeQuery = encodeURIComponent(JSON.stringify(size))
			const clothQuery = `&cloth=${encodedClothQuery}`
			const sizeQuery = `&size=${encodedSizeQuery}`
			const initialPage = currentPage > 0 ? 0 : currentPage

			if (clothes.length && size.length && isPriceRangeChanged) {
				router.push(
					{
						query: {
							...router.query,
							cloth: encodedClothQuery,
							size: encodedSizeQuery,
							priceFrom,
							priceTo,
							offset: initialPage + 1
						}
					},
					undefined,
					{ shallow: true }
				)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${initialPage}${priceQuery}${clothQuery}${sizeQuery}`
				)
				setFilteredCloth(data)
				return
			}
			if (isPriceRangeChanged) {
				router.push(
					{
						query: {
							...router.query,
							priceFrom,
							priceTo,
							offset: initialPage + 1
						}
					},
					undefined,
					{ shallow: true }
				)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${initialPage}${priceQuery}`
				)
				setFilteredCloth(data)
				return
			}
			if (clothes.length && size.length) {
				router.push(
					{
						query: {
							...router.query,
							cloth: encodedClothQuery,
							size: encodedSizeQuery,
							offset: initialPage + 1
						}
					},
					undefined,
					{ shallow: true }
				)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${initialPage}${clothQuery}${sizeQuery}`
				)
				setFilteredCloth(data)
				return
			}
			if (clothes.length) {
				router.push(
					{
						query: {
							...router.query,
							cloth: encodedClothQuery,
							offset: initialPage + 1
						}
					},
					undefined,
					{ shallow: true }
				)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${initialPage}${clothQuery}`
				)
				setFilteredCloth(data)
			}
			if (size.length) {
				router.push(
					{
						query: {
							...router.query,
							size: encodedSizeQuery,
							offset: initialPage + 1
						}
					},
					undefined,
					{ shallow: true }
				)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${initialPage}${sizeQuery}`
				)
				setFilteredCloth(data)
				return
			}
			if (size.length && isPriceRangeChanged) {
				router.push(
					{
						query: {
							...router.query,
							size: encodedSizeQuery,
							priceFrom,
							priceTo,
							offset: initialPage + 1
						}
					},
					undefined,
					{ shallow: true }
				)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${initialPage}${sizeQuery}${isPriceRangeChanged}`
				)
				setFilteredCloth(data)
				return
			}
			if (clothes.length && isPriceRangeChanged) {
				router.push(
					{
						query: {
							...router.query,
							cloth: encodedClothQuery,
							priceFrom,
							priceTo,
							offset: initialPage + 1
						}
					},
					undefined,
					{ shallow: true }
				)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${initialPage}${clothQuery}${isPriceRangeChanged}`
				)
				setFilteredCloth(data)
				return
			}
		} catch (err) {
			toast.error((err as Error).message)
		} finally {
			setSpinner(false)
		}
	}

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
					isPriceRangeChanged={isPriceRangeChanged}
					resetFilter={resetFilter}
					applyFilters={applyFilters}
				/>
			)}
		</div>
	)
}

export default CatalogFilters
