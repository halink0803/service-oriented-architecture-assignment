var bookList = 	angular.module('bookList', []);
var remote = require('remote');
var ipc = require('ipc');

bookList.controller('bookListController', function($scope, $http) {
  $scope.bookList = {
    books :[{
      name: 'Service Oriented Architecture',
      year: '2015',
      field: 'programming',
      author: 'Ha Link',
      code: '2012',
      publisher: 'UET',
      image: '',
      pages: '2015'
    }]
  }
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
  $scope.book_detail = $scope.bookList.books[0];
  $scope.newBook = {
                      name: '',
                      description: '',
                      year: '',
                      field: '',
                      author: '',
                      code: '',
                      publisher: '',
                      image: '',
                      pages: ''
                    }
  $scope.user = {
                email: '',
                password: ''
  }                    
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
              };                            
  $scope.readmore_click = function ($event) {
                          var index = jQuery($event.currentTarget).attr('index');    
                          $scope.book_detail = $scope.bookList.books[index];                          
                          jQuery('.book_detail_section').addClass('active');
                          // ipc.send('show-book-detail');
                        }  
  $scope.addNewBook = function($event) {
                          $event.preventDefault();                          
                          $http({
                            method: 'POST',
                            url: 'http://restful-soa.esy.es/books',
                            data: $scope.newBook                            
                          }).success(function(data){                            
                            var notifier = {
                                title: "Upload a book",
                                body: data.message
                            }
                            new Notification("Upload a book", notifier);
                          });                          
                        }
  $scope.deleteABook = function($event) {
                          $event.preventDefault();
                          $http({
                            method: 'DELETE',
                            url: 'http://restful-soa.esy.es/books/' + jQuery($event.currentTarget).attr('index'),
                            data: $scope.newBook                            
                          }).success(function(data){                            
                            var notifier = {
                                title: "Delete book",
                                body: data.message
                            }
                            new Notification("Delete book", notifier);
                            jQuery('.book_detail_section').removeClass('active');
                          });
                      } 
  $scope.updateABook = function($event) {
                          $event.preventDefault();
                          $http({
                            method: 'PUT',
                            url: 'http://restful-soa.esy.es/books/' + jQuery($event.currentTarget).attr('index'),
                            data: $scope.book_detail                            
                          }).success(function(data){                            
                            var notifier = {
                                title: "Update book information",
                                body: data.message
                            }
                            new Notification("Update book information", notifier);
                            jQuery('.book_detail_section').removeClass('active');
                          });
                      }
  $scope.close = function($event) {
                          $event.preventDefault();
                          jQuery('.book_detail_section').removeClass('active');
                      }
  $scope.addLoginForm = function($event){
                          $event.preventDefault();
                          jQuery('#form-login-wrapper').removeClass('skip');
                          jQuery('#login-form').removeClass('skip');
                        }
  $scope.login = function($event){
                        $event.preventDefault();
                          $http({
                            method: 'POST',
                            url: 'http://restful-soa.esy.es/auth/login',
                            data: $scope.user                            
                          }).success(function(data){                            
                            var notifier = {
                                title: "Login",
                                body: data.message
                            }
                            new Notification("login", notifier);
                            jQuery('#form-login-wrapper').addClass('skip');
                            jQuery('#login-form').addClass('skip');
                          });
                        }                        
});
bookList.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
// bookList.filter('to_trusted', ['$sce', function($sce){
//           return function(text) {
//               return $sce.trustAsHtml(text);
//           };
//       }]);
