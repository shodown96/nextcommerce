import { cn } from '@/lib/utils'
import React, { useState } from 'react'

function Tabs({
    items,
    className = "",
    itemClassName = "",
    activeTab = 0,
    setActiveTab,
    clickable = true
}: {
    items: string[],
    className?: string,
    itemClassName?: string,
    activeTab?: number
    clickable?: boolean,
    setActiveTab: (v: any) => void
}) {
    return (
        <div className={cn(
            "flex gap-5 items-center w-max",
            className
        )}>
            {items?.length ? items.map((v, i) => (
                <div key={i}>
                    <div key={i} className={cn(
                        'cursor-pointer min-w-[50px] pb-1 text-center capitalize transition-all',
                        activeTab === i ? '' : '',
                        itemClassName
                    )}
                        onClick={() => {
                            if (clickable) {
                                setActiveTab(i)
                            }
                        }}>
                        {v.replace("_", " ")}
                    </div>
                    <div className={cn(
                        "h-1 min-w-[150px] bg-primary rounded-full",
                        activeTab === i ? 'bg-primary' : 'bg-[#aaa]',
                    )}></div>
                </div>
            )) : null}

        </div>
    )
}

export default Tabs