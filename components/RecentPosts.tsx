import { LucideArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Post } from "@/types/post";

const baseUrl = 'https://alcher-blog-delta.vercel.app/';

export default async function RecentPosts() {
   const res = await fetch(`${baseUrl}/api/posts/recent`, {
     cache: 'no-store',
   });
    if (!res.ok) {
      throw new Error('Failed to fetch recent posts');
  }
   const { posts }: { posts: Post[] } = await res.json();
    return (
      <div className='space-y-2 mb-10'>
        <h2 className='sm:text-2xl md:text-3xl'>Недавние посты</h2>

        <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
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
                    {
                      new Date(post.createdAt).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    }
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
      </div>
    );
}