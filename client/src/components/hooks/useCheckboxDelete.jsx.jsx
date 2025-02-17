/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

function useCheckboxDelete(arr) {
    const [arrActive, setArrActive] = useState([]);
    const [isCheckedAll, setIsCheckedAll] = useState(false);

    const [isAnimationCloseBlockRemove, setIsAnimationCloseBlockRemove] =
        useState(false);
    const [isShowBlockRemove, setIsShowBlockRemove] = useState(false);

    useEffect(() => {
        setIsCheckedAll(
            arrActive?.length > 0 && arrActive?.length === arr?.length
        );

        if (arrActive?.length > 0) {
            setIsShowBlockRemove(true);
        } else {
            hiddenBlockRemove();
        }
    }, [arrActive]);

    //handle Events
    const hiddenBlockRemove = () => {
        setIsAnimationCloseBlockRemove(true);
        setTimeout(() => {
            setIsAnimationCloseBlockRemove(false);
            setIsShowBlockRemove(false);
        }, 500);
    };

    const handleActiveItem = (productId) => {
        setArrActive((prevProductId) =>
            arrActive.includes(productId)
                ? arrActive.filter(
                      (activeProductId) => activeProductId !== productId
                  )
                : [...prevProductId, productId]
        );
    };

    const handleCheckedAll = () => {
        setIsCheckedAll(!isCheckedAll);
        setArrActive(isCheckedAll ? [] : arr.map((product) => product._id));
    };

    return {
        arrActive,
        setArrActive,
        isShowBlockRemove,
        isAnimationCloseBlockRemove,
        isCheckedAll,
        setIsCheckedAll,
        hiddenBlockRemove,
        handleCheckedAll,
        handleActiveItem,
    };
}

export default useCheckboxDelete;
