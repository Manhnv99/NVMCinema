import { Input } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const SearchComponent = () => {

    return (
        <div className="shadow-xl rounded-[5px] px-[20px] py-[20px]">
            <p className="font-bold font-sans text-2xl mb-[10px]">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-[10px]" />
                Tìm kiếm đạo diễn
            </p>
            <Input
                className="h-[50px]"
                type="text"
                placeholder="Tìm kiếm dạo diễn..."
            // value={state.searchValue}
            // onChange={handleChangeSearchValue}
            >
            </Input>
        </div>
    )

}