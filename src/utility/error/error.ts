import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

export const errorMesage = (err: unknown) => {
    const error = err as FetchBaseQueryError & { data?: { message?: string } };
    toast.error(error.data?.message || "Something went wrong ❌");
}