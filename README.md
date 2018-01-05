# Songbeamer Stats

A small simple commandline-tool to create a csv-File with all Songs with date from the given files

## PSA

Made for a specific purpose. Expect strange behaviour. I may update this sometimes...

We are using Excel (argh) to produce diagrams and stats...

## Installation

`npm install songbeamer-stats`

## Usage

`node app.js -a [Folder] -o [CSV]`

### Parameters

* -a = The Folder with the col-Files
* -r = toggle Recursive mode on
* -o = name of the resulting csv
* -m = date-Mode. possible vars
  * fc = FileCreation Date
  * fa = Last File Access Date
  * fm = Last File modified Date
  * t = File-Title
* -t = File-Title mode. Enter here the Format of the title in moment-Type. eg. YYYY-MM-DD_Plan
* -d = Delimeter. By Default ';'
* -n = Newline. By Default '\n'
* -h = Header. toggle to Print the Header Line.

### Resulting CSV

The Resulting CSV has this cols:

* date = Date (in YYYY-MM-DD) of the song occurance
* name = Name of the Song

## Authors

* Dominik Sigmund <dominik.sigmund@webdad.eu>

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>