import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ data }) => {
    return <QRCode value={data} className='ms-1 mb-1' />;
};

export default QRCodeGenerator;