using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    public class BookReaderFilter
    {
        /// <summary>
        ///  Tổng số bảng ghi sau khi Lọc, sắp sếp, phân trang
        /// </summary>
        public int TotalRecord { get; set; }
        /// <summary>
        /// Tổng số trang sau khi phân trang
        /// </summary>
        public int TotalPage { get; set; }
        /// <summary>
        /// Danh sách bảng ghi sau khi lọc , sx, paging
        /// </summary>
        public List<BookReader> ListBookReaderFilter { get; set; }
    }
}
