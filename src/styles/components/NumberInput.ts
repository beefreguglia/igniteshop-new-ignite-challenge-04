import { styled } from '..'

export const InputContainer = styled('div', {
  display: 'flex',
  margin: '0.2rem 0',
})

export const DecrementButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray900',
  padding: '0.5rem',
  border: 'none',
  cursor: 'pointer',
  color: '$green500',
  borderRadius: '6px 0 0 6px',

  '&:hover': {
    transition: 'all 400ms',
    color: '$green300',
  },

  '&:disabled': {
    color: '$gray800',
    cursor: 'not-allowed',
  },
})

export const Input = styled('input', {
  backgroundColor: '$gray900',
  color: '$gray300',
  transition: '400ms',
  border: 'none',
  textAlign: 'center',
  maxWidth: '2.5rem',
  outline: 'none',
  fontSize: '$sm',

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
})

export const IncrementButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray900',
  padding: '0.5rem',
  border: 'none',
  cursor: 'pointer',
  color: '$green500',
  borderRadius: '0 6px 6px 0',

  '&:hover': {
    transition: 'color 400ms',
    color: '$green300',
  },

  '&:disabled': {
    color: '$gray800',
    cursor: 'not-allowed',
  },
})
