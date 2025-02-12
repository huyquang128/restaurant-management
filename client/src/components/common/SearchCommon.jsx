import Button from './Button/Button';

function SearchCommon() {
    return (
        <div className="flex rounded-md overflow-hidden pl-2 items-center ">
            <input
                type="text"
                placeholder="Tìm mặt hàng..."
                className=" border-none px-3 py-2 outline-bg-tertiary outline
                            rounded-tl-md rounded-bl-md bg-bg-tertiary"
            />
            <div className=" bg-black ">
                <Button
                    title="Tìm kiếm"
                    bg="black"
                    no_rounded={true}
                    text_color="white"
                    bg_border="black"
                />
            </div>
        </div>
    );
}

export default SearchCommon;
