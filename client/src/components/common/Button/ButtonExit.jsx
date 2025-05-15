import { useNavigate } from 'react-router';
import Button from './Button';
import back_white from '@/assets/icon/back_white.svg';

function ButtonExit() {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(-1)} className="cursor-pointer w-28">
            <Button
                title="Quay lại"
                bg="exit"
                type="button"
                text_color="white"
                icon={back_white}
            />
        </div>
    );
}

export default ButtonExit;
