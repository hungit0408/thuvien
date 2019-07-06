using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuanLyThuVien.Models
{
    /// <summary>
    /// Class nhà xuất bản
    /// Created by DXVUNG (13/5/2019)
    /// </summary>
    public class Publishers
    {
        
        private Guid _publisherID;

        public Guid PublisherID
        {
            get { return _publisherID; }
            set { _publisherID = value; }
        }
        /// <summary>
        /// Danh sách nhà xuất bản tĩnh
        /// Created by DXVUNG (13/5/2019)
        /// </summary>
        public static List<Publishers> ListPublishers = new List<Publishers>()
        {
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="1", PublisherName="Kim Đồng", Address="QL32, thị Trấn Phùng, huyện Đan Phượng, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="2", PublisherName="Đại học Quốc gia Hà Nội", Address="47A Phạm Viết Chánh",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="3", PublisherName="Đại học Bách khoa Hà Nội", Address="",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="4", PublisherName="Học viện Công nghệ Bưu chính Viễn thông", Address="Số 216, đường 30/4, Phường Xuân Khánh",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="5", PublisherName="Tuổi trẻ", Address="666 Nguyễn Duy Trinh, Khu phố 3, Phường Bình Trưng Đông",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="6", PublisherName="Phụ nữ", Address="346 Văn Cao, phường Đằng Lâm, quận Hải An,  TP. Hải Phòng",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="7", PublisherName="Thời đại", Address="180 đường 26/3, P. Châu Văn Liêm ",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="8", PublisherName="Tiền phong", Address="20 Chiến Thắng, Phường Văn Quán, Quận Hà Đông, Thành phố Hà Nội",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="9", PublisherName="Thanh niên", Address="276B Lạch Tray, phường Lạch Tray, quận Ngô Quyền, TP. Hải Phòng",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="10", PublisherName="Sài Gòn", Address="754 Hàm Tử, Phường 5, Quận 5, HCM",Note="", Use=true},


            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="11", PublisherName="Đại học Mở", Address="436/33 đường CMT8, P.11",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="12", PublisherName="Nông nghiệp xanh", Address="QL32, thị trấn Tây Đằng, huyện Ba Vì, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="13", PublisherName="Hành chính sự nghiệp", Address="2/95B Bùi Thị Lùng, ấp Nam Thới, xã Tam Thới, Hóc Môn",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="14", PublisherName="Nông nghiệp và phát triển nông thôn", Address="QL21B, thị trấn Kim Bài, huyện Thanh Oai, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="15", PublisherName="Hành chính công vụ", Address="19 Lê Lợi, thị trấn Vân Đình, huyện Ứng Hòa, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="16", PublisherName="Công an nhân dân", Address="Lô J1/J2, Khu CN Thăng Long, Đông Anh, Hà Nội",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="17", PublisherName="Công nghiệp", Address="Xóm 2,Thôn Nguyễn Đào, xã Hải Tân, huyện Hải Hậu, Nam Định",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="18", PublisherName="An ninh quốc phòng", Address="7 Phố Đức Chính, phường Lê Lợi, thị xã Sơn Tây, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="19", PublisherName="Chính phủ", Address="",Note="", Use=true},


            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="20", PublisherName="Công thương", Address="B23/474C, Trần Đại Nghĩa, Ấp 2, xã Tân Nhựt, huyện Bình Chánh, HCM",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="21", PublisherName="Việt nam mới", Address="QL21B, thị trấn Kim Bài, huyện Thanh Oai, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="22", PublisherName="Dân trí", Address="QL32, thị trấn Phúc Thọ, huyện Phúc Thọ, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="23", PublisherName="Cộng sản", Address="",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="24", PublisherName="Đà Nẵng", Address="",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="25", PublisherName="Đại học Sư phạm Huế", Address="QL21B, thị trấn Kim Bài, huyện Thanh Oai, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="26", PublisherName="Hải Dương", Address="",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="27", PublisherName="Mũi Cà Mau", Address="754 Hàm Tử, Phường 5, Quận 5, HCM",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="28", PublisherName="Giấy Bãi Bằng", Address="B23/474C, Trần Đại Nghĩa, Ấp 2, xã Tân Nhựt, huyện Bình Chánh, HCM",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="29", PublisherName="Nghệ An", Address="5 Nguyễn Hữu Thọ, phường Hòa Thuận Tây, quận Hải Châu, TP. Đà Nẵng",Note="", Use=true},


            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="30", PublisherName="Phương Đông", Address="Tỉnh lộ 419, thị trấn Quốc  Oai, huyện Quốc Oai, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="31", PublisherName="Phương Tây", Address="Bùi Huy Bích, phường Hoàng Liệt, quận Hoàng Mai, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="32", PublisherName="Khoa học Tự nhiên", Address="7 Phó Đức Chính, phường Lê Lợi, thị xã Sơn Tây, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="33", PublisherName="Khoa học xã hội và nhân văn", Address="40 Hàng Bài, phường Hàng Bài, quận Hoàn Kiếm, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="34", PublisherName="Văn hóa mới", Address="Bùi Huy Bích, phường Hoàng Liệt, quận Hoàng Mai, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="35", PublisherName="Công ty in văn hóa Miền Tây", Address="Quốc lộ 39A, Cụm CN Đông Phong, xã Đông Phong, huyện Đông Hưng, tỉnh Thái Bình",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="36", PublisherName="Công ty in Thành Công", Address="",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="37", PublisherName="Công ty một thành viên", Address="Sài Đồng A, phường Việt Hưng, quận Long Biên, HN",Note="", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="38", PublisherName="Công ty in Công thương", Address="",Note="Mới đóng cửa", Use=true},
            new Publishers{ PublisherID=Guid.NewGuid(), PublisherCode="39", PublisherName="Công ty Mai Cao", Address="",Note="", Use=true},


        };
        /// <summary>
        /// ID nhà xuất bản
        /// Created by DXVUNG (13/5/2019)
        /// </summary>
        
        /// <summary>
        /// Mã nhà xuất bản
        /// Created by DXVUNG (13/5/2019)
        /// </summary>
        public string PublisherCode { get; set; }
        /// <summary>
        /// Tên nhà xuất bản
        /// Created by DXVUNG (13/5/2019)
        /// </summary>
        public string PublisherName { get; set; }
        /// <summary>
        /// Địa chỉ
        /// Created by DXVUNG (13/5/2019)
        /// </summary>
        public string Address { get; set; }

        public string Note { get; set; }
        // <summary>
        /// Sử dụng
        /// Created by DXVUNG (13/5/2019)
        /// </summary>
        public bool Use { get; set; }
    }
}