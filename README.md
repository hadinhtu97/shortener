# Shortener

## Description
Backend APIs store url and make it shorter

## Use
```
git clone https://github.com/hadinhtu97/shortener
cd shortener
npm install
npm run start
```

## API
* GET
  * `[]/api/shorturl/[short_url]` : When you visit `/api/shorturl/<short_url>`, you will be redirected to the original URL.
* POST
  * `[]/api/shorturl/new` : You can POST a `url` to `/api/shorturl/new` and get a JSON response with `original_url` and `short_url` properties. Here's an example: { original_url : 'https://google.com', short_url : 1}
