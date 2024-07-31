import { message } from "antd";

const showSuccess = (content: string) => {
  message.success({
    content,
    duration: 3, 
  });
};

const showError = (content: string) => {
  message.error({
    content,
    duration: 3, 
  });
};

const showWarning = (content: string) => {
  message.warning({
    content,
    duration: 3, 
  });
};

const showInfo = (content: string) => {
  message.info({
    content,
    duration: 3, 
  });
};

export { showSuccess, showError, showWarning, showInfo };
