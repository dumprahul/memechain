/** @jsxImportSource frog/jsx */
import { Frog } from 'frog';
import { devtools } from 'frog/dev';
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';

const app = new Frog({
  title: 'Memecast',
  assetsPath: '/',
  basePath: '/api',
  imageOptions: {
    fonts: [{ name: 'Krona One', source: 'google' }]
  }
});
app.composerAction(
  '/composer',
  (c) => {
    return c.res({
      title: 'Memecast',
      url: 'https://meme-cast.vercel.app/'
    });
  },
  {
    name: 'Memecast Composer action',
    description: 'On-chain standard for memes in Farcaster',
    icon: 'image',
    imageUrl: 'https://meme-cast.vercel.app/logo-two.png'
  }
);

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
