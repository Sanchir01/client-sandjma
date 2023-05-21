import Accordion from '@/components/elements/Accordion/Accordion'
import {
	$clothManufacturers,
	$clothSizeManufacturers
} from '@/effector/clothParts'
import { useMediaQuery } from '@/hooks/useMediaquery'
import styles from '@/styles/Catalog/index.module.scss'
import { IFilterManufacturerAccordionProps } from '@/types/Catalog.interface'
import { useStore } from 'effector-react'
import FilterCheckboxItem from './FilterCheckboxItem'

const FilterManufacturerAccordion = ({
	manufacturerList,
	updateManufacturer,
	title,
	setManufacturer
}: IFilterManufacturerAccordionProps) => {
	const clothManufacturers = useStore($clothManufacturers)
	const slothSize = useStore($clothSizeManufacturers)
	const isMobile = useMediaQuery(820)
	const chooseAllManufacturers = () =>
		setManufacturer(manufacturerList.map(item => ({ ...item, checked: true })))

	return (
		<Accordion
			title={title}
			titleClass={styles.filters__manufacturer__btn}
			arrowOpenClass={styles.open}
			isMobileForFilters={isMobile}
			hideArrowClass={isMobile ? styles.hide_arrow : ''}
		>
			<div className={styles.filters__manufacturer__inner}>
				<button
					className={styles.filters__manufacturer__select_all}
					onClick={chooseAllManufacturers}
				>
					Выбрать все
				</button>
				<ul className={styles.filters__manufacturer__list}>
					{manufacturerList.map(item => (
						<FilterCheckboxItem
							id={item.id}
							title={item.title}
							key={item.id}
							checked={item.checked}
							event={updateManufacturer}
						/>
					))}
				</ul>
				<div style={{ height: 24 }} />
			</div>
		</Accordion>
	)
}

export default FilterManufacturerAccordion
