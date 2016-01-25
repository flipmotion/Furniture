$(document).ready(function () {
    $('#PagerCatalog').change(function () {
        var page = $(this).val();
        var url = location.href;
        var newUrl = delPrm(url, 'PAGEN_1');
        if (newUrl != 'undefined') {
            var link = newUrl + '?PAGEN_1=' + page;

        } else {
            var link = url + '?PAGEN_1=' + page;
        }
        window.location.href = link;
        e.preventDefault();
    });
    ;

    $('#zam-btn').click(function () {
        var name = $('#zam-name').val();
        var phone = $('#zam-phone').val();
        var city = $('#zam-city').val();
        var street = $('#zam-street').val();
        var comment = $('#zam-comment').val();

        $.post("/include/OrderZam.php", {name: name, phone: phone, city: city, street: street, comment: comment}, function (data) {
            if (data != 'OK') {
                $('#' + data).css('border', '1px solid red')
            } else {
                alert('Сообщение отправлено! Данный текст заменим красивым эффектом позже!');
                location.reload();
            }
        });
        return false;
    });

    $('#GoOrder').click(function () {
        $('input').css('border', 'none')
        $('input').css('border', '1px solid #CCC')
        var name = $('#order-name').val();
        var city = $('#order-city').val();
        var street = $('#order-street').val();
        var phone = $('#order-phone').val();
        var comment = $('#comment-text').val();

        $.post("/include/OrderFinal.php", {name: name, city: city, street: street, phone: phone, comment: comment}, function (data) {
            if (data != 'OK') {
                $('#' + data).css('border', '1px solid red')
            } else {
                alert('Сообщение отправлено! Данный текст заменим красивым эффектом позже!');
                location.reload();
            }
        });
        return false;
    });

   

    /*$('.btn-cpr').click(function () {
        var id_item = $(this).data('item');
        var name_item = $(this).data('name');
        var name_link = $(this).data('link');
        
        $('.alert').slideDown();
        $('.alert').find('p').html('<strong>Добавлен к сравнению!</strong><br/>Товар «' + name_item + '»');
         
        $.post("/include/Compare.php", {id_item: id_item, name_item: name_item, name_link: name_link}, function (data) {
            if (data == '755') {
                alert(data);
            }else{
                $('#compare-list').html(data);
            }
            coutItems();
        });
    });*/
    
    function sideCompare() {
        var id_item = $(this).data('item');
        var name_item = $(this).data('name');
        var name_link = $(this).data('link');
        $('.alert').find('p').html('<strong>Добавлен к сравнению!</strong><br/>Товар «' + name_item + '»');

         if(typeof name_link != 'undefined') {
            
            $('.alert').slideDown();
         }
         else {
            
            $('.alert').slideUp();
         }
        $.post("/include/Compare.php", {id_item: id_item, name_item: name_item, name_link: name_link}, function (data) {
            if (data == '755') {
                alert(data);
            }else{
                $('#compare-list').html(data);
            }
            coutItems();
        });
    }
    $('.btn-cpr').on('click', sideCompare);
    sideCompare();
    $('.delete-compare').click(function(){
        var id = $(this).data('item');
        coutItems();
        $.post("/include/CompareDelete.php", {id: id}, function (data){
            location.reload();
        });
         return false;
    });

    $('.SortCatalog').click(function () {
        var sort = $(this).attr('data-sort');
        $.post("/include/sort.php", {sort: sort}, function (data) {
            location.reload();
            return false;
        });
    });

    $('.addcart').click(function () {
        var count = '1';
        var id = $(this).attr('data-item');
        $.post("/include/cart.php", {count: count, id: id}, function (data) {
            //$('#countHeader').html(data);
            Updatecart();
        });
    });





    $('#trash').on('show.bs.modal', function (event) {

        var button = $(event.relatedTarget),
                id = button.data('item'),
                count = '1',
                modal = $(this)

        $.post("/include/cart.php", {count: count, id: id}, function (data) {
            Updatecart();
            UpdateCartPopup();
        });

    });


    UpdateCompare()
    Updatecart();

    
});
function coutItems(){
    var count = document.getElementById('compare-list').children.length;
        console.log(count);
        if(count >= 2) {
            $('.compare-side div .my-flex.full-width a').css({
                'pointer-events' : 'auto',
                'opacity' : '1'
            });
        }
        else {
            $('.compare-side div .my-flex.full-width a').css({
                'pointer-events' : 'none',
                'opacity' : '.5'
            });
        }
}

function UpdateCompare(){
    var Update = '1';
    $.post("/include/Compare.php", {Update:Update}, function (data) {
        if (data == '755') {
            alert(data);
        }else{
            $('#compare-list').html(data);
            }
    });
}

function Updatecart() {
    var update = 1;
    $.post("/include/UpdateCart.php", {update: update}, function (data) {
        $('#countHeader').html(data);
    });
}

function UpdateCartPopup() {
    var update = 1;
    $.post("/include/UpdateCartPopup.php", {update: update}, function (data) {
        $('#PopCart').html('');
        $('#PopCart').html(data);
    });
}

function delPrm(Url, Prm) {
    var a = Url.split('?');
    var re = new RegExp('(\\?|&)' + Prm + '=[^&]+', 'g');
    Url = ('?' + a[1]).replace(re, '');
    Url = Url.replace(/^&|\?/, '');
    var dlm = (Url == '') ? '' : '?';
    if (dlm == '?') {
        return 'undefined'
    } else {
        return a[0] + dlm + Url;
    }


}

function DeleteItem(param) {
    var item = param;
    var del = 1;

    $.post("/include/getOrder.php", {item: item, del: del}, function (data) {
        $('#OrderListFinal').html(data);
        Updatecart();
        UpdateCartPopup();
    });
}


function template_reset(param) {
    var tmp = param;
    $.post("/include/tmp.php", {tmp: tmp}, function (data) {
        location.reload();
    });
}

function MinusItem(param) {
    var item = param;
    var minus = 1;
    $.post("/include/getOrder.php", {item: item, minus: minus}, function (data) {
        $('#OrderListFinal').html(data);
        Updatecart();
    });
}

function PlusItem(param) {
    var item = param;
    var plus = 1;
    $.post("/include/getOrder.php", {item: item, plus: plus}, function (data) {
        $('#OrderListFinal').html(data);
        Updatecart();
    });
}

