import {
    FacebookOutlined,
    InstagramOutlined,
    TikTokOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import BoCongThuong from "../../assets/bocongthuong.png";
import LogoNVM from "../../assets/NVM.png";

export const ClientFooterLayout = () => {
    return (
        <>
            <div className="bg-[var(--primary-footer)] text-[var(--primary-white)]">
                <div className="max-w-[90%] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 py-[50px] px-[30px]">
                        <div className="lg:col-span-1">
                            <p className="uppercase font-semibold text-[20px]">Về NVM Cinema</p>
                            <span className="bg-[var(--primary-limegreen)] w-[50%] h-[15px] block rounded-md my-[10px] md:my-[20px]"></span>
                            <ul className="text-[17px]">
                                <li className="my-2 md:my-4">Hệ thống rạp</li>
                                <li className="my-2 md:my-4">Cụm rạp</li>
                                <li className="my-2 md:my-4">Liên hệ</li>
                            </ul>
                            <img className="w-[120px] md:w-[170px] lg:w-[200px]" src={BoCongThuong} />
                        </div>
                        <div className="mt-[20px] md:mt-[10px] lg:col-span-2">
                            <p className="uppercase font-semibold text-[20px]">Quy Định Điều Khoản</p>
                            <span className="bg-[var(--primary-limegreen)] w-[50%] h-[15px] block rounded-md my-[10px] md:my-[20px]"></span>
                            <ul className="text-[17px]">
                                <li className="my-4">Quy định thành viên</li>
                                <li className="my-4">Điều khoản</li>
                                <li className="my-4">Hướng dẫn đặt vé trực tuyến</li>
                                <li className="my-4">Quy định và chính sách chung</li>
                                <li className="my-4">Chính sách bảo vệ thông tin cá nhân của người tiêu dùng</li>
                            </ul>
                        </div>
                        <div className="mt-[20px] md:mt-[10px] lg:col-span-2">
                            <p className="uppercase font-semibold text-[20px]">CHĂM SÓC KHÁCH HÀNG</p>
                            <span className="bg-[var(--primary-limegreen)] w-[50%] h-[15px] block rounded-md my-[10px] md:my-[20px]"></span>
                            <ul className="text-[17px]">
                                <li className="my-4">
                                    <span className="font-bold">Hotline</span>
                                    : 19002099
                                </li>
                                <li className="my-4">
                                    <span className="font-bold">Giờ làm việc</span>
                                    : 9:00 - 22:00 (Tất cả các ngày bao gồm cả Lễ, Tết)
                                </li>
                                <li className="my-4">
                                    <span className="font-bold">Email hỗ trợ</span>
                                    : cskh@bhdstar.vn
                                </li>
                                <li className="my-4">
                                    <span className="font-bold uppercase">Mạng xã hội</span>
                                    <div className='flex items-center text-[35px] mt-[20px]'>
                                        <FacebookOutlined className='rounded-md text-[#FFF] bg-[#1877f2] mr-[10px]' />
                                        <InstagramOutlined className='rounded-md text-[#FFF] bg-[#E4405F] mr-[10px]' />
                                        <TikTokOutlined className='rounded-md text-[#FFF] bg-[#FF0000] mr-[10px]' />
                                        <YoutubeOutlined className='rounded-md text-[#FFF] bg-[red]' />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#151720] text-[var(--primary-white)] border-t border-[#999]">
                <div className="max-w-[90%] mx-auto py-[50px] px-[30px]">
                    <div className='text-center lg:flex'>
                        <div className='flex justify-center'>
                            <img className='rounded-[50%] h-[130px] w-[130px]' src={LogoNVM} />
                        </div>
                        <div className='mt-[20px] lg:mt-0 text-center md:ml-[30px] lg:text-left'>
                            <p className='font-bold'>Công ty TNHH NVM Cinema Việt Nam</p>
                            <p>
                                <span className='font-bold'>Giấy CNĐKDN: </span>
                                Giấy phép kinh doanh số: 0104597158. Đăng ký lần đầu ngày 15 tháng 04 năm 2010
                            </p>
                            <p>
                                <span className='font-bold'>Giấy CNĐKDN: </span>
                                Giấy phép kinh doanh số: 0104597158. Đăng ký lần đầu ngày 15 tháng 04 năm 2010
                            </p>
                            <p>
                                <span className='font-bold'>Địa Chỉ: </span>
                                Tầng 11, Tòa nhà Hồng Hà Building, Lý Thường Kiệt, P.Phan Chu Trinh, Quận Hoàn Kiếm, Hà Nội
                            </p>
                            <p>
                                <span className='font-bold'>Hotline: </span>
                                19002099
                            </p>
                            <p className='font-bold'>COPYRIGHT 2010 BHD STAR. ALL RIGHTS RESERVED</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}