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
    var info = new Date(days);
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
                var ul = $("#dataArea");
                ul.empty();
                var rows = data.rows;
                if(rows.length > 0){
                    for(var i=0;i<rows.length;i++){
                        $("<li/>").attr('id', rows[i].id).addClass('list').attr('onclick','showInfo("'+rows[i].id+'")').append(
                            $('<div/>').addClass('circle').text(rows[i].date)
                        ).append(
                            $('<div/>').addClass('textBox').append(
                                $('<span/>').text(rows[i].contents)
                            )
                        ).appendTo(ul);
                    }
                }
            }
       },error:function(){
           alert('getList 오류!!!')
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
                $('input[name=date]').val(data.data.date);
                $('#title').val(data.data.title);
                $('#contents').val(data.data.contents);

                $('.addbtn').hide();
                $('.updatebtn').show();
                $('#myModal').modal('show');
            }
       },error:function(){
           alert('getList 오류!!!')
       }
    });
}
