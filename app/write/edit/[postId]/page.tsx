'use client';
import EditPageSkeleton from '@/components/sceletons/EditPageSkeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

export default function EditPage() {
      const editor = useRef(null);
      const [content, setContent] = useState('');
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [coverImage, setCoverImage] = useState<null | File>(null);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [previewImage, setPreviewImage] = useState('');
      const [loading, setLoading] = useState(true);
      const { postId } = useParams();
    const router = useRouter();

      const config = useMemo(
        () => ({
          placeholder: 'Start writing your article...',
        }),
        [],
    );
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        if (!title || !description || !content) {
          toast.warning('Удаление публикации было успешным!', {
            position: 'top-center',
          });
          return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
          formData.append('content', content);
          
        if (coverImage) {
          formData.append('coverImage', coverImage);
        }

        const response = await axios.patch(`/api/posts/${postId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success('Статья успешно обновлена!', {
          position: 'top-center',
        });

        const slug = response.data.slug;

        router.replace(`/articles/${slug}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.error, {
              position: 'top-center',
            });
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const { data } = await axios.get(`/api/posts/${postId}`);

          setTitle(data.title);
          setContent(data.content);
          setDescription(data.description);
          setPreviewImage(data.coverImageURL);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('AXIOS_ERROR:', error.response?.data);
            alert(error.response?.data?.error || 'Failed to load post');
          } else {
            console.error('UNKNOWN_ERROR:', error);
            alert('An unexpected error occurred');
          }
        } finally {
          setLoading(false);
        }
      };

      if (postId) {
        fetchPost();
      }
    }, [postId]);

    if (loading) return <EditPageSkeleton />;
    
    return (
      <section className='mx-auto px-6 py-20 max-w-3xl'>
        <h2 className='mb-10 font-bold text-3xl'>Редактируйте свою статью</h2>
        <form
          className='space-y-2 bg-accent/10 shadow p-6 rounded-2xl'
          onSubmit={handleSubmit}
        >
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
                <div className='my-8'>
                    <Image src={previewImage} alt='превью изображения' width={300} height={300} className='object-cover' />
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
            <Button>{isSubmitting ? 'Обновление...' : 'Обновить'}</Button>
          </div>
        </form>
      </section>
    );
}
