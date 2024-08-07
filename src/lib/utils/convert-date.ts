// 07-Agustus-2024
export const convertDate = (data: Date | string, separator = "-") => {
  const date = new Date(data);
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const parts = formattedDate.split(" ");
  const result = `${parts[0]}${separator}${parts[1]}${separator}${parts[2]}`;
  return result;
};

// 2024-12-30 00:00:00
export const convertDateTimeFormatForm = (originalDateStr: Date): string => {
  const date = new Date(originalDateStr);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 1991-07-15
export const convertDateFormatForm = (data: Date | string, separator = "-") => {
  const date = new Date(data);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const result = `${year}${separator}${month}${separator}${day}`;
  return result;
};
