import Button from './Button';
import document_white from '@/assets/icon/document_white.svg';

function ButtonSave({ ...props }) {
    // eslint-disable-next-line react/prop-types
    const { handleClick } = props;

    return (
        <Button
            title="lưu lại"
            bg="save"
            type="submit"
            text_color="white"
            icon={document_white}
            handleClick={handleClick}
        />
    );
}

export default ButtonSave;
