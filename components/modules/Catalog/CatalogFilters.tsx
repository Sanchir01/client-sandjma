/* eslint-disable react-hooks/exhaustive-deps */
import {
	$clothManufacturers,
	$clothSizeManufacturers,
	getBoilerPartsFx,
	setClothManufacturersFromQuery,
	setFilteredCloth,
	setSizeManufacturersFromQuery
} from '@/effector/clothParts'
import { useMediaQuery } from '@/hooks/useMediaquery'
import { ICatalogFilterProps } from '@/types/Catalog.interface'
import { CheckQueryParams } from '@/utils/Catalog'
import { getQueryParamOnFirstRender } from '@/utils/common'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CatalogFiltersMobile from './CatalogFiltersMobile'
import CatalogFiltersDesktop from './CatalogfiltersDesctop'

const CatalogFilters = ({
	setIsPriceRangeChanged,
	priceRange,
	setPriceRange,
	resetFilterBTNDisabled,
	resetFilter,
	isPriceRangeChanged,
	currentPage,
	setIsFilterInQuery,
	closePopup,
	filtersMobileOpen
}: ICatalogFilterProps) => {
	const isMobile = useMediaQuery(820)
	const [spinner, setSpinner] = useState(false)
	const router = useRouter()

	const clothManufacturers = useStore($clothManufacturers)
	const slothSize = useStore($clothSizeManufacturers)

	useEffect(() => {
		applyFilterFromQuery()
	}, [])

	const applyFilterFromQuery = async () => {
		try {
			const {
				isValidClothQuery,
				isValidSizeQuery,
				isValidPriceQuery,
				priceFromQueryValue,
				priceToQueryValue,
				clothAQueryValue,
				sizeQueryValue
			} = CheckQueryParams(router)

			const clothQuery = `&cloth=${getQueryParamOnFirstRender('cloth', router)}`
			const sizeQuery = `&size=${getQueryParamOnFirstRender('size', router)}`
			const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

			if (isValidClothQuery && isValidSizeQuery && isValidPriceQuery) {
				setIsFilterInQuery(true)
				setPriceRange([+priceFromQueryValue, +priceToQueryValue])
				setIsPriceRangeChanged(true)
				setClothManufacturersFromQuery(clothAQueryValue)
				setSizeManufacturersFromQuery(sizeQueryValue)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${currentPage}${priceQuery}${clothQuery}${sizeQuery}`
				)
				setFilteredCloth(data)
			}

			if (isValidPriceQuery) {
				setIsFilterInQuery(true)
				setPriceRange([+priceFromQueryValue, +priceToQueryValue])
				setIsPriceRangeChanged(true)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${currentPage}${priceQuery}}`
				)
				setFilteredCloth(data)
			}

			if (isValidClothQuery && isValidSizeQuery) {
				setIsFilterInQuery(true)
				setClothManufacturersFromQuery(clothAQueryValue)
				setSizeManufacturersFromQuery(sizeQueryValue)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${currentPage}${clothQuery}${sizeQuery}`
				)
				setFilteredCloth(data)
			}

			if (isValidClothQuery && isValidPriceQuery) {
				setIsFilterInQuery(true)
				setPriceRange([+priceFromQueryValue, +priceToQueryValue])
				setIsPriceRangeChanged(true)
				setClothManufacturersFromQuery(clothAQueryValue)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${currentPage}${priceQuery}${clothQuery}`
				)
				setFilteredCloth(data)
			}

			if (isValidSizeQuery && isValidPriceQuery) {
				setIsFilterInQuery(true)
				setPriceRange([+priceFromQueryValue, +priceToQueryValue])
				setIsPriceRangeChanged(true)
				setSizeManufacturersFromQuery(sizeQueryValue)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${currentPage}${priceQuery}${sizeQuery}`
				)
				setFilteredCloth(data)
			}

			if (isValidClothQuery) {
				setIsFilterInQuery(true)
				setClothManufacturersFromQuery(clothAQueryValue)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${currentPage}${clothQuery}`
				)
				setFilteredCloth(data)
			}

			if (isValidSizeQuery) {
				setIsFilterInQuery(true)
				setSizeManufacturersFromQuery(sizeQueryValue)
				const data = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${currentPage}${sizeQuery}`
				)
				setFilteredCloth(data)
			}
		} catch (err) {
			const error = err as Error
			if (error.message === 'URI malformed') {
				toast.warning('Неправильный url для фильтров')
				return
			}
			toast.error((err as Error).message)
		}
	}

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
				delete router.query.cloth
				delete router.query.size
				delete router.query.priceTo
				delete router.query.piceFrom
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
			if (clothes.length && size.length) {
				delete router.query.cloth
				delete router.query.size
				delete router.query.priceTo
				delete router.query.piceFrom
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

			if (size.length && isPriceRangeChanged) {
				delete router.query.cloth
				delete router.query.size
				delete router.query.priceTo
				delete router.query.piceFrom
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
					`/boiler-parts?limit=20&offset=${initialPage}${priceQuery}${sizeQuery}`
				)
				setFilteredCloth(data)
				return
			}

			if (clothes.length && isPriceRangeChanged) {
				delete router.query.cloth
				delete router.query.size
				delete router.query.priceTo
				delete router.query.piceFrom
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
					`/boiler-parts?limit=20&offset=${initialPage}${priceQuery}${clothQuery}`
				)
				setFilteredCloth(data)
				return
			}

			if (clothes.length) {
				delete router.query.cloth
				delete router.query.size
				delete router.query.priceTo
				delete router.query.piceFrom
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
				return
			}

			if (size.length) {
				delete router.query.cloth
				delete router.query.size
				delete router.query.priceTo
				delete router.query.piceFrom
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
			if (isPriceRangeChanged) {
				delete router.query.cloth
				delete router.query.size
				delete router.query.priceTo
				delete router.query.piceFrom
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
		} catch (err) {
			toast.error((err as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	return (
		<div>
			{isMobile ? (
				<CatalogFiltersMobile
					closePopup={closePopup}
					spinner={spinner}
					priceRange={priceRange}
					applyFilters={applyFilters}
					setIsPriceRangeChanged={setIsPriceRangeChanged}
					setPriceRange={setPriceRange}
					resetFilterBTNDisabled={resetFilterBTNDisabled}
					resetFilter={resetFilter}
					filtersMobileOpen={filtersMobileOpen}
				/>
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
