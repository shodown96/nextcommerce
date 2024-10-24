import { cn } from "@/lib/utils";

export default function AuthTitle({
  description = "",
  descriptionMargin = "mb-8",
  title,
}: {
  description?: string;
  descriptionMargin?: string;
  title: string;
}) {
  return (
    <div>
      <h1 className="mb-1 text-[40px] font-bold">{title}</h1>
      <p
        className={cn("text-brand-grey text-lg font-light", descriptionMargin)}
      >
        {description}
      </p>
    </div>
  );
}
