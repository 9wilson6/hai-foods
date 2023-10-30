import { navItems } from "@/data/siteData";
import Link from "next/link";
import React from "react";
import { MdFoodBank } from "react-icons/md";

export default function Navbar() {
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/" className="flex gap-2 items-center">
        <MdFoodBank size={18} />
        {navItems.logo}
      </Link>
      <ul className="flex space-x-6">
        {navItems.navLinks &&
          navItems.navLinks.map((navItem) => {
            const { id, href, title } = navItem;
            return (
              <li key={id}>
                <Link
                  href={href}
                  className="text-zinc-500 hover:text-zinc-800 transition-colors"
                >
                  {title}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
