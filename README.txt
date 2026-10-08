ABHI SHAYRANA HAI DIL — WEBSITE
61 pages · 52 songs · you own every file.

WHERE THE SITE ACTUALLY LIVES
abhishayranahaidil.com is served by GitHub Pages, from the repository
  github.com/abhishayranahaidil/abhishayranahaidil-website
(The repo's github.io address 302-redirects to the custom domain — that
is GitHub Pages behaviour, and it is how we know.) IONOS only points
the DNS; it does not serve the files.

So: to publish, you upload to that repo. Nothing else needs doing.
Changes go live in a minute or two.

TWO FILES THAT MUST NOT BE DELETED
1. CNAME — contains "abhishayranahaidil.com". Remove it and GitHub Pages
   drops the custom domain and the site goes dark. It must stay at the
   top level of the repo.
2. 404.html — GitHub Pages uses this for any bad address. (.htaccess
   cannot do it there; see below.)

ABOUT .htaccess
It is included, but GitHub Pages ignores it completely. It only matters
if you ever move to IONOS hosting proper. Clean links like
/mere-vatan work on GitHub Pages anyway, because Pages serves
/mere-vatan from mere-vatan.html by its own convention.
This is why /poems is a real page (poems.html) that forwards to /book,
rather than an .htaccess redirect — a redirect rule would not fire.

OLD REPO — DELETE OR ARCHIVE IT
github.com/absri1/shayrana is a July snapshot of the first draft. It has
no assets folder, no songs-data.js, three wrong YouTube IDs, a
"Cambridge, UK" line and a dead info@abhishayrana.com address. It serves
nothing. Keeping it risks someone restoring from it one day.

ADDING A SONG — no help needed
1. Open add-song.html.
2. Fill the form, press "Build the files".
3. Paste the one-line block into songs-data.js after  window.SONGS = [
4. Download the song page it gives you and upload it.
The catalogue, filters, counts and title band update themselves.

COUNTS
Headline text says "50+" songs and "800+" poems on purpose so it does
not go stale between releases. The mood tiles show real per-category
numbers, counted from the data at page load.
