using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    class BookCategory
    {
        #region Constructor 
        public BookCategory() { }
        /// <summary>
        /// Contructor của bảng Nhóm sách
        /// </summary>
        /// <param name="bookCategoryID"></param>
        /// <param name="bookCategoryName"></param>
        public BookCategory(Guid bookCategoryID,string bookCategoryName)
        {
            this.BookCategoryID = bookCategoryID;
            this.BookCategoryName = bookCategoryName;
        }
        #endregion

        #region Fields
        /// <summary>
        /// Mã ID của loại sách
        /// </summary>
        public Guid BookCategoryID  {get; set; }

        /// <summary>
        /// Tên loại sách
        /// </summary>
        public string BookCategoryName { get; set; }
        #endregion
    }
}
