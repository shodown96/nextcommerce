"use client"
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { VALIDATION_MESSAGES } from "@/lib/constants/messages";
import { format } from "../utils";

const fieldObject = z.object({
    label: z.string({ required_error: format(VALIDATION_MESSAGES.Required, 'Label') }),
    value: z.string({ required_error: format(VALIDATION_MESSAGES.Required, 'Value') })
})

const imageObject = z
    .any()
    .refine((file) => file.size <= 1024 * 1024, 'File size should be less than 1MB')
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), 'Only .jpg and .png files are allowed')


// export const NewProduct = z.object({
//     name: z.string({ required_error: format(VALIDATION_MESSAGES.Required, 'Product Name') }),
//     price: z.number({ required_error: format(VALIDATION_MESSAGES.Required, 'Price') }),
//     description: z.string({ required_error: format(VALIDATION_MESSAGES.Required, 'Description') }),
//     metadata: z.array(fieldObject),
//     variations: z.array(
//         z.object({
//             label: z.string({ required_error: format(VALIDATION_MESSAGES.Required, 'Label') }),
//             options: z.array(fieldObject)
//         })
//     ),
//     images: z.array(imageObject)
// });

// export const NewProductSchema =
//     toFormikValidationSchema(NewProduct);
// export type NewProductSchemaType = z.infer<typeof NewProduct>;

export const NewProductDetails = z.object({
    name: z.string({ required_error: format(VALIDATION_MESSAGES.Required, 'Product Name') }),
    price: z.number({ required_error: format(VALIDATION_MESSAGES.Required, 'Price') }),
    description: z.string({ required_error: format(VALIDATION_MESSAGES.Required, 'Description') }),
});

export const NewProductDetailsSchema =
    toFormikValidationSchema(NewProductDetails);
export type NewProductDetailsSchemaType = z.infer<typeof NewProductDetails>;

export const NewProductVariations = z.object({
    variations: z.array(
        z.object({
            label: z.string({ required_error: format(VALIDATION_MESSAGES.Required, 'Label') }),
            options: z.array(fieldObject)
        })
    ),
});

export const NewProductVariationsSchema =
    toFormikValidationSchema(NewProductVariations);
export type NewProductVariationsSchemaType = z.infer<typeof NewProductVariations>;

export const NewProductExtras = z.object({
    metadata: z.array(fieldObject)
});

export const NewProductExtrasSchema =
    toFormikValidationSchema(NewProductExtras);
export type NewProductExtrasSchemaType = z.infer<typeof NewProductExtras>;


export const NewProductImages = z.object({
    images: z.array(imageObject)
});

export const NewProductImagesSchema =
    toFormikValidationSchema(NewProductImages);
export type NewProductImagesSchemaType = z.infer<typeof NewProductImages>;


export type NewProductSchemaType = NewProductDetailsSchemaType &
    NewProductVariationsSchemaType &
    NewProductExtrasSchemaType & NewProductImagesSchemaType

export type ProductWithoutImages = NewProductDetailsSchemaType &
    NewProductVariationsSchemaType &
    NewProductExtrasSchemaType