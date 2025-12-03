import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Montserrat, Inter } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700", "800"] })
const inter = Inter({ subsets: ["latin"] })

export default function About() {
  return (
    <div className={`${inter.className} min-h-screen bg-black text-white`}>
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/80 border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.jpg" alt="MSI logo" className="w-10 h-10 object-contain" />
            <span className={`${montserrat.className} text-xl font-bold text-red-500`}>MSI Gaming</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-red-500">Home</Link>
            <Link href="/products" className="text-gray-300 hover:text-red-500">Products</Link>
            <Link href="/about" className="text-red-500 font-semibold">About</Link>
          </div>
          <Link href="/cart"><Button className="bg-red-600 hover:bg-red-700 text-white">🛒 Cart</Button></Link>
        </div>
      </nav>

      <header className="pt-24 pb-12 bg-gradient-to-b from-red-900/10 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className={`${montserrat.className} text-4xl font-bold`}>About MSI</h1>
          <p className="text-gray-400 mt-2">Crafting excellence in gaming hardware since the beginning.</p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className={`${montserrat.className} text-3xl font-bold mb-4`}>Our Story</h2>
          <p className="text-gray-300 mb-4">
            MSI creates high-performance gaming hardware focused on performance, reliability, and striking design. We partner with industry leaders and maintain strict quality controls to deliver premium products.
          </p>
          <p className="text-gray-300 mb-6">Explore our products to see the engineering behind competitive gaming gear.</p>
          <Link href="/products"><Button className="bg-red-600">Explore Products</Button></Link>
        </div>

        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-zinc-900 to-black border border-red-900/30">
            <CardHeader>
              <div className="text-4xl mb-2">⚡</div>
              <CardTitle className="text-white">Performance</CardTitle>
            </CardHeader>
            <CardContent><p className="text-gray-400">Designed for high FPS, low latency, and overclocking headroom.</p></CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900 to-black border border-red-900/30">
            <CardHeader>
              <div className="text-4xl mb-2">🌈</div>
              <CardTitle className="text-white">Design</CardTitle>
            </CardHeader>
            <CardContent><p className="text-gray-400">Bold aesthetics with fully configurable RGB and premium materials.</p></CardContent>
          </Card>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className={`${montserrat.className} text-2xl font-bold mb-6`}>Partners & Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 text-center">
            <img src="/images/partner-nvidia.png" alt="NVIDIA" className="mx-auto h-12 mb-4" />
            <p className="text-gray-400">Official partner</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 text-center">
            <img src="/images/partner-amd.png" alt="AMD" className="mx-auto h-12 mb-4" />
            <p className="text-gray-400">Official partner</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 text-center">
            <img src="/images/partner-intel.png" alt="Intel" className="mx-auto h-12 mb-4" />
            <p className="text-gray-400">Authorized distributor</p>
          </div>
        </div>
      </section>
    </div>
  )
}