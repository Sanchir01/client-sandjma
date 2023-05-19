import DeleteSVG from '@/components/elements/DeleteSVG/DeleteSVG'
import styles from '@/styles/Catalog/index.module.scss'
import {
	ICheckboxItem,
	IManufacturersBlockItemProps
} from '@/types/Catalog.interface'
import { motion } from 'framer-motion'
import { FC } from 'react'
const ManufacturersBlockItem: FC<IManufacturersBlockItemProps> = ({
	event,
	item
}) => {
	const removeFilter = () =>
		event({ checked: !item.checked, id: item.id } as ICheckboxItem)
	return (
		<motion.li
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
			className={styles.manufacturers__list__item}
		>
			<span className={styles.manufacturers__list__item__text}>
				{item.title}
			</span>
			<button className={styles.manufacturers__list__item__btn} onClick={removeFilter}>
				<span>
					<DeleteSVG />
				</span>
			</button>
		</motion.li>
	)
}

export default ManufacturersBlockItem
