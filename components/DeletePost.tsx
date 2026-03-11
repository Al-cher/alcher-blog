import { useDeletePost } from '@/custom-hooks/usePosts';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';


export default function DeletePost({ postId }: { postId: string }) {
  const { mutate: deletePostMutation, isPending } = useDeletePost();

  const handleDelete = () => {
    const confirmed = confirm('Вы уверены что хотите удалить эту статью?');

    if (confirmed) {
      deletePostMutation(postId, {
        onSuccess: () => {
          toast.success('Удаление публикации было успешным!', {
            position: 'top-center',
          });
        },
      });
    }
  };
  return (
    <Button
      variant='destructive'
      onClick={handleDelete}
      disabled={isPending}
      type='button'
    >
      <Trash2Icon />
      Удалить
    </Button>
  );
}
