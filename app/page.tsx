import RecentPosts from "@/components/RecentPosts";
import PostCardSkeleton from "@/components/sceletons/PostCardSceletons";
import { buttonVariants } from "@/components/ui/button";
import { LucideArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className=''>
      <h1 className='text-foreground/70 text-3xl lg:text-5xl xl:text-7xl text-center leading-snug lg:leading-tight xl:leading-tight tracking-wide'>
        <span className='font-bold'>AlcherBlog</span> <br /> Мысли, истории и
        идеи обо всём, что интересно
      </h1>
      <div className='py-12 lg:py-24'>
        <div className='items-center gap-10 lg:gap-16 grid grid-cols-1 lg:grid-cols-2'>
          <div className='relative'>
            <Image
              src='/images/01.jpg'
              alt='изображение, о нас'
              width={600}
              height={600}
              className='shadow rounded-2xl'
            />
            <div className='-z-10 absolute -inset-4 bg-primary/50 blur-3xl' />
          </div>
          <div className='max-w-xl'>
            <span className='text-primary text-sm uppercase tracking-widest'>
              о нас
            </span>
            <h3 className='mt-3 font-semibold text-foreground/80 text-2xl lg:text-3xl xl:text-4xl tracking-tight'>
              Пространство для идей, мыслей и историй
            </h3>

            <p className='mt-6 leading-relaxed'>
              Этот блог — место, где люди делятся своими мыслями, опытом и
              идеями. Здесь можно рассказать свою историю, обсудить интересные
              темы и найти вдохновение в словах других. Если вам есть что
              сказать миру — присоединяйтесь и станьте частью этого
              пространства.
            </p>
            <div className='mt-10'>
              <Link href='/about' className={buttonVariants()}>
                Узнать больше
                <LucideArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<PostCardSkeleton />}>
      <RecentPosts />
      </Suspense>
    </div>
  );
}
