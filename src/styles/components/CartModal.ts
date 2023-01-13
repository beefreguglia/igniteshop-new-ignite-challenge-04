import { styled } from '..'
import * as Dialog from '@radix-ui/react-dialog'

export const CartModalOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
})

export const CartModalContent = styled(Dialog.Content, {
  width: '30rem',
  height: '100vh',
  backgroundColor: '$gray800',
  padding: '1.5rem',
  position: 'fixed',
  right: 0,
  top: 0,
  boxShadow: '-4px 0 30px rgba(0, 0, 0, 0.8)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  form: {
    padding: '1.5rem',
  },
})

export const Title = styled(Dialog.Title, {
  fontSize: '$lg',
  fontWeight: 'bold',
  marginBottom: '2rem',
})

export const Close = styled(Dialog.Close, {
  border: 'none',
  backgroundColor: 'transparent',
  alignSelf: 'flex-end',
  color: '$gray100',
  cursor: 'pointer',

  '&:hover': {
    transition: 'color 400ms',
    color: '$gray300',
  },
})

export const CardModalContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  maxHeight: '52vh',
  overflow: 'auto',

  '&::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-track': {
    background: '$gray900',
    borderRadius: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$green500',
    borderRadius: '20px',
  },

  footer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 'calc(30rem - 3rem)',
    position: 'absolute',
    bottom: 100,

    div: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.5rem',

      span: {
        fontWeight: 'bold',
      },

      '.price': {
        fontSize: '$xl',
      },
    },

    button: {
      marginTop: '3.75rem',
      padding: '1.25rem 2rem',
      border: 'none',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '$white',
      backgroundColor: '$green500',
      fontSize: '$md',
      fontWeight: 'bold',
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: '$green300',
        transition: 'background 400ms',
      },
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.8,
      },
    },
  },
})

export const CardModalContent = styled('div', {
  display: 'flex',
  gap: '1.25rem',
  width: 'calc(30rem - 4rem)',
})

export const CardImageContainer = styled('div', {
  width: '100%',
  maxWidth: 100,
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  padding: '0.25rem',
  borderRadius: 8,
  height: 'calc(100 - 0.5rem)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const DescriptionCardContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  p: {
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
    marginBottom: '0.125rem',
  },

  span: {
    fontSize: '$md',
    fontWeight: 'bold',
    lineHeight: 1.6,
    color: '$gray100',
    marginBottom: '0.5rem',
  },
})

export const RemoveButton = styled('button', {
  display: 'flex',
  alignItems: 'flex-start',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: 'transparent',

  fontSize: '$md',
  fontWeight: 'bold',
  lineHeight: 1.6,
  color: '$green500',
  marginBottom: '0.5rem',

  '&:hover': {
    color: '$green300',
    transition: 'color 400ms',
  },
})
