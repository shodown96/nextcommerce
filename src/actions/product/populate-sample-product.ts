import obj from "@/assets/samples/sample-product.json";
import { NewProductSchemaType } from "@/lib/validations/product";

export const populateSampleProduct = (): NewProductSchemaType | null => {
    try {
        return obj as NewProductSchemaType
    } catch (error: unknown) {
        console.error("Error to update project", error);
        return null;
    }
};
