import React from 'react'
import './ToggleSwitch.css'

export default function ToggleSwitch({
  checked = true,
  onChange,
  label = 'Show my name and profile publicly',
  id = 'public-profile-toggle',
  disabled = false
}) {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked)
    }
  }

  const handleKeyDown = (e) => {
    if (disabled) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onChange(!checked)
    }
  }

  return (
    <div className="toggle-switch-container">
      <div className="toggle-switch-row">
        <label htmlFor={id} className="toggle-switch-label">
          <span className="toggle-switch-title">{label}</span>
          <span className="toggle-switch-badge">
            {checked ? 'Public (YES)' : 'Anonymous (NO)'}
          </span>
        </label>

        <button
          type="button"
          id={id}
          role="switch"
          aria-checked={checked}
          aria-label={label}
          disabled={disabled}
          className={`toggle-switch-track ${checked ? 'toggle-switch-track--checked' : ''}`}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          <span className={`toggle-switch-thumb ${checked ? 'toggle-switch-thumb--checked' : ''}`} />
        </button>
      </div>

      <p className="toggle-switch-helper">
        {checked
          ? 'ON — Displays your name and profile photo alongside your feedback.'
          : 'OFF — Displays your review as Anonymous and hides your profile photo.'}
      </p>
    </div>
  )
}
