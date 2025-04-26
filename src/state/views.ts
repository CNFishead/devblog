import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";

// Util: Parse browser type safely
const getDeviceType = (): "mobile" | "tablet" | "desktop" => {
  const ua = navigator.userAgent;
  const isMobile = /iPhone|Android.+Mobile|Windows Phone/i.test(ua);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);
  return isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
};

export const addView = async (id: string) => {
  // Grab IP info
  let ipString = "unknown";
  try {
    const { data: ipResponse } = await axios.get("https://api.bigdatacloud.net/data/client-ip");
    ipString = ipResponse.ipString;
  } catch (err) {
    console.warn("IP fetch failed:", err);
  }

  const device = getDeviceType();

  // Send to your backend to log the view
  const { data } = await axios.put(`/blog/${id}/view`, {
    ip: ipString,
    device,
  });

  return data;
};

export const useAddView = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => addView(id),
    onSuccess: () => {
      // queryClient.invalidateQueries([""]); // Update only if you're using this key
    },
    onError: (error: Error) => {
      console.error("View logging failed:", error);
    },
  });
};
