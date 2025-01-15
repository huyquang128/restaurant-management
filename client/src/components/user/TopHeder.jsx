import {
    faFacebookF,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconSocial = [
    { icon: <FontAwesomeIcon icon={faFacebookF} /> },
    { icon: <FontAwesomeIcon icon={faTwitter} /> },
    { icon: <FontAwesomeIcon icon={faInstagram} /> },
];

function TopHeder() {
    return (
        <div className="bg-[#151515] font-cabin text-sm relative z-30">
            <div
                className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs
                         text-white mx-auto h-[44px] flex justify-between 
                         items-center gap-3"
            >
                <div>Bắc từ liêm - Hà Nội - sđt (+84) 0123 456 789</div>
                <div className="flex items-center gap-3">
                    <div className="max-md:hidden">Theo dõi ngay</div>
                    <div className="flex items-center gap-3 max-md:hidden">
                        {iconSocial.map((icon, index) => (
                            <div key={index}>{icon.icon}</div>
                        ))}
                    </div>
                    <div
                        className="w-32 bg-yellow-primary text-sm text-center py-3
                                    cursor-pointer"
                    >
                        ĐẶT BÀN
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopHeder;
