
var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();
var players = new Array();
var currentPlayer = 0;
var player1 = 0;
var player2 = 0;

function toggleSidebar(){
    document.getElementsByClassName('game-options')[0].classList.toggle('collapsed');
}

function createDeck()
{
    deck = new Array();
    for (var i = 0 ; i < values.length; i++)
    {
        for(var x = 0; x < suits.length; x++)
        {
            var weight = parseInt(values[i]);
            var clicked = false;
            if (values[i] == "J")
                weight = 11;
            if (values[i] == 'Q')
                weight = 12
            if (values[i] == 'K')
                weight = 13
            if (values[i] == "A")
                weight = 14;
            var card = { Value: values[i], Suit: suits[x], Weight: weight, clicked: clicked};
            deck.push(card);
        }
    }
}

function createPlayers(num)
{
    players = new Array();
    for(var i = 1; i <= num; i++)
    {
        var hand = new Array();
        var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand, Drawn: 0, Highest: 0, Type: 'N/A'}
        players.push(player);
    }
}

function showProbabilities(){
    if(document.getElementById('show_probabilities').value == 'Probabilities'){
        var points = document.getElementsByClassName('points');
        for(var i = 0; i < points.length; i++){
            points[i].style.visibility = 'visible';
        }
        document.getElementById('show_probabilities').value = 'Hide';
        for(var i = 0; i < players.length; i++){
            calculateProbability(players[i].Hand, players[i].Drawn, i, deck, true);
        }
    }
    else{
        var points = document.getElementsByClassName('points');
        for(var i = 0; i < points.length; i++){
            points[i].style.visibility = 'hidden';
        }
        document.getElementById('show_probabilities').value = 'Probabilities';
    }
}

function showRecommendation(){
    if(document.getElementById('show_recommendation').value == 'Recommend'){
        var recommendation = document.getElementsByClassName('recommendation');
        for(var i = 0; i < recommendation.length; i++){
            recommendation[i].style.visibility = 'visible';
        }
        document.getElementById('show_recommendation').value = 'Hide';
    }
    else{
        var recommendation = document.getElementsByClassName('recommendation');
        for(var i = 0; i < recommendation.length; i++){
            recommendation[i].style.visibility = 'hidden';
        }
        document.getElementById('show_recommendation').value = 'Recommend';
    }
}

