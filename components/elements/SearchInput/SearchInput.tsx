import { SelectOptionType } from '@/types/Common.interface'
import React from 'react'
import Select from 'react-select'
import {
	controlStyle,
	inputStyles,
	menuStyles,
	optionStyles
} from '../../../styles/SearchInput/index'
const SearchInput = () => {
	const [searchOption, setSearchOption] = React.useState<SelectOptionType>(null)
	const handleSearchoptionChange = (selectOption: SelectOptionType) => {
		setSearchOption(selectOption)
	}
	return (
		<Select
			placeholder='Поиск...'
			value={searchOption}
			onChange={handleSearchoptionChange}
			styles={{
				...inputStyles,
				control: defaultStyles => ({
					...controlStyle(defaultStyles)
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
			isClearable={true}
			openMenuOnClick={false}
			options={[1, 5, 6, 7, 8, 123, 231, 3, 4, 5, 6, 7, 8, 9].map(item => ({
				value: item,
				label: item
			}))}
		/>
	)
}

export default SearchInput
