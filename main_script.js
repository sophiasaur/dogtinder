var allDogs = ["https://bit.ly/33vmrSh","https://bit.ly/37JYLNF","https://bit.ly/35CD3ZY","https://bit.ly/2OONKC2","https://bit.ly/2L1uf85","https://bit.ly/2QSbdou"];

var currentDog;

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

    next();
}

// Adds current dog to set of "disliked" dogs, then moves on to the next one.
function dislike()
{
    let currDislikes = JSON.parse(localStorage.getItem("disliked"));

    if(currDislikes == null)
    {
        currDislikes = [allDogs[currentDog]];
        console.log(currDislikes);
    } else {
        currDislikes.push(allDogs[currentDog]);
    }

    localStorage.setItem("disliked", JSON.stringify(currDislikes));

    next();
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