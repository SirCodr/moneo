"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Home, PiggyBank, Settings } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home
  },
  {
    name: "Expenses",
    href: "/expenses",
    icon: BarChart3
  },
  {
    name: "Savings",
    href: "/savings",
    icon: PiggyBank
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings
  }
]

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn("flex items-center space-x-6", className)}
      {...props}
    >
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <div className={cn(
              "rounded-lg p-1 transition-colors group-hover:bg-primary/10",
              pathname === item.href && "bg-primary/10"
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}