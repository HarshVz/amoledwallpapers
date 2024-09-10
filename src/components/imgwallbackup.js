function Imgwall(props){

    let src = props.url;
    let title = props.title;
    let author = props.author;

    return(
        <>
            <div id = {props.id} className="walls rounded-xl grid">
                <div className="imgg">
                    <img src={src}
                    loading="lazy"
                    className="object-cover rounded-xl h-96 w-full compressed-image" alt=""/>
                </div>
                <div className="Text">
                    <p className="text-slate-200 py-3 pb-1 px-3 leading-5">{title}</p>
                    <p className="text-gray-500 px-3 pb-3 text-xs">by {author}</p>
                </div>
            </div>
        </>
    );
}

export default Imgwall