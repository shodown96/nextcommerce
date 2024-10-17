import Stripe from "stripe"

export const STRIPE_SECRET_KEY = assertValue(
    process.env.STRIPE_SECRET_KEY,
    "Missing environment variable: ASSEMBLYAI_API_KEY",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage);
    }
    return v;
}

export const stripe = new Stripe(STRIPE_SECRET_KEY);