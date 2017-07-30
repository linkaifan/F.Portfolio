$(document).ready(function(){
;(function (){
	var DeleteIndex = 0,	//定义删除时候用于判断的index变量
		local = window.location.href,
		token = local.split("?")[1];
		console.log(token),
		ShowId = [];
	/*加载后台数据内容*/
	$.ajax({
	  url: 'http://139.199.18.137:7777/api/projects',
	  type: 'GET',
	  success: function (data, status) {
	    console.log(data);
	    var preImg = 'http://139.199.18.137:7777/upload/',
	    	ShowGroup = [],
	    	idlength = data.data.length,
	    	idIndex = -1;
	    function FcreatShow(n){					//创建show对应作品
	    	
	    	var p = '<div class="Show'+data.data[n].id+' Show"><img src='+preImg+data.data[n].pic+' alt="show'+n+'"><p class="ShowText"><span>'+data.data[n].title+'</span><br/><a href="#" class="editBtn"><img src=".././F.img/edit.png" alt="edit" class="editBtnImg"></a><a href="#" class="deleteBtn"><img src=".././F.img/delete.png" alt="delete" class="deleteBtnImg"></a></p></div>'
	    	return p;
	    };
	    for (var i = 0; i < idlength; i++) {		//将其添加到main上
	    	ShowGroup[i] = FcreatShow(i);
	    	$('main').append(ShowGroup[i]);
	    }
	    $('.Show').tap(function (event) {							//事件冒泡
	    	if (event.target.className === 'deleteBtnImg') {
	    		$('.Mask').fadeIn();
	    		DeleteIndex = $(event.target).parent().parent().parent().attr("class").substring(4,5);			//当点击删除按钮弹出pop时，记录点击的是第几个作品
	    	}
	    	else if(event.target.className === 'editBtnImg'){				//点击对应的编辑按钮跳到对应的编辑页面
	    		idIndex = $(event.target).parent().parent().parent().attr("class").substring(4,5);		//获取点击按钮属于哪个id
	    		console.log(idIndex);
	    		window.open('edit.html?'+idIndex+'?'+token,'_self');
	    	}
	    })
	 	
	  },
	  fail: function (err, status) {
	    console.log(err)
	  }
	})
	/*各个按钮点击事件*/
	$('.glyphicon-remove').tap(function(){			//X，取消，按钮事件
		$('.Mask').fadeOut();
	})
	$('.popUpCancel').tap(function () {
		$('.Mask').fadeOut();
	})
	$('.upLoadImg').tap(function (event) {				//点击上传作品，跳转到全新的编辑页面,id默认为-1
		window.open('edit.html?-1?'+token,'_self');
	})
	$('.popUpDelete').tap(function(event){				//删除特定作品
		alert(DeleteIndex);
		$.ajax({
		  url: 'http://139.199.18.137:7777/api/projects/'+DeleteIndex,
		  headers:{'Authorization':'Bearer '+ token},
		  type: 'DELETE',
		  success: function (data, status) {

		    alert('Delete');
		    
		    window.open(local);

		  },
		  fail: function (err, status) {
		    console.log(err)
		  }
		})
	})

})();
});