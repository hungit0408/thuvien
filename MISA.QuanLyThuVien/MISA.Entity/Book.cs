using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    class Book
    {
        #region Constructor
        public Book()
        {

        }

        /// <summary>
        /// Constructor của bảng Sách
        /// </summary>
        /// <param name="bookID">Mã ID của sách</param>
        /// <param name="bookCode">Mã sách</param>
        /// <param name="bookTitle">Tiêu đề</param>
        /// <param name="author">Tác giả</param>
        /// <param name="price">Giá</param>
        /// <param name="totalPage">Tổng số trang</param>
        /// <param name="publisherID">Mã ID Nhà xuất bản</param>
        /// <param name="bookCategoryID">Mã ID loại sách</param>
        /// <param name="isbnCode">Mã ISBN</param>
        /// <param name="dkcbCode">Mã dkcb</param>
        public Book(Guid bookID, string bookCode, string bookTitle, string author, decimal price, int totalPage, Guid publisherID, Guid bookCategoryID, string isbnCode, string dkcbCode)
        {
            this.BookID = bookID;
            this.BookCode = bookCode;
            this.BookTitle = bookTitle;
            this.Author = author;
            this.Price = price;
            this.TotalPage = totalPage;
            this.PublisherID = publisherID;
            this.BookCategoryID = bookCategoryID;
            this.ISBNCode = isbnCode;
            this.DKCBCode = dkcbCode;
        }
        #endregion

        #region Fields
        /// <summary>
        /// Mã ID của sách
        /// </summary>
        public Guid BookID { get; set; }

        /// <summary>
        /// Mã Code của sách
        /// </summary>
        public string BookCode { get; set; }

        /// <summary>
        /// Tiêu đề sách
        /// </summary>
        public string BookTitle  {  get; set; }

        /// <summary>
        /// Tác giả
        /// </summary>
        public string Author { get; set; }

        /// <summary>
        /// Giá sách
        /// </summary>
        public decimal Price {  get; set; }

        /// <summary>
        /// Tổng số trang
        /// </summary>
        public int TotalPage { get; set; }

        /// <summary>
        /// Mã ID nhà xuất bản
        /// </summary>
        public Guid PublisherID { get; set; }

        /// <summary>
        /// Mã loại sách
        /// </summary>
        public Guid BookCategoryID {  get; set; }

        /// <summary>
        /// Mã vạch của sách
        /// </summary>
        public string ISBNCode { get; set; }

        /// <summary>
        /// Mã đăng kí cá biệt 
        /// </summary>
        public string DKCBCode {get; set;}
        #endregion
    }
}
