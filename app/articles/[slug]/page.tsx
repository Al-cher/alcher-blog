import BlogView from '@/components/BlogView';
import PostViewSkeleton from '@/components/sceletons/PostViewSceleton';
import { getPostBySlug } from '@/server-actions/getPost';
import { Suspense } from 'react';

export default async function PostViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const postPromise = getPostBySlug(slug);
  return (
    <Suspense fallback={<PostViewSkeleton />}>
      <BlogView postPromise={postPromise} />
    </Suspense>
  );
}
