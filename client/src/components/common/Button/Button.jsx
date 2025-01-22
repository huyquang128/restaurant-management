function Button({ icon, title, bg }) {
    return (
        <button
            className={`bg-${bg} flex items-center gap-2 py-2 px-3 rounded-md
                        hover:brightness-125`}
        >
            <img src={icon} alt="" />
            <span className="text-white">{title}</span>
        </button>
    );
}

export default Button;
