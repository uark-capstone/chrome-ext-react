1) Clone repo
2) npm install
3) npm run build
4) Go to chrome://extensions/
5) Turn on developer mode in top right
6) Load unpacked -> extension folder -> build 
7) should all be good, now try and click extension pic

``` bash
    # Will run using URLs for live backend & pinned-tab
    npm run start-live # run not as extension
    npm run build-live # as extension
```


create a .env file in the folder  and add: INLINE_RUNTIME_CHUNK=false