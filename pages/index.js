import { FooterBanner, HeroBanner, Product } from '../components'
import { client } from '../lib/client'

export default function Home({ products, bannerData}) {
  console.log(bannerData[0])
  return (
    <>
      <HeroBanner herobanner={bannerData.length && bannerData[0]} />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speaker of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner = {bannerData && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  console.log(bannerData[0])

  return {
    props: { products, bannerData }
  }
}
