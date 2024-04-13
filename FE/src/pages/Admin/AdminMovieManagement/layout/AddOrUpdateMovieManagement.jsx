import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faFilm, faImages } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, message, Input, Row, Col, Radio, Button, Select, DatePicker, Upload, Image } from "antd";
import { ROUTE_MANAGEMENT_MOVIE } from '../../../../app/BaseUrl/BaseUrl';
import { useEffect, useState } from 'react';
import { PHU_DE, THUYET_MINH } from '../../../../app/Constant/SubTitle';
import { useFetchEntity } from '../hooks/useFetchEntity';
import dayjs from 'dayjs';
import { useMovie } from '../hooks/useMovie';

export const AddOrUpdateMovieManagement = () => {

    //useForm
    const [form] = Form.useForm();
    //useNav
    const navigate = useNavigate();
    //upload Image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    //useParams
    const { id } = useParams();
    //state
    const [bannerImg, setBannerImg] = useState("");
    //custom Hooks
    const { listCountry, listDirector, listFormat, listGenre } = useFetchEntity();
    const { handleFetchPostMovie, handleFetchPutMovie, handleFetchGetOneMovie } = useMovie();

    useEffect(() => {
        if (id !== undefined) {
            handleFetchGetOneMovie(id).then(response => {
                handleFillFieldsValue(response.data.data);
                setBannerImg(response.data.data.bannerUrl);
            })
        }
    }, []);

    //handle
    const handleAddOrUpateMovie = () => {
        Swal.fire({
            title: id === undefined ? "Bạn có chắc muốn thêm bộ phim này?" : "Bạn có chắc muốn cập nhật bộ phim này?",
            icon: "question",
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(result => {
            if (result.isConfirmed) {
                if (id === undefined) {
                    //add
                    const fieldsValue = {
                        ...form.getFieldsValue(),
                        releaseDate: dayjs(form.getFieldsValue().releaseDate).format("YYYY-MM-DD")
                    }
                    const postMovie = new FormData();
                    postMovie.append("code", fieldsValue.code);
                    postMovie.append("name", fieldsValue.name);
                    postMovie.append("duration", fieldsValue.duration);
                    postMovie.append("ageRestriction", fieldsValue.ageRestriction);
                    postMovie.append("releaseDate", fieldsValue.releaseDate);
                    postMovie.append("videoPath", fieldsValue.videoPath);
                    postMovie.append("actor", fieldsValue.actor);
                    postMovie.append("description", fieldsValue.description);
                    postMovie.append("subTitle", fieldsValue.subTitle);
                    postMovie.append("directorId", fieldsValue.directorId);
                    postMovie.append("genreId", fieldsValue.genreId);
                    postMovie.append("countryId", fieldsValue.countryId);
                    postMovie.append("formatId", fieldsValue.formatId);
                    if (fieldsValue.banner === undefined) {
                        postMovie.append("banner", new File([], "empty-file"));
                    } else {
                        postMovie.append("banner", fieldsValue.banner.file.originFileObj);
                    }
                    handleFetchPostMovie(postMovie);
                } else {
                    console.log("run");
                    //update
                    const fieldsValue = {
                        ...form.getFieldsValue(),
                        releaseDate: dayjs(form.getFieldsValue().releaseDate).format("YYYY-MM-DD")
                    }
                    const putMovie = new FormData();
                    putMovie.append("id", id);
                    putMovie.append("code", fieldsValue.code);
                    putMovie.append("name", fieldsValue.name);
                    putMovie.append("duration", fieldsValue.duration);
                    putMovie.append("ageRestriction", fieldsValue.ageRestriction);
                    putMovie.append("releaseDate", fieldsValue.releaseDate);
                    putMovie.append("videoPath", fieldsValue.videoPath);
                    putMovie.append("actor", fieldsValue.actor);
                    putMovie.append("description", fieldsValue.description);
                    putMovie.append("subTitle", fieldsValue.subTitle);
                    putMovie.append("directorId", fieldsValue.directorId);
                    putMovie.append("genreId", fieldsValue.genreId);
                    putMovie.append("countryId", fieldsValue.countryId);
                    putMovie.append("formatId", fieldsValue.formatId);
                    if (fieldsValue.banner === undefined) {
                        putMovie.append("banner", new File([], "empty-file"));
                    } else {
                        putMovie.append("banner", fieldsValue.banner.file.originFileObj);
                    }
                    handleFetchPutMovie(putMovie);
                }
            }
        })
    }

    const handleFillFieldsValue = (data) => {
        form.setFieldsValue({
            code: data.code,
            name: data.name,
            directorId: data.directorId,
            genreId: data.genreId,
            countryId: data.countryId,
            formatId: data.formatId,
            duration: data.duration,
            ageRestriction: data.ageRestriction,
            actor: data.actor,
            videoPath: data.videoPath,
            releaseDate: dayjs(data.releaseDate, "YYYY-MM-DD"),
            description: data.description,
            subTitle: data.subTitle,
        });
    }

    const handleAddOrUpateMovieFailed = () => {
        message.warning("Vui lòng điền đầy đủ thông tin!");
    }

    //upload Image
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    return (
        <>
            <span onClick={() => {
                navigate(ROUTE_MANAGEMENT_MOVIE)
            }} className='cursor-pointer flex items-center font-sans font-bold text-[20px]'>
                <FontAwesomeIcon icon={faBackward} className='text-[30px] mr-[10px]' />
                Quay lại
            </span>
            <p className='mt-[40px] mb-[20px] font-sans font-bold text-[20px]'>
                <FontAwesomeIcon icon={faFilm} className='text-[30px] mr-[5px]' />
                {id === undefined ? "Thêm Bộ Phim" : "Cập Nhật Bộ Phim"}
            </p>
            {/* <div>
                <img style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "cover"
                }} src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' />
            </div> */}
            <div className='shadow-xl rounded-[5px]'>
                <Form
                    className='container mx-auto max-w-[1200px] my-[20px]'
                    form={form}
                    onFinish={handleAddOrUpateMovie}
                    onFinishFailed={handleAddOrUpateMovieFailed}
                >
                    {/*Row 1*/}
                    <Row gutter={20} style={{
                        justifyContent: "center",
                        marginTop: "20px"
                    }}>
                        <Col span={11}>
                            <Form.Item
                                label="Mã phim"
                                name="code"
                                rules={[
                                    { required: true, message: "Mã phim không được để trống!" }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Tên phim"
                                name="name"
                                rules={[
                                    { required: true, message: "Tên phim không được để trống!" }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*Row 2*/}
                    <Row gutter={20} style={{
                        justifyContent: "center",
                        marginTop: "20px"
                    }}>
                        <Col span={11}>
                            <Form.Item
                                label="Đạo diễn"
                                name="directorId"
                                rules={[
                                    { required: true, message: "Đạo diễn phim chưa được chọn!" }
                                ]}
                            >
                                <Select
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="--Chọn đạo diễn--"
                                    options={listDirector.map(item => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Thể loại"
                                name="genreId"
                                rules={[
                                    { required: true, message: "Thể loại chưa được chọn!" }
                                ]}
                            >
                                <Select
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="--Chọn thể loại--"
                                    options={listGenre.map(item => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*Row 3*/}
                    <Row gutter={20} style={{
                        justifyContent: "center",
                        marginTop: "20px"
                    }}>
                        <Col span={11}>
                            <Form.Item
                                label="Quốc Gia"
                                name="countryId"
                                rules={[
                                    { required: true, message: "Quốc gia phim chưa được chọn!" }
                                ]}
                            >
                                <Select
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="--Chọn quốc gia--"
                                    options={listCountry.map(item => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Phân giải"
                                name="formatId"
                                rules={[
                                    { required: true, message: "Phân giải chưa được chọn!" }
                                ]}
                            >
                                <Select
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="--Chọn phân giải--"
                                    options={listFormat.map(item => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*Row 4*/}
                    <Row gutter={20} style={{
                        justifyContent: "center",
                        marginTop: "20px"
                    }}>
                        <Col span={11}>
                            <Form.Item
                                label="Thời lượng phim"
                                name="duration"
                                rules={[
                                    { required: true, message: "Thời lượng phim không được để trống!" },
                                ]}
                            >
                                <Input allowClear type='number' />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Tuổi khuyến cáo"
                                name="ageRestriction"
                                rules={[
                                    { required: true, message: "Tuổi khuyến cáo không được để trống!" },
                                ]}
                            >
                                <Input allowClear type='number' />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*Row 5*/}
                    <Row gutter={20} style={{
                        justifyContent: "center",
                        marginTop: "20px"
                    }}>
                        <Col span={11}>
                            <Form.Item
                                label="Diễn viên nổi bật"
                                name="actor"
                                rules={[
                                    { required: true, message: "Diễn viên nổi bật không được để trống!" }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Đường dẫn video"
                                name="videoPath"
                                rules={[
                                    { required: true, message: "Đường dẫn video không được để trống!" }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*Row 6*/}
                    <Row gutter={20} style={{
                        justifyContent: "center",
                        marginTop: "20px"
                    }}>
                        <Col span={11}>
                            <Form.Item
                                label="Ngày công chiếu"
                                name="releaseDate"
                                rules={[
                                    { required: true, message: "Ngày công chiếu chưa được chọn!" }
                                ]}
                            >
                                <DatePicker allowClear format="YYYY-MM-DD" placeholder="Chọn ngày công chiếu" style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    { required: true, message: "Mô tả phim không được để trống!" }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*Row 7*/}
                    <Row gutter={20} style={{
                        justifyContent: "center",
                        marginTop: "20px"
                    }}>
                        <Col span={11}>
                            <Form.Item
                                label="Phụ đề"
                                name="subTitle"
                                rules={[
                                    { required: true, message: "Phụ đề phim chưa được chọn!" }
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={PHU_DE}>Phụ Đề</Radio>
                                    <Radio value={THUYET_MINH}>Thuyết Minh</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            {id === undefined
                                ?
                                <Form.Item
                                    label="Chọn Banner"
                                    name="banner"
                                    rules={[
                                        { required: true, message: "Bạn chưa chọn banner cho bộ phim này!" }
                                    ]}
                                >
                                    <Upload
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                        listType="picture-card"
                                        maxCount={1}
                                        onPreview={handlePreview}
                                    >
                                        Upload
                                    </Upload>
                                </Form.Item>
                                :
                                <Form.Item
                                    label="Chọn Banner"
                                    name="banner"
                                >
                                    <Upload
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                        listType="picture-card"
                                        maxCount={1}
                                        onPreview={handlePreview}
                                    >
                                        Upload
                                    </Upload>
                                </Form.Item>
                            }
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Col>
                    </Row>
                    {/*Row 8*/}
                    {id !== undefined &&
                        <div>
                            <p className='font-bold text-[18px]'>
                                <FontAwesomeIcon icon={faImages} className='text-[20px] mr-[5px]' />
                                Ảnh banner
                            </p>
                            <Image
                                width="100%"
                                height={500}
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                                src={bannerImg}
                            />
                        </div>
                    }
                    <div className='flex justify-end pb-[30px]'>
                        <Button type='primary' htmlType='submit'>{id === undefined ? "Thêm Bộ Phim" : "Cập Nhật Bộ Phim"}</Button>
                    </div>
                </Form>
            </div>
        </>
    )

}