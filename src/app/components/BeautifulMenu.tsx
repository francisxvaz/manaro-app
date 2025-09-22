"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Link from "next/link"



export default function MainMenu() {
  const [openPopover, setOpenPopover] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  
  useEffect(() => {
    fetch('/api/products/categories')
      .then(res => res.json())
      .then(res => setCategories(res.categories.categoryNames))
  }, [])

  const menuItems: Record<string, string[]> = {
  Products: categories,
  Services: ["Service A", "Service B", "Service C"],
  About: ["Our Team", "Our Story", "Careers"],
}

  const handleMouseEnter = (key: string) => {
    setOpenPopover(key)
  }

  const handleMouseLeave = () => {
    setOpenPopover(null)
  }

  return (
    <div className="flex space-x-6 items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md z-50">
      {/* Dummy top label */}
      <span className="font-semibold text-xl text-gray-800 dark:text-gray-100 cursor-pointer">
        <Link href="/">Home</Link>
      </span>

      {Object.entries(menuItems).map(([menuTitle, items]) => {
        const isProducts = menuTitle === "Products"

        return (
          <Popover
            key={menuTitle}
            open={openPopover === menuTitle}
            onOpenChange={(open) => {
              if (!open) setOpenPopover(null)
            }}
          >
            <PopoverTrigger asChild>
              {isProducts ? (
                <Link href="/products" passHref>
                  <Button
                    variant="ghost"
                    onMouseEnter={() => handleMouseEnter(menuTitle)}
                    onMouseLeave={handleMouseLeave}
                    className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none cursor-pointer"
                  >
                    {menuTitle}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  onMouseEnter={() => handleMouseEnter(menuTitle)}
                  onMouseLeave={handleMouseLeave}
                  className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none cursor-pointer"
                >
                  {menuTitle}
                </Button>
              )}
            </PopoverTrigger>

            <PopoverContent
              onMouseEnter={() => handleMouseEnter(menuTitle)}
              onMouseLeave={handleMouseLeave}
              className={`mt-2 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 ${
                isProducts ? "w-96" : "w-48"
              }`}
              align="start"
            >
              <div
                className={`gap-1 ${
                  isProducts ? "grid grid-cols-2" : "space-y-1"
                }`}
              >
                {items.map((item) => (
                  <div
                    key={item}
                    className="rounded-md px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )
      })}
    </div>
  )
}
