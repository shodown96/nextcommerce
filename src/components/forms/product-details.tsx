import { populateSampleProduct } from '@/actions/product/populate-sample-product';
import { useProductStore } from '@/lib/stores/product';
import { NewProductDetailsSchema, NewProductDetailsSchemaType } from '@/lib/validations/product';
import { useFormik } from 'formik';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

function ProductDetailsForm({
    onSubmit = () => { },
    goBack = () => { },
    initalValues,
    productId = ""
}: {
    goBack?: (() => void)
    onSubmit: (values: NewProductDetailsSchemaType) => void,
    initalValues: NewProductDetailsSchemaType,
    productId?: string
}) {
    const pathname = usePathname()
    const { setProductParams } = useProductStore()
    const formik = useFormik<NewProductDetailsSchemaType>({
        initialValues: initalValues,
        onSubmit: async (values) => {
            onSubmit(values)
        },
        validateOnBlur: true,
        validationSchema: NewProductDetailsSchema,
    });

    const { handleBlur, handleChange, handleSubmit, values, setValues } = formik;

    useHotkeys("ctrl+shift+1", () => {
        // if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development') {
        const product = populateSampleProduct()
        if (product) {
            setProductParams(product)
            setValues({
                name: product.name,
                description: product.description,
                price: product.price,
            })
        }
        // }
    });
    useEffect(() => {
        if (initalValues.name && productId) {
            setValues({
                name: initalValues.name,
                description: initalValues.description,
                price: initalValues.price,
            })
        }
    }, [initalValues])
    return (
        <form onSubmit={handleSubmit} className=''>
            <div className='flex flex-col gap-4 mb-4'>
                <Input
                    id="name"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={'Enter a product name'}
                    value={values.name}
                />
                <Textarea
                    id="description"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={'Tell us a bit more about your product'}
                    value={values.description}
                />
                <Input
                    id="price"
                    label="Price"
                    type='number'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={'Enter a price amount'}
                    value={values.price}
                />
            </div>
            <div className="flex gap-2 items-center mt-10 justify-end">
                <Button type='submit' disabled={!formik.isValid}>
                    Next
                </Button>
            </div>
        </form>
    )
}

export default ProductDetailsForm