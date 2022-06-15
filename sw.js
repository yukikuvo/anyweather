'use strict';

importScripts('sw-toolbox.js');

toolbox.precache(["index.html","assets/css/index.css","assets/css/list.css","assets/js/index.js","assets/js/list.js","assets/img/cloud.jpg","assets/img/rain.jpg","assets/img/sun.jpg","assets/img/thunder.jpg","background.png","fonts/SFCompactRounded-Regular.otf","fonts/SFCompactRounded-Regular.woff"]);

toolbox.router.get('/images/*', toolbox.cacheFirst);

toolbox.router.get('/*', toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});
