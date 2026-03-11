'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Hamburger } from 'lucide-react';
import { navLinks } from '@/lib/navItems';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';

export default function MobileNav() {
  const pathName = usePathname();
  const isActive = pathName === '/write';
  const { data: session } = authClient.useSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='lg:hidden flex rounded-full cursor-pointer'
        >
          <Hamburger />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup className='space-y-2'>
          {navLinks.map((link) => {
            const isActive =
              link.url === '/'
                ? pathName === '/'
                : pathName === link.url || pathName.startsWith(link.url + '/');
            return (
              <DropdownMenuItem key={link.label} asChild>
                <Link
                  href={link.url}
                  className={cn(
                    'cursor-pointer',
                    isActive && 'bg-primary text-background',
                    !isActive &&
                      'text-foreground/80 hover:bg-primary transition-colors duration-300',
                  )}
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <>
            {session && (
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link
                  href='/write'
                  className={cn(
                    'flex justify-center items-center px-2 rounded-full h-7 whitespace-nowrap',
                    isActive && 'bg-primary text-background',
                    !isActive &&
                      'text-foreground/80 hover:text-background hover:bg-primary transition-colors duration-300',
                  )}
                >
                  Создать блог
                </Link>
              </DropdownMenuItem>
            )}
          </>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