function createPlayersUI()
{
    document.getElementById('players').innerHTML = '';
    for(var i = 0; i < players.length; i++)
    {
        var div_player = document.createElement('div');
        var div_playerid = document.createElement('div');
        var div_hand = document.createElement('div');
        var div_points = document.createElement('table');

        // recommendation
        var div_recommendation = document.createElement('div');
        div_recommendation.id = 'recommendation_' + i;
        div_recommendation.className = 'recommendation';
        div_recommendation.style.marginBottom = '20px';

        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_points.style.marginTop = '40px';
        var label_left = document.createElement('th');
        label_left.innerHTML = 'Hand';
        var label_right = document.createElement('th');
        label_right.innerHTML = 'Probability';
        div_points.appendChild(label_left);
        div_points.appendChild(label_right);

        for(var j = 0; j < 9; j++){
            var row = document.createElement('tr');
            var value_left = document.createElement('td');
            var value_left_label = 'label_' + j + '_' + i;
            value_left.id = value_left_label;
            var value_right = document.createElement('td');
            var value_right_label = 'prob_' + j + '_' + i;
            value_right.id = value_right_label;
            row.appendChild(value_left);
            row.appendChild(value_right);
            div_points.appendChild(row);
        }

        div_player.id = 'player_' + i;
        div_player.className = 'player';
        div_hand.id = 'hand_' + i;
        div_hand.style.height = '100px';
        div_hand.style.marginLeft = '25%';
        div_player.style.height = '400px';
        div_hand.style.marginTop = '100px';
        div_hand.className = 'spread';
        if(div_hand.id == 'hand_0'){
            div_hand.onmouseover = function(){
                currentHand_card_0_0 = document.getElementById('card_0_0');
                currentHand_card_0_0.style.left = '-100px';
                currentHand_card_0_0.style.top = '0px';
                currentHand_card_0_0.style.transform = 'rotate(0deg)';
                currentHand_card_1_0 = document.getElementById('card_1_0');
                currentHand_card_1_0.style.left = '-20px';
                currentHand_card_1_0.style.top = '0px';
                currentHand_card_1_0.style.transform = 'rotate(0deg)';
                currentHand_card_2_0 = document.getElementById('card_2_0');
                currentHand_card_2_0.style.left = '60px';
                currentHand_card_2_0.style.top = '0px';
                currentHand_card_2_0.style.transform = 'rotate(0deg)';
                currentHand_card_3_0 = document.getElementById('card_3_0');
                currentHand_card_3_0.style.left = '140px';
                currentHand_card_3_0.style.top = '0px';
                currentHand_card_3_0.style.transform = 'rotate(0deg)';
                currentHand_card_4_0 = document.getElementById('card_4_0');
                currentHand_card_4_0.style.transform = 'rotate(0deg)';
                currentHand_card_4_0.style.left = '220px';
                currentHand_card_4_0.style.top = '0px';

            }
            div_hand.onmouseout = function(){
                currentHand_card_0_0 = document.getElementById('card_0_0');
                currentHand_card_0_0.style.left = '0px';
                currentHand_card_0_0.style.top = '11px';
                currentHand_card_0_0.style.transform = 'rotate(-20deg)';
                currentHand_card_1_0 = document.getElementById('card_1_0');
                currentHand_card_1_0.style.left = '30px';
                currentHand_card_1_0.style.top = '2px';
                currentHand_card_1_0.style.transform = 'rotate(-10deg)';
                currentHand_card_2_0 = document.getElementById('card_2_0');
                currentHand_card_2_0.style.left = '60px';
                currentHand_card_2_0.style.top = '0px';
                currentHand_card_2_0.style.transform = 'rotate(0deg)';
                currentHand_card_3_0 = document.getElementById('card_3_0');
                currentHand_card_3_0.style.left = '90px';
                currentHand_card_3_0.style.top = '6px';
                currentHand_card_3_0.style.transform = 'rotate(10deg)';
                currentHand_card_4_0 = document.getElementById('card_4_0');
                currentHand_card_4_0.style.transform = 'rotate(20deg)';
                currentHand_card_4_0.style.left = '118px';
                currentHand_card_4_0.style.top = '16px';
            }
        }
        else{
            div_hand.onmouseover = function(){
                currentHand_card_0_1 = document.getElementById('card_0_1');
                currentHand_card_0_1.style.left = '-100px';
                currentHand_card_0_1.style.top = '0px';
                currentHand_card_0_1.style.transform = 'rotate(0deg)';
                currentHand_card_1_1 = document.getElementById('card_1_1');
                currentHand_card_1_1.style.left = '-20px';
                currentHand_card_1_1.style.top = '0px';
                currentHand_card_1_1.style.transform = 'rotate(0deg)';
                currentHand_card_2_1 = document.getElementById('card_2_1');
                currentHand_card_2_1.style.left = '60px';
                currentHand_card_2_1.style.top = '0px';
                currentHand_card_2_1.style.transform = 'rotate(0deg)';
                currentHand_card_3_1 = document.getElementById('card_3_1');
                currentHand_card_3_1.style.left = '140px';
                currentHand_card_3_1.style.top = '0px';
                currentHand_card_3_1.style.transform = 'rotate(0deg)';
                currentHand_card_4_1 = document.getElementById('card_4_1');
                currentHand_card_4_1.style.transform = 'rotate(0deg)';
                currentHand_card_4_1.style.left = '220px';
                currentHand_card_4_1.style.top = '0px';
            }
            div_hand.onmouseout = function(){
                currentHand_card_0_0 = document.getElementById('card_0_1');
                currentHand_card_0_0.style.left = '0px';
                currentHand_card_0_0.style.top = '11px';
                currentHand_card_0_0.style.transform = 'rotate(-20deg)';
                currentHand_card_1_0 = document.getElementById('card_1_1');
                currentHand_card_1_0.style.left = '30px';
                currentHand_card_1_0.style.top = '2px';
                currentHand_card_1_0.style.transform = 'rotate(-10deg)';
                currentHand_card_2_0 = document.getElementById('card_2_1');
                currentHand_card_2_0.style.left = '60px';
                currentHand_card_2_0.style.top = '0px';
                currentHand_card_2_0.style.transform = 'rotate(0deg)';
                currentHand_card_3_0 = document.getElementById('card_3_1');
                currentHand_card_3_0.style.left = '90px';
                currentHand_card_3_0.style.top = '6px';
                currentHand_card_3_0.style.transform = 'rotate(10deg)';
                currentHand_card_4_0 = document.getElementById('card_4_1');
                currentHand_card_4_0.style.transform = 'rotate(20deg)';
                currentHand_card_4_0.style.left = '118px';
                currentHand_card_4_0.style.top = '16px';
            }
        }
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        div_player.appendChild(div_recommendation);
        document.getElementById('players').appendChild(div_player);
    }
}


