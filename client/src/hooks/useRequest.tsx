import { axiosInstance } from "../api";
import { useState } from "react";
import { Methods } from "../common";

interface Props {
  url: string;
  method: "get" | "post" | "put" | "patch";
  body?: object;
  onSuccess?: Function;
  onError?: Function;
}

export const useRequest = ({
  url,
  method,
  body,
  onSuccess,
  onError,
}: Props) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      const { data } = await axiosInstance[method](url, body);
      if (onSuccess) {
        onSuccess(data);
      }
      return data;
    } catch (err: any) {
      setErrors(err.response.data.errors);
      if (onError) {
        onError(err.response.data.errors);
      }
    }
  };

  return { doRequest, errors };
};
