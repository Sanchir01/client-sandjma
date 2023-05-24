import Accordion from '@/components/elements/Accordion/Accordion'
import {
	$clothManufacturers,
	$clothSizeManufacturers,
	setClothManufacturers,
	setSizeManufacturers,
	updateClothManufacturers,
	updateSizeManufacturers
} from '@/effector/clothParts'
import styles from '@/styles/Catalog/index.module.scss'
import spinnerStyles from '@/styles/Spinner/index.module.scss'
import { ICatalogFilterMobile } from '@/types/Catalog.interface'
import { useStore } from 'effector-react'
import { useState } from 'react'
import FiltersPopup from './FiltersPopup'
import FiltersPopupTop from './FiltersPopupTop'
import PriceRange from './PriceRange'
import { useMediaQuery } from '@/hooks/useMediaquery'

const CatalogFiltersMobile = ({
	spinner,
	resetFilter,
	resetFilterBTNDisabled,
	closePopup,
	priceRange,
	setIsPriceRangeChanged,
	applyFilters,
	filtersMobileOpen,
	setPriceRange
}: ICatalogFilterMobile) => {
	const applyFiltersAndClosePopup = () => {
		closePopup()
		applyFilters()
	}
	const clothManufacturers = useStore($clothManufacturers)
	const slothSize = useStore($clothSizeManufacturers)

	const [openCloth, setOpenCloth] = useState(true)
	const [openSize, setOpenSize] = useState(false)

	const handleOpenCloth = () => {
		setOpenCloth(true)
	}
	const handleCloseCloth = () => {
		setOpenCloth(false)
	}

	const handleOpenSize = () => {
		setOpenSize(true)
	}
	const handleCloseSize = () => {
		setOpenSize(false)
	}

	const resetAllClothManufacturers = () =>
		setClothManufacturers(
			clothManufacturers.map(item => ({ ...item, checked: false }))
		)

	const resetAllSizeManufacturers = () =>
		setSizeManufacturers(slothSize.map(item => ({ ...item, checked: false })))

	const isAnyClothManufacturerChecked = clothManufacturers.some(
		item => item.checked
	)
	const isMobile = useMediaQuery(820)
	const isAnySizeManufacturerChecked = slothSize.some(item => item.checked)
	return (
		<div
			className={`${styles.catalog__bottom__filters} ${
				filtersMobileOpen ? styles.open : ''
			}`}
		>
			<div className={styles.catalog__bottom__filters__inner}>
				<FiltersPopupTop
					resetBTNTest='сбросить все'
					title={'фильтры'}
					resetFilter={resetFilter}
					resetFilterBTNDisabled={resetFilterBTNDisabled}
					closePopup={closePopup}
				/>
				<div className={styles.filters__boiler_manufacturers}>
					<button
						className={styles.filters__manufacturer__btn}
						onClick={() => handleOpenCloth()}
					>
						Категории
					</button>
					<FiltersPopup
						title='Категории'
						resetFilterBTNDisabled={!isAnyClothManufacturerChecked}
						updateManufacturer={updateClothManufacturers}
						setManufacturer={setClothManufacturers}
						applyFilters={applyFiltersAndClosePopup}
						manufacturerList={clothManufacturers}
						resetAllManufacturers={resetAllClothManufacturers}
						handleClosePopup={handleCloseCloth}
						openPopup={openCloth}
					/>
				</div>
				<div className={styles.filters__boiler_manufacturers}>
					<button
						className={styles.filters__manufacturer__btn}
						onClick={() => handleOpenSize()}
					>
						Размеры
					</button>
					<FiltersPopup
						title='Размеры'
						resetFilterBTNDisabled={!isAnySizeManufacturerChecked}
						updateManufacturer={updateSizeManufacturers}
						setManufacturer={setSizeManufacturers}
						applyFilters={applyFiltersAndClosePopup}
						manufacturerList={slothSize}
						resetAllManufacturers={resetAllSizeManufacturers}
						handleClosePopup={handleCloseSize}
						openPopup={openSize}
					/>
				</div>
				<div className={styles.filters__price}>
					<Accordion
						title={'Цена'}
						titleClass={styles.filters__manufacturer__btn}
						hideArrowClass={styles.hide_arrow}
						isMobileForFilters={isMobile}
					>
						<div className={styles.filters__manufacturer__inner}>
							<PriceRange
								priceRange={priceRange}
								setPriceRange={setPriceRange}
								setIsPriceRangeChanged={setIsPriceRangeChanged}
								resetFilterBTNDisabled={false}
								resetFilter={resetFilter}
							/>
						</div>
					</Accordion>
				</div>
			</div>
			<div className={styles.filters__actions}>
				<button onClick={applyFiltersAndClosePopup}>
					{spinner ? <span className={spinnerStyles.spinner} /> : 'Показать'}
				</button>
			</div>
		</div>
	)
}

export default CatalogFiltersMobile
