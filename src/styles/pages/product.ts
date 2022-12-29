import { styled, keyframes } from '..'

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',

  maxWidth: 1180,
  margin: '0 auto',
})

export const ImageProductContainer = styled('div', {
  width: '100%',
  maxWidth: 576,
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  height: 'calc(656px - 0.5rem)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$green300',
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:hover': {
      transition: 'background 300ms',
      backgroundColor: '$green300',
    },
  },
})

const SkeletonAnimation = keyframes({
  '0%': {
    opacity: 0.2,
    transform: 'translateY(6px) scale(0.98)',
  },
  '85%, 100%': {
    opacity: 1,
    transform: 'translateY(0px) scale(1)',
  },
})

export const SkeletonImage = styled('div', {
  width: 576,
  animation: `${SkeletonAnimation} 1s ease-in-out forwards infinite`,
  animationDirection: 'alternate',
  transformOrigin: 'bottom',
  backgroundColor: '$skeletonColor',
  borderRadius: 8,
  padding: '0.25rem',
  height: 'calc(656px - 0.5rem)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const SkeletonTitle = styled('div', {
  width: '100%',
  height: '3rem',
  animation: `${SkeletonAnimation} 1s ease-in-out forwards infinite`,
  animationDirection: 'alternate',
  backgroundColor: '$skeletonColor',
  borderRadius: 8,
})

export const SkeletonPrice = styled('div', {
  width: '30%',
  height: '3rem',
  marginTop: '1rem',
  marginBottom: '1rem',
  animation: `${SkeletonAnimation} 1s ease-in-out forwards infinite`,
  animationDirection: 'alternate',
  animationDelay: '200ms',
  backgroundColor: '$skeletonColor',
  borderRadius: 8,
})

export const SkeletonDescriptionLine = styled('div', {
  variants: {
    line: {
      '1': { animationDelay: '300ms' },
      '2': { animationDelay: '350ms' },
      '3': { animationDelay: '400ms' },
      '4': { animationDelay: '450ms' },
    },
  },
  width: '100%',
  height: '1rem',
  marginBottom: '0.5rem',
  animation: `${SkeletonAnimation} 1s ease-in-out forwards infinite`,
  animationDirection: 'alternate',

  backgroundColor: '$skeletonColor',
  borderRadius: 8,
})

export const SkeletonButton = styled('div', {
  marginTop: 'auto',
  width: '100%',
  height: '4rem',
  marginBottom: '1rem',
  animation: `${SkeletonAnimation} 1s ease-in-out forwards infinite`,
  animationDirection: 'alternate',
  animationDelay: '500ms',
  backgroundColor: '$skeletonColor',
  borderRadius: 8,
})
