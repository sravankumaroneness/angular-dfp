/**
 * @file Defines the `dfp-exclusion` directive.
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

(function(module) {
  /**
   * The `dfp-exclusion` directive.
   *
   * This directive allows specifying a category exclusion label, such that ads
   * from that category exclusion will not show in this slot. This ensures, for
   * example, that airline ads don't show next
   * to articles of an airplane accident.
   *
   * @see [Google DFP Support]{@link https://support.google.com/dfp_premium/answer/2627086?hl=en}
   *
   * @param {Object} scope The angular scope.
   * @param {Object} element The HTML element on which the directive is defined.
   * @param {Object} attributes The attributes of the element.
   * @param {Object} ad The parent `dfp-ad` controller.
   */
  function dfpExclusionDirective(scope, element, attributes, ad) {
    ad.addExclusion(element.html());
  }

  module.directive('dfpExclusion', [function() {
    return {
      restrict: 'E',
      require: '^^dfpAd',
      link: dfpExclusionDirective
    };
  }]);

// eslint-disable-next-line
})(angularDfp);
