import { FC, ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { ThemeStorage } from '../services';
import type { Theme } from '../types';
import { setBodyClassToDarkTheme } from '../utils';
import Utterances from './Utterances';

const name = 'Jebong Park';
export const siteTitle = 'Next.js Sample Website';

interface LayoutProps {
  children: ReactNode;
  home?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, home }) => {
  const [theme, setTheme] = useState<Theme>(() => ThemeStorage.get());

  useEffect(() => {
    theme === 'dark' ? setBodyClassToDarkTheme.set() : setBodyClassToDarkTheme.remove();
  }, [theme]);

  const handleClick = () => {
    if (theme === 'dark') {
      ThemeStorage.set('light');
      setTheme('light');
    } else {
      ThemeStorage.set('dark');
      setTheme('dark');
    }
  };

  return (
    <div className="bg-white dark:bg-black text-gray-800 dark:text-gray-200 min-h-screen h-full ">
      <div className="max-w-xl px-4 py-12 mt-0 mx-auto">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Learn how to build a personal website using Next.js" />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <button className="w-12 px-2" onClick={handleClick}>
          {theme === 'light' ? (
            <Image src="/svgs/dark-mode.svg" alt="theme" width={32} height={32} />
          ) : (
            <Image src="/svgs/light-mode.svg" alt="theme" width={32} height={32} />
          )}
        </button>
        <header className="flex flex-col items-center">
          {home ? (
            <>
              <Image priority src="/images/profile.jpg" height={144} width={144} alt="" />
              <h1>{name}</h1>
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <Image priority src="/images/profile.jpg" height={108} width={108} alt="" />
                </a>
              </Link>
              <h2>
                <Link href="/">
                  <a>{name}</a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <>
            <Utterances />
            <div className="mt-12 mx-0 mb-0">
              <Link href="/">
                <a>← Back to home</a>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
