import { message } from "antd";

const showSuccess = (content: string) => {
  message.success({
    content,
    duration: 3, // Duration in seconds
  });
};

const showError = (content: string) => {
  message.error({
    content,
    duration: 3, // Duration in seconds
  });
};

const showWarning = (content: string) => {
  message.warning({
    content,
    duration: 3, // Duration in seconds
  });
};

const showInfo = (content: string) => {
  message.info({
    content,
    duration: 3, // Duration in seconds
  });
};

export { showSuccess, showError, showWarning, showInfo };
