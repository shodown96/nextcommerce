import WrappedInput from '@/components/custom/wrapped-input';
import { Button } from '@/components/ui/button';
import { PLACEHOLDERS } from '@/lib/constants/auth';
import { BusinessSocialsSchema, BusinessSocialsSchemaType } from '@/lib/validations/business';
import { useFormik } from 'formik';
import { ChevronLeft } from 'lucide-react';

function BusinessSocialsForm({ onSubmit = (values: any) => { }, setStep = (v: any) => { } }) {
    const formik = useFormik<BusinessSocialsSchemaType>({
        initialValues: {
            website: "",
            linkedIn: "",
            instagram: "",
            twitter: "",
        },
        onSubmit: onSubmit,
        validateOnBlur: true,
        validationSchema: BusinessSocialsSchema,
    });


    const {
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting
    } = formik;
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
                <WrappedInput
                    id="website"
                    label="Website"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={PLACEHOLDERS.WEBSITE}
                    value={values.website} />
                <WrappedInput
                    id="instagram"
                    label="Instagram"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={'Enter Instagram URL'}
                    value={values.instagram}
                    error={errors.instagram}
                    touched={touched.instagram} />
                <WrappedInput
                    id="twitter"
                    label="Twitter"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={'Enter Twitter URL'}
                    value={values.twitter}
                    error={errors.twitter}
                    touched={touched.twitter} />
                <WrappedInput
                    id="linkedIn"
                    label="LinkedIn"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={'Enter LinkedIn URL'}
                    value={values.linkedIn}
                    error={errors.linkedIn}
                    touched={touched.linkedIn} />
            </div>
            <div className="flex gap-2 items-center mt-10">

                <Button onClick={() => setStep('account')} variant={'outline'} className='border-[#aaa] px-3'>
                    <ChevronLeft />
                </Button>
                <Button
                    loading={isSubmitting}
                    type='submit'
                    className='w-full'>
                    Continue
                </Button>
            </div>
        </form >
    )
}

export default BusinessSocialsForm