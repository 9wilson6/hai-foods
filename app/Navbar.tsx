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
  const pathname = usePathname();

  const { status, data: session } = useSession();

  return (
    <nav className="border-b mb-5 py-3 px-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="4">
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user?.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user?.name}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item color="red">
                    <Link href="/api/auth/signout">Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}

            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}
