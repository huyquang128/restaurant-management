const SpinnerCommon = ({ Type }) => {
    return (
        <Type
            visible={true}
            height="50"
            width="50"
            color="#cfa670"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
};

export default SpinnerCommon;
