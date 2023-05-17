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
import { ICatalogFilterDesktopProps } from '@/types/Catalog.interface'
import { useStore } from 'effector-react'
import FilterManufacturerAccordion from './FilterManufacturerAccordion'
import PriceRange from './PriceRange'

const CatalogFiltersDesktop = ({
	setIsPriceRangeChanged,
	priceRange,
	setPriceRange,
	resetFilterBTNDisabled,
	spinner
}: ICatalogFilterDesktopProps) => {
	const clothManufacturers = useStore($clothManufacturers)
	const slothSize = useStore($clothSizeManufacturers)

	return (
		<div className={styles.catalog__bottom__filters}>
			<h3 className={styles.catalog__bottom__filters__title}>фильтры</h3>
			<div className={styles.filters__boiler__manufacturers}>
				<FilterManufacturerAccordion
					manufacturerList={clothManufacturers}
					title={'Категории'}
					updateManufacturer={updateClothManufacturers}
					setManufacturer={setClothManufacturers}
				/>
			</div>
			<div className={styles.filter__price}>
				<Accordion
					title={'Цена'}
					titleClass={styles.filter__manufacturer__btn}
					arrowOpenClass={styles.open}
				>
					<div className={styles.filter__manufacturer__inner}>
						<PriceRange
							priceRange={priceRange}
							setPriceRange={setPriceRange}
							setIsPriceRangeChanged={setIsPriceRangeChanged}
						/>
					</div>
				</Accordion>
			</div>
			<div className={styles.filters__boiler__manufacturers}>
				<FilterManufacturerAccordion
					manufacturerList={slothSize}
					title={'Размеры'}
					updateManufacturer={updateSizeManufacturers}
					setManufacturer={setSizeManufacturers}
				/>
			</div>
			<div className={styles.filters__actions}>
				<button
					className={styles.filter__actions__show}
					disabled={spinner || resetFilterBTNDisabled}
				>
					{spinner ? (
						<span
							className={spinnerStyles.spinner}
							style={{ top: 6, left: '47%' }}
						/>
					) : (
						<span>Показать</span>
					)}
				</button>
				<button
					className={styles.filters__actions__reset}
					disabled={resetFilterBTNDisabled}
				>
					Сбросить
				</button>
			</div>
		</div>
	)
}

export default CatalogFiltersDesktop
