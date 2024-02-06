/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { useState } from 'react'
import { $avtoPart } from '@/context/avtoPart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
// import PartImagesItem from './PartImagesItem'
import PartSlider from './PartSlider'
import styles from '@/styles/part/index.module.scss'

const PartImagesList = () => {
  const avtoPart = useStore($avtoPart)
  const isMobile = useMediaQuery(850)
  const [currentImgSrc, setCurrentImgSrc] = useState('')

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <PartSlider images={[]} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img
              src={'/img/product_img/BM99001MAL.png'}
              alt={avtoPart.parts_name}
            />
          </div>
          {/* <ul className={styles.part__images__list}>
            {images.map((item, i) => (
              <PartImagesItem
                key={i}
                alt={`image-${i + 1}`}
                callback={setCurrentImgSrc}
                src={item}
              />
            ))}
          </ul> */}
        </>
      )}
    </div>
  )
}

export default PartImagesList
