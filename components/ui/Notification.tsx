'use client'

// components/Notification.tsx
import { useEffect } from 'react'

const Notification = ({ message, onClose, delay = 3000 }: { message: string; onClose: () => void; delay?: number }) => {
  // Added delay prop with default value
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, delay) // Use the customizable delay

    return () => clearTimeout(timer) // Cleanup timer on unmount
  }, [onClose, delay]) // Add delay to dependencies array

  return (
    <div className="animate-slide-up fixed bottom-4 left-1/2 -translate-x-1/2 translate-y-full transform rounded bg-[#f3ccc4] px-8 py-4 font-semibold text-[#222222] shadow-lg transition-transform">
      {message}
    </div>
  )
}

export default Notification

