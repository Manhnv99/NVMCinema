import { SearchComponent } from "./components/SearchComponent"
import { TableComponent } from "./components/TableComponent"

export const DirectorManagement = () => {

    return (
        <div className="container max-w-[1200px] mx-auto">
            <SearchComponent />
            <TableComponent />
        </div>
    )
}