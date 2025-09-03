export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base = "btn";
  const variants = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    outline: "btn-outline",
    danger: "btn-danger",
    link: ""
  };

  if (variant === "link") {
    return (
      <button {...props} className={`link-like ${className}`}>{children}</button>
    );
  }
  return (
    <button {...props} className={`${base} ${variants[variant] || variants.primary} ${className}`}>
      {children}
    </button>
  );
}
