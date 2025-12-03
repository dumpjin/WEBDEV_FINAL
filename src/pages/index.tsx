import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel"
import { Separator } from "../components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Montserrat, Inter } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700", "800"] })
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={`${inter.className} min-h-screen bg-black text-white overflow-hidden`}>
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/80 border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.jpg" alt="MSI logo" className="w-10 h-10 object-contain" />
            <span className={`${montserrat.className} text-xl font-bold text-red-500`}>MSI Gaming</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-red-500 transition">Home</Link>
            <Link href="/products" className="text-gray-300 hover:text-red-500 transition">Products</Link>
            <Link href="/about" className="text-gray-300 hover:text-red-500 transition">About</Link>
          </div>

          <Link href="/cart">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              🛒 Cart
            </Button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black" />
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Badge className="mx-auto bg-red-900/50 text-red-300 px-4 py-1 mb-6 border border-red-700 animate-bounce" style={{ animationDuration: "3s" }}>
            ⚡ ULTRA PERFORMANCE GAMING
          </Badge>

          <h1 className={`${montserrat.className} text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-white leading-tight animate-fade-in`}>
            UNLEASH YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">POWER</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Experience cutting-edge gaming hardware engineered for victory. RGB, raw speed, and legendary performance.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link href="/products">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-bold rounded-lg">
                EXPLORE PRODUCTS
              </Button>
            </Link>
            <Button variant="outline" className="border-red-600 text-red-500 hover:bg-red-600/10 px-8 py-6 text-lg font-bold rounded-lg">
              WATCH DEMO
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className={`${montserrat.className} text-4xl font-bold mb-2 text-white`}>Featured Gear</h2>
        <p className="text-gray-400 mb-8">Premium gaming peripherals & components</p>

        <Carousel className="rounded-xl overflow-hidden border border-red-900/30">
          <CarouselContent>
            {[
              { name: "MPG Z790 Edge", type: "Motherboard", img: "/images/msi1.jpg" },
              { name: "RTX 4090 Suprim", type: "GPU", img: "/images/msi2.png" },
              { name: "MPG B850 Edge", type: "Motherboard", img: "/images/msi3.jpg" }
            ].map((item, i) => (
              <CarouselItem key={i}>
                <div className="bg-gradient-to-br from-zinc-900 to-black rounded-lg overflow-hidden border border-red-900/20">
                  <img src={item.img} alt={item.name} className="w-full h-80 object-cover" />
                  <div className="p-6">
                    <Badge className="bg-red-600/30 text-red-300 border border-red-600/50 mb-2">{item.type}</Badge>
                    <h3 className={`${montserrat.className} text-2xl font-bold text-white`}>{item.name}</h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-red-600 text-red-500" />
          <CarouselNext className="border-red-600 text-red-500" />
        </Carousel>
      </section>

      <Separator className="max-w-7xl mx-auto border-red-900/20" />

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: "⚡", title: "Maximum Performance", desc: "Engineered for competitive gaming and content creation" },
          { icon: "🌈", title: "RGB Lighting", desc: "Synchronized lighting across all components" },
          { icon: "🛡️", title: "Premium Build", desc: "Military-grade components for durability" }
        ].map((f, i) => (
          <Card key={i} className="bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 hover:border-red-600/60 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="text-4xl mb-2">{f.icon}</div>
              <CardTitle className="text-white text-xl">{f.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* TABS - PRODUCT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className={`${montserrat.className} text-4xl font-bold mb-8 text-white`}>Product Categories</h2>
        <Tabs defaultValue="gpus" className="bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 rounded-lg">
          <TabsList className="flex gap-2 p-4 bg-black/50">
            <TabsTrigger value="gpus" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Graphics Cards</TabsTrigger>
            <TabsTrigger value="mobos" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Motherboards</TabsTrigger>
            <TabsTrigger value="periph" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Peripherals</TabsTrigger>
          </TabsList>

          <div className="p-8">
            <TabsContent value="gpus" className="text-gray-300">
              High-performance NVIDIA & AMD graphics cards with advanced cooling solutions and high clock speeds.
            </TabsContent>
            <TabsContent value="mobos" className="text-gray-300">
              Latest chipsets with PCIe 5.0, DDR5 support, and enhanced power delivery for overclocking enthusiasts.
            </TabsContent>
            <TabsContent value="periph" className="text-gray-300">
              Gaming mice, keyboards, and headsets with precision sensors and customizable RGB profiles.
            </TabsContent>
          </div>
        </Tabs>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className={`${montserrat.className} text-5xl font-bold mb-4 text-white`}>Ready to Level Up?</h2>
        <p className="text-gray-400 mb-8 text-lg">Join thousands of gamers choosing MSI for competitive advantage.</p>
        <Link href="/products">
          <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-6 text-lg font-bold rounded-lg">
            START SHOPPING NOW
          </Button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-red-900/20 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className={`${montserrat.className} font-bold text-white mb-4`}>MSI Gaming</h3>
              <p className="text-gray-500 text-sm">Premium gaming hardware for champions.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-red-500">Graphics Cards</a></li>
                <li><a href="#" className="hover:text-red-500">Motherboards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-red-500">Contact Us</a></li>
                <li><a href="#" className="hover:text-red-500">Warranty</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-red-500">Privacy</a></li>
                <li><a href="#" className="hover:text-red-500">Terms</a></li>
              </ul>
            </div>
          </div>
          <Separator className="border-red-900/20" />
          <div className="pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} MSI Gaming. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
