import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className='mx-auto mb-20 w-full'>
      <h2 className='mb-5 font-black text-3xl sm:text-4xl lg:text-5xl text-center'>
        Добро пожаловать в пространство идей
      </h2>
      <p className='mb-20 text-center leading-relaxed'>
        Место, где мысли превращаются в истории, а опыт — в вдохновение
      </p>
      <div className='space-y-14'>
        <div className='items-center gap-10 grid grid-cols-1 md:grid-cols-2'>
          <Image
            src='/images/01.jpg'
            alt='Изображение об alcherblog'
            width={600}
            height={600}
            className='rounded-2xl object-cover'
          />
          <div>
            <h3 className='mb-4 font-bold text-2xl'>Здесь интересно</h3>
            <div className='space-y-4 leading-relaxed'>
              <p>
                Наш блог создан как открытое пространство для идей, мыслей и
                историй. Здесь каждый может поделиться своим опытом, рассказать
                о том, что его вдохновляет, волнует или заставляет задуматься.
              </p>

              <p>
                Мы верим, что слова способны объединять людей, помогать находить
                новые взгляды на привычные вещи и вдохновлять на перемены.
              </p>

              <p>
                На страницах блога вы найдёте размышления о технологиях, жизни,
                работе, развитии и многом другом. Это место для обсуждений,
                обмена опытом и поиска новых идей.
              </p>
            </div>
          </div>
        </div>
        <div className='bg-accent shadow mx-auto p-8 border rounded-2xl w-full md:w-8/10'>
          <h3 className='mb-4 font-bold text-2xl'>О чём мы пишем</h3>

          <ul className='space-y-3'>
            <li>• Мысли, идеи и личные истории людей</li>
            <li>• Размышления о технологиях, развитии и работе</li>
            <li>• Опыт, которым хочется поделиться с другими</li>
            <li>• Вдохновение, новые взгляды и интересные обсуждения</li>
          </ul>
        </div>
        <div className='text-center'>
          <h3 className='mb-4 font-bold text-2xl'>
            Пространство для идей и историй
          </h3>

          <p className='mx-auto mb-8 max-w-2xl leading-relaxed'>
            Этот блог создан для тех, кто любит делиться мыслями, опытом и
            вдохновением. Здесь можно рассказать свою историю, обсудить
            интересные темы и найти новые идеи в словах других людей.
          </p>

          <Link
            href='/articles'
            className={buttonVariants()}
          >
            Читать статьи
          </Link>
        </div>
      </div>
    </div>
  );
}
