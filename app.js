/**
 * @overview Main Application File
 * @module app
 * @author Dominik Sigmund
 * @version 1.0
 * @description Run everything
 * @memberof songbeamer-stats
 * @requires lib-songbeamer
 * @requires fs
 * @requires commander
 * @requires recursive-readdir
 * @requires async
 * @requires path
 */

var program = require('commander')
const async = require('async')
const moment = require('moment')
const songbeamer = require('lib-songbeamer')
const fs = require('fs')
const path = require('path')
const recursive = require('recursive-readdir')

// TODO: filename date parsing
// TODO: arrayofSongs is an array in an array.

program
  .version('1.0.0')
  .usage('[options]')
  .option('-a, --ablaufs [folder]', 'folder, where the col-Files are.')
  .option('-r, --recursive', 'Recursive Mode')
  .option('-o, --output [file]', 'name of the resulting csv.')
  .option('-m, --datemode [mode]', 'date-Mode.', /^(fc|fa|fm|t)$/i)
  .option('-t, --titleformat [format]', 'File-Title mode. Enter here the Format of the title in moment-Type. eg. YYYY-MM-DD.col.')
  .option('-d, --delimeter [delimeter]', 'Delimeter.', ';')
  .option('-n, --newline [newline]', 'Newline.', '\n')
  .option('-p, --printheaders ', 'Header. toggle to Print the Header Line')
  .parse(process.argv)

fs.access(program.ablaufs, fs.constants.R_OK, function (err) {
  if (err) {
    console.error(err)
  } else {
    if (program.recursive) {
      recursive(program.ablaufs, function (err, files) {
        if (err) {
          console.error(err)
        } else {
          files2CSV(files, function (err) {
            if (err) {
              console.error(err)
            } else {
              console.log('All Done.')
            }
          })
        }
      })
    } else {
      fs.readdir(program.ablaufs, function (err, files) {
        if (err) {
          console.error(err)
        } else {
          files2CSV(files, function (err) {
            if (err) {
              console.error(err)
            } else {
              console.log('All Done.')
            }
          })
        }
      })
    }
  }
})
function files2CSV (files, callback) {
  async.times(files.length, function (n, next) {
    const file = files[n]
    if (file.endsWith('col')) {
      var fileinfo = fs.statSync(file)
      var date
      switch (program.datemode) {
        case 'fc':
          date = moment(fileinfo.ctimeMs)
          break
        case 'fa':
          date = moment(fileinfo.atimeMs)
          break
        case 'fm':
          date = moment(fileinfo.atimeMs)
          break
        case 't':
          var filename = path.basename(file).replace('.col', '')
          //console.log(filename)
          //console.log(program.titleformat)
          date = moment(filename, program.titlemode)
          //console.log(date.format())
          //process.exit(7)
          break
        default:
          next(new Error('Unknown Type ' + program.titleformat))
          break
      }
      console.log(date.format('YYYY-MM-DD'))
      songbeamer.ablauf2JSON(file, function (err, json) {
        if (err) {
          next(err)
        } else {
          var songArray = []
          for (let index = 0; index < json.items.length; index++) {
            const item = json.items[index]
            if (item.type === 'song') {
              var song = {}
              song.date = date.format('YYYY-MM-DD')
              song.name = item.caption
              songArray.push(song)
            }
          }
          next(null, songArray)
        }
      })
    } else {
      next(null, [])
    }
  }, function (error, arrayOfSongs) {
    if (error) {
      callback(error)
    } else {
      var file = ''
      if (program.printheaders) {
        file += 'date' + program.delimeter + 'name' + program.newline
      }
      for (let counter = 0; counter < arrayOfSongs.length; counter++) {
        const song = arrayOfSongs[counter]
        file += song.date + program.delimeter + song.name + program.newline
      }
      fs.writeFile(program.output, file, function (err) {
        if (err) {
          callback(err)
        } else {
          callback(null)
        }
      })
    }
  })
}
