import { Kind, KindType } from "@/lib/firestore";

export const nextKind = (previous: KindType | null): KindType => {
    if (previous === Kind.In) return Kind.Out;

    return Kind.In;
}