import { styled } from '../styles'

const Button = styled('button', {
  backgroundColor: '$rocketseat',
  borderRadius: 8,
  padding: '4px 8px',

  span: {
    fontWeight: 'bold',
  },

  '&:hover': {
    filter: 'brightness(0.8)'
  },
})

export default function Home() {
  return (
    <Button>
      <span>teste</span>
      Enviar
    </Button>
  )
}