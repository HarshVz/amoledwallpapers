import React from 'react'

function imagepreview() {


    const openContactFormButton = document.getElementById('openContactForm');
    const closeContactFormButton = document.getElementById('closeContactForm');
    const contactFormModal = document.getElementById('contactFormModal');

    openContactFormButton.addEventListener('click', () => {
        contactFormModal.classList.remove('hidden');
    });

    closeContactFormButton.addEventListener('click', () => {
        contactFormModal.classList.add('hidden');
    });



  return (
    <>

        <div id="img-container" className="flex justify-between items-center px-8 pt-5 min-h-[50px] pb-4 bg-gray-900 fixed top-0 w-full">

            

        </div>

    </>
  )
}

export default imagepreview
