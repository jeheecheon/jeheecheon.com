// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <title>jeheecheon</title>

          {/* Pretendard */}
          <link
            rel="stylesheet"
            as="style"
            crossorigin="anonymous"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
          />
          {assets}
        </head>
        <body class="dark">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
