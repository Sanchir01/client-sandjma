import { IOption } from '@/types/Common.interface'
import {
	CSSObjectWithLabel,
	GroupBase,
	OptionProps,
	StylesConfig
} from 'react-select'

export const controlStyle = (defaultStyles: CSSObjectWithLabel) => ({
	...defaultStyles,
	cursor: 'pointer',
	border: '1px solid #9e9e9e',
	height: '40px',
	boxShadow: 'none',
	borderRadius: '4px',
	$hover: {
		borderColor: '#9e9e9e9'
	},
	borderRight: 'none',
	borderTopRightRadius: 0,
	borderBottomRightRadius: 0
})

export const optionStyles = (
	defaultStyles: CSSObjectWithLabel,
	state: OptionProps<IOption, boolean, GroupBase<IOption>>
) => {
	const backgroundHoverForLightMode = state.isSelected
		? state.isSelected
			? '#9e9e9e'
			: '#f2f2f2'
		: state.isSelected
		? '#f2f2f2'
		: '#9e9e9e'
	return {
		...defaultStyles,
		cursor: 'pointer',
      padding:'6px 12px',
      margin: 0,

	}
}

export const menuStyles = (defaultStyles: CSSObjectWithLabel) => ({
	...defaultStyles,
	height: 'auto',
	boxShadow: '0 4px 20px rgba(0, 0, 0, / 7%)',
	borderRadius: '4px',
	backgroundColor: '#f2f2f2',
	minHeight: 30,
	overflow: 'hidden',
	width: 'calc(100% + 40px)'
})

export const inputStyles: StylesConfig<IOption, boolean, GroupBase<IOption>> = {
	indicatorSeparator: () => ({
		border: 'none'
	}),
	dropdownIndicator: () => ({
		display: 'none'
	}),
	menuList: (defaultStyles) => ({
      ...defaultStyles,
      padding:0,
      paddingBottom:0,
      minHeight:30,
      '&::-webkit-scrollbar': {
         width: '8px',
       },
       '&::-webkit-scrollbar-track': {
         background: 'transparent',
       },
       '&::-webkit-scrollbar-thumb': {
         background: '#454545',
         borderRadius: '3px',
       },
       '&::-webkit-scrollbar-thumb:hover': {
         background: 'grey',
       }
   }),
	placeholder: defaultStyles => ({
		...defaultStyles,
		color: '#b9babb'
	})
}
