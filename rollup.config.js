// Import rollup plugins
import html from '@web/rollup-plugin-html';
import {copy} from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
//import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import execute from 'rollup-plugin-execute';
import styles from "rollup-plugin-styles";
import commonjs from '@rollup/plugin-commonjs';
import less from 'rollup-plugin-less';

export default {
  plugins: [
    //try and allow commonjs x-spreadsheets
    commonjs(),
    styles(),
    less(),
    // Entry point for application build; can specify a glob to build multiple
    // HTML files for non-SPA app
    html({
      input: 'index.html',
    }),
    // Resolve bare module specifiers to relative paths
    resolve(),
    // Minify HTML template literals
    //minifyHTML(),

    

    //@import 'material-icons/iconfont/material-icons.css';
    execute('cp node_modules/@bundled-es-modules/pdfjs-dist/build/pdf.worker.min.js build/assets/pdf.worker.js'),
    // Minify JS
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    // Print bundle summary
    summary(),
    // Optional: copy any static assets to build directory
    copy({
      patterns: ['images/**/*'],
    })
  ],
  output: {
    dir: 'build',
  },
  preserveEntrySignatures: 'strict',
  
};