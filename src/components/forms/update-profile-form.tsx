"use client"

import AuthTitle from '@/components/custom/auth-title';
import { ProfileUpdateParamsSchema, ProfileUpdateParamsType } from '@/lib/validations/user';
import { useFormik } from 'formik';

function UpdateProfileForm({ handleRemoteSubmit }: {
    handleRemoteSubmit: (values: ProfileUpdateParamsType) => void
}) {

    const formik = useFormik<ProfileUpdateParamsType>({
        initialValues: {
            firstName: '',
            lastName: '',
            image: '',
        },
        onSubmit: handleRemoteSubmit,
        validateOnBlur: true,
        validationSchema: ProfileUpdateParamsSchema,
    });

    const { handleBlur, handleChange, handleSubmit, values } = formik;
    return (
        <div className='p-10'>
            <div className="max-w-[600px]">
                <AuthTitle
                    title='Update Profile'
                    description='Change your name or profile picture ' />

            </div>
        </div>
    )
}

export default UpdateProfileForm