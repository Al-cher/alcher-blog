'use client';

import PostCardSkeleton from "@/components/sceletons/PostCardSceletons";
import { Button, buttonVariants } from "@/components/ui/button";
import { useInfinitePosts } from "@/custom-hooks/usePosts";
import { LucideArrowRight, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ArticlesPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfinitePosts({ limit: 3 });
  
  if (status === 'pending') {
    return (
      <div className='w-9/10'>
        <h2 className='font-black text-3xl sm:text-4xl lg:text-5xl text-center'>
          Все публикации
        </h2>
        <PostCardSkeleton/> 
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='flex justify-center items-center gap-4 w-9/10'>
        <p className="font-bold text-xl">Ошибка: Не получается загрузить статьи</p>
      </div>
    );
  }

  const posts = data.pages.flatMap((page) => page.posts) ?? [];

    return (
      <div className='space-y-10 mb-20'>
        <h2 className='font-black text-3xl sm:text-4xl lg:text-5xl text-center'>
          Все публикации
        </h2>
        <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20'>
          {posts.map((post) => {
            return (
              <div
                key={post.id}
                className='group bg-card shadow rounded-xl overflow-hidden transition-transform hover:-translate-y-1 duration-300'
              >
                {post.coverImageURL && (
                  <div className='relative w-full h-48 overflow-hidden'>
                    <Image
                      src={post.coverImageURL}
                      alt={post.title}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                    <div className='absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300' />
                  </div>
                )}
                <div className='space-y-3 p-5'>
                  <time className='text-foreground/60 text-xs'>
                    {new Date(post.createdAt).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </time>
                  <h3 className='font-bold group-hover:text-foreground text-lg leading-snug transition-colors duration-300'>
                    {post.title}
                  </h3>
                  <p className='line-clamp-3 leading-relaxed'>
                    {post.description}
                  </p>
                  <Link
                    href={`/articles/${post.slug}`}
                    className={buttonVariants({ variant: 'outline' })}
                  >
                    Читать <LucideArrowRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        {hasNextPage && (
          <div className='flex justify-center'>
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >{ isFetchingNextPage ? 'Загрузка...' : 'загрузить больше статей' }</Button>
          </div>
        )}
      </div>
    );
}