export interface BlogViewProps {
  postPromise: Promise<{
    id: string;
    title: string;
    content: string;
    description: string;
    createdAt: string | Date;
    slug: string;
    coverImageURL: string;
    author: {
      id: string;
      name: string;
      image: string | null;
    };
  } | null>;
}

