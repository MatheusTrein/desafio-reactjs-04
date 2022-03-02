import axios from "axios";
import { FoodTypes, RequestFood } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const FOODS_GET = (path: string, parameter?: string) => {
  return {
    path: parameter ? `${path}/${parameter}` : `${path}`,
    config: {
      method: "GET",
      caches: "no-store",
    },
  };
};

export const FOOD_POST = (path: string, body: RequestFood) => {
  return {
    path,
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    },
  };
};

export const FOOD_PUT = (path: string, parameter: string, body: FoodTypes) => {
  return {
    path: `${path}/${parameter}`,
    config: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    },
  };
};

export const FOOD_DELETE = (path: string, parameter: string) => {
  return {
    path: `${path}/${parameter}`,
    config: {
      method: "DELETE",
    },
  };
};

export default api;
