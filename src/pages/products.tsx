import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Montserrat, Inter } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700", "800"] })
const inter = Inter({ subsets: ["latin"] })

const PRODUCTS = [
  { id: 1, name: "RTX 4090 Suprim X", category: "gpu", price: 1999, img: "/images/msi2.jpg", spec: "24GB GDDR6X" },
  { id: 2, name: "RTX 4080 Gaming X", category: "gpu", price: 1199, img: "/images/msi4.jpg", spec: "16GB GDDR6X" },
  { id: 3, name: "MPG Z790 Edge", category: "mobo", price: 449, img: "/images/msi1.jpg", spec: "LGA1700 • DDR5" },
  { id: 4, name: "MPG B850 Edge", category: "mobo", price: 249, img: "/images/msi3.jpg", spec: "AM5 • DDR5" },
  { id: 5, name: "GM41 Gaming Mouse", category: "periph", price: 79, img: "/images/msi5.png", spec: "26000 DPI" },
  { id: 6, name: "GK50Z RGB Keyboard", category: "periph", price: 129, img: "/images/msi6.jpg", spec: "Mechanical Switches" }
]

function readCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]")
  } catch {
    return []
  }
}

export default function Products() {
  const [category, setCategory] = useState<string>("all")
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    setCartCount(readCart().reduce((s: any, i: any) => s + (i.qty || 0), 0))
  }, [])

  const filtered = category === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === category)

  const addToCart = (productId: number) => {
    const cart = readCart()
    const idx = cart.findIndex((c: any) => c.id === productId)
    if (idx >= 0) cart[idx].qty += 1
    else cart.push({ id: productId, qty: 1 })
    localStorage.setItem("cart", JSON.stringify(cart))
    setCartCount(cart.reduce((s: any, i: any) => s + i.qty, 0))
    // small UX feedback
    alert("Added to cart")
  }

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
            <Link href="/products" className="text-red-500 font-semibold">Products</Link>
            <Link href="/about" className="text-gray-300 hover:text-red-500">About</Link>
          </div>
          <Link href="/cart">
            <Button className="bg-red-600 hover:bg-red-700 text-white">🛒 Cart ({cartCount})</Button>
          </Link>
        </div>
      </nav>

      <header className="pt-24 pb-8 bg-gradient-to-b from-red-900/10 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className={`${montserrat.className} text-4xl font-bold mb-2`}>Products</h1>
          <p className="text-gray-400">Browse our curated selection — click Add to Cart to save items.</p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <Tabs defaultValue="all" onValueChange={(v: string) => setCategory(v)}>
            <TabsList className="flex gap-2 bg-black/50 border border-red-900/30 p-2 rounded-lg">
              <TabsTrigger value="all" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="gpu" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">GPUs</TabsTrigger>
              <TabsTrigger value="mobo" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Motherboards</TabsTrigger>
              <TabsTrigger value="periph" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Peripherals</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <Card key={p.id} className="flex flex-col bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 hover:scale-105 transition">
              <div className="h-48 overflow-hidden bg-black">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-300" />
              </div>
              <CardHeader>
                <Badge className="bg-red-600/30 text-red-300 border border-red-600/50 w-fit mb-2">{p.category.toUpperCase()}</Badge>
                <CardTitle className="text-white">{p.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-400">{p.spec}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`${montserrat.className} text-2xl font-bold text-red-500`}>${p.price}</span>
                </div>
              </CardContent>
              <div className="p-4 border-t border-red-900/20">
                <Button onClick={() => addToCart(p.id)} className="w-full bg-red-600 hover:bg-red-700">Add to Cart</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}