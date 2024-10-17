import PhoneInput from '@/components/custom/phone-input';
import WrappedInput from '@/components/custom/wrapped-input';
import WrappedTextArea from '@/components/custom/wrapped-textarea';
import { Button } from '@/components/ui/button';
import { PLACEHOLDERS } from '@/lib/constants/auth';
import { BusinessSchema, BusinessSchemaType } from '@/lib/validations/business';
import { useFormik } from 'formik';

function BusinessDetailsForm({ onSubmit = (values: any) => { } }) {
    const formik = useFormik<BusinessSchemaType>({
        initialValues: {
            name: "",
            bio: "",
            email: "",
            phone: "",
            location: "",
        },
        onSubmit: onSubmit,
        validateOnBlur: true,
        validationSchema: BusinessSchema,
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
                    id="name"
                    label="Business Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={PLACEHOLDERS.BUSINESS_NAME}
                    value={values.name}
                    error={errors.name}
                    touched={touched.name} />
                <WrappedInput
                    id="email"
                    label="Booking Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={PLACEHOLDERS.EMAIL}
                    type="email"
                    value={values.email}
                    error={errors.email}
                    touched={touched.email} />
                <PhoneInput
                    id="phone"
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={PLACEHOLDERS.PHONE_NUMBER}
                    value={values.phone}
                    error={errors.phone}
                    touched={touched.phone} />
                <WrappedInput
                    id="location"
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={PLACEHOLDERS.LOCATION}
                    value={values.location}
                    error={errors.location}
                    touched={touched.location} />
                <WrappedTextArea
                    label="Bio"
                    placeholder={"Tell us what a little about your business."}
                    rows={2}
                    id="bio"
                    value={values.bio}
                    error={errors.bio}
                    touched={touched.bio}
                    onChange={handleChange} />
            </div>
            <Button
                loading={isSubmitting}
                type='submit'
                className='w-full'>
                Next
            </Button>
        </form>
    )
}

export default BusinessDetailsForm