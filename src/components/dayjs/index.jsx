//day js
import dayjs from "dayjs";

export const formatDate = (date) => {
  return dayjs(date).format("DD MMMM YYYY");
};
