/* eslint-disable react-hooks/exhaustive-deps */
import { getAvtoPartsFx } from '@/app/api/avtoParts'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import {
  $carBrands,
  $avtoParts,
  $filteredAvtoParts,
  $productGroup,
  setCarBrands,
  setAvtoParts,
  setProductGroup,
  updateCarBrand,
  updateProductGroup,
} from '@/context/avtoParts'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import { IAvtoParts } from '@/types/avtoparts'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import { usePopup } from '@/hooks/usePoup'
import { checkQueryParams } from '@/utils/catalog'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  // console.log(query)
  const mode = useStore($mode)
  const carBrands = useStore($carBrands)
  const productGroup = useStore($productGroup)
  const filteredAvtoParts = useStore($filteredAvtoParts)
  const avtoParts = useStore($avtoParts)
  const [spinner, setSpinner] = useState(false)
  const [priceRange, setPriceRange] = useState([1000, 9000])
  const [isFilterInQuery, setIsFilterInQuery] = useState(false)
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)
  const pagesCount = Math.ceil(avtoParts.count / 20)
  const isValidOffset =
    query !== undefined
      ? query.offset && !isNaN(+query.offset) && +query.offset > 0
      : false
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()
  const isAnyCarBrandChecked = carBrands.some((item) => item.checked)
  const isAnyproductGroupChecked = productGroup.some((item) => item.checked)
  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyCarBrandChecked ||
    isAnyproductGroupChecked
  )
  const { toggleOpen, open, closePopup } = usePopup()

  useEffect(() => {
    loadAvtoParts()
  }, [filteredAvtoParts, isFilterInQuery])

  const loadAvtoParts = async () => {
    try {
      setSpinner(true)
      const data = await getAvtoPartsFx('/avto-parts?limit=20&offset=0')

      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        })

        resetPagination(data)
        return
      } else {
        if (+query.offset > Math.ceil(data.count / 20)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          )

          setCurrentPage(0)
          setAvtoParts(isFilterInQuery ? filteredAvtoParts : data)
          return
        }

        const offset = +query.offset - 1
        const result = await getAvtoPartsFx(
          `/avto-parts?limit=20&offset=${offset}`
        )

        setCurrentPage(offset)
        setAvtoParts(isFilterInQuery ? filteredAvtoParts : result)
        return
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetPagination = (data: IAvtoParts) => {
    setCurrentPage(0)
    setAvtoParts(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)
      const data = await getAvtoPartsFx('/avto-parts?limit=20&offset=0')

      if (selected > pagesCount) {
        resetPagination(isFilterInQuery ? filteredAvtoParts : data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(isFilterInQuery ? filteredAvtoParts : data)
        return
      }

      const { isValidAvtoQuery, isValidPartsQuery, isValidPriceQuery } =
        checkQueryParams(router)

      const result = await getAvtoPartsFx(
        `/avto-parts?limit=20&offset=${selected}${
          isFilterInQuery && isValidAvtoQuery
            ? `&avto=${router.query.avto}`
            : ''
        }${
          isFilterInQuery && isValidPartsQuery
            ? `&parts=${router.query.parts}`
            : ''
        }${
          isFilterInQuery && isValidPriceQuery
            ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
            : ''
        }`
      )

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setAvtoParts(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetFilters = async () => {
    try {
      const data = await getAvtoPartsFx('/avto-parts?limit=20&offset=0')
      const params = router.query

      delete params.avto
      delete params.parts
      delete params.priceFrom
      delete params.priceTo
      params.first = 'cheap'

      router.push({ query: { ...params } }, undefined, { shallow: true })

      setCarBrands(carBrands.map((item) => ({ ...item, checked: false })))

      setProductGroup(productGroup.map((item) => ({ ...item, checked: false })))

      setAvtoParts(data)
      setPriceRange([1000, 9000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>Каталог</h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {isAnyCarBrandChecked && (
              <ManufacturersBlock
                title="Марка авто:"
                event={updateCarBrand}
                manufacturersList={carBrands}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isAnyproductGroupChecked && (
              <ManufacturersBlock
                title="Категория товара:"
                event={updateProductGroup}
                manufacturersList={productGroup}
              />
            )}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={resetFilterBtnDisabled}
              onClick={resetFilters}
            >
              Сбросить фильтр
            </button>
            <button
              className={styles.catalog__top__mobile_btn}
              onClick={toggleOpen}
            >
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>
                Фильтр
              </span>
            </button>
            <FilterSelect setSpinner={setSpinner} />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              setPriceRange={setPriceRange}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              currentPage={currentPage}
              setIsFilterInQuery={setIsFilterInQuery}
              closePopup={closePopup}
              filtersMobileOpen={open}
            />
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={`${styles.catalog__list} ${darkModeClass}`}>
                {avtoParts.rows?.length ? (
                  avtoParts.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Товары не найдены</span>
                )}
              </ul>
            )}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
