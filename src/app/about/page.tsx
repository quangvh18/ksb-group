import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Giới thiệu về công ty - KSB Group",
  description: "Chúng tôi nghiên cứu các chế độ ăn chay lành mạnh có thể kết hợp với nhau.",
};

export default function AboutPage() {
  return (
    <div id="wrapper">
      <div className="sub_page intro intro_01">
        <div className="sub_page_head">
          <h2 id="subpage_title">
            <span title="Giới thiệu về công ty">
              Giới thiệu về công ty
            </span>
          </h2>
          <p>Chúng tôi nghiên cứu các chế độ ăn chay lành mạnh có thể kết hợp với nhau.</p>
        </div>

        <div id="sub_menu">
          <div className="sub_menu container">
            <div className="home_link">
              <a href="/">
                <Image 
                  src="/images/logo-header.png" 
                  alt="trang chủ" 
                  width={21} 
                  height={21}
                />
              </a>
            </div>
            <div className="btn-group depth_01">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <strong>Giới thiệu về công ty</strong> <span className="caret"></span>
              </button>
              <ul className="dropdown-menu" role="menu">
                <li><a href="/news">Phòng tin tức</a></li>
                <li className="active"><a href="/about">Giới thiệu về công ty</a></li>
                <li><a href="/ecosystem">Thương hiệu</a></li>
                <li><a href="/partners">Trung tâm xúc tiến</a></li>
              </ul>
            </div>
            <div className="btn-group depth_02">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <strong>Thực phẩm Samyuk</strong> <span className="caret"></span>
              </button>
              <ul className="dropdown-menu" role="menu">
                <li className="active"><a href="/about">Thực phẩm Samyuk</a></li>
                <li><a href="/about">Thông điệp của CEO</a></li>
                <li><a href="/about">Giới thiệu về CI/BI</a></li>
                <li><a href="/about">Các cột mốc quan trọng</a></li>
                <li><a href="/about">Giới thiệu doanh nghiệp</a></li>
                <li><a href="/about">Hướng dẫn</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sub_page_body container">
          <div className="intro_script">
            <div className="intro_tit">
              <h3 className="text-center">
                <br />
                Samyuk Foods đang phát triển từ một nhà sản xuất sữa đậu nành thành một công ty thực phẩm tốt cho sức khỏe.
              </h3>
            </div>
            <div className="intro_sub">
              <p className="text-left fadein-up tit-text-p">
                Kể từ khi thành lập, Samyuk Foods đã không ngừng đầu tư vào nghiên cứu và phát triển, cũng như trang thiết bị hiện đại để tạo ra những sản phẩm thực phẩm chức năng chất lượng cao nhất, mang đến sự hài lòng cho tất cả mọi người, bất kể tuổi tác hay giới tính. Nhờ đó, công ty đã đạt được thành tích đáng nể khi giành giải thưởng "Thương hiệu của năm 2023", một giải thưởng danh giá do người tiêu dùng bình chọn, trong 17 năm liên tiếp ở hạng mục nội địa và 8 năm liên tiếp ở hạng mục Trung Quốc.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Image 
                src="https://www.sahmyook.co.kr/theme/syfood/img/intro/intro_01.jpg" 
                alt="Samyuk Foods" 
                width={600} 
                height={400}
                className="border-radius-left fadein-up intro-img"
              />
            </div>
            <div className="col-md-6 fadein-up">
              <h1 className="tit-text fadein-up">
                <br />
                Samyuk Foods chuẩn bị cho ngày mai tươi sáng với niềm tin và hy vọng không thay đổi.
              </h1>
              <p className="text-left fadein-up tit-text-p">
                Samyuk Foods, công ty quan tâm đến sức khỏe con người, mong muốn đóng góp cho sức khỏe con người bằng cách tạo ra hương vị trung thực với nguyên liệu trung thực bởi những người trung thực dựa trên triết lý sáng lập{" "}
                <span>"Sức khỏe cho mọi người".</span>
              </p>
            </div>
          </div>
            </div>
            
        <div className="card-cont">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-xs-12">
                <div className="card intro-card border-radius-right">
                  <div className="card-head">
                    <h3>Mục đích thành lập</h3>
                    <h5>Nuôi dưỡng tài năng tương lai và thực hiện trách nhiệm xã hội</h5>
                  </div>
                  <div className="card-body">
                    <p className="text-left">
                      Samyuk Foods là một tổ chức phi lợi nhuận của Học viện Samyuk, được thành lập nhằm mục đích thực hiện trách nhiệm xã hội của mình bằng cách truyền bá phúc âm về sức khỏe thông qua các doanh nghiệp thực phẩm tốt cho sức khỏe góp phần vào sức khỏe của quốc gia, hỗ trợ các chương trình giáo dục góp phần phát triển tài năng và thực hành chia sẻ và phục vụ cộng đồng địa phương.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-xs-12">
                <div className="card intro-card border-radius-left">
                  <div className="card-head">
                    <h3>Sứ mệnh</h3>
                    <h5>Thực phẩm lành mạnh và an toàn cùng sản xuất trung thực</h5>
                  </div>
                  <div className="card-body">
                    <p className="text-left">
                      Để tạo ra một thế giới tươi đẹp, nơi con người và thiên nhiên cùng tồn tại, chúng tôi sản xuất và cung cấp 'thực phẩm tốt cho sức khỏe làm từ nguyên liệu có nguồn gốc thực vật' một cách an toàn và trung thực, có thể mang 'sức khỏe đến toàn thế giới'.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-xs-12">
                <div className="card intro-card border-radius-right">
                  <div className="card-head">
                    <h3>Giá trị cốt lõi</h3>
                    <h5>Phát triển tài năng, quản lý đạo đức, chất lượng hàng đầu, sự hài lòng của khách hàng</h5>
                  </div>
                  <div className="card-body">
                    <p className="text-left">
                      Chúng tôi nỗ lực bồi dưỡng nhân tài thông qua giáo dục và vun đắp sự hòa hợp giữa các thành viên thông qua quản lý đạo đức công bằng và minh bạch. Chúng tôi cũng nỗ lực không ngừng cải thiện chất lượng dựa trên năng lực công nghệ. Chúng tôi trân trọng khách hàng và phấn đấu trở thành một công ty phục vụ cộng đồng, đặt sự hài lòng của khách hàng lên hàng đầu.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-xs-12">
                <div className="card intro-card border-radius-left">
                  <div className="card-head">
                    <h3>Tầm nhìn</h3>
                    <h5>Doanh nghiệp thực phẩm chức năng góp phần bảo vệ sức khỏe con người</h5>
                  </div>
                  <div className="card-body">
                    <p className="text-left">
                      Dựa trên một thương hiệu sữa đậu nành chuyên biệt, chúng tôi đang phát triển thành một 'doanh nghiệp thực phẩm tốt cho sức khỏe' góp phần mang lại sức khỏe và hạnh phúc cho toàn thể nhân loại.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
