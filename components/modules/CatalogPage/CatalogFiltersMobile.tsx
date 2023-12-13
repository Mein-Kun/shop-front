import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { ICatalogFilterMobileProps } from '@/types/catalog'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import FiltersPopupTop from './FiltersPopupTop'
import styles from '@/styles/catalog/index.module.scss'
import FiltersPopup from './FiltersPopup'
import {
  $carBrands,
  $productGroup,
  setCarBrands,
  setProductGroup,
  updateCarBrand,
  updateProductGroup,
} from '@/context/avtoParts'
import { useState } from 'react'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const CatalogFiltersMobile = ({
  spinner,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  applyFilters,
  filtersMobileOpen,
  setIsPriceRangeChanged,
  priceRange,
  setPriceRange,
}: ICatalogFilterMobileProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const carBrands = useStore($carBrands)
  const productGroup = useStore($productGroup)
  const [openBoilers, setOpenBoilers] = useState(false)
  const [openParts, setOpenParts] = useState(false)
  const handleOpenBoilers = () => setOpenBoilers(true)
  const handleCloseBoilers = () => setOpenBoilers(false)
  const handleOpenParts = () => setOpenParts(true)
  const handleCloseParts = () => setOpenParts(false)
  const isAnyCarBrandChecked = carBrands.some((item) => item.checked)
  const isAnyProductGroupChecked = productGroup.some((item) => item.checked)
  const isMobile = useMediaQuery(820)

  const resetAllCarBrands = () =>
    setCarBrands(carBrands.map((item) => ({ ...item, checked: false })))

  const resetAllProductGroup = () =>
    setProductGroup(productGroup.map((item) => ({ ...item, checked: false })))

  const applyFiltersAndClosePopup = () => {
    applyFilters()
    closePopup()
  }

  return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeClass} ${
        filtersMobileOpen ? styles.open : ''
      }`}
    >
      <div className={styles.catalog__bottom__filters__inner}>
        <FiltersPopupTop
          resetBtnText="Сбросить все"
          title="Фильтры"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__car_brands}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenBoilers}
          >
            Марка авто
          </button>
          <FiltersPopup
            title="Марка авто"
            resetFilterBtnDisabled={!isAnyCarBrandChecked}
            updateManufacturer={updateCarBrand}
            setManufacturer={setCarBrands}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={carBrands}
            resetAllManufacturers={resetAllCarBrands}
            handleClosePopup={handleCloseBoilers}
            openPopup={openBoilers}
          />
        </div>
        <div className={styles.filters__car_brands}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenParts}
          >
            Категория товара
          </button>
          <FiltersPopup
            title="Категория товара"
            resetFilterBtnDisabled={!isAnyProductGroupChecked}
            updateManufacturer={updateProductGroup}
            setManufacturer={setProductGroup}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={productGroup}
            resetAllManufacturers={resetAllProductGroup}
            handleClosePopup={handleCloseParts}
            openPopup={openParts}
          />
        </div>
        <div className={styles.filters__price}>
          <Accordion
            title="Цена"
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            hideArrowClass={styles.hide_arrow}
            isMobileForFilters={isMobile}
          >
            <div className={styles.filters__manufacturer__inner}>
              <PriceRange
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setIsPriceRangeChanged={setIsPriceRangeChanged}
              />
              <div style={{ height: 24 }} />
            </div>
          </Accordion>
        </div>
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Показать'
          )}
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersMobile
