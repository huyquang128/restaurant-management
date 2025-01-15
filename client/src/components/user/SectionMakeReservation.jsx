

function SectionMakeReservation() {
    return (
        <div className="bg-white py-10">
            <div
                className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto
                            text-center"
            >
                <div className="font-oswald text-3xl mb-10">
                    Đặt bàn trực tuyến
                </div>
                <div className="flex justify-center mb-10 gap-5">
                    <div className="w-2/12 border">
                        <img src="" alt="" />
                        <select name="" id="">
                            <option value=""></option>
                        </select>
                    </div>
                    <div className="w-2/12 border">
                        <img src="" alt="" />
                        <select name="" id="">
                            <option value=""></option>
                        </select>
                    </div>
                    <div className="w-2/12 border overflow-hidden">
                        <img src="" alt="" />
                        <input type="text" className="outline-none" />
                    </div>
                </div>
                <button className="px-7 py-2.5 bg-black text-white font-cabin mb-10">
                    Đặt bàn chi tiết
                </button>
                <div className="font-cabin text-gray-primary">
                    You can also call:{' '}
                    <span className="text-yellow-primary">+1 224 6787 004</span>{' '}
                    to make a reservation
                </div>
            </div>
        </div>
    );
}

export default SectionMakeReservation;
