using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuanLyThuVien.Models
{
    /// <summary>
    /// Lớp dùng để khởi tạo dữ liệu cho các bảng dữ liệu
    /// </summary>
    /// Created by BQLINH(28/5/2019)
    public class QLTHDB
    {
        /// <summary>
        /// Danh sách nhà cung cấp tĩnh
        /// Created by BQLINH (13/5/2019)
        /// </summary>
        public static List<Supplier> ListSuppliers = new List<Supplier>()
        {
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC001", SupplierName="Công ty in văn hóa Sài Gòn 1", Address="754 Hàm Tử, Phường 5, Quận 5, HCM 8",TaxCode="8207604443",Note="", Use=false},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC002", SupplierName="Công ty ITAXA 1" , Address="126 Nguyễn Thị Minh Khai, Phường 6, Quận 3, HCM",TaxCode="7207925553",Note="",   Use=false},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC003", SupplierName="Công ty cổ phần in Việt Phát 1",Address="287/5 Phan Đình Phùng, TP Quảng Ngãi",TaxCode="8296527896", Note="",  Use=true},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC004", SupplierName="Công ty in văn hóa Sài Gòn 2", Address="754 Hàm Tử, Phường 5, Quận 5, HCM 2",TaxCode="8207604444",Note="",   Use=true},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC005", SupplierName="Công ty MISA 1", Address="126 Nguyễn Thị Minh Khai, Phường 6, Quận 3, HCM",TaxCode="7207925554", Note="",  Use=true},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC006", SupplierName="Công ty cổ phần in Việt Phát 2", Address="287/5 Phan Đình Phùng, TP Quảng Ngãi",TaxCode="8296527897", Note="",  Use=false},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC007", SupplierName="Công ty in văn hóa Sài Gòn 3", Address="754 Hàm Tử, Phường 5, Quận 5, HCM 5 ", TaxCode="8207604445", Note="", Use=true},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC008", SupplierName="Công ty ITAXA 2", Address="126 Nguyễn Thị Minh Khai, Phường 6, Quận 3, HCM",TaxCode="7207925555",Note="",  Use=true},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC009", SupplierName="Công ty cổ phần in Việt Phát 3", Address="287/5 Phan Đình Phùng, TP Quảng Ngãi", TaxCode="8296527898", Note="", Use=false},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0010", SupplierName="Công ty in văn hóa Sài Gòn 4", Address="754 Hàm Tử, Phường 5, Quận 5, HCM 4",TaxCode="8207604445",Note="",   Use=true},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0011", SupplierName="Công ty in văn hóa Sài Gòn 5", Address="754 Hàm Tử, Phường 5, Quận 5, HCM 3",TaxCode="8207604443",Note="", Use=false},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0012", SupplierName="Công ty ITAXA 3" , Address="126 Nguyễn Thị Minh Khai, Phường 6, Quận 3, HCM",TaxCode="7207925553",Note="",   Use=false},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0013", SupplierName="Công ty cổ phần in Việt Phát 4",Address="287/5 Phan Đình Phùng, TP Quảng Ngãi",TaxCode="8296527896", Note="",  Use=true},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0014", SupplierName="Công ty in văn hóa Sài Gòn 6", Address="754 Hàm Tử, Phường 5, Quận 5, HCM 6",TaxCode="8207604444",Note="",   Use=true},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0015", SupplierName="Công ty MISA 2", Address="126 Nguyễn Thị Minh Khai, Phường 6, Quận 3, HCM",TaxCode="7207925554", Note="",  Use=true},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0016", SupplierName="Công ty cổ phần in Việt Phát 5", Address="287/5 Phan Đình Phùng, TP Quảng Ngãi",TaxCode="8296527897", Note="",  Use=false},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0017", SupplierName="Công ty in văn hóa Sài Gòn 7", Address="754 Hàm Tử, Phường 5, Quận 5, HCM 7", TaxCode="8207604445", Note="", Use=true},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0018", SupplierName="Công ty ITAXA 4", Address="126 Nguyễn Thị Minh Khai, Phường 6, Quận 3, HCM",TaxCode="7207925555",Note="",  Use=true},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0019", SupplierName="Công ty cổ phần in Việt Phát 6", Address="287/5 Phan Đình Phùng, TP Quảng Ngãi", TaxCode="8296527898", Note="", Use=false},
             new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0017", SupplierName="Công ty in văn hóa Sài Gòn 7", Address="754 Hàm Tử, Phường 5, Quận 5, HCM 7", TaxCode="8207604445", Note="", Use=true},
            new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0018", SupplierName="Công ty ITAXA 4", Address="126 Nguyễn Thị Minh Khai, Phường 6, Quận 3, HCM",TaxCode="7207925555",Note="",  Use=true},
             new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0019", SupplierName="Công ty cổ phần in Việt Phát 6", Address="287/5 Phan Đình Phùng, TP Quảng Ngãi", TaxCode="8296527898", Note="", Use=false}, new Supplier{SupplierID=Guid.NewGuid(), SupplierCode="NCC0017", SupplierName="Công ty in văn hóa Sài Gòn 7", Address="754 Hàm Tử, Phường 5, Quận 5, HCM 7", TaxCode="8207604445", Note="", Use=true},
          
        };
    }
}