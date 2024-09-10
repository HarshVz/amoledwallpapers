import React, { useState, useEffect } from "react";
import Imgwall from "./Imgwall";

function Wallpapers() {
    const [page, setPage] = useState(1);
    const[posts, setPosts] = useState([]);
    const[url, setUrl] = useState("https://www.reddit.com/r/Amoledbackgrounds/new.json");

    const[after, setAfter] = useState("null");
    const[before, setBefore] = useState("null");

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function isValidImageUrl(url) {
        // List of known image file extensions
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];
        
        // Check if the URL ends with any of the image file extensions
        return imageExtensions.some(ext => url.endsWith(ext));
      }

      async function getWalls() {
        try {
            let response = await fetch(`${url}`);
            if (!response.ok) {
                console.log("Network Error");
                return;
            }
            let jsonData = await response.json();
            let newPosts = jsonData.data.children;
            setAfter(jsonData.data.after)
            setBefore(jsonData.data.before)
            //console.log(url)
            setPosts(newPosts)
            scrollToTop();
        } catch (error) {
            console.log(error);
        }
    }

    
    
    
    useEffect(() => {
        getWalls();
    }, [page])
    
  return (
    <>

        <div className="flex justify-between items-center px-8 pt-5 min-h-[50px] pb-4 bg-gray-900 fixed top-0 w-full">
            <p className="text-xl text-slate-300 text-bold">
                AmoledWalls
            </p>
            <p className="text-xl text-slate-300 text-bold">
            <i class="ri-drinks-fill"></i>
            </p>
        </div>
       <div className="wall lg:m-8 m-5 pt-14 grid min-h-[400px] md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 grid-cols-2 gap-4 rounded-xl mb-20 md:pb-20 pb-5">
       {posts.map((post, index) => {
    const postData = post.data;
    const previewImages = postData.preview && postData.preview.images;

    // If previewImages exist and there's at least one image in the array
    if (previewImages && previewImages.length > 0) {
        
        const getUrl = (imgUrl) => {
            const cleanedUrl = imgUrl.replace(/amp;/g, ''); // Replaces all occurrences of 'amp;'
            //console.log(cleanedUrl);
            return cleanedUrl; // Return the modified URL if needed
          };
        // console.log(previewImages[0].source.url)
        const firstImage = getUrl(previewImages[0].resolutions[1].url)
        // const firstImage = getUrl(previewImages[0].source.url)
        // const firstImage = previewImages[0].source.url.replace('preview.redd', 'i.redd');

        return (
            <Imgwall
                id={`${postData.id}-0`}
                key={`${postData.id}-0`}
                author={postData.author}
                title={postData.title}
                url={firstImage}
                downloadLink={postData.url_overridden_by_dest}
            />
        );
    }

    // // If previewImages don't exist or there are no images in the array
    // if (isValidImageUrl(postData.url)) {
    //     const imageUrl = postData.url.replace('preview.redd', 'i.redd');

    //     return (
    //         <Imgwall
    //             id={postData.id}
    //             key={`${postData.id}-${index}`}
    //             author={postData.author}
    //             title={postData.title}
    //             url={imageUrl}
    //             downloadLink={postData.url_overridden_by_dest}
    //         />
    //     );
    // }

    // // If the post doesn't have a valid image URL
    // return null;
})}

        </div>

        <div className="center flex items-center justify-center">
                <div className="fixed bottom-0 nav flex items-center justify-between px-12 gap-5 bg-gray-950 h-20 w-full">
                    <button onClick={ function(){
                        setUrl(`https://www.reddit.com/r/Amoledbackgrounds/new.json?after=${before}`);
                        setPage(page - 1);
                    } }><i className="ri-arrow-left-circle-fill text-2xl text-gray-400 hover:text-gray-100"></i></button>
                    <button>

                    <p class="text-base  text-gray-400 hover:text-gray-100"> 
                        Page : {page}
                    </p>

                    </button>
                    <button onClick={ function(){
                        setUrl(`https://www.reddit.com/r/Amoledbackgrounds/new.json?after=${after}`);
                        setPage(page + 1);
                    } } id="next"><i className="ri-arrow-right-circle-fill text-2xl text-gray-400 hover:text-gray-100"></i></button>
                </div>
            </div>

    </>
  );
}

export default Wallpapers;
