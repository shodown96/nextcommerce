import { NewProductExtrasSchema, NewProductExtrasSchemaType } from '@/lib/validations/product';
import { useFormik } from 'formik';
import { Trash2Icon } from 'lucide-react';
import ButtonWithBack from '../custom/button-with-back';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

function ProductExtrasForm({
    onSubmit = () => { },
    goBack = () => { },
    initalValues,
    productId = ""
}: {
    goBack?: (() => void)
    onSubmit: (values: NewProductExtrasSchemaType) => void,
    initalValues: NewProductExtrasSchemaType,
    productId?:string
}) {

    const formik = useFormik<NewProductExtrasSchemaType>({
        initialValues: initalValues,
        onSubmit: async (values) => {
            onSubmit(values)
        },
        validateOnBlur: true,
        validationSchema: NewProductExtrasSchema,
    });

    const { handleBlur, handleChange, handleSubmit, values, touched, errors: e, setFieldValue } = formik;
    const errors: any = e;

    const addMetadata = () => {
        setFieldValue('metadata', [
            ...values.metadata,
            { label: '', value: '' }
        ])
    }
    const removeMetadata = (index: number) => {
        const newMetadata = values.metadata.filter((_, i) => i !== index)
        setFieldValue('metadata', newMetadata)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 mb-4'>
                {values.metadata.map((v, i) => (
                    <div className='flex items-end justify-end gap-2 w-full max-lg:flex-wrap' key={i}>
                        <Input
                            id="label"
                            label={v.label || "Label"}
                            onBlur={handleBlur(`metadata[${i}].label`)}
                            onChange={handleChange(`metadata[${i}].label`)}
                            touched={touched.metadata?.[i]?.label}
                            error={errors.metadata?.[i]?.label}
                            placeholder={'Enter a label'}
                            value={v.label}
                            containerClass='w-full'
                        />
                        <Input
                            id="value"
                            label="Value"
                            onBlur={handleBlur(`metadata[${i}].value`)}
                            onChange={handleChange(`metadata[${i}].value`)}
                            touched={touched.metadata?.[i]?.value}
                            error={errors.metadata?.[i]?.value}
                            placeholder={'Enter a value'}
                            value={v.value}
                            containerClass='w-full'
                        />
                        <Trash2Icon
                            onClick={() => removeMetadata(i)}
                            className='h-10 w-10 cursor-pointer max-lg:h-6 max-lg:w-6' />
                    </div>
                ))}
                <div className="flex justify-end">
                    <Button
                        className='w-max'
                        disabled={values.metadata.length > 3}
                        onClick={addMetadata}>
                        Add Field
                    </Button>
                </div>
            </div>

            <ButtonWithBack goBack={goBack} containerClass='justify-end' mainBtnClass='w-auto' />
        </form>
    )
}

export default ProductExtrasForm