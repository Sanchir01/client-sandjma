/* eslint-disable react-hooks/exhaustive-deps */
import FilterSVG from '@/components/elements/FilterSVG/FilterSVG'
import CatalogFilters from '@/components/modules/Catalog/CatalogFilters'
import CatalogItem from '@/components/modules/Catalog/CatalogItem'
import ManufacturersBlock from '@/components/modules/Catalog/ManufacturersBlock'
import SortSelect from '@/components/modules/Catalog/SortSelect'
import {
	$clothManufacturers,
	$clothParts,
	$clothSizeManufacturers,
	$filteredCloth,
	getBoilerPartsFx,
	setClothManufacturers,
	setClothParts,
	setSizeManufacturers,
	updateClothManufacturers,
	updateSizeManufacturers
} from '@/effector/clothParts'
import { usePopup } from '@/hooks/usePopap'
import styles from '@/styles/Catalog/index.module.scss'
import skeletonStyles from '@/styles/Skeleton/index.module.scss'
import { IQueryParams } from '@/types/Catalog.interface'
import { IClothPartsRows } from '@/types/ClotshParts.interface'
import { CheckQueryParams } from '@/utils/Catalog'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
	const cloth = useStore($clothParts)
	const clothManufacturers = useStore($clothManufacturers)
	const slothSize = useStore($clothSizeManufacturers)
	const filteredCloth = useStore($filteredCloth)

	const [spinner, setSpinner] = useState(false)
	const [priceRange, setPriceRange] = useState([1, 1000])
	const [isFilterInQuery, setIsFilterInQuery] = useState(false)
	const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)

	const { closePopup, open, toggleOpen } = usePopup()

	const pageCount = Math.ceil(cloth.count / 20)

	const isAnyClothManufacturerChecked = clothManufacturers.some(
		item => item.checked
	)
	const isAnySizeManufacturerChecked = slothSize.some(item => item.checked)
	const resetFilterBTNDisabled = !(
		isPriceRangeChanged ||
		isAnyClothManufacturerChecked ||
		isAnySizeManufacturerChecked
	)

	const isValidOffset =
		query.offset && !isNaN(+query.offset) && +query.offset > 0

	const [currentPage, setCurrentPager] = useState(
		isValidOffset ? +query.offset - 1 : 0
	)

	const router = useRouter()

	useEffect(() => {
		loadingBoilerParts()
	}, [filteredCloth, isFilterInQuery])

	const resetPagination = (data: IClothPartsRows) => {
		setCurrentPager(0)
		setClothParts(data)
	}
	const loadingBoilerParts = async () => {
		try {
			setSpinner(true)
			const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`)

			if (!isValidOffset) {
				router.replace({
					query: {
						offset: 1
					}
				})
				resetPagination(data)
				return
			}
			if (isValidOffset) {
				if (+query.offset > Math.ceil(data.count / 12)) {
					router.push(
						{
							query: {
								...query,
								offset: 1
							}
						},
						undefined,
						{ shallow: true }
					)
					setCurrentPager(0)
					setClothParts(isFilterInQuery ? filteredCloth : data)
				}
				const offset = +query.offset - 1
				const result = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${offset}`
				)
				setCurrentPager(offset)
				setClothParts(isFilterInQuery ? filteredCloth : result)
				return
			}
			setCurrentPager(0)
			setClothParts(isFilterInQuery ? filteredCloth : data)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	const handlePageChange = async ({ selected }: { selected: number }) => {
		try {
			const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`)

			if (selected > pageCount) {
				resetPagination(isFilterInQuery ? filteredCloth : data)
				return
			}
			if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
				resetPagination(isFilterInQuery ? filteredCloth : data)
				return
			}
			const { isValidClothQuery, isValidSizeQuery, isValidPriceQuery } =
				CheckQueryParams(router)
			const result = await getBoilerPartsFx(
				`/boiler-parts?limit=20&offset=${selected}${
					isFilterInQuery && isValidClothQuery
						? `&cloth=${router.query.cloth}`
						: ''
				}${
					isFilterInQuery && isValidSizeQuery
						? `&size=${router.query.size}`
						: ''
				}${
					isFilterInQuery && isValidPriceQuery
						? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
						: ''
				}`
			)
			router.push(
				{
					query: {
						...router.query,
						offset: selected + 1
					}
				},
				undefined,
				{ shallow: true }
			)
			setCurrentPager(selected)
			setClothParts(result)
			window.scrollTo(0, 200)
		} catch (error) {
		} finally {
			setTimeout(() => setSpinner(false), 500)
		}
	}

	const resetFilter = async () => {
		try {
			const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`)
			const params = router.query
			delete params.cloth
			delete params.size
			delete params.priceFrom
			delete params.priceTo
			params.first = 'cheap'

			router.push({ query: { ...params } }, undefined, { shallow: true })
			setClothManufacturers(
				clothManufacturers.map(item => ({ ...item, checked: false }))
			),
				setSizeManufacturers(
					slothSize.map(item => ({ ...item, checked: false }))
				)
			setClothParts(data)
			setPriceRange([0, 10000])
			setIsPriceRangeChanged(false)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setTimeout(() => setSpinner(false), 400)
		}
	}

	return (
		<div className={styles.catalog}>
			<div className={`container ${styles.catalog__container}`}>
				<h2 className={styles.catalog__title}>Каталог товаров</h2>
				<div className={styles.catalog__top}>
					<AnimatePresence>
						{isAnyClothManufacturerChecked && (
							<ManufacturersBlock
								title={'Размеры'}
								event={updateClothManufacturers}
								manufacturerList={clothManufacturers}
							/>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{isAnySizeManufacturerChecked && (
							<ManufacturersBlock
								title={'Категории'}
								event={updateSizeManufacturers}
								manufacturerList={slothSize}
							/>
						)}
					</AnimatePresence>
					<div className={styles.catalog__top__inner}>
						<button
							className={styles.catalog__top__reset}
							disabled={resetFilterBTNDisabled}
							onClick={resetFilter}
						>
							Сбросить фильтры
						</button>
						<button
							className={styles.catalog__top__mobile_btn}
							onClick={toggleOpen}
						>
							<span className={styles.catalog__top__mobile_btn__svg}>
								<FilterSVG />
							</span>
							<span  className={styles.catalog__top__mobile_btn__text}>Фильтры</span>
						</button>
						<SortSelect setSpinner={setSpinner} />
					</div>
				</div>
				<div className={styles.catalog__bottom}>
					<div className={styles.catalog__bottom__inner}>
						<CatalogFilters
							priceRange={priceRange}
							setPriceRange={setPriceRange}
							setIsPriceRangeChanged={setIsPriceRangeChanged}
							resetFilterBTNDisabled={resetFilterBTNDisabled}
							currentPage={currentPage}
							resetFilter={resetFilter}
							isPriceRangeChanged={isPriceRangeChanged}
							setIsFilterInQuery={setIsFilterInQuery}
							closePopup={closePopup}
							filtersMobileOpen={open}
						/>
						{spinner ? (
							<ul className={skeletonStyles.skeleton}>
								{Array.from(new Array(20)).map((_, i) => (
									<li key={i} className={skeletonStyles.skeleton__item}>
										<div className={skeletonStyles.skeleton__item__light} />
									</li>
								))}
							</ul>
						) : (
							<ul className={styles.catalog__list}>
								{cloth.rows ? (
									cloth.rows?.map(item => (
										<CatalogItem item={item} key={item.id} />
									))
								) : (
									<span>список товаров пуст</span>
								)}
							</ul>
						)}
					</div>
					<ReactPaginate
						containerClassName={styles.catalog__bottom__list}
						pageClassName={styles.catalog__bottom__list__item}
						pageLinkClassName={styles.catalog__bottom__list__item__link}
						previousClassName={styles.catalog__bottom__list__prev}
						nextClassName={styles.catalog__bottom__list__next}
						breakLabel='...'
						breakClassName={styles.catalog__bottom__list__break}
						breakLinkClassName={styles.catalog__bottom__list__break__link}
						pageCount={pageCount}
						forcePage={currentPage}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	)
}

export default CatalogPage
