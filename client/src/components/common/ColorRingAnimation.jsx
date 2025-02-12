import { ColorRing } from 'react-loader-spinner';

function ColorRingAnimation() {
    return (
        <ColorRing
            height="25"
            width="80"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
    );
}

export default ColorRingAnimation;
