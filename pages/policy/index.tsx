import Head from 'next/head'
import { useCallback } from 'react'
import Layout from '@/components/layout/Layout'
import PolicyPage from '@/components/templates/PolicyPage/PolicyPage'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

function Policy() {
  const getDefaultTextGenerator = useCallback(
    () => 'Политика конфиденциальности и возврата',
    []
  )
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  return (
    <>
      <Head>
        <title>Land Motors | Политика конфиденциальности и возврата</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.jpg" />
      </Head>
      <Layout>
        <main>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <PolicyPage />
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default Policy
