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
})

export const CartButtonContainer = styled('div', {})
