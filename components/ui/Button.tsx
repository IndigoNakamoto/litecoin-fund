'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  moveOnHover?: boolean
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  icon,
  iconPosition = 'left',
  moveOnHover = true,
  ...props
}) => {
  const baseStyles =
    'cursor-pointer rounded-3xl! text-center text-[14px] font-medium transition transform duration-200 ease-in-out flex items-center justify-center'

  let variantStyles = ''
  switch (variant) {
    case 'secondary':
      variantStyles =
        'bg-transparent border border-black tracking-wide !text-black'
      break
    case 'primary':
    default:
      variantStyles = 'bg-[#222222] border border-[#222222] !text-white'
      break
  }

  const hoverMoveStyle = moveOnHover ? 'hover:-translate-y-[5px]' : ''
  variantStyles += ` ${hoverMoveStyle}`

  const disabledStyles = props.disabled
    ? 'opacity-50 cursor-not-allowed hover:-translate-y-0'
    : ''

  const renderIcon = () => {
    if (!icon) return null
    // Apply text color based on variant - icons should match button text color
    const iconColor = variant === 'primary' ? '#ffffff' : '#000000'
    return (
      <span
        className={`${
          iconPosition === 'left' ? 'mr-2' : 'ml-2'
        } flex items-center [&_svg]:fill-current`}
        style={{ color: iconColor }}
      >
        {icon}
      </span>
    )
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
      style={{
        color: variant === 'primary' ? '#ffffff' : '#000000',
      }}
      {...props}
    >
      {iconPosition === 'left' && renderIcon()}
      <span style={{ color: variant === 'primary' ? '#ffffff' : '#000000' }}>
        {children}
      </span>
      {iconPosition === 'right' && renderIcon()}
    </button>
  )
}

export default Button

