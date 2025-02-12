import ColorRingAnimation from '../ColorRingAnimation';

/* eslint-disable react/prop-types */
function Button({ ...props }) {
    const {
        icon,
        title,
        bg,
        no_rounded,
        text_color,
        handleClick,
        type,
        bg_border,
        color_ring,
    } = props;

    return (
        <button
            onClick={handleClick}
            type={type || 'submit'}
            className={`${
                (bg === 'black' && 'bg-black') ||
                (bg === 'green' && 'bg-green-500')
            } flex items-center gap-2 py-2 px-3 ${
                no_rounded ? 'rounded-none' : 'rounded-md'
            } hover:brightness-110 w-full justify-center border ${
                (bg_border === 'black' && 'border-black') ||
                (bg_border === 'green' && 'border-green-500')
            }`}
        >
            <img src={icon} alt="" />
            <span className={`text-${text_color}`}>
                {color_ring ? ColorRingAnimation() : title}
            </span>
        </button>
    );
}

export default Button;
