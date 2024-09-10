import React from "react";
import { useState, useEffect } from "react";
import Imgwall from "./Imgwall";

function Walls() {

    const [page, setPage] = useState(1);
    const[posts, setPosts] = useState([]);

    function isValidImageUrl(url) {
        // List of known image file extensions
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
        
        // Check if the URL ends with any of the image file extensions
        return imageExtensions.some(ext => url.endsWith(ext));
      }

      async function getWalls() {
        try {
            let url = `https://www.reddit.com/r/Amoledbackgrounds/new.json`;
            let response = await fetch(`${url}`);
            if (!response.ok) {
                console.log("Network Error");
                return;
            }
            let jsonData = await response.json();
            let nextPage = jsonData.data.after;
            url = `https://www.reddit.com/r/Amoledbackgrounds/new.json?after=${nextPage}`
            let newPosts = jsonData.data.children;
            console.log(url)
            setPosts(newPosts)
    
        } catch (error) {
            console.log(error);
        }
    }
    
    
    useEffect(() => {
        getWalls();
    }, [page])
    
  return (
    <>
       <div className="wall m-5 grid min-h-[400px] md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 grid-cols-2 gap-4 rounded-xl ">
           {posts.map((post, index) => (
                isValidImageUrl(post.data.url) && <Imgwall
                    key = {`${post.data.id}-${index}`}
                    author = {post.data.author}
                    title = {post.data.title}
                    url = {post.data.url}
                />
           ))}
        </div>

        <div className="center flex items-center justify-center">
                <div className="fixed bottom-6 nav flex items-center justify-between px-8 gap-5 bg-slate-300 h-16 w-52 rounded-full">
                    <button ><i className="ri-arrow-left-circle-fill text-xl text-gray-600 hover:text-black"></i></button>
                    <button><i className="ri-home-4-line text-2xl text-gray-600 hover:text-black"></i></button>
                    <button onClick={ function(){
                        setPage(page + 1);
                    } } id="next"><i className="ri-arrow-right-circle-fill text-xl text-gray-600 hover:text-black"></i></button>
                </div>
            </div>

    </>
  );
}

export default Walls;
