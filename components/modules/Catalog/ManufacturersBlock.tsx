import { motion } from 'framer-motion'
import { FC } from 'react'
import styles from '@/styles/Catalog/index.module.scss'
import { IManufacturersBlock } from '@/types/Catalog.interface'
const ManufacturersBlock: FC<IManufacturersBlock> = ({title}) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
         className={styles.manufacturers__list__item}
		>
         <h3 className={styles.manufacturers__title}>{title}</h3>
         <ul className={styles.manufacturers__list}>
            {
               [].map(item =>
                  <li key={item}>{item}</li>)
            }
         </ul>
      </motion.div>
	)
}

export default ManufacturersBlock
