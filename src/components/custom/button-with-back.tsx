import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';


function ButtonWithBack({
    goBack = () => { },
    label = "Next",
    containerClass = "",
    mainBtnClass = "w-full",
    loading = false
}) {
    return (
        <div className={cn(
            "flex gap-2 items-center mt-10",
            containerClass
        )}>
            <Button
                onClick={goBack}
                variant={'outline'}
                className='border-[#aaa] px-3'>
                <ChevronLeft />
            </Button>
            <Button
                type='submit'
                loading={loading}
                className={cn("w-full", mainBtnClass)}>
                {label}
            </Button>
        </div>
    )
}

export default ButtonWithBack