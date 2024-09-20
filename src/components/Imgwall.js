import React, { useState } from "react";

function Imgwall(props) {
  const [showPopup, setShowPopup] = useState(false);

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  
  const { url, title, author, id, downloadLink } = props;
  const dl = `https://wsrv.nl/?url=${encodeURIComponent(downloadLink)}`;

  const handleDownload = (e) => {
    e.preventDefault(); // Prevent the default anchor behavior

    // Fetch the image as a blob and trigger the download
    fetch(dl)
      .then((response) => response.blob()) // Convert the response to a blob
      .then((blob) => {
        const url = window.URL.createObjectURL(blob); // Create a download URL
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.png`; // Set the desired file name

        document.body.appendChild(link); // Append the link to the body
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up the link

        // Release the object URL
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading the image:", error));
  };

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
        <div
          id="img-container"
          className="popup-menu fixed w-96 h-full z-10 m-auto inset-x-0 left-0 right-0 flex flex-col justify-center items-center px-8 pt-5 min-h-[50px] pb-4 bg-gray-950 min-w-full top-0 h-full"
        >
          <div
            id="closeContactForm"
            className="fixed right-6 top-5  cursor-pointer outline-none transition hover:rotate-90 duration-1000"
            onClick={handleClosePopup}
          >
            <i className="text-3xl text-slate-300 active:text-slate-100 ri-close-circle-line bg-black rounded-full hover:text-[#9eff29]"></i>
          </div>

          <div className="grid grid-cols-8 gap-4 bg-slate-950 p-4 fixed w-full bottom-0 lg:hidden">
            <a className="flex min-h-[60px] items-center justify-start px-5 rounded-full bg-slate-800 capitalize text-white col-span-6" disabled> {title} </a>
            <a className="flex min-h-[60px] items-center justify-center rounded-full bg-slate-800 capitalize text-white transition duration-500 ease-in-out hover:scale-95 col-span-2 hover:bg-[#9eff29] hover:text-black"
            href={downloadLink} id="downloadImage" onClick={handleDownload}> <i class="text-2xl ri-arrow-down-circle-line transition hover:text-black hover:scale-110 hover:rotate-90 duration-500"></i> </a>
        </div>


          <div className="fixed left-5 top-5 hidden lg:block">
            <p className="text-slate-200 py-3 pb-1 px-3 leading-2 mb-3 text-2xl w-2/5">
              {title}
            </p>
            <p className="text-gray-500 px-3 pb-3 text-xs"></p>

            <div className="mx-3 pb-3 text-lg">
              <a
                className="inline-block py-1 px-6 rounded-l-xl rounded-t-xl bg-[#7747FF] hover:bg-white hover:text-[#7747FF] focus:text-[#7747FF] focus:bg-gray-200 text-gray-50 font-bold leading-loose transition duration-500"
                href={downloadLink}
                id="downloadImage"
                onClick={handleDownload}
              >
                Download
              </a>
            </div>

            {/* <a className='mx-3 px-3 pb-3 text-white' href={downloadLink} id="downloadImage" onClick={handleDownload}>Download</a> */}
          </div>
          <img
            src={downloadLink}
            className="rounded-xl h-full w-full compressed-image object-cover sm:object-cover lg:object-contain"
            alt={title}
            onClick={handleImageClick}
          />
        <img
            src={downloadLink}
            className="fixed rounded-xl h-full w-full compressed-image object-cover blur-md"
            alt={title}
            style={{
                zIndex: -1,
                opacity: 0.2,
            }}
            onClick={handleImageClick}
          />
        </div>
      )}
    </>
  );
}

export default Imgwall;
