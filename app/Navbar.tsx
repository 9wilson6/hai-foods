"use client";
import { navItems } from "@/data/siteData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdFoodBank } from "react-icons/md";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

export default function Navbar() {
  return (
    <nav className="border-b mb-5 py-3 px-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="9">
            <Link
              href="/"
              className="flex gap-1 text-green-900 font-semibold items-center"
            >
              <MdFoodBank size={18} />
              {navItems.logo}
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <ul className="flex space-x-6">
      {navItems.navLinks &&
        navItems.navLinks.map((navItem) => {
          const { id, href, title } = navItem;
          return (
            <li key={id}>
              <Link
                href={href}
                className={classNames({
                  "nav-link": true,
                  "!text-zinc-900": href === pathname,
                })}
              >
                {title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return null;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session?.user?.image!}
            referrerPolicy="no-referrer"
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session?.user?.name}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item color="red">
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
