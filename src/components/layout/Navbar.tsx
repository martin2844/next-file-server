'use client';
import {
  Navbar as NextuiNavbar,
  NavbarBrand,
  Link,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

export default function Navbar({ loggedin }: { loggedin: boolean }) {
  return (
    <NextuiNavbar isBordered isBlurred={false}>
      <NavbarBrand>
        <p className="font-bold text-inherit">FileServer</p>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {!loggedin && <Link href="/api/auth/signin">Login</Link>}
          {loggedin && <p>Logged in as sudo</p>}
        </NavbarItem>
      </NavbarContent>
    </NextuiNavbar>
  );
}
