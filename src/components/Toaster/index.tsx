import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
  AiOutlineClose,
} from "react-icons/ai";
import "./style.scss";

const icons = {
  success: <AiOutlineCheckCircle />,
  info: <AiOutlineInfoCircle />,
  warning: <AiOutlineWarning />,
  error: <AiOutlineCloseCircle />,
};

const Toaster = ({ message, type, duration }) => {
  return (
    <>
      <div className={`notification ${type}`}>
        {icons[type]}
        {message}
        <AiOutlineClose color="white" />
      </div>
    </>
  );
};

export default Toaster;
