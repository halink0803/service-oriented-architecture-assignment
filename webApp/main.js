var bookList = 	angular.module('bookList', []);

bookList.controller('bookListController', function($scope, $http) {
	delete $http.defaults.headers.common['X-Requested-With'];
	$http.get("http://restful-soa.esy.es/listCategories")
    .success(function(response) {    	    	
        jQuery('.category .mdl-spinner').css('display', 'none');
    	$scope.categories = response;
    });
    delete $http.defaults.headers.common['X-Requested-With'];
	$http.get("http://restful-soa.esy.es/books")
    .success(function(response) {
        jQuery('.book-list .mdl-spinner').css('display', 'none');
    	$scope.bookList = response;
    });    
    $scope.category_click = function( $event ) {
    							jQuery('.category .active').removeClass('active');
    							if( !jQuery($event.currentTarget).hasClass('active') ){
    								jQuery($event.currentTarget).addClass('active');    								
    							}    							
    							jQuery('.book-category').each(function (i, obj){
    								if( jQuery($event.currentTarget).text() != 'All' ) {
    									if( jQuery(this).data('value') != jQuery($event.currentTarget).text()) {
	    									jQuery(this).parent().parent().parent().css('display', 'none');
	    								} else {
	    									jQuery(this).parent().parent().parent().css('display', 'block');
	    								}   								
    								} else {
    									jQuery(this).parent().parent().parent().css('display', 'block');
    								}
    							})
    						}   
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
});

