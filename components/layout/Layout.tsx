import { ILayoutProps } from '@/types/common'
import Header from '@/components/modules/Header/Header'
import Footer from '@/components/modules/Footer/Footer'

const Layout = ({ children }: ILayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default Layout
