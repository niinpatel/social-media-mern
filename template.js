export default ({markup, css}) => {
    return `<!doctype html>
      <html lang="en">
          <head>
             <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
             <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
             <meta charset="utf-8">
             <title>MERN Skeleton</title>
          </head>
          <body>
            <div id="root">${markup}</div>
            <style id="jss-server-side">${css}</style>
            <script src="/dist/bundle.js"></script>
          </body>
      </html>`
}
