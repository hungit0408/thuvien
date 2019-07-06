using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    /// <summary>
    /// Class chứa thực thể của 3 bảng (Bạn đọc, phiếu mượn,sách, )
    /// </summary>
    public class BorrowingBookReader
    {
        public BorrowingBookReader()
        {

        }
        /// <summary>
        /// Mã ID của thẻ thư viện
        /// </summary>
        public Guid BookReaderID { get; set; }

        /// <summary>
        /// Mã vạch của sách
        /// </summary>
        public string ISBNCode { get; set; }

        /// <summary>
        /// Mã đăng kí cá biệt 
        /// </summary>
        public string DKCBCode { get; set; }

        /// <summary>
        /// Tiêu đề sách
        /// </summary>
        public string BookTitle { get; set; }

        /// <summary>
        /// Tác giả
        /// </summary>
        public string Author { get; set; }

        /// <summary>
        /// Mã Code phiếu mượn, Số phiếu
        /// </summary>
        public string BorrowingBookCode { get; set; }

        /// <summary>
        /// Ngày đến hạn trả sách, ngày hẹn trả sách
        /// </summary>
        public DateTime DueDate { get; set; }

        /// <summary>
        /// Ngày mượn sách
        /// </summary>
        public DateTime BorrowingDate { get; set; }

        /// <summary>
        /// Trạng thái mượn trả (3 là mượn, 2 là đã trả, 1 là mất ) 
        /// </summary>
        public int ReturnBookState { get; set; }

        /// <summary>
        /// Ngày trả sách, ngày báo mất
        /// </summary>
        public DateTime ReturnDate { get; set; }

    }
}
