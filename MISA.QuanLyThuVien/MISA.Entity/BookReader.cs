using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    public class BookReader
    {

        #region MemberVariables
        /// <summary>
        /// ID Bạn đọc
        /// </summary>
        private Guid _bookReaderID { get; set; }
        /// <summary>
        /// Mã Độc giả
        /// </summary>
        private string _bookReaderCode { get; set; }
        /// <summary>
        /// Tên lớp
        /// </summary>
        private string _classOrOrganizationUnit { get; set; }
        /// <summary>
        /// Địa chỉ
        /// </summary>
        private string _bookReaderAddress { get; set; }
        /// <summary>
        /// Ngày sinh
        /// </summary>
        private DateTime? _birthDate { get; set; }
        /// <summary>
        /// Mã ID người tạo
        /// </summary>
        private Guid _createrID { get; set; }
        /// <summary>
        /// Ngày tạo
        /// </summary>
        private DateTime? _createdDate { get; set; }
        /// <summary>
        /// Ngày hết hạn
        /// </summary>
        private DateTime? _expiryDate { get; set; }
        /// <summary>
        /// Tên bạn đọc
        /// </summary>
        private string _firstName { get; set; }
        /// <summary>
        /// Tên đầy đủ của bạn đọc
        /// </summary>
        private string _fullName { get; set; }
        /// <summary>
        /// Giới tính 1-Nam, 0-Nữ, rỗng - không xác đinh
        /// </summary>
        private bool? _gender { get; set; }
        /// <summary>
        /// Ngày cấp thẻ
        /// </summary>
        private DateTime? _issueDate { get; set; }
        /// <summary>
        /// Tên họ và tên đệm
        /// </summary>
        private string _lastName { get; set; }
        /// <summary>
        /// Người thay đổi bản ghi
        /// </summary>
        private string _modifiedBy { get; set; }
        /// <summary>
        /// Ngày thay đổi bản ghi
        /// </summary>
        private DateTime? _modifiedDate { get; set; }
        /// <summary>
        /// Ngày hiệu lực
        /// </summary>
        private DateTime? _validityDate { get; set; }
        /// <summary>
        /// Check có phải là sinh viên
        /// </summary>
        private bool _isStudent { get; set; }
        #endregion


        #region Fields

        /// <summary>
        /// ID Bạn đọc
        /// </summary>
        public Guid BookReaderID
        {
            get { return _bookReaderID; }
            set { _bookReaderID = value; }
        }
        /// <summary>
        /// Mã Bạn đọc
        /// </summary>
        public string BookReaderCode
        {
            get { return _bookReaderCode; }
            set { _bookReaderCode = value; }
        }
        /// <summary>
        /// Tên lớp
        /// </summary>
        public string ClassOrOrganizationUnit
        {
            get { return _classOrOrganizationUnit; }
            set { _classOrOrganizationUnit = value; }
        }
        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string BookReaderAddress
        {
            get { return _bookReaderAddress != null ? _bookReaderAddress : ""; }
            set { _bookReaderAddress = value; }
        }
        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? BirthDate
        {
            get { return _birthDate; }
            set { _birthDate = value; }
        }
        /// <summary>
        /// Người tạo bản ghi
        /// </summary>
        public Guid CreaterID
        {
            get { return _createrID; }
            set { _createrID = value; }
        }
        /// <summary>
        /// Ngày tạo bản ghi
        /// </summary>
        public DateTime? CreatedDate
        {
            get { return _createdDate; }
            set { _createdDate = value; }
        }
        /// <summary>
        /// Ngày hết hạn
        /// </summary>
        public DateTime? ExpiryDate
        {
            get { return _expiryDate; }
            set { _expiryDate = value; }
        }
        /// <summary>
        /// Tên
        /// </summary>
        public string FirstName
        {
            get { return _firstName; }
            set { _firstName = value; }
        }
        /// <summary>
        /// Họ và tên
        /// </summary>
        public string FullName
        {
            get { return _fullName; }
            set { _fullName = value; }
        }
        /// <summary>
        /// Giới tính
        /// </summary>
        public bool? Gender
        {
            get { return _gender; }
            set { _gender = value; }
        }
        /// <summary>
        /// Ngày cấp
        /// </summary>
        public DateTime? IssueDate
        {
            get { return _issueDate; }
            set { _issueDate = value; }
        }
        /// <summary>
        /// Họ và đệm
        /// </summary>
        public string LastName
        {
            get { return _lastName; }
            set { _lastName = value; }
        }
        /// <summary>
        /// Người thay đổi bản ghi
        /// </summary>
        public string ModifiedBy
        {
            get { return _modifiedBy; }
            set { _lastName = value; }
        }
        /// <summary>
        /// Ngày thay đổi bản ghi
        /// </summary>
        public DateTime? ModifiedDate
        {
            get { return _modifiedDate; }
            set { _modifiedDate = value; }
        }
        /// <summary>
        /// Ngày hiệu lực
        /// </summary>
        public DateTime? ValidityDate
        {
            get { return _validityDate; }
            set { _validityDate = value; }
        }
        /// <summary>
        /// Có phải là học sinh
        /// </summary>
        public bool IsStudent
        {
            get { return _isStudent; }
            set { _isStudent = value; }
        } 
        /// <summary>
        /// Số thứ tự bản ghi
        /// </summary>
        public Int64 RowNumber
        {
            get;set;
        }
     
        #endregion
    }
}
