/* eslint-disable react-hooks/exhaustive-deps */
import {
	$clothParts,
	setClothPartsByPopularity,
	setClothPartsCheapFirst,
	setClothPartsExpensiveFirst
} from '@/effector/clothParts'
import {
	controlStyles,
	menuStyles,
	selectStyles
} from '@/styles/Catalog/select'
import { optionStyles } from '@/styles/SearchInput'
import { IOption, SelectOptionType } from '@/types/Common.interface'
import { createSelectOption } from '@/utils/common'
import { categoryOption } from '@/utils/selectContents'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Select from 'react-select'

const SortSelect = ({ setSpinner }: { setSpinner: (arg: boolean) => void }) => {
	const [sortOption, setSortOption] = React.useState<SelectOptionType>(null)
	const cloth = useStore($clothParts)
	const router = useRouter()

	const updateRoteParam = (first: string) =>
		router.push(
			{
				query: {
					...router.query,
					first
				}
			},
			undefined,
			{ shallow: true }
		)

	useEffect(() => {
		if (cloth.rows) {
			switch (router.query.first) {
				case 'cheap':
					updateCategoryOption('Сначала дешевые')
					setClothPartsCheapFirst()
					break
				case 'expensive':
					updateCategoryOption('Сначала дорогие')
					setClothPartsExpensiveFirst()

					break
				case 'popular':
					updateCategoryOption('По популярности')
					setClothPartsByPopularity()

					break
				default:
					updateCategoryOption('Сначала дешевые')
					setClothPartsCheapFirst()
					break
			}
		}
	}, [])
	const updateCategoryOption = (value: string) =>
		setSortOption({ value, label: value })

	const handleSortOptionChange = (selectOption: SelectOptionType) => {
		setSpinner(true)
		setSortOption(selectOption)

		switch ((selectOption as IOption).value) {
			case 'Сначала дешевые':
				setClothPartsCheapFirst()
				updateRoteParam('cheap')
				break
			case 'Сначала дорогие':
				setClothPartsExpensiveFirst()
				updateRoteParam('expensive')
				break
			case 'По популярности':
				setClothPartsByPopularity()
				updateRoteParam('popular')
				break
		}
		setTimeout(() => setSpinner(false), 400)
	}
	return (
		<Select
			placeholder='Поиск...'
			value={sortOption || createSelectOption('Сначала дешевые')}
			onChange={handleSortOptionChange}
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
