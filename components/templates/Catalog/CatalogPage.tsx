/* eslint-disable react-hooks/exhaustive-deps */
import CatalogFilters from '@/components/modules/Catalog/CatalogFilters'
import CatalogItem from '@/components/modules/Catalog/CatalogItem'
import ManufacturersBlock from '@/components/modules/Catalog/ManufacturersBlock'
import SortSelect from '@/components/modules/Catalog/SortSelect'
import {
	$clothManufacturers,
	$clothParts,
	$clothSizeManufacturers,
	getBoilerPartsFx,
	setClothParts
} from '@/effector/clothParts'
import styles from '@/styles/Catalog/index.module.scss'
import skeletonStyles from '@/styles/Skeleton/index.module.scss'
import { IQueryParams } from '@/types/Catalog.interface'
import { IClothPartsRows } from '@/types/ClotshParts.interface'
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

	const [spinner, setSpinner] = useState(false)
	const [priceRange, setPriceRange] = useState([1, 1000])
	const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)

	const pageCount = Math.ceil(cloth.count / 20)

	const isAnyClothManufacturerChecked = clothManufacturers.some(
		item => item.checked
	)
	const isAnySizeManufacturerChecked = slothSize.some(item => item.checked)
	const resetFilterBTNDisabled =
		!isPriceRangeChanged ||
		isAnyClothManufacturerChecked ||
		isAnySizeManufacturerChecked

	const isValidOffset =
		query.offset && !isNaN(+query.offset) && +query.offset > 0

	const [currentPage, setCurrentPager] = useState(
		isValidOffset ? +query.offset - 1 : 0
	)

	const router = useRouter()

	useEffect(() => {
		loadingBoilerParts()
	}, [])

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
					setClothParts(data)
					return
				}
			}

			const offset = +query.offset - 1
			const result = await getBoilerPartsFx(
				`/boiler-parts?limit=12&offset=${offset}`
			)
			setCurrentPager(offset)
			setClothParts(result)
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
				resetPagination(data)
				return
			}
			if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
				resetPagination(data)
				return
			}
			const result = await getBoilerPartsFx(
				`/boiler-parts?limit=20&offset=${selected}`
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
		} catch (error) {}
	}
	console.log(cloth.rows, query.offset, cloth.count)
	return (
		<div className={styles.catalog}>
			<div className={`container ${styles.catalog__container}`}>
				<h2 className={styles.catalog__title}>Каталог товаров</h2>
				<div className={styles.catalog__top}>
					<AnimatePresence>
						{false && <ManufacturersBlock title={'Размеры'} />}
					</AnimatePresence>
					<AnimatePresence>
						{false && <ManufacturersBlock title={'Категории'} />}
					</AnimatePresence>
					<div className={styles.catalog__top__inner}>
						<button
							className={styles.catalog__top__reset}
							disabled={resetFilterBTNDisabled}
						>
							Сбросить фильтры
						</button>
						<SortSelect />
					</div>
				</div>
				<div className={styles.catalog__bottom}>
					<div className={styles.catalog__bottom__inner}>
						<CatalogFilters
							priceRange={priceRange}
							setPriceRange={setPriceRange}
							setIsPriceRangeChanged={setIsPriceRangeChanged}
							resetFilterBTNDisabled={resetFilterBTNDisabled}
							spinner={spinner}
						/>
						{spinner ? (
							<ul className={skeletonStyles.skeleton}>
								{Array.from(new Array(8)).map((_, i) => (
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
