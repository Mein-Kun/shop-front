/* eslint-disable react-hooks/exhaustive-deps */

import styles from '@/styles/admin/index.module.scss'
import AdminOrder from '@/components/modules/AdminPage/AdminOrder'
import { useState } from 'react'

const AdminPage = () => {
  const [orderIsReady, setOrderIsReady] = useState(false)

  return (
    <section className={styles.admin}>
      <div className="container">
        <div className={styles.admin__inner}>
          <div className={styles.admin__cart}>
            <AdminOrder
              setOrderIsReady={setOrderIsReady}
              showDoneIcon={orderIsReady}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminPage
