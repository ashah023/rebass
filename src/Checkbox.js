
import React from 'react'
import classnames from 'classnames'
import withRebass from './withRebass'
import Label from './Label'

/**
 * Checkbox input with label
 */

// - [ ] Default to green color for checkbox...

const Checkbox = ({
  label,
  name,
  checked,
  children,
  stacked,
  baseRef,
  className,
  style,
  theme,
  subComponentStyles,
  ...props
}) => {
  const { scale, colors, borderRadius } = theme

  const invalid = props['aria-invalid'] || props.invalid

  const sx = {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flexDirection: stacked ? 'column' : null,
      paddingBottom: scale[1],
      color: invalid ? colors.error : null,
      cursor: 'pointer',
      ...style
    },
    input: {
      position: 'absolute',
      zIndex: -1,
      opacity: 0,
      ...subComponentStyles.input
    },
    box: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: scale[2],
      height: scale[2],
      marginRight: stacked ? null : scale[1],
      marginBottom: stacked ? scale[1] : null,
      backgroundColor: checked ? 'currentcolor' : 'transparent',
      // backgroundColor: checked ? (style.backgroundColor || 'currentcolor') : 'transparent',

      borderRadius,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: checked ? null : colors.gray,
      transition: 'background-color .1s ease-out',
      ...subComponentStyles.box
    },
    icon: {
      display: checked ? null : 'none',
      width: '75%',
      height: '75%',
      marginTop: 1,
      fill: colors.white,
      ...subComponentStyles.icon
    }
  }

  const cx = classnames('Checkbox', className, {
    'isInvalid': invalid,
    'isDisabled': props.disabled,
    'isReadonly': props.readOnly
  })

  return (
    <Label
      className={cx}
      style={sx.root}>
      <input
        {...props}
        ref={baseRef}
        name={name}
        type='checkbox'
        checked={checked}
        style={sx.input} />
      <div
        className='Checkbox_box'
        style={sx.box}>
        <svg
          viewBox='0 0 32 32'
          style={sx.icon}>
          <path d='M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z' />
        </svg>
      </div>
      {label}
    </Label>
  )
}

Checkbox.propTypes = {
  /** Label for form element */
  label: React.PropTypes.string.isRequired,
  /** Name attribute for form element */
  name: React.PropTypes.string.isRequired,
  /** Place label centered under the radio */
  stacked: React.PropTypes.bool,
  /** Adds a ref to the input element */
  baseRef: React.PropTypes.func
}

export default withRebass(Checkbox)

