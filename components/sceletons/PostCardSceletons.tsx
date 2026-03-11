export default function PostCardSkeleton() {
  return (
    <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6'>
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className='bg-accent shadow rounded-xl overflow-hidden animate-pulse'
        >
          {/* image skeleton */}
          <div className='bg-foreground/10 w-full h-48' />

          {/* content skeleton */}
          <div className='space-y-6 p-5'>
            <div className='bg-card rounded w-24 h-3' />

            <div className='bg-card rounded w-3/4 h-5' />

            <div className='space-y-2'>
              <div className='bg-card rounded w-full h-4' />
              <div className='bg-card rounded w-full h-4' />
              <div className='bg-card rounded w-full h-4' />
            </div>

            <div className='bg-card rounded w-28 h-4' />
          </div>
        </div>
      ))}
    </div>
  );
}