# Eid Card

Next.js app for creating Eid greeting cards, editing their cover and inside note, and publishing read-only shared versions.

## Features

- Email/password sign up and sign in with Supabase
- Protected editing flows for the home creator and `/editor/[id]`
- Public shared-card links at `/shared/[slug]` that show only the final output
- PNG download for users who want to save the card and share it manually
- Mobile-friendly editor and share flow

## 1. Install dependencies

```bash
npm install
```

## 2. Configure Supabase

Copy the example env file:

```bash
copy .env.example .env.local
```

Add these values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_or_anon_key
```

## 3. Create the share table

Run the SQL in:

```text
supabase/migrations/20260320_shared_cards.sql
```

This creates the `shared_cards` table plus policies so:

- anyone can read a published shared card
- only the authenticated owner can insert, update, or delete their own shared cards

## 4. Supabase Auth settings

In your Supabase dashboard:

- keep Email auth enabled
- add your local and production callback URLs to Redirect URLs
- include `http://localhost:3000/auth/callback`
- include your production `/auth/callback` URL too

If email confirmation is enabled, new users will confirm by email first. If it is disabled, they will sign in immediately after sign up.

## 5. Run the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Sharing behavior

- Signed-in users can edit cards.
- The `Share Link` action stores the current card snapshot in Supabase and creates a public `/shared/[slug]` page.
- Visitors opening that link only see the final rendered card, not the editor.
- Users can still use `Download PNG` and share the image manually anywhere.

## Verification

These commands pass on the current codebase:

```bash
npm run lint
npm run build
```
