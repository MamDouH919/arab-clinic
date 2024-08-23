import db from "@/db/db"
import FormItem from "./form"

export default async function EditHighlight({
    children,
    id
}: {
    id: number
    children: React.ReactNode,
}) {
    const highlight = await db.highlights.findUnique({ where: { id } })

    console.log(highlight);
    

    return (
        <FormItem id={id} data={{
            nameAr: highlight?.nameAr!,
            nameEn: highlight?.nameEn!,
            number: highlight?.number!,
        }}>
            {children}
        </FormItem>
    )
}
