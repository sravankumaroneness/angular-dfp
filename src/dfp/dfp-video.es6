/**
 * @file Defines the `dfp-video` directive.
 * @author Peter Goldsborough <peter@goldsborough.me>
 * @license Apache
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.

 */

// eslint-disable-next-line no-undef, no-unused-vars
let angularDfpVideo = angular.module('angularDfp');

(function(module) {
  /**
   * The `dfp-video` directive.
   *
   * This directive enables video ads to be shown over videos,
   * using `videojs` and the IMA SDK.
   *
   * @param {Object} scope The angular scope.
   * @param {Object} element The HTML element on which the directive is defined.
   * @param {Object} attributes The attributes of the element.
   * @param {Object} $injector The Angular '$injector' service.
   */
  function dfpVideoDirective(scope, element, attributes, $injector) {
    const dfpIDGenerator = $injector.get('dfpIDGenerator');

     // Unpack jQuery object
    element = element[0];

     // Generate an ID or check for uniqueness of an existing one (true = forVideo)
    dfpIDGenerator(element, true);

    /* eslint-disable no-undef */
    /**
     * The videojs player object.
     * @type {videojs.Player}
     */
    const player = videojs(element.id);
    /* eslint-enable no-undef */

     // Register the video slot with the IMA SDK
    player.ima({id: element.id, adTagUrl: scope.adTag});
    player.ima.requestAds();
    player.ima.initializeAdDisplayContainer();
  }

  module.directive('dfpVideo', ['$injector', function($injector) {
    return {
      restrict: 'AE',
      scope: {adTag: '@'},
      link: function() {
        const args = Array.prototype.slice.call(arguments, 0, 4);
        dfpVideoDirective.apply(null, args.concat($injector));
      }
    };
  }]);

  return module;

// eslint-disable-next-line
})(angularDfpVideo);
