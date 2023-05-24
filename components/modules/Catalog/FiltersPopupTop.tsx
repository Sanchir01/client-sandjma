import styles from '@/styles/Catalog/index.module.scss'
import { IFiltersPopupTop } from '@/types/Catalog.interface'

const CatalogFiltersMobile = ({
	title,
	resetBTNTest,
	resetFilter,
	resetFilterBTNDisabled,
	closePopup
}: IFiltersPopupTop) => {
	return (
		<div className={styles.catalog__bottom__filters__top}>
			<button
				className={styles.catalog__bottom__filters__title}
				onClick={closePopup}
			>
				{title}
			</button>
			<button
				className={styles.catalog__bottom__filters__reset}
				onClick={resetFilter}
				disabled={resetFilterBTNDisabled}
			>
				{resetBTNTest}
			</button>
		</div>
	)
}

export default CatalogFiltersMobile
