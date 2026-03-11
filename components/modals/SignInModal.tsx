'use client';

import { useModalStore } from "@/lib/useModalStore";
import Modal from "./Modal";
import { Button } from "../ui/button";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function SignInModal() {
  const { isSignInOpen, closeSignIn } = useModalStore();

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: 'google'
    })
  };

   const signInWithGithub = async () => {
     await authClient.signIn.social({
       provider: 'github',
     });
   };


    return (
      <Modal onClose={closeSignIn} isOpen={isSignInOpen}>
        <p className='font-semibold text-xl'>Вход</p>
        <p className='mb-5 text-sm'>
          Войдите через одного из предложенных провайдеров
        </p>
        <div className='space-y-2'>
          <Button
            variant='outline'
            className='w-full'
            onClick={signInWithGoogle}
          >
            <Image
              src='/images/google.png'
              alt='google'
              width={24}
              height={24}
            />
            Войти с помощью google
          </Button>
          <Button variant='outline' className='w-full' onClick={signInWithGithub}>
            <Image src='/images/git.png' alt='github' width={24} height={24} />
            Войти с помощью Github
          </Button>
        </div>
        <p className='mt-8 text-foreground/60 text-xs text-center'>
          Продолжая, вы принимаете наши Условия и Политику конфиденциальности
        </p>
      </Modal>
    );
}