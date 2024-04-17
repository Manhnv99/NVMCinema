import { Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
import { SearchComponent } from './components/SearchComponent';
import { TableComponent } from './components/TableComponent';

export const PromotionManagement = () => {
    return (
        <>
            <Typography.Title level={3}>
                <FontAwesomeIcon icon={faPeopleRoof} className='text-[30px] mr-[10px]' />
                Quản lý sự kiện khuyến mãi
            </Typography.Title>
            <SearchComponent />
            <TableComponent />
        </>
    )
}