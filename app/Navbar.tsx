"use client";
import { navItems } from "@/data/siteData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdFoodBank } from "react-icons/md";
import classNames from "classnames";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 h-14 items-center">
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
                  className={classNames({
                    "text-zinc-500": href === pathname,
                    "text-zinc-900": href !== pathname,
                    "hover:text-zinc-800 transition-colors": true,
                  })}
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
