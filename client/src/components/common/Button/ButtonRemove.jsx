import Button from './Button';
import trash_white from '@/assets/icon/trash_white.svg';

function ButtonRemove({ ...props }) {
    // eslint-disable-next-line react/prop-types
    const { handleClick } = props;

    return (
        <Button
            title="Xóa"
            bg="delete"
            type="button"
            text_color="white"
            icon={trash_white}
            handleClick={handleClick}
        />
    );
}

export default ButtonRemove;
