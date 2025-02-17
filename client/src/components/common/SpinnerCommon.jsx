import { color } from 'framer-motion';

/* eslint-disable react/prop-types */
const SpinnerCommon = ({ Type }) => {
    return (
        <Type
            visible={true}
            height="50"
            width="50"
            color="grey"
            strokeColor="grey"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
};

export default SpinnerCommon;
