/** @jsxImportSource frog/jsx */
import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { pinata } from "frog/hubs";
import getFrameData from "@/utils/supabase/read/getFrameData";

const app = new Frog({
  title: "Memecast",
  assetsPath: "/",
  basePath: "/api",
  hub: pinata(),
  imageOptions: {
    fonts: [{ name: "Krona One", source: "google" }],
  },
});
app.composerAction(
  "/composer",
  (c) => {
    return c.res({
      title: "Memecast",
      url: "https://meme-cast.vercel.app/",
    });
  },
  {
    name: "Memecast Composer action",
    description: "On-chain standard for memes in Farcaster",
    icon: "image",
    imageUrl: "https://meme-cast.vercel.app/logo-two.png",
  }
);

app.frame("/meme/:id", async (c) => {
  const params = c.req.param();
  const memeId = params["id"];
  const meme = await getFrameData(memeId);
  return c.res({
    image: (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="https://picsum.photos/400/200"
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            display: "flex",
            alignItems: "center",
            padding: "5px 10px",
            borderRadius: "5px",
            color: "white",
            fontSize: "14px",
          }}
        >
          Created by
          <img
            src="https://picsum.photos/200/200"
            style={{
              marginLeft: "5px",
              borderRadius: "50%",
            }}
            alt="Profile Icon"
            width={20}
            height={20}
          />
          <span style={{ marginLeft: "5px" }}>Profile Name</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            display: "flex",
            alignItems: "center",
            padding: "5px 10px",
            borderRadius: "5px",
            color: "white",
            fontSize: "14px",
          }}
        >
          <img
            src="https://meme-cast.vercel.app/logo-two.png"
            style={{
              marginLeft: "5px",
              borderRadius: "50%",
            }}
            alt="Profile Icon"
            width={20}
            height={20}
          />
        </div>
      </div>
    ),
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
