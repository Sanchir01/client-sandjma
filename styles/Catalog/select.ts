
import { IOption } from '@/types/Common.interface'
import {
  StylesConfig,
  GroupBase,
  CSSObjectWithLabel,
} from 'react-select'


export const controlStyles = (
  defaultStyles: CSSObjectWithLabel,
) => ({
  ...defaultStyles,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: '1px solid #D5D5D5',
  width: '241px',
  height: '40px',
  boxShadow: 'none',
  borderRadius: '4px',
  '&:hover': {
    borderColor: '#9E9E9E',
  },
  '@media (max-width: 820px)': {
    width: '200px',
  },
  '@media (max-width: 560px)': {
    width: '177px',
  },
})

export const menuStyles = (
  defaultStyles: CSSObjectWithLabel,
) => ({
  ...defaultStyles,
  boxShadow: '0 4px 20px rgb(0 0 0 / 7%)',
  borderRadius: '4px',
  height: 'auto',
  overflow: 'hidden',
  backgroundColor: '#f2f2f2f2',
})

export const selectStyles: StylesConfig<IOption, boolean, GroupBase<IOption>> = {
  indicatorSeparator: () => ({
    border: 'none',
  }),
  dropdownIndicator: (defaultStyles, state) => ({
    ...defaultStyles,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
    color: '#1C629E',
  }),
  menuList: (defaultStyles) => ({
    ...defaultStyles,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#b9babb',
  }),
}