export enum PATHS {
    SIGN_IN = "/sign-in",
    SIGN_UP = "/sign-up",
    SSO_CALLBACK = "/sso-callback",
    CHANGE_PASSWORD = "/change-password",
    FORGOT_PASSWORD = "/forgot-password",
    FORGOT_PASSWORD_EMAIL = "/forgot-password/email",
    FORGOT_PASSWORD_VERIFY = "/forgot-password/verify",
    FORGOT_PASSWORD_RESET = "/forgot-password/reset",
    LANDING = "/",
    EXPLORE = "/explore",
    ONBOARDING = "/onboarding",
    ONBOARDING_BUSINESS = "/onboarding/business",
    ONBOARDING_STRIPE = "/onboarding/business/stripe",
    CONTACT = "/contact",
    ABOUT = "/about",
    PROFILE = "/profile",
    NEW_PRODUCT = "/products/new",
    PRODUCTS = "/products"
}

export const vercelHost =
	process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
		? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
		: process.env.NEXT_PUBLIC_VERCEL_URL;
const vercelUrl = vercelHost ? `https://${vercelHost}` : undefined;
const _publicUrl = process.env.NEXT_PUBLIC_URL || vercelUrl;

// if (!publicUrl) {
// 	throw new Error("Missing NEXT_PUBLIC_URL or NEXT_PUBLIC_VERCEL_URL variables!");
// }

// force type inference to string
export const publicUrl = _publicUrl;