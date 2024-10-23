import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Option } from '@/types/product'

function ProductMetadata({ metadata }: { metadata: Option[] }) {
    return (
        <div className="my-12">
            <div className="mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Other Information</h2>
            </div>
            {metadata.length ? (
                <Accordion type="single" collapsible className="w-full">
                    {metadata.map(item => (
                        <AccordionItem value={item.value} key={item.value}>
                            <AccordionTrigger className="text-lg !no-underline">{item.label}</AccordionTrigger>
                            <AccordionContent>
                                {item.value}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : <div>No metadata</div>}
        </div>
    )
}

export default ProductMetadata


