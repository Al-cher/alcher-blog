'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='mt-24 border border-t'>
      <div className='flex sm:flex-row flex-col justify-between items-center gap-4 mx-auto px-6 py-10 max-w-7xl'>
        <p className='text-foreground/50 text-sm'>
          &copy; {new Date().getFullYear()} AlcherBlog. All righst reserved
        </p>

        <div className='flex items-center gap-6 text-sm'>
          <Link
            href='/'
            className='text-foreground/50 hover:text-foreground/80 transition-colors'
          >
            Главная
          </Link>
          <Link
            href='/about'
            className='text-foreground/50 hover:text-foreground/80 transition-colors'
          >
            О нас
          </Link>
          <Link
            href='/articles'
            className='text-foreground/50 hover:text-foreground/80 transition-colors'
          >
            Статьи
          </Link>
        </div>
      </div>
    </footer>
  );
}
