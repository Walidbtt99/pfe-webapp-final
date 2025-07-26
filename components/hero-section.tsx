import Image from "next/image"
import Link from "next/link"
import { Home } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex">
      {/* Left Column - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/placeholder.svg?height=800&width=800"
          alt="Engineer working at multi-monitor workstation"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Column - Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="max-w-2xl space-y-8">
          {/* Mobile Image */}
          <div className="lg:hidden mb-8">
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="Engineer working at multi-monitor workstation"
              width={600}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
              priority
            />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-black mb-4">
              ACTIA ENGINEERING SERVICES
            </h1>
            <div className="w-24 h-1 bg-[#C0D830]"></div>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Centre R&D et Laboratoire de qualification spécialisé dans :
          </p>

          {/* Bullet List */}
          <ul className="space-y-3 text-base md:text-lg text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-[#C0D830] rounded-full mt-3 mr-4 flex-shrink-0"></span>
              Les systèmes connectés
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-[#C0D830] rounded-full mt-3 mr-4 flex-shrink-0"></span>
              L'architecture électronique de véhicules
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-[#C0D830] rounded-full mt-3 mr-4 flex-shrink-0"></span>
              Les solutions d'électromobilité
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-[#C0D830] rounded-full mt-3 mr-4 flex-shrink-0"></span>
              Les services de diagnostic et de maintenance
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-[#C0D830] rounded-full mt-3 mr-4 flex-shrink-0"></span>
              Développement de logiciels
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <Link
              href="https://linkedin.com"
              className="w-12 h-12 bg-[#0077B5] flex items-center justify-center text-white font-bold text-sm hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              in
            </Link>
            <Link
              href="https://facebook.com"
              className="w-12 h-12 bg-[#1877F2] flex items-center justify-center text-white font-bold text-xl hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              f
            </Link>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500">
            <Home className="h-4 w-4 mr-2" />
            <span>/ ACTIA Engineering Services</span>
          </div>
        </div>
      </div>
    </section>
  )
}
