using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    public class Publisher
    {
        #region Constructor
        public Publisher()
        {

        }

        /// <summary>
        /// Constructor của bảng Nhà xuất bản
        /// </summary>
        /// <param name="publisherID">Mã ID của nhà xuất bản</param>
        /// <param name="publisherCode">Mã nhà xuất bản</param>
        /// <param name="publisherName">Tên nhà xuất bản</param>
        /// <param name="publisherAddress">Địa chỉ nhà xuất bản</param>
        /// <param name="note">Ghi chú</param>
        /// <param name="isused"> có được sử dụng hay không</param>
        public Publisher(Guid publisherID, string publisherCode, string publisherName, string publisherAddress, string note, Boolean isused)
        {
            this.PublisherID = publisherID;
            this.PublisherCode = publisherCode;
            this.PublisherName = publisherName;
            this.PublisherAddress = publisherAddress;
            this.Note = note;
            this.isUsed = isused;
        }
        #endregion

        #region Fields
        /// <summary>
        /// Mã ID của nhà xuất bản
        /// </summary>
        public Guid PublisherID { get; set; }

        /// <summary>
        /// Mã nhà xuất bản
        /// </summary>
        public string PublisherCode { get; set; }

        /// <summary>
        /// Tên nhà xuất bản
        /// </summary>
        public string PublisherName { get; set; }

        /// <summary>
        /// Địa chỉ nhà xuất bản
        /// </summary>
        public string PublisherAddress { get; set; }

        /// <summary>
        /// Ghi chú
        /// </summary>
        public string Note { get; set; }

        /// <summary>
        /// có được sử dụng hay không
        /// </summary>
        public bool? isUsed { get; set; }
        #endregion
    }
}
