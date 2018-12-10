function getDays(){
    var today = new Date();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    mm = mm < 10 ? '0'+mm : mm;
    today = yyyy+"."+mm;


    $('#thisMonth').text(today);
    getList(yyyy, mm);
}

/* 
 * @param {*} status 
 * 월 이동 관련 스크립트
 */
function moveDays(status){
    var days = $('#thisMonth').text();
    days = days.replace(".", "/") + "/01";
    var info = new Date(days);
    console.log(info)
    var month = info.getMonth() + 1;
    var year = info.getFullYear(); 

    if(status == 'pre'){
        month--;
        if(month == 0){
            month = 12;
            year--;
        }
    }else{
        month++;
        if(month == 13){
            month = 1;
            year++;
        }
    }
    month = month < 10 ? '0'+ month : month;
    var newDays = year+"."+ month;
    $('#thisMonth').text(newDays);
    getList(year, month);
}

function getList(year, month){
    var lastDay = ( new Date( year, month, 0) ).getDate();

    var date = {
        startDate : year+'/'+month+'/01',
        endDate : year+'/'+month+'/'+lastDay
    }
    $.ajax({
        url: '/list',
        dataType: 'json',
        type: 'GET',
        data: date,
        success: function(data) {
            if(data.result == 'success'){
                var dailyUl = $("<ul/>");//$("#dataArea");
                var todolistUl = $("<ul/>");

                var dailyDiv = $('.daily');
                var todolistDiv= $('.todolist');

                dailyDiv.empty();
                todolistDiv.empty();


                var rows = data.rows;
                if(rows.length > 0){
                    for(var i=0;i<rows.length;i++){

                        if(rows[i].writeRadio && rows[i].writeRadio == 'daily'){
                           var list=  $("<li/>").attr('id', rows[i].id).addClass('list').attr('onclick','showInfo("'+rows[i].id+'")').append(
                                $('<div/>').addClass('circle').text(rows[i].date)
                            ).append(
                                $('<span/>').text(rows[i].title).addClass('textTitle')
                            ).append(
                                $('<div/>').addClass('textBox').append(
                                    $('<span/>').text(rows[i].contents)
                                )
                            ).appendTo(dailyUl);
                        }else if(rows[i].writeRadio && rows[i].writeRadio == 'todolist'){
                            if(rows[i].todoComplete){
                                $("<li/>").attr('id', rows[i].id).addClass('complete').attr('onclick','showInfo("'+rows[i].id+'")').append(
                                    $('<div/>').addClass('circle').text(rows[i].date)
                                ).append(
                                    $('<span/>').text(rows[i].title).addClass('textTitle')
                                ).appendTo(todolistUl);
                            }else{
                                $("<li/>").attr('id', rows[i].id).addClass('list').attr('onclick','showInfo("'+rows[i].id+'")').append(
                                    $('<div/>').addClass('circle').text(rows[i].date)
                                ).append(
                                    $('<span/>').text(rows[i].title).addClass('textTitle')
                                ).append(
                                    $('<div/>').addClass('textBox').append(
                                        $('<span/>').text(rows[i].contents)
                                    )
                                ).appendTo(todolistUl);
                            }
                        }
                    }
                    dailyUl.appendTo(dailyDiv);
                    todolistUl.appendTo(todolistDiv);
                }
            }
       },error:function(){
           alert('getList 오류!!!')
       }
    });
}

function getCategoryList(){
    $.ajax({
        url: '/list/category',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            if(data.result == 'success'){
                var menu = $("#menu");
                var length = data.rows.length;
                console.log(data)
                for(var i=0; i<length ;i++){
                    console.log(data.rows[i]);
                    var data = data.rows[i];


                    // li
                    //     a(href='/setting')
                    //         span(class='glyphicon glyphicon-option-horizontal')

                    $("<li/>").append(
                        $("<a/>").attr('href','#').append(
                            $("<div/>").addClass('categoryArea').css('background', data.color)
                        )
                    ).prependTo(menu);
                    console.log(menu);
                }
            }
        }
    });
}

function showInfo(id){
    $.ajax({
        url: '/view',
        dataType: 'json',
        type: 'GET',
        data: {id:id},
        success: function(data) {
            if(data.result == 'success'){
                $('#id').val(data.data.id);
                $('input[name=date]').val(data.data.date);
                $('#title').val(data.data.title);
                $('#contents').val(data.data.contents);
                $("#"+data.data.writeRadio).attr('checked', 'checked');

                $("#todoComplete").attr('checked', false);
                if(data.data.writeRadio != 'todolist'){
                    $("#todo_compelete").hide();
                }else{
                    if(data.data.todoComplete && data.data.todoComplete == 'Y'){
                        $("#todoComplete").attr('checked', 'checked');                        
                    }
                }

                $('.deletebtn').show();
                $('#myModal').modal('show');
            }
       },error:function(){
           alert('getList 오류!!!')
       }
    });
}

function openDialogForAdd(){
    $('#id').val('');
    $('input[name=date]').val('');
    $('#title').val('');
    $('#contents').val('');

    $('.deletebtn').hide();
    $('#myModal').modal('show');
}
