import { createProduct } from '@/actions/product/create-product';
import { updateProduct } from '@/actions/product/update-product';
import { MESSAGES } from '@/lib/constants/messages';
import { PATHS } from '@/lib/constants/paths';
import { useProductStore } from '@/lib/stores/product';
import { convertToBase64 } from '@/lib/utils';
import { NewProductImagesSchema, NewProductImagesSchemaType } from '@/lib/validations/product';
import { CreateProductRequestProps } from '@/types/product';
import { File as DBFile } from '@prisma/client';
import axios from "axios";
import { useFormik } from 'formik';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ButtonWithBack from '../custom/button-with-back';
import { UploadFileInput } from '../custom/files-input';

function ProductImagesForm({
    onSubmit = () => { },
    goBack = () => { },
    initalValues,
    productId = ""
}: {
    goBack?: (() => void)
    onSubmit: (values: NewProductImagesSchemaType) => void,
    initalValues: NewProductImagesSchemaType,
    productId?: string
}) {

    const router = useRouter()

    const { productParams, initialize } = useProductStore()
    const [previews, setPreviews] = useState<string[]>([])
    const [oldImages, setOldImages] = useState<string[]>([])
    const [status, setStatus] = useState("")
    const formik = useFormik<NewProductImagesSchemaType>({
        initialValues: {
            images: []
        },
        onSubmit: async (values) => {
            await uploadProduct()
        },
        validateOnBlur: true,
        validationSchema: NewProductImagesSchema,
    });
    const handleRemove = async (url: string) => {
        const result = await axios.post("/api/cloudinary/delete", { url })
        if (result.status === 200) {
            console.log(result)
            setOldImages(oldImages.filter(v => v !== url))
        }
    }
    const uploadProduct = async () => {
        // const instance = axios.create({
        //     baseURL:'/api/cloudinary'
        // })
        // if (!uploadedFiles) {
        setStatus("Uploading images...")
        const uploadedImages: DBFile[] = []
        try {
            if (values.images.length) {
                for (const image of values.images) {
                    const converted = await convertToBase64(image)
                    const result = await axios.post("/api/cloudinary/upload", {
                        file: converted,
                        folder: "product"
                    })
                    if (result.status === 200) {
                        console.log(result)
                        uploadedImages.push(result.data)
                    }
                }
                toast.success('Uploaded images successfully!')
            }
        } catch (error) {
            toast.error('Failed to uploaded images.')
            setStatus("")
            return
        }
        // }

        setStatus("Submitting product...")
        const product = {
            ...productParams,
            images: uploadedImages
        } as CreateProductRequestProps['product']

        const result = productId ? await updateProduct({ product, productId }) : await createProduct({ product })
        if (result) {
            console.log(result)
            toast.success(MESSAGES.Success)
            router.push(`${PATHS.PRODUCTS}/${result.product.id}`)
            initialize()
        } else {
            toast.error('Failed to Ssubmit product.')
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
        } else {

            setPreviews([])
        }
        return () => { previews.map(v => { URL.revokeObjectURL(v) }) }
    }, [values.images])

    useEffect(() => {
        if (productId) {
            setOldImages(initalValues.images)
        }
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <div className="min-h-[300px]">
                <UploadFileInput
                    files={values.images}
                    acceptedText={`JPEG, WEBP or PNG images only. Max images: ${4 - oldImages.length}`}
                    dropzoneOptions={{
                        multiple: true,
                        maxFiles: 4 - oldImages.length,
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
            <div className="flex flex-col gap-2 mt-5 mb-4">
                {previews.length ? (
                    <div className="flex gap-2 mt-5 mb-4">
                        {previews.map((v, i) => (
                            <img src={v} alt="" className='w-[300px]' key={i} />
                        ))}
                    </div>)
                    : null}
                {oldImages.length ? (
                    <>
                        <h4 className='text-ld font-medium'>Previous Images</h4>
                        <div className='flex gap-2 mt-5 mb-4'>
                            {oldImages.map((v, i) => (
                                <div>
                                    <Trash2
                                        onClick={() => handleRemove(v)}
                                        className='bg-red-600 p-2 cursor-pointer rounded-full absolute text-white h-8 w-8 -mt-3 -ml-3 z-40' />
                                    <img src={v} alt="" className='w-[300px] -z-10' key={i} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : null}
            </div>
            <div className="h-10 bg-[#eee] p-2 rounded">{status}</div>
            <ButtonWithBack
                label='Submit'
                goBack={goBack}
                loading={isSubmitting}
                containerClass='justify-end'
                mainBtnClass='w-auto' />
        </form>
    )
}

export default ProductImagesForm