'use client'

import React from 'react'

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'enabled' | 'enabledSpecific' | 'disabled'
  children: React.ReactNode
}

function FormButton({ variant = 'disabled', children, ...rest }: FormButtonProps) {
  const buttonVariants = {
    enabled:
      'bg-[#222222] text-xl font-semibold py-2 px-4 rounded-none hover:opacity-75',
    enabledSpecific:
      'bg-[#222222] text-xl font-semibold py-2 px-4 rounded-none hover:opacity-75 specific-button-class',
    disabled: 'bg-[#f3ccc4] text-xl py-2 px-4 rounded-none cursor-not-allowed',
  }

  return (
    <button className={buttonVariants[variant]} {...rest}>
      {children}
    </button>
  )
}

export default FormButton

