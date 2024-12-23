## currently article_url is a unique key so, one article can be stored only once no matter if you change its parent collection

## to-do:

|                needed                |                             not needed                             |
| :----------------------------------: | :----------------------------------------------------------------: |
|   email verification before login    | global news coverage + may be in profile settings add this options |
| same article in different collection |                         profile pic upload                         |
|   different collections name input   |                   delete account btn activation                    |
|          forms .py optimise          |                                 --                                 |
|             summary \*\*             |                                 --                                 |

## the news categories shall be updated dynamically based on the newspaper.

while scraping i think the .textContent will also work instead of merging all <p> tags,
because if i select all text from a larger div i will get evry thing about the news,
execpt the ads though,

## increase timeout

```bash

gunicorn run:app --bind 192.168.131.238:8000 --timeout 120

```

## add logging

```bash

gunicorn run:app --bind 192.168.131.238:8000 --log-level debug

```

web: gunicorn run:app --workers 4 --threads 3
