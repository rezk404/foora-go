import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShareButton = (props) => {

    const handleShare = () => {
        const url = `whatsapp://send?text=${encodeURIComponent(props.link)}`;
        window.open(url, '_blank');
    };

    return (
        <div className='d-flex flex-row'>
            <h5 onClick={handleShare} className='fw-bolder'>Share via whatsapp :<i class="fa-brands fa-whatsapp display-6 ms-2" style={{color: '#25d366'}}></i></h5>
        </div>
    );
};

export default ShareButton;
