// ==UserScript==
// @name         Carleton Library BGG Extender
// @namespace    http://connorhillen.com
// @version      0.1
// @description  Add some BGG data to the Carleton library page on request.
// @author       You
// @match        http://catalogue.library.carleton.ca/*
// @grant        none
// ==/UserScript==

(function() {
    function displayBGGData(id, row) {
    return fetch('https://www.boardgamegeek.com/xmlapi2/thing?stats=1&id='+id)
    .then(response => response.text())
        .then(body => (new window.DOMParser()).parseFromString(body, "text/xml"))
        .then(data => {
            var game = data.querySelector('item');
            var stats = game.querySelector('statistics');

            var thumbnail = game.querySelector('thumbnail').innerHTML;
            var name = game.querySelector('name').getAttribute('value');
            var description = game.querySelector('description').innerHTML;
            var minplayers = game.querySelector('minplayers').getAttribute('value');
            var maxplayers = game.querySelector('maxplayers').getAttribute('value');
            var playingtime = game.querySelector('playingtime').getAttribute('value');
            var mechanics = [];
            var categories = [];
            var links = game.querySelectorAll('link').forEach(link => {
                var linktype = link.getAttribute('type');
                if (linktype == 'boardgamecategory')
                    categories.push(link.getAttribute('value'));
                if (linktype == 'boardgamemechanic')
                    mechanics.push(link.getAttribute('value'));
            }
            );

            var rank = stats.querySelector('rank').getAttribute('value');
            var rating = stats.querySelector('average').getAttribute('value');

            var hthumb = document.createElement('img');
            hthumb.setAttribute("src", thumbnail);
            hthumb.setAttribute("alt", "BGG Scraped Thumbnail for " + name);
            var el = [];
            var l = 0;
            l = el.push(document.createElement('li'));
            el[l-1].innerHTML = "<strong>Players: </strong>" + minplayers + "-" + maxplayers;
            l = el.push(document.createElement('li'));
            el[l-1].innerHTML = '<strong>Avg. Playtime:</strong> ' + playingtime;
            l = el.push(document.createElement('li'));
            el[l-1].innerHTML = '<strong>Avg. Rating: </strong>' + rating;
            l = el.push(document.createElement('li'));
            el[l-1].innerHTML = '<strong>BGG Rank:</strong> ' + rank;
            l = el.push(document.createElement('li'));
            el[l-1].innerHTML = '<strong>Mechanics:</strong> ' + mechanics;
            l = el.push(document.createElement('li'));
            el[l-1].innerHTML = '<strong>Categories:</strong> ' + categories;
            l = el.push(document.createElement('li'));
            el[l-1].innerHTML = '<strong>BGG Description:</strong> ' + description;

            var contain = document.createElement('ul');

            hthumb.style.display = "inline-block";
            hthumb.style.marginRight = "10px";
            hthumb.style.verticalAlign = "top";

            contain.style.display = "inline-block";
            contain.style.verticalAlign = "middle";
            contain.style.listStyle = "none";
            contain.style.maxWidth = "70%";

            el.forEach(element => contain.appendChild(element));

            row.appendChild(hthumb);
            row.appendChild(contain);
            return true;
        });
}

function getBGGData(title, row, again=false) {
    fetch('https://www.boardgamegeek.com/xmlapi2/search?query='+title)
        .then(res => res.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => data.querySelector('item').getAttribute("id"))
        .catch(reason => false)
        .then(id => displayBGGData(id, row))
        .catch(reason => false)
        .then(work => (!work && !again)? getBGGData(title.split(':')[0], row, true) : 0 )
        ;
}
document.querySelectorAll('#main-content > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > div').forEach(
    function(row){
        var cleanText = row.querySelector('div.briefcitDetail > div.briefcitDetailMain > h2 > a').innerText.replace('[game]', '');
        var cleanTitle = cleanText.split('/')[0];
        if (cleanText == row.querySelector('div.briefcitDetail > div.briefcitDetailMain > h2 > a').innerText) return;
        var button = document.createElement("button");
        button.innerHTML = "Load BGG Data";
        button.addEventListener("click", function() {
            getBGGData(cleanTitle, row);
        });
        row.querySelector('div.briefcitLeft').appendChild(button);
    }
);
})();