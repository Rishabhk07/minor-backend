var price = 10; //price
var book;
$(document).ready(function() {



    // console.log(window.seating.info() + "ssup ??");
    $.post('/getbooking' , {} , function (booked) {
        var len = booked.length;
        var hall = booked[len-2];
        var movie = booked[len-1];
        console.log(booked);
        console.log(booked[len-1]);
        console.log(booked[len-2]);
        book = booked;


        var $cart = $('#selected-seats'), //Sitting Area
            $counter = $('#counter'), //Votes
            $total = $('#total'); //Total money

        var sc = $('#seat-map').seatCharts({
            map: [  //Seating chart
                'aaaaaaaaaa',
                'aaaaaaaaaa',
                '__________',
                'aaaaaaaaaa',
                'aaaaaaaaaa',
                'aaaaaaaaaa',
                'aaaaaaaaaa',
                '__________',
                'aaaaaaaaaa',
                'aa__aa__aa'
            ],
            seats: {
                a: {
                    price: 180,
                    classes: 'mid-seat' //your custom CSS class
                },
                b: {
                    price: 180,
                    classes: 'front-seats'
                },
                g: {
                    price: 240,
                    classes: 'back-seats'
                }

            },
            naming: {
                top: false,
                getLabel: function (character, row, column) {
                    return column;
                }
            },
            legend: { //Definition legend
                node: $('#legend'),
                items: [
                    ['a', 'available', 'Option'],
                    ['a', 'unavailable', 'Sold']
                ]
            },
            click: function () { //Click event
                if (this.status() == 'available') { //optional seat
                    $('<li>R' + (this.settings.row + 1) + ' S' + this.settings.label + '</li>')
                        .attr('id', 'cart-item-' + this.settings.id)
                        .data('seatId', this.settings.id)
                        .appendTo($cart);

                    console.log( "available" + this.settings.id);


                    $.post('/enquiry' , {
                        hall:hall,
                        movie:movie,
                        left: sc.find('a.available').length
                    } , function () {

                    });


                    $counter.text(sc.find('selected').length + 1);
                    $total.text(recalculateTotal(sc) + price);

                    return 'selected';
                } else if (this.status() == 'selected') { //Checked
                    //Update Number
                    $counter.text(sc.find('selected').length - 1);
                    //update totalnum
                    $total.text(recalculateTotal(sc) - price);

                    console.log("selected" + this.settings.id);
                    //Delete reservation
                    $('#cart-item-' + this.settings.id).remove();
                    //optional
                    return 'available';
                } else if (this.status() == 'unavailable') { //sold
                    console.log("unavailable" + this.settings.id);
                    return 'unavailable';
                } else {
                    console.log("else" + this.settings.id);
                    return this.style();
                }
            }
        });
        //sold seat
        sc.get(book).status('unavailable');
    });

});
//sum total money
function recalculateTotal(sc) {
    var total = 0;
    sc.find('selected').each(function () {
        total += price;
    });

    return total;
}


