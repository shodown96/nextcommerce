import { MESSAGES } from '@/lib/constants/messages';
import { useFileStorage } from '@/lib/stores/file';
import { useProductStore } from '@/lib/stores/product';
import { convertToBase64 } from '@/lib/utils';
import { NewProductImagesSchema, NewProductImagesSchemaType, NewProductSchemaType } from '@/lib/validations/product';
import axios from "axios";
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ButtonWithBack from '../custom/button-with-back';
import { UploadFileInput } from '../custom/files-input';
import { createProduct } from '@/actions/product/create-product';
import { File as DBFile } from '@prisma/client';
import { CreateProductRequestProps } from '@/types/product';
import { useRouter } from 'next/router';
import { PATHS } from '@/lib/constants/paths';

function ProductImagesForm({
    onSubmit = () => { },
    goBack = () => { },
    initalValues,
}: {
    goBack?: (() => void)
    onSubmit: (values: any) => void,
    initalValues: any
}) {

    const router = useRouter()
    const { newProductParams, initialize } = useProductStore()
    const [previews, setPreviews] = useState<string[]>([])
    const [status, setStatus] = useState("")
    const formik = useFormik<NewProductImagesSchemaType>({
        initialValues: initalValues as NewProductImagesSchemaType,
        onSubmit: async (values) => {
            await uploadProduct()
        },
        validateOnBlur: true,
        validationSchema: NewProductImagesSchema,
    });

    const uploadProduct = async () => {
        // const instance = axios.create({
        //     baseURL:'/api/cloudinary'
        // })
        // if (!uploadedFiles) {
        setStatus("Uploading images...")
        const uploadedImages: DBFile[] = []
        try {
            for (const image of values.images) {
                const converted = await convertToBase64(image)
                const result = await axios.post("/api/cloudinary/upload", {
                    file: converted,
                    folder: "product"
                })
                if (result) {
                    console.log(result)
                    uploadedImages.push(result.data)
                }
            }
            toast.success('Uploaded images successfully!')
        } catch (error) {
            toast.error('Failed to uploaded images.')
            setStatus("")
            return
        }
        // }

        setStatus("Creating product...")
        const product = {
            ...newProductParams,
            images: uploadedImages
        } as CreateProductRequestProps['product']

        const result = await createProduct({ product })
        if (result) {
            console.log(result)
            toast.success(MESSAGES.Success)
            router.push(`${PATHS.PRODUCTS}/${result.id}`)
            initialize()
        } else {
            toast.error('Failed to create product.')
            setStatus("")
        }
        setStatus("")
    }

    const { handleSubmit, values, isSubmitting, setFieldValue } = formik;


    useEffect(() => {
        const newPreviews: string[] = []
        if (values.images.length) {
            values.images.map(v => {
                newPreviews.push(URL.createObjectURL(v))
            })
            previews.map(v => {
                URL.revokeObjectURL(v)
            })
            setPreviews(newPreviews)
        }
        return () => { previews.map(v => { URL.revokeObjectURL(v) }) }
    }, [values.images])

    return (
        <form onSubmit={handleSubmit}>
            <div className="min-h-[300px]">
                <UploadFileInput
                    files={values.images}
                    acceptedText='JPEG, WEBP or PNG images only'
                    dropzoneOptions={{
                        multiple: true,
                        maxFiles: 4,
                        maxSize: 1024 * 1024 * 1024 * 1,
                        accept: {
                            // 'image/*': [],
                            'image/png': [],
                            'image/jpeg': [],
                            'image/webp': [],
                        },
                    }}
                    setFiles={values => {
                        if (!values) return;
                        // setFiles(values)
                        setFieldValue('images', values)
                    }} />
            </div>
            <div className="flex flex-wrap gap-2 mt-5 mb-4">
                {previews.map(v => (
                    <div>
                        <img src={v} alt="" className='w-[300px]' />
                    </div>
                ))}
            </div>
            <div className="h-10 bg-[#eee] p-2 rounded">{status}</div>
            <ButtonWithBack
                goBack={goBack}
                loading={isSubmitting}
                containerClass='justify-end'
                mainBtnClass='w-auto' />
        </form>
    )
}

export default ProductImagesForm