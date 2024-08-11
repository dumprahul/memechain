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
  if(meme.success==false)
    return c.res({ image: (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: '#000',
        }}
      >
     <p style={{
      color: "#fff"
     }}>Meme not Found</p>
      </div>
    ),})
    else
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
          src={meme.data.image}
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
            fontSize: "18px",
          }}
        >
          Created by
          <img
            src={meme.data.created_by.image}
            style={{
              marginLeft: "8px",
              borderRadius: "50%",
            }}
            alt="Profile Icon"
            width={30}
            height={30}
          />
          <span style={{ marginLeft: "8px" }}>{meme.data.created_by.name}</span>
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
            width={40}
            height={40}
          />
        </div>
      </div>
    ),
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
