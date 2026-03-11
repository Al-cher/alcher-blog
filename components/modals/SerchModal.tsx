'use client';

import { useModalStore } from "@/lib/useModalStore";
import Modal from "./Modal";
import { Input } from "../ui/input";

import { searchPosts } from "@/services/post";
import { useState } from "react";
import { useDebounce } from "@/custom-hooks/usePosts";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/post";
import { Frown, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchModal() {
  const { closeSearch, isSearchOpen } = useModalStore();
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 400);
  const router = useRouter();
  
  const {
    data: results = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['search-posts', debouncedQuery],
    queryFn: () => searchPosts(debouncedQuery),
    enabled: debouncedQuery.length > 1, //prevent useless requests
  });

  const handleNavigate = (slug: string) => {
    router.push(`/articles/${slug}`);
    closeSearch();
    setQuery('');
  };
    return (
      <Modal onClose={closeSearch} isOpen={isSearchOpen}>
        <div className='space-y-4'>
          <h3 className='font-bold'>Поиск статей по ключевым словам:</h3>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Поиск'
            type='text'
            className='bg-background w-full placeholder:text-foreground/60'
          />
        </div>
        <div className='flex-items space-y-2 shadow p-2 rounded-xl divide-y divide-foreground/30 max-h-80 overflow-y-auto'>
          {(isLoading || isFetching) && (
            <div className='flex items-center gap-4 px-4 py-3 text-foreground/80 text-sm'>
              <Loader className='animate-spin' />
              Поиск...
            </div>
          )}
          {!isLoading && debouncedQuery && results.length === 0 && (
            <div className='flex items-center gap-4 px-4 py-3 text-foreground/80 text-sm'>
              <Frown />
              Результатов не найдено.
            </div>
          )}
          {results.map((result: Post) => {
            return (
              <button
                onClick={() => handleNavigate(result.slug)}
                key={result.id}
                className='hover:bg-background px-4 py-3 rounded-md w-full text-foreground/80 hover:text-foreground text-left truncate transition cursor-pointer'
              >
                {result.title}
              </button>
            );
          })}
        </div>
      </Modal>
    );
}