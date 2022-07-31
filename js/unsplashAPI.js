let list=document.querySelector("#list");
let grid=document.querySelector("#gridData");
let enlargeImage=document.querySelector("#enlargeImage");

list.addEventListener("click",e=>{
    grid.style.visibility="visible";
    grid.style.opacity=1;
    let value=e.target.innerText;
   
    getPhotos(value);
    
});
grid.addEventListener("click",e=>{
    console.log(e.target.src);
    enlargeImage.style.display="block";
   document.getElementById("enlargeImage").innerHTML=`<img src=${e.target.src} alt="hello" />`;
   grid.style.display="none";
    
});
async function getPhotos(value){
    let access_key="DxfDPNq3YIMLdchML2HqktBWEiTGTC3JRyC9O6v6wkw";
    let secret_key="j0nZ-31x-35pxWCyxhOByavusHSx0VRC8RrW5wjrbjk";
    let base_url=`https://api.unsplash.com/search/collections?client_id=${access_key}&&page=10&&query=${value}`;
    let data=await window.fetch(base_url);
    let {results}=await data.json();
    console.log(results);
    let output="";
    for(let [index,photo] of results.entries())
    {
        let {cover_photo,preview_photos, links, tags, title, id, published_at}=photo;
        output+=`<div class="grid-data">
                <img src=${preview_photos[0].urls.thumb} alt=${title} />
                <span>${title}</span>
                <br>
                <a href=${links.html} target="_blank">View More</a>
                </div>`;
    }
    grid.innerHTML=output;
}



// AJAX

// let list=document.querySelector("#list");
// list.addEventListener("click",e=>{
//     let value=e.target.innerText;

// getPhotos(value);
// })
// function getPhotos(value){
//     let access_key="DxfDPNq3YIMLdchML2HqktBWEiTGTC3JRyC9O6v6wkw";
//     let base_url=`https://api.unsplash.com/search/collections?client_id=${access_key}&&page=10&&query=${value}`;
//     let AjaxRequest=new XMLHttpRequest();
//     AjaxRequest.open("GET",base_url);
//     AjaxRequest.onload=function(){
//         if(this.status>=200 && this.status<300){
//             let data=JSON.parse(this.response);
//             let output="";
//             for(let photo of data.results)
//             {
//                 output+=`<div class="grid-data">
//                 <img src=${photo.preview_photos[0].urls.thumb} />
//                 </div>`;
//             }
//             document.getElementById("gridData").innerHTML=output;
//         }
//     };
//     AjaxRequest.onerror=function(){
//         if(this.status>=400 && this.status<500)
//         {
//             console.error(this.response);
//         }
//     };
// AjaxRequest.send();
// }