import { Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
import { SearchComponent } from "./components/SearchComponent"
import { TableComponent } from "./components/TableComponent"

const MovieManagement = () => {

    return (
        <>
            <Typography.Title level={3}>
                <FontAwesomeIcon icon={faPeopleRoof} className='text-[30px] mr-[10px]' />
                Quản lý phim
            </Typography.Title>
            <SearchComponent />
            <TableComponent />
        </>
    )
}

export default MovieManagement