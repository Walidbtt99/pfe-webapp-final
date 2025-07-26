import Header from "@/components/header"
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold uppercase text-black mb-4">CONTACT</h1>
          <div className="w-24 h-1 bg-[#C0D830] mb-8"></div>
          <ContactForm />
        </div>
      </main>
    </div>
  )
}
