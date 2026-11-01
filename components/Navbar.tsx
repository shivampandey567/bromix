import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b bg-sidebar/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-30">
        <span className='text-xl font-medium flex items-center gap-1.5'>Bromix</span>
        <span className='flex gap-3'>
        </span>
        <span className='flex gap-3'>
          <Link href="/cart">
          <Button variant="outline" size="icon-lg" className='text-muted-foreground'><ShoppingCart /></Button>
          </Link>
          <Link href="/profile">
          </Link>
        </span>

      </div>
    </header>
  )
}

export default Navbar