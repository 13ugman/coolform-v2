/*!
 *	coolForm v2.0
 *	Copyright 2015 13ugman
 *	http://13ugman.com
 *	Licensed under MIT
 */

if (typeof jQuery === 'undefined') {
    throw new Error('coolForm\'s JavaScript requires jQuery');
}

(function ($) {
    'use strict';
    
    $(window).on('load', function () {
        $('.cool-file').each(function () {
			$(this).find('input[type="file"]').on('change', function () {
                var path = $(this).val().split('\\'),
                    fileName = path[path.length - 1];
				if ($(this).val() && !($(this).is('[multiple]'))) {
					$(this).siblings('.attached').html(fileName).addClass('successful');
				}
				if ($(this).val() && ($(this).is('[multiple]'))) {
                    var fileSet = $(this)[0].files;
					if (fileSet.length < 2) {
						$(this).siblings('.attached').html(fileSet[0].name).addClass('successful').removeClass('multiple');
					}
					if (fileSet.length > 1) {
						$(this).siblings('.attached').html(fileSet.length).addClass('successful').addClass('multiple');
					}
				}
			});
        });
        $(document).on('click', '[type="reset"]', function () {
            $(this).closest('form').find('.cool-file .attached').empty().removeClass('successful').removeClass('multiple');
        });
    });

}(jQuery));
