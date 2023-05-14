import Link from 'next/link'
import { FC } from 'react'
import styles from '../../../styles/BGImage/index.module.scss'

const BGImage: FC = () => {
	return (
		<div className={styles.app}>
			<div className={styles.root}>
				<div className={styles.content}>
					<Link href={`/catalog`} className={styles.root}>
						<h2>Новая коллекция</h2>
					</Link>
					<Link href={`/catalog`}>
						<p>Смотеть новинки</p>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default BGImage
