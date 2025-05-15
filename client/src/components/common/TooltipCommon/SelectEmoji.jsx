/* eslint-disable react/prop-types */
import AnimatedHeart from '../emojinAnimation/AnimatedHeart';
import { motion } from 'framer-motion';
import arr_down_2_white from '@/assets/icon/arr_down_2_white.svg';
import useOutsideHover2 from '@/components/hooks/useOutsideHover2';
import AnimatedLike from '../emojinAnimation/AnimatedLike';
import AnimatedHaHa from '../emojinAnimation/AnimatedHaHa';
import useOutsideClick from '@/components/hooks/useOutsideClick';
import AnimatedWow from '../emojinAnimation/AnimatedWow';
import AnimatedCry from '../emojinAnimation/AnimatedCry';
import AnimatedAngry from '../emojinAnimation/AnimatedAngry';

const arrEmoji = [
    { name: 'like', component: <AnimatedLike /> },
    { name: 'heart', component: <AnimatedHeart /> },
    { name: 'haha', component: <AnimatedHaHa /> },
    { name: 'wow', component: <AnimatedWow /> },
    { name: 'cry', component: <AnimatedCry /> },
    { name: 'angry', component: <AnimatedAngry /> },
];

function SelectEmojiTooltip({ ...props }) {
    const { isOpenTooltip, setEmojiType, setCurrentActiveLike, index } = props;
    // const { ref } = useOutsideClick(setCurrentActiveLike);

    const handleSelectedEmoji = (name) => {
        setEmojiType(name);
        setTimeout(() => {
            setCurrentActiveLike(null);
        }, 0);
    };

    return (
        <motion.div
            // ref={ref}
            initial={{ opacity: 0, y: '100%' }}
            animate={
                isOpenTooltip ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }
            }
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.2 }}
            className={`absolute  rounded-lg  -right-20 -top-16 
                        shadow-header-shadow z-50  bg-bg-tertiary `}
        >
            <div className="relative flex gap-0.5 px-2 item-center ">
                {arrEmoji.map((item, index) => (
                    <div
                        onClick={() => handleSelectedEmoji(item.name)}
                        key={index}
                        className="hover:scale-125 hover:-translate-y-1 transition-transform 
                                ease-linear duration-200"
                    >
                        {item.component}
                    </div>
                ))}
                <img
                    src={arr_down_2_white}
                    alt=""
                    className="absolute -bottom-2 translate-y-5 h-12 right-1/2 translate-x-1/2"
                />
            </div>
        </motion.div>
    );
}

export default SelectEmojiTooltip;
