Here’s a minimal, end‑to‑end SvelteKit setup using **better‑auth** with an **SQLite** database and the **authClient**, including simple **signup** and **login** pages.

This guide covers:

1. **Installation & env vars** – Installing the package and configuring your `.env`  
2. **Server setup** – Creating the `auth` instance and mounting the handler in SvelteKit  
3. **Client setup** – Instantiating `authClient` for use in your components  
4. **Signup page** – A plain SvelteKit `+page.svelte` for user registration  
5. **Login page** – A plain SvelteKit `+page.svelte` for user login  

---

## 1. Installation & Environment Variables

First, add **better-auth** (and SQLite) to your project:

```bash
npm install better-auth better-sqlite3
```  
citeturn16view0

Create a `.env` file at your project root with:

```env
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=…
GOOGLE_CLIENT_SECRET=…
```  
citeturn15view0

---

## 2. Server Setup

### 2.1 Create the `auth` instance

In `src/lib/auth.ts`, configure Better Auth with SQLite and enable email/password plus Google social login:

```ts
// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { env } from "$env/dynamic/private";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./db.sqlite"),                // SQLite DB citeturn6view0
  emailAndPassword: { enabled: true },                  // enable email/password citeturn6view0
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID || "",
      clientSecret: env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});
```  
citeturn6view0

### 2.2 Mount the handler in SvelteKit

In `src/hooks.server.ts`, forward all auth requests to Better Auth’s SvelteKit handler:

```ts
// src/hooks.server.ts
import { auth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";

export async function handle({ event, resolve }) {
  return svelteKitHandler({ event, resolve, auth });     // mount handler citeturn13view0
}
```  
citeturn1view0

---

## 3. Client Setup

Create the client-side instance to call auth methods:

```ts
// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/svelte";

export const client = createAuthClient({
  baseURL: "http://localhost:3000",                       // your app’s base URL citeturn7view0
});
export const { signIn, signUp, useSession } = client;      // export methods citeturn7view0
```  
citeturn7view0

---

## 4. Signup Page

A simple registration form in `src/routes/sign-up/+page.svelte`:

```html
<script lang="ts">
  import { signUp } from "$lib/auth-client";
  let email = "", password = "";

  async function handleSignUp() {
    await signUp.email(
      { email, password, callbackURL: "/" },
      { onError: (ctx) => alert(ctx.error.message) }
    );
  }
</script>

<form on:submit|preventDefault={handleSignUp}>
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Sign Up</button>
</form>

<p>
  Already have an account? <a href="/sign-in">Sign In</a>
</p>
```  
citeturn10view0

---

## 5. Login Page

A simple login form in `src/routes/sign-in/+page.svelte`:

```html
<script lang="ts">
  import { signIn } from "$lib/auth-client";
  let email = "", password = "";

  async function handleSignIn() {
    await signIn.email(
      { email, password, callbackURL: "/" },
      { onError: (ctx) => alert(ctx.error.message) }
    );
  }
</script>

<form on:submit|preventDefault={handleSignIn}>
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Login</button>
</form>

<p>
  Don’t have an account? <a href="/sign-up">Sign Up</a>
</p>
```  
citeturn12view0

---

With these pieces in place, running `npm run dev` will give you fully working signup and login flows powered by **better‑auth** and **SvelteKit**.