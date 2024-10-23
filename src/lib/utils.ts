import { ClerkError } from "@/types/auth";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { stripeCurrencies } from "./constants/stripe";
import { CartItem } from "@/types/cart";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const format = (...args: any) => {
  let i = 1;
  const str = args[0];
  return str.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
}

// required_error: format(VALIDATION_MESSAGES.Required, "Title"),

export const formatSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${minutes}:${String(seconds).padStart(2, "0")}`;
  return formattedTime;
};

export const isClerkError = (obj: any): obj is ClerkError => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Array.isArray(obj.errors) &&
    obj.errors.every((error: any) => (
      typeof error === 'object' &&
      error !== null &&
      typeof error.code === 'string' &&
      typeof error.message === 'string' &&
      typeof error.longMessage === 'string' &&
      error.meta &&
      typeof error.meta === 'object' &&
      typeof error.meta.paramName === 'string'
    ))
  );
}

export const convertToBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const extractPublicId = (secureUrl: string): string => {
  // Split the URL by '/' and remove the parts up to the version number
  const urlParts = secureUrl.split('/');

  // Find the index of the version part, assuming it starts with 'v' followed by digits
  const versionIndex = urlParts.findIndex(part => /^v\d+$/.test(part));

  // Join the parts after the version number
  const pathAfterVersion = urlParts.slice(versionIndex + 1).join('/');

  // Remove the file extension from the public_id
  const publicId = pathAfterVersion.replace(/\.[^/.]+$/, '');

  return publicId;
};


export function invariant(condition: unknown, message: string): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

export const assertInteger = (value: number) => {
	invariant(Number.isInteger(value), "Value must be an integer");
};


const getDecimalsForStripe = (currency: string) => {
	invariant(currency.length === 3, "currency needs to be a 3-letter code");

	const stripeDecimals = stripeCurrencies[currency.toUpperCase()];
	const decimals = stripeDecimals ?? 2;
	return decimals;
};

export const getStripeAmountFromDecimal = ({ amount: major, currency = "USD" }: Money) => {
	const decimals = getDecimalsForStripe(currency);
	const multiplier = 10 ** decimals;
	return Number.parseInt((major * multiplier).toFixed(0), 10);
};

export const getDecimalFromStripeAmount = ({ amount: minor, currency = "USD" }: Money) => {
	assertInteger(minor);
	const decimals = getDecimalsForStripe(currency);
	const multiplier = 10 ** decimals;
	return Number.parseFloat((minor / multiplier).toFixed(decimals));
};

export const formatMoney = ({
	amount: minor,
	currency = 'USD',
	locale = "en-US",
}: Money & { locale?: string }) => {
	const amount = getDecimalFromStripeAmount({ amount: minor, currency });
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
	}).format(amount);
};

export const capitalize = (str: string) => (str[0] ? str[0].toUpperCase() + str.slice(1) : "");

export const deslugify = (slug: string) => {
	return slug
		.split("-")
		.map((part) => capitalize(part))
		.join(" ");
};

export const safeJsonParse = (str: string | null | undefined): unknown => {
	if (str === null || str === undefined) {
		return null;
	}
	try {
		return JSON.parse(str);
	} catch {
		return null;
	}
};


export const formatProductName = (name: string, variant?: string) => {
	if (!variant) {
		return name;
	}
	return `${name} (${deslugify(variant)})`;
};

export const totalPrice = (cart : CartItem[]) => {
  return cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity!;
  }, 0);
};