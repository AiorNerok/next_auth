/**
 * an array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/auth/new-verification"];

/**
 * an array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
];

/**
 * The prefix for API aithentication routes
 * Routes that start with this prefix are user for API aithentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
