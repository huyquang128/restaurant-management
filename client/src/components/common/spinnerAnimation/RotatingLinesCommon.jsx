import { RotatingLines } from 'react-loader-spinner';

function RotatingLinesCommon({ ...props }) {
    return (
        <RotatingLines
            visible={true}
            {...props}
            color="#cfa670"
            strokeWidth="3"
            strokeColor="#cfa670"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
}

export default RotatingLinesCommon;
