using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    class Organizition
    {
        #region Constructor
        public Organizition()
        {

        }

        /// <summary>
        /// Constructor của bảng Tổ chức
        /// </summary>
        /// <param name="organizitionID">Mã ID của tổ chức</param>
        /// <param name="organizitionCode">Mã code của tổ chứ</param>
        /// <param name="organizitionName">Tên của tổ chức</param>
        public Organizition(Guid organizitionID, string organizitionCode, string organizitionName)
        {
            this.OrganizitionID = organizitionID;
            this.OrganizitionCode = organizitionCode;
            this.OrganizitionName = organizitionName;
        }
        #endregion

        #region Fields
        /// <summary>
        /// Mã ID của tổ chức
        /// </summary>
        public Guid OrganizitionID { get; set; }

        /// <summary>
        /// Mã code của tổ chức
        /// </summary>
        public string OrganizitionCode { get; set; }

        /// <summary>
        /// Tên của tổ chức
        /// </summary>
        public string OrganizitionName { get; set; }
        #endregion
    }
}