function shuffle()
{
    for (var i = 0; i < 1000; i++)
    {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function startpoker()
{
    document.getElementById('btnStart').value = 'Restart';
    document.getElementById('evaluate').onclick = function(){end();};
    document.getElementById('swap_cards').onclick = function(){swapCards();};
    document.getElementById('show_probabilities').value = 'Probabilities';
    document.getElementById('show_recommendation').value = 'Recommend';
    document.getElementById("status").style.display="none";
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(2);
    createPlayersUI();
    dealHands(deck);
    document.getElementById('player_' + currentPlayer).classList.add('active');
}

function dealHands(deck)
{
    for(var i = 0; i < players.length; i++)
    {
        for (var x = 0; x < 5; x++)
        {
            var card = deck.pop();
            players[i].Hand.push(card);
            renderCard(card, i, x, deck);
        }
    }

    for(var i = 0; i < players.length; i++)
        predictOutCome(players[i].Hand, i, deck);
}

function renderCard(card, player, i, deck)
{
    var hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card, player, i, deck));

}

function swapCards(){
    for(var i = 0; i < players.length; i++){
        for(var j = 0; j < players[i].Hand.length; j++){
            if(players[i].Hand[j].clicked == true){
                var nextCard = deck.pop();
                var el = document.getElementById('card_' + j + '_' + i);
                var icon = '';
                if (nextCard.Suit == 'Hearts'){
                    icon='&hearts;';
                }
                else if (nextCard.Suit == 'Spades'){
                    icon = '&spades;';
                }
                else if (nextCard.Suit == 'Diamonds'){
                    icon = '&diams;';
                }
                else{
                    icon = '&clubs;';
                }
                el.innerHTML = nextCard.Value + '<br/>' + icon;
                if(icon == '&hearts;' || icon == '&diams;'){
                    el.style.color = 'FireBrick';
                }
                else{
                    el.style.color = 'black';
                }
                el.style.background = 'white';
                players[i].Hand[j] = nextCard;
            }
        }

        if(document.getElementById('show_probabilities').value == 'Hide'){
            calculateProbability(players[i].Hand, 0, i, deck, true);
        }
    }

    updatePoints();

    for(var i = 0; i < players.length; i++){
        for(var j = 0; j < players[i].Hand.length; j++){
            var el = document.getElementById('card_' + j + '_' + i);
            el.onclick = function(){
                el.style.background = 'white';
            };
        }
    }

    var swap_div = document.getElementById('swap_cards');
    swap_div.onclick = function(){};
}

function updateDrawn(card, player, el, deck){
    if(players[player].Drawn < 3 && card.clicked == false){
        card.clicked = true;
        el.style.background = 'lightblue';
        players[player].Drawn += 1;
        if(document.getElementById('show_probabilities').value){
            calculateProbability(players[player].Hand, players[player].Drawn, player, deck, true);
        }
    }
    else if(players[player].Drawn <= 3 && card.clicked == true){
        card.clicked = false;
        el.style.background = 'white';
        players[player].Drawn -= 1;
        if(document.getElementById('show_probabilities')){
            calculateProbability(players[player].Hand, players[player].Drawn, player, deck, true);
        }
    }
    else{
        alert('You\'ve already used all of your card swaps!')
    }
}

function flipCard(card, el){
    if(card.clicked == false){
        var icon = '';
        if (card.Suit == 'Hearts')
        icon='&hearts;';
        else if (card.Suit == 'Spades')
        icon = '&spades;';
        else if (card.Suit == 'Diamonds')
        icon = '&diams;';
        else
        icon = '&clubs;';
        if(icon == '&diams;' || icon == '&hearts;'){
            el.style.color = 'FireBrick';
        }
        el.style.fontSize = '20px';
        el.innerHTML = card.Value + '<br/>' + icon
    }
}

