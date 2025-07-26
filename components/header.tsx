"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X, User } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              ACTIA®
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-[#C0D830] transition-colors hover:underline">
              ACCUEIL
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-[#C0D830] transition-colors hover:underline">
                <span>À PROPOS</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-[#C0D830] transition-colors hover:underline">
                <span>SOLUTIONS</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <Link href="/qualite" className="hover:text-[#C0D830] transition-colors hover:underline">
              QUALITÉ
            </Link>
            <Link href="/telecharger" className="hover:text-[#C0D830] transition-colors hover:underline">
              TÉLÉCHARGER
            </Link>
            <Link href="/contact" className="hover:text-[#C0D830] transition-colors hover:underline">
              CONTACT
            </Link>
          </nav>

          {/* Language and Accessibility */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="hover:text-[#C0D830] transition-colors">EN</button>
            <User className="h-5 w-5 hover:text-[#C0D830] transition-colors cursor-pointer" />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-[#C0D830] transition-colors">
                ACCUEIL
              </Link>
              <Link href="/apropos" className="hover:text-[#C0D830] transition-colors">
                À PROPOS
              </Link>
              <Link href="/solutions" className="hover:text-[#C0D830] transition-colors">
                SOLUTIONS
              </Link>
              <Link href="/qualite" className="hover:text-[#C0D830] transition-colors">
                QUALITÉ
              </Link>
              <Link href="/telecharger" className="hover:text-[#C0D830] transition-colors">
                TÉLÉCHARGER
              </Link>
              <Link href="/contact" className="hover:text-[#C0D830] transition-colors">
                CONTACT
              </Link>
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-800">
                <button className="hover:text-[#C0D830] transition-colors">EN</button>
                <User className="h-5 w-5 hover:text-[#C0D830] transition-colors cursor-pointer" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
