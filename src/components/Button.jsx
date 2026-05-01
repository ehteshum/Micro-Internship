import { twMerge } from 'tailwind-merge'

const variantClasses = {
  primary:
    'bg-primary text-white shadow-sm hover:bg-sky-600 hover:shadow-md hover:-translate-y-0.5',
  secondary:
    'border border-primary text-primary hover:bg-sky-50 hover:-translate-y-0.5 dark:border-sky-400 dark:text-sky-300 dark:hover:bg-sky-950/40',
  success:
    'bg-accent text-white shadow-sm hover:bg-emerald-600 hover:shadow-md hover:-translate-y-0.5',
}

function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button
      type="button"
      className={twMerge(
        'inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition-all duration-300',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
