import React from 'react'

const Button = (props) => {
  const { onClick, children, label, ...extra } = props

  const handleClick = (e) => {
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
