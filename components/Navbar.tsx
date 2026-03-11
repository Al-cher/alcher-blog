'use client';

import Link from "next/link";
import { navLinks } from "@/lib/navItems";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathName = usePathname();
  const { data: session } = authClient.useSession();

    const isActive = pathName === '/write';

    return (
      <nav>
        <ul className='hidden lg:flex justify-center items-center gap-4 bg-muted shadow-inner px-2 py-1.5 rounded-full'>
          {navLinks.map((link) => {
            const isActive =
              link.url === '/'
                ? pathName === '/'
                : pathName === link.url || pathName.startsWith(link.url + '/');
            return (
              <li key={link.label}>
                <Link
                  href={link.url}
                  className={cn(
                    'flex justify-center items-center shadow-sm px-2 rounded-full h-7',
                    isActive && 'bg-primary',
                    !isActive &&
                      'text-foreground/80 hover:bg-background transition-colors duration-300',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          {session && (
            <li>
              <Link
                href='/write'
                className={cn(
                  'flex justify-center items-center shadow-sm px-2 rounded-full h-7 whitespace-nowrap',
                  isActive && 'bg-primary text-foreground/80',
                  !isActive &&
                    'text-foreground/80 hover:bg-card transition-colors duration-300',
                )}
              >
                Создать блог
              </Link>
            </li>
          )}
        </ul>
        <MobileNav />
      </nav>
    );
}