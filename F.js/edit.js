$(document).ready(function(){
	var	local = window.location.href,
		idIndex = local.split("?")[1],
		token = local.split('?')[2] || 0,
		upImgF = null;
	console.log(token);
	console.log(idIndex);
	$.ajax({
	  url: 'http://139.199.18.137:7777/api/projects',
	  type: 'GET',
	  success: function (data, status) {
	    console.log(data);     
	    if (idIndex != -1 ) {
	    	var	preImg = 'http://139.199.18.137:7777/upload/',
	    		formData = -1,
	    		DataIndex = -1,
	    		idlength = data.data.length;

    		for ( DataIndex = 0; DataIndex < idlength; DataIndex++) {
				if (data.data[DataIndex].id == idIndex) {

					formData = data.data[DataIndex];     //即为第几个作品
				}
    		}		
	    		
	    	$('.editImg img').attr('src',preImg + formData.pic);			//填充到文本里面
	    	$('.editText input').val(formData.title);
	    	$('.editUrl input').val(formData.url);
	    	$('.editSummary textarea').val(formData.intro);
	    	$('.editDifficulty textarea').val(formData.content);
	    }
	    
	  },
	  fail: function (err, status) {
	    console.log(err)
	  }
	})
	$('#upImg').tap(function(){
		return  $("#File").click();
	})
	$('#upImg').change(function(){				//上传图片本地预览
	  // 获取FileList的第一个元素
	  //alert(document.getElementById('upImg').files[0]);

	  upImgF= document.getElementById('upImg').files[0];
	  var Imgsrc = window.URL.createObjectURL(upImgF);
	  $('.editImg img').attr('src',Imgsrc);
	  
	})



  $('.glyphicon-remove').tap(function(){
  	$('.Mask').fadeOut();
  })
  $('.popUpCancel').tap(function () {
  	$('.Mask').fadeOut();
  })
  $('.editCancelImg').tap(function () {
  	$('.Mask').fadeIn();
  })
  $('.popUpgiveUpImg').tap(function (event) {
  	window.open('administrate.html?'+token,'_self');
  })
  $('.editUploadImg').tap(function (event) {					//点击完成按钮,简单的表单验证
  	if ($('.editText input').val() === '' &&
  		$('.editUrl input').val() === '' &&
  		$('.editSummary textarea').val() === '' &&
  		$('.editDifficulty textarea').val() === '' ) {
  		alert('请填写完相应的内容');
  	}
  	else{
  		/*var UpData = {};				//储存上传表单的信息
  		//	update = new Date();
  			UpData.title = $('.editText input').val(),
  			UpData.intro = $('.editSummary textarea').val(),
  			UpData.content = $('.editDifficulty textarea').val(),
  			UpData.pic = upImgF, //$('.editImg img').attr('src'),
  			UpData.url = $('.editUrl input').val(),*/
 			

  		//接下来的表单提交，应该利用Ajax的POST或者表单的提交按钮
  		var UpData = new FormData(document.getElementById('edit'));
  		console.log(UpData);
  		if (idIndex != -1) {				//判断idIndex，执行修改Ajax
  			$.ajax({
  			  url: 'http://139.199.18.137:7777/api/projects/'+idIndex+'/update',
  			  type: 'POST',
  			  data: UpData,
  			  async:false,
  			  contentType: false,
  			  processData: false,
  			  headers:{'Authorization':'Bearer '+ token},
  			  success: function (data, status) {
  			    window.open('administrate.html?'+token,'_self');
  			    
  			  },
  			  fail: function (err, status) {
  			    console.log(err);

  			  }
  			})
  		}
  		else if(idIndex == -1){				//判断idIndex为-1【及确定是通过上传按钮过来的，执行创建Ajax
  			$.ajax({
  			  url: 'http://139.199.18.137:7777/api/projects/create',   //+UpData.Title+UpData.Intro+UpData.Content+UpData.Img+UpData.Url+'/'+UpData.Update;
  			  type: 'POST',
  			  headers:{'Authorization':'Bearer '+ token},
  			  async:false,
  			  contentType: false,
  			  processData: false,
  			  data: UpData,
  			  success: function (data, status) {
  			    window.open('administrate.html?'+token,'_self');
  			    
  			  },
  			  fail: function (err, status) {
  			    console.log(err);
  			  }
  			})
  		}
  		else{
  			alert('ERRO');
  		}
  	}
  	
  })
});