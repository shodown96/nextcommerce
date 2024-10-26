import z, { type TypeOf, object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { VALIDATION_MESSAGES } from "../constants/messages";
import { format } from "../utils";

export const getAddressSchema = (tr: {
	nameRequired: string;
	cityRequired: string;
	countryRequired: string;
	line1Required: string;
	postalCodeRequired: string;
}) => {
	const addressSchema = object({
		name: string({ required_error: tr.nameRequired }).min(1, tr.nameRequired),
		city: string({ required_error: tr.cityRequired }).min(1, tr.cityRequired),
		country: string({ required_error: tr.countryRequired }).min(1, tr.countryRequired),
		line1: string({ required_error: tr.line1Required }).min(1, tr.line1Required),
		line2: string().optional().nullable().default(""),
		postalCode: string({ required_error: tr.postalCodeRequired }).min(1, tr.postalCodeRequired),
		state: string().optional().nullable().default(""),
		phone: string().optional().nullable().default(""),
		taxId: string().optional().nullable().default(""),
		email: string().optional().nullable().default(""),
		// 	.email("Email is required")
		// 	.min(1, "Email is required"),
	});
	return addressSchema;
};

const AdressParams = z.object({
	name: z
		.string({ required_error: format(VALIDATION_MESSAGES.Required, 'Name') })
		.email({ message: VALIDATION_MESSAGES.EmailInvalid }),
	city: z.string({
		required_error: format(VALIDATION_MESSAGES.Required, 'City'),
	}),
	country: z.string({
		required_error: format(VALIDATION_MESSAGES.Required, 'Country'),
	}),
	line1: z.string({
		required_error: format(VALIDATION_MESSAGES.Required, 'Line 1'),
	}),
	line2: z.string({
		required_error: format(VALIDATION_MESSAGES.Required, 'Line 2'),
	}),
	postalCode: z.string({
		required_error: format(VALIDATION_MESSAGES.Required, 'Postal Code'),
	}),
	email: z.string().optional().nullable().default(""),
	state: z.string().optional().nullable().default(""),
	phone: z.string().optional().nullable().default(""),
	taxId: string().optional().nullable().default(""),
});

export const AdressParamsSchema =
	toFormikValidationSchema(AdressParams);
export type AdressParamsSchemaType = z.infer<typeof AdressParams>;

export type AddressSchema = TypeOf<ReturnType<typeof getAddressSchema>>;
