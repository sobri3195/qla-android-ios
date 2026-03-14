function PremiumButton({ children, type = 'button', fullWidth = false, ...props }) {
  return (
    <button type={type} className={`premium-button ${fullWidth ? 'full' : ''}`} {...props}>
      {children}
    </button>
  )
}

export default PremiumButton
