/*!
 *	coolForm v2.2
 *	Copyright 2017 13ugman
 *	http://13ugman.com
 *	Licensed under MIT
 */

(function () {
    'use strict';

    window.addEventListener('load', function () {
        var coolFileElements = document.querySelectorAll('.cool-file');
        for (var i = 0; i < coolFileElements.length; ++i) {
            coolFileElements[i].querySelector('input[type="file"]').addEventListener('change', function () {
                var fileSet = this.files ? this.files : [this.value],
                    fileName = this.files ? fileSet[0].name : this.value.split('\\').pop().split('/').pop(),
                    coolFileChildNodes = this.parentNode.childNodes,
                    signAttached;
                for (var j = 0; j < coolFileChildNodes.length; ++j) {
                    if ((' ' + coolFileChildNodes[j].className + ' ').indexOf(' attached ') > -1) {
                        signAttached = coolFileChildNodes[j];
                        break;
                    }
                }
                if (this.value) {
                    if ((' ' + signAttached.className + ' ').indexOf(' successful ') == -1) {
                        signAttached.className += ' successful';
                    }
                    if (!this.hasAttribute('multiple') || (this.hasAttribute('multiple') && fileSet.length == 1)) {
                        signAttached.innerHTML = fileName;
                        if (this.hasAttribute('multiple') && (' ' + signAttached.className + ' ').indexOf(' multiple ') != -1) {
                            signAttached.className = signAttached.className.replace(new RegExp('(\\s|^)multiple(\\s|$)'), ' ');
                        }
                    }
                    if (this.hasAttribute('multiple') && fileSet.length > 1) {
                        signAttached.innerHTML = fileName;
                        if (this.hasAttribute('multiple') && (' ' + signAttached.className + ' ').indexOf(' multiple ') == -1) {
                            signAttached.innerHTML = fileSet.length;
                            signAttached.className += ' multiple';
                        }
                    }
                }
            });
        }
        var resetButtons = document.querySelectorAll('[type="reset"]');
        for (var i = 0; i < resetButtons.length; ++i) {
            resetButtons[i].addEventListener('click', function () {
                // Polyfill for browsers that do not support Element.matches()
                if (!Element.prototype.matches) {
                    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                                Element.prototype.webkitMatchesSelector;
                }
                // Polyfill for browsers that do not support Element.closest()
                if (!Element.prototype.closest) {
                    Element.prototype.closest = function(s) {
                        var el = this;
                        if (!document.documentElement.contains(el)) return null;
                        do {
                            if (el.matches(s)) return el;
                            el = el.parentElement || el.parentNode;
                        } while (el !== null); 
                        return null;
                    };
                }
                var resetForm = this.closest('form'),
                    coolFilesToClear = resetForm.querySelectorAll('.cool-file .attached');
                for (var j = 0; j < coolFilesToClear.length; ++j) {
                    var coolFileToClear = coolFilesToClear[j];
                    coolFileToClear.innerHTML = '';
                    coolFileToClear.className = coolFileToClear.className.replace(new RegExp('(\\s|^)successful(\\s|$)'), ' ');
                    coolFileToClear.className = coolFileToClear.className.replace(new RegExp('(\\s|^)multiple(\\s|$)'), ' ');
                }
            });
        }
    });
    
})();