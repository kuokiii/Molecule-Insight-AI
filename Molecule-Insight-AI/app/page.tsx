import Link from 'next/link'
import { MoleculeAnimation } from './components/MoleculeAnimation'
import { ClassifyButton } from './components/ClassifyButton'
import { Instagram, Github, Phone } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <nav className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-white text-2xl font-bold">Molecule Insight AI</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/classify" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Classify
                </Link>
                <Link href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-12 sm:px-6 lg:px-8">
          <h1 className="text-6xl font-bold text-white mb-8 text-center">
            Discover the World of Molecules
          </h1>
          <p className="text-2xl text-gray-300 mb-12 text-center max-w-3xl">
            Empower your chemistry knowledge with AI-driven molecular insights. Classify, visualize, and understand complex molecular structures with ease.
          </p>
          <ClassifyButton />
          <div className="mt-16">
            <MoleculeAnimation />
          </div>
        </div>
      </main>

      <footer className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-gray-300 text-sm mb-2 md:mb-0">
              © 2024 Molecule Insight AI. All rights reserved. Developed by Nirupam Thapa a.k.a kuoki
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/_kuoki/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="https://github.com/kuokiii" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Github size={20} />
              </a>
              <a href="tel:+917318876896" className="text-gray-300 hover:text-white">
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

