import React from 'react'
import { ButtonEvent } from '../../core/types'

interface ButtonProps {
  label?: string;
  onClick?: (props: ButtonProps, e: ButtonEvent) => void;
  [x: string]: any;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, children, label, ...extra } = props

  const handleClick = (e: ButtonEvent) => {
    e.preventDefault()
    onClick?.(props, e)
  }

  return (
    <button onClick={handleClick} {...extra}>
      {label || children}
    </button>
  )
}

export default Button
