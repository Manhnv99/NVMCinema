import { Input } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react"
import { StaffContext } from "../store/context/context";
import { setSearchValueAction } from "../store/actions/StaffAction";

export const SearchComponent = () => {

    //useContext
    const [state, dispatch] = useContext(StaffContext);

    //onSearch
    const handleChangeSearchValue = (e) => {
        dispatch(setSearchValueAction(e.target.value));
    };

    return (
        <div className="shadow-xl rounded-[5px] px-[20px] py-[20px]">
            <p className="font-bold font-sans text-2xl mb-[10px]">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-[10px]" />
                Tìm kiếm nhân viên
            </p>
            <Input
                className="h-[50px]"
                type="text"
                placeholder="Tìm kiếm nhân viên..."
                value={state.searchValue}
                onChange={handleChangeSearchValue}
            >
            </Input>
        </div>
    )

}