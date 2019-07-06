using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    /// <summary>
    /// Phiếu mượn
    /// </summary>
    public class BorrowingBook
    {
        #region Constructor
        public BorrowingBook()
        {

        }

        /// <summary>
        /// Constructor của bảng Phiếu mượn
        /// </summary>
        /// <param name="borrowingBookID">Mã ID phiếu mượn</param>
        /// <param name="borrowingBookCode">Mã code phiếu mượn, số phiếu</param>
        /// <param name="bookReaderID">Mã ID của bạn đọc</param>
        /// <param name="dueDate"> Ngày đến hạn trả sách, ngày hẹn trả sách</param>
        /// <param name="borrowingDate">Ngày mượn sách</param>
        /// <param name="borrowingBookDetailID">Mã ID chi tiết phiếu mượn </param>
        public BorrowingBook(Guid borrowingBookID, string borrowingBookCode, Guid bookReaderID, DateTime dueDate, DateTime borrowingDate, bool returnBookState, DateTime returnDate, Guid bookID)
        {
            this.BorrowingBookID = borrowingBookID;
            this.BorrowingBookCode = borrowingBookCode;
            this.BookReaderID = bookReaderID;
            this.DueDate = dueDate;
            this.BorrowingDate = borrowingDate;
            this.ReturnBookState = returnBookState;
            this.ReturnDate = returnDate;
            this.BookID = bookID;
        }
        #endregion

        #region Fields
        /// <summary>
        /// Mã ID phiếu mượn    
        /// </summary>
        public Guid BorrowingBookID { get; set; }

        /// <summary>
        /// Mã Code phiếu mượn, Số phiếu
        /// </summary>
        public string BorrowingBookCode { get; set; }

        /// <summary>
        /// mã ID của bạn đọc
        /// </summary>
        public Guid BookReaderID { get; set; }

        /// <summary>
        /// Ngày đến hạn trả sách, ngày hẹn trả sách
        /// </summary>
        public DateTime DueDate { get; set; }

        /// <summary>
        /// Ngày mượn sách
        /// </summary>
        public DateTime BorrowingDate { get; set; }

        /// <summary>
        /// Trạng thái mượn trả (false là mượn, true là đã trả
        /// </summary>
        public bool? ReturnBookState { get; set; }
  
        /// <summary>
        /// Ngày trả sách, ngày báo mất
        /// </summary>
        public DateTime ReturnDate { get; set; }

        /// <summary>
        /// Mã tài liệu mượn trả
        /// </summary>
        public Guid BookID { get; set; }
        #endregion
    }
}
