var allDogs = ["https://bit.ly/33vmrSh","https://bit.ly/37JYLNF","https://bit.ly/35CD3ZY","https://bit.ly/2OONKC2","https://bit.ly/2L1uf85","http://bit.ly/34SbMTi","http://bit.ly/2rh1SvS","http://bit.ly/38aIMs4","http://bit.ly/2PitB7t","https://wapo.st/2DM8O77","http://bit.ly/2DO0Ry9","http://bit.ly/2Rv0d0m","http://bit.ly/2sPi8Vu","http://bit.ly/2RqcymC","https://cnn.it/36htAI3","http://bit.ly/38ct8fS","http://bit.ly/2ris89k","http://bit.ly/2OUHTML","http://bit.ly/2OX1YSF","http://bit.ly/2YpxLPg","http://bit.ly/2Pkzh0C","http://bit.ly/2PnNzho","http://bit.ly/384FCGl","http://bit.ly/2LpTmBR","http://bit.ly/2LqUDsh","http://bit.ly/2DRhhG4","http://bit.ly/2s32vsV","http://bit.ly/2PnO76W","http://bit.ly/2qlvk3o","http://bit.ly/2sKyJJT","http://bit.ly/2Yvlo4h","http://bit.ly/34XES3C","http://bit.ly/33OPxMF","http://bit.ly/2PiRz2l","http://bit.ly/2sPufBY","http://bit.ly/2LpnkFU","http://bit.ly/2RqNZG3","http://bit.ly/2Ymv9BJ","http://bit.ly/386Lu1T"];
var currentDog;

//Clears local storage when page is refreshed
window.onload = window.localStorage.clear();

// Loads the first dog by calling "next" method. Kind of unnecessary, but makes clearing the browser's storage between tests easier.
function firstDog()
{
    next();
    //localStorage.clear();
}

// Adds current dog to set of "liked" dogs, then moves on to the next one.
function like()
{
    let currLikes = JSON.parse(localStorage.getItem("liked"));
    

    if(currLikes == null)
    {
        currLikes = [allDogs[currentDog]];
        console.log(currLikes);
        
    } else {
        currLikes.push(allDogs[currentDog]);
    }

    localStorage.setItem("liked", JSON.stringify(currLikes));
    currentLikes = [allDogs[currentDog]];


    next();
    ReadPicture(currentLikes);
    
}

// Adds current dog to set of "disliked" dogs, then moves on to the next one.
function dislike()
{
    let name = "dislike";
    let currDislikes = JSON.parse(localStorage.getItem("disliked"));
    


    if(currDislikes == null)
    {
        currDislikes = [allDogs[currentDog]];
        console.log(currDislikes);
    } else {
        currDislikes.push(allDogs[currentDog]);

    }

    localStorage.setItem("disliked", JSON.stringify(currDislikes));

    let currentDislikes = [allDogs[currentDog]];

    next();
    ReadPicture(currentDislikes, name);
}

function ReadPicture(currentDog, option){

    let outerDiv = document.createElement("div");
    outerDiv.setAttribute("class","picture");

    let img = document.createElement("img");
    img.setAttribute("src", currentDog);
    img.style.height = "150px";
    img.style.width = "150px";
 
    outerDiv.appendChild(img);

    if (option == "dislike"){
    document.getElementById("dislikes").appendChild(outerDiv);
    }
    else{
        document.getElementById("likes").appendChild(outerDiv);
    }

}

function viewL(){
    document.getElementById("likes").style.visibility = "visible";
    document.getElementById("htagL").style.visibility = "visible";

}
function viewD(){
    document.getElementById("dislikes").style.visibility = "visible";
    document.getElementById("htagD").style.visibility = "visible";

}

// Retrieves the next dog. If all other dogs have been liked/disliked, an alert is thrown.
function next()
{
    let liked = JSON.parse(localStorage.getItem("liked"));
    let disliked = JSON.parse(localStorage.getItem("disliked"));
    let merge;

    console.log("liked: " + localStorage.getItem("liked"));
    console.log("disliked: " + localStorage.getItem("disliked"));

    if(liked == null || disliked == null)
    {
        if(liked == null && disliked == null)
        {
            merge = null;
        } else if(liked == null) {
            merge = disliked;
        } else {
            merge = liked;
        }
    } else {
        merge = liked.concat(disliked);
    }

    if(merge == null)
    {
        let url = allDogs[0];
        document.getElementById("currentDog").src=url;
        currentDog = 0;
    } else {
        for(var i = 0; i < allDogs.length; i++)
        {
            if(!merge.includes(allDogs[i]))
            {
                let url = allDogs[i];
                document.getElementById("currentDog").src=url;
                currentDog = i;
                break;
            }
        }

        if(i == allDogs.length)
            {
                alert("Sorry! There aren't any more dogs in your area!");
            }
    }

}