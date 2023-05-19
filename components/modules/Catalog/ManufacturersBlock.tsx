import styles from '@/styles/Catalog/index.module.scss'
import { IManufacturersBlock } from '@/types/Catalog.interface'
import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import ManufacturersBlockItem from './ManufacturersBlockItem'
const ManufacturersBlock: FC<IManufacturersBlock> = ({
	title,
	event,
	manufacturerList
}) => {
	const checkedItems = manufacturerList.filter(item => item.checked === true)
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
			className={styles.manufacturers__list__item}
		>
			<h3 className={styles.manufacturers__title}>{title}</h3>
			<ul className={styles.manufacturers__list}>
				<AnimatePresence>
					{checkedItems.map(item => (
						<ManufacturersBlockItem key={item.id} item={item} event={event} />
					))}
				</AnimatePresence>
			</ul>
		</motion.div>
	)
}

export default ManufacturersBlock
