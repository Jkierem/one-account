import React, { useState } from 'react'

/**
 * @typedef {{
 *  defaultValue?: string;
 *  onChange: (value: string) => void;
 *  [x: string]: any;
 * }} InputProps
 * @param {InputProps} props 
 */
const Input = (props) => {
  const { onChange, defaultValue, ...extra } = props
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e) => {
    const target = e.target;
    e.preventDefault()
    setValue(target.value)
    onChange?.(target.value)
  }

  return <input value={value} onChange={handleChange} {...extra} />
}

export default Input
