import { toast } from "react-toastify";

const useToast = (message, status = null) => {

  if (!status) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "dark",
    });
  } else if (status === "error") {

    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "dark",
    });
  }
};

export default useToast;
