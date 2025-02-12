/* eslint-disable react/prop-types */
function TextAreaCommon({ label, ...props }) {
    const { formik, id } = props;
    const isErr = formik.touched[id] && formik.errors[id];
    // const errMsg = formik.errors[id];
    return (
        <>
            <div className="mb-2 text-text-primary">{label}</div>
            <textarea
                className={`w-full px-4 py-3 bg-bg-tertiary outline-1 outline focus:outline-yellow-primary
                        text-text-primary rounded-lg ease-linear duration-200 
                     relative h-32
                        ${isErr ? 'outline-red-500' : 'outline-transparent'}`}
                {...props}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[id]}
            ></textarea>

            {/* mes error */}
        </>
    );
}

export default TextAreaCommon;
