import {
	controlStyles,
	menuStyles,
	selectStyles
} from '@/styles/Catalog/select'
import { optionStyles } from '@/styles/SearchInput'
import { SelectOptionType } from '@/types/Common.interface'
import { createSelectOption } from '@/utils/common'
import { categoryOption } from '@/utils/selectContents'
import React from 'react'
import Select from 'react-select'

const SortSelect = () => {
	const [sortOption, setSortOption] = React.useState<SelectOptionType>(null)
	const handleSearchoptionChange = (selectOption: SelectOptionType) => {
		setSortOption(selectOption)
	}
	return (
		<Select
			placeholder='Поиск...'
			value={sortOption || createSelectOption('Сначала дешевые')}
			onChange={handleSearchoptionChange}
			styles={{
				...selectStyles,
				control: defaultStyles => ({
					...controlStyles(defaultStyles)
				}),
				input: defaultStyles => ({
					...defaultStyles
				}),
				menu: defaultStyles => ({
					...menuStyles(defaultStyles)
				}),
				option: (defaultStyles, state) => ({
					...optionStyles(defaultStyles, state)
				})
			}}
			isSearchable={false}
			options={categoryOption}
		/>
	)
}

export default SortSelect
