"use client";

import { invariant } from "@/lib/utils";
import { Elements } from "@stripe/react-stripe-js";
import {
	type StripeElementLocale,
	type StripeElementsOptions,
	loadStripe,
} from "@stripe/stripe-js";
import { type ReactNode, useMemo } from "react";

export const StripeElementsContainer = ({
	children,
	clientSecret,
	publishableKey,
	stripeAccount,
}: {
	children: ReactNode;
	clientSecret?: string;
	publishableKey?: string;
	stripeAccount?: string;
}) => {

	const stripePublishableKey = publishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
	invariant(stripePublishableKey, "Stripe publishable key is required");
	const stripePromise = useMemo(
		() => loadStripe(stripePublishableKey,
			// { stripeAccount }
		),
		[stripePublishableKey],
	);

	if (!clientSecret) {
		return null;
	}

	const options = {
		clientSecret: clientSecret,
		appearance: {
			variables: {
				fontFamily: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
				fontSizeSm: "0.875rem",
				colorDanger: "hsl(0 84.2% 60.2%)",
			},
		},
		locale: 'auto',
	} satisfies StripeElementsOptions;

	return (
		<Elements stripe={stripePromise} options={options}>
			{children}
		</Elements>
	);
};

// This was taken from `StripeElementLocale` in `@stripe/react-stripe-js`:
// const supportedStripeLocales = [
// 	"ar",
// 	"bg",
// 	"cs",
// 	"da",
// 	"de",
// 	"el",
// 	"en",
// 	"en-AU",
// 	"en-CA",
// 	"en-NZ",
// 	"en-GB",
// 	"es",
// 	"es-ES",
// 	"es-419",
// 	"et",
// 	"fi",
// 	"fil",
// 	"fr",
// 	"fr-CA",
// 	"fr-FR",
// 	"he",
// 	"hu",
// 	"hr",
// 	"id",
// 	"it",
// 	"it-IT",
// 	"ja",
// 	"ko",
// 	"lt",
// 	"lv",
// 	"ms",
// 	"mt",
// 	"nb",
// 	"nl",
// 	"no",
// 	"pl",
// 	"pt",
// 	"pt-BR",
// 	"ro",
// 	"ru",
// 	"sk",
// 	"sl",
// 	"sv",
// 	"th",
// 	"tr",
// 	"vi",
// 	"zh",
// 	"zh-HK",
// 	"zh-TW",
// ] satisfies StripeElementLocale[];
