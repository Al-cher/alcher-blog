'use client';

import { LogOut, Search, SquareArrowRightEnter, SunMoon } from 'lucide-react';
import Logo from './Logo';
import Navbar from './Navbar';
import { Button, buttonVariants } from './ui/button';
import { useModalStore } from '@/lib/useModalStore';
import { authClient } from '@/lib/auth-client';

export default function Header() {
  const { openSignIn, openSearch } = useModalStore();
  const { data: session, isPending } = authClient.useSession();

  const handleLogOut = async () => {
    await authClient.signOut();
  }

  return (
    <header className='top-0 left-0 z-50 fixed backdrop-blur-md backdrop-saturate-50 w-full h-18'>
      <div className='flex justify-between items-center mx-auto w-9/10 h-full'>
        <Logo />
        <Navbar />
        <div className='flex items-center gap-4'>
          <Button
            onClick={openSearch}
            className={buttonVariants({ variant: 'outline' })}
          >
            <Search />
            Поиск
          </Button>
          <SunMoon />
        </div>
        {!isPending && (
          <>
            {session ? (
              <Button
                variant='destructive'
                className='group rounded-full'
                onClick={handleLogOut}
              >
                <LogOut />
                <span className='hidden md:inline text-destructive group-hover:text-background/80 transition-colors duration-300'>Выйти</span>
              </Button>
            ) : (
              <Button className='rounded-full' onClick={openSignIn}>
                <SquareArrowRightEnter />
                <span className='hidden md:inline'>Войти</span>
              </Button>
            )}
          </>
        )}
      </div>
    </header>
  );
}
