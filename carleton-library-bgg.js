var interval = 5000
var time = interval;

$('#main-content > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > div > div.briefcitDetail > div.briefcitDetailMain > h2').each(function(index) { 
	var cleanText = $(this).text().replace('[game]', '')	 
	var cleanTitle = cleanText.split('/')[0]
    var header = $(this);
    if (cleanText == $(this).text()) return;
    
    setTimeout(function() {
        $.get('https://www.boardgamegeek.com/xmlapi2/search?query='+cleanTitle, function(response) {
            var total = $(response).find('items').attr('total');
            if (total == 0) return;
            var id = $($(response).find('item')[0]).attr('id');
            $.get('https://www.boardgamegeek.com/xmlapi2/thing?stats=1&id='+id, function(response) {
                var gameStats = $($(response).find('item')[0])
                var thumb = $(gameStats.find('thumbnail')[0]).text()
                var description = $(gameStats.find('description')[0]).text()
                var minPlayers = $(gameStats.find('minplayers')[0]).attr('value')
                var maxPlayers = $(gameStats.find('maxplayers')[0]).attr('value')
                var playtime = $(gameStats.find('playingtime')[0]).attr('value')
                var stats = $(gameStats.find('statistics'))
                var rank = $(stats.find('rank')[0]).attr('value')
                var rating = $(stats.find('average')[0]).attr('value')

                var hthumb = '<img src="'+thumb+'" alt="BGG Scraped Thumbnail for ' + cleanTitle + '" />';
                var hplayers = '<strong>Players:</strong> ' + minPlayers + "-" + maxPlayers;
                var hplay = '<strong>Avg. Playtime:</strong> ' + playtime;
                var hstats = '<strong>Avg. Rating: </strong>' + rating + '<strong>BGG Rank:</strong> ' + rank;
                header.append('<p>'+hthumb+' '+hplayers+'\t'+hplay+'\t'+hstats)
            });
        });
    }, time)
    time += interval;
});

// JQUERY LESS

function getBGGData(title, row) {
    fetch('https://www.boardgamegeek.com/xmlapi2/search?query=castle+panic')
        .then(res => res.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => console.log(data))

    // fetch('https://www.boardgamegeek.com/xmlapi2/search?query='+title).then(function(reponse) {
    //     var total = $(response).find('items').attr('total');
    //     if (total == 0) return;
    //     var id = $($(response).find('item')[0]).attr('id');
    //     fetch('https://www.boardgamegeek.com/xmlapi2/thing?stats=1&id='+id).then(function(response) {
    //         var gameStats = $($(response).find('item')[0])
    //         var thumb = $(gameStats.find('thumbnail')[0]).text()
    //         var description = $(gameStats.find('description')[0]).text()
    //         var minPlayers = $(gameStats.find('minplayers')[0]).attr('value')
    //         var maxPlayers = $(gameStats.find('maxplayers')[0]).attr('value')
    //         var playtime = $(gameStats.find('playingtime')[0]).attr('value')
    //         var stats = $(gameStats.find('statistics'))
    //         var rank = $(stats.find('rank')[0]).attr('value')
    //         var rating = $(stats.find('average')[0]).attr('value')

    //         var hthumb = '<img src="'+thumb+'" alt="BGG Scraped Thumbnail for ' + cleanTitle + '" />';
    //         var hplayers = '<strong>Players:</strong> ' + minPlayers + "-" + maxPlayers;
    //         var hplay = '<strong>Avg. Playtime:</strong> ' + playtime;
    //         var hstats = '<strong>Avg. Rating: </strong>' + rating + '<strong>BGG Rank:</strong> ' + rank;
    //         row.append('<p>'+hthumb+' '+hplayers+'\t'+hplay+'\t'+hstats)
    //     });
    // });
}

document.querySelectorAll('#main-content > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > div').forEach(
    function(row){
        var cleanText = row.querySelector('div.briefcitDetail > div.briefcitDetailMain > h2 > a').innerText.replace('[game]', '');
        var cleanTitle = cleanText.split('/')[0]
        if (cleanText == row.querySelector('div.briefcitDetail > div.briefcitDetailMain > h2 > a').innerText) return;
        var button = document.createElement("button");
        button.innerHTML = "Load BGG Data";
        button.addEventListener("click", function() {
            getBGGData(cleanTitle, row);
        })
        row.querySelector('div.briefcitLeft').appendChild(button);
    }
);


$.get('https://www.boardgamegeek.com/xmlapi2/search?query=Catan%20:%20cities%20&%20knights%20;%205-6%20player%20extension', function(response) {
	var total = $(response).find('items').attr('total');
    if (total == 0) return;
    var id = $($(response).find('item')[0]).attr('id');
    $.get('https://www.boardgamegeek.com/xmlapi2/thing?stats=1&id='+id, function(response) {
        var gameStats = $($(response).find('item')[0])
        var thumb = $(gameStats.find('thumbnail')[0]).text()
        var description = $(gameStats.find('description')[0]).text()
        var minPlayers = $(gameStats.find('minplayers')[0]).attr('value')
        var maxPlayers = $(gameStats.find('maxplayers')[0]).attr('value')
        var playtime = $(gameStats.find('playingtime')[0]).attr('value')
        var stats = $(gameStats.find('statistics'))
        var rank = $(stats.find('rank')[0]).attr('value')
        var rating = $(stats.find('average')[0]).attr('value')
        
    });
});
