/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import { $avtoPart, setAvtoPart } from '@/context/avtoPart'
import { getAvtoPartFx } from '@/app/api/avtoParts'
import PartPage from '@/components/templates/PartPage/PartPage'
import Custom404 from '../404'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

function CatalogPartPage({ query }: { query: IQueryParams }) {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const avtoPart = useStore($avtoPart)
  const [error, setError] = useState(false)
  const router = useRouter()
  const getDefaultTextGenerator = useCallback(
    (subpath: string) => subpath.replace('catalog', 'Каталог'),
    []
  )
  const getTextGenerator = useCallback((param: string) => ({})[param], [])
  const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

  const meta = document.createElement('meta')
  meta.name = 'keywords'
  meta.content = `${avtoPart.parts_name}`
  document.head.appendChild(meta)

  useEffect(() => {
    loadAvtoPart()
  }, [router.asPath])

  useEffect(() => {
    if (lastCrumb) {
      lastCrumb.textContent = avtoPart.name
    }
  }, [lastCrumb, avtoPart])

  const loadAvtoPart = async () => {
    try {
      const data = await getAvtoPartFx(`/avto-parts/find/${query.partId}`)

      if (!data) {
        setError(true)
        return
      }

      setAvtoPart(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <Head>
        <title>Land Motors | {shouldLoadContent ? avtoPart.name : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <meta data-rh="true" name="keywords" content="[avtoPart.name]" /> */}
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.jpg" />
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout>
            <main>
              <Breadcrumbs
                getDefaultTextGenerator={getDefaultTextGenerator}
                getTextGenerator={getTextGenerator}
              />
              <PartPage />
              <div className="overlay" />
            </main>
          </Layout>
        )
      )}
    </>
  )
}
// const meta = document.createElement('meta')
// meta.name = 'keywords'
// meta.content = ''
// document.head.appendChild(meta)

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default CatalogPartPage
