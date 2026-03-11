export default function PostViewSkeleton() {
  return (
    <div className='mx-auto px-6 py-20 max-w-3xl animate-pulse'>
      <header className='mb-10'>
        <div className='bg-foreground/10 mb-10 rounded h-10 sm:h-12 lg:h-14' />

        <div className='flex items-center gap-4 text-sm'>
          <div className='flex items-center gap-4'>
            <div className='bg-accent rounded-full w-10 h-10' />

            <div className='space-y-2'>
              <div className='bg-accent rounded w-28 h-4' />
              <div className='bg-accent rounded w-20 h-3' />
            </div>
          </div>

          <div className='bg-accent rounded-full w-1 h-1' />
          <div className='bg-accent rounded w-24 h-4' />
        </div>
      </header>

      <div className='bg-accent mb-12 rounded-2xl w-full h-55 sm:h-80 lg:h-105' />

      <div className='space-y-4'>
        <div className='bg-accent rounded h-4' />
        <div className='bg-accent rounded h-4' />
        <div className='bg-accent rounded w-3/4 h-4' />
      </div>

      <div className='mt-16'>
        <div className='bg-accent rounded w-40 h-4' />
      </div>
    </div>
  );
}
