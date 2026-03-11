'use client';

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

import { BlogViewProps } from '@/types/blogViewPost';
import { ArrowBigLeft, Pencil } from 'lucide-react';
import { buttonVariants } from './ui/button';
import DeletePost from './DeletePost';

export default function BlogView({ postPromise }: BlogViewProps) {
      const post = use(postPromise);
      const { data: session } = authClient.useSession();
    const userId = session?.user.id;
    
    return (
      <article className='mx-auto px-6 max-w-3xl'>
        <header className='mb-10'>
          <h1 className='mb-4 font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight'>
            {post?.title}
          </h1>
          <div className='flex items-center gap-4 text-sm'>
            <div className='relative rounded-full w-10 h-10 overflow-hidden'>
              <Image
                src={post?.author.image || ''}
                alt='author-image'
                className='object-cover'
                fill
              />
            </div>
            <span>{post?.author.name}</span>
            <span>•</span>
            <span>
              {new Date(post?.createdAt as string).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </header>
        <div className='relative mb-12 w-full h-55 sm:h-80 lg:h-105'>
          <Image
            src={post?.coverImageURL || ''}
            alt='cover-image'
            className='rounded-2xl object-cover'
            fill
          />
        </div>

        {post?.content && (
          <div
            className='max-w-none text-foreground/80 leading-relaxed tracking-wide blog-post'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        <div className='shadow my-16' />

        {userId === post?.author.id && (
          <div className='flex justify-end items-center gap-2'>
            <Link
              href={`/write/edit/${post?.id}`}
              className={buttonVariants({variant: 'outline'})}
            >
              <Pencil />
              Редактировать
            </Link>
            {post?.id && <DeletePost postId={post?.id} />}
          </div>
        )}

        <div className='mt-16'>
          <Link
            href='/articles'
            className={buttonVariants({variant: 'outline'})}
          >
                    <ArrowBigLeft />
                    К публикациям
          </Link>
        </div>
      </article>
    );
}