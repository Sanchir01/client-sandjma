import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { Dashboard } from '@/service/Dashboard.service'
import styles from '@/styles/Dashboard/index.module.scss'
import { IClothPartsRows } from '@/types/ClotshParts.interface'
import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useState } from 'react'

const DashboardPage: NextPage = () => {
	const { data, isSuccess, isError } = useQuery<IClothPartsRows>({
		queryFn: () => Dashboard.getNew(),
		queryKey: ['DashboardNew']
	})
	const bestsellers = useQuery<IClothPartsRows>({
		queryFn: () => Dashboard.getBestsellers(),
		queryKey: ['DashboardBestsellers']
	})
	const [spinner, setSpinner] = useState(false)

	return (
		<section className={styles.dashboard}>
			<div className={`container ${styles.dashboard__container}`}>
				<h2 className={styles.dashboard__title}>Одежда магазиан - Sandjma</h2>
				<div className={styles.dashboard_parts}>
					<h3 className={`${styles.dashboard__parts__title}`}>хиты продаж</h3>
					{isSuccess ? (
						<DashboardSlider
							items={bestsellers.data?.rows || []}
							spinner={spinner}
						/>
					) : (
						<div>список пуст</div>
					)}
				</div>
				<div className={styles.dashboard_parts}>
					<h3 className={`${styles.dashboard__parts__title}`}>Новинки</h3>
					{isSuccess ? (
						<DashboardSlider items={data.rows || []} spinner={spinner} />
					) : (
						<div>список пуст</div>
					)}
				</div>
				<div className={styles.about}>
					<h3
						className={`${styles.title__sand} ${styles.dashboard__parts__title}`}
					>
						Стильная одежда Sandjma
					</h3>
					<ul className={styles.about__text}>
						<li className='text-1.5xl '>
							Добро пожаловать в Sandjma – магазин стильной и комфортной одежды
							для всех, кто ценит качество и удобство. У нас вы найдете одежду
							на любой вкус и для любого случая: от повседневных нарядов до
							деловых костюмов и спортивной экипировки.
						</li>
						<li className='text-1.5xl'>
							В Sandjma мы предлагаем не только модные и актуальные коллекции,
							но и гарантируем высокое качество материалов и прочность каждой
							вещи. Мы следим за последними тенденциями и предлагаем только
							лучшие товары
						</li>
						<li className='text-1.5xl'>
							Наша команда заботится о каждом клиенте и всегда готова помочь в
							выборе наилучшего варианта для вас. Мы стремимся сделать ваше
							шопинг-путешествие максимально приятным и удобным. У нас вы
							найдете все необходимое для создания полного образа: от одежды до
							<br />
							<p>
								Заходите к нам в гости и позвольте нам помочь вам выглядеть на
								высшем уровне!
							</p>
						</li>
					</ul>
				</div>
			</div>
		</section>
	)
}

export default DashboardPage
