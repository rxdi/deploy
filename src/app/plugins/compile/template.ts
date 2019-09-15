import { DagModel } from '../../../env.injection.tokens';

export const templateHtml = (
  currentModule: DagModel,
  link: string,
  containerName: string = 'container'
) => `
<!DOCTYPE html>
<div id="meta-rxdi-ipfs-module" style="visibility:hidden;z-index:-10000;position:absolute;">
<!--meta-rxdi-ipfs-module-->
${JSON.stringify(currentModule, null, 2)}
<!--meta-rxdi-ipfs-module-->
</div>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=no"
    />
    <title>@rxdi client side example</title>
    <meta name="theme-color" content="#33383a" />
    <style>
      body {
        margin: 0px;
        padding: 0px;
        color: #f8f8f8;
        font-family: 'Roboto', sans-serif;
        background-color: #1c1f24;
        overflow-y: scroll;
      }
      a {
        color: cornflowerblue;
      }
    </style>
    <base href="/" />
    <!-- iOS -->
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-status-bar-style" content="black" />
    <meta name="mobile-web-app-title" content="Expenses" />
  </head>
  <body>
    <div id="${containerName}"></div>
    <script src="${link}"></script>
  </body>
</html>

`;
