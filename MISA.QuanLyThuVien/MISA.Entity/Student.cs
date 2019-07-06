using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    class Student
    {

        #region Constructor
        public Student()
        {

        }

        /// <summary>
        /// Constructor của bảng học sinh
        /// </summary>
        /// <param name="studentID">Mã ID của học sinh</param>
        /// <param name="studentCode">Mã học sinh</param>
        /// <param name="lastName">Tên Họ đệm</param>
        /// <param name="fisrtName">Tên của học sinh</param>
        /// <param name="fullName">Tên đầy đủ</param>
        /// <param name="gender"> Giới tính</param>
        /// <param name="birthDate">Ngày sinh</param>
        /// <param name="classID">mã ID của lớp học</param>
        /// <param name="schoolYear">năm học</param>
        /// <param name="studentAddress">địa chỉ</param>
        /// <param name="studentAvata"> Ảnh đại diện</param>
        /// 
        public Student(Guid studentID, string studentCode, string lastName, string fisrtName, string fullName, Boolean gender, DateTime birthDate, string classID, string schoolYear, string studentAddress, string studentAvata)
        {
            this.StudentID = studentID;
            this.StudentCode = studentCode;
            this.LastName = lastName;
            this.FisrtName = fisrtName;
            this.FullName = fullName;
            this.Gender = gender;
            this.BirthDate = birthDate;
            this.ClassID = classID;
            this.SchoolYear = schoolYear;
            this.StudentAddress = studentAddress;
            this.StudentAvata = studentAvata;
        }
        #endregion

        #region Fields

        /// <summary>
        /// Mã ID của học sinh
        /// </summary>
        public Guid StudentID { get; set; }

        /// <summary>
        /// Mã học sinh
        /// </summary>
        public string StudentCode { get; set; }

        /// <summary>
        /// Tên Họ đệm
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Tên của học sinh
        /// </summary>
        public string FisrtName{ get; set; }

        /// <summary>
        /// Tên đầy đủ
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Giới tính
        /// </summary>
        public bool? Gender { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime BirthDate { get; set; }

        /// <summary>
        /// mã ID của lớp học
        /// </summary>
        public string ClassID { get; set; }

        /// <summary>
        /// năm học
        /// </summary>
        public string SchoolYear { get; set; }

        /// <summary>
        /// địa chỉ
        /// </summary>
        public string StudentAddress { get; set; }

        /// <summary>
        /// Ảnh đại diện
        /// </summary>
        public string StudentAvata { get; set; }
        #endregion
    }
}
