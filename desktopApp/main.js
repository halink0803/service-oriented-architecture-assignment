var bookList = 	angular.module('bookList', []);

bookList.controller('bookListController', function($scope, $http) {
	delete $http.defaults.headers.common['X-Requested-With'];
	$http.get("http://resful.esy.es/listCategories")
    .success(function(response) {  
      jQuery('.category .mdl-spinner').css('display', 'none');    
    	$scope.categories = response;
    });
	$http.get("http://resful.esy.es/books")
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
  document.getElementById("add-book-form").addEventListener("click", add_book_form);
  document.getElementById("add-book").addEventListener("click", add_book);
  document.getElementById("cancel-add-book").addEventListener("click", cancel_add_book);
});

var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
var template = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },      
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Alt+Command+I';
          else
            return 'Ctrl+Shift+I';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.toggleDevTools();
        }
      },
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: function() { require('shell').openExternal('http://electron.atom.io') }
      },
    ]
  },
];

if (process.platform == 'darwin') {
  var name = remote.require('app').getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() { app.quit(); }
      },
    ]
  });
  // Window menu.
  template[3].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  );
}

menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
