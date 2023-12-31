import AuthPage from '@/components/templates/AuthPage/AuthPage'
import Head from 'next/head'

function Auth() {
  return (
    <main>
      <Head>
        <title>Land Motors - Авторизация</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="widht=device-widht, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.jpg" />
      </Head>
      <AuthPage />
    </main>
  )
}

export default Auth
