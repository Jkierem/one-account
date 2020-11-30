import React, { useState } from 'react'
import type { InputEvent } from '../../core/types'

interface InputProps {
  defaultValue: string;
  onChange: (value: string) => void;
  [x: string]: any;
}

const Input: React.FC<InputProps> = (props) => {
  const { onChange, defaultValue, ...extra } = props
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    e.preventDefault()
    setValue(target.value)
    onChange?.(target.value)
  }

  return <input value={value} onChange={handleChange} {...extra} />
}

export default Input
