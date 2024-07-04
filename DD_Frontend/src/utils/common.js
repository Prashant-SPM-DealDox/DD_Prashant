import axios from "axios";
import { baseUrl, secretKey } from "../config";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import CryptoJS from "crypto-js";

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const isAuthenticated = () => {
  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return userData ? true : false;
};

export const getToken = () => {
  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return userData ? userData?.token : null;
};

export const logOut = (reload = true) => {
  localStorage.removeItem("user");
  if (reload) {
    window.location.reload();
  }
};

export const showSuccessMessage = (msg) => {
  toast(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: "success",
    theme: "colored",
  });
};

export const showErrorMessage = (msg) => {
  toast(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: "error",
    theme: "colored",
  });
};
export const baseToastConfig = (msg) => {
  toast.error(msg, {
    className: "toast-error-custom",
    style: {
      height: "15px",
      width: "100vw",
      position: "relative",
      left: "-77vw",
      minHeight: "40px",
      fontSize: "14px",
    },
    icon: false,
    autoClose: false,
  });
};
export const showDeleteMessage = (msg) => {
  toast(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: "error",
    theme: "colored",
    // style: {
    //   backgroundColor: "white", // Set the background color to white
    //   color:"red",
    // },
    icon: (
      <span style={{ color: "white" }}>
        <AiFillDelete />
      </span>
    ),
  });
};
export const maintenanceService = async (endpoint, type, body) => {
  try {
    const response = await axios({
      baseURL: baseUrl,
      url: endpoint,
      method: type,
      data: body,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
    });

    return response;
  } catch (err) {
    showErrorMessage(err.response?.data?.error);
    console.log("API ERROR", err);
    if (err.hasOwnProperty("response")) {
      if (err?.response?.status === 401) {
        // window.location.href = "/";
        return err;
      }
      if (err.hasOwnProperty("ERR_NETWORK")) {
        return err;
      }
    }
  }
};

export const decryptEmail = (userEmail) => {
  let decryptedEmail;

  if (userEmail.length > 0) {
    const decryptedBytes = CryptoJS.AES.decrypt(userEmail, secretKey);
    decryptedEmail = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedEmail;
  } else {
    toast.error("Invalid Email");
    return null;
  }
}
export const commonService = async (endpoint, type, body) => {
  try {
    const response = await axios({
      baseURL: baseUrl,
      url: endpoint,
      method: type,
      data: body,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
    });

    return response;
  } catch (err) {
    if (err.code === "ERR_NETWORK") {
      window.location.href = "/maintenance";
    }

    // console.log("API ERROR", err);
    if (err.hasOwnProperty("response")) {
      if (err.response.status === 401) {
        // window.location.href = "/";
      }
    }
    showErrorMessage(err.response.data.error);
  }
};

export const encryptData = (data) => {
  if (data) {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }
};
export const decryptData = (encryptedData) => {
  if (encryptedData && secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptionBytes = bytes.toString(CryptoJS.enc.Utf8);
    return decryptionBytes;
  }
  return null;
};
