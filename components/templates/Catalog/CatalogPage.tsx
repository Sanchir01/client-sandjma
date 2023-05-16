import CatalogItem from '@/components/modules/Catalog/CatalogItem'
import ManufacturersBlock from '@/components/modules/Catalog/ManufacturersBlock'
import SortSelect from '@/components/modules/Catalog/SortSelect'
import {
	$clothParts,
	getBoilerPartsFx,
	setClothParts
} from '@/effector/clothParts'
import styles from '@/styles/Catalog/index.module.scss'
import skeletonStyles from '@/styles/Skeleton/index.module.scss'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const CatalogPage: NextPage = () => {
	const cloth = useStore($clothParts)
	const [spinner, setSpinner] = useState(false)
	console.log(cloth)
	useEffect(() => {
		loadingBoilerParts()
	}, [])

	const loadingBoilerParts = async () => {
		try {
			setSpinner(true)
			const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`)
			setClothParts(data)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}
	

	return (
		<div className={styles.catalog}>
			<div className={`container ${styles.catalog__container}`}>
				<h2 className={styles.catalog__title}>Каталог товаров</h2>
				<div className={styles.catalog__top}>
					<AnimatePresence>
						{false &&<ManufacturersBlock title={'Размеры'} />}
					</AnimatePresence>
					<AnimatePresence>
					{false &&	<ManufacturersBlock title={'Категории'} />}
					</AnimatePresence>
					<div className={styles.catalog__top__inner}>
						<button className={styles.catalog__top__reset} disabled={true}>Сбросить фильтры</button>
						<SortSelect />
					</div>
				</div>
				<div className={styles.catalog__bottom}>
					<div className={styles.catalog__bottom__inner}>
						<div className=''>Filters</div>
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
									cloth.rows?.map(item => <CatalogItem item={item} key={item.id}/>)
								) : (
									<span>список товаров пуст</span>
								)}
							</ul>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CatalogPage
