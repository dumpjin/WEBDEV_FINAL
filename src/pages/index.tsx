import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel"
import { Separator } from "../components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"

import { Cinzel } from "next/font/google"
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400","600","700"] })

export default function HogwartsLanding() {
  const [contactOpen, setContactOpen] = useState(false)
  const [contactEmail, setContactEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")

  function submitContact(e: React.FormEvent) {
    e.preventDefault()
    // Simple mailto approach so no backend is required.
    const subject = encodeURIComponent("Hogwarts Legacy — Inquiry")
    const body = encodeURIComponent(contactMessage || "(no message)")
    if (!contactEmail) {
      alert("Please provide your email address.")
      return
    }
    window.location.href = `mailto:support@hogwartslegacy.com?subject=${subject}&body=From:%20${encodeURIComponent(
      contactEmail
    )}%0A%0A${body}`
    // Close dialog after opening mail client
    setContactOpen(false)
  }

  return (
    <div className={`${cinzel.className} min-h-screen bg-[radial-gradient(circle_at_10%_10%,#0b0b0b_0%,#020202_40%,#020203_100%)] text-amber-100`}>
      {/* NAV / HERO */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/images/crest.png" alt="Hogwarts Crest" className="w-12 h-12 object-contain" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-amber-200 drop-shadow-[0_2px_8px_rgba(168,137,78,0.25)]">
              HOGWARTS LEGACY
            </h1>
            <p className="text-xs text-amber-200/70 -mt-1">An open-world action RPG set in the 1800s wizarding world</p>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <Button className="bg-amber-700 text-black hover:bg-amber-600">Buy Now</Button>
          <Dialog open={contactOpen} onOpenChange={setContactOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-amber-700 text-amber-200">Contact Us</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg bg-zinc-900 border border-amber-800">
              <DialogHeader>
                <DialogTitle className="text-2xl text-amber-200">Contact Us</DialogTitle>
              </DialogHeader>

              <form onSubmit={submitContact} className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm text-amber-200/80 mb-1">Your email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-amber-800 bg-zinc-950/60 px-3 py-2 text-amber-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-amber-200/80 mb-1">Message</label>
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us how we can help..."
                    className="w-full rounded-md border border-amber-800 bg-zinc-950/60 px-3 py-2 text-amber-100 min-h-[120px]"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setContactOpen(false)}>Cancel</Button>
                  <Button type="submit" className="bg-amber-700 text-black hover:bg-amber-600">Send Email</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        {/* HERO */}
        <section className="relative text-center mt-6">
          {/* decorative background, behind content */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute left-0 top-0 w-72 h-72 bg-gradient-to-br from-amber-900/10 via-transparent to-transparent blur-3xl opacity-60" />
          </div>

          <Badge className="mx-auto bg-amber-800/90 text-black px-3 py-1 rounded-md mb-4">NEW CONTENT</Badge>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-widest text-amber-100 drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)]">
            Explore the Wizarding World
          </h2>
          <p className="mt-4 text-amber-200/80 max-w-3xl mx-auto text-lg">
            Experience Hogwarts like never before — uncover secrets, learn powerful spells, and shape your legacy.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button className="bg-amber-700 text-black px-6 py-3 text-base">Pre-order</Button>
            <a href="#features" className="inline-block">
              <Button variant="outline" className="border-amber-700 text-amber-200 hover:bg-amber-900/10">Learn More</Button>
            </a>
          </div>
        </section>

        <Separator className="my-12 border-amber-900/60" />

        {/* TRAILER / CAROUSEL */}
        <section id="trailer" className="max-w-5xl mx-auto">
          <Carousel className="rounded-xl overflow-hidden border border-amber-800/40 shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
            <CarouselContent>
              <CarouselItem>
                <img src="/images/hogwarts1.jpg" alt="Hogwarts view" className="w-full h-[420px] object-cover" />
              </CarouselItem>
              <CarouselItem>
                <img src="/images/hogwarts2.png" alt="Hogwarts corridor" className="w-full h-[420px] object-cover" />
              </CarouselItem>
              <CarouselItem>
                <img src="/images/hogwarts3.jpg" alt="Hogwarts night" className="w-full h-[420px] object-cover" />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <Separator className="my-12 border-amber-900/60" />

        {/* FEATURES - CARDS */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Open World", desc: "Roam the castle, explore Hogsmeade, and discover hidden secrets." },
            { title: "Spellcasting", desc: "Master spells, potions and duels with deep progression." },
            { title: "Choices & Consequences", desc: "Shape your story with decisions that matter." }
          ].map((f, i) => (
            <Card key={i} className="bg-zinc-900/60 border border-amber-800 hover:shadow-[0_8px_30px_rgba(168,137,78,0.12)] transition">
              <CardHeader>
                <CardTitle className="text-amber-200 tracking-wide">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-100/80">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Separator className="my-12 border-amber-900/60" />

        {/* TABS - Houses / Game Modes */}
        <section className="max-w-4xl mx-auto">
          <h3 className="text-3xl text-amber-200 font-semibold mb-4">Houses & Game Modes</h3>
          <Tabs defaultValue="gryffindor" className="bg-zinc-900/50 border border-amber-800/40 rounded-md">
            <TabsList className="flex justify-between p-2">
              <TabsTrigger value="gryffindor" className="text-amber-200">Gryffindor</TabsTrigger>
              <TabsTrigger value="slytherin" className="text-amber-200">Slytherin</TabsTrigger>
              <TabsTrigger value="exploration" className="text-amber-200">Exploration</TabsTrigger>
            </TabsList>

            <div className="p-4">
              <TabsContent value="gryffindor">
                <p className="text-amber-100/85">Bravery and daring — expect bold quests and honor-bound storylines.</p>
              </TabsContent>
              <TabsContent value="slytherin">
                <p className="text-amber-100/85">Cunning and ambition — unique dialogue and strategic advantages.</p>
              </TabsContent>
              <TabsContent value="exploration">
                <p className="text-amber-100/85">Open-ended exploration features, side quests, and hidden lore.</p>
              </TabsContent>
            </div>
          </Tabs>
        </section>

        <Separator className="my-12 border-amber-900/60" />

        {/* FAQ - Accordion */}
        <section className="max-w-3xl mx-auto">
          <h3 className="text-3xl text-amber-200 font-semibold mb-4">FAQ</h3>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="a1">
              <AccordionTrigger>What platforms is Hogwarts Legacy on?</AccordionTrigger>
              <AccordionContent>Available on PC, PlayStation, and Xbox platforms. Check official store pages for region details.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="a2">
              <AccordionTrigger>Is there cross-save?</AccordionTrigger>
              <AccordionContent>Cross-save availability varies by platform. See official support for specifics.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="a3">
              <AccordionTrigger>Are there expansions?</AccordionTrigger>
              <AccordionContent>Seasonal content and expansions are released post-launch — follow official channels for announcements.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator className="my-12 border-amber-900/60" />

        {/* CTA & Contact */}
        <section className="text-center mt-6">
          <p className="text-amber-200/80 mb-4">Ready to begin your legacy?</p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-amber-700 text-black px-6">Pre-order Now</Button>
            <Dialog open={contactOpen} onOpenChange={setContactOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-amber-700 text-amber-200">Contact Support</Button>
              </DialogTrigger>
              {/* Dialog content reused above in header - okay to have multiple triggers */}
            </Dialog>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-amber-900/30 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-amber-200/80">© {new Date().getFullYear()} Hogwarts Legacy</div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-amber-200/70 text-sm">Privacy</a>
            <a href="#" className="text-amber-200/70 text-sm">Support</a>
            <a href="#" className="text-amber-200/70 text-sm">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
