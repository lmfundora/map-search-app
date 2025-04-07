import { AxiosError } from "axios";
import { toast } from "sonner";

export const handleErrors = (error: AxiosError) => {
  toast.error("Ups ha ocurrido un error");
};
