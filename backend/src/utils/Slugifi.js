export default function slugify(text) {
  return text
    .toString()                     // Chuyển đổi text thành chuỗi
    .normalize("NFD")               // Chuẩn hóa chuỗi Unicode
    .replace(/[\u0300-\u036f]/g, "")// Loại bỏ dấu tiếng Việt
    .toLowerCase()                  // Chuyển thành chữ thường
    .trim()                         // Loại bỏ khoảng trắng ở đầu và cuối
    .replace(/\s+/g, "-")           // Thay thế các khoảng trắng bằng dấu gạch ngang
    .replace(/[^\w\-]+/g, "")       // Loại bỏ các ký tự không phải là chữ cái, chữ số hoặc dấu gạch ngang
    .replace(/--+/g, "-")           // Thay thế dấu gạch ngang liên tiếp bằng một dấu gạch ngang
    .replace(/^-+/, "")             // Loại bỏ dấu gạch ngang ở đầu chuỗi
    .replace(/-+$/, "");            // Loại bỏ dấu gạch ngang ở cuối chuỗi
}
//