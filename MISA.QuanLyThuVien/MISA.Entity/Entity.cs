using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    class Entity
    {

        #region Constructor
        public Entity()
        {

        }

        /// <summary>
        /// Constructor của bảng Thực thể
        /// </summary>
        /// <param name="createrID">Mã ID của người tạoc</param>
        /// <param name="createrName">Tên người tạo</param>
        public Entity(Guid createrID, string createrName)
        {
            this.CreaterID = createrID;
            this.CreaterName = createrName;
        }
        #endregion

        #region Fields

        /// <summary>
        /// Mã ID của người tạo
        /// </summary>
        public Guid CreaterID { get; set; }

        /// <summary>
        /// Tên người tạo
        /// </summary>
        public string CreaterName { get; set; }
        #endregion
    }
}
