// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var view1 = myApp.addView('#view-1', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view4 = myApp.addView('#view-4', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// $$('#view-4').on('tab:show', function () {
//     var mySearchbar = myApp.searchbar('.searchbar', {
//         searchList: '.list-block-search',
//         searchIn: '.item-title'
//     });
// });

myApp.onPageInit('*', function(page) {
	$$(page.container).find('script').each(function (el) {
	    if ($$(this).attr('src')) {
	        var s = document.createElement('script');
	        s.src = $$(this).attr('src');
	        $$('head').append(s);
	    } else {
	        eval($$(this).text());
	    }
	});
});

myApp.onPageReinit('*', function(page) {
	$$(page.container).find('script').each(function (el) {
	    if ($$(this).attr('src')) {
	        var s = document.createElement('script');
	        s.src = $$(this).attr('src');
	        $$('head').append(s);
	    } else {
	        eval($$(this).text());
	    }
	});
});

function viewApp(link) {
	$$.ajax({
		url: 'api/appcake.php',
		type: 'GET',
		data: {link: link},
		success: function(data) {
			var appInfo = JSON.parse(data);
			var appID = appInfo.app_id;
			var icon = appInfo.icon;
			var developer = appInfo.vendor;
			var name = appInfo.app_name;
			var description = appInfo.description;
			var version = appInfo.version;
			$$("#appCakeVerify").show();
			$$("#appIcon-appCake").attr('src', appInfo.icon);
			$$("#appName-appCake").text(name);
			$$("#appDescription-appCake").text(description);
			$$("#appDeveloper-appCake").text(developer);
			$$("#appVersion-appCake").text(version);
			$$("#appRequest-appCake").attr('onclick', 'requestApp("'+appID+'")');
			$$("#viewApp-appCake").attr('href', 'viewAppCake.php?id='+appID+'');
		}
	});
	
}

function requestApp(id) {
	myApp.showPreloader('Requesting App');
	$$.ajax({
		url: 'api/appcake.php',
		type: 'POST',
		data: {id: id},
		success: function(data) {
			var message = JSON.parse(data);
			if (message.response == "success") {
				myApp.alert(message.text, 'Ignition');
			} else {
				myApp.alert(message.text, 'Ignition');
			}
			$$("#appCakeVerify").hide();
			myApp.hidePreloader();
		}
	});
}