/** @jsxImportSource frog/jsx */
import { Frog } from 'frog';
import { devtools } from 'frog/dev';
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';

const app = new Frog({
  title: 'Dropfify',
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
      url: 'https://memecast.vercel.app/'
    });
  },
  {
    name: 'Memecast Composer action',
    description: 'On-chain standard for memes in Farcaster',
    icon: 'image',
    imageUrl: 'https://memecast.vercel.app/logo-two.png'
  }
);

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
