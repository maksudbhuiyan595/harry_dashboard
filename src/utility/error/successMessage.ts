import { toast } from "sonner"

export const successMessage = (msg?: string | null) => {
    return toast.success(msg);
}