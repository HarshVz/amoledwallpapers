import React, { useState } from 'react';

function Imgwall(props) {
    const [showPopup, setShowPopup] = useState(false);

    const handleImageClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const { url, title, author, id, downloadLink } = props;

    return (
        <>
            <div id={id} className="walls rounded-xl grid">
                <div className="imgg">
                    <img
                        src={url}
                        className="object-cover rounded-xl h-96 w-full compressed-image"
                        alt={title}
                        onClick={handleImageClick}
                    />
                </div>
                <div className="Text">
                    <p className="text-slate-200 py-3 pb-1 px-3 leading-5">{title}</p>
                    <p className="text-gray-500 px-3 pb-3 text-xs">by {author}</p>
                </div>
            </div>

            {showPopup && (
                <div id="img-container" className="popup-menu fixed w-96 h-full z-10 m-auto inset-x-0 left-0 right-0 flex flex-col justify-center items-center px-8 pt-5 min-h-[50px] pb-4 bg-gray-900 min-w-full top-0 h-full">
                    <div id="closeContactForm" className="fixed right-5 top-5" onClick={handleClosePopup}><i className="text-3xl text-slate-400 active:text-slate-100 ri-close-circle-line"></i></div>
                    <div className='fixed left-5 top-5'>
                        <p className="text-slate-200 py-3 pb-1 px-3 leading-5 w-4/5">{title}</p>
                        <p className="text-gray-500 px-3 pb-3 text-xs">Download the Image By Long Pressing On The Image!</p>
                    </div>
                    <img
                        src={downloadLink}
                        className="object-contain rounded-xl h-full w-full compressed-image"
                        alt={title}
                        onClick={handleImageClick}
                    />

                </div>
            )}
        </>
    );
}

export default Imgwall;
