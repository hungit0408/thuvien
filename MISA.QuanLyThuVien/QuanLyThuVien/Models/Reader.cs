using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuanLyThuVien.Models
{
    /// <summary>
    /// Lớp Reader định nghĩa một độc giả trong thư viện là học sinh
    /// NVSON (3/5/2019)
    /// </summary>
    public class Reader
    {
        
        /// <summary>
        /// Hàm khởi tạo không tham số
        /// </summary>
        public Reader()
        {

        }
        /// <summary>
        /// Hàm khởi tạo 8 đối số
        /// NVSON (13/5/2019)
        /// </summary>
        /// <param Mã thẻ="memberCode"></param>
        /// <param Tên bạn đọc="memberName"></param>
        /// <param Tên lớp="className"></param>
        /// <param Giới tính="gender" (0 - nam , 1- nữ , khác - không xác định)></param>
        /// <param Ngày sinh="birthday"></param>
        /// <param Ngày cấp="dateAllocated"></param>
        /// <param Ngày hiệu lực="dateEffect"></param>
        /// <param Ngày hết hạn="dateExpired"></param>
        public Reader(string memberCode, string firstName,string lastName, string className, int gender, DateTime birthday, DateTime dateAllocated, DateTime dateEffect, DateTime dateExpired, string address )
        {
            this.MemberID = Guid.NewGuid();
            this.MemberCode = memberCode;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.ClassName = className;
            this.Gender = gender;
            this.Birthday = birthday;
            this.DateAllocated = dateAllocated;
            this.DateEffect = dateEffect;
            this.DateExpired = dateExpired;
            this.Address = address;
        }
        private Guid _memberID;
        private string _memberCode ;
        private string _firstName ;
        private string _lastName ;
        private string _memberName ;
        private string _className ;
        private int _gender ;
        private string _genderName ;
        private DateTime _birthday ;
        private DateTime _dateAllocated ;
        private DateTime _dateEffect ;
        private DateTime _dateExpired ;
        private string _address ;

        public Guid MemberID
        {
            get
            {
                return _memberID;
            }

            set
            {
                _memberID = value;
            }
        }

        public string MemberCode
        {
            get
            {
                return _memberCode;
            }

            set
            {
                _memberCode = value;
            }
        }

        public string FirstName
        {
            get
            {
                return _firstName;
            }

            set
            {
                _firstName = value;
                this.MemberName = value;
            }
        }

        public string LastName
        {
            get
            {
                return _lastName;
            }

            set
            {
                _lastName = value;
                this.MemberName += " ";
                this.MemberName += value;
            }
        }

        public string MemberName
        {
            get
            {
                return _memberName;
            }

            set
            {
                _memberName = value;
            }
        }

        public string ClassName
        {
            get
            {
                return _className;
            }

            set
            {
                _className = value;
            }
        }

        public int Gender
        {
            get { return _gender; }
            set
            {
                this._gender = value;
                switch (value)
                {
                    case 0:
                        this.GenderName = "Nam";
                        break;
                    case 1:
                        this.GenderName = "Nữ";
                        break;
                    default:
                        this.GenderName = "Không xác định";
                        break;
                }
            }
        }

        public string GenderName
        {
            get
            {
                return _genderName;
            }

            set
            {
                _genderName = value;
            }
        }

        public DateTime Birthday
        {
            get
            {
                return _birthday;
            }

            set
            {
                _birthday = value;
            }
        }

        public DateTime DateAllocated
        {
            get
            {
                return _dateAllocated;
            }

            set
            {
                _dateAllocated = value;
            }
        }

        public DateTime DateEffect
        {
            get
            {
                return _dateEffect;
            }

            set
            {
                _dateEffect = value;
            }
        }

        public DateTime DateExpired
        {
            get
            {
                return _dateExpired;
            }

            set
            {
                _dateExpired = value;
            }
        }

        public string Address
        {
            get
            {
                return _address;
            }

            set
            {
                _address = value;
            }
        }

       

        /// <summary>
        /// Khởi tạo mới một danh sách (static) bạn đọc  
        /// </summary>
        public static List<Reader> ListReader = new List<Reader>
        {
            new Reader("HS00101","Nguyễn Văn","Sơn", "16A04", 0, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00102","Hoàng","Tuấn Anh", "16A04",0, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00103","Nguyễn Thị", "Linh Chi", "16A04", 1, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00104","Nguyễn", "Tiến Đạt", "16A04", 0, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00105","Phan", "Đức Anh", "16A04", 0, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00106","Đoàn", "Hải Dương", "16A04", 0, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00107","Phan", "Anh Khoa", "16A04", 0, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00108","Phan", "Anh Đức", "16A04", 0, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00109","Đoàn Hải", "Minh", "16A04", 0, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00110","Nguyễn Đức", "Duy", "16A04", 0, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00112","Nguyễn Thị", "Hà", "16A04", 1, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00113","Bùi Thị Minh", "Hòa", "16A04", 1, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00114","Hoàng Việt", "Hưng", "16A04", 0, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00115","Trần Thị Thu", "Huyền", "16A04", 1, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00116","Đặng Thị", "Khánh Linh", "16A04", 1, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00117","Lê Thị Phương", "Linh", "16A04", 1, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00118","Nguyễn Thị", "Duyên", "16A04", 1, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
            new Reader("HS00119","Đỗ Đức", "Mạnh", "16A04", 0, new DateTime(1998,09,15),new DateTime(2019,03,15),new DateTime(2019,06,05),new DateTime(2019,07,03),""),
        };
    }
}