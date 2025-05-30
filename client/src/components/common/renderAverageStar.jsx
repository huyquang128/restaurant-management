import star_gray from '@/assets/icon/star_gray.svg';
import star_yellow from '@/assets/icon/star_yellow.svg';
import star_yellow_gray from '@/assets/icon/star_yellow_gray.svg';

function renderAverageStar(average) {
    const number = Math.round(average.toFixed(1) * 2) / 2;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (number >= i) {
            stars.push(<img key={i} src={star_yellow} />);
        } else if (number >= i - 0.5) {
            stars.push(<img key={i} src={star_yellow_gray} />);
        } else {
            stars.push(<img key={i} src={star_gray} />);
        }
    }
    return stars;
}

export default renderAverageStar;
