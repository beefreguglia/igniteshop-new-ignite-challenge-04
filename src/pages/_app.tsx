import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { CartContextProvider, useCart } from '../hooks/useCart'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          marginTop: '2rem',
          backgroundColor: '#121214'
        }}
      />
    </CartContextProvider>
  )
}
