import toast from "react-hot-toast";

type ShowToastProps = {
  type: "success" | "error" | "info";
  message: string;
}

export const showToast: ShowToastProps  = (type, message) => {
  toast[type](message, {
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}