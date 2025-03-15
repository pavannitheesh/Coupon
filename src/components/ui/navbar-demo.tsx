import { Home, User } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Available Coupons', url: '#', icon: Home },
    { name: 'Claimed Coupons', url: '#', icon: User }
   
  ]

  return <NavBar items={navItems} />
}