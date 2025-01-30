import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast, { ToastType } from "react-native-toast-message";

type ToastProps = {
  type: ToastType;
  text1: string;
  text2?: string;
  time?: number;
};

export default function useToast() {
  const insets = useSafeAreaInsets();

  const toast = ({ type, text1, text2, time = 3000 }: ToastProps) => {
    Toast.show({
      type,
      text1,
      text2,
      position: "top",
      visibilityTime: time,
      topOffset: insets.top,
    });
  };

  return toast;
}
