import { SearchComponent } from "./components/SearchComponent";
import { TableComponent } from "./components/TableComponent";

const StaffManagement = () => {


    return (
        <>
        <div className="container max-w-[1200px] mx-auto">
            <SearchComponent />
            <TableComponent />
        </div>
        </>
    )
}

export default StaffManagement;