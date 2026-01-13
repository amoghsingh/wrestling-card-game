import Toaster from "../components/Toaster";
import { useState } from "react";

const useToaster = () => {
  const [notification, setNotification] = useState(null);

  let timer: number;
  const triggerNotification = (notificationProps) => {
    clearTimeout(timer);
    setNotification(notificationProps);

    timer = setTimeout(() => {
      setNotification(null);
    }, notificationProps.duration);
  };

  const createNotification = () => {};

  const NotificationComponent = notification ? (
    <>
      <Toaster {...notification} />
    </>
  ) : null;

  return { NotificationComponent, triggerNotification };
};

export default useToaster;
