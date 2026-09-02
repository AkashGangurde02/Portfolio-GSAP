import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, ChevronDown, Loader2 } from 'lucide-react'
import './Button.css'

/**
 * Button System — Electric Tangerine Portfolio Design System
 *
 * Variants:
 *   'primary'   — Contained orange fill (default)
 *   'secondary' — Outlined orange border
 *   'tertiary'  — Texted / ghost link with animated underline
 *   'dark'      — Contained dark (#222222)
 *   'ghost'     — Outlined dark border → fills dark on hover
 *   'split'     — Orange split button with label + arrow chevron
 *
 * Sizes: 'xs' | 'sm' | 'md' (default) | 'lg' | 'icon'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  arrowType = 'up-right', // 'up-right' | 'right'
  icon: CustomIcon = null,
  iconPosition = 'right',
  isLoading = false,
  disabled = false,
  isDisabled = false,
  href = null,
  to = null,
  onClick = null,
  className = '',
  type = 'button',
  ...props
}) {
  const isButtonDisabled = disabled || isDisabled || isLoading

  const baseClasses = `btn-system btn-system--${variant} btn-system--${size} ${
    isButtonDisabled ? 'btn-system--disabled' : ''
  } ${className}`.trim()

  const ArrowIconComponent = arrowType === 'right' ? ArrowRight : ArrowUpRight

  // Motion animation variants
  const buttonVariants = {
    initial: { scale: 1, y: 0 },
    hover: isButtonDisabled
      ? {}
      : {
          scale: variant === 'tertiary' ? 1 : 1.02,
          y: variant === 'tertiary' ? 0 : -2,
          transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] },
        },
    tap: isButtonDisabled
      ? {}
      : {
          scale: 0.97,
          transition: { duration: 0.1, ease: 'easeOut' },
        },
  }

  const iconVariants = {
    initial: { x: 0, y: 0 },
    hover: isButtonDisabled
      ? {}
      : {
          x: arrowType === 'right' ? 4 : 3,
          y: arrowType === 'up-right' ? -3 : 0,
          transition: { duration: 0.22, ease: [0.25, 1, 0.5, 1] },
        },
  }

  const underlineVariants = {
    initial: { scaleX: 0 },
    hover: { scaleX: 1, transition: { duration: 0.28, ease: [0.25, 1, 0.5, 1] } },
  }

  // Content inside button
  const content = (
    <>
      {isLoading ? (
        <span className="btn-system__spinner-wrap">
          <Loader2 className="btn-system__spinner" size={size === 'sm' || size === 'xs' ? 14 : 16} />
          <span className="btn-system__label-loading">{children}</span>
        </span>
      ) : variant === 'split' ? (
        // Split layout: label | divider | arrow
        <>
          <span className="btn-system__label">{children}</span>
          <span className="btn-system__split-divider" />
          <motion.span className="btn-system__split-arrow" variants={iconVariants}>
            <ChevronDown size={16} strokeWidth={2.5} />
          </motion.span>
        </>
      ) : (
        <>
          {CustomIcon && iconPosition === 'left' && (
            <motion.span className="btn-system__icon btn-system__icon--left" variants={iconVariants}>
              {typeof CustomIcon === 'function'
                ? <CustomIcon size={size === 'sm' || size === 'xs' ? 14 : 16} />
                : CustomIcon}
            </motion.span>
          )}

          <span className="btn-system__label">{children}</span>

          {CustomIcon && iconPosition === 'right' && (
            <motion.span className="btn-system__icon btn-system__icon--right" variants={iconVariants}>
              {typeof CustomIcon === 'function'
                ? <CustomIcon size={size === 'sm' || size === 'xs' ? 14 : 16} />
                : CustomIcon}
            </motion.span>
          )}

          {showArrow && !CustomIcon && (
            <motion.span className="btn-system__icon btn-system__icon--arrow" variants={iconVariants}>
              <ArrowIconComponent size={size === 'sm' || size === 'xs' ? 14 : 16} strokeWidth={2} />
            </motion.span>
          )}
        </>
      )}

      {variant === 'tertiary' && (
        <motion.span className="btn-system__underline" variants={underlineVariants} />
      )}
    </>
  )

  // Router Link render
  if (to && !isButtonDisabled) {
    return (
      <motion.div
        className="btn-system-wrapper"
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <Link to={to} className={baseClasses} {...props}>
          {content}
        </Link>
      </motion.div>
    )
  }

  // External anchor render
  if (href && !isButtonDisabled) {
    return (
      <motion.div
        className="btn-system-wrapper"
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <a href={href} className={baseClasses} target={props.target || '_blank'} rel="noopener noreferrer" {...props}>
          {content}
        </a>
      </motion.div>
    )
  }

  // Standard button render
  return (
    <motion.button
      type={type}
      className={baseClasses}
      disabled={isButtonDisabled}
      onClick={onClick}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      {...props}
    >
      {content}
    </motion.button>
  )
}
