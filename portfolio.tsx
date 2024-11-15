"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, PlusCircle, BarChart, Settings, Phone, Trophy, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setIsOpen(!isOpen)

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: PlusCircle, label: 'Create Project', href: '/create-project' },
    { icon: BarChart, label: 'Analytics', href: '/analytics' },
    { icon: Trophy, label: 'Achievements', href: '/achievements' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: Phone, label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } lg:hidden`} 
        onClick={toggleSidebar}
        aria-hidden="true"
      />

      <aside 
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white/80 backdrop-blur-md transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-center border-b">
          <h1 className="text-2xl font-bold text-gray-800">My Portfolio</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] px-3">
          <nav className="space-y-2 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:text-gray-900 hover:bg-gray-100 ${
                  pathname === item.href ? 'bg-gray-100 text-gray-900' : ''
                }`}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    toggleSidebar()
                  }
                }}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      <main className={`p-4 lg:ml-64 transition-all ${isOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-lg font-semibold">Main Content</h2>
          <p>Your main content goes here. This area will adjust based on the sidebar state and the current route.</p>
        </div>
      </main>
    </>
  )
      }
