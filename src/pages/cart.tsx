import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Montserrat, Inter } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700", "800"] })
const inter = Inter({ subsets: ["latin"] })

type CartItem = {
  id: number
  qty: number
}

type Product = {
  id: number
  name: string
  price: number
  img: string
}

const PRODUCTS: Product[] = [
  { id: 1, name: "RTX 4090 Suprim X", price: 1999, img: "/images/msi2.jpg" },
  { id: 2, name: "RTX 4080 Gaming X", price: 1199, img: "/images/msi4.jpg" },
  { id: 3, name: "MPG Z790 Edge", price: 449, img: "/images/msi1.jpg" },
  { id: 4, name: "MPG B850 Edge", price: 249, img: "/images/msi3.jpg" },
  { id: 5, name: "GM41 Gaming Mouse", price: 79, img: "/images/msi5.jpg" },
  { id: 6, name: "GK50Z RGB Keyboard", price: 129, img: "/images/msi6.jpg" }
]

function safeParseCart(): CartItem[] {
  try {
    const stored = localStorage.getItem("cart")
    if (!stored) return []
    const raw = JSON.parse(stored)
    if (!Array.isArray(raw)) return []

    return raw
      .map((item: unknown): CartItem | null => {
        if (typeof item !== "object" || item === null) return null

        const obj = item as Record<string, unknown>

        const idValue = Number(obj.id)
        const qtyValue = Number(obj.qty)

        if (!Number.isInteger(idValue) || !Number.isFinite(qtyValue)) return null
        if (qtyValue <= 0) return null

        return { id: idValue, qty: qtyValue }
      })
      .filter((i): i is CartItem => i !== null)
  } catch {
    return []
  }
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setItems(safeParseCart())
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items, mounted])

  const productFor = (id: number): Product | undefined =>
    PRODUCTS.find(p => p.id === id)

  const changeQty = (id: number, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== id))
      return
    }
    setItems(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)))
  }

  const subtotal = items.reduce((sum, item) => {
    const product = productFor(item.id)
    if (!product) return sum
    return sum + product.price * item.qty
  }, 0)

  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className={`${inter.className} min-h-screen bg-black text-white`}>
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/80 border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.jpg" alt="MSI logo" width={40} height={40} className="object-contain" />
            <span className={`${montserrat.className} text-xl font-bold text-red-500`}>MSI Gaming</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-red-500">Home</Link>
            <Link href="/products" className="text-gray-300 hover:text-red-500">Products</Link>
            <Link href="/about" className="text-gray-300 hover:text-red-500">About</Link>
          </div>
          <Link href="/cart">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Cart ({items.reduce((sum, i) => sum + i.qty, 0)})
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-24 pt-32">
        <h1 className={`${montserrat.className} text-3xl font-bold mb-8`}>Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-6">Your cart is empty.</p>
            <Link href="/products">
              <Button className="bg-red-600">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => {
                const product = productFor(item.id)

                if (!product) {
                  return (
                    <Card key={item.id} className="bg-gradient-to-br from-zinc-900 to-black border border-red-900/30">
                      <CardContent className="p-6 flex items-center gap-6">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">Unknown product (ID: {item.id})</h3>
                          <p className="text-gray-400">This product is no longer available.</p>
                        </div>
                        <div className="text-white font-bold">$0.00</div>
                      </CardContent>
                    </Card>
                  )
                }

                return (
                  <Card key={item.id} className="bg-gradient-to-br from-zinc-900 to-black border border-red-900/30">
                    <CardContent className="p-6 flex items-center gap-6">
                      <Image src={product.img} alt={product.name} width={112} height={80} className="rounded object-cover" />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{product.name}</h3>
                        <p className="text-gray-400">${product.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => changeQty(item.id, item.qty - 1)} className="px-3 py-1 bg-black/40 rounded">−</button>
                        <div className="px-4">{item.qty}</div>
                        <button onClick={() => changeQty(item.id, item.qty + 1)} className="px-3 py-1 bg-black/40 rounded">+</button>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400 text-sm">Line</div>
                        <div className="text-white font-bold">${(product.price * item.qty).toFixed(2)}</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <aside className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 p-6">
                <CardContent>
                  <h2 className={`${montserrat.className} text-xl font-bold mb-4`}>Order Summary</h2>
                  <div className="flex justify-between text-gray-400 mb-2"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-400 mb-2"><span>Tax (10 percent)</span><span>${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-400 mb-6"><span>Shipping</span><span>Free</span></div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-bold">Total</span>
                    <span className={`${montserrat.className} text-2xl font-bold text-red-500`}>${total.toFixed(2)}</span>
                  </div>
                  <Button className="w-full bg-red-600 mb-3">Proceed to Checkout</Button>
                  <Link href="/products">
                    <Button variant="outline" className="w-full border-red-600 text-red-500">Continue Shopping</Button>
                  </Link>
                </CardContent>
              </Card>
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}
