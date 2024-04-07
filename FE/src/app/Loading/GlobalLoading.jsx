import { Spin } from "antd"

export const GlobalLoading = () => {
    return (
        <div className="position: fixed bottom-0 top-0 left-0 right-0 bg-[rgba(0,0,0,0.2)] z-[10000000000000000]">
            <div className="flex justify-center items-center h-full">
                <Spin size="large" />
            </div>
        </div>
    )
}