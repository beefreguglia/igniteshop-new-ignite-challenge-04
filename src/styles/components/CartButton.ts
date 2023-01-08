import { styled } from '..'

export const CartStyledButton = styled('button', {
  variants: {
    variant: {
      gray: {
        backgroundColor: '$gray800',

        svg: {
          color: '$gray300',
        },

        '&:hover': {
          opacity: 0.8,
          transition: 'opacity 300ms ease-in-out',
        },
      },
      green: {
        backgroundColor: '$green500',
        
        svg: {
          color: '$white',
        },

        '&:hover': {
          backgroundColor: '$green300',
          transition: 'background 300ms ease-in-out',
        },
      },
    },
  },

  borderRadius: 6,
  padding: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer',
  position: 'relative',
})

export const CartButtonContainer = styled('div', {})

export const CartQuantity = styled('p', {
  variants: {
    variant: {
      small: {
        padding: '0.25rem 0.5rem',
      },
      large: {
        padding: '0.5rem',
        top: -16,
        right: -14,
      },
    },
  },
  top: -12,
  right: -8,
  background: "$green500",
  borderRadius: '100%',
  fontSize: '$sm',
  color: '$white',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
})