function getCardUI(card, player, i, deck)
{
    var el = document.createElement('div');
    el.className = 'card';
    el.onclick = function(){updateDrawn(card, player, el, deck);}
    el.onmouseover = function(){flipCard(card, el);}
    el.style.wordWrap = 'break-word';
    el.style.color = 'black';
    el.style.fontSize = '10pt';
    el.style.textAlign = 'center';
    el.innerHTML = '&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;';
    el.id = 'card_'+ i + '_' + player;
    
    return el;
}  

function getPoints(player)
{
    points = 0;
    for(var i = 0; i < players[player].Hand.length; i++)
    {
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;

    temp_values = new Array();
    for(var i = 0; i < players[player].Hand.length; i++){
        temp_values.push(players[player].Hand[i].Weight);
    }
    sorted_values = temp_values.sort((a, b) => a - b);

    temp_suits = new Array();
    for(var i = 0; i < players[player].Hand.length; i++){
        temp_suits.push(players[player].Hand[i].Suit);
    }

    players[player].Highest = sorted_values[4];

    if(temp_suits.length == 5){
        // royal flush
        if(is_flush(temp_suits) && is_straight(sorted_values) && highest_card(sorted_values) == 14){
            players[player].Points = 450;
            players[player].Type = 'Royal Flush';
        }

        // four of a kind
        else if (is_four_kind(sorted_values) && temp_suits.length == 5){
            players[player].Points = 400;
            players[player].Points += sorted_values[3];
            players[player].Type = 'Four of a Kind';
        }

        // straight flush
        else if ((is_straight(sorted_values) || is_straight_ace(sorted_values)) && is_flush(temp_suits) && temp_suits.length == 5){
            players[player].Points = 350;
            players[player].Points += sorted_values[4];
            players[player].Type = 'Straight Flush';
        }

        // full house
        else if (is_full_house(sorted_values) && temp_suits.length == 5){
            players[player].Points = 300;
            players[player].Points += sorted_values[4];
            players[player].Points += sorted_values[0];
            players[player].Type = 'Full House';
        }

        // flush
        else if (is_flush(temp_suits) && temp_suits.length == 5){
            players[player].Points = 250;
            players[player].Points += sorted_values[4];
            players[player].Type = 'Flush';
        }

        // straight
        else if ((is_straight(sorted_values) || is_straight_ace(sorted_values)) && temp_suits.length == 5){
            players[player].Points = 200;
            players[player].Points += sorted_values[4];
            players[player].Type = 'Straight';
        }

        // three of a kind
        else if (is_three_kind(sorted_values) && temp_suits.length == 5){
            players[player].Points = 150;
            players[player].Points += sorted_values[2];
            players[player].Type = 'Three of a Kind';
        }

        // two pairs
        else if (is_two_pairs(sorted_values) && temp_suits.length == 5){
            players[player].Points = 100;
            if(sorted_values[0] == sorted_values[1] && sorted_values[2] == sorted_values[3]){
                players[player].Points += sorted_values[0] / 10;
                players[player].Points += sorted_values[2];
            }
            else if(sorted_values[0] == sorted_values[1] && sorted_values[3] == sorted_values[4]){
                players[player].Points += sorted_values[0] / 10;
                players[player].Points += sorted_values[3];
            }
            else if(sorted_values[1] == sorted_values[2] && sorted_values[3] == sorted_values[4]){
                players[player].Points += sorted_values[1] / 10;
                players[player].Points += sorted_values[3];
            }
            players[player].Type = 'Two Pairs';
        }

        // pair
        else if (is_pair(sorted_values) && temp_suits.length == 5){
            players[player].Points = 50;
            if(sorted_values[0] == sorted_values[1]){
                players[player].Points += sorted_values[0];
            }
            else if(sorted_values[1] == sorted_values[2]){
                players[player].Points += sorted_values[1];
            }
            else if(sorted_values[2] == sorted_values[3]){
                players[player].Points += sorted_values[2];
            }
            else if(sorted_values[3] == sorted_values[4]){
                players[player].Points += sorted_values[3];
            }
            players[player].Type = 'A Pair';
        }

        // high card
        else{
            players[player].Points = sorted_values[4];
            players[player].Type = 'Highest Card';
        }
    }

    var points = players[player].Points;
    return points;
}

function is_flush(hand){
    return hand.every((val, i, arr) => val === arr[0]);
}

function is_straight_ace(hand){
    var written = ''
    for(var i = 0; i < hand.length; i++){
        written += hand[i];
    }
    if(written == '234514'){
        return true;
    }
    else{
        return false;
    }
}

function is_straight(hand){
    to_return = true;
    for(var i = 0; i < hand.length - 1; i++){
        if(hand[i + 1] - hand[i] != 1){
            to_return = false;
        }
    }
    return to_return;
}

function is_four_kind(hand){
    return ((hand[0] == hand[1] && hand[1] == hand[2] && hand[2] == hand[3]) || (hand[1] == hand[2] && hand[2] == hand[3] && hand[3] == hand[4]));
}

function is_full_house(hand){
    return ((hand[0] == hand[1] && hand[1] == hand[2] && hand[3] == hand[4]) || (hand[0] == hand[1] && hand[2] == hand[3] && hand[3] == hand[4]));
}

function is_three_kind(hand){
    for(var i = 0; i < hand.length - 2; i++){
        if(hand[i] == hand[i + 1] && hand[i + 1] == hand[i + 2]){
            return true;
        }
    }
    return false;
}

function is_two_pairs(hand){

    return ((hand[0] == hand[1] && hand[2] == hand[3]) || (hand[0] == hand[1] && hand[3] == hand[4]) || (hand[1] == hand[2] && hand[3] == hand[4]));
}

function is_pair(hand){
    for(var i = 0; i < hand.length - 1; i++){
        if(hand[i] == hand[i + 1]){
            return true;
        }
    }
    return false
}

function highest_card(hand){
    return hand[4].Weight
}

function updatePoints()
{
    for (var i = 0 ; i < players.length; i++)
    {
        getPoints(i);
    }
}

function show_score(){
    if(document.getElementById('show_score').value == 'Score'){
        var status = document.getElementById('status');
        status.innerHTML = player1 + ':' + player2;
        status.style.display = 'inline-block';
        status.style.marginLeft = '43.5%';
        document.getElementById('show_score').value = 'Hide';
    }
    else{
        var status = document.getElementById('status');
        status.innerHTML = '';
        status.style.display = 'none';
        status.style.marginLeft = "43.5%";
        document.getElementById('show_score').value = 'Score';
    }
}

function end()
{
    var winner = -1;
    updatePoints();

    if (players[0].Points == players[1].Points){
        if (players[0].Highest > players[1].Highest){
            winner = 0;
        }
        else if (players[0].Highest < players[1].Highest){
            winner = 1;
        }
    }
    else if (players[0].Points > players[1].Points)
    {
        winner = 0;
    }
    else if (players[0].Points < players[1].Points){
        winner = 1;
    }
    else{
        document.getElementById('status').innerHTML = 'This game is a tie!'
    }       

    if (winner == 0){
        player1 += 1;
    }
    else if (winner == 1){
        player2 += 1;
    }

    if(winner == 0 || winner == 1){
        document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID + '</br>' + player1 + ':' + player2 + '<br/>' + players[winner].Type;
        document.getElementById("status").style.display = "inline-block";
    }

    document.getElementById('evaluate').onclick = function(){};
}


window.addEventListener('load', function(){
    createDeck();
    shuffle();
    createPlayers(1);
});

function k_combinations(set, k) {
    var i, j, combs, head, tailcombs;
    
    if (k > set.length || k <= 0) {
        return [];
    }
    
    if (k == set.length) {
        return [set];
    }
    
    if (k == 1) {
        combs = [];
        for (i = 0; i < set.length; i++) {
            combs.push([set[i]]);
        }
        return combs;
    }

    combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
        head = set.slice(i, i + 1);
        tailcombs = k_combinations(set.slice(i + 1), k - 1);
        for (j = 0; j < tailcombs.length; j++) {
            combs.push(head.concat(tailcombs[j]));
        }
    }
    return combs;
}

