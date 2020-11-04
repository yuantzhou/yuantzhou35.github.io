/* Structure taken form lab10-test05.js */
let map;
 const Galleries = 'https://www.randyconnolly.com/funwebdev/3rd/api/art/galleries.php';
    document.querySelector("div.b section").style.display = "block";
let long= 41;
let lat = 12;
function initMap() {
                map = new google.maps.Map(document.querySelector('.d'), {
                    center: {lat: lat, lng: long},
                    mapTypeId: 'satellite',
                    zoom: 18});
            }
  
document.addEventListener("DOMContentLoaded", function() {
 fetch(Galleries).then((resp)=> resp.json()).then(data => {pop(data)}).catch(error => console.error(error));
    function pop(data){
        console.log(data);
    let liAdded = data.map(function(gallery){
        return gallery.GalleryName;
    });
    for( let li of liAdded){
        let list= document.querySelector('ul#galleryList ');
         let listI=document.createElement("li");
            listI.innerHTML =`${li}`;
    listI.addEventListener('click',function(e){
             //display for each garlley
        console.log(e.target.innerHTML);
      document.querySelector('div.loader').style.display= "block";
        let Gallery = "https:www.randyconnolly.com/funwebdev/3rd/api/art/paintings.php?galley= `${e.target.innerHTML}`";
      fetch(Gallery).then((resp)=> resp.json()).then(g => {listGallery(g)}).catch(error => console.error(error));
        function listGallery(g){
        let A= document.querySelector('div.a section');
           A.style.display = "inline-block";
           let G =data.find(f);
           function f (search){
               return search.GalleryName === `${e.target.innerHTML}`;
           }
            //display B
           document.querySelector('div.loader').style.display= "none";
            document.querySelector('#galleryName').innerHTML = `${G.GalleryName}<br>`; 
            document.querySelector('#galleryNative').innerHTML = `${G.GalleryNativeName}`; 
            document.querySelector('#galleryCity').innerHTML = `${G.GalleryCity}`; 
            document.querySelector('#galleryAddress').innerHTML = `${G.GalleryAddress}`; 
            document.querySelector('#galleryCountry').innerHTML = `${G.GalleryCountry}`; 
            document.querySelector('#galleryHome').innerHTML = `${G.GalleryWebSite}`;
            document.querySelector('#galleryHome').href = `${G.GalleryWebSite}`;
             long = G.Longitude;
            lat = G.Latitude;
            initMap();
            //display C
            let C =document.querySelector('div.c section');
            C.style.display = "block";
            let cP =  document.querySelector('#paintingList');
            cP.innerHTML="";
            console.log(g);
            let paintings = g.filter(rightG);
            function rightG(f){
                return f.GalleryName===`${e.target.innerHTML}`;
            }
            let header=document.createElement('tr');
               let a = document.createElement('th');
               a.innerHTML="";
               let b = document.createElement('th');
               b.innerHTML="Artist";
               let c = document.createElement('th');
               c.innerHTML="Title";
               let d = document.createElement('th');
               d.innerHTML="Year";
               header.appendChild(a);
               header.appendChild(b);
               header.appendChild(c);
               header.appendChild(d);
               //https://stackoverflow.com/questions/10683712/html-table-sort
            cP.appendChild(header);
            let sorthead = document.querySelectorAll("#paintingList th");
               sorthead.forEach(function(element,i){
                   element.addEventListener("click",function(){
                       w3.sortHTML("#paintingList",".item",`td:nth-child(${i+1})`);
                   });
               });
           for(let x of paintings){
                let p = document.createElement('tr');
                p.classList.add("item")
                let pic = document.createElement('img');
               let path=x.ImageFileName;
                pic.src= `https://res.cloudinary.com/funwebdev/image/upload/w_100/art/paintings/${path}`;
               let picture= document.createElement('td');
               let art= document.createElement('td');
               let title =document.createElement('td');
               let year = document.createElement('td');
               title.innerHTML= `${x.Title}`;
               year.innerHTML=`${x.YearOfWork}`;
               art.innerHTML= `${x.LastName}`
               picture.appendChild(pic);
               p.appendChild(picture);
               p.appendChild(title);
               p.appendChild(art);
               p.appendChild(year);
                
               cP.appendChild(p);
     picture.addEventListener('click', function(e){
                let single= document.querySelector('div.f');
                single.style.display="block"; 
                document.querySelector('div.d').style.display="none";
            let pic =document.createElement('img');
            pic.src= `https://res.cloudinary.com/funwebdev/image/upload/w_400/art/paintings/${path}`;
            single.appendChild(pic);
         pic.addEventListener('click',function(){
             single.style.display='none';
             let Big= document.querySelector('div.g')
                 Big.style.display="block";
             let bigPic= document.createElement('img');
             bigPic.src=`https://res.cloudinary.com/funwebdev/image/upload/w_1000/art/paintings/${path}`;
             Big.appendChild(bigPic);
             document.querySelector('#back').addEventListener('click',function(){
             Big.style.display='none';
            bigPic.src="";
            single.style.display="block";
            
         });
             
         });
            document.querySelector('#PT').innerHTML = `${x.Title}`;
            document.querySelector('#AN').innerHTML = `${x.LastName}`; 
            document.querySelector('#info').innerHTML = `${x.GalleryCity},${x.GalleryName}<br>${x.Medium},${x.YearOfWork}<br>${x.Width}X${x.Height}<br>${x.Description}<br>${x.CopyrightText}<br>`;
            document.querySelector('#link').innerHTML=`${x.MuseumLink}`;
         document.querySelector('#link').href = `${x.MuseumLink}`;
          let color = document.querySelector('#colors');
         let backButton = document.querySelector("#backButton");
         backButton.addEventListener('click',function(){
             single.style.display="none";
             document.querySelector('div.d').style.display="block";
             pic.src="";
             color.innerHTML="";
         });
         for(let clr of x.JsonAnnotations.dominantColors){
           let blocks =document.createElement("BUTTON");
             blocks.style.backgroundColor= `${clr.web}`;
             document.querySelector('#colors').appendChild(blocks);
             blocks.addEventListener('mouseover',function(){
                 document.querySelector("#hoverC").innerHTML=`${clr.name}`;
             });
             blocks.addEventListener('mouseout',function(){
                document.querySelector("#hoverC").innerHTML="" ;
             });
            
         };
          
               });       
            }
        }

        });
        list.appendChild(listI);
        };
    }
    
    
})

