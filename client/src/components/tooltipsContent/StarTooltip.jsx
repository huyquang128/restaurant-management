import arr_top_white_2 from '@/assets/icon/arr_top_white_2.svg';

function StarTooltip({ descriptionStar, emoji }) {
    return (
        <div
            className="absolute bg-white text-black text-sm
                        text-center bottom-0 translate-y-12 shadow-header-shadow right-1/2 
                        translate-x-1/2
                        px-1 py-1.5 w-24 rounded-md font-medium "
        >
            <span className="opacity-70">
                {emoji} {descriptionStar}
            </span>
            <div>
                <img
                    src={arr_top_white_2}
                    alt=""
                    className="absolute -top-4 translate-x-1/2 right-1/2 "
                />
            </div>
        </div>
    );
}

export default StarTooltip;
