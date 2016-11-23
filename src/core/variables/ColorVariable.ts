/** @license
 *  Copyright 2016 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import { SerializableData } from "../../lib/LocalStorage";
import { Variable, VariableListParams, VariableCallback } from "./Variable";
import { VariableType } from "../../lib/Constants";

/**
 * Interface for a class that represents a type of Variable for color values.
 * @interface
 * @extends VariableListParams
 */
interface ColorVariableParams extends VariableListParams {
  defaultValue: string;
  selectedValue: string;
  possibleValues?: Array<string>;
}

/**
 * A class representing a type of Variable for color values.
 * @class
 * @extends Variable
 * @implements {ColorVariableParams}
 */
export class ColorVariable extends Variable implements ColorVariableParams {

  /**
   * Creates an instance of a ColorVariable.
   * @constructor
   * @param  {string}           key            A unique key for the Variable.
   * @param  {string}           defaultValue   The default value.
   * @param  {Array<string>}    possibleValues The array of possible values.
   * @param  {VariableCallback} callback       The callback to invoke when updated.
   * @return {ColorVariable}
   */
  constructor(key: string, defaultValue: string, possibleValues?: Array<string>, callback?: VariableCallback) {
    super(key, VariableType.COLOR, defaultValue, callback);
    this.possibleValues = possibleValues;
  }

  /**
   * Clones the variable.
   * @return {ColorVariable} Returns the cloned variable.
   */
  clone() {
    let cloned = new ColorVariable(
      this.key,
      this.defaultValue,
      this.possibleValues
    );
    cloned.title = this.title;
    cloned._callbacks = this._callbacks.slice();
    return cloned;
  }

  /**
   * The array of possible values for this Variable.
   * @override
   * @type {Array<string>}
   */
  possibleValues?: Array<string>;

  /**
   * Returns a serialized representation of this object.
   * @override
   * @return {SerializableData} The serialized data.
   */
  serialize(): SerializableData {
    let data = super.serialize();
    data.selectedValue = this.selectedValue;
    data.possibleValues = this.possibleValues;
    return data;
  }

  /**
   * Returns a new initialized ColorVariable from serialized data.
   * @override
   * @param  {SerializableData} data The serialized data.
   * @return {ColorVariable}         A new initialized ColorVariable.
   */
  static deserialize(data: SerializableData): Variable {
    return new ColorVariable(data.key, data.selectedValue, data.possibleValues);
  }
}
