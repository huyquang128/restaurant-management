function AvatarDefault(fullName) {
    const parts = fullName.trim().split(' '); // ["Nam"]
    const lastPart = parts[parts.length - 1]; // "Nam"
    const firstChar = lastPart.charAt(0).toUpperCase(); // "N"

    return (
        <div
            className="h-12 w-12 rounded-full bg-[#5f77b8] flex 
                        items-center justify-center text-white"
        >
            {firstChar}
        </div>
    );
}

export default AvatarDefault;