function getDeckValues(deck){
    var temp = new Array();
    for(i = 0; i < deck.length; i++){
        temp.push(deck[i].Weight + ' ' + deck[i].Suit);
    }
    return temp;
}

function calculateProbability(hand, drawn, player, deck, printable){
    var partial_values_hand = new Array();
    var partial_suits_hand = new Array();
    var values_hand = new Array();
    var suits_hand = new Array();

    for(var i = 0; i < hand.length; i++){
        if(hand[i].clicked == false){
            partial_values_hand.push(hand[i].Weight);
            partial_suits_hand.push(hand[i].Suit);
        }
        values_hand.push(hand[i].Weight);
        suits_hand.push(hand[i].Suit);
    }
    
    partial_values_hand = partial_values_hand.sort((a, b) => a - b);
    values_hand = values_hand.sort((a, b) => a - b);

    var probabilities = new Array();
    var temp_picked = k_combinations(deck, drawn);
    var picked = new Array();
    for(var i = 0; i < temp_picked.length; i++){
        var to_push = new Array();
        for(var j = 0; j < temp_picked[i].length; j++){
            var temp = temp_picked[i][j].Weight + ' ' + temp_picked[i][j].Suit;
            to_push.push(temp);
        }
        picked.push(to_push);
    }

    var royalFlushTotal = 0;
    var fourKindTotal = 0;
    var straightFlushTotal = 0;
    var fullHouseTotal = 0;
    var flushTotal = 0;
    var straightTotal = 0;
    var threeKindTotal = 0;
    var twoPairsTotal = 0;
    var pairTotal = 0;
    var highTotal = 0;
    var total = 0;

    var royalFlushPoints = 0;
    var fourKindPoints = 0;
    var straightFlushPoints = 0;
    var fullHousePoints = 0;
    var flushPoints = 0;
    var straightPoints = 0;
    var threeKindPoints = 0;
    var twoPairsPoints = 0;
    var pairPoints = 0;
    var highPoints = 0;
    var total = 0;

    for(i = 0; i < picked.length; i++){
        temp_updated_values = new Array();
        for(j = 0; j < partial_values_hand.length; j++){
            temp_updated_values.push(partial_values_hand[j]);
        }
        temp_updated_suits = new Array();
        for(j = 0; j < partial_suits_hand.length; j++){
            temp_updated_suits.push(partial_suits_hand[j]);
        }

        for(j = 0; j < picked[i].length; j++){
            temp_updated_values.push(parseInt(picked[i][j].substr(0, picked[i][j].indexOf(' '))));
            temp_updated_suits.push(picked[i][j].substr(picked[i][j].indexOf(' ') + 1, picked[i][j].length));
        }
        temp_updated_values = temp_updated_values.sort((a, b) => a - b);

        if(is_straight(temp_updated_values) && is_flush(temp_updated_suits) && temp_updated_values[4] == 14){
            royalFlushTotal += 1;
            total += 1;
            royalFlushPoints += 450;
        }
        else if(is_four_kind(temp_updated_values)){
            fourKindTotal += 1;
            total += 1;
            fourKindPoints += 400;
            fourKindPoints += temp_updated_values[4];

        }
        else if((is_straight(temp_updated_values) || is_straight_ace(temp_updated_values)) && is_flush(temp_updated_suits)){
            straightFlushTotal += 1;
            total += 1;
            straightFlushPoints += 350;
            straightFlushPoints += temp_updated_values[4];
        }
        else if(is_full_house(temp_updated_values)){
            fullHouseTotal += 1;
            total += 1;
            fullHousePoints += 300;
            fullHousePoints += temp_updated_values[0] + temp_updated_values[4];
        }
        else if(is_flush(temp_updated_suits)){
            flushTotal += 1;
            total += 1;
            flushPoints += 250;
            flushPoints += temp_updated_values[4];
        }
        else if(is_straight(temp_updated_values) || is_straight_ace(temp_updated_values)){
            straightTotal += 1;
            total += 1;
            straightPoints += 200;
            straightPoints += temp_updated_values[4];
        }
        else if(is_three_kind(temp_updated_values)){
            threeKindTotal += 1;
            total += 1;
            threeKindPoints += 150;
            threeKindPoints += temp_updated_values[4];
        }
        else if(is_two_pairs(temp_updated_values)){
            twoPairsTotal += 1;
            total += 1;
            twoPairsPoints += 100;
            if(temp_updated_values[0] == temp_updated_values[1] && temp_updated_values[2] == temp_updated_values[3]){
                twoPairsPoints += temp_updated_values[0] / 10;
                twoPairsPoints += temp_updated_values[2];
            }
            else if(temp_updated_values[0] == temp_updated_values[1] && temp_updated_values[3] == temp_updated_values[4]){
                twoPairsPoints += temp_updated_values[0] / 10;
                twoPairsPoints += temp_updated_values[3];
            }
            else if(temp_updated_values[1] == temp_updated_values[2] && temp_updated_values[3] == temp_updated_values[4]){
                twoPairsPoints += temp_updated_values[1] / 10;
                twoPairsPoints += temp_updated_values[3];
            }
        }
        else if(is_pair(temp_updated_values)){
            pairTotal += 1;
            total += 1;
            pairPoints += 50;
            if(temp_updated_values[0] == temp_updated_values[1]){
                pairPoints += temp_updated_values[0];
            }
            else if(temp_updated_values[1] == temp_updated_values[2]){
                pairPoints += temp_updated_values[1];
            }
            else if(temp_updated_values[2] == temp_updated_values[3]){
                pairPoints += temp_updated_values[2];
            }
            else if(temp_updated_values[3] == temp_updated_values[4]){
                pairPoints += temp_updated_values[3];
            }
        }
        else{
            highTotal += 1;
            total += 1;
            highPoints += temp_updated_values[4];
        }
    }

    var pair_prob = parseFloat((pairTotal/total).toFixed(12));
    var two_pair_prob = parseFloat((twoPairsTotal/total).toFixed(12));
    var three_prob = parseFloat((threeKindTotal/total).toFixed(12));
    var straight_prob = parseFloat((straightTotal/total).toFixed(12));
    var flush_prob = parseFloat((flushTotal/total).toFixed(12));
    var full_house_prob = parseFloat((fullHouseTotal/total).toFixed(12));
    var straight_flush_prob = parseFloat((straightFlushTotal/total).toFixed(12));
    var four_prob = parseFloat((fourKindTotal/total).toFixed(12));
    var royal_flush_prob = parseFloat((royalFlushTotal/total).toFixed(12));
    var high_prob = parseFloat((highTotal/total).toFixed(12));

    if(is_flush(suits_hand) && is_straight(values_hand) && values_hand[4] == 14 && drawn == 0){
        royal_flush_prob = 1;
    }
    else if(is_four_kind(values_hand) && drawn == 0){
        four_prob = 1;
    }
    else if((is_straight(values_hand) || is_straight_ace(values_hand)) && is_flush(suits_hand) && drawn == 0){
        straight_flush_prob = 1;
    }
    else if(is_full_house(values_hand) && drawn == 0){
        full_house_prob = 1;
    }
    else if(is_flush(suits_hand) && drawn == 0){
        flush_prob = 1;
    }
    else if((is_straight(values_hand) || is_straight_ace(values_hand)) && drawn == 0){
        straight_prob = 1;
    }
    else if(is_three_kind(partial_values_hand)){
        three_prob = 1;
    }
    else if(is_two_pairs(partial_values_hand) && drawn <= 1){
        two_pair_prob = 1;
    }
    else if(is_pair(partial_values_hand)){
        pair_prob = 1;
    }

    if(isNaN(royal_flush_prob)){
        royal_flush_prob = 0;
    }
    if(isNaN(four_prob)){
        four_prob = 0;
    }
    if(isNaN(straight_flush_prob)){
        straight_flush_prob = 0;
    }
    if(isNaN(full_house_prob)){
        full_house_prob = 0;
    }
    if(isNaN(flush_prob)){
        flush_prob = 0;
    }
    if(isNaN(straight_prob)){
        straight_prob = 0;
    }
    if(isNaN(three_prob)){
        three_prob = 0;
    }
    if(isNaN(two_pair_prob)){
        two_pair_prob = 0;
    }
    if(isNaN(pair_prob)){
        pair_prob = 0;
    }


    var expected_value = 0;
    if(highTotal != 0){
        expected_value += high_prob*highPoints/highTotal;
    }
    if(pairTotal != 0){
        expected_value += pair_prob*pairPoints/pairTotal;
    }
    if(twoPairsTotal != 0){
        expected_value += two_pair_prob*twoPairsPoints/twoPairsTotal;
    }
    if(threeKindTotal != 0){
        expected_value += three_prob*threeKindPoints/threeKindTotal;
    }
    if(straightTotal != 0){
        expected_value += straight_prob*straightPoints/straightTotal;
    }
    if(flushTotal != 0){
        expected_value += flush_prob*flushPoints/flushTotal;
    }
    if(fullHouseTotal != 0){
        expected_value += full_house_prob*fullHousePoints/fullHouseTotal;
    }
    if(straightFlushTotal != 0){
        expected_value += straight_flush_prob*straightFlushPoints/straightFlushTotal;
    }
    if(fourKindTotal != 0){
        expected_value += four_prob*fourKindPoints/fourKindTotal;
    }
    if(royalFlushTotal != 0){
        expected_value += royal_flush_prob*royalFlushPoints/royalFlushTotal;
    }

    if(expected_value == 0){
        expected_value = getPoints(player);
    }

    probabilities.push('Pair: ' + pair_prob);
    probabilities.push('Two pairs: ' + two_pair_prob);
    probabilities.push('Three of a kind: ' + three_prob);
    probabilities.push('Straight: ' + straight_prob);
    probabilities.push('Flush: ' + flush_prob);
    probabilities.push('Full house: ' + full_house_prob);
    probabilities.push('Straight flush: ' + straight_flush_prob);
    probabilities.push('Four of a kind: ' + four_prob);
    probabilities.push('Royal flush: ' + royal_flush_prob);

    if(printable == true){
        for(var i = 0; i < probabilities.length ; i++){
            var value_left = document.getElementById('label_' + i + '_' + player);
            value_left.innerHTML = probabilities[i].substr(0, probabilities[i].indexOf(':'));
            var value_right = document.getElementById('prob_' + i + '_' + player);
            value_right.innerHTML = probabilities[i].substr(probabilities[i].indexOf(':')+2, probabilities[i].length);
        }
    }

    return expected_value;
}

