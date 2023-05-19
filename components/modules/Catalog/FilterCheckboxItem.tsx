import styles from '@/styles/Catalog/index.module.scss'
import { ICheckboxItem } from '@/types/Catalog.interface'

const FilterCheckboxItem = ({ title, id, checked,event }: ICheckboxItem) => {
   const handleFilter =() =>event({checked:!checked,id} as ICheckboxItem)
	return (
		<li className={styles.filters__manufacturer__list__item}>
			<label>
            <input type="checkbox"  checked={checked} onChange={handleFilter}/>
				<span>{title}</span>
			</label>
		</li>
	)
}

export default FilterCheckboxItem
