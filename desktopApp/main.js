var bookList = 	angular.module('bookList', []);

bookList.controller('bookListController', function($scope, $http) {
	delete $http.defaults.headers.common['X-Requested-With'];
	$http.get("http://resful.esy.es/admin/books")
    .success(function(response) {$scope.bookList = response;});
})

function login() {

}

function loadMainContent() {
	document.getElementById('login-form').setAttribute("class", "skip");
	document.getElementById('login-message').setAttribute("class", "skip");
	document.getElementById('form-login-wrapper').setAttribute("class", "skip");
}

function add_book_form() {
	document.getElementById('upload_book').setAttribute("class", "active");
	document.getElementById('book-upload-wrapper').setAttribute("class", "active");
}

function cancel_add_book() {
	document.getElementById('upload_book').removeAttribute("class", "active");
	document.getElementById('book-upload-wrapper').removeAttribute("class", "active");
}

function add_book() {
	
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("button-login").addEventListener("click", login);
  document.getElementById("button-skip").addEventListener("click", loadMainContent);
  document.getElementById("add-book-form").addEventListener("click", add_book_form);
  document.getElementById("add-book").addEventListener("click", add_book);
  document.getElementById("cancel-add-book").addEventListener("click", cancel_add_book);
});
