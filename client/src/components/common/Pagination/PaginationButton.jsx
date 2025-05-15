/* eslint-disable react/prop-types */
function PaginationButton({ src, alt,hidden }) {
    return (
        <button
            className={`bg-bg-tertiary px-2 py-2 rounded-lg cursor-pointer ${
                hidden ? 'invisible' : ''
            }`}
        >
            <img src={src} alt={alt} />
        </button>
    );
}

export default PaginationButton;
