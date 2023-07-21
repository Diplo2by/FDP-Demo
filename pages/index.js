import Image from 'next/image'
import { Inter } from 'next/font/google'
import Form from './components/Form'
import PropertyTabular from './components/PropertyTabular'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className=''>
      <Form />
      {/* <PropertyTabular /> */}
    </div>
  )
}
