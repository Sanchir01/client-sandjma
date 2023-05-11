import { FC } from 'react'

import styles from '../../../styles/CityButton/index.module.scss'
import LocationSVG from '../LocationSVG/LocationSVG'

const CityButton: FC = () => {
	return (
		<button className={styles.city}>
			<span className={styles.city__span}>
				<LocationSVG />
			</span>
			<span className={styles.city__text}>Moscow</span>
		</button>
	)
}

export default CityButton