function combinations(arr){
  let i, j, temp
  let result = []
  let arrLen = arr.length
  let power = Math.pow
  let combinations = power(2, arrLen)
    
  for (i = 0; i < combinations;  i++) {
    temp = new Array();
    
    for (j = 0; j < arrLen; j++) {
      if ((i & power(2, j))) {
        temp.push(arr[j]);
      }
    }
    result.push(temp);
  }
  return result;
}

function predictOutCome(hand, player, deck){
    var possibleDraws = combinations([0, 1, 2, 3, 4]);
    exp_vals = new Array();
    exp_hands = new Array();

    for(var i = 0; i < possibleDraws.length; i++){
        var temp_hand = new Array();
        if(possibleDraws[i].length >= 2){
            for(var j = 0; j < hand.length; j++){
                if(possibleDraws[i].indexOf(j) != -1){
                    temp_hand.push(hand[j])
                }
                else{
                    temporary_card = {Value: hand[j].Value, Suit: hand[j].Suit, Weight: hand[j].Weight, clicked: true};
                    temp_hand.push(temporary_card);
                }
            }
            var current_exp_val = calculateProbability(temp_hand, 5 - possibleDraws[i].length, player, deck, false);
            if(!isNaN(current_exp_val)){
                exp_vals.push(current_exp_val);
                exp_hands.push(possibleDraws[i]);
            }
        }
    }

    var best_value = Math.max.apply(null, exp_vals);
    var index_of_best = exp_vals.indexOf(best_value);
    var best_hand = exp_hands[index_of_best];

    var best_cards = new Array();
    for(var i = 0; i < hand.length; i++){
        if(best_hand.indexOf(i) != -1){
            best_cards.push('the ' + hand[i].Value + ' of ' + hand[i].Suit);
        }
    }

    var to_write = '';
    for(var i = 0; i < best_cards.length; i++){
        to_write += best_cards[i];
        if(i < best_cards.length - 2 && best_cards.length > 2){
            to_write += ', ';
        }
        else if(i == 0 && best_cards.length == 2){
            to_write += ', and ';
        }
        else if(i == best_cards.length - 2 && best_cards.length > 2){
            to_write += ', and ';
        }
    }

    document.getElementById('recommendation_' + player).innerHTML = 'Recommendation: Keep ' + to_write;
    return [best_hand, best_value];
}
