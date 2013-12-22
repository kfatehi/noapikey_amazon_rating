noapikey_amazon_rating
======================

Amazon product rating API

## Why?

Amazon doesn't give us an API for retrieving product ratings.
Often while browsing other websites I need to copy paste the product
name and input that into Amazon in order to know the rating.

I understand why Amazon doesn't enable such an API -- if you're on
Amazon's site, you're more likely to buy the thing with One-Click,
so here's my solution.

When searching github I noticed some other similar things, when you
query for "amazon reviews" you get about 3 pages of repositories; many
of these used an API key whereas I think in this case being
anonymous/using no API key is better -- in any case for getting ratings
data there is no API access anyway.

## Userscripts

Comes with a Frys.com userscript that makes use of the API/service

## API Usage Example

### Search Amazon

  I had to add this first before I could get to the ratings data, as I
decided to scrape the mobile site rather than the full site (~2 seconds
faster)

```bash
time curl localhost:1337/amazon/search/Blueair%20403%20HepaSilent%20Air-Purification%20System
[
  {
    "name": "Blueair 403 HepaSilent Air-Purification System",
    "price": "$549.00",
    "url": "http://www.amazon.com/gp/aw/d/B002A9JHBM/ref=mp_s_a_1_1/192-6657742-1570763?qid=1387685779&sr=8-1"
  },
  {
    "name": "Blueair 503 HepaSilent Air-Purification System",
    "price": "$659.00",
    "url": "http://www.amazon.com/gp/aw/d/B002A9JHBW/ref=mp_s_a_1_2/192-6657742-1570763?qid=1387685779&sr=8-2"
  },
  {
    "name": "Blueair 203W HepaSilent Air-Purification System, White",
    "price": "$329.00",
    "url": "http://www.amazon.com/gp/aw/d/B002A9JHB2/ref=mp_s_a_1_3/192-6657742-1570763?qid=1387685779&sr=8-3"
  },
  {
    "name": "Blueair 450E HepaSilent Digital Air-Purification System",
    "price": "$629.00",
    "url": "http://www.amazon.com/gp/aw/d/B001FOG3Q0/ref=mp_s_a_1_4/192-6657742-1570763?qid=1387685779&sr=8-4"
  },
  {
    "name": "Blueair 403 Air Purification System",
    "price": "$499.95",
    "url": "http://www.amazon.com/gp/aw/d/B0000668C1/ref=mp_s_a_1_5/192-6657742-1570763?qid=1387685779&sr=8-5"
  }
]curl   0.01s user 0.01s system 1% cpu 1.170 total
```

### Get Product Rating

This one uses the Search method above internally and returns the first result
except with more product data, specifically rating data. This means it
takes two requests to Amazon to complete. As you can see this is around
~1.7 seconds on my machine. I have seen it anywhere from 1.2 to 2.2
seconds.

```bash
$ time curl localhost:1337/amazon/rating/Blueair%20403%20HepaSilent%20Air-Purification%20System
{
  "name": "Blueair 403 HepaSilent Air-Purification System",
  "price": "$549.00",
  "url": "http://www.amazon.com/gp/aw/d/B002A9JHBM/ref=mp_s_a_1_1/188-6919283-5895133?qid=1387685585&sr=8-1",
  "rating": [
    4.5,
    5
  ],
  "ratingPercent": 90
}curl   0.00s user 0.00s system 0% cpu 1.721 total
```

## Thanks

shouts to the FOSS works that made this easy to build quickly

* nodejs
* express
* jsdom
* jquery
* sizzle
