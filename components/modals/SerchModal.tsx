'use client';

import { useModalStore } from "@/lib/useModalStore";
import Modal from "./Modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const results = [
  {
    id: 1,
    title: 'Актуальные проблемы Next.js в 2026 году',
    slug: 'aktualnye-problemy-nextjs-2026',
  },
  {
    id: 2,
    title: 'Топ-3 упражнения для сидячего образа жизни',
    slug: 'top-3-uprazhneniya-dlya-sidyachego-obrazha-zhizni',
  },
  {
    id: 3,
    title: 'Как развивать креативность каждый день',
    slug: 'kak-razvivat-kreativnost-kazhdyj-den',
  },
];

export default function SearchModal() {
    const { closeSearch, isSearchOpen } = useModalStore();
    return (
      <Modal onClose={closeSearch} isOpen={isSearchOpen}>
            <div className='space-y-4'>
                <h3 className='font-bold'>Поиск статей по ключевым словам:</h3>
                <Input placeholder="Поиск" type="text" className='bg-background w-full placeholder:text-foreground/60' />
            </div>
            <div className='flex-items space-y-2 shadow p-2 rounded-xl divide-y divide-foreground/30 max-h-80 overflow-y-auto'>
                {results.map(result => {
                    return (
                      <button
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