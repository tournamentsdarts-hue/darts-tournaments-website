DARTS TOURNAMENTS REGION ALICANTE — ADMIN ENABLED PACKAGE

This package adds a Cloudflare Pages Advanced Mode Worker and an /admin page.
It keeps the existing public website and event links, and adds database-backed event management.

FILES
- index.html, styles.css, script.js, assets/logo.png: existing website
- _worker.js: Cloudflare Pages Worker/API
- admin.html: password-protected admin page at /admin
- README.txt: setup guide

IMPORTANT: The D1 database and tables have already been created in your Cloudflare account.
Do NOT run the original CREATE TABLE SQL again.

DEPLOY
1. In Cloudflare, open Workers & Pages > delicate-fire-97c6.
2. Click New deployment.
3. Upload this ZIP (or extract it and upload the files/folder if the screen asks for a folder).
4. Deploy to Production only when the upload preview shows index.html, _worker.js, admin.html, script.js, styles.css and assets/logo.png.
5. Wait for deployment to complete. Your existing domain remains attached to the project.

CONNECT D1
1. Open the project > Settings > Bindings.
2. Add a D1 Database binding.
3. Variable name must be exactly: DB
4. Select the existing database: darts-tournaments
5. Save and redeploy if Cloudflare asks.

SET LOGIN SECRETS
1. Project > Settings > Variables and Secrets.
2. Add secret (not plain text variable) ADMIN_USERNAME with value: admin
3. Add secret ADMIN_PASSWORD with a strong, unique password of your choice. Do not send it in chat.
4. Save and redeploy if Cloudflare asks.

TEST
1. Open https://dartstournaments.eu/api/events — should show JSON with the four current tournaments.
2. Open https://dartstournaments.eu/admin — login with username admin and your chosen password.
3. Add/edit/hide/delete a test event. Published events appear on the public site. Hidden events are not shown.
4. Keep your password private. The login cookie is HttpOnly, Secure and SameSite=Strict.

CURRENT ADMIN FEATURES
- Add, edit, publish/hide and delete tournaments\n- Enter a complete tournament finishing order (one player per line) in the admin area\n- Public results section displays saved standings automatically\n- Results table is created automatically in D1 on the first API request
- Set venue, date, time, registrations, entry fee, format and registration URL
- Public tournament cards/calendar load published events from D1
- If the API/database is not yet connected, the website still displays the original four event cards.

NOT INCLUDED YET
- Photo upload/gallery management and results/rankings management are not included in this first admin version. Those require additional storage/data fields and can be added after the login and event management are working.

TROUBLESHOOTING
- If /api/events says the DB binding is missing, check Settings > Bindings and confirm the variable name is DB.
- If /admin says secrets are missing, check ADMIN_USERNAME and ADMIN_PASSWORD under Variables and Secrets.
- If deployment does not activate the Worker, confirm _worker.js is at the top level of the uploaded project, not inside a nested folder.
