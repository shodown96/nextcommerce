import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ReactNode } from 'react'

function LoaderContainer({ loading = false, className, children }: {
    loading?: boolean,
    className?: string,
    children: ReactNode | ReactNode[]
}) {

    if (loading) return (
        <div className={cn("flex items-center justify-center p-2 min-h-40", className)}>
            <Loader2 className="animate-spin" />
        </div>
    )

    return children
}

export default LoaderContainer