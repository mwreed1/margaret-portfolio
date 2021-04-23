import assignProps from './assignProps';

export default $(document).ready(function() {
			var colors = ["#02aab0", "#4e54c8"]
      var colors1 = ["#00cdac", "#8f94fb"]
			var rand = Math.floor(Math.random() * colors.length);
      //assignProps({primary-color: colors[rand],secondary-color: colors1[rand]}, defaultProps)
      //document.documentElement.style
    //.setProperty('--primary-color', colors[rand]);
    //  document.documentElement.style
    //  .setProperty('--secondary-color', colors1[rand]);
		console.log("color chosen is: ", colors[rand])
			$('body').css("$primary-color", colors[rand]);
      $('body').css("$secondary-color", colors1[rand]);
    });

//export default initRb
