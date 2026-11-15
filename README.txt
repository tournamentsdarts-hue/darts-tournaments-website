DTA WEBSITE UPDATE — FLYERS + TOURNAMENT RESULTS

Upload these files to the root of the existing GitHub repository, replacing files with the same names. Keep the assets folder. This package preserves R2 flyer routes and adds complete results management.

Admin: choose a tournament, enter one player per line, save. A delete button appears only when saved results exist; deletion asks for confirmation. Public results are grouped by tournament on the home page.

Cloudflare bindings required: D1 DB and R2 BUCKET. Existing ADMIN_USERNAME and ADMIN_PASSWORD secrets remain unchanged. Results table is created automatically.
