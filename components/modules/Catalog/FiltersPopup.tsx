import styles from '@/styles/Catalog/index.module.scss'
import { IFiltersPopupProp } from '@/types/Catalog.interface'
import FilterManufacturerAccordion from './FilterManufacturerAccordion'
import FiltersPopupTop from './FiltersPopupTop'

const FiltersPopup = ({
	resetFilterBTNDisabled,
	resetAllManufacturers,
	handleClosePopup,
	updateManufacturer,
	setManufacturer,
	title,
	openPopup,
	applyFilters,
	manufacturerList
}: IFiltersPopupProp) => {
	return (
		<div className={`${styles.filters__popup} ${openPopup ? styles.open : ''}`}>
			<div className={styles.filters__popup__inner}>
				<FiltersPopupTop
					resetBTNTest='Сбросить'
					title={title as string}
					resetFilterBTNDisabled={resetFilterBTNDisabled}
					resetFilter={resetAllManufacturers}
					closePopup={handleClosePopup}
				/>
				<FilterManufacturerAccordion
					manufacturerList={manufacturerList}
					title={false}
					updateManufacturer={updateManufacturer}
					setManufacturer={setManufacturer}
				/>
			</div>
			<div className={styles.filters__actions}>
				<button
					className={styles.filters__actions__show}
					disabled={resetFilterBTNDisabled}
					onClick={applyFilters}
					style={{ marginBottom: 12 }}
				>
					Показать
				</button>
				<button
					className={styles.filters__actions__reset}
					onClick={handleClosePopup}
				>
					Сбросить
				</button>
			</div>
		</div>
	)
}

export default FiltersPopup
