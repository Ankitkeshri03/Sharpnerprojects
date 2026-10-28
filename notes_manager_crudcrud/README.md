# Notes Manager (HTML, CSS, JavaScript + CRUDCRUD)

## Features
- Add notes with title, description, and optional reminder date
- Fetch notes from CRUDCRUD when the page opens
- Keep notes after refreshing the page (server-side persistence)
- Search notes by title (case-insensitive, live filtering)
- Delete notes from CRUDCRUD and remove them from the screen
- Responsive layout

## Setup
1. Create an endpoint at https://crudcrud.com/.
2. Open `index.js`.
3. Replace `PASTE_YOUR_CRUDCRUD_KEY_HERE` in `API_URL` with your endpoint key. Example format:
   `https://crudcrud.com/api/YOUR_KEY/notes`
4. Open `index.html` using VS Code Live Server, or another local web server.

## Notes
- All requests use the same `API_URL`.
- CRUDCRUD endpoints are temporary and may expire; create a fresh one if requests start failing.
- The search filters the notes currently loaded from the server by title.
