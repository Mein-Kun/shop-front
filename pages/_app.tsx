import { withHydrate } from 'effector-next'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import NextNProgress from 'nextjs-progressbar'
import 'react-toastify/ReactToastify.css'
import '@/styles/globals.css'

const enhance = withHydrate()

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    mounted && (
      <>
        <NextNProgress color="#ec0000" />
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          limit={1}
          theme="light"
        />
      </>
    )
  )
}

export default enhance(App as React.FC<AppProps>)
