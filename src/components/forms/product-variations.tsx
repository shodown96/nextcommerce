import { cn } from '@/lib/utils';
import { NewProductVariationsSchema, NewProductVariationsSchemaType } from '@/lib/validations/product';
import { useFormik } from 'formik';
import { Trash2Icon } from 'lucide-react';
import { Fragment } from 'react';
import ButtonWithBack from '../custom/button-with-back';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

function ProductVariationsForm({
  onSubmit = () => { },
  goBack = () => { },
  initalValues,
}: {
  goBack?: (() => void)
  onSubmit: (values: any) => void,
  initalValues: any
}) {

  const formik = useFormik<NewProductVariationsSchemaType>({
    initialValues: initalValues,
    onSubmit: async (values) => {
      onSubmit(values)
    },
    validateOnBlur: true,
    validationSchema: NewProductVariationsSchema,
  });


  const addVariation = () => {
    setFieldValue('variations', [
      ...values.variations,
      {
        label: '', options: [
          { label: '', value: '' }
        ]
      }
    ])
  }

  const removeVaration = (index: number) => {
    const newVariations = values.variations.filter((_, i) => i !== index)
    setFieldValue('variations', newVariations)
  }

  const addVariationOption = (index: number) => {
    const newVariations = values.variations
    const variation = values.variations.find((_, i) => i === index)
    if (!variation) return null
    variation.options = [
      ...variation.options,
      { label: '', value: '' }
    ]
    newVariations[index] = variation
    setFieldValue('variations', newVariations)
  }
  const removeVarationOption = (index: number, optionIndex: number) => {
    const newVariations = values.variations
    const variation = values.variations.find((_, i) => i === index)
    if (!variation) return null
    variation.options = variation?.options.filter((_, i) => i !== optionIndex)
    newVariations[index] = variation
    setFieldValue('variations', newVariations)
  }

  const { handleBlur, handleChange, handleSubmit, values, errors: e, touched, setFieldValue } = formik;
  const errors: any = e
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 mb-4'>
        {values.variations.map((v, i) => (
          <div className={cn(
            values.variations.length - 1 !== i ? 'border-b border-[#aaa] pb-4' : ''
          )} key={i}>
            <div className='flex items-end gap-2 mb-6'>
              <Input
                label={v.label || "Label"}
                onBlur={handleBlur(`variations[${i}].label`)}
                onChange={handleChange(`variations[${i}].label`)}
                placeholder={'Enter a label e.g Color'}
                value={v.label}
                touched={touched.variations?.[i]?.label}
                error={errors.variations?.[i]?.label}
                containerClass='w-full'
              />

              <div className="flex items-center gap-2">
                <Button
                  type='button'
                  className='w-max'
                  disabled={values.variations[i].options.length > 3}
                  onClick={() => addVariationOption(i)}>
                  Add Option
                </Button>
                <Button
                  type='button'
                  className='gap-2'
                  onClick={() => removeVaration(i)}>
                  Remove Field
                  <Trash2Icon
                    className='h-5 w-5 cursor-pointer' />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {v.options.map((option, j) => (
                <Fragment key={j}>
                  <div className='flex items-center gap-2 w-full mb-3'>
                    <Input
                      label="Option Label"
                      onBlur={handleBlur(`variations[${i}].options[${j}.label]`)}
                      onChange={handleChange(`variations[${i}].options[${j}.label]`)}
                      touched={touched.variations?.[i]?.options?.[j]?.label}
                      error={errors.variations?.[i]?.options?.[j]?.label}
                      placeholder={'Enter an option label'}
                      value={option.label}
                      containerClass='w-full'
                    />
                    <Input
                      label="Option Value"
                      onBlur={handleBlur(`variations[${i}].options[${j}].value`)}
                      onChange={handleChange(`variations[${i}].options[${j}].value`)}
                      touched={touched.variations?.[i]?.options?.[j]?.value}
                      error={errors.variations?.[i]?.options?.[j]?.value}
                      placeholder={'Enter an option value'}
                      value={option.value}
                      containerClass='w-full'
                    />
                    <Trash2Icon
                      onClick={() => removeVarationOption(i, j)}
                      className='h-10 w-10 mt-5 cursor-pointer' />
                  </div>
                </Fragment>
              ))}
              {values.variations.length - 1 === i ? (
                <Button
                  type='button'
                  className='w-max'
                  disabled={values.variations.length > 3}
                  onClick={addVariation}>
                  Add Field
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <ButtonWithBack goBack={goBack} containerClass='justify-end' mainBtnClass='w-auto' />
    </form>
  )
}

export default ProductVariationsForm