import { Modal, Row, Col, Button } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useMovie } from "../hooks/useMovie";

export const ModalDetailMovie = ({ openModal, setOpenModal, movieId }) => {

    //useState
    const [detailMovie, setDetailMovie] = useState({});
    //custom Hooks
    const { handleFetchDetailMovie } = useMovie();
    //state
    const [watchVideo, setWatchVideo] = useState(false);
    //useEffect
    useEffect(() => {
        if (movieId !== "") {
            handleFetchDetailMovie(movieId).then(response => {
                console.log(response);
                setDetailMovie(response.data.data);
            });
        }
    }, [movieId]);

    const handleCloseModal = () => {
        setWatchVideo(false);
        setTimeout(() => {
            setOpenModal(false);
        }, 10);
    };

    return (
        <>
            <Modal
                width={1300}
                footer={null}
                open={openModal}
                onCancel={handleCloseModal}
                closeIcon={false}
                zIndex={100000000000}
            >
                {watchVideo
                    ?
                    <div className="text-center">
                        <iframe width="1250" height="500" src={detailMovie.videoPath}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        <Button type="dashed" onClick={() => setWatchVideo(false)} className="mt-[10px]">
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-[5px]" />
                            Xem thông tin
                        </Button>
                    </div>
                    :
                    <div className="p-[10px]">
                        <Row>
                            <Col span={6} className="text-center">
                                <img
                                    style={{
                                        height: "95%"
                                    }}
                                    className="rounded-[10px] object-cover"
                                    src={detailMovie.bannerUrl}
                                    alt="Ảnh bộ phim"
                                />
                                <Button onClick={() => setWatchVideo(true)} type="dashed" className="mt-[10px]">Xem trailer</Button>
                            </Col>
                            <Col span={17} className="ml-[20px]">
                                <p className="text-[#72be43] font-bold text-[30px]">Mai</p>
                                <p className="font-bold text-[#222] text-[18px] mt-[10px]">{detailMovie.description}</p>
                                <div className="mt-[20px] text-[18px] font-medium">
                                    <p>
                                        <span className="text-[#222]">Phân loại: </span>
                                        {detailMovie.ageRestriction >= 18 ? "Phim dành cho người từ 18 tuổi trở lên!" : "Phim dành cho mọi lứa tuổi!"}
                                    </p>
                                    <p className="mt-[10px]">
                                        <span className="text-[#222]">Định dạng: </span>
                                        {detailMovie.format}
                                    </p>
                                    <p className="mt-[10px]">
                                        <span className="text-[#222]">Đạo diễn:</span>
                                        {detailMovie.director}
                                    </p>
                                    <p className="mt-[10px]">
                                        <span className="text-[#222]">Diễn viên:</span>
                                        {detailMovie.actor}
                                    </p>
                                    <p className="mt-[10px]">
                                        <span className="text-[#222]">Thể loại:</span>
                                        {detailMovie.genre}
                                    </p>
                                    <p className="mt-[10px]">
                                        <span className="text-[#222]">Khởi chiếu:</span>
                                        {detailMovie.releaseDate}
                                    </p>
                                    <p className="mt-[10px]">
                                        <span className="text-[#222]">Thời lượng:</span> {detailMovie.duration} phút
                                    </p>
                                    <p className="mt-[10px]">
                                        <span className="text-[#222]">Ngôn ngữ:</span> {detailMovie.subTitle}
                                    </p>
                                    <p className="mt-[10px]">
                                        <span className="text-[#222]">Quốc gia:</span> {detailMovie.country}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                }
            </Modal>
        </>
    )

}