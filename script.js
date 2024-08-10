const API_KEY="4c45583379ac4970acff8104850e975d";

const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("india"));


async function fetchNews(query) {

    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);

    const data=await res.json();

    console.log(data);

    bindData(data.articles);
    
};


function reload(){
    window.location.reload();
}
function bindData(articles){
    const cardsContainer=document.getElementById("cards-container");
    const newsCardTemplates=document.getElementById("template-news-card");

    cardsContainer.innerHTML="";

    articles.forEach((article)=>{
        if(!article.urlToImage) return;

        const cardsclone=newsCardTemplates.content.cloneNode(true);
        fillDataInCards(cardsclone,article);

        cardsContainer.appendChild(cardsclone);
});
}

function fillDataInCards(cardsclone,article){
    const newsImg=cardsclone.querySelector("#news-img");
    const newsTitle=cardsclone.querySelector("#news-title");
    const newsSource=cardsclone.querySelector("#news-source");
    const newsdesc=cardsclone.querySelector("#news-desc");

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    
    newsdesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name} - ${date}`;
     
    cardsclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

let curSelectedNav=null;
function onNavitemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');

}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

 searchButton.addEventListener('click',()=>{
        const query=searchText.value;
        if(!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove('active');
        curSelectedNav=null;
})
