/**
* @module parse-duration
* @license Apache
* Copyright 2016 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// eslint-disable-next-line valid-jsdoc
(/** @lends module:parse-duration */ function(module) {
  'use strict';

  /**
  * An error thrown by the `parseDuration` service.
  * @private
  */
  class DFPDurationError extends Error {
    constructor(interval) {
      super(`Invalid interval: '${interval}'ls`);
    }
  }

  /**
  * A factory for the `parseDuration` service.
  *
  * This service allows parsing of strings specifying
  * durations, such as '2s' or '5min'.
  *
  * @private
  * @return {Function} The `parseDuration` service.
  */
  function parseDurationFactory() {
    /**
    * Converts a given time in a given unit to milliseconds.
    * @param  {!number} time A time number in a certain unit.
    * @param  {!string} unit A string describing the unit (ms|s|min|h).
    * @return {!number} The time, in milliseconds.
    */
    function convertToMilliseconds(time, unit) {
      console.assert(/^(m?s|min|h)$/g.test(unit));

      if (unit === 'ms') return time;
      if (unit === 's') return time * 1000;
      if (unit === 'min') return time * 60 * 1000;

      // hours
      return time * 60 * 60 * 1000;
    }

    /**
    * Converts a regular expression match into a duration.
    * @param  {!Array} match A regular expression match object.
    * @return {!number} The converted milliseconds.
    */
    function convert(match) {
      const time = parseFloat(match[1]);

       // No unit means milliseconds
       // Note: match[0] is the entire matched string
      if (match.length === 2) return time;

      return convertToMilliseconds(time, match[2]);
    }

    /**
    * Given an interval string, returns the corresponding milliseconds.
    * @param  {number|string} interval The string to parse.
    * @return {number} The corresponding number of milliseconds.
    */
    function parseDuration(interval) {
      // The interval may well be zero so don't just write !interval
      if (interval === undefined || interval === null) {
        throw new DFPDurationError(interval);
      }

      if (typeof interval === 'number') {
        return interval;
      }

      if (typeof interval !== 'string') {
        throw new TypeError(`'${interval}' must be of number or string type`);
      }

      // Convert any allowed time format into milliseconds
      const match = interval.match(/((?:\d+)?.?\d+)(m?s|min|h)?/);

      if (!match) {
        throw new DFPDurationError(interval);
      }

      return convert(match);
    }

    return parseDuration;
  }

  module.factory('parseDuration', parseDurationFactory);

// eslint-disable-next-line
})(angularDfp);
