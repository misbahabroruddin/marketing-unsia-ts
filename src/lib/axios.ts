"use client";

import axios from "axios";

export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
