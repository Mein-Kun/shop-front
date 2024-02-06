import Head from 'next/head'
import { useCallback } from 'react'
import Layout from '@/components/layout/Layout'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import AdminPage from '@/components/templates/AdminPage/AdminPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

function Admin() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const getDefaultTextGenerator = useCallback(() => 'Для администратора', [])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  return (
    <>
      <Head>
        <title>
          Land Motors | {shouldLoadContent ? 'Для администратора' : ''}
        </title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.jpg" />
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <Breadcrumbs
              getDefaultTextGenerator={getDefaultTextGenerator}
              getTextGenerator={getTextGenerator}
            />
            <AdminPage />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  )
}

export default Admin
