import { deslugify } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import { YnsLink } from "../yns-link";

export function CategoryBox({
	categorySlug,
	src,
}: {
	categorySlug: string;
	src: ImageProps["src"];
}) {
	return (
		<YnsLink href={`/category/${categorySlug}`} className="group relative">
			<div className="relative overflow-hidden rounded-lg">
				<Image
					alt="Cover image"
					className="w-full scale-105 object-cover transition-all group-hover:scale-100 group-hover:opacity-75"
					sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 620px"
					src={src}
				/>
			</div>
			<div className="justify-end gap-2 px-4 py-2 text-neutral-600">
				<h3 className="text-lg font-bold tracking-tight">{deslugify(categorySlug)}</h3>
				<p>Shop now</p>
			</div>
		</YnsLink>
	);
}
