'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';

import axios from 'axios';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

export default function WritePage() {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<null | File>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();

  const config = useMemo(
    () => ({
      placeholder: 'Начните создавать вашу статью',
      theme: theme || 'light',
    }),
    [theme],
  );

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!title || !description || !content || !coverImage) {
        toast.warning('Все поля должны быть заполнены', {
          position: 'top-center',
        });
        return;
      }

      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('content', content);
      formData.append('coverImage', coverImage);

      await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setContent('');
      setTitle('');
      setDescription('');
      setCoverImage(null);

      toast.success('Блог создан!', {
        position: 'top-center',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.warning(error.response?.data.error, {
          position: 'top-center',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className='mx-auto px-6 max-w-3xl'>
      <h3 className='mb-10 font-bold text-3xl text-center'>
        Поделитесь своей историей
      </h3>

      <form className='space-y-2 bg-accent/10 shadow p-6 rounded-2xl' onSubmit={handleSubmit}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Заголовок'
          className='bg-background font-main font-bold text-foreground/80 placeholder:text-foreground/60'
        />

        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Краткое описание'
          className='bg-background placeholder:text-foreground/60'
        />
        <div className='space-y-2 mb-10 pt-10'>
          <Label className='font-bold text-foreground/80'>
            Вставьте изображение
          </Label>
          <input
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            type='file'
            accept='image/*'
            className='bg-background hover:file:bg-primary shadow file:mr-4 px-3 file:px-4 py-2 file:py-2 rounded-md file:rounded-full w-full text-foreground/80 file:text-accent file:transition-colors file:duration-300 file:bg-accent-foreground cursor-pointer'
          />
        </div>
        <div className='mb-10 border rounded-2xl overflow-hidden'>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <div className='flex justify-end'>
          <Button>{ isSubmitting ? 'Публикация...' : 'Опубликовать' }</Button>
        </div>
      </form>
    </section>
  );
}
