using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    class Class
    {
        #region Constructor
        public Class()
        {

        }

        /// <summary>
        /// Constructor của bảng Lớp
        /// </summary>
        /// <param name="classID">Mã ID lớp học</param>
        /// <param name="classCode">Mã lớp</param>
        /// <param name="className">Tên lớp</param>
        /// <param name="grade">Mã tài liệu mượn trả</param>
        /// <param name="schoolLevel">Tương ứng với các khối ( 1-->12)</param>
        /// <param name="schoolLevelName">Tên cấp học</param>
        public Class(Guid classID, string classCode, string className, string grade, int schoolLevel, string schoolLevelName)
        {
            this.ClassID = classID;
            this.ClassCode = classCode;
            this.ClassName = className;
            this.Grade = grade;
            this.SchoolLevel = schoolLevel;
            this.SchoolLevelName = schoolLevelName;
        }
        #endregion


        #region Fields

        /// <summary>
        /// Mã ID lớp học
        /// </summary>
        public Guid ClassID { get; set; }

        /// <summary>
        /// Mã lớp
        /// </summary>
        public string ClassCode { get; set; }

        /// <summary>
        /// Tên lớp
        /// </summary>
        public string ClassName { get; set; }

        /// <summary>
        /// Tương ứng với các khối ( 1-->12)
        /// </summary>
        public string Grade { get; set; }

        /// <summary>
        /// Cấp học (1-Tiểu học, 2-THCS, 3-THPT)
        /// </summary>
        public int SchoolLevel { get; set; }

        /// <summary>
        /// tên cấp học
        /// </summary>
        public string SchoolLevelName { get; set; }
        #endregion
    }
}
