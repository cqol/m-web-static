import $ from "jquery";
import _ from "lodash";
import Yt from "../shared/common";
//import dialog from "dialog";

console.log('render login');


function enterKeyCheck(submitFun){
	$(document).keydown(function(event){
		if(event.keyCode==13){
			submitFun();
			return false;
		}
	});
}
$(document).ready(function(){
	enterKeyCheck(login);
	$("#kaptchaImage").click(function(){
		$('#kaptchaImage').hide().attr('src',base+'/pub/kaptchaImage/generator.do?'
			+ Math.floor(Math.random()*100) ).fadeIn();
	});
});


// 验证码是否正确
function login(){
	//表单验证
	if(loginValidate()){
		document.aform.submit();
	}
}
window.login = login;

function tips(s){
	var d = dialog({
		content:s
	});
	d.show();
	setTimeout(function () {
		d.close().remove();
	}, 2000);
}
function loginValidate(){
	//	reg= /^[A-Za-z,0-9,@,_,$,\u4E00-\u9FA5]+$/;
	var userName = $('#username');
	if(!userName.val()){
		req("请输入用户名!");
		userName.focus();
		return false;
	}
	var reg= /^[A-Za-z,0-9,@,_,.,$,\u4E00-\u9FA5]+$/;

	if(!reg.test(userName.val())){
		req("不能有特殊字符!");
		userName.focus();
		return false;
	}

	var password = $("#password");
	if(!password.val()){
		req("请输入密码!");
		password.focus();
		return false;
	}

	var kaptcha = $("#kaptcha");
	if(!kaptcha.val()){
		req("请输入验证码!");
		kaptcha.focus();
		return false;
	}

	return true;
}

function req(tipText){
	var d = dialog({
		content: '<span style="color:red">'+tipText+'</span>',
		height:20
	});
	d.show();
	setTimeout(function () {
		d.close().remove();
	}, 2000);

}

$(function(){

	//var isIELower8 = $.browser.msie  && parseInt($.browser.version, 10) < 10;
	var isIELower8 = false;
	var loginForm = $("#aform");
	var Login = {
		initPage: function(){
			if(isIELower8){
				setTimeout(function(){
					loginForm.find(".login-ipt").each(function(){
						if(!$(this).val()){
							$(this).prev(".placeholder").show();
						}
					});


				}, 100);
			}


			this.bindEvent();
		},

		bindEvent: function(){
			loginForm.find(".login-ipt").focus(function(){
				if(isIELower8) {
					$(this).prev(".placeholder").hide();
				}
				$(this).closest(".ipt-wrap").find(".ipt-icon").css("color", "#444");

			}).blur(function(){
				if(isIELower8){
					if(!$(this).val()){
						$(this).prev(".placeholder").show();
					}
				}
				$(this).closest(".ipt-wrap").find(".ipt-icon").css("color", "#b2b2b2");
			});

			if(isIELower8) {
				loginForm.find(".placeholder").click(function () {
					$(this).next(".login-ipt").focus();
				});
			}
		}


	};

	window.onload = function(){
		Login.initPage();
	};

});


