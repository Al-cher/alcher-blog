import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href='/'
      className='group font-black text-foreground/80 hover:text-primary text-xl md:text-2xl lg:text-3xl transition-colors duration-300'
    >
      Alcher<span className='text-primary group-hover:text-foreground/80 transition-colors duration-300'>Blog</span>
    </Link>
  );
}
