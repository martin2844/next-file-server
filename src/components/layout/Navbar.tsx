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
        <Link href="/" className="text-white">
          <p className="font-bold text-inherit">FileServer</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {loggedin && (
          <>
            <NavbarItem>
              <Link href="/create">Create Link</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/user-files">User Files</Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {!loggedin && <Link href="/api/auth/signin">Login</Link>}
          {loggedin && <p>Logged in as sudo</p>}
        </NavbarItem>
      </NavbarContent>
    </NextuiNavbar>
  );
}
