interface PaginatedData<T = any> {
    items: T[];
    pageSize: number;
    totalPages: number;
    currentPage: number;
    total: number;
}

type StringMap = Record<string,any>

// type SliderProps = React.ComponentProps<typeof Slider>
// export function SliderDemo({ className, ...props }: SliderProps)