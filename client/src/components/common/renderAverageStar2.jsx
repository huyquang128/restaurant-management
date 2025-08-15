import star_gray from '@/assets/icon/star_gray.svg';
import star_yellow from '@/assets/icon/star_yellow.svg';
import star_yellow_gray from '@/assets/icon/star_yellow_gray.svg';

function renderAverageStar2(average, type) {
    const number = Math.round(average.toFixed(1) * 2) / 2;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (number >= i) {
            stars.push(<img key={i} src={star_yellow} className="h-3.5" />);
        } else if (number >= i - 0.5) {
            stars.push(
                <img key={i} src={star_yellow_gray} className="h-3.5" />
            );
        } else {
            stars.push(<img key={i} src={star_gray} className="h-3.5" />);
        }
    }
    return stars;
}

export default renderAverageStar2;
