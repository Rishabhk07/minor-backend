var price = 10; //price
$(document).ready(function() {

    console.log(window.hall + window.movie + "ssup ??");


    var $cart = $('#selected-seats'), //Sitting Area
        $counter = $('#counter'), //Votes
        $total = $('#total'); //Total money

    var sc = $('#seat-map').seatCharts({
        map: [  //Seating chart
            'bbbbbbbbbb',
            'bbbbbbbbbb',
            '__________',
            'aaaaaaaaaa',
            'aaaaaaaaaa',
            'aaaaaaaaaa',
            'aaaaaaaaaa',
            '__________',
            'gggggggggg',
            'gg__gg__gg'
        ],
        seats: {
            a: {
                price   : 180,
                classes : 'mid-seat' //your custom CSS class
            },
            b:{
                price: 180,
                classes: 'front-seats'
            },
            g:{
                price: 240,
                classes: 'back-seats'
            }

        },
        naming : {
            top : false,
            getLabel : function (character, row, column) {
                return column;
            }
        },
        legend : { //Definition legend
            node : $('#legend'),
            items : [
                [ 'a', 'available',   'Option' ],
                [ 'a', 'unavailable', 'Sold']
            ]
        },
        click: function () { //Click event
            if (this.status() == 'available') { //optional seat
                $('<li>R'+(this.settings.row+1)+' S'+this.settings.label+'</li>')
                    .attr('id', 'cart-item-'+this.settings.id)
                    .data('seatId', this.settings.id)
                    .appendTo($cart);

                console.log(this.settings.id);


                $counter.text(sc.find('selected').length+1);
                $total.text(recalculateTotal(sc)+price);

                return 'selected';
            } else if (this.status() == 'selected') { //Checked
                //Update Number
                $counter.text(sc.find('selected').length-1);
                //update totalnum
                $total.text(recalculateTotal(sc)-price);

                console.log(this.settings.id);
                //Delete reservation
                $('#cart-item-'+this.settings.id).remove();
                //optional
                return 'available';
            } else if (this.status() == 'unavailable') { //sold
                console.log(this.settings.id);
                return 'unavailable';
            } else {
                console.log(this.settings.id);
                return this.style();
            }
        }
    });
    //sold seat
    // sc.get(['1_2', '4_4','4_5','6_6','6_7','8_5','8_6','8_7','8_8', '10_1', '10_2']).status('unavailable');

});
//sum total money
function recalculateTotal(sc) {
    var total = 0;
    sc.find('selected').each(function () {
        total += price;
    });

    return total;
}


