interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'disabled'
  className?: string
}

function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  let variantClasses = ''
  if (variant === 'primary') {
    variantClasses = 'bg-blue-600 text-white hover:opacity-90'
  } else if (variant === 'outline') {
    variantClasses =
      'border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50'
  } else if (variant === 'disabled') {
    variantClasses = 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-60'
  }

  return (
    <button
      className={`px-4 py-2 rounded-xl font-semibold cursor-pointer transition-all duration-300 ${variantClasses} ${className}`}
      disabled={variant === 'disabled'}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
